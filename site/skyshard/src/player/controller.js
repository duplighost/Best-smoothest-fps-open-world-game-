// First-person body. Feel notes: acceleration model from the previous games
// (vel += (wish - vel) * min(1, rate*dt)), raised to action pace; jump buffer
// + coyote time so hops never eat inputs; landing dip spring; headbob driven
// by real speed; footsteps by distance travelled, not timers. Feedback goes
// to the camera — nothing ever steals stick control.

import * as THREE from 'three';
import { CFG } from '../config.js';
import { G } from '../state.js';
import { clamp, clamp01, damp, lerp } from '../core/math.js';
import { sfx } from '../core/audio.js';
import { juice } from '../fx/juice.js';

const P = CFG.player;
const A = CFG.abilities;

export class Player {
  constructor() {
    this.pos = new THREE.Vector3(0, 20, 0);      // feet
    this.vel = new THREE.Vector3();
    this.yaw = 0;                                // forward is -z; the spire is north of spawn
    this.pitch = 0;
    this.grounded = false;
    this.coyote = 0;
    this.jumpBuffer = 0;
    this.jumpsUsed = 0;
    this.gliding = false;

    this.dashT = 0;                              // time left in dash
    this.dashCd = 0;
    this.dashDir = new THREE.Vector3();
    this.slamming = false;

    this.grappling = false;
    this.grapplePoint = new THREE.Vector3();
    this.grappleCd = 0;
    this.stream = null;        // riding a wind stream (streams.js drives us)

    this.pips = G.save.maxPips ?? P.startPips;
    this.maxPips = G.save.maxPips ?? P.startPips;
    this.iFrames = 0;
    this.dead = false;

    this.bobPhase = 0;
    this.stepDist = 0;
    this.landDip = 0;                            // camera dip spring on landing
    this.landVel = 0;
    this.eyeVel = 0;
    this.fov = 74;

    this._scratch = [];
    this._wish = new THREE.Vector3();
    this._fwd = new THREE.Vector3();
    this._right = new THREE.Vector3();
  }

  get speedXZ() { return Math.hypot(this.vel.x, this.vel.z); }
  get eyeY() { return this.pos.y + P.eyeHeight; }

  // ---- look (called every RENDER frame for zero-latency aim) --------------
  applyLook(look) {
    this.yaw -= look.x;
    this.pitch = clamp(this.pitch - look.y, -P.maxPitch, P.maxPitch);
  }

  forward(out) {
    return out.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
  }

  aimDir(out) {
    const cp = Math.cos(this.pitch);
    return out.set(-Math.sin(this.yaw) * cp, Math.sin(this.pitch), -Math.cos(this.yaw) * cp).normalize();
  }

