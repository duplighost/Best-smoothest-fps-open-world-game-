// Two pooled particle systems, one draw call each:
//   glow   — additive billboard quads (sparks, muzzle, dust, ambient motes)
//   shards — solid instanced tetrahedra with gravity + spin (debris, gibs)
// CPU-simmed, fixed capacity, zero allocation during play.

import * as THREE from 'three';
import { CFG } from '../config.js';
import { Pool } from '../core/pool.js';
import { clamp01 } from '../core/math.js';

function softDotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 2, 32, 32, 30);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.4, 'rgba(255,255,255,0.5)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

// type presets: how a particle behaves after spawn
const TYPES = {
  spark:  { grav: 14, drag: 0.94, grow: -1.6, speed: [4, 11], life: [0.25, 0.55], size: [0.10, 0.22] },
  muzzle: { grav: 0, drag: 0.80, grow: -3.4, speed: [0.5, 2], life: [0.08, 0.16], size: [0.30, 0.55] },
  impact: { grav: 6, drag: 0.90, grow: -2.0, speed: [2, 7], life: [0.2, 0.5], size: [0.08, 0.2] },
  dash:   { grav: 0, drag: 0.86, grow: -1.2, speed: [1, 3], life: [0.3, 0.5], size: [0.2, 0.5] },
  jump:   { grav: 2, drag: 0.90, grow: -1.0, speed: [1.5, 3.5], life: [0.3, 0.6], size: [0.12, 0.3] },
  land:   { grav: 1.5, drag: 0.88, grow: -0.8, speed: [1, 3], life: [0.4, 0.7], size: [0.15, 0.4] },
  soul:   { grav: -2, drag: 0.92, grow: -0.9, speed: [0.5, 1.5], life: [0.5, 0.9], size: [0.12, 0.26] },
  heal:   { grav: -3, drag: 0.92, grow: -0.9, speed: [0.5, 1.5], life: [0.5, 0.9], size: [0.1, 0.2] },
  smoke:  { grav: -0.8, drag: 0.95, grow: 0.7, speed: [0.3, 1.2], life: [0.8, 1.6], size: [0.3, 0.7] },
  ambient:{ grav: 0, drag: 1.0, grow: 0, speed: [0.1, 0.5], life: [3, 6], size: [0.06, 0.16] },
  ember:  { grav: -1.6, drag: 0.98, grow: -0.15, speed: [0.4, 1.4], life: [2, 4], size: [0.06, 0.14] },
  snow:   { grav: 1.1, drag: 0.99, grow: 0, speed: [0.2, 0.8], life: [3, 6], size: [0.05, 0.12] },
  spore:  { grav: -0.35, drag: 0.99, grow: 0, speed: [0.1, 0.4], life: [3.5, 7], size: [0.08, 0.2] },
};

const TYPE_COLOR = {
  spark: [1.0, 0.85, 0.45], muzzle: [1.0, 0.9, 0.6], impact: [1.0, 0.8, 0.5],
  dash: [0.6, 0.85, 1.0], jump: [0.8, 0.85, 0.9], land: [0.75, 0.72, 0.65],
  soul: [0.65, 0.95, 1.0], heal: [0.55, 1.0, 0.7], smoke: [0.5, 0.5, 0.55],
  ambient: [1.0, 1.0, 0.9], ember: [1.0, 0.55, 0.2], snow: [0.95, 0.97, 1.0],
  spore: [0.5, 1.0, 0.85],
};

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const ZERO_SCALE = new THREE.Vector3(0, 0, 0);
const _c = new THREE.Color();

export class Particles {
  constructor() {
    const N = CFG.fx.maxParticles;
    const geo = new THREE.PlaneGeometry(1, 1);
    const mat = new THREE.MeshBasicMaterial({
      map: softDotTexture(), transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
    });
    this.mesh = new THREE.InstancedMesh(geo, mat, N);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 5;
    this.mesh.count = N;

    const M = CFG.fx.maxShards;
    const sgeo = new THREE.TetrahedronGeometry(0.14);
    const smat = new THREE.MeshLambertMaterial({});
    this.shardMesh = new THREE.InstancedMesh(sgeo, smat, M);
    this.shardMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.shardMesh.frustumCulled = false;
    this.shardMesh.count = M;

    this.pool = new Pool((i) => ({
      i, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0,
      life: 0, maxLife: 1, size: 0.1, type: 'spark', r: 1, g: 1, b: 1,
    }), N);
    this.shardPool = new Pool((i) => ({
      i, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0,
      rx: 0, ry: 0, rz: 0, srx: 0, sry: 0, srz: 0,
      life: 0, maxLife: 1, size: 0.14, floorY: -100,
    }), M);

    // hide everything initially
    for (let i = 0; i < N; i++) { _m.compose(_p.set(0, -999, 0), _q, ZERO_SCALE); this.mesh.setMatrixAt(i, _m); }
    for (let i = 0; i < M; i++) { _m.compose(_p.set(0, -999, 0), _q, ZERO_SCALE); this.shardMesh.setMatrixAt(i, _m); }
  }

  addTo(scene) { scene.add(this.mesh); scene.add(this.shardMesh); }

  moveTo(scene) {
    this.pool.releaseAll(); this.shardPool.releaseAll();
    this.mesh.removeFromParent(); this.shardMesh.removeFromParent();
    scene.add(this.mesh); scene.add(this.shardMesh);
  }

