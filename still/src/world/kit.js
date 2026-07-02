// The house-building kit. Rooms with double-sided shells, doors that creak
// and lock, furniture that was loved once, practical lights that flicker,
// and the small horrors: the crib, the small ones, the writing.
// Light discipline: ONE flashlight spot + SIX practical points + one dim
// hemi, created once, repositioned per floor. Light count never changes.

import * as THREE from 'three';
import { G } from '../game/state.js';
import { wallpaper, floorboards, moldStone, concrete, nurseryPaper, scratchTex, drawingTex } from './textures.js';
import { sfx3d } from '../core/audio.js';

const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
const cyl = (r0, r1, h, seg, mat) => new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, seg), mat);

// ---- materials (cached, double-sided where they form shells) -----------------
const M = {};
export function mats() {
  if (M.wallpaper) return M;
  const ds = { side: THREE.DoubleSide };
  M.wallpaper = new THREE.MeshStandardMaterial({ map: wallpaper(), roughness: 1, ...ds });
  M.nursery = new THREE.MeshStandardMaterial({ map: nurseryPaper(), roughness: 1, ...ds });
  M.floor = new THREE.MeshStandardMaterial({ map: floorboards(), roughness: 0.92, ...ds });
  M.stone = new THREE.MeshStandardMaterial({ map: moldStone(), roughness: 1, ...ds });
  M.concrete = new THREE.MeshStandardMaterial({ map: concrete(), roughness: 1, ...ds });
  M.woodDark = new THREE.MeshStandardMaterial({ color: 0x241a12, roughness: 0.95, flatShading: true });
  M.wood = new THREE.MeshStandardMaterial({ color: 0x4a3826, roughness: 0.9, flatShading: true });
  M.iron = new THREE.MeshStandardMaterial({ color: 0x26262a, roughness: 0.55, metalness: 0.6 });
  M.cloth = new THREE.MeshStandardMaterial({ color: 0x4a3a3a, roughness: 1, flatShading: true });
  M.clothPale = new THREE.MeshStandardMaterial({ color: 0x6a6156, roughness: 1, flatShading: true });
  M.porcelain = new THREE.MeshStandardMaterial({ color: 0x8a8178, roughness: 0.4, flatShading: true });
  M.water = new THREE.MeshStandardMaterial({ color: 0x03070a, roughness: 0.08, metalness: 0.4 });
  M.bulb = new THREE.MeshBasicMaterial({ color: 0xffd9a0, fog: false });
  M.bulbDead = new THREE.MeshStandardMaterial({ color: 0x2c2c2c, roughness: 0.3 });
  return M;
}

// ---- the light rig -------------------------------------------------------------
export class LightRig {
  constructor(camera) {
    this.hemi = new THREE.HemisphereLight(0x232630, 0x0d0c0a, 0.22);

    // flashlight: spot with slight lag, warm-cold beam. Wider + longer than the
    // first cut — the beam is the player's eyes, and a pencil cone made rooms
    // unreadable. The dark stays dark; what you aim at, you now actually see.
    this.flash = new THREE.SpotLight(0xf4e6c8, 0, 32, 0.56, 0.6, 1.4);
    this.flash.castShadow = true;
    this.flash.shadow.mapSize.set(512, 512);
    this.flash.shadow.bias = -0.004;
    this.flashTarget = new THREE.Object3D();
    this.flash.target = this.flashTarget;
    this.flashOn = false;
    this.flashDir = new THREE.Vector3(0, 0, -1);

    this.points = [];
    for (let i = 0; i < 6; i++) {
      const p = new THREE.PointLight(0xffc888, 0, 12, 1.6);
      this.points.push(p);
    }
    this.practicals = [];   // { idx, x, y, z, color, intensity, flicker, on }
  }

  addTo(scene) {
    scene.add(this.hemi, this.flash, this.flashTarget);
    for (const p of this.points) scene.add(p);
  }
  moveTo(scene) {
    this.hemi.removeFromParent(); this.flash.removeFromParent(); this.flashTarget.removeFromParent();
    for (const p of this.points) { p.removeFromParent(); p.intensity = 0; }
    this.practicals = [];
    this.addTo(scene);
  }

  // claim one of the 6 practicals for this floor
  practical(x, y, z, color = [1, 0.72, 0.45], intensity = 2.2, flicker = 0.12) {
    const idx = this.practicals.length;
    if (idx >= this.points.length) return null;
    const pr = { idx, x, y, z, color, intensity, flicker, on: true };
    this.practicals.push(pr);
    const p = this.points[idx];
    p.position.set(x, y, z);
    p.color.setRGB(...color);
    return pr;
  }

