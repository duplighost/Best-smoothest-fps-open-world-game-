// Enemy manager: spawn director (telegraphed, never on top of the player),
// six behavior archetypes, per-type mesh pools (no allocation churn), and
// hit-flash bookkeeping. All damage dealing goes through damage.js — this
// file only moves bodies and decides when they get to hurt you.

import * as THREE from 'three';
import { CFG } from '../config.js';
import { G } from '../state.js';
import { ENEMY_TYPES, REGION_SPAWNS } from './enemytypes.js';
import { dominantRegion } from '../world/regions.js';
import { terrainHeight } from '../world/terrain.js';
import { sfx } from '../core/audio.js';
import { clamp01, damp } from '../core/math.js';

const E = CFG.enemies;
const _v = new THREE.Vector3();

let _glowTex = null;
const _glowMats = new Map();
function getGlowMat(type) {
  if (_glowMats.has(type)) return _glowMats.get(type);
  if (!_glowTex) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255,255,255,0.85)');
    grad.addColorStop(0.45, 'rgba(255,255,255,0.28)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    _glowTex = new THREE.CanvasTexture(c);
  }
  const col = ENEMY_TYPES[type].color;
  const m = new THREE.SpriteMaterial({
    map: _glowTex, color: new THREE.Color(col[0], col[1], col[2]),
    transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending,
    depthWrite: false, fog: false,
  });
  _glowMats.set(type, m);
  return m;
}

export class Enemies {
  constructor() {
    this.list = [];
    this.pending = [];              // telegraphed spawns counting down
    this.meshPools = new Map();     // type -> mesh[]
    this.spawnTimer = 0;
    this.scene = null;
  }

  setScene(scene) { this.scene = scene; }

  _obtainMesh(type) {
    let pool = this.meshPools.get(type);
    if (!pool) { pool = []; this.meshPools.set(type, pool); }
    let mesh = pool.pop();
    if (!mesh) {
      mesh = ENEMY_TYPES[type].build();
      mesh.userData.mats = [];
      mesh.traverse((o) => {
        if (o.isMesh && o.material && o.material.emissive !== undefined) {
          o.material = o.material.clone();
          mesh.userData.mats.push(o.material);
        }
      });
      mesh.userData.baseEmissive = mesh.userData.mats.map((m) => m.emissiveIntensity);
      mesh.userData.baseEmissiveHex = mesh.userData.mats.map((m) => m.emissive.getHex());
      // presence glow: a soft pool of the enemy's color at its feet — reads
      // through fog and dusk so nothing ambushes you that you couldn't see
      const glowSprite = new THREE.Sprite(getGlowMat(type));
      glowSprite.position.y = 0.12;
      glowSprite.scale.setScalar(ENEMY_TYPES[type].radius * 4.6);
      mesh.add(glowSprite);
      mesh.userData.glowSprite = glowSprite;
    }
    return mesh;
  }

  _releaseMesh(type, mesh) {
    mesh.removeFromParent();
    const pool = this.meshPools.get(type);
    if (pool && pool.length < 8) pool.push(mesh);
  }

  // Telegraph → materialize. ctx tags world vs interior enemies.
  spawn(type, x, z, opts = {}) {
    this.pending.push({ type, x, z, y: opts.y, t: E.telegraphTime, ctx: opts.ctx || 'world', boost: opts.boost || 1, tag: opts.tag });
    const def = ENEMY_TYPES[type];
    G.particles?.burst('spark', x, (opts.y ?? this._groundY(x, z, def)) + 1, z, 6, { color: def.color });
  }

  _groundY(x, z, def) {
    const base = G.collide.groundAt(x, z, 100, 0.6);
    return base + def.fly;
  }

  _materialize(p) {
    const def = ENEMY_TYPES[p.type];
    const mesh = this._obtainMesh(p.type);
    const y = p.y ?? this._groundY(p.x, p.z, def);
    mesh.position.set(p.x, y, p.z);
    mesh.scale.setScalar(0.01);
    this.scene.add(mesh);
    const e = {
      type: p.type, def, mesh, ctx: p.ctx, tag: p.tag,
      x: p.x, y, z: p.z, vx: 0, vy: 0, vz: 0,
      hp: Math.ceil(def.hp * p.boost), maxHp: Math.ceil(def.hp * p.boost),
      flashT: 0, contactCd: 0, shootT: 1 + Math.random() * (def.shootEvery || 2),
      t: Math.random() * 10, state: 0, stateT: 0, fuse: -1,
      spawnT: 0.18, alive: true, squash: 0,
    };
    this.list.push(e);
    sfx('enemyshoot', { pitch: 0.6, gain: 0.3 });
    return e;
  }

