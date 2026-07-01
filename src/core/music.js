// Generative ambient score. Each region owns a key, a chord walk, and a
// timbre; the engine schedules slow pad chords, a sub root, and sparse
// melodic sparkles a few seconds ahead. Combat fades in a pulse layer.
// Region changes don't hard-cut — new chords simply arrive in the new
// palette while the old ones ring out, which sounds like weather changing.

import { audioCtx, musicInput } from './audio.js';

// Scale intervals in semitones from root.
const SCALES = {
  lydian: [0, 2, 4, 6, 7, 9, 11],
  major: [0, 2, 4, 5, 7, 9, 11],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  aeolian: [0, 2, 3, 5, 7, 8, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
};

// Chord degrees to walk through (index into scale, building stacked thirds).
const REGION_MUSIC = {
  vale:    { root: 57, scale: 'lydian',   walk: [0, 3, 4, 1], padType: 'triangle', padCut: 900,  sparkle: 0.5,  sparkleOct: 2, bright: 1.0 },
  ember:   { root: 50, scale: 'phrygian', walk: [0, 1, 0, 5], padType: 'sawtooth', padCut: 520,  sparkle: 0.18, sparkleOct: 1, bright: 0.7 },
  frost:   { root: 62, scale: 'aeolian',  walk: [0, 5, 3, 4], padType: 'sine',     padCut: 1400, sparkle: 0.42, sparkleOct: 2, bright: 1.2 },
  mycel:   { root: 52, scale: 'dorian',   walk: [0, 2, 5, 3], padType: 'triangle', padCut: 640,  sparkle: 0.34, sparkleOct: 1, bright: 0.8 },
  shatter: { root: 55, scale: 'aeolian',  walk: [0, 4, 5, 2], padType: 'sawtooth', padCut: 760,  sparkle: 0.26, sparkleOct: 2, bright: 0.9 },
  boss:    { root: 48, scale: 'phrygian', walk: [0, 1, 3, 1], padType: 'sawtooth', padCut: 480,  sparkle: 0.1,  sparkleOct: 1, bright: 0.6 },
};

const midiHz = (m) => 440 * Math.pow(2, (m - 69) / 12);

class MusicEngine {
  constructor() {
    this.enabled = false;
    this.region = 'vale';
    this.mode = 'world';        // 'world' | 'interior' | 'boss'
    this.intensity = 0;         // combat 0..1, eased externally
    this.chordIdx = 0;
    this.nextChordAt = 0;
    this.nextSparkleAt = 0;
    this.pulse = null;          // combat layer nodes
    this.timer = 0;
  }

  start() {
    if (this.enabled) return;
    const ctx = audioCtx();
    if (!ctx) return;
    this.enabled = true;

    this.out = ctx.createGain();
    this.out.gain.value = 1;
    this.out.connect(musicInput());

    // Combat pulse layer: filtered saw eighth-notes, gain driven by intensity.
    this.pulseGain = ctx.createGain();
    this.pulseGain.gain.value = 0;
    this.pulseGain.connect(this.out);

    this.nextChordAt = ctx.currentTime + 0.2;
    this.nextSparkleAt = ctx.currentTime + 2;
    this.nextPulseAt = ctx.currentTime + 0.2;
    this.timer = setInterval(() => this.tick(), 120);
  }

  stop() {
    clearInterval(this.timer);
    this.enabled = false;
  }

  setRegion(r) { if (REGION_MUSIC[r]) this.region = r; }
  setMode(m) { this.mode = m; }
  setIntensity(v) {
    // throttle: this is called per frame — only touch the AudioParam on real change
    if (Math.abs(v - this.intensity) < 0.015 && v !== 0) return;
    this.intensity = v;
    if (this.pulseGain && audioCtx()) {
      this.pulseGain.gain.setTargetAtTime(v * 0.5, audioCtx().currentTime, 0.6);
    }
  }

  tick() {
    const ctx = audioCtx();
    if (!ctx || ctx.state !== 'running') return;
    const now = ctx.currentTime;
    const cfg = REGION_MUSIC[this.mode === 'boss' ? 'boss' : this.region];
    const interior = this.mode === 'interior';

    // ---- chords -----------------------------------------------------------
    if (now >= this.nextChordAt - 0.15) {
      const t = Math.max(now, this.nextChordAt);
      const dur = this.mode === 'boss' ? 5.2 : 9.0;
      this.playChord(cfg, t, dur, interior);
      this.chordIdx = (this.chordIdx + 1) % cfg.walk.length;
      this.nextChordAt = t + dur * 0.92;
    }

    // ---- sparkles ---------------------------------------------------------
    if (now >= this.nextSparkleAt) {
      const density = interior ? cfg.sparkle * 0.5 : cfg.sparkle;
      if (Math.random() < density) this.playSparkle(cfg, now + 0.05, interior);
      this.nextSparkleAt = now + 1.4 + Math.random() * 2.6;
    }

    // ---- combat pulse -----------------------------------------------------
    if (this.intensity > 0.03 || this.mode === 'boss') {
      const bps = this.mode === 'boss' ? 3.4 : 2.6;
      while (this.nextPulseAt < now + 0.5) {
        this.playPulseNote(cfg, this.nextPulseAt);
        this.nextPulseAt += 1 / bps;
      }
    } else {
      this.nextPulseAt = now + 0.1;
    }
  }

  chordNotes(cfg) {
    const scale = SCALES[cfg.scale];
    const deg = cfg.walk[this.chordIdx];
    const at = (i) => cfg.root + 12 * Math.floor((deg + i) / scale.length) + scale[(deg + i) % scale.length];
    return [at(0) - 12, at(0), at(2), at(4)]; // root-an-octave-down + triad
  }

  playChord(cfg, t, dur, interior) {
    const ctx = audioCtx();
    const notes = this.chordNotes(cfg);
    const vol = interior ? 0.045 : 0.06;
    notes.forEach((m, i) => {
      // Two detuned oscillators per voice — instant analog-ish width.
      for (const det of [-6, 6]) {
        const o = ctx.createOscillator();
        o.type = i === 0 ? 'sine' : cfg.padType;
        o.frequency.value = midiHz(m);
        o.detune.value = det + (Math.random() * 4 - 2);
        const f = ctx.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.setValueAtTime(cfg.padCut * (interior ? 0.7 : 1), t);
        f.frequency.linearRampToValueAtTime(cfg.padCut * 1.6, t + dur * 0.5);
        f.frequency.linearRampToValueAtTime(cfg.padCut * 0.8, t + dur);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(vol * (i === 0 ? 1.25 : 0.8), t + dur * 0.35);
        g.gain.linearRampToValueAtTime(0.0001, t + dur);
        o.connect(f); f.connect(g); g.connect(this.out);
        o.start(t); o.stop(t + dur + 0.1);
      }
    });
  }

  playSparkle(cfg, t, interior) {
    const ctx = audioCtx();
    const scale = SCALES[cfg.scale];
    const step = scale[Math.floor(Math.random() * scale.length)];
    const m = cfg.root + step + 12 * (1 + Math.floor(Math.random() * cfg.sparkleOct));
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = midiHz(m);
    const g = ctx.createGain();
    const vol = (interior ? 0.05 : 0.07) * cfg.bright;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
    // A fifth-harmonic ghost gives it a bell character.
    const o2 = ctx.createOscillator();
    o2.type = 'sine';
    o2.frequency.value = midiHz(m) * 3.02;
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.0001, t);
    g2.gain.linearRampToValueAtTime(vol * 0.24, t + 0.02);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    o.connect(g); o2.connect(g2); g.connect(this.out); g2.connect(this.out);
    o.start(t); o.stop(t + 2.4); o2.start(t); o2.stop(t + 1.3);
  }

  playPulseNote(cfg, t) {
    const ctx = audioCtx();
    const scale = SCALES[cfg.scale];
    const deg = cfg.walk[this.chordIdx];
    const m = cfg.root - 12 + scale[deg % scale.length];
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = midiHz(m);
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(1200, t);
    f.frequency.exponentialRampToValueAtTime(180, t + 0.16);
    f.Q.value = 2;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.15, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    o.connect(f); f.connect(g); g.connect(this.pulseGain);
    o.start(t); o.stop(t + 0.3);
    // Noise tick on top for drive.
    const src = ctx.createBufferSource();
    src.buffer = noiseTick(ctx);
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.06, t);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    src.connect(g2); g2.connect(this.pulseGain);
    src.start(t);
  }
}

let tickBuf = null;
function noiseTick(ctx) {
  if (tickBuf) return tickBuf;
  tickBuf = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
  const d = tickBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  return tickBuf;
}

export const music = new MusicEngine();
