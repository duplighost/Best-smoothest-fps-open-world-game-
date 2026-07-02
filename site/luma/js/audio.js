/* ============================================================================
 * LUMA — audio.js
 * Web Audio analysis for two optional sources:
 *   • mic   — live microphone (sing / play / ambient)
 *   • file  — a track the user opens (looped)
 *
 * There is no default/generated audio: with no source the visuals simply run
 * and animate on their own. When a source is active we produce, every frame:
 * normalized frequency bands (adaptive to any track), overall energy, spectral
 * flux, a beat envelope + hit flag, and a 256-bin log spectrum for the GPU.
 * ========================================================================== */
(function () {
  "use strict";
  const VZ = (window.VZ = window.VZ || {});
  const U = VZ.util;

  const BANDS = [
    ["bass", 20, 140],
    ["lowMid", 140, 400],
    ["mid", 400, 1600],
    ["highMid", 1600, 5000],
    ["treble", 5000, 16000],
  ];
  const SPEC_BINS = 256;

  class AudioEngine {
    constructor() {
      this.ctx = null;
      this.analyser = null;
      this.outGain = null;
      this.busGain = null;
      this.sourceType = "none";   // 'none' | 'mic' | 'file'
      this.isPlaying = false;
      this.hasSignal = false;
      this.volume = 1.0;

      this.freqData = null;
      this.specData = new Uint8Array(SPEC_BINS);
      this._specSmooth = new Float32Array(SPEC_BINS);
      this._prevSpec = new Float32Array(SPEC_BINS);

      this.levels = { bass: 0, lowMid: 0, mid: 0, highMid: 0, treble: 0, energy: 0 };
      this._env = {};
      for (const [n] of BANDS) this._env[n] = new U.Env(0.04, 0.16);
      this._env.energy = new U.Env(0.05, 0.3);
      this._bandMax = {};
      for (const [n] of BANDS) this._bandMax[n] = 0.15;
      this._energyMax = 0.2;

      this.beat = 0;
      this.beatHit = false;
      this.beatStrength = 0;
      this.flux = 0;
      this._fluxEnv = new U.Env(0.02, 0.12);
      this._history = [];
      this._histSize = 43;
      this._lastBeat = -1;

      this._fileSource = null;
      this._micSource = null;
      this._micStream = null;
      this.audioEl = null;
      this._objUrl = null;
      this._onStateChange = null;
    }

    /* ----------------------------- setup -------------------------------- */
    ensureContext() {
      if (this.ctx) {
        if (this.ctx.state === "suspended") this.ctx.resume();
        return this.ctx;
      }
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC({ latencyHint: "interactive" });
      this.ctx = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.72;
      this.analyser = analyser;
      this.freqData = new Uint8Array(analyser.frequencyBinCount);

      const bus = ctx.createGain();
      bus.gain.value = 1.0;
      this.busGain = bus;
      const out = ctx.createGain();
      out.gain.value = this.volume;
      this.outGain = out;
      // Split analysis from audible output. AnalyserNode passes audio through,
      // so routing analyser -> destination would monitor microphone input.
      bus.connect(analyser);
      bus.connect(out);
      out.connect(ctx.destination);
      return ctx;
    }

    onStateChange(fn) { this._onStateChange = fn; }
    _emit() { if (this._onStateChange) this._onStateChange(this); }

    /* --------------------------- sources -------------------------------- */
    // Single entry point. type: 'mic' | 'file' | 'none'
    async setSource(type, payload) {
      this.ensureContext();
      this._teardown(type);
      try {
        if (type === "mic") {
          await this._startMic();
          this.sourceType = "mic";
          this.isPlaying = true;
        } else if (type === "file") {
          await this._startFile(payload);
          this.sourceType = "file";
          this.isPlaying = true;
        } else {
          this.sourceType = "none";
          this.isPlaying = false;
        }
      } catch (e) {
        this.sourceType = "none";
        this.isPlaying = false;
        this._emit();
        throw e;
      }
      this._emit();
    }

    stop() { return this.setSource("none"); }

    _teardown(keep) {
      if (this._micSource && keep !== "mic") {
        try { this._micSource.disconnect(); } catch (e) {}
        this._micSource = null;
      }
      if (this._micStream && keep !== "mic") {
        this._micStream.getTracks().forEach((t) => t.stop());
        this._micStream = null;
      }
      if (this.audioEl && keep !== "file") {
        try { this.audioEl.pause(); } catch (e) {}
        try { this.audioEl.removeAttribute("src"); this.audioEl.load(); } catch (e) {}
      }
      if (this._objUrl && keep !== "file") {
        try { URL.revokeObjectURL(this._objUrl); } catch (e) {}
        this._objUrl = null;
      }
    }

    async _startMic() {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Microphone capture is not available in this browser.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
        video: false,
      });
      this._micStream = stream;
      const src = this.ctx.createMediaStreamSource(stream);
      this._micSource = src;
      src.connect(this.analyser); // analysis only — never to destination
    }

    async _startFile(file) {
      if (!this.audioEl) {
        const el = new Audio();
        el.crossOrigin = "anonymous";
        el.loop = true;
        el.preload = "auto";
        this.audioEl = el;
        this._fileSource = this.ctx.createMediaElementSource(el);
        this._fileSource.connect(this.busGain);
      }
      if (file) {
        if (this._objUrl) URL.revokeObjectURL(this._objUrl);
        this._objUrl = URL.createObjectURL(file);
        this.audioEl.src = this._objUrl;
        this.fileName = file.name || "track";
      }
      await this.audioEl.play();
    }

    /* --------------------------- playback ------------------------------- */
    play() {
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();
      if (this.sourceType === "file" && this.audioEl) this.audioEl.play();
      this.isPlaying = this.sourceType !== "none";
      this._emit();
    }
    pause() {
      if (this.sourceType === "file" && this.audioEl) this.audioEl.pause();
      this.isPlaying = false;
      this._emit();
    }
    toggle() {
      if (this.sourceType === "file") {
        if (this.isPlaying) this.pause(); else this.play();
      }
    }
    setVolume(v) {
      this.volume = U.clamp01(v);
      if (this.outGain) this.outGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }

    /* ---------------------------- analysis ------------------------------ */
    update(dt) {
      if (!this.analyser) return;
      const a = this.analyser;
      a.getByteFrequencyData(this.freqData);
      const sr = this.ctx.sampleRate;
      const binHz = sr / a.fftSize;
      const fd = this.freqData;

      for (const [name, f0, f1] of BANDS) {
        const i0 = Math.max(1, Math.floor(f0 / binHz));
        const i1 = Math.min(fd.length - 1, Math.ceil(f1 / binHz));
        let sum = 0;
        for (let i = i0; i <= i1; i++) sum += fd[i];
        const raw = sum / Math.max(1, i1 - i0 + 1) / 255;
        this._bandMax[name] = Math.max(raw, this._bandMax[name] * Math.pow(0.5, dt / 6.0));
        const norm = U.clamp01(raw / (this._bandMax[name] + 1e-4));
        this.levels[name] = this._env[name].update(norm, dt);
      }
      let eSum = 0;
      for (let i = 1; i < fd.length; i++) eSum += fd[i];
      const eRaw = eSum / (fd.length - 1) / 255;
      this._energyMax = Math.max(eRaw, this._energyMax * Math.pow(0.5, dt / 8.0));
      const eNorm = U.clamp01(eRaw / (this._energyMax + 1e-4));
      this.levels.energy = this._env.energy.update(eNorm, dt);
      this.hasSignal = eRaw > 0.01;

      const fMin = 30, fMax = Math.min(16000, sr / 2);
      let flux = 0;
      for (let x = 0; x < SPEC_BINS; x++) {
        const f = fMin * Math.pow(fMax / fMin, x / (SPEC_BINS - 1));
        const bin = Math.min(fd.length - 1, Math.max(1, Math.round(f / binHz)));
        const v = (fd[bin] + fd[Math.min(fd.length - 1, bin + 1)]) / 2 / 255;
        this._specSmooth[x] += (v - this._specSmooth[x]) * Math.min(1, dt * 22);
        const d = this._specSmooth[x] - this._prevSpec[x];
        if (d > 0) flux += d;
        this._prevSpec[x] = this._specSmooth[x];
        this.specData[x] = (U.clamp01(this._specSmooth[x]) * 255) | 0;
      }
      this.flux = this._fluxEnv.update(U.clamp01(flux / 12), dt);

      const inst = this.levels.bass * 1.0 + this.levels.lowMid * 0.5;
      this._history.push(inst);
      if (this._history.length > this._histSize) this._history.shift();
      let avg = 0;
      for (const h of this._history) avg += h;
      avg /= Math.max(1, this._history.length);
      this._lastBeat += dt;
      this.beatHit = false;
      if (inst > avg * 1.35 && inst > 0.18 && this._lastBeat > 0.12) {
        this.beatHit = true;
        this.beatStrength = U.clamp01((inst - avg * 1.35) / (avg + 0.25) + 0.3);
        this.beat = Math.max(this.beat, this.beatStrength);
        this._lastBeat = 0;
      }
      this.beat = Math.max(0, this.beat - dt / 0.22);
    }
  }

  VZ.AudioEngine = AudioEngine;
})();
