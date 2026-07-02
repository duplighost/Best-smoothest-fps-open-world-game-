// The sound of STILL. No samples — every noise is synthesized. Three layers:
//   1. your body: heartbeat + breath, driven by one tension scalar (dry,
//      no reverb — it lives inside you)
//   2. the house: room tone drones, creaks, knocks — spatialized with
//      stereo pan + distance + muffle so "behind you, to the left" is real
//   3. it: breathing, footsteps, the drag, the scream. Its breathing is a
//      gameplay signal — you learn to read it or you don't come back up.

import { clamp, clamp01, lerp } from './math.js';

let ctx = null;
let master, sfxBus, verb, verbGain, droneBus;
let unlocked = false;
const lastPlayed = new Map();

// listener state, set each frame by the player
const listener = { x: 0, z: 0, yaw: 0 };
export function setListener(x, z, yaw) { listener.x = x; listener.z = z; listener.yaw = yaw; }

export function audioCtx() { return ctx; }

export function initAudio() {
  if (ctx) return;
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  master = ctx.createDynamicsCompressor();
  master.threshold.value = -14;
  master.knee.value = 20;
  master.ratio.value = 6;
  master.attack.value = 0.003;
  master.release.value = 0.22;
  master.connect(ctx.destination);

  sfxBus = ctx.createGain(); sfxBus.gain.value = 1.0; sfxBus.connect(master);
  droneBus = ctx.createGain(); droneBus.gain.value = 0.8; droneBus.connect(master);

  verb = ctx.createConvolver();
  verb.buffer = makeImpulse(3.6, 2.4);     // a long, cold tail — the house is bigger than it should be
  verbGain = ctx.createGain(); verbGain.gain.value = 0.3;
  verbGain.connect(verb); verb.connect(master);
}

export function resumeAudio() {
  if (!ctx) initAudio();
  if (ctx.state === 'suspended') ctx.resume();
  unlocked = true;
}

function makeImpulse(seconds, decay) {
  const rate = ctx.sampleRate;
  const len = Math.floor(rate * seconds);
  const buf = ctx.createBuffer(2, len, rate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay) * (i % 1733 < 4 ? 2.2 : 1);
    }
  }
  return buf;
}

let noiseBuf = null;
function getNoise() {
  if (noiseBuf) return noiseBuf;
  noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 1.4, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuf;
}

const drift = (cents = 45) => Math.pow(2, ((Math.random() * 2 - 1) * cents) / 1200);

// ---- voice helpers ----------------------------------------------------------
function env(param, t0, peak, attack, decay, curve = 'exp') {
  param.setValueAtTime(0.0001, t0);
  param.linearRampToValueAtTime(peak, t0 + attack);
  if (curve === 'exp') param.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
  else param.linearRampToValueAtTime(0.0001, t0 + attack + decay);
}

// Spatial output chain: pan + distance gain + optional muffle, with reverb send.
function spatialOut(t0, opts) {
  const g = ctx.createGain();
  let out = g;
  if (opts.muffle) {
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = opts.muffle;
    g.connect(f); out = f;
  }
  const pan = ctx.createStereoPanner();
  pan.pan.value = opts.pan ?? 0;
  out.connect(pan);
  pan.connect(sfxBus);
  const rg = ctx.createGain();
  rg.gain.value = opts.reverb ?? 0.35;
  pan.connect(rg); rg.connect(verbGain);
  return { input: g, pan };
}

function osc(type, freq, t0, dur, peak, opts = {}) {
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (opts.slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(1, opts.slideTo), t0 + (opts.slideTime || dur));
  const { input } = spatialOut(t0, opts);
  const g = ctx.createGain();
  env(g.gain, t0, peak, opts.attack || 0.004, dur, opts.curve);
  o.connect(g); g.connect(input);
  o.start(t0); o.stop(t0 + (opts.attack || 0.004) + dur + 0.1);
  return o;
}

