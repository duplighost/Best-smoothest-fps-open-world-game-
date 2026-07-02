import * as THREE from 'three';
import { ColliderField } from '../collision.js';
import { CFG } from '../config.js';
import { NavGrid } from './navgrid.js';
import { groundTexture, barkTexture, stoneTexture, softDot } from '../textures.js';
import { makeFlame, makeGravestone } from './props.js';

// The graveyard. You come out of the kitchen door into moonlight and cold air —
// and it should feel like relief for exactly eleven seconds. Rows of leaning
// stones, family mausoleums, statues that mourn with their faces turned away
// (while you watch), and a chapel at the far end with its door boarded and its
// transept fallen open. Under the chapel: the crypt, and the eye.

function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

export function buildGraveyard(ctx) {
  const group = new THREE.Group();
  const field = new ColliderField(4);
  const rand = rng(66101);
  const flames = [];
  const animated = [];

  // bounds: x[-30,30], z[-36,28]; gate at south (you enter), chapel at north
  const X0 = -30, X1 = 30, Z0 = -36, Z1 = 28;

  // --- ground + moon ---
  const gtex = groundTexture();
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 100),
    new THREE.MeshStandardMaterial({ map: gtex, bumpMap: gtex, bumpScale: 0.07, color: 0x9aab9e, roughness: 0.8, metalness: 0.1 }));
  ground.rotation.x = -Math.PI / 2; ground.position.set(0, 0, -4); ground.receiveShadow = true; group.add(ground);
  // The yard is MOONLIT — the one act you can actually see across. After the
  // house's candle-dark, stepping out here should feel like being exposed.
  const moon = new THREE.DirectionalLight(0x6f8fb0, 4.5);
  moon.position.set(26, 42, -18); group.add(moon);
  const moonFill = new THREE.HemisphereLight(0x5a7690, 0x18201a, 2.0);
  group.add(moonFill);
  const moonSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: softDot('#5a7292'), transparent: true, opacity: 0.75, depthWrite: false }));
  moonSprite.scale.set(19, 19, 1); moonSprite.position.set(40, 40, -55); group.add(moonSprite);

  // --- perimeter wall + the gate that shuts behind you ---
  const wallStone = new THREE.MeshStandardMaterial({ map: stoneTexture(), color: 0xaab6b0, roughness: 0.95 });
  function boundary(x0, z0, x1, z1) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(Math.max(x1 - x0, 0.6), 2.6, Math.max(z1 - z0, 0.6)), wallStone);
    w.position.set((x0 + x1) / 2, 1.3, (z0 + z1) / 2); w.castShadow = true; w.receiveShadow = true; group.add(w);
    field.addBox(x0 - 0.1, z0 - 0.1, x1 + 0.1, z1 + 0.1, 9);
  }
  boundary(X0, Z0, X1, Z0 + 0.6);                                   // north
  boundary(X0, Z1 - 0.6, -2.2, Z1);                                  // south, gate gap at centre
  boundary(2.2, Z1 - 0.6, X1, Z1);
  boundary(X0, Z0, X0 + 0.6, Z1);                                    // west
  boundary(X1 - 0.6, Z0, X1, Z1);                                    // east
  // the gate you came through — it swings shut and locks eleven seconds in
  const ironMat = new THREE.MeshStandardMaterial({ color: 0x16181c, roughness: 0.6, metalness: 0.7 });
  const gate = new THREE.Group(); gate.position.set(-2.2, 0, Z1 - 0.3); group.add(gate);
  for (let gx = 0.25; gx <= 4.2; gx += 0.34) {
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.2, 5), ironMat); bar.position.set(gx, 1.1, 0); gate.add(bar);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 5), ironMat); tip.position.set(gx, 2.28, 0); gate.add(tip);
  }
  for (const gy of [0.4, 1.9]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.07, 0.06), ironMat); rail.position.set(2.2, gy, 0); gate.add(rail); }
  gate.rotation.y = -1.25;                                           // hangs open — you just walked through
  const gateBlocker = field.addDynamicBox(-2.3, Z1 - 0.55, 2.3, Z1 - 0.05, 2);
  gateBlocker.active = false;
  let gateShut = false;
  ctx.triggers.push({ x: 0, z: Z1 - 5, r: 3.4, once: true, onEnter: (c) => {
    gateShut = true; gateBlocker.active = true;
    c.audio.slam(new THREE.Vector3(0, 1.3, Z1));
    c.audio.bumpHeart(0.6, 96);
    c.audio.setTension(0.55);
    c.player.addShake(0.4);
  } });
  animated.push({ update: (dt) => { if (gateShut && gate.rotation.y < 0) gate.rotation.y = Math.min(0, gate.rotation.y + dt * 4.2); } });

  // --- the winding avenue to the chapel, lit by cold lanterns ----------------
  const PATH = [[0, 26], [2.5, 16], [-3, 6], [2.5, -5], [-1.5, -13], [0, -19.5]];
  const pathMat = new THREE.MeshStandardMaterial({ color: 0x4c5650, roughness: 1 });
  for (let i = 0; i < PATH.length - 1; i++) {
    const [ax, az] = PATH[i], [bx, bz] = PATH[i + 1];
    const len = Math.hypot(bx - ax, bz - az);
    const seg = new THREE.Mesh(new THREE.PlaneGeometry(2.6, len + 1), pathMat);
    seg.rotation.x = -Math.PI / 2; seg.rotation.z = -Math.atan2(bx - ax, -(bz - az));
    seg.position.set((ax + bx) / 2, 0.02, (az + bz) / 2);
    seg.receiveShadow = true; group.add(seg);
  }
  // lantern posts at the bends
  for (let i = 1; i < PATH.length - 1; i += 1) {
    const [lx, lz] = PATH[i];
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 2.3, 6), ironMat);
    post.position.set(lx + 1.7, 1.15, lz); group.add(post);
    const cage = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.34, 0.26), ironMat);
    cage.position.set(lx + 1.7, 2.2, lz); group.add(cage);
    const f = makeFlame(0x86c9de, 0.65, 6); f.position.set(lx + 1.7, 2.2, lz); group.add(f); flames.push(f);
    field.addCircle(lx + 1.7, lz, 0.14, 2);
  }

  // --- the stones: instanced rows, leaning every which way -------------------
  const stoneMat = new THREE.MeshStandardMaterial({ map: stoneTexture(), color: 0xc2ccc6, roughness: 0.95 });
  const stoneGeo = new THREE.BoxGeometry(0.56, 0.9, 0.12);
  stoneGeo.translate(0, 0.45, 0);
  const crossGeo = (() => {                          // a few crosses among the slabs
    const g1 = new THREE.BoxGeometry(0.12, 1.15, 0.1); g1.translate(0, 0.57, 0);
    const g2 = new THREE.BoxGeometry(0.5, 0.12, 0.1); g2.translate(0, 0.82, 0);
    return [g1, g2];
  })();
  const stoneXf = [], crossXf = [];
  const m4 = new THREE.Matrix4(), P = new THREE.Vector3(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(1, 1, 1);
  function nearPath(x, z, pad = 2.2) {
    for (let i = 0; i < PATH.length - 1; i++) {
      const [ax, az] = PATH[i], [bx, bz] = PATH[i + 1];
      const t = THREE.MathUtils.clamp(((x - ax) * (bx - ax) + (z - az) * (bz - az)) / ((bx - ax) ** 2 + (bz - az) ** 2 || 1), 0, 1);
      if (Math.hypot(x - (ax + (bx - ax) * t), z - (az + (bz - az) * t)) < pad) return true;
    }
    return false;
  }
  const RESERVED = [[-18, 6, 4.5], [16, -6, 4.5], [-14, -20, 4.5], [0, -28, 10], [8, 12, 3], [-8, -8, 3], [5, -16, 3]];
  function reserved(x, z) {
    for (const [rx, rz, rr] of RESERVED) if (Math.hypot(x - rx, z - rz) < rr) return true;
    return false;
  }
  // rows with drift — reads as a yard filled over generations
  for (let rowZ = 22; rowZ > -18; rowZ -= 2.8) {
    for (let x = X0 + 3; x < X1 - 3; x += 2.1 + rand() * 0.8) {
      const gx = x + (rand() - 0.5) * 0.8, gz = rowZ + (rand() - 0.5) * 1.2;
      if (nearPath(gx, gz) || reserved(gx, gz)) continue;
      if (rand() < 0.14) continue;                                    // gaps where stones fell/sank
      E.set((rand() - 0.5) * 0.24, rand() * Math.PI * 2 * (rand() < 0.8 ? 0.04 : 1), (rand() - 0.5) * 0.3);
      Q.setFromEuler(E);
      const s = 0.75 + rand() * 0.6;
      m4.compose(P.set(gx, 0, gz), Q, S.set(s, s, s));
      (rand() < 0.14 ? crossXf : stoneXf).push(m4.clone());
      field.addCircle(gx, gz, 0.3 * s, 1);
    }
  }
  const stoneMesh = new THREE.InstancedMesh(stoneGeo, stoneMat, stoneXf.length);
  stoneMesh.castShadow = true; stoneMesh.receiveShadow = true;
  stoneXf.forEach((m, i) => stoneMesh.setMatrixAt(i, m));
  stoneMesh.instanceMatrix.needsUpdate = true; group.add(stoneMesh);
  for (const gpart of crossGeo) {
    const cm = new THREE.InstancedMesh(gpart, stoneMat, crossXf.length);
    cm.castShadow = true;
    crossXf.forEach((m, i) => cm.setMatrixAt(i, m));
    cm.instanceMatrix.needsUpdate = true; group.add(cm);
  }

  // --- gnarled yew trees (a handful, hand-placed) ----------------------------
  const barkT = barkTexture();
  const yewMat = new THREE.MeshStandardMaterial({ map: barkT, bumpMap: barkT, bumpScale: 0.1, roughness: 0.95 });
  for (const [tx, tz, ts] of [[-24, 16, 1.2], [22, 8, 1.0], [-9, -3, 0.9], [24, -20, 1.25], [-24, -28, 1.1]]) {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.28 * ts, 0.5 * ts, 6.5 * ts, 7), yewMat);
    trunk.position.set(tx, 3.2 * ts, tz); trunk.rotation.z = (rand() - 0.5) * 0.14; trunk.castShadow = true; group.add(trunk);
    for (let b = 0; b < 5; b++) {
      const len = (1.2 + rand() * 1.8) * ts;
      const br = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.09 * ts, len, 5), yewMat);
      br.geometry.translate(0, len / 2, 0);
      br.rotation.set((rand() - 0.5) * 2.4, rand() * Math.PI * 2, 0.7 + rand() * 0.7);
      br.position.set(tx, (3.4 + rand() * 2.4) * ts, tz); group.add(br);
    }
    field.addCircle(tx, tz, 0.55 * ts, 1);
  }

  // --- mourning statues: faces averted while you look... --------------------
  const statueMat = new THREE.MeshStandardMaterial({ color: 0xb4bebb, roughness: 0.85 });
  const statues = [];
  for (const [sx, sz] of [[8, 12], [-8, -8], [5, -16]]) {
    const st = new THREE.Group();
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.9), stoneMat); plinth.position.y = 0.25; st.add(plinth);
    const robe = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.7, 7), statueMat); robe.position.y = 1.35; st.add(robe);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 8), statueMat); head.position.set(0, 2.3, 0.03); head.scale.y = 1.2; st.add(head);
    const shoulderL = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.5, 4, 6), statueMat);
    shoulderL.position.set(-0.26, 1.8, 0.12); shoulderL.rotation.z = 0.5; st.add(shoulderL);
    const shoulderR = shoulderL.clone(); shoulderR.position.x = 0.26; shoulderR.rotation.z = -0.5; st.add(shoulderR);
    st.position.set(sx, 0, sz);
    st.rotation.y = rand() * Math.PI * 2;
    group.add(st); statues.push(st);
    field.addCircle(sx, sz, 0.55, 2);
  }
  animated.push({ update: (dt, t, player) => {
    for (const st of statues) {
      const dx = player.pos.x - st.position.x, dz = player.pos.z - st.position.z;
      const d = Math.hypot(dx, dz);
      if (d > 16) continue;
      const facing = (player.forward.x * -dx + player.forward.z * -dz) / (d || 1) > 0.42;
      if (!facing) {                                    // they only turn while unseen
        const want = Math.atan2(dx, dz);
        let diff = ((want - st.rotation.y + Math.PI) % (Math.PI * 2)) - Math.PI;
        st.rotation.y += diff * Math.min(1, dt * 0.4);
      }
    }
  } });

  // --- mausoleums -------------------------------------------------------------
  function mausoleum(mx, mz, ry, openDoor) {
    const g = new THREE.Group(); g.position.set(mx, 0, mz); g.rotation.y = ry; group.add(g);
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.9, 4.4), wallStone); body.position.y = 1.45; body.castShadow = true; body.receiveShadow = true; g.add(body);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.9, 1.4, 4), wallStone); roof.rotation.y = Math.PI / 4; roof.position.y = 3.6; roof.scale.z = 1.35; g.add(roof);
    for (const cx of [-1.4, 1.4]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.19, 2.6, 7), wallStone); col.position.set(cx, 1.3, 2.6); g.add(col);
    }
    const porch = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.3, 1.4), wallStone); porch.position.set(0, 2.75, 2.5); g.add(porch);
    const doorway = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.0), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    doorway.position.set(0, 1.0, 2.21); g.add(doorway);
    if (!openDoor) {
      for (let bx = -0.42; bx <= 0.42; bx += 0.21) {
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.9, 5), ironMat);
        bar.position.set(bx, 1.0, 2.26); g.add(bar);
      }
    }
    // world-space collider (rotations here are 0 or π, so a box is exact)
    field.addBox(mx - 1.9, mz - 2.3, mx + 1.9, mz + 2.3, 2);
    return g;
  }
  mausoleum(-18, 6, 0.5, false);
  mausoleum(16, -6, -0.4, false);
  const openTomb = mausoleum(-14, -20, 0.2, true);      // this one stands open
  ctx.triggers.push({ x: -14, z: -17.5, r: 3, once: true, onEnter: (c) => {
    // eyes in the dark of the open doorway — then a skitter behind the building
    const p = new THREE.Vector3(-14 + Math.sin(0.2) * 2.2, 1.2, -20 + Math.cos(0.2) * 2.2);
    c.director.darkEyes(p, { force: true, life: 1.3, count: 3 });
    c.director._after(() => c.audio.skitter(new THREE.Vector3(-16, 0.6, -22), 'leaf'), 900);
  } });

  // --- open graves + fresh mounds (the erupt language) ------------------------
  const soilMat = new THREE.MeshStandardMaterial({ color: 0x241a12, roughness: 1 });
  function mound(mx, mz) {
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 1), soilMat);
    m.scale.set(1.1, 0.32, 1.7); m.position.set(mx, 0.06, mz); m.castShadow = true; group.add(m);
  }
  function openGrave(gx, gz) {
    const pit = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.2), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    pit.rotation.x = -Math.PI / 2; pit.position.set(gx, 0.03, gz); group.add(pit);
    const rim = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.14, 2.6), soilMat); rim.position.set(gx, 0.02, gz); group.add(rim);
    const under = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.2), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    under.rotation.x = -Math.PI / 2; under.position.set(gx, 0.035, gz); group.add(under);
    mound(gx + 1.3, gz + 0.3);
    field.addBox(gx - 0.6, gz - 1.15, gx + 0.6, gz + 1.15, 2);       // you cannot fall in — but you must walk AROUND it
  }
  openGrave(-4.5, 10);
  openGrave(6.5, -10.5);
  mound(3.6, 1.5); mound(-2.8, -16.5); mound(-9, 14);

  // the guaranteed first erupt: the mound right beside the path, a third of the
  // way in. It claws out, stares, and folds away — the yard's thesis statement.
  ctx.triggers.push({ x: -3, z: 6, r: 2.8, once: true, onEnter: (c) => {
    c.director.graveErupt(3.6, 1.5, { dwell: 1.6 });
  } });
  // the second: near the chapel, and this one HUNTS
  ctx.triggers.push({ x: -1.5, z: -13, r: 3.0, once: true, onEnter: (c) => {
    c.director.graveErupt(-2.8, -16.5, { mode: 'chase', speed: 2.6 });
  } });

  // --- the chapel --------------------------------------------------------------
  const CH = { x0: -7, x1: 7, z0: -34, z1: -22 };
  const chapelH = 4.6;
  function cwall(x0, z0, x1, z1, h = chapelH) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(Math.max(x1 - x0, 0.5), h, Math.max(z1 - z0, 0.5)), wallStone);
    w.position.set((x0 + x1) / 2, h / 2, (z0 + z1) / 2); w.castShadow = true; w.receiveShadow = true; group.add(w);
    field.addBox(x0, z0, x1, z1, 2);
  }
  // south (front) wall with the boarded door
  cwall(CH.x0, CH.z1 - 0.5, -1.1, CH.z1);
  cwall(1.1, CH.z1 - 0.5, CH.x1, CH.z1);
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(2.2, chapelH - 2.5, 0.5), wallStone);
  lintel.position.set(0, 2.5 + (chapelH - 2.5) / 2, CH.z1 - 0.25); group.add(lintel);
  const chDoor = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.5, 0.18), new THREE.MeshStandardMaterial({ color: 0x17100a, roughness: 0.9 }));
  chDoor.position.set(0, 1.25, CH.z1 - 0.2); group.add(chDoor);
  const plankM = new THREE.MeshStandardMaterial({ color: 0x2a211a, roughness: 1 });
  for (let i = 0; i < 3; i++) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.16, 0.06), plankM);
    plank.position.set(0, 0.7 + i * 0.6, CH.z1 - 0.08); plank.rotation.z = (i % 2 ? 0.12 : -0.1); group.add(plank);
  }
  field.addBox(-1.1, CH.z1 - 0.45, 1.1, CH.z1, 2);                    // boarded door blocks
  ctx.interactables.push({
    object: chDoor, pos: new THREE.Vector3(0, 1.3, CH.z1 + 0.3), radius: 2.0, focusable: true,
    canUse: () => false, lockedHint: true, onUse: () => {},
  });
  // west wall solid; east wall has the COLLAPSED TRANSEPT — the way in
  cwall(CH.x0, CH.z0, CH.x0 + 0.5, CH.z1);
  cwall(CH.x1 - 0.5, CH.z0, CH.x1, -29.4);
  cwall(CH.x1 - 0.5, -26.6, CH.x1, CH.z1);
  cwall(CH.x0, CH.z0, CH.x1, CH.z0 + 0.5);                            // north wall (altar end)
  // rubble spilling from the breach — you pick between the blocks
  for (let i = 0; i < 9; i++) {
    const r = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34 + rand() * 0.5, 0), wallStone);
    const rx2 = CH.x1 - 0.3 + rand() * 2.6, rz2 = -29.2 + rand() * 2.4;
    r.position.set(rx2, 0.2 + rand() * 0.25, rz2); r.rotation.set(rand() * 2, rand() * 2, rand() * 2); group.add(r);
    if (i % 2 === 0) field.addCircle(rx2, rz2, 0.42, 2);
  }
  // chapel roof + a squat bell tower on the southwest corner
  const chRoof = new THREE.Mesh(new THREE.ConeGeometry(9.4, 2.6, 4), wallStone);
  chRoof.rotation.y = Math.PI / 4; chRoof.scale.z = 0.72; chRoof.position.set(0, chapelH + 1.3, -28); group.add(chRoof);
  const tower = new THREE.Mesh(new THREE.BoxGeometry(2.6, 8.5, 2.6), wallStone);
  tower.position.set(-5.6, 4.25, -23.2); tower.castShadow = true; group.add(tower);
  const belfry = new THREE.Mesh(new THREE.ConeGeometry(2.1, 2.2, 4), wallStone);
  belfry.rotation.y = Math.PI / 4; belfry.position.set(-5.6, 9.6, -23.2); group.add(belfry);
  const bell = new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 8), new THREE.MeshStandardMaterial({ color: 0x3a3626, roughness: 0.5, metalness: 0.7 }));
  bell.scale.y = 1.15; bell.position.set(-5.6, 8.0, -23.2); group.add(bell);
  // one lit window in the chapel — the pull, visible across the whole yard
  const chWinMat = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xc9862a, emissiveIntensity: 0.9 });
  const chWin = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.2), chWinMat);
  chWin.position.set(2.8, 2.6, CH.z1 + 0.02); group.add(chWin);
  animated.push({ update: (dt, t) => { chWinMat.emissiveIntensity = 0.7 + Math.sin(t * 2.4) * 0.2 + Math.random() * 0.12; } });
  // the bell tolls once, by itself, when you're halfway across the yard
  ctx.triggers.push({ x: -1.5, z: -5, r: 4, once: true, onEnter: (c) => {
    c.audio.bell?.(new THREE.Vector3(-5.6, 8, -23.2));
    c.audio.hush(1.2);
    c.audio.bumpHeart(0.5, 90);
    animated.push({ update: (dt, t) => { bell.rotation.x = Math.sin(t * 3.2) * Math.max(0, 0.4 - t * 0.01); } });
  } });

  // --- chapel interior ---------------------------------------------------------
  // pews in two ragged columns, an altar, and the crypt stair behind it
  const pewM = new THREE.MeshStandardMaterial({ color: 0x1d1510, roughness: 0.95 });
  for (let r = 0; r < 4; r++) {
    for (const sx of [-1, 1]) {
      if (r === 2 && sx === 1) {                                     // one pew overturned
        const pew = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.5, 0.9), pewM);
        pew.position.set(sx * 3.2, 0.28, -25.5 - r * 1.7); pew.rotation.z = 2.6; pew.rotation.y = 0.3; group.add(pew);
        field.addBox(sx * 3.2 - 1.7, -25.5 - r * 1.7 - 0.6, sx * 3.2 + 1.7, -25.5 - r * 1.7 + 0.6, 2);
        continue;
      }
      const pew = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.55, 0.5), pewM);
      pew.position.set(sx * 3.2, 0.28, -25.5 - r * 1.7); group.add(pew);
      const back = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.6, 0.1), pewM);
      back.position.set(sx * 3.2, 0.75, -25.75 - r * 1.7); group.add(back);
      field.addBox(sx * 3.2 - 1.7, -25.85 - r * 1.7, sx * 3.2 + 1.7, -25.25 - r * 1.7, 2);
    }
  }
  const chAltar = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.05, 0.9), wallStone);
  chAltar.position.set(2.2, 0.52, -32.4); group.add(chAltar);
  field.addBox(1.1, -32.85, 3.3, -31.95, 2);
  const altarCandles = makeFlame(0xffaa44, 0.85, 6); altarCandles.position.set(2.2, 1.3, -32.4); group.add(altarCandles); flames.push(altarCandles);
  // ceiling over the chapel
  const chCeil = new THREE.Mesh(new THREE.PlaneGeometry(14, 12), new THREE.MeshStandardMaterial({ color: 0x0a0808, roughness: 1 }));
  chCeil.rotation.x = Math.PI / 2; chCeil.position.set(0, chapelH, -28); group.add(chCeil);

  // the crypt stair: a stone ramp descending along the west aisle, walled
  const stairX0 = -5.6, stairX1 = -3.6, stairZ0 = -33.2, stairZ1 = -27.6;
  cwall(stairX0 - 0.4, stairZ0, stairX0, stairZ1, 2.6);               // west cheek (against chapel wall)
  cwall(stairX1, stairZ0, stairX1 + 0.4, stairZ1, 2.6);               // east cheek
  // visible steps
  for (let i = 0; i < 10; i++) {
    const st = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.24, 0.56), wallStone);
    st.position.set((stairX0 + stairX1) / 2, -0.12 - i * 0.24, stairZ1 - 0.28 - i * 0.56); group.add(st);
  }
  const cryptDoor = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.2, 0.2), new THREE.MeshStandardMaterial({ color: 0x1a0d0d, roughness: 0.8, emissive: 0x2a0208, emissiveIntensity: 0.4 }));
  cryptDoor.position.set((stairX0 + stairX1) / 2, -2.4 + 1.1, stairZ0 + 0.3); group.add(cryptDoor);
  const cryptGlow = new THREE.PointLight(0xff1808, 4, 7, 2); cryptGlow.position.set((stairX0 + stairX1) / 2, -1.6, stairZ0 + 1.2); group.add(cryptGlow);
  animated.push({ update: (dt, t) => { cryptGlow.intensity = 3.2 + Math.sin(t * 3.7) * 1.1 + Math.random() * 0.5; } });
  ctx.interactables.push({
    object: cryptDoor, pos: new THREE.Vector3((stairX0 + stairX1) / 2, -1.4, stairZ0 + 0.5), radius: 2.2, focusable: true,
    canUse: () => true,
    onUse: (state, c) => {
      c.audio.doorCreak(cryptDoor.position);
      c.go('crypt');
    },
  });

  // ground height: flat yard, one descending ramp inside the chapel
  function groundAt(x, z) {
    if (x > stairX0 && x < stairX1 && z > stairZ0 && z < stairZ1) {
      const k = THREE.MathUtils.clamp((stairZ1 - z) / (stairZ1 - stairZ0 - 0.4), 0, 1);
      return -k * 2.4;
    }
    return 0;
  }

  // --- the approach beat: the thing is at the breach... then it ISN'T ----------
  // The game taught you "the guardian waits at the door". Here it waits — and as
  // you commit, it sinks into the ground in front of you, and the earth thuds
  // under your feet. It didn't leave. It's below, and it lets you walk in.
  ctx.triggers.push({ x: CH.x1 + 3.4, z: -28, r: 4.2, once: true, onEnter: (c) => {
    const e = c.director.entity;
    if (e.isVisible) e.hardHide();
    c.director._sentinel = null;
    e.spawnAt(CH.x1 + 0.8, -28, c.player.pos.x, c.player.pos.z, 'guard', { dwell: 9999 });
    c.audio.hush(0.9); c.audio.bumpHeart(0.5, 92);
    c.director._after(() => {
      if (!e.isVisible) return;
      e.observedTime = Math.max(e.observedTime, 0.1);                 // fold, don't pop
      e.despawn(c.audio);
      c.audio.slam(new THREE.Vector3(c.player.pos.x, -0.5, c.player.pos.z));   // the thud UNDER you
      c.player.addShake(0.6);
      c.audio.bumpHeart(0.8, 108);
      c.director._after(() => c.audio.slam(new THREE.Vector3(c.player.pos.x + 1.5, -0.5, c.player.pos.z - 2)), 700);
    }, 2400);
  } });

  // ambient triggers along the avenue
  ctx.triggers.push({ x: 2.5, z: 16, r: 3.2, once: true, onEnter: (c) => { c.director.parallelShadow(); } });
  ctx.triggers.push({ x: -8, z: -8, r: 3.2, once: true, onEnter: (c) => {
    c.audio.moan(new THREE.Vector3(-8, 1, -10)); c.director.shadowFold(new THREE.Vector3(-10.5, 1.05, -9));
  } });

  const zc = CFG.zones.graveyard;
  const nav = new NavGrid(field, X0 - 1, Z0 - 1, X1 + 1, Z1 + 1, 0.65, 0.4);

  function update(dt, t, player) {
    for (const a of animated) a.update(dt, t, player);
  }

  return {
    name: 'graveyard', group, field, flames,
    spawn: { x: 0, z: Z1 - 2.2, yaw: 0 },       // just inside the gate, facing the yard
    fog: { color: zc.fog, density: zc.fogDensity },
    ambient: { color: zc.ambient, intensity: zc.ambientI },
    sky: zc.sky, update, groundAt, nav,
    surface: 'leaf',
  };
}
