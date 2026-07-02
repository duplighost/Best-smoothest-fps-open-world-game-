import * as THREE from 'three';
import { ColliderField } from '../collision.js';
import { Quality, CFG } from '../config.js';
import { groundTexture, barkTexture, leafTexture, softDot } from '../textures.js';
import { makeKey, makeShrine, makeGravestone, makeFlame } from './props.js';

// The opening: a black, fog-drowned wood of gnarled dead trees and drifts of
// crunching leaves. A faint trail of will-o'-wisps draws you to a shrine that
// holds the iron key. Beyond the trees, a vast house waits with lit windows.

function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

// concatenate several indexed geometries (already transformed) into one — used
// to bake a branchy dead-tree into a single geometry we can instance.
function mergeGeos(geos) {
  let vc = 0, ic = 0;
  for (const g of geos) { vc += g.attributes.position.count; ic += g.index ? g.index.count : g.attributes.position.count; }
  const pos = new Float32Array(vc * 3), nor = new Float32Array(vc * 3), uv = new Float32Array(vc * 2), idx = new Uint32Array(ic);
  let vo = 0, io = 0, base = 0;
  for (const g of geos) {
    const pa = g.attributes.position, na = g.attributes.normal, ua = g.attributes.uv;
    pos.set(pa.array, vo * 3);
    if (na) nor.set(na.array, vo * 3);
    if (ua) uv.set(ua.array, vo * 2);
    if (g.index) { const gi = g.index.array; for (let k = 0; k < gi.length; k++) idx[io + k] = gi[k] + base; io += gi.length; }
    else { for (let k = 0; k < pa.count; k++) idx[io + k] = base + k; io += pa.count; }
    vo += pa.count; base += pa.count;
  }
  const m = new THREE.BufferGeometry();
  m.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  m.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  m.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  m.setIndex(new THREE.BufferAttribute(idx, 1));
  return m;
}
function lumpTrunk(geo, seed) {
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const bend = Math.sin(y * 0.25 + seed) * 0.12 * (y / 9);    // leans more toward the top
    const k = 1 + Math.sin(x * 8 + y * 2.5 + seed) * 0.06;      // lumpy bark relief
    p.setXYZ(i, x * k + bend, y, z * k);
  }
  geo.computeVertexNormals(); return geo;
}
// one gnarled dead tree: a lumpy trunk with a handful of bare clawing branches
function makeTreeGeo(r) {
  const parts = [];
  const trunk = lumpTrunk(new THREE.CylinderGeometry(0.13, 0.34, 9, 8, 5), r() * 10);
  trunk.translate(0, 4.5, 0); parts.push(trunk);
  const nb = 4 + (r() * 4 | 0);
  for (let i = 0; i < nb; i++) {
    const len = 1.0 + r() * 2.2;
    const b = new THREE.CylinderGeometry(0.012, 0.055, len, 5);
    b.translate(0, len / 2, 0);
    b.rotateZ((r() < 0.5 ? 1 : -1) * (0.5 + r() * 0.85));
    b.rotateY(r() * Math.PI * 2);
    b.translate(0, 3.8 + r() * 4.6, 0);
    parts.push(b);
  }
  return mergeGeos(parts);
}

