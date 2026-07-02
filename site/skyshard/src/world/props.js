// The prop kit: everything that furnishes the world and its interiors.
// Primitives + shared cached materials (constant shader count) + procedural
// canvas textures. Builders return Groups; place() wires up colliders and
// breakable registration in one call so callers can't forget one half.

import * as THREE from 'three';
import { makeRng, fbm2 } from '../core/rng.js';
import { G } from '../state.js';

// ---- procedural textures ---------------------------------------------------
const texCache = new Map();

export function canvasTex(key, size, paint) {
  if (texCache.has(key)) return texCache.get(key);
  const c = document.createElement('canvas');
  c.width = c.height = size;
  paint(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  texCache.set(key, t);
  return t;
}

export const woodTex = () => canvasTex('wood', 128, (g, s) => {
  g.fillStyle = '#6b4a2f';
  g.fillRect(0, 0, s, s);
  const rng = makeRng(7);
  for (let y = 0; y < s; y += 8 + (rng() * 6 | 0)) {
    g.fillStyle = `rgba(40,24,12,${0.25 + rng() * 0.3})`;
    g.fillRect(0, y, s, 2 + rng() * 3);
  }
  for (let i = 0; i < 300; i++) {
    g.fillStyle = `rgba(90,60,35,${rng() * 0.4})`;
    g.fillRect(rng() * s, rng() * s, 1 + rng() * 3, 1);
  }
});

export const stoneTex = () => canvasTex('stone', 128, (g, s) => {
  g.fillStyle = '#7a7570';
  g.fillRect(0, 0, s, s);
  const rng = makeRng(13);
  for (let i = 0; i < 500; i++) {
    const v = 100 + rng() * 40;
    g.fillStyle = `rgba(${v},${v - 4},${v - 8},${0.2 + rng() * 0.3})`;
    g.fillRect(rng() * s, rng() * s, 2 + rng() * 5, 2 + rng() * 4);
  }
  g.strokeStyle = 'rgba(50,46,44,0.5)';
  for (let y = 0; y < s; y += 16) { g.beginPath(); g.moveTo(0, y); g.lineTo(s, y); g.stroke(); }
});

// ---- shared materials -------------------------------------------------------
const M = {};
export function mats() {
  if (M.wood) return M;
  M.wood = new THREE.MeshStandardMaterial({ map: woodTex(), roughness: 0.9 });
  M.woodDark = new THREE.MeshStandardMaterial({ color: 0x4a3320, roughness: 0.95, flatShading: true });
  M.stone = new THREE.MeshStandardMaterial({ map: stoneTex(), roughness: 1 });
  M.clay = new THREE.MeshStandardMaterial({ color: 0xa5714c, roughness: 0.9, flatShading: true });
  M.iron = new THREE.MeshStandardMaterial({ color: 0x3b3f46, roughness: 0.5, metalness: 0.6 });
  M.cloth = new THREE.MeshStandardMaterial({ color: 0x8a4a4a, roughness: 1, flatShading: true });
  M.paper = new THREE.MeshStandardMaterial({ color: 0xd8cfb4, roughness: 1 });
  M.candle = new THREE.MeshStandardMaterial({ color: 0xe8dcc0, roughness: 0.8 });
  M.flame = new THREE.MeshBasicMaterial({ color: 0xffb75c, fog: false });
  M.crystal = new THREE.MeshStandardMaterial({ color: 0x9fd8ff, emissive: 0x3388cc, emissiveIntensity: 0.7, roughness: 0.2, flatShading: true });
  M.bone = new THREE.MeshStandardMaterial({ color: 0xd8d2c0, roughness: 0.9, flatShading: true });
  return M;
}

// ---- distance culling for world props ---------------------------------------
// Fog swallows everything past ~300m, but the GPU would still draw it.
// Anything registered here gets hidden beyond the fog wall.
export const cullables = [];
export function addCullable(g, x, z) { cullables.push({ g, x, z }); }
export function updateCulling(px, pz, maxDist = 330) {
  const m2 = maxDist * maxDist;
  for (let i = 0; i < cullables.length; i++) {
    const c = cullables[i];
    c.g.visible = (c.x - px) ** 2 + (c.z - pz) ** 2 < m2;
  }
}

// ---- glow points (campfires, candles) — rover light clients -----------------
export const glowPoints = [];
let glowCtx = 'world';
export function setGlowCtx(ctx) { glowCtx = ctx; }
export function addGlow(x, y, z, color, intensity, flicker = 0.3) {
  const gp = { x, y, z, color, intensity, flicker, on: true, ctx: glowCtx };
  glowPoints.push(gp);
  return gp;
}
export function updateGlows(t, px, pz) {
  const active = G.interior ? 'interior' : 'world';
  for (const gp of glowPoints) {
    if (!gp.on || gp.ctx !== active) continue;
    if (gp.breakableHost && !gp.breakableHost.visible) continue;
    const d2 = (gp.x - px) ** 2 + (gp.z - pz) ** 2;
    if (d2 > 40 * 40) continue;
    const f = 1 + Math.sin(t * 11 + gp.x * 7) * gp.flicker * 0.5 + Math.sin(t * 23 + gp.z * 3) * gp.flicker * 0.5;
    G.rovers?.request(gp.x, gp.y, gp.z, gp.color, gp.intensity * f, 12);
  }
}
export function clearGlows(ctx) {
  if (!ctx) { glowPoints.length = 0; return; }
  for (let i = glowPoints.length - 1; i >= 0; i--) if (glowPoints[i].ctx === ctx) glowPoints.splice(i, 1);
}

// ---- builders ---------------------------------------------------------------
const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
const cyl = (r0, r1, h, seg, mat) => new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, seg), mat);

