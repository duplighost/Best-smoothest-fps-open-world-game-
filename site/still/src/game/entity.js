// It. Tall, patient, mostly heard. Four hunting modes, one per floor that
// has it, each built to make you disobey your instincts:
//   stalk — it walks scripted paths; freeze and it passes you by
//   hunt  — blind; it hears movement in the silence between its breaths
//   flood — it follows your wake; stopping or turning lets it reach you
//   gaze  — it wants to be seen; the last thing the game asks of you
// Being caught is loud, close, and quick — then you're back at the stairs.
// The fear is not the dying. The fear is the almost.

import * as THREE from 'three';
import { G } from './state.js';
import { clamp01, damp } from '../core/math.js';
import { sfx3d, sfx, entityBreath } from '../core/audio.js';

const _v = new THREE.Vector3();

function buildBody() {
  const skin = new THREE.MeshStandardMaterial({ color: 0x1c1a1e, roughness: 0.95, flatShading: true });
  const pale = new THREE.MeshStandardMaterial({ color: 0x3a3234, roughness: 0.85, flatShading: true });
  const g = new THREE.Group();
  const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.05, 1.5, 6), skin);
  legs.position.y = 0.75;
  const legs2 = legs.clone(); legs.position.x = -0.12; legs2.position.x = 0.12;
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.13, 1.0, 7), skin);
  torso.position.y = 2.0;
  const shoulders = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.14, 0.2), skin);
  shoulders.position.y = 2.42;
  const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.03, 1.3, 5), skin);
  armL.position.set(-0.36, 1.8, 0);
  const armR = armL.clone(); armR.position.x = 0.36;
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.25, 5), pale);
  neck.position.y = 2.58;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 7), pale);
  head.position.y = 2.78;
  head.scale.set(0.85, 1.35, 0.9);
  g.add(legs, legs2, torso, shoulders, armL, armR, neck, head);
  g.userData.head = head;
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

export class Entity {
  constructor() {
    this.mesh = buildBody();
    this.mesh.visible = false;
    this.pos = new THREE.Vector3();
    this.mode = 'off';
    this.path = [];
    this.pathIdx = 0;
    this.speed = 1.4;
    this.stepAcc = 0;
    this.heard = null;          // last heard position (hunt)
    this.state = 'idle';
    this.stateT = 0;
    this.onGrab = null;         // set by main: the grab sequence
    this.lungeCd = 0;
    this.floodDist = 14;        // how far behind you it swims
    this.gazeT = 0;
  }

  addTo(scene) { scene.add(this.mesh); }
  moveTo(scene) { this.mesh.removeFromParent(); scene.add(this.mesh); }

  setMode(mode) {
    this.mode = mode;
    this.state = 'idle';
    this.stateT = 0;
    this.mesh.visible = mode !== 'off' && mode !== 'flood';
    entityBreath.setOn(mode === 'hunt');
    if (mode === 'off') this.mesh.visible = false;
  }

  teleport(x, z) { this.pos.set(x, 0, z); this.mesh.position.copy(this.pos); }

  // scripted pass: walk a list of [x,z] points; grabs if it perceives you
  startPass(points, opts = {}) {
    this.setMode('stalk');
    this.path = points;
    this.pathIdx = 0;
    this.speed = opts.speed ?? 1.35;
    this.perceives = opts.perceives !== false;
    this.teleport(points[0][0], points[0][1]);
    this.onPassDone = opts.onDone || null;
    G.fear.spike(0.5);
  }

  hearNoise(x, z, loud) {
    if (this.mode !== 'hunt') return;
    this.heard = { x, z };
    if (loud > 0.65 && this.lungeCd <= 0) {
      this.state = 'lunge';
      this.stateT = 0;
      sfx3d('entityStep', this.pos.x, this.pos.z, { gain: 1.3 });
    }
  }

  _stepSound() {
    this.stepAcc += this.speed * (1 / 60);
    if (this.stepAcc > 0.9) {
      this.stepAcc = 0;
      sfx3d('entityStep', this.pos.x, this.pos.z, { gain: 1.1 });
      G.fear.spike(0.04);
    }
  }