function noise(t0, dur, peak, opts = {}) {
  const src = ctx.createBufferSource();
  src.buffer = getNoise();
  src.loop = true;
  src.playbackRate.value = opts.rate || 1;
  const f = ctx.createBiquadFilter();
  f.type = opts.type || 'bandpass';
  f.frequency.setValueAtTime(opts.freq || 1200, t0);
  if (opts.slideTo) f.frequency.exponentialRampToValueAtTime(Math.max(10, opts.slideTo), t0 + dur);
  f.Q.value = opts.q || 1;
  const { input } = spatialOut(t0, opts);
  const g = ctx.createGain();
  env(g.gain, t0, peak, opts.attack || 0.002, dur, opts.curve);
  src.connect(f); f.connect(g); g.connect(input);
  src.start(t0); src.stop(t0 + (opts.attack || 0.002) + dur + 0.1);
}

// pan/gain/muffle from world position relative to the listener
function spatialize(x, z, opts = {}) {
  const dx = x - listener.x, dz = z - listener.z;
  const dist = Math.hypot(dx, dz);
  // right vector of the listener: forward is (-sin yaw, -cos yaw)
  const rx = -Math.cos(listener.yaw), rz = Math.sin(listener.yaw);
  const side = dist > 0.01 ? (dx * rx + dz * rz) / dist : 0;
  // behind sounds get slightly muffled — the skull is in the way
  const fx = -Math.sin(listener.yaw), fz = -Math.cos(listener.yaw);
  const front = dist > 0.01 ? (dx * fx + dz * fz) / dist : 1;
  const behindMuffle = front < -0.3 ? 2400 : undefined;
  return {
    ...opts,
    pan: clamp(side * 0.85, -1, 1),
    gainMult: 1 / (1 + dist * dist * 0.035),
    muffle: opts.muffle ?? behindMuffle,
  };
}