export const BUILDERS = {
  crate(o = {}) {
    const m = mats();
    const s = o.size || 0.8;
    const g = new THREE.Group();
    const b = box(s, s, s, m.wood);
    b.position.y = s / 2;
    g.add(b);
    g.userData = { breakable: 'wood', collider: { kind: 'box', w: s, h: s, d: s } };
    return g;
  },
  pot(o = {}) {
    const m = mats();
    const g = new THREE.Group();
    const b = cyl(0.22, 0.3, 0.55, 8, m.clay);
    b.position.y = 0.28;
    const rim = cyl(0.26, 0.22, 0.12, 8, m.clay);
    rim.position.y = 0.58;
    g.add(b, rim);
    g.userData = { breakable: 'pot', collider: { kind: 'circle', r: 0.3, h: 0.7 } };
    return g;
  },
  barrel() {
    const m = mats();
    const g = new THREE.Group();
    const b = cyl(0.34, 0.34, 0.9, 9, m.wood);
    b.position.y = 0.45;
    const ring = cyl(0.36, 0.36, 0.06, 9, m.iron);
    ring.position.y = 0.6;
    const ring2 = ring.clone(); ring2.position.y = 0.25;
    g.add(b, ring, ring2);
    g.userData = { breakable: 'wood', collider: { kind: 'circle', r: 0.36, h: 0.95 } };
    return g;
  },
  crystal(o = {}) {
    const m = mats();
    const g = new THREE.Group();
    const c1 = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.9, 5), o.mat || m.crystal);
    c1.position.y = 0.45;
    const c2 = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.55, 5), o.mat || m.crystal);
    c2.position.set(0.2, 0.26, 0.1); c2.rotation.z = -0.4;
    g.add(c1, c2);
    g.userData = { breakable: 'crystal', collider: { kind: 'circle', r: 0.26, h: 0.9 }, glow: [0.6, 0.9, 1.0] };
    return g;
  },
  lanternPost(o = {}) {
    const m = mats();
    const g = new THREE.Group();
    const post = cyl(0.06, 0.08, 2.6, 6, m.woodDark);
    post.position.y = 1.3;
    const cage = box(0.3, 0.34, 0.3, m.iron);
    cage.position.y = 2.45;
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), m.flame);
    core.position.y = 2.45;
    g.add(post, cage, core);
    g.userData = { breakable: 'lantern', collider: { kind: 'circle', r: 0.1, h: 2.6 }, glowAt: [0, 2.45, 0], glowColor: o.color || [1, 0.72, 0.36] };
    return g;
  },
  table() {
    const m = mats();
    const g = new THREE.Group();
    const top = box(1.6, 0.09, 0.9, m.wood);
    top.position.y = 0.78;
    g.add(top);
    for (const [x, z] of [[-0.7, -0.35], [0.7, -0.35], [-0.7, 0.35], [0.7, 0.35]]) {
      const leg = box(0.09, 0.78, 0.09, m.woodDark);
      leg.position.set(x, 0.39, z);
      g.add(leg);
    }
    g.userData = { collider: { kind: 'box', w: 1.6, h: 0.83, d: 0.9, standable: true } };
    return g;
  },
  chair() {
    const m = mats();
    const g = new THREE.Group();
    const seat = box(0.45, 0.06, 0.45, m.wood);
    seat.position.y = 0.45;
    const back = box(0.45, 0.55, 0.06, m.wood);
    back.position.set(0, 0.75, -0.2);
    g.add(seat, back);
    for (const [x, z] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) {
      const leg = box(0.05, 0.45, 0.05, m.woodDark);
      leg.position.set(x, 0.22, z);
      g.add(leg);
    }
    g.userData = { collider: { kind: 'circle', r: 0.3, h: 1.0 } };
    return g;
  },
  shelf() {
    const m = mats();
    const g = new THREE.Group();
    const body = box(1.2, 2.0, 0.35, m.woodDark);
    body.position.y = 1.0;
    g.add(body);
    const rng = makeRng(101);
    for (let s = 0; s < 3; s++) {
      for (let i = 0; i < 4; i++) {
        if (rng() < 0.3) continue;
        const bk = box(0.1, 0.3 + rng() * 0.12, 0.22, [mats().cloth, mats().paper, mats().clay][s % 3]);
        bk.position.set(-0.4 + i * 0.26, 0.55 + s * 0.55, 0.05);
        g.add(bk);
      }
    }
    g.userData = { collider: { kind: 'box', w: 1.2, h: 2.0, d: 0.35 } };
    return g;
  },
  bed() {
    const m = mats();
    const g = new THREE.Group();
    const frame = box(1.1, 0.3, 2.1, m.woodDark);
    frame.position.y = 0.2;
    const mattress = box(1.0, 0.18, 2.0, m.cloth);
    mattress.position.y = 0.42;
    const pillow = box(0.7, 0.12, 0.4, m.paper);
    pillow.position.set(0, 0.55, -0.7);
    g.add(frame, mattress, pillow);
    g.userData = { collider: { kind: 'box', w: 1.1, h: 0.55, d: 2.1, standable: true } };
    return g;
  },
  bench() {
    const m = mats();
    const g = new THREE.Group();
    const seat = box(1.5, 0.08, 0.42, m.wood);
    seat.position.y = 0.45;
    g.add(seat);
    for (const x of [-0.6, 0.6]) {
      const leg = box(0.1, 0.45, 0.4, m.woodDark);
      leg.position.set(x, 0.22, 0);
      g.add(leg);
    }
    g.userData = { collider: { kind: 'box', w: 1.5, h: 0.5, d: 0.42, standable: true } };
    return g;
  },
  candle(o = {}) {
    const m = mats();
    const g = new THREE.Group();
    const c = cyl(0.05, 0.06, 0.22, 6, m.candle);
    c.position.y = 0.11;
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 5), m.flame);
    f.position.y = 0.27;
    g.add(c, f);
    g.userData = { glowAt: [0, 0.3, 0], glowColor: [1, 0.7, 0.35], glowIntensity: 0.7 };
    return g;
  },
  campfire() {
    const m = mats();
    const g = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const log = box(0.7, 0.1, 0.1, m.woodDark);
      log.position.y = 0.08;
      log.rotation.y = (i / 5) * Math.PI;
      g.add(log);
    }
    const stone = cyl(0.5, 0.6, 0.12, 8, mats().stone);
    stone.position.y = 0.03;
    const ember = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), m.flame);
    ember.position.y = 0.2;
    g.add(stone, ember);
    g.userData = { glowAt: [0, 0.5, 0], glowColor: [1, 0.55, 0.2], glowIntensity: 1.6, emit: 'ember' };
    return g;
  },
  pedestal() {
    const m = mats();
    const g = new THREE.Group();
    const base = cyl(0.5, 0.62, 0.25, 8, m.stone);
    base.position.y = 0.12;
    const col = cyl(0.3, 0.36, 0.85, 8, m.stone);
    col.position.y = 0.65;
    const top = cyl(0.42, 0.32, 0.14, 8, m.stone);
    top.position.y = 1.12;
    g.add(base, col, top);
    g.userData = { collider: { kind: 'circle', r: 0.45, h: 1.2 } };
    return g;
  },
  banner(o = {}) {
    const m = mats();
    const g = new THREE.Group();
    const cloth = box(0.85, 1.7, 0.03, new THREE.MeshStandardMaterial({ color: o.color || 0x6a3a4a, roughness: 1 }));
    cloth.position.y = -0.85;
    const rod = box(1.05, 0.05, 0.05, mats().woodDark);
    g.add(cloth, rod);
    return g;
  },
  skeleton(o = {}) {
    // a quiet story: someone ended here, posed by the caller
    const m = mats();
    const g = new THREE.Group();
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.14, 7, 6), m.bone);
    skull.position.set(0, 0.14, 0.4);
    const rib = box(0.34, 0.2, 0.5, m.bone);
    rib.position.set(0, 0.1, 0);
    const armL = box(0.07, 0.05, 0.5, m.bone);
    armL.position.set(-0.24, 0.05, 0.15);
    const armR = armL.clone(); armR.position.x = 0.24;
    const legs = box(0.28, 0.06, 0.6, m.bone);
    legs.position.set(0, 0.04, -0.5);
    g.add(skull, rib, armL, armR, legs);
    return g;
  },
  cart() {
    const m = mats();
    const g = new THREE.Group();
    const bedM = box(1.4, 0.14, 2.2, m.wood);
    bedM.position.y = 0.6;
    const sideL = box(0.08, 0.4, 2.2, m.wood);
    sideL.position.set(-0.7, 0.85, 0);
    const sideR = sideL.clone(); sideR.position.x = 0.7;
    g.add(bedM, sideL, sideR);
    for (const [x, z] of [[-0.75, 0.7], [0.75, 0.7], [-0.75, -0.7], [0.75, -0.7]]) {
      const wheel = cyl(0.35, 0.35, 0.08, 9, m.woodDark);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, 0.35, z);
      g.add(wheel);
    }
    g.userData = { collider: { kind: 'box', w: 1.6, h: 1.1, d: 2.3 } };
    return g;
  },
};