  killAll(ctx) {
    for (const e of this.list) {
      if (ctx && e.ctx !== ctx) continue;
      e.alive = false;
      this._releaseMesh(e.type, e.mesh);
    }
    this.list = this.list.filter((e) => e.alive);
    if (ctx) this.pending = this.pending.filter((p) => p.ctx !== ctx);
    else this.pending.length = 0;
  }

  countCtx(ctx) { return this.list.filter((e) => e.ctx === ctx).length + this.pending.filter((p) => p.ctx === ctx).length; }

  // World roaming pressure: keep a handful of wild enemies near the player.
  _director(dt) {
    if (G.mode !== 'world') return;
    this.spawnTimer -= dt;
    if (this.spawnTimer > 0) return;
    this.spawnTimer = 1.3;
    const pl = G.player;
    const near = this.list.filter((e) => e.ctx === 'world' &&
      (e.x - pl.pos.x) ** 2 + (e.z - pl.pos.z) ** 2 < E.activateDist ** 2).length;
    const target = 7;
    if (near >= target || this.list.length >= E.maxActive) return;

    // spawn in the player's region, off to the side, never point-blank
    for (let attempt = 0; attempt < 6; attempt++) {
      const a = Math.random() * Math.PI * 2;
      const d = 26 + Math.random() * 30;
      const x = pl.pos.x + Math.cos(a) * d;
      const z = pl.pos.z + Math.sin(a) * d;
      if (Math.hypot(x, z) > 620) continue;              // not in the sea
      if (terrainHeight(x, z) < 0.6) continue;
      if (Math.hypot(x, z) < 55) continue;               // hub is a safe zone
      const region = dominantRegion(x, z);
      const table = REGION_SPAWNS[region];
      let r = Math.random(), type = table[0][0];
      for (const [k, w] of table) { r -= w; if (r <= 0) { type = k; break; } }
      this.spawn(type, x, z, { ctx: 'world' });
      break;
    }
  }