// ---- one-shot recipes ---------------------------------------------------------
const RECIPES = {
  stepWood(t, g, o) {
    noise(t, 0.06, 0.11 * g, { ...o, freq: 320 * drift(80), slideTo: 130, q: 0.8 });
    if (Math.random() < 0.16) noise(t + 0.02, 0.35, 0.05 * g, { ...o, freq: 900 * drift(200), slideTo: 500, q: 6, curve: 'lin' }); // creak
  },
  stepStone(t, g, o) { noise(t, 0.05, 0.09 * g, { ...o, freq: 500, slideTo: 200, q: 0.9 }); },
  stepWater(t, g, o) {
    noise(t, 0.16, 0.13 * g, { ...o, freq: 1500 * drift(120), slideTo: 400, q: 0.7 });
    noise(t + 0.05, 0.2, 0.05 * g, { ...o, freq: 700, slideTo: 2400, q: 1.4, attack: 0.03 });
  },
  creak(t, g, o) { noise(t, 0.7, 0.06 * g, { ...o, freq: 750 * drift(300), slideTo: 480, q: 8, attack: 0.12, curve: 'lin' }); },
  doorCreak(t, g, o) {
    noise(t, 1.4, 0.1 * g, { ...o, freq: 620 * drift(150), slideTo: 900, q: 9, attack: 0.25, curve: 'lin' });
    osc('sine', 70, t, 1.0, 0.06 * g, { ...o, slideTo: 55, attack: 0.2 });
  },
  doorSlam(t, g, o) {
    osc('sine', 90, t, 0.3, 0.5 * g, { ...o, slideTo: 34 });
    noise(t, 0.22, 0.35 * g, { ...o, type: 'lowpass', freq: 900, slideTo: 150 });
  },
  doorLocked(t, g, o) {
    for (let i = 0; i < 3; i++) noise(t + i * 0.09, 0.05, 0.12 * g, { ...o, freq: 1900 * drift(60), q: 3 });
    osc('sine', 110, t, 0.12, 0.14 * g, { ...o, slideTo: 60 });
  },
  knock(t, g, o) {
    for (let i = 0; i < 3; i++) {
      osc('sine', 130 * drift(30), t + i * 0.42, 0.1, 0.3 * g, { ...o, slideTo: 70 });
      noise(t + i * 0.42, 0.05, 0.1 * g, { ...o, freq: 600, slideTo: 250 });
    }
  },
  thudAbove(t, g, o) {
    osc('sine', 75, t, 0.4, 0.32 * g, { ...o, slideTo: 32, muffle: 500 });
    noise(t, 0.3, 0.12 * g, { ...o, type: 'lowpass', freq: 300, slideTo: 90, muffle: 500 });
  },
  dragAbove(t, g, o) {
    noise(t, 2.4, 0.07 * g, { ...o, freq: 260 * drift(60), slideTo: 170, q: 2.4, attack: 0.5, curve: 'lin', muffle: 460 });
  },
  entityStep(t, g, o) {
    osc('sine', 60 * drift(20), t, 0.34, 0.42 * g, { ...o, slideTo: 26 });
    noise(t, 0.16, 0.13 * g, { ...o, type: 'lowpass', freq: 420, slideTo: 100 });
    noise(t + 0.13, 0.5, 0.05 * g, { ...o, freq: 300, slideTo: 150, q: 3, attack: 0.1, curve: 'lin' }); // the drag after
  },
  fuse(t, g, o) {
    osc('square', 220, t, 0.05, 0.08 * g, { ...o, slideTo: 140 });
    noise(t, 0.04, 0.1 * g, { ...o, freq: 2600, q: 2 });
  },
  breaker(t, g, o) {
    noise(t, 0.08, 0.2 * g, { ...o, freq: 1400, slideTo: 300 });
    osc('sine', 120, t, 0.3, 0.25 * g, { ...o, slideTo: 50 });
    osc('sawtooth', 50, t + 0.1, 1.4, 0.05 * g, { ...o, attack: 0.3, curve: 'lin' }); // hum rises
  },
  crank(t, g, o) {
    for (let i = 0; i < 4; i++) noise(t + i * 0.075, 0.04, 0.12 * g, { ...o, freq: 900 * drift(100), slideTo: 400, q: 2.5 });
    osc('sine', 95, t, 0.28, 0.1 * g, { ...o, slideTo: 60 });
  },
  pickup(t, g, o) {
    noise(t, 0.07, 0.07 * g, { ...o, freq: 2400 * drift(120), slideTo: 900, q: 2 });
    osc('sine', 520 * drift(40), t, 0.12, 0.03 * g, o);
  },
  matchOut(t, g, o) { noise(t, 0.12, 0.09 * g, { ...o, freq: 3000, slideTo: 700, attack: 0.01 }); },
  flickerBuzz(t, g, o) {
    osc('sawtooth', 100, t, 0.5, 0.035 * g, { ...o, filter: undefined, curve: 'lin', attack: 0.02 });
    noise(t, 0.4, 0.03 * g, { ...o, freq: 4200, q: 4, curve: 'lin' });
  },
  waterWake(t, g, o) {
    noise(t, 1.3, 0.1 * g, { ...o, freq: 500 * drift(80), slideTo: 1600, q: 0.8, attack: 0.35, curve: 'lin' });
    osc('sine', 65, t, 1.0, 0.07 * g, { ...o, slideTo: 40, attack: 0.3 });
  },
  childTick(t, g, o) {
    // dry wooden tick — like a joint moving one notch
    noise(t, 0.03, 0.14 * g, { ...o, freq: 1700 * drift(150), q: 3 });
    osc('sine', 240 * drift(60), t, 0.05, 0.05 * g, { ...o, slideTo: 120 });
  },
  whisperVoice(t, g, o) {
    // formant sweeps over breath noise — words you almost catch
    for (const [f0, f1, dt, dur] of [[700, 1500, 0, 0.5], [1300, 800, 0.4, 0.5], [900, 1700, 0.85, 0.6]]) {
      noise(t + dt, dur, 0.04 * g, { ...o, freq: f0, slideTo: f1, q: 9, attack: 0.14, curve: 'lin' });
    }
  },
  stinger(t, g, o) {
    osc('sine', 160, t, 0.7, 0.5 * g, { ...o, slideTo: 27, reverb: 0.6 });
    for (const p of [1, 1.06, 1.41, 1.93]) {
      osc('sawtooth', 620 * p, t + 0.02, 0.6, 0.06 * g, { ...o, slideTo: 660 * p, attack: 0.01, reverb: 0.7 });
    }
    noise(t, 0.5, 0.2 * g, { ...o, freq: 2400, slideTo: 300, reverb: 0.6 });
  },
  grab(t, g, o) {
    // the worst sound in the game. broadband hit + scream formants + sub drop.
    osc('sine', 220, t, 1.1, 0.7 * g, { ...o, slideTo: 24 });
    noise(t, 0.9, 0.5 * g, { ...o, freq: 1800, slideTo: 200, q: 0.6 });
    for (const f of [780, 1160, 1620]) {
      noise(t + 0.04, 0.7, 0.16 * g, { ...o, freq: f, slideTo: f * 0.6, q: 7, curve: 'lin' });
    }
  },
  heartSkip(t, g, o) { osc('sine', 130, t, 0.14, 0.4 * g, { slideTo: 60, reverb: 0 }); },
  exhale(t, g, o) { noise(t, 0.8, 0.05 * g, { freq: 640, slideTo: 420, q: 2, attack: 0.2, curve: 'lin', reverb: 0.05 }); },
};