  update(dt, t, camera, aimDir) {
    // flashlight follows the camera with lag [ported: marrow lamp lag]
    this.flashDir.lerp(aimDir, Math.min(1, dt * 11));
    this.flash.position.copy(camera.position);
    this.flash.position.y -= 0.14;
    this.flashTarget.position.copy(camera.position).addScaledVector(this.flashDir, 8);
    const targetI = this.flashOn ? 200 : 0;
    this.flash.intensity += (targetI - this.flash.intensity) * Math.min(1, dt * 16);

    for (const pr of this.practicals) {
      const p = this.points[pr.idx];
      if (!pr.on) { p.intensity = 0; continue; }
      const f = 1 + Math.sin(t * 13 + pr.idx * 9) * pr.flicker * 0.5
              + Math.sin(t * 41 + pr.idx * 3) * pr.flicker * 0.5
              + (Math.random() < 0.008 ? -0.7 : 0);
      p.intensity = pr.intensity * Math.max(0.05, f) * 26;   // physical units: a real bulb
    }
  }
}

// ---- room / structure -----------------------------------------------------------
// Rooms register their walls into the collide field; shells are double-sided.
export function room(scene, collide, cx, cz, w, d, h, opts = {}) {
  const m = mats();
  const wallMat = opts.wall || m.wallpaper;
  const floorMat = opts.floor || m.floor;
  const ceilMat = opts.ceil || wallMat;

  const floor = box(w, 0.3, d, floorMat);
  floor.position.set(cx, -0.15, cz);
  floor.receiveShadow = true;
  scene.add(floor);

  if (opts.ceiling !== false) {
    const ceil = box(w, 0.3, d, ceilMat);
    ceil.position.set(cx, h + 0.15, cz);
    scene.add(ceil);
    collide.addBox(cx - w / 2, cz - d / 2, cx + w / 2, cz + d / 2, h, h + 0.3);
  }

  // walls with optional doorway gaps: opts.doors = [{side:'n'|'s'|'e'|'w', at: offset, w: width}]
  const doors = opts.doors || [];
  const sides = [
    { side: 'n', x: cx, z: cz - d / 2, len: w, horiz: true },
    { side: 's', x: cx, z: cz + d / 2, len: w, horiz: true },
    { side: 'w', x: cx - w / 2, z: cz, len: d, horiz: false },
    { side: 'e', x: cx + w / 2, z: cz, len: d, horiz: false },
  ];
  for (const s of sides) {
    const gaps = doors.filter((dd) => dd.side === s.side).sort((a, b) => (a.at || 0) - (b.at || 0));
    let cursor = -s.len / 2;
    const segs = [];
    for (const gp of gaps) {
      const gw = gp.w || 1.3;
      const at = gp.at || 0;
      segs.push([cursor, at - gw / 2]);
      // lintel above the gap
      segs.push([at - gw / 2, at + gw / 2, 2.15]);
      cursor = at + gw / 2;
    }
    segs.push([cursor, s.len / 2]);
    for (const [a, b, fromY] of segs) {
      const len = b - a;
      if (len <= 0.01) continue;
      const y0 = fromY || 0;
      const wallH = h - y0;
      const mid = (a + b) / 2;
      const wall = box(s.horiz ? len : 0.28, wallH, s.horiz ? 0.28 : len, wallMat);
      wall.position.set(s.horiz ? s.x + mid : s.x, y0 + wallH / 2, s.horiz ? s.z : s.z + mid);
      wall.receiveShadow = true;
      wall.castShadow = true;
      scene.add(wall);
      if (!fromY) {
        collide.addBox(
          (s.horiz ? s.x + a : s.x - 0.14), (s.horiz ? s.z - 0.14 : s.z + a),
          (s.horiz ? s.x + b : s.x + 0.14), (s.horiz ? s.z + 0.14 : s.z + b),
          0, h
        );
      }
    }
  }
}

// A door you can open. Closed = collider on. interact() opens with a creak.
export function door(scene, collide, x, z, rot, opts = {}) {
  const m = mats();
  const g = new THREE.Group();
  const leaf = box(1.2, 2.1, 0.09, m.woodDark);
  leaf.position.set(0.6, 1.05, 0);      // hinge at group origin
  leaf.castShadow = true;
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), m.iron);
  knob.position.set(1.05, 1.0, 0.08);
  g.add(leaf, knob);
  g.position.set(x, 0, z);
  g.rotation.y = rot;
  scene.add(g);

  const c = Math.cos(rot), s = Math.sin(rot);
  const x1 = x + c * 1.2, z1 = z - s * 1.2;
  const item = collide.addBox(Math.min(x, x1) - 0.1, Math.min(z, z1) - 0.1, Math.max(x, x1) + 0.1, Math.max(z, z1) + 0.1, 0, 2.15);

  const st = {
    group: g, item, open: false, locked: !!opts.locked, openT: 0,
    x: x + c * 0.6, z: z - s * 0.6,
    interact() {
      if (st.locked) { sfx3d('doorLocked', st.x, st.z, { gain: 1 }); G.fear?.spike(0.08); return false; }
      if (st.open) return true;
      st.open = true;
      item.dead = true;
      sfx3d('doorCreak', st.x, st.z, { gain: 1.1 });
      return true;
    },
    update(dt) {
      const target = st.open ? -1.9 : 0;
      st.openT += (target - st.openT) * Math.min(1, dt * 2.2);
      g.rotation.y = rot + st.openT;
    },
  };
  return st;
}

