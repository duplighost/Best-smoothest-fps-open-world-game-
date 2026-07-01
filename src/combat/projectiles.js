// Pooled projectiles: enemy bolts (dodgeable, glowing) and the player's
// seeker rockets (homing spores). Plus the shared explosion helper.

import * as THREE from 'three';
import { G } from '../state.js';
import { Pool } from '../core/pool.js';
import { sfx } from '../core/audio.js';
import { hitEnemy } from './damage.js';
import { juice } from '../fx/juice.js';
import { CFG } from '../config.js';

const _c = new THREE.Color();

export class Projectiles {
  constructor() {
    this.boltGeo = new THREE.SphereGeometry(0.16, 8, 6);
    this.boltPool = new Pool((i) => {
      const m = new THREE.Mesh(this.boltGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false }));
      m.visible = false;
      return { i, mesh: m, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, life: 0, fromPlayer: false, damage: 1, seek: false, turn: 0 };
    }, 48);
    this.scene = null;
  }

  setScene(scene) {
    this.scene = scene;
    for (const b of this.boltPool.items) {
      b.mesh.removeFromParent();
      scene.add(b.mesh);
    }
    this.boltPool.update(() => false); // release all active
    for (const b of this.boltPool.items) b.mesh.visible = false;
  }

  enemyBolt(x, y, z, player, speed, color, angleOffset = 0) {
    const b = this.boltPool.obtain();
    if (!b) return;
    const tx = player.pos.x, ty = player.pos.y + 1.1, tz = player.pos.z;
    let dx = tx - x, dy = ty - y, dz = tz - z;
    const d = Math.hypot(dx, dy, dz) || 1;
    dx /= d; dy /= d; dz /= d;
    if (angleOffset) {
      const cos = Math.cos(angleOffset), sin = Math.sin(angleOffset);
      const nx = dx * cos - dz * sin, nz = dx * sin + dz * cos;
      dx = nx; dz = nz;
    }
    b.x = x; b.y = y; b.z = z;
    b.vx = dx * speed; b.vy = dy * speed; b.vz = dz * speed;
    b.life = 5;
    b.fromPlayer = false;
    b.seek = false;
    b.damage = 1;
    b.mesh.visible = true;
    b.mesh.material.color.setRGB(color[0], color[1], color[2]);
    b.mesh.scale.setScalar(1);
  }

  seekerVolley(pos, dir, count) {
    const W = CFG.weapon.seeker;
    for (let k = 0; k < count; k++) {
      const b = this.boltPool.obtain();
      if (!b) return;
      const spread = 0.35;
      b.x = pos.x; b.y = pos.y; b.z = pos.z;
      b.vx = (dir.x + (Math.random() - 0.5) * spread) * W.speed * 0.6;
      b.vy = (dir.y + 0.25 + Math.random() * 0.3) * W.speed * 0.6;
      b.vz = (dir.z + (Math.random() - 0.5) * spread) * W.speed * 0.6;
      b.life = W.lifetime;
      b.fromPlayer = true;
      b.seek = true;
      b.turn = W.turn;
      b.damage = W.damage;
      b.mesh.visible = true;
      b.mesh.material.color.setRGB(0.5, 1.0, 0.75);
      b.mesh.scale.setScalar(1.2);
    }
  }

  explode(x, y, z, radius, color, opts = {}) {
    G.particles?.burst('impact', x, y, z, 22, { color, sizeMult: 1.6 });
    G.particles?.burst('smoke', x, y, z, 8, { color: [color[0] * 0.5, color[1] * 0.5, color[2] * 0.5] });
    G.rovers?.pulse(x, y, z, color, 4, 8, 14);

    const pl = G.player;
    if (opts.hurtPlayer && pl) {
      const d = Math.hypot(pl.pos.x - x, pl.pos.y + 1 - y, pl.pos.z - z);
      if (d < radius) pl.hurt(opts.hurtPlayer, x, z);
    }
    if (opts.fromPlayer) {
      for (const e of [...G.enemies.list]) {
        const d = Math.hypot(e.x - x, e.y - y, e.z - z);
        if (d < radius + e.def.radius) {
          hitEnemy(e, opts.damage || 1, { kind: opts.kind || 'seeker', dir: { x: (e.x - x) / (d || 1), y: 0, z: (e.z - z) / (d || 1) } });
        }
      }
      // explosions also break nearby breakables
      G.breakables?.breakNear(x, y, z, radius);
    }
  }

  update(dt) {
    const pl = G.player;
    this.boltPool.update((b) => {
      b.life -= dt;
      if (b.life <= 0) { b.mesh.visible = false; return false; }

      if (b.seek) {
        // home toward the nearest live enemy
        let best = null, bd = 1e9;
        for (const e of G.enemies.list) {
          const d = (e.x - b.x) ** 2 + (e.y - b.y) ** 2 + (e.z - b.z) ** 2;
          if (d < bd) { bd = d; best = e; }
        }
        if (best) {
          const d = Math.sqrt(bd) || 1;
          const f = 1 - Math.exp(-b.turn * dt);
          const sp = Math.hypot(b.vx, b.vy, b.vz);
          b.vx += ((best.x - b.x) / d * sp - b.vx) * f;
          b.vy += ((best.y - b.y) / d * sp - b.vy) * f;
          b.vz += ((best.z - b.z) / d * sp - b.vz) * f;
          const ns = Math.hypot(b.vx, b.vy, b.vz) || 1;
          const target = CFG.weapon.seeker.speed;
          b.vx *= target / ns; b.vy *= target / ns; b.vz *= target / ns;
        }
        if (Math.random() < dt * 30) G.particles?.burst('soul', b.x, b.y, b.z, 1, { color: [0.5, 1, 0.75] });
      }

      b.x += b.vx * dt; b.y += b.vy * dt; b.z += b.vz * dt;
      b.mesh.position.set(b.x, b.y, b.z);

      // world hit
      const ground = G.collide.groundAt(b.x, b.z, b.y + 1.5, 0);
      if (b.y <= ground + 0.05) {
        if (b.fromPlayer && b.seek) this.explode(b.x, b.y, b.z, 2.2, [0.5, 1, 0.75], { fromPlayer: true, damage: b.damage });
        else G.particles?.burst('impact', b.x, b.y, b.z, 4);
        b.mesh.visible = false;
        return false;
      }

      if (b.fromPlayer) {
        if (b.seek) {
          for (const e of G.enemies.list) {
            const d = Math.hypot(e.x - b.x, e.y - b.y, e.z - b.z);
            if (d < e.def.radius + 0.4) {
              this.explode(b.x, b.y, b.z, 2.2, [0.5, 1, 0.75], { fromPlayer: true, damage: b.damage });
              b.mesh.visible = false;
              return false;
            }
          }
          if (G.boss && G.boss.testHit && G.boss.testHit(b.x, b.y, b.z, 0.6)) {
            this.explode(b.x, b.y, b.z, 2.4, [0.5, 1, 0.75], { fromPlayer: true, damage: b.damage });
            b.mesh.visible = false;
            return false;
          }
        }
      } else if (pl && !pl.dead) {
        const d = Math.hypot(pl.pos.x - b.x, pl.pos.y + 1.0 - b.y, pl.pos.z - b.z);
        if (d < CFG.player.radius + 0.45) {
          pl.hurt(b.damage, b.x - b.vx, b.z - b.vz);
          G.particles?.burst('impact', b.x, b.y, b.z, 6);
          b.mesh.visible = false;
          return false;
        }
      }
      return true;
    });
  }
}