  update(dt, now) {
    const pl = G.player;

    // telegraphs → bodies
    for (let i = this.pending.length - 1; i >= 0; i--) {
      const p = this.pending[i];
      // pause interior telegraphs if we're not inside (and vice versa)
      if ((p.ctx === 'world') !== (G.mode === 'world')) continue;
      p.t -= dt;
      if (p.t <= 0) { this.pending.splice(i, 1); this._materialize(p); }
    }

    this._director(dt);

    const inWorldMode = G.mode === 'world';
    for (let i = this.list.length - 1; i >= 0; i--) {
      const e = this.list[i];
      if ((e.ctx === 'world') !== inWorldMode) { e.mesh.visible = false; continue; }
      e.mesh.visible = true;

      const dx = pl.pos.x - e.x, dz = pl.pos.z - e.z;
      const distXZ = Math.hypot(dx, dz);

      // world enemies sleep/despawn far away
      if (e.ctx === 'world') {
        if (distXZ > E.sleepDist) {
          e.alive = false;
          this._releaseMesh(e.type, e.mesh);
          this.list.splice(i, 1);
          continue;
        }
        if (distXZ > E.activateDist) continue;
        if (distXZ > E.throttleDist && (i + ((now * 60) | 0)) % 2 === 0) continue;
      }

      e.t += dt;
      e.flashT = Math.max(0, e.flashT - dt);
      e.contactCd = Math.max(0, e.contactCd - dt);
      e.squash = damp(e.squash, 0, 8, dt);
      if (e.spawnT > 0) {
        e.spawnT -= dt;
        e.mesh.scale.setScalar(clamp01(1 - e.spawnT / 0.18));
      }

      this._behave(e, dt, dx, dz, distXZ, now);

      // integrate + world collision (circle push-out)
      e.x += e.vx * dt; e.z += e.vz * dt;
      _v.x = e.x; _v.z = e.z;
      G.collide.resolve(_v, e.def.radius, e.y - 0.5, e.y + 1.2, (e._scr ||= []));
      e.x = _v.x; e.z = _v.z;

      // vertical: grounded types track ground; flyers hover with a bob
      if (e.def.fly > 0) {
        const targetY = G.collide.groundAt(e.x, e.z, e.y + 2, 0.6) + e.def.fly + Math.sin(e.t * 1.7) * 0.35;
        e.y = damp(e.y, targetY, 3.5, dt);
        e.y += e.vy * dt;
        e.vy = damp(e.vy, 0, 4, dt);
      } else {
        const g = G.collide.groundAt(e.x, e.z, e.y + 0.5, 0.8);
        if (e.y > g + 0.02) { e.vy -= 22 * dt; e.y += e.vy * dt; }
        if (e.y <= g) { e.y = g; e.vy = 0; }
      }

      // enemy-enemy separation (small n — cheap)
      for (let j = 0; j < this.list.length; j++) {
        if (j === i) continue;
        const o = this.list[j];
        if (o.ctx !== e.ctx) continue;
        const ox = e.x - o.x, oz = e.z - o.z;
        const dd = Math.hypot(ox, oz);
        const min = e.def.radius + o.def.radius;
        if (dd < min && dd > 0.001) {
          e.x += (ox / dd) * (min - dd) * 0.5;
          e.z += (oz / dd) * (min - dd) * 0.5;
        }
      }

      // contact damage
      const r = e.def.radius + CFG.player.radius + 0.15;
      if (e.contactCd <= 0 && distXZ < r && Math.abs((pl.pos.y + 0.9) - e.y) < 1.7) {
        if (pl.hurt(e.def.contact, e.x, e.z)) e.contactCd = 0.8;
      }

      // present
      e.mesh.position.set(e.x, e.y, e.z);
      const sq = 1 + e.squash;
      e.mesh.scale.set(e.spawnT > 0 ? e.mesh.scale.x : 1 / sq, e.spawnT > 0 ? e.mesh.scale.y : sq, e.spawnT > 0 ? e.mesh.scale.z : 1 / sq);
      if (distXZ > 0.01) e.mesh.rotation.y = Math.atan2(dx, dz);
      const ud = e.mesh.userData;
      if (ud.glowSprite) {
        const pulse = 1 + Math.sin(e.t * 3.2) * 0.12 + e.flashT * 2;
        ud.glowSprite.scale.setScalar(e.def.radius * 4.6 * pulse);
      }
      if (ud.spin) ud.spin.rotation.y += dt * 2.4;
      if (ud.spin2) ud.spin2.rotation.x += dt * 1.7;
      if (ud.swell && e.fuse >= 0) {
        const f = 1 + (1 - e.fuse / e.def.fuseTime) * 0.5;
        ud.swell.scale.setScalar(f);
      }

      // hit flash — emissive white, decays fast [ported]
      const mats = ud.mats, base = ud.baseEmissive, baseHex = ud.baseEmissiveHex;
      const fl = e.flashT / E.hitFlash;
      for (let m = 0; m < mats.length; m++) {
        if (fl > 0) { mats[m].emissive.setRGB(1, 1, 1); mats[m].emissiveIntensity = 1.4 * fl + base[m]; }
        else { mats[m].emissive.setHex(baseHex[m]); mats[m].emissiveIntensity = base[m]; }
      }
    }
  }