// ---- furniture & horrors ----------------------------------------------------------
export const PROPS = {
  table(m) {
    const g = new THREE.Group();
    const top = box(1.5, 0.08, 0.9, m.wood); top.position.y = 0.76;
    g.add(top);
    for (const [x, z] of [[-0.65, -0.35], [0.65, -0.35], [-0.65, 0.35], [0.65, 0.35]]) {
      const leg = box(0.08, 0.76, 0.08, m.woodDark); leg.position.set(x, 0.38, z); g.add(leg);
    }
    g.userData.collider = { kind: 'box', w: 1.5, h: 0.82, d: 0.9 };
    return g;
  },
  chair(m) {
    const g = new THREE.Group();
    const seat = box(0.44, 0.05, 0.44, m.wood); seat.position.y = 0.45;
    const back = box(0.44, 0.55, 0.05, m.wood); back.position.set(0, 0.74, -0.2);
    g.add(seat, back);
    for (const [x, z] of [[-0.17, -0.17], [0.17, -0.17], [-0.17, 0.17], [0.17, 0.17]]) {
      const leg = box(0.05, 0.45, 0.05, m.woodDark); leg.position.set(x, 0.22, z); g.add(leg);
    }
    g.userData.collider = { kind: 'circle', r: 0.3, h: 1.0 };
    return g;
  },
  bed(m) {
    const g = new THREE.Group();
    const frame = box(1.1, 0.28, 2.05, m.woodDark); frame.position.y = 0.2;
    const mattress = box(1.0, 0.16, 1.95, m.clothPale); mattress.position.y = 0.4;
    const head = box(1.1, 0.8, 0.07, m.woodDark); head.position.set(0, 0.6, -1.0);
    g.add(frame, mattress, head);
    g.userData.collider = { kind: 'box', w: 1.1, h: 0.6, d: 2.05 };
    return g;
  },
  wardrobe(m) {
    const g = new THREE.Group();
    const body = box(1.2, 2.1, 0.6, m.woodDark); body.position.y = 1.05;
    const seam = box(0.02, 1.9, 0.62, m.iron); seam.position.set(0, 1.0, 0);
    g.add(body, seam);
    g.userData.collider = { kind: 'box', w: 1.2, h: 2.1, d: 0.6 };
    return g;
  },
  dresser(m) {
    const g = new THREE.Group();
    const body = box(1.3, 0.9, 0.5, m.wood); body.position.y = 0.45;
    for (let i = 0; i < 3; i++) {
      const k = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 5), m.iron);
      k.position.set(0, 0.2 + i * 0.26, 0.26);
      g.add(k);
    }
    g.userData.collider = { kind: 'box', w: 1.3, h: 0.9, d: 0.5 };
    return g;
  },
  shelf(m) {
    const g = new THREE.Group();
    const body = box(1.1, 1.9, 0.32, m.woodDark); body.position.y = 0.95;
    for (let s = 0; s < 3; s++) for (let i = 0; i < 3; i++) {
      if ((s * 3 + i) % 2 === 0) continue;
      const bk = box(0.09, 0.26, 0.2, s % 2 ? m.cloth : m.wood);
      bk.position.set(-0.35 + i * 0.3, 0.5 + s * 0.5, 0.03);
      bk.rotation.z = (i % 2) * 0.12;
      g.add(bk);
    }
    g.userData.collider = { kind: 'box', w: 1.1, h: 1.9, d: 0.32 };
    return g;
  },
  radio(m) {
    const g = new THREE.Group();
    const body = box(0.5, 0.3, 0.2, m.woodDark); body.position.y = 0.15;
    const grille = box(0.28, 0.18, 0.02, m.cloth); grille.position.set(-0.06, 0.15, 0.1);
    const dial = new THREE.Mesh(new THREE.CircleGeometry(0.05, 10), m.porcelain);
    dial.position.set(0.16, 0.15, 0.11);
    g.add(body, grille, dial);
    return g;
  },
  crib(m) {
    const g = new THREE.Group();
    const base = box(0.9, 0.1, 1.3, m.woodDark); base.position.y = 0.4;
    for (const z of [-0.62, 0.62]) {
      for (let i = 0; i < 6; i++) {
        const bar = box(0.04, 0.7, 0.04, m.woodDark);
        bar.position.set(-0.4 + i * 0.16, 0.7, z);
        g.add(bar);
      }
      const rail = box(0.9, 0.05, 0.05, m.woodDark); rail.position.set(0, 1.05, z); g.add(rail);
    }
    const blanket = box(0.7, 0.08, 0.9, m.clothPale); blanket.position.set(0, 0.48, 0.1);
    g.add(blanket);
    g.userData.collider = { kind: 'box', w: 0.95, h: 1.1, d: 1.35 };
    return g;
  },
  // the small ones. porcelain-pale, child-sized, faces smoothed away.
  smallOne(m) {
    const g = new THREE.Group();
    const body = cyl(0.14, 0.2, 0.62, 7, m.porcelain); body.position.y = 0.31;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 9, 7), m.porcelain);
    head.position.y = 0.74;
    head.scale.y = 1.15;
    const armL = box(0.05, 0.34, 0.05, m.porcelain); armL.position.set(-0.2, 0.42, 0);
    const armR = armL.clone(); armR.position.x = 0.2;
    g.add(body, head, armL, armR);
    g.userData.collider = { kind: 'circle', r: 0.22, h: 0.9 };
    return g;
  },
  fusebox(m) {
    const g = new THREE.Group();
    const body = box(0.5, 0.7, 0.14, m.iron); body.position.y = 1.4;
    const lever = box(0.06, 0.22, 0.06, m.porcelain); lever.position.set(0.14, 1.3, 0.1);
    g.add(body, lever);
    g.userData.lever = lever;
    return g;
  },
  crank(m) {
    const g = new THREE.Group();
    const mount = box(0.3, 0.3, 0.2, m.iron); mount.position.y = 1.1;
    const arm = box(0.05, 0.34, 0.05, m.iron); arm.position.set(0, 1.25, 0.14);
    const handle = box(0.14, 0.06, 0.06, m.wood); handle.position.set(0, 1.42, 0.14);
    const spin = new THREE.Group();
    spin.add(arm, handle);
    spin.position.set(0, 1.1, 0);
    arm.position.set(0, 0.15, 0.14); handle.position.set(0, 0.32, 0.14);
    g.add(mount, spin);
    g.userData.spin = spin;
    return g;
  },
  frame(m) {
    const g = new THREE.Group();
    const f = box(0.4, 0.5, 0.03, m.woodDark);
    const ph = box(0.32, 0.42, 0.01, m.clothPale);
    ph.position.z = 0.013;
    g.add(f, ph);
    return g;
  },
  candleStub(m) {
    const g = new THREE.Group();
    const c = cyl(0.035, 0.045, 0.12, 6, m.porcelain); c.position.y = 0.06;
    g.add(c);
    return g;
  },
  bulb(m, dead = false) {
    const g = new THREE.Group();
    const wire = cyl(0.008, 0.008, 0.5, 4, m.iron); wire.position.y = -0.25;
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), dead ? m.bulbDead : m.bulb);
    b.position.y = -0.53;
    g.add(wire, b);
    return g;
  },
};

