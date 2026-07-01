// Sky dome + sun + sea. One inverted sphere with a gradient shader whose
// colors are region-blended per frame — crossing a border feels like the
// weather changing, not a texture swap. Features fade in by region weight:
// aurora (frost), nebula + dense stars (shatter), ember haze (ember).

import * as THREE from 'three';
import { REGIONS, regionWeights } from './regions.js';
import { damp } from '../core/math.js';

const SKY_VERT = /* glsl */`
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = (projectionMatrix * mv).xyww; // depth = far → always behind
  }
`;

const SKY_FRAG = /* glsl */`
  varying vec3 vDir;
  uniform vec3 uHorizon, uZenith, uSunColor, uSunDir;
  uniform float uTime, uAurora, uNebula, uStars, uEmber;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }

  void main() {
    vec3 d = normalize(vDir);
    float h = clamp(d.y, -0.05, 1.0);

    // base gradient
    vec3 col = mix(uHorizon, uZenith, pow(max(h, 0.0), 0.62));

    // sun disc + glow
    float sd = dot(d, normalize(uSunDir));
    col += uSunColor * (smoothstep(0.9985, 0.9995, sd) * 1.4 + pow(max(sd, 0.0), 90.0) * 0.5);

    // stars — hashed cells, twinkle, fade toward horizon
    if (uStars > 0.01 && d.y > 0.02) {
      vec2 sp = d.xz / (d.y + 0.35) * 38.0;
      vec2 cell = floor(sp);
      float star = hash(cell);
      if (star > 0.965) {
        vec2 c = fract(sp) - 0.5;
        float b = smoothstep(0.14, 0.0, length(c)) * (0.5 + 0.5 * sin(uTime * (1.5 + star * 4.0) + star * 40.0));
        col += vec3(0.9, 0.95, 1.0) * b * uStars * smoothstep(0.02, 0.3, d.y);
      }
    }

    // aurora — flowing curtains
    if (uAurora > 0.01 && d.y > 0.05) {
      float band = noise(vec2(d.x * 3.0 + uTime * 0.05, d.z * 3.0 - uTime * 0.03));
      float curtain = smoothstep(0.45, 0.75, band) * smoothstep(0.05, 0.35, d.y) * smoothstep(0.95, 0.5, d.y);
      float wave = 0.5 + 0.5 * sin(d.x * 9.0 + uTime * 0.4 + band * 6.0);
      col += (vec3(0.2, 1.0, 0.55) * wave + vec3(0.3, 0.4, 1.0) * (1.0 - wave)) * curtain * uAurora * 0.35;
    }

    // nebula — soft dyed clouds among the stars
    if (uNebula > 0.01 && d.y > 0.0) {
      float n = noise(d.xz / (d.y + 0.4) * 2.2 + 7.0);
      float m = noise(d.xz / (d.y + 0.4) * 5.1 - 3.0);
      float neb = smoothstep(0.35, 0.85, n * 0.65 + m * 0.35) * smoothstep(0.0, 0.4, d.y);
      col += (vec3(0.55, 0.2, 0.7) * n + vec3(0.15, 0.25, 0.75) * m) * neb * uNebula * 0.5;
    }

    // ember haze — hot shimmer near the horizon
    if (uEmber > 0.01) {
      float hz = smoothstep(0.35, 0.0, abs(d.y - 0.04));
      float fl = noise(vec2(d.x * 14.0 + uTime * 0.7, d.z * 14.0)) * 0.5 + 0.5;
      col += vec3(1.0, 0.35, 0.1) * hz * fl * uEmber * 0.22;
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

const WATER_VERT = /* glsl */`
  varying vec3 vWorld;
  uniform float uTime;
  void main() {
    vec3 p = position;
    vec4 w = modelMatrix * vec4(p, 1.0);
    w.y += sin(w.x * 0.35 + uTime * 1.1) * 0.06 + sin(w.z * 0.28 - uTime * 0.9) * 0.06;
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const WATER_FRAG = /* glsl */`
  varying vec3 vWorld;
  uniform vec3 uColor, uFogColor, uCam;
  uniform float uTime, uFogDensity;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main() {
    vec3 toCam = uCam - vWorld;
    float dist = length(toCam);
    float fres = pow(1.0 - clamp(normalize(toCam).y, 0.0, 1.0), 3.0);
    // glints
    float g = hash(floor(vWorld.xz * 3.0) + floor(uTime * 2.0));
    float glint = step(0.9965, g) * 0.45;
    vec3 col = uColor * (0.75 + fres * 0.6) + vec3(glint);
    float fog = 1.0 - exp(-uFogDensity * uFogDensity * dist * dist);
    col = mix(col, uFogColor, clamp(fog, 0.0, 1.0));
    gl_FragColor = vec4(col, 0.86);
  }
`;

export class Sky {
  constructor(scene) {
    this.sunDir = new THREE.Vector3(0.35, 0.52, 0.25).normalize();
    this.uniforms = {
      uHorizon: { value: new THREE.Color(1, 0.86, 0.62) },
      uZenith: { value: new THREE.Color(0.36, 0.62, 0.94) },
      uSunColor: { value: new THREE.Color(1, 0.95, 0.8) },
      uSunDir: { value: this.sunDir },
      uTime: { value: 0 },
      uAurora: { value: 0 }, uNebula: { value: 0 }, uStars: { value: 0 }, uEmber: { value: 0 },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: SKY_VERT, fragmentShader: SKY_FRAG,
      uniforms: this.uniforms, side: THREE.BackSide, depthWrite: false, fog: false,
    });
    this.dome = new THREE.Mesh(new THREE.SphereGeometry(900, 32, 18), mat);
    this.dome.frustumCulled = false;
    this.dome.renderOrder = -10;
    scene.add(this.dome);

    // sea
    this.waterUniforms = {
      uColor: { value: new THREE.Color(0.1, 0.3, 0.4) },
      uFogColor: { value: new THREE.Color(0.7, 0.8, 0.8) },
      uCam: { value: new THREE.Vector3() },
      uTime: { value: 0 },
      uFogDensity: { value: 0.006 },
    };
    const wmat = new THREE.ShaderMaterial({
      vertexShader: WATER_VERT, fragmentShader: WATER_FRAG,
      uniforms: this.waterUniforms, transparent: true, fog: false,
    });
    this.water = new THREE.Mesh(new THREE.PlaneGeometry(1900, 1900, 48, 48), wmat);
    this.water.rotation.x = -Math.PI / 2;
    this.water.position.y = 0.0;
    scene.add(this.water);

    // scratch colors for blending
    this._h = new THREE.Color(); this._z = new THREE.Color(); this._s = new THREE.Color();
  }

  // Blend all sky/fog/light targets from region weights at the player.
  update(dt, t, px, pz, scene, sun, hemi) {
    this.uniforms.uTime.value = t;
    this.waterUniforms.uTime.value = t;
    this.dome.position.set(px, 0, pz);
    this.water.position.x = px; this.water.position.z = pz;

    const w = regionWeights(px, pz);
    let hr = 0, hg = 0, hb = 0, zr = 0, zg = 0, zb = 0, sr = 0, sg = 0, sb = 0, si = 0;
    let fr = 0, fg = 0, fb = 0, fd = 0;
    let hsr = 0, hsg = 0, hsb = 0, hgr = 0, hgg = 0, hgb = 0, hi = 0;
    let aurora = 0, nebula = 0, ember = 0, stars = 0;
    for (const k in w) {
      const R = REGIONS[k], v = w[k];
      hr += R.sky.horizon[0] * v; hg += R.sky.horizon[1] * v; hb += R.sky.horizon[2] * v;
      zr += R.sky.zenith[0] * v; zg += R.sky.zenith[1] * v; zb += R.sky.zenith[2] * v;
      sr += R.sun.color[0] * v; sg += R.sun.color[1] * v; sb += R.sun.color[2] * v;
      si += R.sun.intensity * v;
      fr += R.fog.color[0] * v; fg += R.fog.color[1] * v; fb += R.fog.color[2] * v;
      fd += R.fog.density * v;
      hsr += R.hemi.sky[0] * v; hsg += R.hemi.sky[1] * v; hsb += R.hemi.sky[2] * v;
      hgr += R.hemi.ground[0] * v; hgg += R.hemi.ground[1] * v; hgb += R.hemi.ground[2] * v;
      hi += R.hemi.intensity * v;
      if (R.sky.feature === 'aurora') aurora += v;
      if (R.sky.feature === 'nebula') { nebula += v; stars += v; }
      if (R.sky.feature === 'spores') stars += v * 0.6;
      if (R.sky.feature === 'embers') ember += v;
    }

    // ease everything — border crossings feel like weather, not switches
    const e = (cur, target) => damp(cur, target, 1.6, dt);
    const U = this.uniforms;
    U.uHorizon.value.setRGB(e(U.uHorizon.value.r, hr), e(U.uHorizon.value.g, hg), e(U.uHorizon.value.b, hb));
    U.uZenith.value.setRGB(e(U.uZenith.value.r, zr), e(U.uZenith.value.g, zg), e(U.uZenith.value.b, zb));
    U.uSunColor.value.setRGB(e(U.uSunColor.value.r, sr), e(U.uSunColor.value.g, sg), e(U.uSunColor.value.b, sb));
    U.uAurora.value = e(U.uAurora.value, aurora);
    U.uNebula.value = e(U.uNebula.value, nebula);
    U.uStars.value = e(U.uStars.value, stars);
    U.uEmber.value = e(U.uEmber.value, ember);

    if (scene.fog) {
      scene.fog.color.setRGB(e(scene.fog.color.r, fr), e(scene.fog.color.g, fg), e(scene.fog.color.b, fb));
      scene.fog.density = e(scene.fog.density, fd);
      this.waterUniforms.uFogColor.value.copy(scene.fog.color);
      this.waterUniforms.uFogDensity.value = scene.fog.density;
    }
    if (sun) {
      sun.color.setRGB(e(sun.color.r, sr), e(sun.color.g, sg), e(sun.color.b, sb));
      sun.intensity = e(sun.intensity, si * 2.2);
    }
    if (hemi) {
      hemi.color.setRGB(e(hemi.color.r, hsr), e(hemi.color.g, hsg), e(hemi.color.b, hsb));
      hemi.groundColor.setRGB(e(hemi.groundColor.r, hgr), e(hemi.groundColor.g, hgg), e(hemi.groundColor.b, hgb));
      hemi.intensity = e(hemi.intensity, hi);
    }
    // water tint follows fog toward region mood
    const wc = this.waterUniforms.uColor.value;
    wc.setRGB(e(wc.r, fr * 0.25 + 0.03), e(wc.g, fg * 0.35 + 0.08), e(wc.b, fb * 0.45 + 0.12));
    this.waterUniforms.uCam.value.set(px, 0, pz);
  }
}
