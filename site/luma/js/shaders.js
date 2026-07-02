/* ============================================================================
 * LUMA — shaders.js
 * All GLSL (WebGL2 / GLSL ES 3.00). Reusable chunks (noise, flow, color, sdf)
 * are composed into each render pass. Kept as JS strings so the whole app runs
 * from file:// with no fetch/bundler.
 *
 * Pipeline overview:
 *   ADVECT   feedback fluid (semi-Lagrangian advection of HDR dye)
 *   INJECT   additive sources: central pulse, spectrum ring, touch/beat emitters
 *   DISPLAY  dye -> scene, with kaleidoscope fold + view rotation + exposure
 *   PARTICLE update (transform feedback) + additive point render
 *   BRIGHT   bloom prefilter (soft-knee)
 *   BLUR     separable gaussian
 *   COMPOSITE scene + bloom -> ACES tonemap, hue cycle, grade, vignette,
 *             chromatic aberration, grain
 * ========================================================================== */
(function () {
  "use strict";
  const VZ = (window.VZ = window.VZ || {});

  const HEAD = `#version 300 es
precision highp float;
precision highp int;
#define PI 3.14159265359
#define TAU 6.28318530718
`;

  /* --------------------------- shared chunks ---------------------------- */

  const NOISE = `
float hash21(vec2 p){
  p = fract(p*vec2(123.34, 345.45));
  p += dot(p, p+34.345);
  return fract(p.x*p.y);
}
vec2 hash22(vec2 p){
  vec3 a = fract(vec3(p.xyx)*vec3(123.34,234.34,345.65));
  a += dot(a, a+34.45);
  return fract(vec2(a.x*a.y, a.y*a.z));
}
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  float a=hash21(i);
  float b=hash21(i+vec2(1.0,0.0));
  float c=hash21(i+vec2(0.0,1.0));
  float d=hash21(i+vec2(1.0,1.0));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){ v+=a*vnoise(p); p=m*p; a*=0.5; }
  return v;
}`;

  const COLOR = `
vec3 acesFilm(vec3 x){
  const float a=2.51,b=0.03,c=2.43,d=0.59,e=0.14;
  return clamp((x*(a*x+b))/(x*(c*x+d)+e),0.0,1.0);
}
vec3 hueRot(vec3 col, float a){
  const vec3 k=vec3(0.57735);
  float ca=cos(a);
  return col*ca + cross(k,col)*sin(a) + k*dot(k,col)*(1.0-ca);
}
vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d){
  return a + b*cos(TAU*(c*t+d));
}`;

  // Shared incompressible flow field (curl of a domain-warped fbm potential),
  // plus radial bass pulse, swirl, gravity, and up to 8 pointer forces.
  const FLOW = `
uniform float uTime;
uniform float uFlowScale;
uniform float uFlowSpeed;
uniform float uFlowWarp;
uniform float uFlowSwirl;
uniform float uBass;
uniform float uMid;
uniform float uAspect;
uniform vec2  uCenter;
uniform vec2  uGravity;
uniform int   uForceCount;
uniform vec2  uForcePos[8];
uniform vec2  uForceVec[8];
uniform float uForceStr[8];
uniform float uForceRad;

float potential(vec2 p){
  float t = uTime*uFlowSpeed;
  vec2 w = vec2(fbm(p + t*0.15), fbm(p + vec2(5.2,1.3) - t*0.12));
  float f = fbm(p + uFlowWarp*w + t*0.10);
  f += 0.5*fbm(p*0.5 - t*0.07);
  return f;
}
vec2 flowField(vec2 uv){
  vec2 p = (uv - uCenter);
  p.x *= uAspect;
  vec2 q = p * uFlowScale;
  float e = 0.06;
  float pa = potential(q + vec2(e,0.0));
  float pb = potential(q - vec2(e,0.0));
  float pc = potential(q + vec2(0.0,e));
  float pd = potential(q - vec2(0.0,e));
  vec2 v = vec2(pc - pd, -(pa - pb)) / (2.0*e);

  float r = length(p) + 1e-4;
  vec2 tang = vec2(-p.y, p.x)/r;
  v += tang * uFlowSwirl * (0.6 + 0.5*uMid);

  vec2 radial = p / r;
  v += radial * uBass * 0.8 * sin(uTime*1.7 + r*4.0);

  v += uGravity;

  for(int i=0;i<8;i++){
    if(i>=uForceCount) break;
    vec2 d = p - uForcePos[i];
    float dist = length(d) + 1e-4;
    float fall = exp(-dist*dist/(uForceRad*uForceRad));
    vec2 dir = d/dist;
    vec2 vort = vec2(-dir.y, dir.x);
    v += (uForceVec[i]*1.6 + vort*0.7) * uForceStr[i] * fall;
  }
  v = clamp(v, vec2(-6.0), vec2(6.0));
  v.x /= uAspect;
  return v;
}`;

  const SDF = `
float sdSeg(vec2 p, vec2 a, vec2 b){
  vec2 pa=p-a, ba=b-a;
  float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);
  return length(pa-ba*h);
}
float sdNgon(vec2 p, float r, float n){
  float a=atan(p.y,p.x);
  float seg=TAU/n;
  a=mod(a,seg)-seg*0.5;
  return cos(a)*length(p) - r;
}
float sdStar(vec2 p, float r, float n, float m){
  float an = PI/n;
  float en = PI/m;
  vec2  acs = vec2(cos(an),sin(an));
  vec2  ecs = vec2(cos(en),sin(en));
  float bn = mod(atan(p.x,p.y), 2.0*an) - an;
  p = length(p)*vec2(cos(bn), abs(sin(bn)));
  p -= r*acs;
  p += ecs*clamp(-dot(p,ecs), 0.0, r*acs.y/ecs.y);
  return length(p)*sign(p.x);
}`;

  /* --------------------------- vertex shaders --------------------------- */

  const FULLSCREEN_VS = HEAD + `
out vec2 vUv;
void main(){
  int id = gl_VertexID;
  vec2 p = vec2(float((id<<1)&2), float(id&2));
  vUv = p;
  gl_Position = vec4(p*2.0-1.0, 0.0, 1.0);
}`;

  /* --------------------------- ADVECT ----------------------------------- */
  const ADVECT_FS = HEAD + NOISE + FLOW + `
in vec2 vUv;
out vec4 frag;
uniform sampler2D uPrev;
uniform float uDt;
uniform float uAdvect;
uniform float uDecay;
uniform float uHueDrift;

vec3 hueRotL(vec3 c, float a){
  const vec3 k=vec3(0.57735);
  float ca=cos(a);
  return c*ca + cross(k,c)*sin(a) + k*dot(k,c)*(1.0-ca);
}
void main(){
  vec2 vel = flowField(vUv);
  vec2 src = vUv - vel * uAdvect * uDt;
  vec3 col = texture(uPrev, src).rgb;
  col = hueRotL(col, uHueDrift*uDt);
  col *= uDecay;
  col = max(col - 0.0016, vec3(0.0));
  frag = vec4(col, 1.0);
}`;

  /* --------------------------- INJECT ----------------------------------- */
  const INJECT_FS = HEAD + COLOR + SDF + `
in vec2 vUv;
out vec4 frag;
uniform float uAspect, uTime, uBeat, uEnergy;
uniform int   uEmCount;
uniform vec2  uEmPos[16];
uniform vec2  uEmVel[16];
uniform vec4  uEmData[16];   // type, size, age01, strength
uniform float uEmParam[16];  // shape param (sides/points)
uniform vec3  uEmColor[16];
uniform sampler2D uFreq;
uniform float uSpecGain, uSpecRadius, uSpecWidth;
uniform vec3  uPalA, uPalB, uPalC, uPalD;
uniform float uPalShift;
uniform float uCenterPulse;
uniform float uInject;        // global amplitude (frame-rate aware, keeps the
                              // feedback loop from saturating to white)

void main(){
  vec2 uv = vUv;
  vec2 p = uv - 0.5; p.x *= uAspect;
  float rc = length(p);
  vec3 acc = vec3(0.0);

  // central bass-driven glow (tight core, not a broad fill)
  float glow = exp(-rc*rc*42.0) * uCenterPulse;
  acc += pal(uPalShift, uPalA, uPalB, uPalC, uPalD) * glow;

  // radial spectrum ring (mirror for symmetry, reads like a circular EQ)
  {
    float ang = atan(p.y, p.x);
    float a01 = ang/TAU + 0.5;
    float fa = abs(a01*2.0 - 1.0);
    float amp = texture(uFreq, vec2(fa, 0.5)).r;
    amp = pow(amp, 1.4);
    float ring = uSpecRadius + amp*uSpecWidth;
    float d = abs(rc - ring);
    float bar = smoothstep(0.05*uSpecWidth + 0.004, 0.0, d) * amp;
    vec3 col = pal(fa*0.32 + uPalShift, uPalA, uPalB, uPalC, uPalD);
    acc += col * bar * uSpecGain * (0.5 + amp);
  }

  // emitters
  for(int i=0;i<16;i++){
    if(i>=uEmCount) break;
    vec4 dat = uEmData[i];
    float type=dat.x, size=dat.y, age=dat.z, str=dat.w;
    float prm = uEmParam[i];
    vec2 ep = uEmPos[i]-0.5; ep.x *= uAspect;
    vec3 col = uEmColor[i];
    vec2 dp = p - ep;
    float d = length(dp);
    float inten = str*age;

    if(type < 0.5){
      float g = exp(-d*d/(size*size));
      acc += col * g * inten * 1.0;
    } else if(type < 1.5){
      float rr = size * (1.0 - age);
      float w = 0.02 + 0.05*size;
      float g = smoothstep(w, 0.0, abs(d - rr));
      acc += col * g * inten * 0.9;
    } else if(type < 2.5){
      vec2 hv = uEmVel[i]; hv.x *= uAspect;
      float sd = sdSeg(p, ep-hv, ep+hv);
      float g = exp(-sd*sd/(size*size));
      acc += col * g * inten * 1.1;
    } else if(type < 3.5){
      float rr = 0.04 + 0.18*(1.0-age);
      float dd = abs(sdNgon(dp, rr, prm));
      float g = smoothstep(0.012, 0.0, dd);
      acc += col * g * inten * 1.0;
    } else {
      float rr = 0.04 + 0.20*(1.0-age);
      float dd = abs(sdStar(dp, rr, prm, 2.0 + fract(prm*0.31)*1.6));
      float g = smoothstep(0.014, 0.0, dd);
      acc += col * g * inten * 1.0;
    }
  }
  frag = vec4(acc * uInject, 1.0);
}`;

  /* --------------------------- DISPLAY ---------------------------------- */
  // The main visual: a coherent, domain-warped flowing field (always clean and
  // gorgeous), kaleidoscoped, with the feedback dye + emitters added on top as
  // reactive accents.
  const DISPLAY_FS = HEAD + NOISE + COLOR + `
in vec2 vUv;
out vec4 frag;
uniform sampler2D uDye;
uniform float uAspect, uKaSides, uKaMix, uKaRot, uViewRot, uMirror, uExposure;
uniform float uTime, uBaseScale, uBaseSpeed, uBaseWarp, uBaseBright;
uniform float uColorSpread, uRingFreq, uFieldSharp, uDyeAmt;
uniform float uBass, uMid, uBeat, uPalShift;
uniform vec3  uPalA, uPalB, uPalC, uPalD;

vec2 kaleido(vec2 uv){
  vec2 p = uv - 0.5; p.x *= uAspect;
  float cv=cos(uViewRot), sv=sin(uViewRot);
  p = mat2(cv,-sv,sv,cv)*p;
  float r = length(p);
  float a = atan(p.y, p.x) + uKaRot;
  float sides = max(uKaSides, 1.0);
  float seg = PI / sides;
  a = mod(a, 2.0*seg);
  a = abs(a - seg);
  vec2 folded = vec2(cos(a), sin(a)) * r;
  vec2 outp = mix(p, folded, uKaMix);
  outp.x /= uAspect;
  return outp + 0.5;
}

// flowing, ever-evolving colour field built from nested domain warping
vec3 baseField(vec2 p){
  float t = uTime*uBaseSpeed;
  vec2 q = p*uBaseScale;
  float warp = uBaseWarp*(1.0 + 0.5*uMid);
  vec2 w1 = vec2(fbm(q + t*0.6), fbm(q + vec2(5.1,2.3) - t*0.5));
  vec2 w2 = vec2(fbm(q*1.8 + warp*w1 + t*0.4),
                 fbm(q*1.8 + warp*w1.yx - t*0.35));
  float f = fbm(q + warp*w2 + t*0.25) * 1.15;
  float ridg = 1.0 - abs(2.0*fract(f*1.5) - 1.0);   // filament structure
  float field = mix(f, ridg, uFieldSharp);
  float hue = field*uColorSpread + uPalShift + length(p)*uRingFreq + 0.2*w2.x;
  vec3 col = pal(hue, uPalA, uPalB, uPalC, uPalD);
  // punch saturation so colour is vivid, not pastel
  float lum = dot(col, vec3(0.299,0.587,0.114));
  col = max(mix(vec3(lum), col, 1.35), 0.0);
  // dark valleys, glowing ridges -> depth and contrast
  float b = pow(clamp(field, 0.0, 1.55), 2.3);
  b *= uBaseBright * (0.28 + 1.05*field);
  b += uBass*0.08*field + uBeat*0.04*field;
  return col * b;
}

void main(){
  vec2 uv = kaleido(vUv);
  vec2 uvm = vec2(1.0 - uv.x, uv.y);
  vec2 pc = uv - 0.5; pc.x *= uAspect;
  vec3 col = baseField(pc);
  vec3 dyeA = texture(uDye, clamp(uv,0.0,1.0)).rgb;
  vec3 dyeB = texture(uDye, clamp(uvm,0.0,1.0)).rgb;
  vec3 dye = mix(dyeA, max(dyeA,dyeB), uMirror);
  col += dye * uDyeAmt;
  col *= uExposure;
  frag = vec4(col, 1.0);
}`;

  /* --------------------------- PARTICLES -------------------------------- */
  const PARTICLE_UPDATE_VS = HEAD + NOISE + FLOW + `
in vec2 aPos;
in vec2 aVel;
in vec2 aMisc;      // x=life(0..1), y=seed
out vec2 vPos;
out vec2 vVel;
out vec2 vMisc;
uniform float uDt;
uniform float uParticleSpeed;
uniform float uDamp;
uniform float uLifeMin;
uniform float uLifeMax;

void main(){
  vec2 pos=aPos; vec2 vel=aVel; float life=aMisc.x; float seed=aMisc.y;
  vec2 f = flowField(pos);
  vel = mix(vel, f*uParticleSpeed, 0.10);
  vel *= uDamp;
  pos += vel*uDt;
  pos = fract(pos);
  float dur = mix(uLifeMin, uLifeMax, hash21(vec2(seed, seed*1.7+0.3)));
  life -= uDt/max(dur, 0.2);
  if(life <= 0.0){
    seed = fract(seed*1.37 + uTime*0.123 + 0.61);
    vec2 rnd = hash22(vec2(seed*51.3, uTime*0.7+seed));
    // spread across the whole field (gentle centre bias) so they read as a
    // drifting starfield, not a central clump
    pos = mix(rnd, uCenter + (rnd-0.5)*0.85, 0.2);
    vel = (rnd-0.5)*0.03;
    life = 1.0;
  }
  vPos=pos; vVel=vel; vMisc=vec2(life, seed);
  gl_Position = vec4(0.0,0.0,0.0,1.0);
}`;

  const PARTICLE_UPDATE_FS = HEAD + `
out vec4 frag;
void main(){ frag = vec4(0.0); }`;

  const PARTICLE_RENDER_VS = HEAD + COLOR + `
in vec2 aPos;
in vec2 aVel;
in vec2 aMisc;
out vec3 vColor;
out float vFade;
uniform float uPointSize, uTreble, uBeat, uBrightness, uVelColor, uPalShift;
uniform vec3 uPalA, uPalB, uPalC, uPalD;
void main(){
  vec2 pos = aPos;
  float life = aMisc.x, seed = aMisc.y;
  float fade = smoothstep(0.0,0.18,life) * smoothstep(0.0,0.22,1.0-life);
  vec2 cs = pos*2.0 - 1.0;
  gl_Position = vec4(cs, 0.0, 1.0);
  float spd = length(aVel);
  float t = fract(seed + uPalShift + spd*uVelColor);
  vColor = pal(t, uPalA, uPalB, uPalC, uPalD);
  // per-particle brightness variety so the field reads as motes, not grain
  float bvar = 0.3 + 1.1*fract(seed*3.17);
  vColor *= uBrightness * bvar * (0.6 + uTreble*0.45 + uBeat*0.3);
  vFade = fade;
  float svar = 0.5 + 1.7*fract(seed*7.31);
  float sz = uPointSize * svar * (0.7 + 0.7*spd*42.0);
  sz *= (0.8 + 0.4*uTreble + uBeat*0.4);
  gl_PointSize = clamp(sz, 2.0, 90.0);
}`;

  const PARTICLE_RENDER_FS = HEAD + `
in vec3 vColor;
in float vFade;
out vec4 frag;
void main(){
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d,d);
  if(r2 > 0.25) discard;
  // soft halo + bright core
  float a = exp(-r2*5.5) * 0.6 + exp(-r2*24.0) * 0.45;
  frag = vec4(vColor * a * vFade, 1.0);
}`;

  /* --------------------------- BLOOM ------------------------------------ */
  const BRIGHT_FS = HEAD + `
in vec2 vUv;
out vec4 frag;
uniform sampler2D uTex;
uniform float uThreshold, uKnee, uClamp;
void main(){
  vec3 c = texture(uTex, vUv).rgb;
  float br = max(c.r, max(c.g, c.b));
  float soft = clamp(br - uThreshold + uKnee, 0.0, 2.0*uKnee);
  soft = soft*soft/(4.0*uKnee + 1e-4);
  float contrib = max(soft, br - uThreshold);
  contrib /= max(br, 1e-4);
  vec3 o = min(c*contrib, vec3(uClamp));
  frag = vec4(o, 1.0);
}`;

  const BLUR_FS = HEAD + `
in vec2 vUv;
out vec4 frag;
uniform sampler2D uTex;
uniform vec2 uDir;
void main(){
  vec3 c = vec3(0.0);
  c += texture(uTex, vUv + uDir*-4.0).rgb*0.0162;
  c += texture(uTex, vUv + uDir*-3.0).rgb*0.0540;
  c += texture(uTex, vUv + uDir*-2.0).rgb*0.1216;
  c += texture(uTex, vUv + uDir*-1.0).rgb*0.1945;
  c += texture(uTex, vUv             ).rgb*0.2270;
  c += texture(uTex, vUv + uDir* 1.0).rgb*0.1945;
  c += texture(uTex, vUv + uDir* 2.0).rgb*0.1216;
  c += texture(uTex, vUv + uDir* 3.0).rgb*0.0540;
  c += texture(uTex, vUv + uDir* 4.0).rgb*0.0162;
  frag = vec4(c, 1.0);
}`;

  /* --------------------------- COMPOSITE -------------------------------- */
  const COMPOSITE_FS = HEAD + COLOR + `
in vec2 vUv;
out vec4 frag;
uniform sampler2D uScene, uBloom, uBloom2;
uniform float uBloomStr, uExposure, uHue, uSat, uContrast, uVignette, uChroma, uGrain, uTime, uAspect;
void main(){
  vec2 uv = vUv;
  vec2 dd = uv-0.5; dd.x*=uAspect; float r = length(dd);
  float ca = uChroma*(0.002 + 0.012*r);
  vec2 dir = (uv-0.5);
  vec3 scene;
  scene.r = texture(uScene, uv + dir*ca).r;
  scene.g = texture(uScene, uv).g;
  scene.b = texture(uScene, uv - dir*ca).b;
  vec3 bloom = texture(uBloom, uv).rgb + texture(uBloom2, uv).rgb;
  vec3 col = scene + bloom*uBloomStr;
  col *= uExposure;
  col = acesFilm(col);
  col = hueRot(col, uHue);
  float l = dot(col, vec3(0.2126,0.7152,0.0722));
  col = mix(vec3(l), col, uSat);
  col = (col-0.5)*uContrast + 0.5;
  float vig = smoothstep(1.15, 0.25, r*uVignette);
  col *= mix(1.0, vig, 0.92);
  float g = fract(sin(dot(uv*vec2(uTime*0.7+1.0, uTime*0.9+2.0), vec2(12.9898,78.233)))*43758.5453);
  col += (g-0.5)*uGrain;
  col = clamp(col, 0.0, 1.0);
  frag = vec4(col, 1.0);
}`;

  VZ.SH = {
    FULLSCREEN_VS,
    ADVECT_FS,
    INJECT_FS,
    DISPLAY_FS,
    PARTICLE_UPDATE_VS,
    PARTICLE_UPDATE_FS,
    PARTICLE_RENDER_VS,
    PARTICLE_RENDER_FS,
    BRIGHT_FS,
    BLUR_FS,
    COMPOSITE_FS,
  };
})();