export function place(scene, collide, name, x, z, rot = 0, opts = {}) {
  const m = mats();
  const g = PROPS[name](m, opts.dead);
  g.position.set(x, opts.y ?? 0, z);
  g.rotation.y = rot;
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  scene.add(g);
  const c = g.userData.collider;
  if (c && collide && opts.collide !== false) {
    if (c.kind === 'circle') collide.addCircle(x, z, c.r, 0, c.h);
    else {
      const hw = (Math.abs(Math.cos(rot)) * c.w + Math.abs(Math.sin(rot)) * c.d) / 2;
      const hd = (Math.abs(Math.cos(rot)) * c.d + Math.abs(Math.sin(rot)) * c.w) / 2;
      collide.addBox(x - hw, z - hd, x + hw, z + hd, 0, c.h);
    }
  }
  return g;
}

// Writing on a wall. The only words the house will give you.
export function writing(scene, text, x, y, z, ry, sub = '', w = 2.2) {
  const t = scratchTex(text, sub);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, w / 2),
    new THREE.MeshStandardMaterial({ map: t, transparent: true, roughness: 1, side: THREE.DoubleSide })
  );
  mesh.position.set(x, y, z);
  mesh.rotation.y = ry;
  scene.add(mesh);
  return mesh;
}

export function childDrawing(scene, kind, x, y, z, ry) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.5),
    new THREE.MeshStandardMaterial({ map: drawingTex(kind), roughness: 1 })
  );
  mesh.position.set(x, y, z);
  mesh.rotation.y = ry;
  mesh.rotation.z = (x * 7 % 1) * 0.14 - 0.07;
  scene.add(mesh);
  return mesh;
}
