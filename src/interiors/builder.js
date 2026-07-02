// Interior system. Each destination's inside is its own small Scene with its
// own ColliderField — the whole open world stops rendering at the door, which
// is both the perf win and why interiors can afford to be dense and moody.
// The builder ctx gives defs a tiny vocabulary: room, loft, mural, place,
// pack, shard, bossArena — enough to write an interior in ~50 lines.

import * as THREE from 'three';
import { G } from '../state.js';
import { ColliderField } from '../world/collision.js';
import { mats, place, canvasTex, setGlowCtx, clearGlows, addGlow } from '../world/props.js';
import { REGIONS } from '../world/regions.js';
import { INTERIORS } from './defs.js';
import { sfx } from '../core/audio.js';
import { music } from '../core/music.js';
import { save } from '../core/save.js';
import { spawnBoss } from '../combat/bosses.js';
import { makeRng } from '../core/rng.js';

const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);

export class InteriorManager {
  constructor() {
    this.active = null;
  }

  // Build the ctx handed to interior defs.
  _makeCtx(scene, collide, dest) {
    const rng = makeRng(dest.x * 1000 + dest.z);
    const ctx = {
      scene, collide, dest, rng,
      region: REGIONS[dest.region],
      enemies: [],

      // rectangular room centered at (0,0): floor, walls, optional ceiling.
      // Shell materials render double-sided — a box wall's inner face is a
      // backface, and a room you can't see from inside is a void.
      room(w, d, h, opts = {}) {
        const m = mats();
        const ds = (mat) => {
          const k = '_ds';
          if (!mat.userData[k]) {
            const c = mat.clone();
            c.side = THREE.DoubleSide;
            mat.userData[k] = c;
          }
          return mat.userData[k];
        };
        const floorMat = ds(opts.floor || m.stone);
        const wallMat = ds(opts.wall || m.stone);
        const floor = box(w, 0.4, d, floorMat);
        floor.position.y = -0.2;
        floor.receiveShadow = true;
        scene.add(floor);
        const walls = [
          [0, -d / 2, w, 0.5, 0], [0, d / 2, w, 0.5, opts.doorAt === 'front' ? 2.2 : 0],
          [-w / 2, 0, 0.5, d, 0], [w / 2, 0, 0.5, d, 0],
        ];
        for (const [x, z, ww, dd, gap] of walls) {
          if (gap) {
            // wall with a doorway gap in the middle
            const side = (ww - gap) / 2;
            for (const sx of [-(gap / 2 + side / 2), gap / 2 + side / 2]) {
              const wallM = box(side, h, dd, wallMat);
              wallM.position.set(x + sx, h / 2, z);
              scene.add(wallM);
              collide.addBox(x + sx - side / 2, z - dd / 2, x + sx + side / 2, z + dd / 2, 0, h);
            }
            const lintel = box(gap + 0.3, h - 2.6, dd, wallMat);
            lintel.position.set(x, 2.6 + (h - 2.6) / 2, z);
            scene.add(lintel);
            collide.addBox(x - gap / 2, z - dd / 2, x + gap / 2, z + dd / 2, 2.6, h);
          } else {
            const wallM = box(ww === 0.5 ? 0.5 : ww, h, dd === 0.5 ? 0.5 : dd, wallMat);
            wallM.position.set(x, h / 2, z);
            scene.add(wallM);
            collide.addBox(x - (ww === 0.5 ? 0.25 : ww / 2), z - (dd === 0.5 ? 0.25 : dd / 2),
              x + (ww === 0.5 ? 0.25 : ww / 2), z + (dd === 0.5 ? 0.25 : dd / 2), 0, h);
          }
        }
        if (opts.ceiling !== false) {
          const ceil = box(w, 0.4, d, opts.ceil ? ds(opts.ceil) : wallMat);
          ceil.position.y = h + 0.2;
          scene.add(ceil);
          collide.addBox(-w / 2, -d / 2, w / 2, d / 2, h, h + 0.4);
        }
        return ctx;
      },

      // raised platform you can walk onto (stairs = shallow boxes)
      loft(x, z, w, d, y, opts = {}) {
        const m = mats();
        const p = box(w, 0.3, d, opts.mat || m.wood);
        p.position.set(x, y - 0.15, z);
        scene.add(p);
        // thin slab — you can walk (and fight) underneath a loft
        collide.addBox(x - w / 2, z - d / 2, x + w / 2, z + d / 2, y - 0.3, y, { standable: true });
        if (opts.stairsFrom) {
          const [sx, sz] = opts.stairsFrom;
          const steps = Math.ceil(y / 0.45);
          for (let i = 0; i < steps; i++) {
            const t = (i + 1) / steps;
            const stx = sx + (x - sx) * t, stz = sz + (z - sz) * t;
            const step = box(1.4, 0.24, 0.9, m.woodDark);
            step.position.set(stx, t * y - 0.12, stz);
            scene.add(step);
            collide.addBox(stx - 0.7, stz - 0.45, stx + 0.7, stz + 0.45, 0, t * y, { standable: true });
          }
        }
        return ctx;
      },

      pillar(x, z, r, h) {
        const m = mats();
        const p = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.15, h, 8), m.stone);
        p.position.set(x, h / 2, z);
        scene.add(p);
        collide.addCircle(x, z, r, 0, h);
        return ctx;
      },

