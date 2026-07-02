// All sound is synthesized — no samples. Each effect is a small recipe of
// oscillators/noise through filters with sharp envelopes. Three rules keep it
// feeling expensive: (1) every event layers a click + a body + a tail,
// (2) every trigger gets small random pitch drift, (3) busy events are
// throttled so 30 simultaneous hits never become white noise.

import { clamp } from './math.js';

let ctx = null;
let master, sfxBus, musicBus, verb, verbGain;
const lastPlayed = new Map(); // throttle per-name
let unlocked = false;

export function audioCtx() { return ctx; }
export function musicInput() { return musicBus; }

export function initAudio() {
  if (ctx) return;
  ctx = new (window.AudioContext || window.webkitAudioContext)();

  master = ctx.createDynamicsCompressor();
  master.threshold.value = -16;
  master.knee.value = 22;
  master.ratio.value = 5;
  master.attack.value = 0.004;
  master.release.value = 0.18;
  master.connect(ctx.destination);

  sfxBus = ctx.createGain(); sfxBus.gain.value = 0.9; sfxBus.connect(master);
  musicBus = ctx.createGain(); musicBus.gain.value = 0.62; musicBus.connect(master);

  // Cheap generated impulse-response reverb; a light send makes synth
  // blips read as sounds happening in a place.
  verb = ctx.createConvolver();
  verb.buffer = makeImpulse(2.2, 2.6);
  verbGain = ctx.createGain(); verbGain.gain.value = 0.16;
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
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
  }
  return buf;
}

let noiseBuf = null;
function getNoise() {
  if (noiseBuf) return noiseBuf;
  const len = ctx.sampleRate * 1.2;
  noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuf;
}

// ---- voice helpers -------------------------------------------------------

function env(param, t0, peak, attack, decay, curve = 'exp') {
  param.setValueAtTime(0.0001, t0);
  param.linearRampToValueAtTime(peak, t0 + attack);
  if (curve === 'exp') param.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
  else param.linearRampToValueAtTime(0.0001, t0 + attack + decay);
}

function osc(type, freq, t0, dur, gainPeak, opts = {}) {
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (opts.slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(1, opts.slideTo), t0 + (opts.slideTime || dur));
  const g = ctx.createGain();
  env(g.gain, t0, gainPeak, opts.attack || 0.002, dur, opts.curve);
  o.connect(g);
  let out = g;
  if (opts.filter) {
    const f = ctx.createBiquadFilter();
    f.type = opts.filter.type || 'lowpass';
    f.frequency.setValueAtTime(opts.filter.freq, t0);
    if (opts.filter.slideTo) f.frequency.exponentialRampToValueAtTime(Math.max(10, opts.filter.slideTo), t0 + dur);
    f.Q.value = opts.filter.q || 0.8;
    g.connect(f); out = f;
  }
  out.connect(sfxBus);
  if (opts.reverb) { const rg = ctx.createGain(); rg.gain.value = opts.reverb; out.connect(rg); rg.connect(verbGain); }
  o.start(t0); o.stop(t0 + (opts.attack || 0.002) + dur + 0.05);
  return o;
}

function noise(t0, dur, gainPeak, opts = {}) {
  const src = ctx.createBufferSource();
  src.buffer = getNoise();
  src.loop = true;
  src.playbackRate.value = opts.rate || 1;
  const g = ctx.createGain();
  env(g.gain, t0, gainPeak, opts.attack || 0.001, dur, opts.curve);
  const f = ctx.createBiquadFilter();
  f.type = opts.type || 'bandpass';
  f.frequency.setValueAtTime(opts.freq || 2000, t0);
  if (opts.slideTo) f.frequency.exponentialRampToValueAtTime(Math.max(10, opts.slideTo), t0 + dur);
  f.Q.value = opts.q || 1;
  src.connect(g); g.connect(f); f.connect(sfxBus);
  if (opts.reverb) { const rg = ctx.createGain(); rg.gain.value = opts.reverb; f.connect(rg); rg.connect(verbGain); }
  src.start(t0); src.stop(t0 + (opts.attack || 0.001) + dur + 0.05);
}

const drift = (cents = 60) => Math.pow(2, ((Math.random() * 2 - 1) * cents) / 1200);

// ---- the SFX kit ---------------------------------------------------------
// sfx(name, opts): opts.pitch multiplies frequencies, opts.gain scales level.