  // ---- fixed-step simulation ----------------------------------------------
  step(dt) {
    if (this.dead) return;
    const input = G.input;
    const collide = G.collide;
    const owned = G.save.abilities;

    // --- input intent (buffered so hitstop never eats a press) ---
    if (input.pressed('Space')) this.jumpBuffer = P.jumpBuffer;
    else this.jumpBuffer = Math.max(0, this.jumpBuffer - dt);

    const wantDash = input.pressed('ShiftLeft') || input.pressed('ShiftRight');
    const wantSlam = input.pressed('ControlLeft') || input.pressed('KeyC');
    const wantGrapple = input.pressed('KeyE');

    // --- wish direction ---
    const f = (input.down('KeyW') ? 1 : 0) - (input.down('KeyS') ? 1 : 0);
    const s = (input.down('KeyD') ? 1 : 0) - (input.down('KeyA') ? 1 : 0);
    this.forward(this._fwd);
    this._right.set(-this._fwd.z, 0, this._fwd.x);
    this._wish.set(0, 0, 0)
      .addScaledVector(this._fwd, f)
      .addScaledVector(this._right, s);
    if (this._wish.lengthSq() > 1) this._wish.normalize();

    // --- timers ---
    this.dashCd = Math.max(0, this.dashCd - dt);
    this.grappleCd = Math.max(0, this.grappleCd - dt);
    this.iFrames = Math.max(0, this.iFrames - dt);
    this.coyote = this.grounded ? P.coyoteTime : Math.max(0, this.coyote - dt);

    // --- riding a wind stream: the current owns the body, you own the eyes ---
    if (this.stream) {
      this.bobPhase += dt * P.bobRate * 0.6;
      G.streams?.ride(this, dt);
      return;
    }

    // --- dash ---
    if (wantDash && owned.dash && this.dashCd <= 0 && this.dashT <= 0) {
      this.dashT = A.dash.time;
      this.dashCd = A.dash.cooldown;
      this.iFrames = Math.max(this.iFrames, A.dash.iFrames);
      const dir = this._wish.lengthSq() > 0.01 ? this._wish : this._fwd;
      this.dashDir.copy(dir).normalize();
      this.vel.y = Math.max(this.vel.y, 0);
      sfx('dash');
      juice.fov(5);
      G.hud?.verbFlash('dash');
      G.particles?.burst('dash', this.pos.x, this.pos.y + 0.9, this.pos.z, 10);
    }

    // --- grapple ---
    if (wantGrapple && owned.grapple && this.grappleCd <= 0) {
      if (this.grappling) this.releaseGrapple(true);
      else this.tryGrapple();
    }

    // --- slam ---
    if (wantSlam && owned.slam && !this.grounded && !this.slamming && this.vel.y < 6) {
      this.slamming = true;
      this.gliding = false;
      if (this.grappling) this.releaseGrapple(false);
      this.vel.set(0, -A.slam.fallSpeed, 0);
      sfx('dash', { pitch: 0.6 });
    }

    // --- horizontal movement ---
    const speed = P.walkSpeed;
    if (this.dashT > 0) {
      this.dashT -= dt;
      this.vel.x = this.dashDir.x * A.dash.speed;
      this.vel.z = this.dashDir.z * A.dash.speed;
      this.vel.y = 0;
      if (this.dashT <= 0) {
        // keep some exit momentum — dashing always feels forward
        this.vel.x = this.dashDir.x * speed * A.dash.exitSpeedMult;
        this.vel.z = this.dashDir.z * speed * A.dash.exitSpeedMult;
      }
    } else if (this.grappling) {
      // spring toward the point, capped — swooping, not teleporty
      const to = this.grapplePoint.clone().sub(this.pos).sub(new THREE.Vector3(0, 1, 0));
      const d = to.length();
      to.normalize();
      this.vel.addScaledVector(to, A.grapple.pullAccel * dt);
      if (this.vel.length() > A.grapple.maxSpeed) this.vel.setLength(A.grapple.maxSpeed);
      // player steering while flying
      this.vel.addScaledVector(this._wish, speed * 1.6 * dt);
      if (d < A.grapple.detachDist) this.releaseGrapple(true);
    } else {
      const hasInput = this._wish.lengthSq() > 0.01;
      let rate;
      if (this.grounded) rate = hasInput ? P.accel : P.friction;
      else rate = P.accel * P.airControl * (this.gliding ? A.glideControl : 1);
      const k = Math.min(1, rate * dt);
      this.vel.x += (this._wish.x * speed - this.vel.x) * k;
      this.vel.z += (this._wish.z * speed - this.vel.z) * k;
    }

    // --- jumping ---
    if (this.jumpBuffer > 0) {
      if (this.coyote > 0) {
        this.vel.y = P.jumpVel;
        this.grounded = false;
        this.coyote = 0;
        this.jumpsUsed = 1;
        this.jumpBuffer = 0;
        sfx('jump');
      } else if (owned.doubleJump && this.jumpsUsed < 2 && !this.grappling) {
        this.vel.y = A.doubleJumpVel;
        this.jumpsUsed = 2;
        this.jumpBuffer = 0;
        this.slamming = false;
        sfx('doublejump');
        G.hud?.verbFlash('wings');
        G.particles?.burst('jump', this.pos.x, this.pos.y + 0.2, this.pos.z, 12);
      }
    }

    // --- glide: hold space while falling ---
    this.gliding = !!(owned.glide && !this.grounded && !this.slamming && !this.grappling &&
      this.vel.y < 0.5 && input.down('Space') && this.jumpsUsed >= 1);

    // --- gravity ---
    if (!this.grappling && this.dashT <= 0) {
      this.vel.y -= P.gravity * dt;
      if (this.gliding && this.vel.y < -A.glideFall) {
        this.vel.y = damp(this.vel.y, -A.glideFall, 9, dt);
        if (Math.random() < dt * 2.2) sfx('glide');
      }
      if (this.slamming) this.vel.y = -A.slam.fallSpeed;
    }

    // --- water drag + world bounds ---
    const inWater = this.pos.y < 0.2 && !G.interior;
    if (inWater) {
      this.vel.x *= Math.pow(0.35, dt * 3);
      this.vel.z *= Math.pow(0.35, dt * 3);
      const d = Math.hypot(this.pos.x, this.pos.z);
      if (d > 640) { // gentle current pushes back toward the island
        this.vel.x -= (this.pos.x / d) * 30 * dt;
        this.vel.z -= (this.pos.z / d) * 30 * dt;
      }
    }

    // --- integrate + collide ---
    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    collide.resolve(this.pos, P.radius, this.pos.y + 0.05, this.pos.y + P.eyeHeight + 0.1, this._scratch);

    this.pos.y += this.vel.y * dt;
    const ground = collide.groundAt(this.pos.x, this.pos.z, this.pos.y, P.stepUp);
    const ceiling = collide.ceilingAt(this.pos.x, this.pos.z, this.pos.y + P.eyeHeight + 0.15, this._scratch);
    if (this.pos.y + P.eyeHeight + 0.2 > ceiling) {
      this.pos.y = ceiling - P.eyeHeight - 0.2;
      if (this.vel.y > 0) this.vel.y = 0;
    }

    const wasGrounded = this.grounded;
    if (this.pos.y <= ground + 0.001) {
      this.pos.y = ground;
      if (!wasGrounded) this.onLand();
      this.grounded = true;
      this.jumpsUsed = 0;
      if (this.vel.y < 0) this.vel.y = 0;
      this.gliding = false;
    } else if (this.pos.y > ground + 0.05) {
      this.grounded = false;
    }

    // --- footsteps by distance ---
    if (this.grounded) {
      this.stepDist += this.speedXZ * dt;
      const stride = 2.1;
      if (this.stepDist > stride && this.speedXZ > 1.2) {
        this.stepDist = 0;
        sfx('step', { pitch: inWater ? 0.7 : 1, gain: clamp01(this.speedXZ / speed) });
      }
    }

    // --- headbob phase ---
    const speedFrac = clamp01(this.speedXZ / speed);
    this.bobPhase += dt * P.bobRate * (0.4 + speedFrac);
    this.landDip += this.landVel * dt;
    this.landVel += (-this.landDip * 90 - this.landVel * 12) * dt; // spring to 0
  }

