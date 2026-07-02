// The body you are trapped in. Slow on purpose: 1.85 m/s walk, no run —
// running is how games let you escape, and you don't get to escape.
// Tracks true stillness (feet + hands), makes noise the house can hear,
// and breathes down the camera so you never forget you're in a body.

import * as THREE from 'three';
import { G } from './state.js';
import { clamp, clamp01, damp } from '../core/math.js';
import { sfx3d, setListener } from '../core/audio.js';

const WALK = 1.85;
const EYE = 1.58;

export class Player {
  constructor() {
    this.pos = new THREE.Vector3(0, 0, 0);
    this.vel = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.frozenInput = 0;      // >0: scripted moments steal your legs (never your eyes)

    this.stillTime = 0;        // seconds of true stillness
    this.noise = 0;            // 0..1 how loud you are right now (decays)
    this.speedFrac = 0;

    this.bobPhase = 0;
    this.stepDist = 0;
    this.breathPhase = 0;
    this.inWater = false;
    this.stepSound = 'stepWood';
    this.fov = 66;

    this._scratch = [];
    this._fwd = new THREE.Vector3();
    this._right = new THREE.Vector3();
    this._wish = new THREE.Vector3();
  }

  get eyeY() { return this.pos.y + EYE; }

  applyLook(look) {
    this.yaw -= look.x;
    this.pitch = clamp(this.pitch - look.y, -1.35, 1.35);
  }

  forward(out) { return out.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw)); }
  aimDir(out) {
    const cp = Math.cos(this.pitch);
    return out.set(-Math.sin(this.yaw) * cp, Math.sin(this.pitch), -Math.cos(this.yaw) * cp).normalize();
  }

  step(dt) {
    const input = G.input;
    this.frozenInput = Math.max(0, this.frozenInput - dt);

    const f = (input.down('KeyW') ? 1 : 0) - (input.down('KeyS') ? 1 : 0);
    const s = (input.down('KeyD') ? 1 : 0) - (input.down('KeyA') ? 1 : 0);
    this.forward(this._fwd);
    this._right.set(-this._fwd.z, 0, this._fwd.x);
    this._wish.set(0, 0, 0).addScaledVector(this._fwd, f).addScaledVector(this._right, s);
    if (this._wish.lengthSq() > 1) this._wish.normalize();
    if (this.frozenInput > 0) this._wish.set(0, 0, 0);

    const speed = WALK * (this.inWater ? 0.52 : 1);
    const hasInput = this._wish.lengthSq() > 0.01;
    const rate = hasInput ? 10 : 12;
    const k = Math.min(1, rate * dt);
    this.vel.x += (this._wish.x * speed - this.vel.x) * k;
    this.vel.z += (this._wish.z * speed - this.vel.z) * k;

    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    G.collide.resolve(this.pos, 0.32, this.pos.y + 0.1, this.pos.y + EYE, this._scratch);
    this.pos.y = G.collide.groundAt(this.pos.x, this.pos.z, this.pos.y + 0.3, 0.4);

    // ---- stillness & noise ----
    const moving = Math.hypot(this.vel.x, this.vel.z) > 0.12;
    const handsMoving = input.mouseMoved > 26;   // trembling aim counts
    if (moving || handsMoving || this.frozenInput === -1) this.stillTime = 0;
    else this.stillTime += dt;

    this.speedFrac = clamp01(Math.hypot(this.vel.x, this.vel.z) / WALK);
    this.noise = Math.max(this.noise - dt * 1.6, this.speedFrac * (this.inWater ? 1.0 : 0.65));

    // ---- footsteps by distance ----
    this.stepDist += Math.hypot(this.vel.x, this.vel.z) * dt;
    const stride = this.inWater ? 1.15 : 1.5;
    if (this.stepDist > stride && this.speedFrac > 0.25) {
      this.stepDist = 0;
      sfx3d(this.stepSound, this.pos.x, this.pos.z, { gain: 0.8 + this.speedFrac * 0.5 });
      this.noise = Math.min(1, this.noise + (this.inWater ? 0.5 : 0.3));
    }

    this.bobPhase += dt * 7.4 * (0.35 + this.speedFrac);
    this.breathPhase += dt * (1.3 + (G.fear?.tension || 0) * 2.6);

    setListener(this.pos.x, this.pos.z, this.yaw);
  }

  updateCamera(camera, rawDt) {
    const bobY = Math.sin(this.bobPhase * 2) * 0.035 * this.speedFrac;
    const swayX = Math.cos(this.bobPhase) * 0.022 * this.speedFrac;
    const breath = Math.sin(this.breathPhase) * (0.006 + (G.fear?.tension || 0) * 0.012);
    const sh = G.fear?.shakeOffsets(rawDt) || { pitch: 0, yaw: 0, roll: 0 };

    camera.position.set(
      this.pos.x + swayX * Math.cos(this.yaw),
      this.eyeY + bobY + breath,
      this.pos.z - swayX * Math.sin(this.yaw)
    );
    camera.rotation.order = 'YXZ';
    camera.rotation.y = this.yaw + sh.yaw;
    camera.rotation.x = this.pitch + sh.pitch;
    camera.rotation.z = swayX * 0.7 + sh.roll;

    // fear narrows the eye: fov drops as tension climbs
    const target = 66 - (G.fear?.tension || 0) * 6;
    this.fov = damp(this.fov, target, 3, rawDt);
    if (Math.abs(camera.fov - this.fov) > 0.01) {
      camera.fov = this.fov;
      camera.updateProjectionMatrix();
    }
  }
}