  _moveToward(x, z, dt, speed) {
    const dx = x - this.pos.x, dz = z - this.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.05) return true;
    const step = Math.min(d, speed * dt);
    this.pos.x += (dx / d) * step;
    this.pos.z += (dz / d) * step;
    return d - step < 0.05;
  }

  _facePlayer() {
    const pl = G.player;
    this.mesh.rotation.y = Math.atan2(pl.pos.x - this.pos.x, pl.pos.z - this.pos.z);
  }

  grab() {
    if (G.mode !== 'play') return;
    this.onGrab?.();
  }

  update(dt) {
    const pl = G.player;
    this.lungeCd = Math.max(0, this.lungeCd - dt);
    entityBreath.setPos(this.pos.x, this.pos.z);

    switch (this.mode) {
      case 'stalk': {
        // it walks its route. it takes anything that moves within its reach.
        const target = this.path[this.pathIdx];
        if (target) {
          if (this._moveToward(target[0], target[1], dt, this.speed)) this.pathIdx++;
          this._stepSound();
          this.mesh.rotation.y = Math.atan2(
            (this.path[this.pathIdx]?.[0] ?? target[0]) - this.pos.x,
            (this.path[this.pathIdx]?.[1] ?? target[1]) - this.pos.z);
        } else {
          this.setMode('off');
          this.onPassDone?.();
          break;
        }
        const d = Math.hypot(pl.pos.x - this.pos.x, pl.pos.z - this.pos.z);
        const proximity = clamp01(1 - d / 16);
        G.fear.spike(proximity * dt * 1.6);
        // it notices motion, then it is sure. half a second of grace — the
        // gap between "it turned its head" and "it has you".
        if (this.perceives && d < 11 && pl.stillTime < 0.25 &&
            G.collide.segmentClear(this.pos.x, this.pos.z, pl.pos.x, pl.pos.z, 1.4)) {
          this.seenT = (this.seenT || 0) + dt;
          if (this.seenT > 0.16 && !this._noticed) {
            this._noticed = true;
            sfx3d('entityStep', this.pos.x, this.pos.z, { gain: 1.5 });
            G.fear.spike(0.5);   // it stopped walking. you both know.
          }
          if (this.seenT > 0.55) this.grab();
        } else {
          this.seenT = Math.max(0, (this.seenT || 0) - dt * 1.5);
          if (this.seenT === 0) this._noticed = false;
        }
        break;
      }

      case 'hunt': {
        // blind. reads the dark by ear. its breath tells you when it listens.
        this.stateT += dt;
        if (this.state === 'lunge') {
          if (this.heard) {
            this._moveToward(this.heard.x, this.heard.z, dt, 3.6);
            this._stepSound();
            if (this.stateT > 2.2) { this.state = 'idle'; this.stateT = 0; this.lungeCd = 1.5; }
          } else this.state = 'idle';
        } else if (this.heard) {
          // drift toward the last sound, slowly, head tilted
          this._moveToward(this.heard.x, this.heard.z, dt, 0.55);
          if (Math.hypot(this.heard.x - this.pos.x, this.heard.z - this.pos.z) < 0.4) this.heard = null;
          this._stepSound();
        }
        this._facePlayer();
        const d = Math.hypot(pl.pos.x - this.pos.x, pl.pos.z - this.pos.z);
        G.fear.spike(clamp01(1 - d / 12) * dt * 1.3);
        if (d < 1.1) this.grab();
        break;
      }

      case 'flood': {
        // you never see it. it is a wake in black water, closing.
        this.floodDist -= dt * 0.22;                 // patient, inevitable
        if (pl.stillTime > 1.5) this.floodDist -= dt * 5.5;   // you stopped.
        this.floodDist = Math.max(this.floodDist, 0);
        const dir = pl.forward(_v).multiplyScalar(-1);
        this.pos.set(pl.pos.x + dir.x * this.floodDist, 0, pl.pos.z + dir.z * this.floodDist);
        if (Math.random() < dt * 0.5) {
          sfx3d('waterWake', this.pos.x, this.pos.z, { gain: 1.2 });
        }
        G.fear.spike(clamp01(1 - this.floodDist / 12) * dt * 1.1);
        if (this.floodDist < 1.2) this.grab();
        break;
      }

      case 'gaze': {
        // the ending owns this mode; floor script drives position/behavior
        this._facePlayer();
        break;
      }
    }
    this.mesh.position.copy(this.pos);
  }
}
