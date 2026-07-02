/* ============================================================================
 * LUMA — director.js
 * The "never the same" brain. Owns an evolving parameter genome and smoothly
 * conducts it through named visual moods, crossfading palettes, drifting every
 * value on slow noise, and reacting to musical beats with surges and changes.
 *
 * The renderer reads director.out (base params) + palette + palShift and layers
 * live audio modulation on top, so reactivity and evolution stay decoupled.
 * ========================================================================== */
(function () {
  "use strict";
  const VZ = (window.VZ = window.VZ || {});
  const U = VZ.util;

  // Global parameter ranges: name -> [min, max, driftFraction]
  // driftFraction = how much slow noise wobble to add (fraction of the range).
  const RANGES = {
    flowScale:   [1.2, 4.2, 0.10],
    flowSpeed:   [0.05, 0.42, 0.12],
    flowWarp:    [0.2, 2.2, 0.10],
    flowSwirl:   [-0.5, 0.85, 0.12],
    advect:      [0.08, 0.22, 0.06],
    decay:       [0.86, 0.95, 0.02],
    hueDrift:    [-0.12, 0.12, 0.15],

    baseScale:   [0.8, 3.0, 0.10],
    baseSpeed:   [0.04, 0.4, 0.12],
    baseWarp:    [1.2, 4.0, 0.10],
    baseBright:  [0.7, 1.8, 0.06],
    colorSpread: [0.3, 2.0, 0.08],
    ringFreq:    [0.0, 2.2, 0.10],
    fieldSharp:  [0.0, 0.8, 0.08],
    dyeAmt:      [0.6, 1.5, 0.06],

    kaSides:     [1, 12, 0.04],
    kaMix:       [0.0, 1.0, 0.05],
    kaRotSpeed:  [-0.18, 0.18, 0.20],
    viewRotSpeed:[-0.09, 0.09, 0.20],
    mirror:      [0.0, 1.0, 0.05],
    exposure:    [0.9, 1.55, 0.05],

    specGain:    [0.4, 1.5, 0.08],
    specRadius:  [0.12, 0.4, 0.08],
    specWidth:   [0.08, 0.22, 0.10],
    centerPulse: [0.4, 1.4, 0.08],

    particleSpeed:[0.05, 0.22, 0.08],
    particleSize: [1.3, 4.0, 0.08],
    particleBright:[0.5, 1.6, 0.08],
    damp:        [0.94, 0.992, 0.02],
    velColor:    [0.0, 8.0, 0.10],

    bloomStr:    [0.55, 1.6, 0.08],
    bloomThresh: [0.5, 1.15, 0.06],
    sat:         [1.05, 1.7, 0.05],
    contrast:    [0.98, 1.22, 0.04],
    vignette:    [0.7, 1.3, 0.05],
    chroma:      [0.0, 0.6, 0.10],
    grain:       [0.012, 0.05, 0.10],
    hueCycle:    [-0.05, 0.06, 0.20],

    bassPump:    [0.4, 1.3, 0.08],
    midTurb:     [0.3, 1.2, 0.08],
    trebleSpark: [0.4, 1.4, 0.08],
  };
  const PARAMS = Object.keys(RANGES);

  // IQ cosine palette genomes: { a, b, c, d } each length-3.
  const PALETTES = [
    { a: [0.5, 0.5, 0.6], b: [0.5, 0.5, 0.5], c: [1, 1, 1], d: [0.0, 0.10, 0.20] }, // cosmic
    { a: [0.55, 0.32, 0.15], b: [0.45, 0.35, 0.2], c: [1, 1, 1], d: [0.0, 0.05, 0.1] }, // fire
    { a: [0.2, 0.5, 0.42], b: [0.3, 0.4, 0.32], c: [1, 1, 1], d: [0.1, 0.3, 0.5] }, // aurora
    { a: [0.12, 0.32, 0.5], b: [0.3, 0.4, 0.5], c: [1, 1, 1], d: [0.45, 0.5, 0.6] }, // ocean/biolume
    { a: [0.6, 0.3, 0.6], b: [0.4, 0.3, 0.45], c: [1, 1, 1], d: [0.2, 0.0, 0.32] }, // violet
    { a: [0.5, 0.5, 0.5], b: [0.5, 0.5, 0.5], c: [1, 1, 1], d: [0.0, 0.33, 0.67] }, // rainbow
    { a: [0.62, 0.42, 0.32], b: [0.42, 0.4, 0.32], c: [1, 1, 1], d: [0.0, 0.1, 0.2] }, // sunset
    { a: [0.42, 0.5, 0.6], b: [0.32, 0.33, 0.42], c: [1, 1, 1], d: [0.5, 0.55, 0.6] }, // ice
    { a: [0.6, 0.5, 0.62], b: [0.4, 0.4, 0.35], c: [1, 1, 1], d: [0.1, 0.2, 0.35] }, // candy
    { a: [0.2, 0.45, 0.3], b: [0.3, 0.4, 0.35], c: [1, 1, 1], d: [0.2, 0.35, 0.2] }, // emerald
  ];

  // Visual moods: partial range overrides + preferred palettes.
  const MODES = [
    { name: "Nebula", pal: [0, 4, 7], r: {
      flowScale: [1.3, 2.2], flowSpeed: [0.05, 0.12], flowWarp: [0.8, 1.6],
      flowSwirl: [0.05, 0.3], decay: [0.92, 0.95], kaMix: [0.0, 0.25],
      kaSides: [2, 3], particleSpeed: [0.06, 0.12], bloomStr: [1.05, 1.5],
      chroma: [0.08, 0.35], sat: [1.05, 1.35], centerPulse: [0.7, 1.2],
      baseScale: [0.9, 1.7], baseSpeed: [0.05, 0.12], baseWarp: [2.2, 3.6],
      colorSpread: [0.4, 0.9], ringFreq: [0.0, 0.6], fieldSharp: [0.0, 0.3],
      baseBright: [0.95, 1.5] } },
    { name: "Kaleidobloom", pal: [4, 5, 8, 0], r: {
      kaMix: [0.7, 1.0], kaSides: [4, 12], kaRotSpeed: [-0.16, 0.16],
      flowScale: [2.0, 3.6], flowSwirl: [0.1, 0.5], specGain: [0.8, 1.4],
      specRadius: [0.15, 0.32], bloomStr: [1.0, 1.4], mirror: [0.3, 0.9],
      ringFreq: [0.8, 2.0], fieldSharp: [0.3, 0.7], colorSpread: [0.6, 1.4],
      baseScale: [1.2, 2.4], baseBright: [0.9, 1.4] } },
    { name: "Liquid Chrome", pal: [7, 3, 5], r: {
      sat: [0.75, 1.05], contrast: [1.05, 1.22], decay: [0.88, 0.92],
      advect: [0.14, 0.22], flowSpeed: [0.16, 0.32], bloomStr: [0.8, 1.1],
      chroma: [0.2, 0.5], particleBright: [0.9, 1.4], kaMix: [0.0, 0.4],
      fieldSharp: [0.45, 0.8], colorSpread: [0.2, 0.6], baseBright: [0.85, 1.3],
      baseWarp: [1.6, 3.0], dyeAmt: [0.8, 1.4] } },
    { name: "Aurora", pal: [2, 9, 3], r: {
      flowSwirl: [-0.12, 0.12], flowScale: [1.6, 2.6], flowSpeed: [0.07, 0.16],
      mirror: [0.3, 0.85], kaSides: [1, 2], kaMix: [0.1, 0.5], hueDrift: [-0.1, 0.1],
      decay: [0.92, 0.95], sat: [1.05, 1.4], bloomStr: [1.0, 1.4],
      baseScale: [0.9, 1.9], ringFreq: [0.0, 0.35], colorSpread: [0.5, 1.1],
      fieldSharp: [0.1, 0.4], baseSpeed: [0.05, 0.14], baseBright: [1.0, 1.6] } },
    { name: "Inferno", pal: [1, 6, 4], r: {
      bassPump: [0.9, 1.3], flowSpeed: [0.2, 0.4], advect: [0.15, 0.22],
      flowSwirl: [0.2, 0.65], bloomStr: [1.15, 1.6], sat: [1.15, 1.6],
      centerPulse: [0.95, 1.4], particleSpeed: [0.12, 0.22], chroma: [0.15, 0.45],
      baseSpeed: [0.2, 0.4], colorSpread: [0.5, 1.2], baseBright: [1.0, 1.8],
      fieldSharp: [0.2, 0.6], baseWarp: [2.0, 4.0] } },
    { name: "Bioluminescence", pal: [3, 9, 4], r: {
      particleBright: [1.05, 1.6], particleSize: [2.2, 4.0], bloomStr: [1.1, 1.5],
      decay: [0.92, 0.95], exposure: [1.0, 1.35], specGain: [0.6, 1.0],
      flowSpeed: [0.06, 0.14], velColor: [2, 7],
      baseBright: [0.7, 1.2], colorSpread: [0.6, 1.4], fieldSharp: [0.2, 0.5],
      ringFreq: [0.0, 0.8], baseScale: [1.0, 2.2] } },
    { name: "Crystal", pal: [7, 5, 8], r: {
      kaSides: [6, 12], kaMix: [0.6, 1.0], chroma: [0.25, 0.6], contrast: [1.05, 1.22],
      flowWarp: [0.2, 0.8], flowSwirl: [-0.3, 0.3], kaRotSpeed: [-0.12, 0.12],
      bloomStr: [0.9, 1.3], specRadius: [0.18, 0.34],
      ringFreq: [1.2, 2.2], fieldSharp: [0.5, 0.8], colorSpread: [0.8, 1.6],
      baseScale: [1.5, 2.8], baseBright: [0.9, 1.4] } },
    { name: "Ink", pal: [0, 4, 7, 3], r: {
      decay: [0.93, 0.95], sat: [0.9, 1.25], flowWarp: [1.2, 2.2],
      advect: [0.1, 0.16], bloomStr: [0.7, 1.05], kaMix: [0.0, 0.2],
      flowSpeed: [0.05, 0.12], chroma: [0.1, 0.4], particleBright: [0.5, 0.9],
      baseBright: [0.65, 1.05], baseWarp: [2.5, 4.0], colorSpread: [0.3, 0.8],
      fieldSharp: [0.0, 0.3], baseScale: [0.9, 1.8] } },
    { name: "Prism", pal: [5, 8, 6], r: {
      hueCycle: [0.03, 0.06], hueDrift: [0.08, 0.25], sat: [1.25, 1.6],
      chroma: [0.2, 0.5], kaSides: [3, 6], kaMix: [0.3, 0.75], flowSpeed: [0.12, 0.26],
      bloomStr: [1.0, 1.4],
      colorSpread: [1.2, 2.0], ringFreq: [0.5, 1.5], fieldSharp: [0.2, 0.6],
      baseSpeed: [0.12, 0.3], baseBright: [0.9, 1.4] } },
  ];

  class Director {
    constructor(seed) {
      this.rng = new U.Rng(seed);
      this.time = 0;
      this.intensity = 1.0;
      this.surge = 0;

      this.out = {};
      this.from = {};
      this.to = {};
      this._phase = {};
      for (const p of PARAMS) {
        const mid = (RANGES[p][0] + RANGES[p][1]) * 0.5;
        this.out[p] = mid;
        this.from[p] = mid;
        this.to[p] = mid;
        this._phase[p] = this.rng.range(0, 1000);
      }

      this.modeIndex = -1;
      this.modeName = "";
      this.transStart = 0;
      this.transDur = 6;
      this.modeDur = 22;
      this.modeEndsAt = 0;

      // palette crossfade state
      this.palFrom = clonePal(PALETTES[0]);
      this.palTo = clonePal(PALETTES[0]);
      this.palStart = 0;
      this.palDur = 8;
      this.palette = clonePal(PALETTES[0]);
      this.palShift = this.rng.range(0, 1);

      this._beatCool = 0;
      this.newMode(true);
    }

    setIntensity(v) { this.intensity = U.clamp(v, 0.2, 1.6); }

    newMode(initial) {
      let i;
      if (this._forceIndex != null) { i = this._forceIndex; this._forceIndex = null; }
      else i = this.rng.pickIndexAvoiding(MODES.length, this.modeIndex < 0 ? 0 : this.modeIndex);
      this.modeIndex = i;
      const mode = MODES[i];
      this.modeName = mode.name;
      // snapshot current displayed values as the crossfade start
      for (const p of PARAMS) this.from[p] = this.out[p];
      // choose targets
      for (const p of PARAMS) {
        const range = (mode.r && mode.r[p]) || RANGES[p];
        this.to[p] = this.rng.range(range[0], range[1]);
      }
      this.transStart = this.time;
      this.transDur = initial ? 2.5 : this.rng.range(5, 11);
      this.modeDur = this.rng.range(16, 34);
      this.modeEndsAt = this.time + this.modeDur;

      // palette target from this mode's pool
      const palIdx = this.rng.pick(mode.pal);
      this.palFrom = clonePal(this.palette);
      this.palTo = clonePal(PALETTES[palIdx]);
      this.palStart = this.time;
      this.palDur = initial ? 2.0 : this.rng.range(5, 10);
    }

    shuffle() {
      // user-triggered: jump to a fresh mood quickly
      this.newMode(false);
      this.transDur = 3.5;
      this.palDur = 3.0;
      this.palShift += this.rng.range(0.1, 0.4);
      this.surge = 1.0;
    }

    // Jump straight to a named mood (used by tooling / future mode picker).
    forceMode(name, snapPalette) {
      const idx = MODES.findIndex((m) => m.name === name);
      if (idx < 0) return false;
      this._forceIndex = idx;
      this.newMode(false);
      if (snapPalette) this.palStart = this.time - this.palDur; // settle palette now
      return true;
    }

    update(dt, audio) {
      this.time += dt;

      // mode crossfade progress
      const tp = U.clamp01((this.time - this.transStart) / this.transDur);
      const e = U.smootherstep(0, 1, tp);
      for (const p of PARAMS) {
        const base = U.lerp(this.from[p], this.to[p], e);
        const [mn, mx, drift] = RANGES[p];
        const amp = (mx - mn) * drift;
        const wob = U.fbm1(this.time * 0.08 + this._phase[p], 4) * amp;
        let v = base + wob;
        this.out[p] = U.clamp(v, mn, mx);
      }

      // palette crossfade
      const pp = U.smootherstep(0, 1, U.clamp01((this.time - this.palStart) / this.palDur));
      for (const key of ["a", "b", "c", "d"]) {
        U.lerpInto(this.palette[key], this.palFrom[key], this.palTo[key], pp);
      }

      // colour motion: hue offset advances over time, faster with energy
      const energy = audio ? audio.levels.energy : 0;
      this.palShift += dt * (0.02 + this.out.hueCycle * 0.5 + energy * 0.05);
      this.palShift = U.fract(this.palShift);

      // beat reactions — only slow, smoothly-crossfaded structural nudges; no
      // per-beat colour/brightness jumps (those would read as strobing)
      this._beatCool -= dt;
      if (audio && audio.beatHit) {
        const s = audio.beatStrength;
        if (s > 0.5) this.surge = Math.max(this.surge, s * 0.4);
        if (this._beatCool <= 0 && s > 0.6) {
          this._beatCool = 1.5;
          // strong beat: retarget symmetry within the current mood (crossfades)
          const mode = MODES[this.modeIndex];
          const r = (mode.r && mode.r.kaSides) || RANGES.kaSides;
          if (this.rng.chance(0.4)) this.to.kaSides = this.rng.range(r[0], r[1]);
          // rare early mood change on big drops, with a gentle transition
          if (this.rng.chance(0.1) && this.time - this.transStart > 8) {
            this.newMode(false);
            this.transDur = 5.0;
          }
        }
      }
      this.surge = Math.max(0, this.surge - dt / 0.6);

      // scheduled mood change
      if (this.time > this.modeEndsAt) this.newMode(false);

      // optional hard overrides (debug / future manual control panel)
      if (this._override) for (const k in this._override) this.out[k] = this._override[k];

      this.modeProgress = tp;
    }

    setOverride(obj) { this._override = obj; }
  }

  function clonePal(p) {
    return { a: p.a.slice(), b: p.b.slice(), c: p.c.slice(), d: p.d.slice() };
  }

  Director.PALETTES = PALETTES;
  Director.MODES = MODES;
  VZ.Director = Director;
})();