      // a painted story panel on a wall
      mural(x, y, z, ry, key, w = 3, h = 2) {
        const tex = canvasTex('mural-' + key, 256, MURALS[key] || MURALS.spiral);
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
          new THREE.MeshStandardMaterial({ map: tex, roughness: 1 }));
        m.position.set(x, y, z);
        m.rotation.y = ry;
        scene.add(m);
        return ctx;
      },

      place(name, x, z, rot = 0, opts = {}) {
        place(scene, collide, name, x, opts.y ?? 0, z, rot, { ...opts, ctx: 'interior' });
        return ctx;
      },

      // enemies wake when you get deep enough — spawned away from the door
      pack(type, n, cx, cz, spread = 4) {
        for (let i = 0; i < n; i++) {
          const a = rng() * Math.PI * 2;
          ctx.enemies.push({ type, x: cx + Math.cos(a) * spread * rng(), z: cz + Math.sin(a) * spread * rng() });
        }
        return ctx;
      },

      // health shard on a pedestal (interior version); y for raised spots
      shard(x, z, y = 0) {
        if (G.save.found['shard-' + dest.id]) return ctx;
        place(scene, collide, 'pedestal', x, y, z, 0, { ctx: 'interior' });
        const s = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), mats().crystal.clone());
        s.material.emissive = new THREE.Color(0.3, 0.9, 0.5);
        s.position.set(x, y + 1.55, z);
        scene.add(s);
        ctx._shard = { x, z, y: y + 1.55, mesh: s, id: 'shard-' + dest.id };
        return ctx;
      },

      light(x, y, z, color, intensity = 1.2) {
        addGlow(x, y, z, color, intensity);
        return ctx;
      },
    };
    return ctx;
  }

  enter(dest) {
    const def = INTERIORS[dest.id];
    if (!def) return false;

    const scene = new THREE.Scene();
    const collide = new ColliderField(() => 0);
    scene.fog = new THREE.FogExp2(new THREE.Color(...(def.fog || [0.04, 0.05, 0.07])), def.fogDensity ?? 0.03);
    scene.background = new THREE.Color(...(def.fog || [0.02, 0.025, 0.04]));

    setGlowCtx('interior');
    const ctx = this._makeCtx(scene, collide, dest);
    def.build(ctx);
    setGlowCtx('world');

    // entry/exit veil at the door (player walks in facing -z → spawns at +z edge)
    const veil = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 2.6),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(...REGIONS[dest.region].key), transparent: true, opacity: 0.3,
        blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false, fog: false,
      })
    );
    const spawn = def.spawn || { x: 0, z: 8, yaw: 0 };
    const spawnY = spawn.y ?? 0;
    veil.position.set(spawn.x, spawnY + 1.3, spawn.z + 1.2);
    scene.add(veil);

    this.active = {
      dest, def, scene, collide, ctx, veil,
      exitAt: { x: spawn.x, z: spawn.z + 1.2, r: 1.0, y: spawnY },
      packsSpawned: false,
      boss: null,
      rewardPedestal: null,
      graceT: 1.2,           // can't re-exit instantly
    };

    // move the player + systems into the interior
    const pl = G.player;
    pl.pos.set(spawn.x, spawnY, spawn.z);
    pl.vel.set(0, 0, 0);
    pl.yaw = spawn.yaw;
    pl.grounded = true;
    G.collide = collide;
    G.scene = scene;
    G.interior = this.active;
    G.mode = 'interior';

    // shared light rig + camera (it carries the viewmodel) + fx pools follow
    scene.add(G.camera);
    scene.add(G.sun, G.sun.target, G.hemi);
    // interiors have no sky bounce — the rig needs to work ~3x harder here
    G.sun.intensity = (def.sun ?? 0.3) * 3.2;
    G.sun.position.set(18, 30, 12);
    G.sun.target.position.set(0, 0, 0);
    G.hemi.intensity = (def.hemiIntensity ?? 0.45) * 4.2;
    if (def.hemiColor) G.hemi.color.setRGB(...def.hemiColor);
    G.rovers.moveTo(scene);
    G.particles.moveTo(scene);
    G.motes.moveTo(scene);
    G.projectiles.setScene(scene);
    G.weapon.moveTracersTo(scene);

    if (!G.save.entered[dest.id]) { G.save.entered[dest.id] = true; save(); }
    // compile interior shaders while the screen is still black — no first-frame hitch
    G.renderer.compile(scene, G.camera);
    music.setMode('interior');
    sfx('door');
    return true;
  }

  exit() {
    const a = this.active;
    if (!a) return;

    G.enemies.killAll('interior');
    G.breakables.clearCtx('interior');
    clearGlows('interior');
    if (a.boss) a.boss.dispose?.();
    G.boss = null;   // always — a defeated boss must not linger as a shot-absorbing ghost

    // player re-appears just outside the door
    const dest = a.dest;
    const doorWorld = { x: dest.x + (a.def.spawn?.doorX ?? 0), z: dest.z + (a.def.doorOutZ ?? 10) };
    const pl = G.player;
    pl.pos.set(doorWorld.x, 30, doorWorld.z);
    pl.pos.y = G.worldCollide.groundAt(doorWorld.x, doorWorld.z, 200, 2);
    pl.vel.set(0, 0, 0);
    pl.yaw = Math.atan2(dest.x - pl.pos.x, dest.z - pl.pos.z); // face outward, away from the door
    pl.grounded = true;

    G.collide = G.worldCollide;
    G.scene = G.worldScene;
    G.interior = null;
    G.mode = 'world';

    G.worldScene.add(G.camera);
    G.worldScene.add(G.sun, G.sun.target, G.hemi);
    G.rovers.moveTo(G.worldScene);
    G.particles.moveTo(G.worldScene);
    G.motes.moveTo(G.worldScene);
    G.projectiles.setScene(G.worldScene);
    G.weapon.moveTracersTo(G.worldScene);

    // dispose interior GPU resources
    a.scene.traverse((o) => {
      if (o.isMesh) {
        o.geometry?.dispose?.();
      }
    });
    music.setMode('world');
    sfx('door', { pitch: 1.2 });
    this.active = null;
  }

  update(dt, t) {
    const a = this.active;
    if (!a) return;
    a.graceT -= dt;
    const pl = G.player;

    // veil pulse + exit
    a.veil.material.opacity = 0.25 + Math.sin(t * 2.2) * 0.1;
    if (a.graceT <= 0 && !a.bossLock &&
        Math.hypot(pl.pos.x - a.exitAt.x, pl.pos.z - a.exitAt.z) < a.exitAt.r &&
        Math.abs(pl.pos.y - a.exitAt.y) < 2.2) {
      G.requestExitInterior?.();
      return;
    }

    // ambush packs wake when the player commits to the room
    if (!a.packsSpawned && a.ctx.enemies.length && Math.hypot(pl.pos.x, pl.pos.z) < (a.def.packTrigger ?? 6)) {
      a.packsSpawned = true;
      for (const s of a.ctx.enemies) {
        G.enemies.spawn(s.type, s.x, s.z, { ctx: 'interior', boost: a.dest.kind === 'major' ? 1.2 : 1 });
      }
    }

    // boss wake
    if (a.dest.kind === 'major' && !a.boss && !G.save.bossesDown[a.dest.boss] &&
        Math.hypot(pl.pos.x - (a.def.bossAt?.x ?? 0), pl.pos.z - (a.def.bossAt?.z ?? -6)) < (a.def.bossWake ?? 10)) {
      a.boss = spawnBoss(a.dest.boss, a);
      a.bossLock = true; // exit seals until it's decided
    }

    // shard pickup
    const s = a.ctx._shard;
    if (s && !s.taken) {
      s.mesh.rotation.y = t * 1.4;
      s.mesh.position.y = s.y + Math.sin(t * 2) * 0.1;
      if (Math.hypot(pl.pos.x - s.x, pl.pos.y + 1 - s.y, pl.pos.z - s.z) < 1.4) {
        s.taken = true;
        s.mesh.removeFromParent();
        G.save.found[s.id] = true;
        save();
        G.onShardCollected?.();
      }
    }

    // reward pedestal after a boss dies
    const rp = a.rewardPedestal;
    if (rp && !rp.taken) {
      rp.mesh.rotation.y = t * 1.6;
      rp.mesh.position.y = rp.y + Math.sin(t * 2.4) * 0.14;
      if (Math.hypot(pl.pos.x - rp.x, pl.pos.z - rp.z) < 1.6) {
        rp.taken = true;
        rp.mesh.removeFromParent();
        G.onRewardTaken?.(a.dest.reward);
      }
    }

    a.def.update?.(a.ctx, dt, t);
  }

  // called by boss code when the fight ends in victory
  onBossDown() {
    const a = this.active;
    if (!a) return;
    a.bossLock = false;
    a.boss = null;
    // the reward crystal rises where the boss stood
    const at = a.def.bossAt || { x: 0, z: -6 };
    const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.42),
      new THREE.MeshStandardMaterial({
        color: 0xffe8a0, emissive: 0xcc8820, emissiveIntensity: 1.0, roughness: 0.2, flatShading: true,
      }));
    mesh.position.set(at.x, 1.6, at.z);
    a.scene.add(mesh);
    a.rewardPedestal = { x: at.x, z: at.z, y: 1.6, mesh };
    addGlow(at.x, 2, at.z, [1, 0.8, 0.4], 2.2);
  }
}