const THROTTLE = { stepWood: 0.12, stepStone: 0.12, stepWater: 0.14, childTick: 0.05, creak: 0.4 };

export function sfx(name, { gain = 1, pan = 0, reverb } = {}) {
  if (!ctx || !unlocked) return;
  const now = ctx.currentTime;
  const min = THROTTLE[name] ?? 0.03;
  if (now - (lastPlayed.get(name) || -9) < min) return;
  lastPlayed.set(name, now);
  RECIPES[name]?.(now, clamp(gain, 0, 2.5), { pan, reverb });
}

export function sfx3d(name, x, z, { gain = 1, muffle, reverb } = {}) {
  if (!ctx || !unlocked) return;
  const now = ctx.currentTime;
  const min = THROTTLE[name] ?? 0.03;
  if (now - (lastPlayed.get(name) || -9) < min) return;
  lastPlayed.set(name, now);
  const o = spatialize(x, z, { muffle, reverb });
  RECIPES[name]?.(now, clamp(gain * o.gainMult, 0, 2.5), o);
}

// ---- continuous engines --------------------------------------------------------

// Your body. Heartbeat + breath, both scaled by one tension value.
class Body {
  start() {
    this.nextBeat = ctx.currentTime + 0.5;
    this.nextBreath = ctx.currentTime + 1.2;
    this.tension = 0;
  }
  update(tension) {
    if (!ctx) return;
    this.tension = tension;
    const now = ctx.currentTime;
    // heartbeat: 52 → 148 bpm
    while (this.nextBeat < now + 0.3) {
      const t = Math.max(now, this.nextBeat);
      const vol = 0.05 + tension * 0.4;
      const f = 120;
      // lub
      const o1 = osc('sine', f * 1.5, t, 0.09, vol, { reverb: 0, attack: 0.008 });
      o1.frequency.exponentialRampToValueAtTime(f, t + 0.06);
      // dub
      const o2 = osc('sine', f * 1.4, t + 0.19, 0.08, vol * 0.65, { reverb: 0, attack: 0.008 });
      o2.frequency.exponentialRampToValueAtTime(f * 0.9, t + 0.24);
      const bpm = 52 + tension * 96;
      this.nextBeat = t + 60 / bpm;
    }
    // breath: calm 13/min → ragged 30/min
    while (this.nextBreath < now + 0.5) {
      const t = Math.max(now, this.nextBreath);
      const shake = tension > 0.55 ? drift(300) : 1;
      const inDur = lerp(0.85, 0.4, tension);
      noise(t, inDur, 0.014 + tension * 0.05, { freq: (520 + tension * 500) * shake, slideTo: 900 + tension * 700, q: 2.2, attack: inDur * 0.5, curve: 'lin', reverb: 0 });
      noise(t + inDur + 0.15, inDur * 1.2, 0.012 + tension * 0.04, { freq: 700, slideTo: 380, q: 2, attack: 0.1, curve: 'lin', reverb: 0 });
      const rate = 13 + tension * 17;
      this.nextBreath = t + 60 / rate;
    }
  }
}

