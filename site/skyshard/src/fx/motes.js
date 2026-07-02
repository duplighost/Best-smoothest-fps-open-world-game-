// Motes: the reward currency you can feel. Kills release a soul mote that
// streaks to the player (kill-confirm); breakables sometimes release health
// motes; both home in with easing and pop on arrival. One instanced mesh.

import * as THREE from 'three';
import { CFG } from '../config.js';
import { G } from '../state.js';
import { Pool } from '../core/pool.js';
import { sfx } from '../core/audio.js';

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const _c = new THREE.Color();
const ZERO = new THREE.Vector3(0, 0, 0);

const KIND = {
  soul:   { color: [0.6, 0.95, 1.0], heal: 0, size: 0.16 },
  health: { color: [0.4, 1.0, 0.55], heal: 1, size: 0.2 },
};

export class Motes {
  constructor() {
    const N = CFG.fx.maxMotes;
    const geo = new THREE.IcosahedronGeometry(1, 1);
    const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.95, fog: false });
    this.mesh = new THREE.InstancedMesh(geo, mat, N);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.mesh.count = N;
    this.pool = new Pool((i) => ({ i, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, t: 0, kind: 'soul' }), N);
    for (let i = 0; i < N; i++) { _m.compose(_p.set(0, -999, 0), _q, ZERO); this.mesh.setMatrixAt(i, _m); }
    this.streak = 0;          // rising chime pitch on quick collections
    this.lastCollect = -9;
  }

  addTo(scene) { scene.add(this.mesh); }
  moveTo(scene) {
    this.pool.releaseAll();
    this.mesh.removeFromParent();
    scene.add(this.mesh);
  }

  spawn(kind, x, y, z, n = 1) {
    for (let k = 0; k < n; k++) {
      const m = this.pool.obtain();
      if (!m) return;
      m.kind = kind;
      m.x = x; m.y = y; m.z = z;
      m.vx = (Math.random() - 0.5) * 5;
      m.vy = 3 + Math.random() * 3;
      m.vz = (Math.random() - 0.5) * 5;
      m.t = 0;
      _c.setRGB(...KIND[kind].color);
      this.mesh.setColorAt(m.i, _c);
    }
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  update(dt, now) {
    const pl = G.player;
    if (!pl) return;
    const px = pl.pos.x, py = pl.pos.y + 1.1, pz = pl.pos.z;
    this.pool.update((m) => {
      m.t += dt;
      // scatter briefly, then home with increasing hunger
      const pull = Math.min(28, Math.max(0, (m.t - 0.25) * 46));
      let dx = px - m.x, dy = py - m.y, dz = pz - m.z;
      const d = Math.hypot(dx, dy, dz) || 1;
      m.vx += (dx / d) * pull * dt; m.vy += (dy / d) * pull * dt; m.vz += (dz / d) * pull * dt;
      const drag = Math.pow(0.92, dt * 60);
      m.vx *= drag; m.vy *= drag; m.vz *= drag;
      m.x += m.vx * dt; m.y += m.vy * dt; m.z += m.vz * dt;

      if (d < 1.0 && m.t > 0.2) {
        // collected
        const k = KIND[m.kind];
        if (k.heal) pl.heal(k.heal);
        else {
          this.streak = (now - this.lastCollect < 0.9) ? this.streak + 1 : 0;
          this.lastCollect = now;
          sfx('mote', { pitch: 1 + Math.min(this.streak, 8) * 0.09 });
        }
        G.particles?.burst(m.kind === 'health' ? 'heal' : 'soul', m.x, m.y, m.z, 5);
        _m.compose(_p.set(0, -999, 0), _q, ZERO);
        this.mesh.setMatrixAt(m.i, _m);
        return false;
      }
      const k = KIND[m.kind];
      const pulse = k.size * (1 + Math.sin(m.t * 9 + m.i) * 0.22);
      _m.compose(_p.set(m.x, m.y, m.z), _q, _s.set(pulse, pulse, pulse));
      this.mesh.setMatrixAt(m.i, _m);
      return true;
    });
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}
