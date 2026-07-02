/* ============================================================================
 * LUMA — util.js
 * Small, dependency-free math / color / noise helpers shared across modules.
 * Everything attaches to the global VZ namespace (classic scripts, no bundler).
 * ========================================================================== */
(function () {
  "use strict";
  const VZ = (window.VZ = window.VZ || {});

  const TAU = Math.PI * 2;
  const PI = Math.PI;

  const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
  const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
  const lerp = (a, b, t) => a + (b - a) * t;
  const mix = lerp;
  const fract = (x) => x - Math.floor(x);
  const sign = Math.sign;

  // Smoothstep / smootherstep
  function smoothstep(e0, e1, x) {
    const t = clamp01((x - e0) / (e1 - e0));
    return t * t * (3 - 2 * t);
  }
  function smootherstep(e0, e1, x) {
    const t = clamp01((x - e0) / (e1 - e0));
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  // Re-map a value from one range to another (optionally clamped)
  function remap(x, a, b, c, d, doClamp) {
    let t = (x - a) / (b - a);
    if (doClamp) t = clamp01(t);
    return c + (d - c) * t;
  }

  // Exponential smoothing toward a target, frame-rate independent.
  // `half` = time in seconds to cover half the distance.
  function approach(current, target, dt, half) {
    if (half <= 0) return target;
    const k = 1 - Math.pow(2, -dt / half);
    return current + (target - current) * k;
  }

  // Wrap an angle into [-PI, PI]
  function wrapAngle(a) {
    a = (a + PI) % TAU;
    if (a < 0) a += TAU;
    return a - PI;
  }

  /* ----------------------------- RNG ------------------------------------- */
  // Deterministic, seedable PRNG (mulberry32). Returns a function -> [0,1).
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // A tiny stateful random wrapper with helpers.
  class Rng {
    constructor(seed) {
      this.r = mulberry32((seed ?? (Math.random() * 1e9)) | 0);
    }
    next() { return this.r(); }
    range(a, b) { return a + (b - a) * this.r(); }
    int(a, b) { return Math.floor(this.range(a, b + 1)); }
    pick(arr) { return arr[Math.floor(this.r() * arr.length)]; }
    chance(p) { return this.r() < p; }
    sign() { return this.r() < 0.5 ? -1 : 1; }
    // Pick an index different from `avoid`.
    pickIndexAvoiding(len, avoid) {
      if (len <= 1) return 0;
      let i = Math.floor(this.r() * (len - 1));
      if (i >= avoid) i += 1;
      return i;
    }
  }

  /* ---------------------------- Noise (CPU) ------------------------------ */
  // Cheap 1D value noise + fbm for slow parameter drift on the CPU side.
  function hash1(n) {
    return fract(Math.sin(n * 127.1) * 43758.5453123);
  }
  function vnoise1(x) {
    const i = Math.floor(x);
    const f = x - i;
    const u = f * f * (3 - 2 * f);
    return lerp(hash1(i), hash1(i + 1), u) * 2 - 1; // [-1,1]
  }
  function fbm1(x, oct = 4) {
    let v = 0, amp = 0.5, freq = 1;
    for (let i = 0; i < oct; i++) {
      v += amp * vnoise1(x * freq);
      freq *= 2;
      amp *= 0.5;
    }
    return v;
  }

  /* ----------------------------- Color ----------------------------------- */
  function hslToRgb(h, s, l) {
    h = fract(h);
    const a = s * Math.min(l, 1 - l);
    const f = (n) => {
      const k = (n + h * 12) % 12;
      return l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    };
    return [f(0), f(8), f(4)];
  }
  function rgbToCss(rgb, alpha) {
    const r = Math.round(clamp01(rgb[0]) * 255);
    const g = Math.round(clamp01(rgb[1]) * 255);
    const b = Math.round(clamp01(rgb[2]) * 255);
    return alpha == null ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${alpha})`;
  }
  // Inigo-Quilez style cosine palette (vectors are length-3 arrays).
  function palette(t, a, b, c, d) {
    return [
      a[0] + b[0] * Math.cos(TAU * (c[0] * t + d[0])),
      a[1] + b[1] * Math.cos(TAU * (c[1] * t + d[1])),
      a[2] + b[2] * Math.cos(TAU * (c[2] * t + d[2])),
    ];
  }

  // Linear interpolate two equal-length numeric arrays into `out`.
  function lerpInto(out, a, b, t) {
    for (let i = 0; i < a.length; i++) out[i] = a[i] + (b[i] - a[i]) * t;
    return out;
  }

  /* ------------------------- Envelope follower --------------------------- */
  // Fast-attack / slow-release follower — gives audio values an organic feel.
  class Env {
    constructor(attack = 0.05, release = 0.25, value = 0) {
      this.attack = attack;
      this.release = release;
      this.value = value;
    }
    update(target, dt) {
      const half = target > this.value ? this.attack : this.release;
      this.value = approach(this.value, target, dt, Math.max(0.0001, half));
      return this.value;
    }
  }

  /* ---------------------------- Device ----------------------------------- */
  const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile|webOS|BlackBerry/i.test(
    navigator.userAgent
  );
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const now = () =>
    (window.performance && performance.now ? performance.now() : Date.now());

  VZ.util = {
    TAU, PI,
    clamp, clamp01, lerp, mix, fract, sign,
    smoothstep, smootherstep, remap, approach, wrapAngle,
    mulberry32, Rng,
    fbm1, vnoise1,
    hslToRgb, rgbToCss, palette, lerpInto,
    Env,
    isMobile, isIOS, isTouch, now,
  };
})();