// The house. Per-floor drone: sub sine + slow filtered noise + rare far groans.
class RoomTone {
  start() {
    this.osc = ctx.createOscillator();
    this.osc.type = 'sine';
    this.osc.frequency.value = 38;
    this.oscGain = ctx.createGain();
    this.oscGain.gain.value = 0.0;
    this.osc.connect(this.oscGain); this.oscGain.connect(droneBus);
    this.osc.start();

    this.wind = ctx.createBufferSource();
    this.wind.buffer = getNoise();
    this.wind.loop = true;
    this.windFilter = ctx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.value = 240;
    this.windFilter.Q.value = 1.6;
    this.windGain = ctx.createGain();
    this.windGain.gain.value = 0.0;
    this.wind.connect(this.windFilter); this.windFilter.connect(this.windGain); this.windGain.connect(droneBus);
    this.wind.start();
    this.groanAt = ctx.currentTime + 10;
  }
  // cfg: { sub, subGain, windFreq, windGain }
  set(cfg, seconds = 3) {
    if (!this.osc) return;
    const t = ctx.currentTime;
    this.osc.frequency.setTargetAtTime(cfg.sub, t, seconds * 0.4);
    this.oscGain.gain.setTargetAtTime(cfg.subGain, t, seconds * 0.4);
    this.windFilter.frequency.setTargetAtTime(cfg.windFreq, t, seconds * 0.4);
    this.windGain.gain.setTargetAtTime(cfg.windGain, t, seconds * 0.4);
  }
  update() {
    if (!this.osc) return;
    const now = ctx.currentTime;
    if (now > this.groanAt) {
      this.groanAt = now + 14 + Math.random() * 26;
      // a far, deep settling groan somewhere in the structure
      const pan = Math.random() * 1.6 - 0.8;
      osc('sine', 55 * drift(120), now, 2.6, 0.05, { pan, slideTo: 34, attack: 0.9, curve: 'lin', reverb: 0.85 });
      noise(now + 0.4, 2.0, 0.02, { pan, freq: 190 * drift(80), slideTo: 110, q: 4, attack: 0.8, curve: 'lin', reverb: 0.8 });
    }
  }
}

// It. A breathing loop you can place in the world and read like a metronome.
class EntityBreath {
  constructor() {
    this.on = false;
    this.phase = 'out';
    this.nextAt = 0;
    this.x = 0; this.z = 0;
    this.period = 3.2;
    this.listeners = [];
  }
  start() { this.nextAt = ctx.currentTime + 0.5; }
  setOn(on) { this.on = on; if (on && ctx) this.nextAt = ctx.currentTime + 0.5; }
  setPos(x, z) { this.x = x; this.z = z; }
  onPhase(fn) { this.listeners.push(fn); }
  update() {
    if (!this.on || !ctx) return;
    const now = ctx.currentTime;
    if (now < this.nextAt) return;
    const o = spatialize(this.x, this.z, { reverb: 0.5 });
    const g = Math.min(1.1, o.gainMult * 2.2);
    if (this.phase === 'out') {
      // long wet exhale — while you hear THIS, you may move
      noise(now, this.period * 0.42, 0.3 * g, { ...o, freq: 420 * drift(40), slideTo: 210, q: 1.8, attack: 0.25, curve: 'lin' });
      osc('sawtooth', 46, now, this.period * 0.4, 0.1 * g, { ...o, slideTo: 36, attack: 0.3, curve: 'lin' });
      this.phase = 'in';
      this.nextAt = now + this.period * 0.55;
      for (const fn of this.listeners) fn('out', this.period * 0.5);
    } else {
      // short sharp inhale, then silence — FREEZE
      noise(now, this.period * 0.18, 0.2 * g, { ...o, freq: 650, slideTo: 1100, q: 2.6, attack: 0.04 });
      this.phase = 'out';
      this.nextAt = now + this.period * 0.45;
      for (const fn of this.listeners) fn('in', this.period * 0.45);
    }
  }
}