export function buildForest(ctx) {
  const group = new THREE.Group();
  const field = new ColliderField(4);
  const rand = rng(20240607);
  const flames = [];
  const wisps = [];
  const windowMats = [];

  // --- ground ---
  const gtex = groundTexture();
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(320, 320, 1, 1),
    new THREE.MeshStandardMaterial({ map: gtex, bumpMap: gtex, bumpScale: 0.08, roughness: 0.62, metalness: 0.18 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; group.add(ground);

  // faint cold moon so silhouettes read beyond the torch
  const moon = new THREE.DirectionalLight(0x4a5a82, 0.9);
  moon.position.set(-30, 40, -20); group.add(moon);
  const moonSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: softDot('#33405e'), transparent: true, opacity: 0.5, depthWrite: false }));
  moonSprite.scale.set(14, 14, 1); moonSprite.position.set(-40, 38, -60); group.add(moonSprite);

  // --- bounds of the playable wood (rectangle, hidden by fog) ---
  const X0 = -62, X1 = 62, Z0 = -74, Z1 = 20;
  const mansion = { x: 0, zFront: -44, zBack: -62, halfW: 11 };
  const shrine = { x: 16, z: -18 };

  // every landmark clears its own pocket of trees, so no set piece ends up
  // buried in trunks — and every walkable pocket HAS a landmark. Nowhere in the
  // wood is a dark nothing.
  const CLEARINGS = [
    [0, 8, 5],                    // spawn campsite
    [shrine.x, shrine.z, 5],      // the shrine
    [-24, -30, 4.5],              // the old well
    [30, -40, 6],                 // the fallen giant
    [-32, 0, 4.5],                // the abandoned cart
    [40, -12, 4],                 // the hunter's blind
    [18, 6, 3.5],                 // the woodcutter's stump
    [-45, -52, 6],                // the standing stones
  ];
  function blocked(x, z) {
    // mansion footprint + its walled rear garden
    if (x > mansion.x - mansion.halfW - 2 && x < mansion.x + mansion.halfW + 2 && z < mansion.zFront + 1 && z > mansion.zBack - 3) return true;
    if (x > -10 && x < 10 && z < mansion.zBack - 1 && z > Z0 + 2) return true;   // rear garden
    for (const [cx, cz, cr] of CLEARINGS) if (Math.hypot(x - cx, z - cz) < cr) return true;
    // a loose corridor toward the door so the way is never fully walled
    if (Math.abs(x) < 2.2 && z < 8 && z > mansion.zFront) return true;
    return false;
  }

  // --- trees: a few gnarled dead-tree variants, each instanced ---
  const barkTex = barkTexture();
  const trunkMat = new THREE.MeshStandardMaterial({ map: barkTex, bumpMap: barkTex, bumpScale: 0.105, roughness: 0.92 });
  const maxTrees = Quality.maxInstancedTrees;
  const VARIANTS = 4;
  const variants = [];
  for (let v = 0; v < VARIANTS; v++) variants.push({ geo: makeTreeGeo(rng(1009 + v * 31)), mats: [] });
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), sc = new THREE.Vector3(), pp = new THREE.Vector3();
  let n = 0;
  function placeTree(x, z, scale, lean) {
    if (n >= maxTrees) return;
    const v = variants[(rand() * VARIANTS) | 0];
    e.set((rand() - 0.5) * lean, rand() * Math.PI * 2, (rand() - 0.5) * lean);
    q.setFromEuler(e); sc.set(scale, scale * (0.85 + rand() * 0.5), scale); pp.set(x, 0, z);
    m4.compose(pp, q, sc); v.mats.push(m4.clone());
    field.addCircle(x, z, 0.42 * scale, 1); n++;
  }
  let attempts = 0;
  while (n < maxTrees * 0.86 && attempts < maxTrees * 6) {
    attempts++;
    const x = X0 + rand() * (X1 - X0), z = Z0 + rand() * (Z1 - Z0);
    if (blocked(x, z)) continue;
    placeTree(x, z, 0.7 + rand() * 0.8, 0.16);
  }
  // dense boundary wall of trees (the world has no edge you can reach)
  for (let i = 0; i < 240 && n < maxTrees; i++) {
    const ang = (i / 240) * Math.PI * 2;
    const rx = (X1 - X0) * 0.5 + 4, rz = (Z1 - Z0) * 0.5 + 4;
    const cx = (X0 + X1) / 2, cz = (Z0 + Z1) / 2;
    placeTree(cx + Math.cos(ang) * rx + (rand() - 0.5) * 3, cz + Math.sin(ang) * rz + (rand() - 0.5) * 3, 1.0 + rand() * 0.6, 0.07);
  }
  for (const v of variants) {
    if (!v.mats.length) continue;
    const im = new THREE.InstancedMesh(v.geo, trunkMat, v.mats.length);
    im.castShadow = true; im.receiveShadow = true;
    v.mats.forEach((mm, i) => im.setMatrixAt(i, mm));
    im.instanceMatrix.needsUpdate = true; group.add(im);
  }
  // hard boundary so you truly cannot leave
  field.addBox(X0 - 3, Z0 - 3, X1 + 3, Z0 - 1, 9);
  field.addBox(X0 - 3, Z1 + 1, X1 + 3, Z1 + 3, 9);
  field.addBox(X0 - 3, Z0 - 3, X0 - 1, Z1 + 3, 9);
  field.addBox(X1 + 1, Z0 - 3, X1 + 3, Z1 + 3, 9);

  // a few leaning gravestones near the shrine
  for (let i = 0; i < 7; i++) {
    const gx = shrine.x + (rand() - 0.5) * 8, gz = shrine.z + (rand() - 0.5) * 8;
    if (Math.hypot(gx - shrine.x, gz - shrine.z) < 1.5) continue;
    const gs = makeGravestone(); gs.position.set(gx, 0, gz); gs.rotation.y = rand() * Math.PI; group.add(gs);
    field.addCircle(gx, gz, 0.4);
  }

  // --- drifts of dead leaves you wade through ---
  const leafTex = leafTexture();
  const leafMat = new THREE.MeshStandardMaterial({ map: leafTex, bumpMap: leafTex, bumpScale: 0.05, roughness: 0.95 });
  function leafPile(x, z, s) {
    const geo = new THREE.IcosahedronGeometry(1, 2);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const vx = p.getX(i), vy = p.getY(i), vz = p.getZ(i);
      const k = 1 + Math.sin(vx * 5 + vz * 4) * 0.22;
      p.setXYZ(i, vx * k, Math.max(0, vy) * 0.34 * k, vz * k);   // flattened, lumpy mound
    }
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, leafMat);
    m.scale.setScalar(s); m.position.set(x, 0, z); m.rotation.y = rand() * Math.PI;
    m.castShadow = true; m.receiveShadow = true; group.add(m);
  }
  const bigPiles = [];
  for (let i = 0; i < 48; i++) {
    const x = X0 + rand() * (X1 - X0), z = Z0 + rand() * (Z1 - Z0);
    if (blocked(x, z)) continue;
    const s = 0.5 + rand() * 0.95;
    leafPile(x, z, s);
    if (s > 1.15 && bigPiles.length < 4) bigPiles.push([x, z]);
  }
  // the bigger drifts rustle as you approach — and something might be in them
  for (const [px, pz] of bigPiles) {
    ctx.triggers.push({ x: px, z: pz, r: 3, cooldown: 9, onEnter: (c) => {
      c.audio.rustle(new THREE.Vector3(px, 0.3, pz));
      if (Math.random() < 0.4) c.director.peripheral();
    } });
  }

  // --- the opening: your abandoned campsite. A dead fire, a fallen lantern (the
  //     light you wake to), a torn tent, a bedroll. You were here. Now you're not. ---
  const charMat = new THREE.MeshStandardMaterial({ color: 0x141210, roughness: 1 });
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x2c2c30, roughness: 0.95 });
  const canvasMat = new THREE.MeshStandardMaterial({ color: 0x33302a, roughness: 1, side: THREE.DoubleSide });
  // fire ring (in front of spawn)
  const fcx = 0, fcz = 5;
  for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2; const st = new THREE.Mesh(new THREE.IcosahedronGeometry(0.12 + rand() * 0.06, 0), stoneMat); st.position.set(fcx + Math.cos(a) * 0.5, 0.08, fcz + Math.sin(a) * 0.5); group.add(st); }
  for (let i = 0; i < 3; i++) { const log = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.7, 6), charMat); log.position.set(fcx, 0.06, fcz); log.rotation.set(Math.PI / 2, 0, i * 1.0); group.add(log); }
  const ember = makeFlame(0xff3a10, 0.18, 2.2); ember.position.set(fcx, 0.12, fcz); ember.scale.setScalar(0.6); group.add(ember); flames.push(ember);
  field.addCircle(fcx, fcz, 0.55);
  // the fallen lantern — your only light when you wake
  const campLantern = makeFlame(0xffb24a, 0.7, 6); campLantern.position.set(fcx + 1.0, 0.18, fcz + 0.4); group.add(campLantern); flames.push(campLantern);
  const campLanternBody = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.18, 8), new THREE.MeshStandardMaterial({ color: 0x14140f, roughness: 0.5, metalness: 0.6 }));
  campLanternBody.position.set(fcx + 1.0, 0.09, fcz + 0.4); campLanternBody.rotation.z = 1.3; group.add(campLanternBody);
  // a log to sit on
  const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 1.6, 7), new THREE.MeshStandardMaterial({ map: barkTexture(), roughness: 0.95 }));
  seat.rotation.set(0, 0, Math.PI / 2); seat.position.set(-1.3, 0.2, fcz + 0.6); group.add(seat); field.addCircle(-1.3, fcz + 0.6, 0.5);
  // a torn tent, slumped
  const tent = new THREE.Group();
  for (const sx of [-1, 1]) { const side = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.5, 2.0), canvasMat); side.position.set(sx * 0.5, 0.62, 0); side.rotation.z = sx * 0.62; tent.add(side); }
  const tback = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.2), canvasMat); tback.position.set(0, 0.55, -1.0); tent.add(tback);
  tent.position.set(-3.0, 0, 7.2); tent.rotation.set(-0.1, 0.5, 0.16); group.add(tent);
  tent.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  field.addCircle(-3.0, 7.2, 0.9);
  // a bedroll by the fire
  const bedroll = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, 1.9), new THREE.MeshStandardMaterial({ color: 0x2a2620, roughness: 1 }));
  bedroll.position.set(1.4, 0.07, 7.6); bedroll.rotation.y = 0.3; group.add(bedroll);

  // --- a rusted iron fence running along the left of the approach ---
  const ironMat = new THREE.MeshStandardMaterial({ color: 0x16181c, roughness: 0.6, metalness: 0.7 });
  const barGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.5, 5);
  const tipGeo = new THREE.ConeGeometry(0.05, 0.18, 5);
  const fenceX = -3.2;
  for (let z = 2; z >= -16; z -= 0.32) {
    const bar = new THREE.Mesh(barGeo, ironMat); bar.position.set(fenceX, 0.75, z); group.add(bar);
    const tip = new THREE.Mesh(tipGeo, ironMat); tip.position.set(fenceX, 1.6, z); group.add(tip);
  }
  for (const ry of [0.35, 1.35]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06, 18.2), ironMat); rail.position.set(fenceX, ry, -7); group.add(rail);
  }
  field.addBox(fenceX - 0.15, -16, fenceX + 0.15, 2, 9);

  // --- the shrine + iron key ---
  const sh = makeShrine(); sh.position.set(shrine.x, 0, shrine.z); group.add(sh);
  field.addCircle(shrine.x, shrine.z, 0.7);
  // a votive flame on the shrine lights the key (which no longer carries its own
  // light) and reads as a beacon at the end of the wisp trail
  const shrineFlame = makeFlame(0xffc066, 0.7, 5.5); shrineFlame.position.set(shrine.x, 0.62, shrine.z); group.add(shrineFlame); flames.push(shrineFlame);
  const key = makeKey('iron'); key.position.set(shrine.x, 0.78, shrine.z); group.add(key);
  ctx.interactables.push({
    object: key, pos: new THREE.Vector3(shrine.x, 0.9, shrine.z), radius: 1.7, once: true, focusable: true,
    canUse: () => true,
    onUse: (state, c) => {
      group.remove(key);
      state.inventory.add('ironkey');
      c.director.pickupScare(new THREE.Vector3(shrine.x, 1, shrine.z));
      c.director.setObjective('house');
    },
  });

  // --- will-o'-wisps drifting from near spawn toward the shrine ---
  const trail = [[2, 2], [8, -2], [13, -8], [15, -13]];
  for (const [wx, wz] of trail) {
    const f = makeFlame(0x88ccbb, 0.6, 5); f.position.set(wx, 1.4, wz);
    f.userData.wisp = { x: wx, z: wz, t: Math.random() * 10 }; group.add(f); wisps.push(f); flames.push(f);
  }

  // --- the mansion, looming. A real building from every side — windows and
  //     quoins all round, towers at all four corners, a walled rear garden — so
  //     circling it rewards you instead of showing you the back of a box. ---
  const mGroup = new THREE.Group(); group.add(mGroup);
  const stone = new THREE.MeshStandardMaterial({ color: 0x24242e, roughness: 0.95 });
  const trimStone = new THREE.MeshStandardMaterial({ color: 0x2e2e3a, roughness: 0.9 });
  const W = mansion.halfW * 2, H = 11, D = mansion.zFront - mansion.zBack;
  const zMid = (mansion.zFront + mansion.zBack) / 2;
  const body = new THREE.Mesh(new THREE.BoxGeometry(W, H, Math.abs(D)), stone);
  body.position.set(mansion.x, H / 2, zMid);
  body.castShadow = true; body.receiveShadow = true; mGroup.add(body);
  field.addBox(mansion.x - mansion.halfW, mansion.zBack, mansion.x + mansion.halfW, mansion.zFront, 5);
  // roof
  const roof = new THREE.Mesh(new THREE.ConeGeometry(mansion.halfW * 1.45, 6, 4), stone);
  roof.rotation.y = Math.PI / 4; roof.position.set(mansion.x, H + 3, zMid); mGroup.add(roof);
  // quoin pilasters up each corner + a string course between floors
  for (const sx of [-1, 1]) for (const sz of [mansion.zFront, mansion.zBack]) {
    const q = new THREE.Mesh(new THREE.BoxGeometry(0.7, H, 0.7), trimStone);
    q.position.set(mansion.x + sx * mansion.halfW, H / 2, sz); mGroup.add(q);
  }
  const course = new THREE.Mesh(new THREE.BoxGeometry(W + 0.3, 0.28, Math.abs(D) + 0.3), trimStone);
  course.position.set(mansion.x, 5.6, zMid); mGroup.add(course);
  // gothic towers at ALL FOUR corners
  for (const sx of [-1, 1]) for (const tz of [mansion.zFront - 1, mansion.zBack + 1]) {
    const tx = mansion.x + sx * (mansion.halfW + 0.5);
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.1, H + 5, 8), stone);
    tower.position.set(tx, (H + 5) / 2, tz); mGroup.add(tower);
    const spire = new THREE.Mesh(new THREE.ConeGeometry(2.3, 7, 8), stone);
    spire.position.set(tx, H + 5 + 3.5, tz); mGroup.add(spire);
    field.addCircle(tx, tz, 2.0, 5);
    // a single dim window high in each tower, facing outward
    const outZ = tz < zMid ? -1 : 1;
    const tw = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xb05a1e, emissiveIntensity: 0.7 });
    const twin = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.4), tw);
    twin.position.set(tx, H + 2, tz + outZ * 2.1);
    if (outZ < 0) twin.rotation.y = Math.PI;
    mGroup.add(twin); windowMats.push(tw);
  }

  // window helper: recessed dark pane + timber frame, on any face
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x141018, roughness: 0.85 });
  const paneDark = new THREE.MeshStandardMaterial({ color: 0x05060a, roughness: 0.22, metalness: 0.55 });
  function addWindow(x, y, z, ry, w = 1.3, h = 1.8, mat = paneDark) {
    const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry;
    const fr = new THREE.Mesh(new THREE.BoxGeometry(w + 0.22, h + 0.22, 0.1), frameMat); g.add(fr);
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); pane.position.z = 0.055; g.add(pane);
    const mull = new THREE.Mesh(new THREE.BoxGeometry(0.06, h, 0.12), frameMat); mull.position.z = 0.03; g.add(mull);
    const tran = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, 0.12), frameMat); tran.position.z = 0.03; g.add(tran);
    const sill = new THREE.Mesh(new THREE.BoxGeometry(w + 0.34, 0.12, 0.24), trimStone); sill.position.set(0, -h / 2 - 0.1, 0.06); g.add(sill);
    mGroup.add(g);
    return mat;
  }
  // front face: the two flickering window-eyes + upper row (kept), now framed
  for (const sx of [-1, 1]) {
    const wm = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xc97a2a, emissiveIntensity: 0.8 });
    addWindow(mansion.x + sx * 5.5, 6.5, mansion.zFront + 0.06, 0, 2, 2.6, wm); windowMats.push(wm);
    const wm2 = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x7a4418, emissiveIntensity: 0.5 });
    addWindow(mansion.x + sx * 3, 9.5, mansion.zFront + 0.06, 0, 1.4, 1.8, wm2); windowMats.push(wm2);
    addWindow(mansion.x + sx * 8.2, 2.6, mansion.zFront + 0.06, 0, 1.3, 1.9);
  }
  // side faces: dark windows both floors
  for (const sx of [-1, 1]) {
    const fx = mansion.x + sx * (mansion.halfW + 0.06), ry = sx > 0 ? Math.PI / 2 : -Math.PI / 2;
    for (const wy of [2.8, 8.6]) for (let i = 0; i < 3; i++) {
      addWindow(fx, wy, zMid + (i - 1) * 5.2, ry);
    }
  }
  // rear face: four dark windows + ONE faintly lit upstairs. When you snoop
  // around the back garden, that light dies. (See the garden trigger below.)
  const rearZ = mansion.zBack - 0.06;
  const rearLitMat = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xc9862a, emissiveIntensity: 0.85 });
  addWindow(mansion.x - 6.5, 8.6, rearZ, Math.PI, 1.3, 1.8, rearLitMat);
  addWindow(mansion.x + 6.5, 8.6, rearZ, Math.PI);
  for (const sx of [-1, 1]) addWindow(mansion.x + sx * 4.2, 2.8, rearZ, Math.PI);
  let rearLightDying = false;
  // ivy climbing the stone, all sides
  const ivyMat = new THREE.MeshStandardMaterial({ color: 0x0d1a10, roughness: 1, side: THREE.DoubleSide });
  const ivySpots = [
    [mansion.x - 9.5, 3.4, mansion.zFront + 0.1, 0, 2.4, 6.2], [mansion.x + 7.8, 4.6, mansion.zFront + 0.1, 0, 1.7, 8.6],
    [mansion.x - mansion.halfW - 0.1, 3.6, zMid - 4, Math.PI / 2, 2.8, 7], [mansion.x + mansion.halfW + 0.1, 5.2, zMid + 3, -Math.PI / 2, 2.2, 9],
    [mansion.x + 2.5, 3.2, rearZ - 0.04, Math.PI, 3.2, 6], [mansion.x - 7.8, 4.4, rearZ - 0.04, Math.PI, 1.9, 8.2],
  ];
  for (const [ix, iy, iz, iry, iw, ih] of ivySpots) {
    const ivy = new THREE.Mesh(new THREE.PlaneGeometry(iw, ih), ivyMat);
    ivy.position.set(ix, iy, iz); ivy.rotation.y = iry; ivy.rotation.z = (rand() - 0.5) * 0.15; mGroup.add(ivy);
  }

  // front porch: steps, columns, a slab roof, the lantern, the iron-bound door
  for (let i = 0; i < 3; i++) {
    const st = new THREE.Mesh(new THREE.BoxGeometry(4.4 - i * 0.5, 0.16, 0.8), trimStone);
    st.position.set(mansion.x, 0.08 + i * 0.16, mansion.zFront + 1.7 - i * 0.5); mGroup.add(st);
  }
  for (const sx of [-1, 1]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 3.9, 8), trimStone);
    col.position.set(mansion.x + sx * 1.9, 1.95, mansion.zFront + 1.2); mGroup.add(col);
    field.addCircle(mansion.x + sx * 1.9, mansion.zFront + 1.2, 0.32, 5);
  }
  const porchRoof = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.3, 2.2), stone);
  porchRoof.position.set(mansion.x, 4.05, mansion.zFront + 1.0); porchRoof.castShadow = true; mGroup.add(porchRoof);
  const pediment = new THREE.Mesh(new THREE.ConeGeometry(3.1, 1.4, 3), stone);
  pediment.rotation.y = Math.PI; pediment.scale.z = 0.4;
  pediment.position.set(mansion.x, 4.9, mansion.zFront + 1.0); mGroup.add(pediment);
  const door = new THREE.Mesh(new THREE.BoxGeometry(2, 3.4, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x140d07, roughness: 0.8 }));
  door.position.set(mansion.x, 1.7, mansion.zFront + 0.12); door.castShadow = true; mGroup.add(door);
  const lantern = makeFlame(0xffaa44, 0.9, 6); lantern.position.set(mansion.x + 1.6, 2.6, mansion.zFront + 0.4); mGroup.add(lantern); flames.push(lantern);

  ctx.interactables.push({
    object: door, pos: new THREE.Vector3(mansion.x, 1.7, mansion.zFront + 0.3), radius: 2.4, focusable: true,
    canUse: (state) => state.inventory.has('ironkey'),
    lockedHint: true,
    onUse: (state, c) => {
      c.audio.doorCreak(door.position);
      c.go('house', { fromForest: true });
    },
  });

  // --- the walled rear garden: hedges, a dry fountain, and the iron gate into
  //     the graveyard — locked, but you can see through the bars to where this
  //     is all going. Snooping back here is rewarded AND punished. ---
  const hedgeMat = new THREE.MeshStandardMaterial({ color: 0x0c140e, roughness: 1 });
  const GY = { x0: -9, x1: 9, z0: Z0 + 2, z1: mansion.zBack - 1 };   // garden bounds
  function hedge(x, z, sx, sz) {
    const h = new THREE.Mesh(new THREE.BoxGeometry(sx, 2.1, sz), hedgeMat);
    h.position.set(x, 1.05, z); h.castShadow = true; mGroup.add(h);
    field.addBox(x - sx / 2, z - sz / 2, x + sx / 2, z + sz / 2, 2);
  }
  hedge(GY.x0, (GY.z0 + GY.z1) / 2, 0.8, GY.z1 - GY.z0);           // west hedge wall
  hedge(GY.x1, (GY.z0 + GY.z1) / 2, 0.8, GY.z1 - GY.z0);           // east hedge wall
  hedge(-6.2, GY.z0, 5.2, 0.8); hedge(6.2, GY.z0, 5.2, 0.8);        // back hedge, gap at centre for the gate
  // two overgrown planting beds
  for (const sx of [-1, 1]) {
    const bed = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.3, 1.6), hedgeMat);
    bed.position.set(sx * 5, 0.15, GY.z1 - 4); mGroup.add(bed);
    field.addBox(sx * 5 - 2.3, GY.z1 - 4.8, sx * 5 + 2.3, GY.z1 - 3.2, 2);
  }
  // the dry fountain: a cracked basin, a leaning figure, black water stain
  const fx0 = 0, fz0 = (GY.z0 + GY.z1) / 2;
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.2, 0.55, 12), trimStone);
  basin.position.set(fx0, 0.28, fz0); mGroup.add(basin);
  const basinInner = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 0.5, 12), new THREE.MeshStandardMaterial({ color: 0x07080a, roughness: 0.4, metalness: 0.3 }));
  basinInner.position.set(fx0, 0.34, fz0); mGroup.add(basinInner);
  const figure = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.9, 4, 8), trimStone);
  figure.position.set(fx0, 1.15, fz0); figure.rotation.z = 0.16; mGroup.add(figure);
  const figHead = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), trimStone);
  figHead.position.set(fx0 + 0.16, 1.78, fz0); mGroup.add(figHead);
  field.addCircle(fx0, fz0, 2.3, 2);
  // the iron gate to the graveyard, set in the back hedge
  const gatePillars = [];
  for (const sx of [-1, 1]) {
    const gp = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.9, 0.7), trimStone);
    gp.position.set(sx * 2.2, 1.45, GY.z0); mGroup.add(gp); gatePillars.push(gp);
    const fin = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), trimStone);
    fin.position.set(sx * 2.2, 3.05, GY.z0); mGroup.add(fin);
    field.addBox(sx * 2.2 - 0.35, GY.z0 - 0.35, sx * 2.2 + 0.35, GY.z0 + 0.35, 2);
  }
  const gateGroup = new THREE.Group(); gateGroup.position.set(0, 0, GY.z0); mGroup.add(gateGroup);
  for (let gx = -1.7; gx <= 1.7; gx += 0.34) {
    const bar = new THREE.Mesh(barGeo, ironMat); bar.scale.y = 1.5; bar.position.set(gx, 1.1, 0); gateGroup.add(bar);
    const tip = new THREE.Mesh(tipGeo, ironMat); tip.position.set(gx, 2.28, 0); gateGroup.add(tip);
  }
  for (const gy of [0.4, 1.9]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.07, 0.06), ironMat); rail.position.set(0, gy, 0); gateGroup.add(rail); }
  const gateArch = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.07, 6, 14, Math.PI), ironMat);
  gateArch.position.set(0, 2.7, GY.z0); mGroup.add(gateArch);
  field.addBox(-1.9, GY.z0 - 0.2, 1.9, GY.z0 + 0.2, 2);
  ctx.interactables.push({
    object: gateGroup, pos: new THREE.Vector3(0, 1.3, GY.z0 + 0.4), radius: 2.0, focusable: true,
    canUse: () => false, lockedHint: true,
    onUse: () => {},
  });
  // beyond the bars: the graveyard you will one day walk out into
  for (let i = 0; i < 7; i++) {
    const gs = makeGravestone();
    gs.position.set((rand() - 0.5) * 10, 0, GY.z0 - 3 - rand() * 6);
    gs.rotation.y = rand() * Math.PI; mGroup.add(gs);
  }
  const coldFlame = makeFlame(0x6fa8c9, 0.5, 6); coldFlame.position.set(2.5, 1.0, GY.z0 - 7); mGroup.add(coldFlame); flames.push(coldFlame);

  // garden triggers: the lit window dies as you enter; the fountain folds a
  // shadow; the gate shows you eyes in the dark on the OTHER side.
  ctx.triggers.push({ x: 0, z: GY.z1 - 2, r: 4, once: true, onEnter: (c) => {
    rearLightDying = true;
    c.audio.whisper(new THREE.Vector3(mansion.x - 6.5, 8, mansion.zBack));
    c.audio.bumpHeart(0.4, 88);
  } });
  ctx.triggers.push({ x: fx0, z: fz0, r: 3.2, once: true, onEnter: (c) => { c.director.shadowFold(new THREE.Vector3(fx0 - 2, 1.05, fz0 - 2)); } });
  ctx.triggers.push({ x: 0, z: GY.z0 + 2.5, r: 2.6, once: true, onEnter: (c) => {
    c.director.darkEyes(new THREE.Vector3(1.2, 1.5, GY.z0 - 4), { force: true, life: 1.3 });
    c.audio.moan(new THREE.Vector3(0, 1.2, GY.z0 - 6));
  } });
  ctx.triggers.push({ x: 0, z: GY.z1 - 6, r: 3.5, once: true, cooldown: 0, onEnter: (c) => { c.director.behindYou(); } });

  // --- the landmarks: every dark pocket of the wood has a reason to exist ---
  const stoneM = new THREE.MeshStandardMaterial({ color: 0x2c2c30, roughness: 0.95 });
  const woodM = new THREE.MeshStandardMaterial({ map: barkTexture(), roughness: 0.95 });
  const darkWoodM = new THREE.MeshStandardMaterial({ color: 0x171310, roughness: 1 });

  // the old well (-24,-30): stone ring, rotted winch, a rope going down too far
  {
    const wx = -24, wz = -30;
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.15, 0.9, 10, 1, true), stoneM);
    ring.position.set(wx, 0.45, wz); mGroup.add(ring);
    const dark = new THREE.Mesh(new THREE.CircleGeometry(0.95, 10), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    dark.rotation.x = -Math.PI / 2; dark.position.set(wx, 0.88, wz); mGroup.add(dark);
    for (const sx of [-1, 1]) { const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.9, 0.14), woodM); post.position.set(wx + sx * 1.0, 0.95, wz); post.rotation.z = sx * 0.08; mGroup.add(post); }
    const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 6), woodM); crossbar.rotation.z = Math.PI / 2; crossbar.position.set(wx, 1.8, wz); mGroup.add(crossbar);
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.0, 4), darkWoodM); rope.position.set(wx, 1.35, wz); mGroup.add(rope);
    field.addCircle(wx, wz, 1.25, 2);
    ctx.triggers.push({ x: wx, z: wz, r: 2.6, cooldown: 20, onEnter: (c) => {
      c.audio.drip(new THREE.Vector3(wx, -2, wz));
      c.audio.whisper(new THREE.Vector3(wx, -1.5, wz));       // from DOWN THERE
      c.audio.bumpHeart(0.35, 86);
    } });
  }

  // the fallen giant (30,-40): a tree too big for this wood, torn out by the roots
  {
    const gx = 30, gz = -40;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.3, 14, 9), trunkMat);
    trunk.rotation.z = Math.PI / 2 - 0.06; trunk.rotation.y = 0.5; trunk.position.set(gx, 1.0, gz); trunk.castShadow = true; mGroup.add(trunk);
    const rootDisc = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 0.7, 9), trunkMat);
    rootDisc.rotation.z = Math.PI / 2; rootDisc.rotation.y = 0.5; rootDisc.position.set(gx - 6.2, 1.6, gz - 3.3); rootDisc.castShadow = true; mGroup.add(rootDisc);
    for (let i = 0; i < 5; i++) {
      const root = new THREE.Mesh(new THREE.ConeGeometry(0.16, 1.6 + rand(), 5), trunkMat);
      root.position.set(gx - 6.2 + (rand() - 0.5) * 1.6, 1.6 + (rand() - 0.5) * 2.2, gz - 3.6);
      root.rotation.set(rand() * 2 - 1, 0, rand() * 2 - 1); mGroup.add(root);
    }
    field.addBox(gx - 6, gz - 1.6, gx + 6, gz + 1.2, 2);
    field.addCircle(gx - 6.2, gz - 3.3, 1.6, 2);
    ctx.triggers.push({ x: gx, z: gz + 3, r: 3.4, once: true, onEnter: (c) => { c.director.parallelShadow(); } });
  }

  // the abandoned cart (-32,0): spilled load, a dead lantern, no owner
  {
    const cx = -32, cz = 0;
    const bed = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.14, 2.6), woodM); bed.position.set(cx, 0.72, cz); bed.rotation.y = 0.4; bed.rotation.z = -0.12; mGroup.add(bed);
    for (const sx of [-1, 1]) {
      const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.07, 6, 14), darkWoodM);
      wheel.position.set(cx + Math.cos(0.4) * sx * 0.9, 0.55, cz - Math.sin(0.4) * sx * 0.9);
      wheel.rotation.y = 0.4 + Math.PI / 2; mGroup.add(wheel);
    }
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.4, 6), woodM);
    shaft.rotation.set(Math.PI / 2 - 0.35, 0.4, 0); shaft.position.set(cx + 1.4, 0.35, cz + 1.4); mGroup.add(shaft);
    for (let i = 0; i < 4; i++) {
      const crate = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), darkWoodM);
      crate.position.set(cx + (rand() - 0.5) * 2.4, 0.2, cz + 1 + rand() * 1.6); crate.rotation.y = rand() * 2; mGroup.add(crate);
    }
    const cartLantern = makeFlame(0xff7733, 0.35, 4); cartLantern.position.set(cx - 0.8, 0.2, cz + 2.1); mGroup.add(cartLantern); flames.push(cartLantern);
    field.addBox(cx - 1.2, cz - 1.5, cx + 1.2, cz + 1.5, 2);
    ctx.triggers.push({ x: cx, z: cz + 2.5, r: 3, once: true, onEnter: (c) => { c.audio.creak(new THREE.Vector3(cx, 1, cz)); c.director.peripheral(); } });
  }

  // the hunter's blind (40,-12): a platform on stilts. Something watches FROM it.
  {
    const bx = 40, bz = -12;
    for (const [ox, oz] of [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]]) {
      const stilt = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 3.4, 6), woodM);
      stilt.position.set(bx + ox, 1.7, bz + oz); mGroup.add(stilt);
    }
    const plat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 2.4), woodM); plat.position.set(bx, 3.4, bz); plat.castShadow = true; mGroup.add(plat);
    for (let i = 0; i < 5; i++) { const rung = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.06), woodM); rung.position.set(bx - 1.1, 0.5 + i * 0.62, bz + 0.9); mGroup.add(rung); }
    const rail = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.06, 0.06), woodM); rail.position.set(bx, 4.1, bz + 1.2); mGroup.add(rail);
    field.addBox(bx - 1, bz - 1, bx + 1, bz + 1, 2);
    ctx.triggers.push({ x: bx, z: bz + 3.4, r: 3.2, once: true, onEnter: (c) => {
      c.director.darkEyes(new THREE.Vector3(bx, 3.9, bz), { force: true, life: 1.2, sound: true });
    } });
  }

  // the woodcutter's stump (18,6): an axe left mid-swing, a cord of logs
  {
    const sx = 18, sz = 6;
    const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.62, 0.8, 9), trunkMat); stump.position.set(sx, 0.4, sz); mGroup.add(stump);
    const axeHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.035, 0.9, 6), woodM);
    axeHandle.position.set(sx + 0.15, 1.15, sz); axeHandle.rotation.z = -0.7; mGroup.add(axeHandle);
    const axeHead = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.14, 0.04), new THREE.MeshStandardMaterial({ color: 0x30343a, roughness: 0.4, metalness: 0.8 }));
    axeHead.position.set(sx - 0.14, 1.48, sz); axeHead.rotation.z = -0.7; mGroup.add(axeHead);
    for (let i = 0; i < 6; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.85, 6), woodM);
      log.rotation.set(Math.PI / 2, 0, rand() * 0.6);
      log.position.set(sx + 1.2 + (i % 3) * 0.28, 0.13 + Math.floor(i / 3) * 0.24, sz + (rand() - 0.5) * 0.3); mGroup.add(log);
    }
    field.addCircle(sx, sz, 0.75, 2);
    field.addCircle(sx + 1.4, sz, 0.6, 2);
  }

  // the standing stones (-45,-52): older than the house, older than the wood
  {
    const cx = -45, cz = -52;
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.4;
      const mx = cx + Math.cos(a) * 3.2, mz = cz + Math.sin(a) * 3.2;
      const mono = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.4 + rand() * 1.2, 0.5), stoneM);
      mono.position.set(mx, 1.2, mz); mono.rotation.set((rand() - 0.5) * 0.22, a, (rand() - 0.5) * 0.18);
      mono.castShadow = true; mGroup.add(mono);
      field.addCircle(mx, mz, 0.6, 2);
    }
    const altarStone = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 0.9), stoneM);
    altarStone.position.set(cx, 0.2, cz); mGroup.add(altarStone); field.addBox(cx - 0.7, cz - 0.45, cx + 0.7, cz + 0.45, 2);
    ctx.triggers.push({ x: cx, z: cz, r: 4, once: true, onEnter: (c) => {
      c.audio.hush(1.2); c.audio.moan(new THREE.Vector3(cx, 1, cz));
      c.director.shadowFold(new THREE.Vector3(cx + 2.4, 1.05, cz + 2.4));
    } });
  }

  // --- ambient scare triggers along the way ---
  ctx.triggers.push({ x: 6, z: -6, r: 3, once: true, onEnter: (c) => c.audio.flutter(new THREE.Vector3(8, 4, -10)) });
  ctx.triggers.push({ x: 13, z: -12, r: 3, once: true, onEnter: (c) => { c.audio.whisper(new THREE.Vector3(shrine.x + 4, 1, shrine.z)); c.director.parallelShadow(); } });
  ctx.triggers.push({ x: -4, z: -20, r: 4, once: true, onEnter: (c) => { c.director.parallelShadow(); } });
  ctx.triggers.push({ x: 0, z: -34, r: 5, once: true, onEnter: (c) => { c.audio.setTension(0.5); c.director.crossPath(-8, -40, 8, -40); } });

  // fog/atmosphere descriptors
  const z = CFG.zones.forest;

  function update(dt, t, player) {
    // key spin
    if (key.parent) { key.rotation.y += dt * 1.2; key.position.y = 0.82 + Math.sin(t * 2) * 0.04; }
    // wisp drift + bob
    for (const w of wisps) {
      const d = w.userData.wisp; d.t += dt;
      w.position.y = 1.3 + Math.sin(d.t * 1.5) * 0.25;
      w.position.x = d.x + Math.sin(d.t * 0.6) * 0.5;
      w.position.z = d.z + Math.cos(d.t * 0.5) * 0.5;
    }
    // window flicker
    for (const wm of windowMats) wm.emissiveIntensity = 0.6 + Math.sin(t * 3 + wm.id) * 0.25 + Math.random() * 0.1;
    // the one lit rear window gutters out once you've been seen seeing it
    if (rearLightDying && rearLitMat.emissiveIntensity > 0) {
      rearLitMat.emissiveIntensity = Math.max(0, rearLitMat.emissiveIntensity - dt * (0.4 + Math.random() * 0.8));
    }
  }

  return {
    name: 'forest', group, field, flames,
    spawn: { x: 0, z: 8, yaw: 0 },
    fog: { color: z.fog, density: z.fogDensity },
    ambient: { color: z.ambient, intensity: z.ambientI },
    sky: z.sky, update,
  };
}
