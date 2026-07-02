// The conductor. One tension scalar, many instruments: your heartbeat, your
// breath, the tunnel closing around your vision, the tremble in the camera,
// whispers when it's near. Tension climbs fast and falls slowly — the body
// remembers being afraid long after the reason has gone.

import { clamp01, damp } from '../core/math.js';
import { body, sfx } from '../core/audio.js';
import { G } from './state.js';

export class Fear {
  constructor() {
    this.tension = 0;
    this.base = 0.08;           // floors set the ambient dread level
    this.spikeV = 0;
    this.phase = 0;
    this.whisperAt = 20;
    this.tunnelEl = document.getElementById('tunnel');
  }

  setBase(v) { this.base = v; }
  spike(v) { this.spikeV = Math.min(1.2, this.spikeV + v); }

  update(dt, t) {
    this.spikeV = Math.max(0, this.spikeV - dt * 0.16);
    const target = clamp01(this.base + this.spikeV);
    // up fast, down slow
    const rate = target > this.tension ? 1.8 : 0.14;
    this.tension = damp(this.tension, target, rate, dt);

    body.update(this.tension);

    // vision tunnels — CSS var drives the radial gradient
    const tun = this.tension * 26;
    this.tunnelEl.style.setProperty('--tun', tun.toFixed(1) + '%');

    // post uniforms as emotion channels
    if (G.postfx) {
      G.postfx.setDread(this.tension * 0.7);
    }

    this.phase += dt * (5 + this.tension * 14);

    // at sustained mid-tension, the house starts talking under its breath
    this.whisperAt -= dt * (this.tension > 0.45 ? 1 : 0.15);
    if (this.whisperAt <= 0) {
      this.whisperAt = 16 + Math.random() * 22;
      sfx('whisperVoice', { gain: 0.7 + this.tension * 0.5, pan: Math.random() * 1.4 - 0.7 });
    }
  }

  // camera tremble: micro-jitter that scales with tension², never random-jumpy
  shakeOffsets() {
    const s2 = this.tension * this.tension;
    const p = this.phase;
    return {
      pitch: (Math.sin(p * 2.1) + Math.sin(p * 5.7) * 0.35) * s2 * 0.004,
      yaw: Math.cos(p * 2.7) * 0.55 * s2 * 0.004,
      roll: Math.sin(p * 3.3 + 1.7) * 0.65 * s2 * 0.003,
    };
  }
}