// ---- mural paintings: the island's story in four wordless panels -----------
const MURALS = {
  arrival(g, s) {
    const grad = g.createLinearGradient(0, 0, 0, s);
    grad.addColorStop(0, '#2b3a58'); grad.addColorStop(1, '#0e1522');
    g.fillStyle = grad; g.fillRect(0, 0, s, s);
    g.fillStyle = '#e8d8a0';
    g.beginPath(); g.arc(s * 0.7, s * 0.25, s * 0.09, 0, 7); g.fill();       // a sun
    g.strokeStyle = '#9fc8e8'; g.lineWidth = 3;
    g.beginPath(); g.moveTo(s * 0.2, s * 0.85); g.lineTo(s * 0.5, s * 0.45); g.lineTo(s * 0.8, s * 0.85); g.stroke(); // a sail
    g.fillStyle = '#cfe0f0';
    for (let i = 0; i < 5; i++) g.fillRect(s * (0.25 + i * 0.12), s * 0.87, 4, 10); // little figures
  },
  spire(g, s) {
    g.fillStyle = '#1a2233'; g.fillRect(0, 0, s, s);
    g.fillStyle = '#8fa8d8';
    g.beginPath(); g.moveTo(s / 2 - 14, s * 0.9); g.lineTo(s / 2, s * 0.12); g.lineTo(s / 2 + 14, s * 0.9); g.fill();
    g.strokeStyle = '#e8f0ff'; g.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      g.beginPath(); g.arc(s / 2 + Math.cos(a) * s * 0.28, s * 0.45 + Math.sin(a) * s * 0.2, 5, 0, 7); g.stroke();
    }
  },
  shatter(g, s) {
    g.fillStyle = '#241a2e'; g.fillRect(0, 0, s, s);
    g.strokeStyle = '#ff8888'; g.lineWidth = 4;
    g.beginPath(); g.moveTo(s / 2, 0); g.lineTo(s * 0.4, s * 0.4); g.lineTo(s * 0.6, s * 0.6); g.lineTo(s * 0.45, s); g.stroke();
    g.fillStyle = '#6a5a88';
    for (let i = 0; i < 10; i++) {
      g.save();
      g.translate((i * 53) % s, (i * 97) % s);
      g.rotate(i);
      g.fillRect(-10, -6, 20, 12);
      g.restore();
    }
  },
  spiral(g, s) {
    g.fillStyle = '#15201e'; g.fillRect(0, 0, s, s);
    g.strokeStyle = '#7fd8b8'; g.lineWidth = 3;
    g.beginPath();
    for (let a = 0; a < 20; a += 0.1) {
      const r = a * s * 0.02;
      const x = s / 2 + Math.cos(a) * r, y = s / 2 + Math.sin(a) * r;
      a === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
    }
    g.stroke();
  },
  wings(g, s) {
    g.fillStyle = '#101c2c'; g.fillRect(0, 0, s, s);
    g.strokeStyle = '#a8d8f0'; g.lineWidth = 4;
    for (const dir of [-1, 1]) {
      g.beginPath();
      g.moveTo(s / 2, s * 0.6);
      g.quadraticCurveTo(s / 2 + dir * s * 0.3, s * 0.2, s / 2 + dir * s * 0.45, s * 0.5);
      g.stroke();
    }
    g.fillStyle = '#ffe8a0';
    g.fillRect(s / 2 - 3, s * 0.55, 6, s * 0.3);
  },
};