  onLand() {
    const impact = clamp01(-this.vel.y / 22);
    if (this.slamming) {
      this.slamming = false;
      G.onSlamLand?.(this.pos, A.slam);
    } else if (impact > 0.12) {
      sfx('land', { gain: 0.4 + impact });
      this.landVel = -impact * 3.2;
      if (impact > 0.55) juice.shake(0.18);
    }
    G.particles?.burst('land', this.pos.x, this.pos.y + 0.1, this.pos.z, Math.floor(4 + impact * 10));
  }

  tryGrapple() {
    const dir = this.aimDir(new THREE.Vector3());
    const eye = this.eyeY;
    const hit = G.collide.raycast(this.pos.x, eye, this.pos.z, dir.x, dir.y, dir.z, A.grapple.maxDist, this._scratch);
    if (!hit) { sfx('grapple', { pitch: 0.5, gain: 0.4 }); return; }
    this.grappling = true;
    this.grapplePoint.set(hit.x, hit.y, hit.z);
    this.grounded = false;
    this.gliding = false;
    sfx('grapple');
    G.hud?.verbFlash('grapple');
  }

  releaseGrapple(boost) {
    if (!this.grappling) return;
    this.grappling = false;
    this.grappleCd = A.grapple.cooldown;
    if (boost) this.vel.y += 3.4; // release pop — chains into double jump
  }