// The lullaby — a hummed minor tune from very far below. Floor 5's guide.
class Lullaby {
  constructor() {
    this.on = false;
    this.nextNote = 0;
    this.idx = 0;
    this.x = 0; this.z = 0;
    // hummed: A minor-ish, slow, with a wrong note that never resolves
    this.tune = [57, 60, 62, 60, 57, 55, 57, 0, 60, 62, 64, 62, 60, 58, 57, 0];
  }
  start() { if (ctx) this.nextNote = ctx.currentTime + 1; }
  setOn(on) { this.on = on; if (on && ctx) this.nextNote = ctx.currentTime + 1; }
  setPos(x, z) { this.x = x; this.z = z; }
  update() {
    if (!this.on || !ctx) return;
    const now = ctx.currentTime;
    if (now < this.nextNote) return;
    const m = this.tune[this.idx % this.tune.length];
    this.idx++;
    const durBeat = 0.62;
    if (m > 0) {
      const f = 440 * Math.pow(2, (m - 69) / 12);
      const o = spatialize(this.x, this.z, { reverb: 0.9 });
      const g = Math.min(0.5, o.gainMult * 3.2);
      const v = osc('sine', f * drift(14), now, durBeat * 1.7, 0.12 * g, { ...o, attack: 0.18, curve: 'lin' });
      // vibrato — it is a voice, or was
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 5.1;
      const lg = ctx.createGain(); lg.gain.value = f * 0.012;
      lfo.connect(lg); lg.connect(v.frequency);
      lfo.start(now); lfo.stop(now + durBeat * 1.8);
      // breathy layer
      noise(now, durBeat * 1.4, 0.02 * g, { ...o, freq: f * 2.1, q: 8, attack: 0.2, curve: 'lin' });
    }
    this.nextNote = now + durBeat;
  }
}

// Music box in the radio room — plays by itself, slows down, stops. F1's scene.
export function playMusicBox(x, z, onDone) {
  if (!ctx) return;
  const tune = [76, 79, 83, 79, 76, 79, 84, 83, 79, 76, 74, 76, 0, 0];
  let t = ctx.currentTime + 0.2;
  let step = 0.42;
  for (let i = 0; i < 26; i++) {
    const m = tune[i % tune.length];
    if (m > 0) {
      const o = spatialize(x, z, { reverb: 0.75 });
      const f = 440 * Math.pow(2, (m - 69) / 12);
      const g = Math.min(0.6, o.gainMult * 3);
      osc('sine', f * drift(6), t, 1.1, 0.1 * g, { ...o, attack: 0.005 });
      osc('sine', f * 3.01, t, 0.5, 0.02 * g, { ...o, attack: 0.005 });
    }
    t += step;
    if (i > 14) step *= 1.13;      // winding down…
  }
  if (onDone) setTimeout(onDone, (t - ctx.currentTime) * 1000);
}

export const body = new Body();
export const roomTone = new RoomTone();
export const entityBreath = new EntityBreath();
export const lullaby = new Lullaby();

export function startEngines() {
  body.start();
  roomTone.start();
  entityBreath.start();
  lullaby.start();
}