const RECIPES = {
  // Sparkcaster primary — snappy zap: click + zap body + airy tail.
  shoot(t, p, g) {
    noise(t, 0.03, 0.5 * g, { type: 'highpass', freq: 3000, attack: 0.001 });
    osc('square', 1400 * p, t, 0.07, 0.22 * g, { slideTo: 300 * p, filter: { type: 'lowpass', freq: 4200, slideTo: 800 } });
    osc('sine', 220 * p, t, 0.09, 0.3 * g, { slideTo: 90 * p });
  },
  shoot2(t, p, g) { // evolved voice — meatier
    noise(t, 0.04, 0.55 * g, { type: 'highpass', freq: 2400 });
    osc('sawtooth', 900 * p, t, 0.1, 0.26 * g, { slideTo: 160 * p, filter: { type: 'lowpass', freq: 3600, slideTo: 500 } });
    osc('sine', 150 * p, t, 0.12, 0.38 * g, { slideTo: 60 * p });
  },
  charge(t, p, g) { // rising whine while holding
    osc('sawtooth', 180 * p, t, 0.5, 0.14 * g, { slideTo: 900 * p, slideTime: 0.5, attack: 0.05, curve: 'lin', filter: { type: 'bandpass', freq: 1200, q: 3 } });
  },
  lance(t, p, g) { // charge shot release — thunder crack
    noise(t, 0.18, 0.7 * g, { type: 'lowpass', freq: 5000, slideTo: 300, reverb: 0.5 });
    osc('sawtooth', 600 * p, t, 0.22, 0.4 * g, { slideTo: 70 * p, filter: { type: 'lowpass', freq: 3000, slideTo: 240 }, reverb: 0.4 });
    osc('sine', 90 * p, t, 0.3, 0.5 * g, { slideTo: 38 * p });
  },
  seeker(t, p, g) { // spore rockets — soft whoosh volley
    noise(t, 0.22, 0.32 * g, { freq: 900, slideTo: 2600, q: 2, attack: 0.03, reverb: 0.3 });
    osc('sine', 500 * p, t, 0.2, 0.16 * g, { slideTo: 1100 * p, attack: 0.02 });
  },
  hit(t, p, g) { // enemy hit tick — crisp, quiet, satisfying
    osc('triangle', 900 * p, t, 0.045, 0.3 * g, { slideTo: 500 * p });
    noise(t, 0.02, 0.22 * g, { type: 'highpass', freq: 5000 });
  },
  kill(t, p, g) { // kill thump + airy bloom
    osc('sine', 200 * p, t, 0.2, 0.55 * g, { slideTo: 46 * p });
    noise(t, 0.14, 0.3 * g, { freq: 2600, slideTo: 500, reverb: 0.5 });
    osc('sine', 640 * p, t + 0.02, 0.18, 0.14 * g, { slideTo: 1280 * p, reverb: 0.6 });
  },
  chime(t, p, g) { // streak chime — pitch is passed in rising steps
    osc('sine', 740 * p, t, 0.3, 0.2 * g, { attack: 0.004, reverb: 0.7 });
    osc('sine', 1480 * p, t, 0.22, 0.08 * g, { attack: 0.004, reverb: 0.7 });
  },
  breakwood(t, p, g) {
    noise(t, 0.09, 0.55 * g, { freq: 700 * p, slideTo: 260, q: 0.7 });
    osc('triangle', 180 * p, t, 0.07, 0.3 * g, { slideTo: 70 });
    noise(t + 0.03, 0.1, 0.2 * g, { freq: 1600, slideTo: 500 });
  },
  breakpot(t, p, g) {
    noise(t, 0.1, 0.5 * g, { freq: 3400 * p, slideTo: 1100, q: 2, reverb: 0.25 });
    osc('square', 820 * p, t, 0.05, 0.12 * g, { slideTo: 420 });
  },
  breakcrystal(t, p, g) {
    for (let i = 0; i < 4; i++) {
      osc('sine', (1200 + i * 460) * p * drift(30), t + i * 0.016, 0.22, 0.12 * g, { reverb: 0.7 });
    }
    noise(t, 0.06, 0.3 * g, { type: 'highpass', freq: 6000 });
  },
  step(t, p, g) {
    noise(t, 0.05, 0.16 * g, { freq: 480 * p, slideTo: 180, q: 0.8 });
  },
  jump(t, p, g) {
    noise(t, 0.09, 0.14 * g, { freq: 700, slideTo: 1600, attack: 0.02 });
    osc('sine', 240 * p, t, 0.1, 0.12 * g, { slideTo: 420 * p, attack: 0.015 });
  },
  doublejump(t, p, g) {
    osc('sine', 420 * p, t, 0.12, 0.2 * g, { slideTo: 840 * p, attack: 0.01, reverb: 0.3 });
    noise(t, 0.1, 0.14 * g, { freq: 1400, slideTo: 3200, attack: 0.02 });
  },
  land(t, p, g) {
    osc('sine', 140 * p, t, 0.09, 0.3 * g, { slideTo: 60 });
    noise(t, 0.05, 0.2 * g, { freq: 500, slideTo: 200 });
  },
  dash(t, p, g) {
    noise(t, 0.16, 0.4 * g, { freq: 900, slideTo: 3400, q: 1.4, attack: 0.01, reverb: 0.25 });
    osc('sawtooth', 130 * p, t, 0.13, 0.14 * g, { slideTo: 320 * p, filter: { type: 'lowpass', freq: 1200 } });
  },
  glide(t, p, g) { // sustained soft wind — retriggered while gliding
    noise(t, 0.4, 0.1 * g, { freq: 1100, slideTo: 900, q: 0.6, attack: 0.12, curve: 'lin' });
  },
  grapple(t, p, g) {
    osc('square', 1500 * p, t, 0.06, 0.16 * g, { slideTo: 700 });
    noise(t + 0.02, 0.25, 0.2 * g, { freq: 2200, slideTo: 900, q: 3, attack: 0.02 });
  },
  slam(t, p, g) {
    osc('sine', 110 * p, t, 0.34, 0.8 * g, { slideTo: 30 });
    noise(t, 0.22, 0.5 * g, { type: 'lowpass', freq: 2600, slideTo: 200, reverb: 0.5 });
  },
  hurt(t, p, g) {
    osc('sawtooth', 300 * p, t, 0.16, 0.4 * g, { slideTo: 90, filter: { type: 'lowpass', freq: 1400, slideTo: 300 } });
    noise(t, 0.1, 0.3 * g, { freq: 800, slideTo: 240 });
  },
  heal(t, p, g) {
    osc('sine', 520 * p, t, 0.25, 0.16 * g, { slideTo: 780 * p, attack: 0.03, reverb: 0.5 });
    osc('sine', 1040 * p, t + 0.06, 0.2, 0.08 * g, { reverb: 0.6 });
  },
  mote(t, p, g) { // soul mote absorbed
    osc('sine', 880 * p, t, 0.14, 0.16 * g, { slideTo: 1320 * p, attack: 0.005, reverb: 0.5 });
  },
  shard(t, p, g) { // health shard pickup — small ceremony
    for (let i = 0; i < 3; i++) osc('sine', [660, 880, 1320][i] * p, t + i * 0.07, 0.3, 0.14 * g, { reverb: 0.7 });
  },
  door(t, p, g) {
    noise(t, 0.3, 0.3 * g, { freq: 300, slideTo: 90, q: 0.7, attack: 0.04, reverb: 0.4 });
    osc('sine', 90 * p, t, 0.3, 0.2 * g, { slideTo: 50 });
  },
  discover(t, p, g) { // found a destination — gentle horn-ish swell
    osc('triangle', 262 * p, t, 0.8, 0.16 * g, { attack: 0.15, curve: 'lin', reverb: 0.8 });
    osc('triangle', 392 * p, t + 0.1, 0.8, 0.13 * g, { attack: 0.15, curve: 'lin', reverb: 0.8 });
    osc('triangle', 523 * p, t + 0.22, 0.9, 0.11 * g, { attack: 0.18, curve: 'lin', reverb: 0.85 });
  },
  unlock(t, p, g) { // ability earned — the big one
    const notes = [262, 330, 392, 523, 659];
    notes.forEach((f, i) => {
      osc('sine', f * p, t + i * 0.09, 0.7, 0.18 * g, { attack: 0.01, reverb: 0.85 });
      osc('sine', f * 2 * p, t + i * 0.09, 0.5, 0.06 * g, { attack: 0.01, reverb: 0.85 });
    });
    noise(t + 0.4, 0.8, 0.1 * g, { freq: 4000, slideTo: 8000, attack: 0.3, curve: 'lin', reverb: 0.6 });
  },
  bossroar(t, p, g) {
    osc('sawtooth', 70 * p, t, 0.9, 0.5 * g, { slideTo: 45, attack: 0.05, filter: { type: 'lowpass', freq: 600, slideTo: 160 }, reverb: 0.7 });
    noise(t, 0.7, 0.3 * g, { freq: 400, slideTo: 120, q: 0.6, attack: 0.08, reverb: 0.6 });
  },
  bossdie(t, p, g) {
    osc('sine', 160 * p, t, 1.4, 0.6 * g, { slideTo: 28, reverb: 0.8 });
    for (let i = 0; i < 6; i++) osc('sine', (500 + i * 260) * drift(40), t + 0.12 + i * 0.11, 0.5, 0.1 * g, { reverb: 0.9 });
    noise(t, 1.0, 0.34 * g, { freq: 2000, slideTo: 200, reverb: 0.8 });
  },
  enemyshoot(t, p, g) {
    osc('square', 620 * p, t, 0.08, 0.14 * g, { slideTo: 260 * p, filter: { type: 'lowpass', freq: 2200 } });
  },
  turret(t, p, g) {
    osc('square', 300 * p, t, 0.1, 0.15 * g, { slideTo: 900 * p, filter: { type: 'lowpass', freq: 2600 } });
  },
  gasburst(t, p, g) {
    noise(t, 0.25, 0.4 * g, { freq: 600, slideTo: 2400, q: 0.8, attack: 0.01, reverb: 0.4 });
    osc('sine', 300 * p, t, 0.18, 0.2 * g, { slideTo: 100 });
  },
};

const THROTTLE = { step: 0.16, hit: 0.03, shoot: 0.04, glide: 0.3, chime: 0.05 };

export function sfx(name, { pitch = 1, gain = 1, vary = true } = {}) {
  if (!ctx || !unlocked) return;
  const now = ctx.currentTime;
  const min = THROTTLE[name] ?? 0.02;
  const last = lastPlayed.get(name) || -9;
  if (now - last < min) return;
  lastPlayed.set(name, now);
  const recipe = RECIPES[name];
  if (!recipe) return;
  recipe(now, pitch * (vary ? drift() : 1), clamp(gain, 0, 2));
}