  // ---- damage ---------------------------------------------------------------
  hurt(n, fromX, fromZ) {
    if (this.iFrames > 0 || this.dead) return false;
    if (this.stream) G.streams?.detach(this, false);
    this.pips -= n;
    this.iFrames = P.hurtIFrames;
    juice.shake(CFG.shake.hurt);
    juice.stop('hurt');
    sfx('hurt');
    G.hud?.hurtFlash();
    G.hud?.setPips(this.pips, this.maxPips);
    if (fromX !== undefined) {
      const dx = this.pos.x - fromX, dz = this.pos.z - fromZ;
      const d = Math.hypot(dx, dz) || 1;
      this.vel.x += (dx / d) * 7;
      this.vel.z += (dz / d) * 7;
      this.vel.y += 2.4;
      this.grounded = false;
    }
    if (this.pips <= 0) { this.dead = true; G.onPlayerDeath?.(); }
    return true;
  }

  heal(n) {
    if (this.pips >= this.maxPips) return false;
    this.pips = Math.min(this.maxPips, this.pips + n);
    sfx('heal');
    G.hud?.setPips(this.pips, this.maxPips);
    return true;
  }

  addPip() {
    this.maxPips = Math.min(CFG.player.maxPipsCap, this.maxPips + 1);
    this.pips = this.maxPips;
    G.save.maxPips = this.maxPips;
    G.hud?.setPips(this.pips, this.maxPips);
  }

  // ---- camera (called every render frame) -----------------------------------
  updateCamera(camera, rawDt) {
    const speedFrac = clamp01(this.speedXZ / P.walkSpeed);
    const bobY = Math.sin(this.bobPhase * 2) * P.bobAmp * speedFrac * (this.grounded ? 1 : 0.2);
    const swayX = Math.cos(this.bobPhase) * P.bobAmp * 0.6 * speedFrac * (this.grounded ? 1 : 0.2);
    const sh = juice.shakeOffsets();

    camera.position.set(
      this.pos.x + swayX * Math.cos(this.yaw),
      this.eyeY + bobY + this.landDip + sh.y,
      this.pos.z + swayX * -Math.sin(this.yaw)
    );
    camera.rotation.order = 'YXZ';
    camera.rotation.y = this.yaw + sh.yaw + juice.kickYaw;
    camera.rotation.x = this.pitch + sh.pitch + juice.kickPitch;
    camera.rotation.z = swayX * 0.6 + sh.roll + (this.gliding ? Math.sin(this.bobPhase * 0.7) * 0.02 : 0);

    // FOV: speed + dash/glide stretch + juice kicks (capped so streams thrill, not warp)
    const over = Math.min(16, Math.max(0, this.speedXZ - P.walkSpeed));
    const target = 74 + over * 0.9 + (this.gliding ? 4 : 0) + (this.stream ? 3 : 0) + juice.fovKick;
    this.fov = damp(this.fov, target, 6, rawDt);
    if (Math.abs(camera.fov - this.fov) > 0.01) {
      camera.fov = this.fov;
      camera.updateProjectionMatrix();
    }
  }
}