  // Spawn `n` particles of `type` at a point. dir (optional) biases velocity.
  burst(type, x, y, z, n, opts = {}) {
    const T = TYPES[type] || TYPES.spark;
    const col = opts.color || TYPE_COLOR[type] || TYPE_COLOR.spark;
    for (let k = 0; k < n; k++) {
      const p = this.pool.obtain();
      if (!p) return;
      p.type = type;
      p.x = x; p.y = y; p.z = z;
      const sp = T.speed[0] + Math.random() * (T.speed[1] - T.speed[0]);
      let dx = Math.random() * 2 - 1, dy = Math.random() * 2 - 1, dz = Math.random() * 2 - 1;
      const dl = Math.hypot(dx, dy, dz) || 1;
      dx /= dl; dy /= dl; dz /= dl;
      if (opts.dir) {
        // cone around dir [ported: ±0.575 rad spread from prev game]
        dx = opts.dir.x + dx * 0.55; dy = opts.dir.y + dy * 0.55; dz = opts.dir.z + dz * 0.55;
        const l2 = Math.hypot(dx, dy, dz) || 1;
        dx /= l2; dy /= l2; dz /= l2;
      }
      p.vx = dx * sp; p.vy = dy * sp + (opts.up || 0); p.vz = dz * sp;
      p.maxLife = p.life = T.life[0] + Math.random() * (T.life[1] - T.life[0]);
      p.size = (T.size[0] + Math.random() * (T.size[1] - T.size[0])) * (opts.sizeMult || 1);
      p.r = col[0]; p.g = col[1]; p.b = col[2];
      if (opts.jitterColor) {
        const j = 1 - Math.random() * 0.3;
        p.r *= j; p.g *= j; p.b *= j;
      }
    }
  }

  // Solid debris chunks. floorY: rest height (they bounce once then fade).
  debris(x, y, z, n, color, opts = {}) {
    for (let k = 0; k < n; k++) {
      const s = this.shardPool.obtain();
      if (!s) return;
      s.x = x; s.y = y; s.z = z;
      const sp = 3 + Math.random() * 6 * (opts.power || 1);
      let dx = Math.random() * 2 - 1, dy = Math.random() * 0.9 + 0.3, dz = Math.random() * 2 - 1;
      const dl = Math.hypot(dx, dy, dz) || 1;
      if (opts.dir) {
        dx = dx * 0.6 + opts.dir.x; dy = dy * 0.8 + opts.dir.y * 0.4 + 0.4; dz = dz * 0.6 + opts.dir.z;
      }
      s.vx = (dx / dl) * sp; s.vy = (dy / dl) * sp + 2.4; s.vz = (dz / dl) * sp;
      s.rx = Math.random() * 3; s.ry = Math.random() * 3; s.rz = Math.random() * 3;
      s.srx = (Math.random() - 0.5) * 12; s.sry = (Math.random() - 0.5) * 12; s.srz = (Math.random() - 0.5) * 12;
      s.maxLife = s.life = 0.9 + Math.random() * 0.9;
      s.size = (0.09 + Math.random() * 0.16) * (opts.sizeMult || 1);
      s.floorY = opts.floorY ?? -100;
      _c.setRGB(color[0], color[1], color[2]).multiplyScalar(0.75 + Math.random() * 0.5);
      this.shardMesh.setColorAt(s.i, _c);
    }
    if (this.shardMesh.instanceColor) this.shardMesh.instanceColor.needsUpdate = true;
  }

  update(dt, camera) {
    // glow quads — billboard toward camera
    _q.copy(camera.quaternion);
    this.pool.update((p) => {
      p.life -= dt;
      if (p.life <= 0) {
        _m.compose(_p.set(0, -999, 0), _q, ZERO_SCALE);
        this.mesh.setMatrixAt(p.i, _m);
        return false;
      }
      const T = TYPES[p.type];
      p.vy -= T.grav * dt;
      const drag = Math.pow(T.drag, dt * 60);
      p.vx *= drag; p.vy *= drag; p.vz *= drag;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      const frac = clamp01(p.life / p.maxLife);
      const fadeIn = clamp01((p.maxLife - p.life) / 0.06);
      let s = p.size * (1 + T.grow * (1 - frac) * -1);
      s = Math.max(0.001, s * (frac < 0.4 ? frac / 0.4 : 1) * fadeIn);
      _m.compose(_p.set(p.x, p.y, p.z), _q, _s.set(s, s, s));
      this.mesh.setMatrixAt(p.i, _m);
      _c.setRGB(p.r, p.g, p.b);
      this.mesh.setColorAt(p.i, _c);
      return true;
    });
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;

    // shards — gravity, one floor bounce, spin
    const eul = new THREE.Euler();
    this.shardPool.update((s) => {
      s.life -= dt;
      if (s.life <= 0) {
        _m.compose(_p.set(0, -999, 0), _q, ZERO_SCALE);
        this.shardMesh.setMatrixAt(s.i, _m);
        return false;
      }
      s.vy -= 18 * dt;
      s.x += s.vx * dt; s.y += s.vy * dt; s.z += s.vz * dt;
      if (s.y < s.floorY + 0.05 && s.vy < 0) {
        s.y = s.floorY + 0.05;
        s.vy *= -0.35;
        s.vx *= 0.5; s.vz *= 0.5;
        s.srx *= 0.4; s.sry *= 0.4; s.srz *= 0.4;
      }
      s.rx += s.srx * dt; s.ry += s.sry * dt; s.rz += s.srz * dt;
      const frac = clamp01(s.life / s.maxLife);
      const sc = s.size * (frac < 0.25 ? frac / 0.25 : 1);
      eul.set(s.rx, s.ry, s.rz);
      _q2.setFromEuler(eul);
      _m.compose(_p.set(s.x, s.y, s.z), _q2, _s.set(sc, sc, sc));
      this.shardMesh.setMatrixAt(s.i, _m);
      return true;
    });
    this.shardMesh.instanceMatrix.needsUpdate = true;
  }
}

const _q2 = new THREE.Quaternion();