// Place a prop: build, position, rotate, add colliders + breakable + glow.
export function place(scene, collide, name, x, y, z, rot = 0, opts = {}) {
  const g = BUILDERS[name](opts);
  g.position.set(x, y, z);
  g.rotation.y = rot;
  g.traverse((o) => { if (o.isMesh) { o.castShadow = opts.shadow !== false; } });
  scene.add(g);
  if ((opts.ctx || 'world') === 'world') addCullable(g, x, z);
  const ud = g.userData;
  let collItem = null;
  if (ud.collider && collide) {
    const c = ud.collider;
    if (c.kind === 'circle') collItem = collide.addCircle(x, z, c.r, y, y + c.h);
    else {
      // rotated boxes use their bounding square — fine for furniture
      const hw = (Math.abs(Math.cos(rot)) * c.w + Math.abs(Math.sin(rot)) * c.d) / 2;
      const hd = (Math.abs(Math.cos(rot)) * c.d + Math.abs(Math.sin(rot)) * c.w) / 2;
      collItem = collide.addBox(x - hw, z - hd, x + hw, z + hd, y, y + c.h, { standable: c.standable });
    }
  }
  if (ud.breakable && G.breakables) {
    G.breakables.register(g, collItem, ud.breakable, {
      x, y: y + 0.3, z, ctx: opts.ctx || 'world', color: ud.glow, moteChance: opts.moteChance,
    });
  }
  if (ud.glowAt) {
    const gp = addGlow(x + ud.glowAt[0], y + ud.glowAt[1], z + ud.glowAt[2], ud.glowColor, ud.glowIntensity ?? 1.2);
    if (ud.breakable) gp.breakableHost = g; // lantern glow dies with the lantern
  }
  return g;
}