  _behave(e, dt, dx, dz, dist, now) {
    const pl = G.player;
    const def = e.def;
    const toX = dist > 0.01 ? dx / dist : 0, toZ = dist > 0.01 ? dz / dist : 0;

    switch (def.behavior) {
      case 'drift': {
        const want = dist < 22 ? def.speed : def.speed * 0.4;
        e.vx = damp(e.vx, toX * want + Math.sin(e.t * 1.3) * 0.6, 2.2, dt);
        e.vz = damp(e.vz, toZ * want + Math.cos(e.t * 1.1) * 0.6, 2.2, dt);
        break;
      }
      case 'hop': {
        e.stateT -= dt;
        const grounded = e.vy === 0;
        if (grounded) {
          e.vx = damp(e.vx, 0, 10, dt); e.vz = damp(e.vz, 0, 10, dt);
          if (e.stateT <= 0 && dist < 26) {
            e.stateT = 1.1 + Math.random() * 0.9;
            e.vy = 7.2; e.y += 0.05;
            e.vx = toX * def.speed * 1.6; e.vz = toZ * def.speed * 1.6;
            e.squash = 0.35;
            if (dist < 18) sfx('enemyshoot', { pitch: 1.6, gain: 0.18 });
          }
        }
        break;
      }
      case 'chase': {
        let sp = def.speed;
        if (def.lunge) {
          e.stateT -= dt;
          if (e.state === 0 && dist < 7 && e.stateT <= 0) { e.state = 1; e.stateT = 0.38; sfx('enemyshoot', { pitch: 0.8, gain: 0.35 }); } // windup [ported telegraph]
          else if (e.state === 1 && e.stateT <= 0) { e.state = 2; e.stateT = 0.55; e.squash = 0.3; }
          else if (e.state === 2 && e.stateT <= 0) { e.state = 0; e.stateT = 1.1; }
          if (e.state === 1) sp = 0.4;
          if (e.state === 2) sp = def.speed * 2.3;
        }
        if (def.heavy) {
          // golem: close-range slam with a readable windup
          e.stateT -= dt;
          if (e.state === 0 && dist < 3.2 && e.stateT <= 0) { e.state = 1; e.stateT = 0.55; e.squash = -0.25; sfx('enemyshoot', { pitch: 0.5, gain: 0.4 }); }
          else if (e.state === 1 && e.stateT <= 0) {
            e.state = 0; e.stateT = 1.6;
            G.particles?.burst('impact', e.x, e.y + 0.3, e.z, 16, { color: def.color });
            G.rovers?.pulse(e.x, e.y + 1, e.z, def.color, 2.5, 8);
            sfx('slam', { pitch: 1.3, gain: 0.5 });
            if (dist < 3.6) pl.hurt(def.contact, e.x, e.z);
          }
          if (e.state === 1) sp = 0;
        }
        // hunter pressure: distant enemies close faster so open land never dawdles [ported]
        const hf = clamp01((dist - 24) / 40);
        sp *= 1 + hf * 1.4;
        e.vx = damp(e.vx, toX * sp, 5, dt);
        e.vz = damp(e.vz, toZ * sp, 5, dt);
        break;
      }
      case 'ambush': {
        if (e.state === 0) {
          e.vx = 0; e.vz = 0;
          e.mesh.scale.y = 0.5;
          if (dist < 11) { e.state = 1; e.squash = 0.5; sfx('enemyshoot', { pitch: 1.9, gain: 0.3 }); }
        } else {
          e.vx = damp(e.vx, toX * def.speed, 6, dt);
          e.vz = damp(e.vz, toZ * def.speed, 6, dt);
        }
        break;
      }
      case 'turret': {
        e.shootT -= dt;
        if (e.shootT <= 0 && dist < 42) {
          e.shootT = def.shootEvery;
          if (G.collide.segmentClear(e.x, e.z, pl.pos.x, pl.pos.z, e.y + 0.8, (e._scr ||= []))) {
            sfx('turret');
            G.projectiles.enemyBolt(e.x, e.y + 1.0, e.z, pl, def.projSpeed, def.color);
          }
        }
        break;
      }
      case 'orbit': {
        // strafe a ring around the player, dart out if crowded
        const ringR = 10 + (e.mesh.id % 5);
        const tangX = -toZ, tangZ = toX;
        const dirSign = (e.mesh.id % 2) ? 1 : -1;
        const radial = (dist - ringR) * 0.4;
        e.vx = damp(e.vx, toX * radial + tangX * def.speed * dirSign, 3, dt);
        e.vz = damp(e.vz, toZ * radial + tangZ * def.speed * dirSign, 3, dt);
        e.shootT -= dt;
        if (e.shootT <= 0 && dist < 34) {
          e.shootT = def.shootEvery * (0.8 + Math.random() * 0.5);
          sfx('enemyshoot');
          if (def.triShot) {
            for (let k = -1; k <= 1; k++) G.projectiles.enemyBolt(e.x, e.y, e.z, pl, def.projSpeed, def.color, k * 0.22);
          } else {
            G.projectiles.enemyBolt(e.x, e.y, e.z, pl, def.projSpeed, def.color);
          }
        }
        break;
      }
      case 'floatbomb': {
        if (e.fuse < 0) {
          e.vx = damp(e.vx, toX * def.speed, 2, dt);
          e.vz = damp(e.vz, toZ * def.speed, 2, dt);
          if (dist < def.fuseDist) {
            e.fuse = def.fuseTime;
            sfx('charge', { pitch: 1.5 });
          }
        } else {
          e.fuse -= dt;
          e.vx = damp(e.vx, 0, 4, dt); e.vz = damp(e.vz, 0, 4, dt);
          if (e.fuse <= 0) {
            G.projectiles.explode(e.x, e.y, e.z, def.boomRadius, def.color, { hurtPlayer: 1 });
            sfx('gasburst');
            this.remove(e, false);
          }
        }
        break;
      }
    }
  }

  remove(e, releaseSoul = true) {
    e.alive = false;
    const idx = this.list.indexOf(e);
    if (idx !== -1) this.list.splice(idx, 1);
    this._releaseMesh(e.type, e.mesh);
    if (releaseSoul) G.motes?.spawn('soul', e.x, e.y, e.z, 1);
  }
}
