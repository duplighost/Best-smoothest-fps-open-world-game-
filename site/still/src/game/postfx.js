// One post pass, one render target, one quad — the whole cinematic look.
// Uniforms are emotion channels [ported]: uPulse spikes on big hits,
// uDread rises near bosses and at low health. No EffectComposer chain.

import * as THREE from 'three';

const VERT = /* glsl */`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const FRAG = /* glsl */`
  varying vec2 vUv;
  uniform sampler2D tScene;
  uniform float uTime, uPulse, uDread, uAberration;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec2 uv = vUv;
    vec2 c = uv - 0.5;
    float r = length(c);

    // chromatic aberration, stronger at edges and on hits
    float ab = (uAberration + uPulse * 0.004) * (0.25 + r * 1.6);
    vec3 col;
    col.r = texture2D(tScene, uv + c * ab).r;
    col.g = texture2D(tScene, uv).g;
    col.b = texture2D(tScene, uv - c * ab).b;

    // split-tone: cool shadows, warm highlights
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    float hi = smoothstep(0.28, 0.88, lum);
    col = mix(col * vec3(0.86, 0.92, 1.06), col * vec3(1.08, 1.00, 0.86), hi);

    // gentle contrast + floor — applied only from the low-mids up. A pivot-0.5
    // curve steals what little light the dim scenery has (everything under
    // ~0.2 sinks toward black), which is exactly the "I can't see" complaint;
    // shadows keep their raw values so dark still reads as SHAPE, not void.
    vec3 filmic = (col - 0.5) * (1.06 + uPulse * 0.06 + uDread * 0.1) + 0.5;
    col = mix(col, filmic, smoothstep(0.03, 0.28, lum));
    col = max(col, vec3(0.004));

    // halation on the brightest spots
    col += vec3(1.0, 0.72, 0.42) * smoothstep(0.62, 1.1, lum) * (0.05 + uPulse * 0.1);

    // vignette + dread crush at the edges
    col *= smoothstep(1.05, 0.22, r + uDread * 0.2);
    col = mix(col, vec3(0.06, 0.0, 0.02), uDread * smoothstep(0.35, 0.85, r) * 0.5);

    // grain + dither
    float g = hash(uv * vec2(917.0, 533.0) + uTime);
    col += (g - 0.5) * (0.035 + uDread * 0.05);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class PostFX {
  constructor(renderer) {
    this.renderer = renderer;
    this.enabled = true;
    this.target = new THREE.WebGLRenderTarget(2, 2, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat, type: THREE.UnsignedByteType,
    });
    this.uniforms = {
      tScene: { value: this.target.texture },
      uTime: { value: 0 },
      uPulse: { value: 0 },
      uDread: { value: 0 },
      uAberration: { value: 0.0024 },
    };
    this.quadScene = new THREE.Scene();
    this.quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quadScene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.uniforms, depthWrite: false, depthTest: false })
    ));
    this.dreadTarget = 0;
    this.resize();
  }

  resize() {
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    this.target.setSize(size.x, size.y);
  }

  pulse(v = 1) { this.uniforms.uPulse.value = Math.min(1.4, this.uniforms.uPulse.value + v); }
  setDread(v) { this.dreadTarget = v; }

  render(scene, camera, rawDt, t) {
    const U = this.uniforms;
    U.uTime.value = t % 977;
    U.uPulse.value = Math.max(0, U.uPulse.value - U.uPulse.value * 6 * rawDt);
    U.uDread.value += (this.dreadTarget - U.uDread.value) * Math.min(1, rawDt * 3.5);

    if (!this.enabled) {
      this.renderer.render(scene, camera);
      this.stats = { calls: this.renderer.info.render.calls, triangles: this.renderer.info.render.triangles };
      return;
    }
    this.renderer.setRenderTarget(this.target);
    this.renderer.render(scene, camera);
    // capture the real scene stats before the post quad wipes them
    this.stats = { calls: this.renderer.info.render.calls, triangles: this.renderer.info.render.triangles };
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.quadScene, this.quadCam);
  }
}
