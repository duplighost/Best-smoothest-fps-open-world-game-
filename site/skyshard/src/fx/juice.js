// The feel kernel: trauma screenshake, hitstop, slow-mo, camera kick, FOV
// spring. Ported calibrations from previous games (docs/RESEARCH-BRIEF.md):
// max-based trauma with squared response, incommensurate-sine rotational
// shake, hitstop that lets particles keep blooming, eased slow-mo recovery.

import { CFG } from '../config.js';
import { clamp, clamp01, lerp } from '../core/math.js';

class Juice {
  constructor() {
    this.trauma = 0;
    this.phase = 0;
    this.hitstop = 0;        // seconds remaining, decays on RAW time
    this.slow = { scale: 1, t: 0, dur: 0 };
    this.kickPitch = 0;      // camera pitch impulse, springs back
    this.kickYaw = 0;
    this.fovKick = 0;        // added to base fov, springs back
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // --- inputs ---------------------------------------------------------------
  shake(v) { this.trauma = Math.max(this.trauma, this.reduced ? v * 0.15 : v); }

  stop(kind) {
    const ms = CFG.hitstop[kind] || 0;
    this.hitstop = Math.max(this.hitstop, ms / 1000);
  }

  slowmo(kind) {
    const s = CFG.slowmo[kind];
    if (!s) return;
    // max() so chained kills never become a brake [ported]
    if (this.slow.t <= 0 || s.scale < this.slow.scale) {
      this.slow = { scale: s.scale, t: s.time, dur: s.time };
    } else {
      this.slow.t = Math.max(this.slow.t, s.time);
    }
  }

  kick(pitch, yaw = 0) {
    this.kickPitch = clamp(this.kickPitch + pitch, -0.09, 0.09);
    this.kickYaw = clamp(this.kickYaw + yaw, -0.05, 0.05);
  }

  fov(v) { this.fovKick = Math.min(this.fovKick + v, 9); }

  // --- per-frame ------------------------------------------------------------
  // Returns the world time multiplier for this frame (0 during hitstop).
  update(rawDt) {
    this.trauma = Math.max(0, this.trauma - CFG.shake.decay * rawDt);
    this.phase += rawDt * (9 + this.trauma * 18);

    // spring returns [ported lambda 17]
    const ret = 1 - Math.exp(-CFG.weapon.kickReturn * rawDt);
    this.kickPitch -= this.kickPitch * ret;
    this.kickYaw -= this.kickYaw * ret;
    this.fovKick -= this.fovKick * (1 - Math.exp(-8 * rawDt));

    if (this.hitstop > 0) {
      this.hitstop -= rawDt;
      return 0;
    }
    if (this.slow.t > 0) {
      this.slow.t -= rawDt;
      const t = clamp01(this.slow.t / this.slow.dur);
      return lerp(1, this.slow.scale, t * t);  // eased recovery [ported]
    }
    return 1;
  }

  // Rotational shake offsets — incommensurate sines, never Math.random.
  shakeOffsets() {
    const s2 = this.trauma * this.trauma;
    const p = this.phase;
    return {
      pitch: (Math.sin(p * 2.1) + Math.sin(p * 5.7) * 0.35) * s2 * CFG.shake.ampRot,
      yaw: Math.cos(p * 2.7) * 0.55 * s2 * CFG.shake.ampRot,
      roll: Math.sin(p * 3.3 + 1.7) * 0.65 * s2 * CFG.shake.ampRot * 0.6,
      y: Math.sin(p * 4.3) * s2 * CFG.shake.ampPos * 0.4,
    };
  }
}

export const juice = new Juice();
