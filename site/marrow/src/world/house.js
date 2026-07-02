import * as THREE from 'three';
import { ColliderField } from '../collision.js';
import { CFG } from '../config.js';
import { NavGrid } from './navgrid.js';
import { wallpaperTexture, woodFloorTexture, stoneTexture, softDot } from '../textures.js';
import {
  makeKey, makeDoor, makeFlame, poolifyFlames, makeFlamePool, updateFlamePool,
  makePortrait, makeTable, makeChair, makeBed, makeShelf, makeMirror, makeCouch,
  makeArmchair, makeRug, makeFireplace, makeCandelabra, makeGrandPainting,
} from './props.js';

// The house. Not a maze — a HOME, with the lights long dead: a double-height
// entry hall under a chandelier, a parlor, a dining room still set for a meal,
// a kitchen with a locked garden door, a library, and upstairs — up the grand
// staircase — the bedrooms, the nursery, and the key that wakes the thing in
// the walls.
//
// Both storeys live in ONE level. The upper floor is built 400m away on +X and
// the mid-landing of the switchback staircase seamlessly hands you between the
// two copies — the turn hides the swap, the fog hides the distance, and the 2D
// collision field never has to know the house has a second floor.

const UX = 400;            // world-X offset of the upper floor
const UY = -3.6;           // upper copy sits 3.6 lower in LOCAL y (its floor is y=0)
const WALL_H = 3.2;        // ground-floor ceiling
const HALL_H = 6.6;        // the entry hall is open to the rafters
const UP_H = 3.0;          // upper-floor ceiling
const TH = 0.26;           // wall thickness

function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

export function buildHouse(ctx) {
  const group = new THREE.Group();
  const field = new ColliderField(4);
  const rand = rng(88613);
  const flames = [];
  const animated = [];      // {update(dt,t,player)} hooks gathered while building

  const wallTex = wallpaperTexture();
  const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, bumpMap: wallTex, bumpScale: 0.032, roughness: 0.95 });
  const wainMat = new THREE.MeshStandardMaterial({ color: 0x1c130b, roughness: 0.7, metalness: 0.05 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x120d08, roughness: 0.8 });
  const floorTex = woodFloorTexture();
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x0c0a09, roughness: 1 });

  // ---- instanced wall collection (both storeys share the meshes) -----------
  const wallXf = [];   // {x, y, z, sx, sy, sz}
  const wainXf = [];
  const m4 = new THREE.Matrix4(), P = new THREE.Vector3(), Q = new THREE.Quaternion(), S = new THREE.Vector3();

  // one wall run between (x0,z0)-(x1,z1); axis-aligned. baseY lifts it to the
  // upper storey; collide=false for pure dressing (the diorama).
  function wall(x0, z0, x1, z1, h, baseY = 0, collide = true, wain = h < 5) {
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    const sx = Math.abs(x1 - x0) || TH, sz = Math.abs(z1 - z0) || TH;
    wallXf.push({ x: cx, y: baseY + h / 2, z: cz, sx, sy: h, sz });
    if (wain) wainXf.push({ x: cx, y: baseY + 0.48, z: cz, sx: sx + 0.05, sy: 0.95, sz: sz + 0.05 });
    if (collide) field.addBox(cx - sx / 2, cz - sz / 2, cx + sx / 2, cz + sz / 2, 2);
  }
  // a wall run WITH a doorway gap: gapAt is the door centre along the run,
  // gapW its width. Returns the gap centre for placing an actual door.
  function wallGap(x0, z0, x1, z1, h, gapAt, gapW, baseY = 0) {
    const alongX = Math.abs(x1 - x0) > Math.abs(z1 - z0);
    if (alongX) {
      const dir = Math.sign(x1 - x0) || 1;
      wall(x0, z0, gapAt - dir * gapW / 2, z1, h, baseY);
      wall(gapAt + dir * gapW / 2, z0, x1, z1, h, baseY);
      // lintel over the gap
      wallXf.push({ x: gapAt, y: baseY + h - (h - 2.15) / 2, z: (z0 + z1) / 2, sx: gapW, sy: h - 2.15, sz: TH });
      return { x: gapAt, z: (z0 + z1) / 2, alongX: true };
    }
    const dir = Math.sign(z1 - z0) || 1;
    wall(x0, z0, x1, gapAt - dir * gapW / 2, h, baseY);
    wall(x0, gapAt + dir * gapW / 2, x1, z1, h, baseY);
    wallXf.push({ x: (x0 + x1) / 2, y: baseY + h - (h - 2.15) / 2, z: gapAt, sx: TH, sy: h - 2.15, sz: gapW });
    return { x: (x0 + x1) / 2, z: gapAt, alongX: false };
  }

  function floorSlab(x0, z0, x1, z1, y, tex = true, upper = false) {
    const w = Math.abs(x1 - x0), d = Math.abs(z1 - z0);
    let mat;
    if (tex) {
      const t = woodFloorTexture(); t.repeat.set(w / 2, d / 2);
      mat = new THREE.MeshStandardMaterial({ map: t, bumpMap: t, bumpScale: 0.045, roughness: 0.4, metalness: 0.15 });
    } else mat = darkMat;
    const f = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
    f.rotation.x = -Math.PI / 2; f.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
    f.receiveShadow = true; group.add(f);
    return f;
  }
  function ceilSlab(x0, z0, x1, z1, y) {
    const c = new THREE.Mesh(new THREE.PlaneGeometry(Math.abs(x1 - x0), Math.abs(z1 - z0)), darkMat);
    c.rotation.x = Math.PI / 2; c.position.set((x0 + x1) / 2, y, (z0 + z1) / 2); group.add(c);
  }

  // recessed window on an exterior wall (dark panes; the night is out there)
  const frameM = new THREE.MeshStandardMaterial({ color: 0x141018, roughness: 0.85 });
  const paneM = new THREE.MeshStandardMaterial({ color: 0x0a1018, roughness: 0.2, metalness: 0.5, emissive: 0x101a26, emissiveIntensity: 0.32 });
  function window_(x, y, z, ry, w = 1.2, h = 1.7) {
    const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry;
    const fr = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, h + 0.2, 0.1), frameM); g.add(fr);
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), paneM); pane.position.z = 0.06; g.add(pane);
    const mull = new THREE.Mesh(new THREE.BoxGeometry(0.05, h, 0.11), frameM); mull.position.z = 0.03; g.add(mull);
    const tran = new THREE.Mesh(new THREE.BoxGeometry(w, 0.05, 0.11), frameM); tran.position.z = 0.03; g.add(tran);
    group.add(g);
  }

  // =========================================================================
  // GROUND FLOOR — outer shell x[-16,16] z[-12,14]; front door on the south
  // =========================================================================
  floorSlab(-16, -12, 16, 14, 0);

  // outer shell, tall enough to close the double-height hall
  wall(-16, -12, 16, -12, HALL_H + 0.1);                         // north
  wall(-16, 14, 16, 14, HALL_H + 0.1);                           // south — solid; door is decorative inside it
  wall(-16, -12, -16, 14, HALL_H + 0.1);                         // west
  wall(16, -12, 16, 14, HALL_H + 0.1);                           // east

  // the front door (you came in; it does not open again)
  const frontDoor = new THREE.Mesh(new THREE.BoxGeometry(2, 3.2, 0.22), trimMat);
  frontDoor.position.set(0, 1.6, 13.85); group.add(frontDoor);
  ctx.triggers.push({ x: 0, z: 12.6, r: 1.8, once: true, cooldown: 0, onEnter: (c) => {
    // three steps in, the door slams itself behind you. You live here now.
    c.audio.slam(new THREE.Vector3(0, 1.5, 13.8));
    c.player.addShake(0.5);
    c.audio.bumpHeart(0.7, 96);
    c.audio.setTension(0.35);
  } });

  // --- entry hall: x[-4.5,4.5] z[2,13], open to the rafters -----------------
  // hall side walls only rise to WALL_H where rooms flank them; the hall's own
  // volume is open — the wall band above (up to HALL_H) closes the storey seam.
  wallGap(-4.5, 2, -4.5, 13, WALL_H, 8.5, 1.7);                     // to parlor
  wallGap(4.5, 2, 4.5, 13, WALL_H, 8.5, 1.7);                       // to dining room
  wall(-4.5, 2, -4.5, 13, HALL_H - WALL_H, WALL_H, false, false);   // seam band above parlor door wall
  wall(4.5, 2, 4.5, 13, HALL_H - WALL_H, WALL_H, false, false);
  wall(-4.5, 0, 4.5, 0, HALL_H - WALL_H, WALL_H, false, false);     // seam band over the corridor mouth
  ceilSlab(-4.5, 2, 4.5, 13, HALL_H);
  ceilSlab(-4.5, 0, 4.5, 2, HALL_H);                                // high ceiling continues over the stair
  // hall dressing: rug, console tables, the chandelier far overhead
  const rug = makeRug(3.4, 5.2); rug.position.set(0, 0, 9); group.add(rug);
  for (const sx of [-1, 1]) {
    const console_ = makeTable(1.5, 0.5, 0.9); console_.position.set(sx * 3.6, 0, 11.6); group.add(console_);
    field.addBox(sx * 3.6 - 0.75, 11.2, sx * 3.6 + 0.75, 12, 2);
    const cd = makeCandelabra(); cd.position.set(sx * 3.6, 0.9, 11.6); cd.scale.setScalar(0.6); group.add(cd);
    (cd.userData.flames || []).forEach((f) => flames.push(f));
  }
  const chandelier = buildChandelier(); chandelier.position.set(0, 5.0, 8); group.add(chandelier);
  const chandLight = new THREE.PointLight(0xffb04a, 14, 16, 2); chandLight.position.set(0, 4.6, 8); group.add(chandLight);
  animated.push({ update: (dt, t) => { chandLight.intensity = 12 + Math.sin(t * 2.7) * 2 + Math.random() * 1.2; chandelier.rotation.y = Math.sin(t * 0.21) * 0.03; } });
  for (const sx of [-1, 1]) {
    const gp = makeGrandPainting(sx > 0 ? 3 : 7, 1.15, 1.6); gp.position.set(sx * 4.32, 2.0, 10.5); gp.rotation.y = -sx * Math.PI / 2; group.add(gp);
  }

  // --- parlor: x[-16,-4.5] z[4,13] ------------------------------------------
  wallGap(-16, 4, -4.5, 4, WALL_H, -11, 1.7);                     // south corridor wall, door near west
  ceilSlab(-16, 4, -4.5, 13, WALL_H);
  {
    const px = -10.2, pz = 8.5;
    const prug = makeRug(4.4, 3.2); prug.position.set(px, 0, pz); group.add(prug);
    const couch = makeCouch(2.2); couch.position.set(px, 0, pz + 1.6); couch.rotation.y = Math.PI; group.add(couch);
    field.addBox(px - 1.1, pz + 1.2, px + 1.1, pz + 2.0, 2);
    for (const sx of [-1, 1]) { const ac = makeArmchair(); ac.position.set(px + sx * 2.2, 0, pz); ac.rotation.y = sx * Math.PI / 2; group.add(ac); field.addCircle(px + sx * 2.2, pz, 0.5, 2); }
    const coffee = makeTable(1.1, 0.55, 0.42); coffee.position.set(px, 0, pz); group.add(coffee); field.addCircle(px, pz, 0.6, 2);
    const fp = makeFireplace(); fp.position.set(-15.6, 0, pz); fp.rotation.y = Math.PI / 2; group.add(fp);
    field.addBox(-16, pz - 1.2, -15.2, pz + 1.2, 2);
    const emb = makeFlame(0xff5a22, 0.55, 5.5); emb.position.set(-15.4, 0.5, pz); group.add(emb); flames.push(emb);
    const mirror = makeMirror(1.1, 1.5); mirror.position.set(px, 1.8, 12.85); mirror.rotation.y = Math.PI; group.add(mirror);
    ctx.triggers.push({ x: px, z: 11.4, r: 1.5, once: true, onEnter: (c) => c.director.mirrorScare?.(new THREE.Vector3(px, 1.8, 12.7)) });
    window_(-10, 1.9, 13.85, Math.PI); window_(-15.85, 1.9, 6.5, Math.PI / 2);
    const p1 = makePortrait(4); p1.position.set(-6.5, 1.7, 4.15); group.add(p1);
  }

  // --- dining room: x[4.5,16] z[4,13] ---------------------------------------
  wallGap(4.5, 4, 16, 4, WALL_H, 11, 1.7);                        // south corridor wall, door near east
  ceilSlab(4.5, 4, 16, 13, WALL_H);
  {
    const cx = 10.2, cz = 8.5;
    const table = makeTable(6.2, 1.5, 0.78); table.position.set(cx, 0, cz); group.add(table);
    field.addBox(cx - 3.1, cz - 0.75, cx + 3.1, cz + 0.75, 2);
    for (let i = 0; i < 4; i++) {
      for (const sz of [-1, 1]) {
        const ch = makeChair(); ch.position.set(cx - 2.3 + i * 1.5, 0, cz + sz * 1.15); ch.rotation.y = sz > 0 ? Math.PI : 0; group.add(ch);
      }
    }
    // ONE chair pulled out and turned to face the door. Recently.
    const odd = makeChair(); odd.position.set(cx - 3.9, 0, cz + 1.9); odd.rotation.y = -1.1; group.add(odd);
    const cdl = makeCandelabra(); cdl.position.set(cx, 0.78, cz); cdl.scale.setScalar(0.75); group.add(cdl);
    (cdl.userData.flames || []).forEach((f) => flames.push(f));
    // plates set for a meal no one ate — shallow cylinders
    const plateM = new THREE.MeshStandardMaterial({ color: 0x9a948a, roughness: 0.4 });
    for (let i = 0; i < 6; i++) {
      const pl = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.02, 10), plateM);
      pl.position.set(cx - 2.3 + (i % 3) * 1.7, 0.8, cz + (i < 3 ? -0.55 : 0.55)); group.add(pl);
    }
    window_(10, 1.9, 13.85, Math.PI); window_(15.85, 1.9, 8.5, -Math.PI / 2);
    const gp = makeGrandPainting(2, 1.2, 1.5); gp.position.set(11.5, 1.9, 4.18); gp.rotation.y = Math.PI; group.add(gp);
  }

  // --- the spine corridor: z[0,4] full width --------------------------------
  // north corridor wall with doors to library (west), stairs live mid, kitchen (east)
  wallGap(-16, 0, -6, 0, WALL_H, -10.5, 1.7);                     // library door
  wallGap(6, 0, 16, 0, WALL_H, 10.5, 1.7);                        // kitchen door
  wall(-6, 0, -4.5, 0, WALL_H); wall(4.5, 0, 6, 0, WALL_H);
  ceilSlab(-16, 0, -4.5, 4, WALL_H); ceilSlab(4.5, 0, 16, 4, WALL_H);
  // corridor portraits — a family that watches you pass
  for (const [px, pz, ry, seedP] of [[-8, 0.18, 0, 2], [-13, 3.82, Math.PI, 5], [8, 0.18, 0, 8], [13, 3.82, Math.PI, 1]]) {
    const p = makePortrait(seedP); p.position.set(px, 1.65, pz); p.rotation.y = ry; group.add(p);
  }
  const hallCandle = makeFlame(0xffaa44, 0.8, 5.5); hallCandle.position.set(0, 0.9, 1.2); group.add(hallCandle); flames.push(hallCandle);

  // --- library: x[-16,-6] z[-12,0] ------------------------------------------
  ceilSlab(-16, -12, -6, 0, WALL_H);
  wall(-6, -12, -6, 0, WALL_H);                                    // east wall (to bathroom block)
  {
    // shelves lining the walls, a reading desk, a fallen ladder
    for (let i = 0; i < 4; i++) {
      const sh = makeShelf(2.9); sh.position.set(-15.5, 0, -10 + i * 2.6); sh.rotation.y = Math.PI / 2; group.add(sh);
      field.addBox(-16, -10.6 + i * 2.6, -15.1, -9.4 + i * 2.6, 2);
    }
    for (let i = 0; i < 3; i++) {
      const sh = makeShelf(2.9); sh.position.set(-8.5 + (i - 1) * 2.6, 0, -11.55); group.add(sh);
      field.addBox(-9.1 + (i - 1) * 2.6, -12, -7.9 + (i - 1) * 2.6, -11.2, 2);
    }
    const desk = makeTable(1.7, 0.9, 0.76); desk.position.set(-11, 0, -5); desk.rotation.y = 0.3; group.add(desk);
    field.addCircle(-11, -5, 0.95, 2);
    const dc = makeChair(); dc.position.set(-11.8, 0, -4.2); dc.rotation.y = 2.6; group.add(dc);
    const ladder = new THREE.Group();
    for (const sxx of [-0.25, 0.25]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 3.4, 0.06), trimMat); rail.position.set(sxx, 0, 0); ladder.add(rail); }
    for (let i = 0; i < 6; i++) { const rung = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.05), trimMat); rung.position.y = -1.4 + i * 0.55; ladder.add(rung); }
    ladder.position.set(-13, 1.55, -8.2); ladder.rotation.set(0, 0.4, 1.25); group.add(ladder);   // fallen against a shelf
    // scattered books
    const bookM = new THREE.MeshStandardMaterial({ color: 0x27201a, roughness: 0.9 });
    for (let i = 0; i < 9; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.24), bookM);
      b.position.set(-13 + rand() * 5, 0.03, -9.5 + rand() * 5); b.rotation.y = rand() * 3; group.add(b);
    }
    const lc = makeFlame(0xffaa44, 0.85, 6); lc.position.set(-11, 0.95, -5); group.add(lc); flames.push(lc);
    window_(-15.85, 1.9, -2.5, Math.PI / 2, 1.2, 1.7);
    ctx.triggers.push({ x: -11, z: -6, r: 2.6, once: true, onEnter: (c) => {
      c.audio.creak(new THREE.Vector3(-14, 2.5, -8));
      c.director._after(() => c.audio.slam(new THREE.Vector3(-15, 0.4, -9)), 900);   // a book hits the floor two rows over
    } });
  }

  // --- bathroom x[-6,-0.5] z[-12,-2] + guest room x[0.5,6] z[-12,-2] --------
  wallGap(-6, -2, -0.5, -2, WALL_H, -3.4, 1.4);                    // bathroom door (off the stair hall)
  wallGap(0.5, -2, 6, -2, WALL_H, 3.4, 1.4);                       // guest room door
  wall(-0.5, -12, -0.5, -2, WALL_H); wall(0.5, -12, 0.5, -2, WALL_H);
  wall(-0.5, -12, 0.5, -12, WALL_H);
  ceilSlab(-6, -12, -0.5, -2, WALL_H); ceilSlab(0.5, -12, 6, -2, WALL_H);
  {
    // bathroom: clawfoot tub full of black water, a sink, a mirror you'd rather not check
    const tub = new THREE.Group();
    const shellM = new THREE.MeshStandardMaterial({ color: 0x8a8578, roughness: 0.35, metalness: 0.2 });
    const shell = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 0.9, 4, 10), shellM);
    shell.rotation.z = Math.PI / 2; shell.scale.set(1, 1, 0.72); shell.position.y = 0.5; tub.add(shell);
    const water = new THREE.Mesh(new THREE.CircleGeometry(0.4, 12), new THREE.MeshStandardMaterial({ color: 0x02050a, roughness: 0.05, metalness: 0.7 }));
    water.rotation.x = -Math.PI / 2; water.scale.set(1.8, 1, 1); water.position.y = 0.62; tub.add(water);
    tub.position.set(-4.4, 0, -9.5); tub.rotation.y = 0.15; group.add(tub);
    field.addBox(-5.3, -10.2, -3.5, -8.8, 2);
    const sink = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.2, 0.85, 8), shellM); sink.position.set(-1.2, 0.42, -11.3); group.add(sink);
    field.addCircle(-1.2, -11.3, 0.4, 2);
    const bmirror = makeMirror(0.7, 0.95); bmirror.position.set(-1.2, 1.7, -11.85); group.add(bmirror);
    ctx.triggers.push({ x: -2.2, z: -10.4, r: 1.6, once: true, onEnter: (c) => {
      c.audio.drip(new THREE.Vector3(-4.4, 1, -9.5));
      c.director._after(() => c.director.mirrorScare?.(new THREE.Vector3(-1.2, 1.7, -11.6)), 1400);
    } });
    // guest room: stripped bed, an open case someone never finished packing
    const gb = makeBed(); gb.position.set(3.4, 0, -10.4); group.add(gb); field.addBox(2.7, -11.4, 4.1, -9.4, 2);
    const caseM = new THREE.MeshStandardMaterial({ color: 0x2a1f14, roughness: 0.85 });
    const suitcase = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.24, 0.5), caseM); suitcase.position.set(3.4, 0.6, -9.0); suitcase.rotation.y = 0.3; group.add(suitcase);
    const lid = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.03, 0.5), caseM); lid.position.set(3.15, 0.86, -9.3); lid.rotation.set(-1.9, 0.3, 0); group.add(lid);
    window_(3.4, 1.9, -11.85, 0);
  }

  // --- kitchen x[6,16] z[-12,0] + pantry; the GARDEN DOOR is here -----------
  ceilSlab(6, -12, 16, 0, WALL_H);
  wall(6, -12, 6, 0, WALL_H);                                       // west wall (to guest block)
  wallGap(12, -12, 12, -6, WALL_H, -9, 1.4);                        // pantry partition
  wall(12, -6, 16, -6, WALL_H);
  {
    const stoveM = new THREE.MeshStandardMaterial({ color: 0x16171a, roughness: 0.6, metalness: 0.5 });
    const stove = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.1, 0.8), stoveM); stove.position.set(15.4, 0.55, -3); group.add(stove);
    field.addBox(14.6, -3.5, 16, -2.5, 2);
    const stoveEmber = makeFlame(0xff4416, 0.4, 4); stoveEmber.position.set(15.1, 0.9, -3); group.add(stoveEmber); flames.push(stoveEmber);
    const prep = makeTable(2.4, 1.0, 0.85); prep.position.set(9.5, 0, -3); group.add(prep); field.addBox(8.3, -3.5, 10.7, -2.5, 2);
    // hanging pans that are still, and one that is not
    const panM = new THREE.MeshStandardMaterial({ color: 0x33322e, roughness: 0.45, metalness: 0.7 });
    const pans = [];
    for (let i = 0; i < 4; i++) {
      const pan = new THREE.Group();
      const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5, 4), panM); chain.position.y = -0.25; pan.add(chain);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.08, 10), panM); body.position.y = -0.55; pan.add(body);
      pan.position.set(8.6 + i * 0.6, WALL_H - 0.35, -3); group.add(pan); pans.push(pan);
    }
    animated.push({ update: (dt, t) => {
      pans[2].rotation.x = Math.sin(t * 1.7) * 0.16; pans[2].rotation.z = Math.cos(t * 1.3) * 0.12;   // one swings, windlessly
    } });
    // pantry shelves — jars gone dark
    for (let i = 0; i < 2; i++) { const sh = makeShelf(2.4); sh.position.set(13 + i * 1.8, 0, -11.5); group.add(sh); field.addBox(12.4 + i * 1.8, -12, 13.6 + i * 1.8, -11.2, 2); }
    const jarM = new THREE.MeshStandardMaterial({ color: 0x1c2416, roughness: 0.3, metalness: 0.1 });
    for (let i = 0; i < 6; i++) { const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.2, 8), jarM); jar.position.set(12.6 + rand() * 2.6, 0.9 + (i % 2) * 0.55, -11.45); group.add(jar); }
    window_(15.85, 1.9, -1.2, -Math.PI / 2);
    const kc = makeFlame(0xffaa44, 0.75, 5.5); kc.position.set(9.5, 1.0, -3); group.add(kc); flames.push(kc);
  }

  // THE GARDEN DOOR — north wall of the kitchen, cold light bleeding under it.
  // Locked until the garden key comes down from the master bedroom.
  const gd = new THREE.Group(); gd.position.set(9, 0, -11.85); group.add(gd);
  const gDoor = makeDoor(1.8, 2.6); gDoor.position.set(-0.9, 0, 0); gd.add(gDoor);
  const gdFrame = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.3, 0.4), trimMat); gdFrame.position.set(0, 2.75, 0); gd.add(gdFrame);
  const gdSill = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.5), new THREE.MeshBasicMaterial({ color: 0x9ac9de, transparent: true, opacity: 0.35 }));
  gdSill.rotation.x = -Math.PI / 2; gdSill.position.set(0, 0.02, 0.4); gd.add(gdSill);
  const gdGlow = new THREE.PointLight(0x86b8d6, 3, 6, 2); gdGlow.position.set(0, 0.5, 0.5); gd.add(gdGlow);
  animated.push({ update: (dt, t) => { gdGlow.intensity = 2.4 + Math.sin(t * 1.9) * 0.7; } });
  const gdBlocker = field.addDynamicBox(7.9, -12.1, 10.1, -11.6, 2);
  ctx.interactables.push({
    object: gDoor, pos: new THREE.Vector3(9, 1.3, -11.4), radius: 2.2, focusable: true,
    canUse: (state) => state.inventory.has('gardenkey'),
    lockedHint: true,
    onUse: (state, c) => {
      gDoor.userData.targetAngle = -Math.PI * 0.6; gdBlocker.active = false;
      c.audio.doorCreak(new THREE.Vector3(9, 1.3, -11.8));
      setTimeout(() => c.go('graveyard'), 1300);
    },
  });
  // the subversion: come back key-in-hand and the door is ALREADY open a crack —
  // and the footsteps are behind you, in the rooms you just came through.
  ctx.triggers.push({ x: 9, z: -8.5, r: 3.4, once: true, onEnter: (c) => {
    if (!c.inventory.has('gardenkey')) return;                    // only armed on the way OUT
    gDoor.userData.targetAngle = -0.22;
    c.audio.doorCreak(new THREE.Vector3(9, 1.3, -11.8));
    c.audio.hush(1.1);
    let d = 9;
    const step = () => {
      if (d < 3) { c.audio.bumpHeart(0.6, 104); return; }
      c.audio.footstep(new THREE.Vector3(9 - d * 0.4, 1, -8.5 + d), 'dry');   // back through the kitchen door, closing
      d -= 1.2;
      c.director._after(step, 330);
    };
    step();
  } });
  // if you approach the kitchen BEFORE having the key, the cold light under the
  // garden door is the hook that tells you this is the way out.
  ctx.triggers.push({ x: 10.5, z: -4, r: 3, once: true, onEnter: (c) => {
    c.audio.whisper(new THREE.Vector3(9, 1, -11.5));
    c.audio.bumpHeart(0.3, 82);
  } });

  // =========================================================================
  // THE GRAND STAIRCASE — both copies, built by one helper
  // =========================================================================
  // Central flight rises northward from the hall (z 5.8 -> 2.2, y 0 -> 1.8) to
  // a landing, then TWO return flights rise southward along the sides
  // (z 2.2 -> 5.4, y 1.8 -> 3.6) toward the upper balcony.
  const stairM = new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.5, metalness: 0.1 });
  const railM = trimMat;
  function buildStairs(ox, oy, upperCopy) {
    const sg = new THREE.Group(); sg.position.set(ox, oy, 0); group.add(sg);
    // central flight: 9 steps
    for (let i = 0; i < 9; i++) {
      const st = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.2, 0.44), stairM);
      st.position.set(0, 0.1 + i * 0.2, 5.8 - i * 0.4 - 0.2); st.castShadow = true; sg.add(st);
    }
    // landing
    const landing = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.22, 1.7), stairM);
    landing.position.set(0, 1.79, 1.45); sg.add(landing);
    // return flights (east & west): 9 steps each, rising southward
    for (const sxx of [-1, 1]) {
      for (let i = 0; i < 9; i++) {
        const st = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.2, 0.44), stairM);
        st.position.set(sxx * 2.45, 1.9 + i * 0.2, 2.4 + i * 0.36 + 0.18); st.castShadow = true; sg.add(st);
      }
      // outer rail of each return flight
      const rr = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.9, 3.9), railM);
      rr.position.set(sxx * 3.2, 2.9, 4.05); rr.rotation.x = -0.46; sg.add(rr);
      // inner balustrade between return flight and the hall void
      const ir = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.9, 3.9), railM);
      ir.position.set(sxx * 1.72, 2.9, 4.05); ir.rotation.x = -0.46; sg.add(ir);
    }
    // newel posts + central-flight rails
    for (const sxx of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.15, 0.22), railM);
      post.position.set(sxx * 1.7, 0.58, 6.0); sg.add(post);
      const crail = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.85, 4.1), railM);
      crail.position.set(sxx * 1.66, 1.35, 3.9); crail.rotation.x = 0.42; sg.add(crail);
    }
    // the back wall behind the landing (hides the far zone through the swap)
    const back = new THREE.Mesh(new THREE.BoxGeometry(6.6, 4.4, 0.3), wallMat);
    back.position.set(0, 2.2, 0.45); sg.add(back);
    const gpB = makeGrandPainting(6, 1.5, 2.0); gpB.position.set(0, 2.6, 0.62); sg.add(gpB);
    return sg;
  }
  buildStairs(0, 0, false);
  // collision for the stair block is shared between copies via world-X offset
  for (const ox of [0, UX]) {
    field.addBox(ox - 3.3, 0.3, ox + 3.3, 0.75, 2);                 // back wall behind landing
    field.addBox(ox - 3.45, 2.2, ox - 3.1, 5.9, 2);                 // west outer rail
    field.addBox(ox + 3.1, 2.2, ox + 3.45, 5.9, 2);                 // east outer rail
    // inner balustrades (climb the flights, not across them)
    field.addBox(ox - 1.82, 2.2, ox - 1.62, 5.4, 2);
    field.addBox(ox + 1.62, 2.2, ox + 1.82, 5.4, 2);
    // central flight side rails
    field.addBox(ox - 1.78, 2.2, ox - 1.55, 6.1, 2);
    field.addBox(ox + 1.55, 2.2, ox + 1.78, 6.1, 2);
    // landing side edges (you cannot step off the ends of the landing)
    field.addBox(ox - 3.45, 0.3, ox - 3.15, 2.2, 2);
    field.addBox(ox + 3.15, 0.3, ox + 3.45, 2.2, 2);
  }

  // ground height: both storeys' stairs in one function
  function groundAt(x, z) {
    const upper = x > UX - 100;
    const lx = upper ? x - UX : x;
    const base = upper ? 0 : 0;
    // central flight (in the upper copy it descends from the landing toward
    // the dark below — the swap trigger hands you back to the ground copy
    // before you reach the bottom)
    if (lx > -1.6 && lx < 1.6 && z > 2.2 && z < 5.9) {
      const k = THREE.MathUtils.clamp((5.8 - z) / 3.6, 0, 1);      // 0 at bottom, 1 at landing
      return base + (upper ? -3.6 + k * 1.8 : k * 1.8);
    }
    // landing
    if (lx > -3.2 && lx < 3.2 && z > 0.6 && z < 2.2) return base + (upper ? -1.8 : 1.8);
    // return flights
    if (Math.abs(lx) > 1.75 && Math.abs(lx) < 3.15 && z > 2.2 && z < 5.5) {
      const k = THREE.MathUtils.clamp((z - 2.2) / 3.2, 0, 1);
      return base + (upper ? -1.8 + k * 1.8 : 1.8 + k * 1.8);
    }
    return base;
  }

  // the seamless swap, on each return flight — going up in the ground copy and
  // going down in the upper copy. Positions are offset so you never land inside
  // the twin trigger.
  // The pair must be far enough apart that firing one NEVER lands you inside
  // the twin (you arrive at your same z): ground fires around z 4.2-5.7, you
  // land >1.4m from the upper trigger's circle, and vice versa.
  for (const sxx of [-1, 1]) {
    ctx.triggers.push({ x: sxx * 2.45, z: 4.9, r: 0.8, cooldown: 1.2, onEnter: (c) => {
      c.player.pos.x += UX; c.player.pos.y += UY;
      c.director.onPlayerRelocated();
    } });
    ctx.triggers.push({ x: UX + sxx * 2.45, z: 2.6, r: 0.8, cooldown: 1.2, onEnter: (c) => {
      c.player.pos.x -= UX; c.player.pos.y -= UY;
      c.director.onPlayerRelocated();
    } });
  }
  // ...and on the upper copy's central flight, for anyone who walks back DOWN
  // past the landing: it hands you to the ground copy's central flight so you
  // descend into the real hall, never the diorama.
  ctx.triggers.push({ x: UX, z: 4.2, r: 0.9, cooldown: 1.2, onEnter: (c) => {
    c.player.pos.x -= UX; c.player.pos.y -= UY;
    c.director.onPlayerRelocated();
  } });

  // =========================================================================
  // UPPER FLOOR — same shell, +UX away; its local floor is y=0
  // =========================================================================
  const U = UX;
  // upper floor built AROUND the stairwell opening (x U±3.5, z 0.4..5.4) — the
  // flights and landing live inside it; the balcony floor meets the flight tops
  // flush at z = 5.4.
  floorSlab(U - 16, -12, U - 3.5, 14, 0);
  floorSlab(U + 3.5, -12, U + 16, 14, 0);
  floorSlab(U - 3.5, -12, U + 3.5, 0.4, 0);
  floorSlab(U - 3.5, 5.4, U + 3.5, 14, 0);
  ceilSlab(U - 16, -12, U + 16, 14, UP_H);
  wall(U - 16, -12, U + 16, -12, UP_H);
  wall(U - 16, 14, U + 16, 14, UP_H);
  wall(U - 16, -12, U - 16, 14, UP_H);
  wall(U + 16, -12, U + 16, 14, UP_H);
  buildStairs(U, UY, true);

  // the stairwell: rails ring the opening except where the flights arrive
  {
    function rail(x0, z0, x1, z1) {
      const r = new THREE.Mesh(new THREE.BoxGeometry(Math.max(x1 - x0, 0.1), 0.92, Math.max(z1 - z0, 0.1)), railM);
      r.position.set((x0 + x1) / 2, 0.46, (z0 + z1) / 2); group.add(r);
      field.addBox(x0, z0, x1, z1, 2);
      const alongX = (x1 - x0) > (z1 - z0);
      const len = alongX ? x1 - x0 : z1 - z0;
      for (let i = 0.25; i < len; i += 0.42) {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.9, 6), railM);
        b.position.set(alongX ? x0 + i : (x0 + x1) / 2, 0.45, alongX ? (z0 + z1) / 2 : z0 + i); group.add(b);
      }
    }
    rail(U - 1.7, 5.32, U + 1.7, 5.52);          // the well rail between the flight exits
    rail(U - 3.6, 0.4, U - 3.44, 5.4);           // west side of the opening
    rail(U + 3.44, 0.4, U + 3.6, 5.4);           // east side of the opening
    // below, glimpsed through the well: the dark hall floor a storey down
    const dTex = woodFloorTexture(); dTex.repeat.set(3.6, 3.2);
    const dFloor = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 6.4), new THREE.MeshStandardMaterial({ map: dTex, roughness: 0.45 }));
    dFloor.rotation.x = -Math.PI / 2; dFloor.position.set(U, UY, 3.4); group.add(dFloor);
    const dRug = makeRug(2.6, 2.0); dRug.position.set(U, UY + 0.01, 4.6); group.add(dRug);
    const dCandle = makeFlame(0xffaa44, 0.5, 5); dCandle.position.set(U + 1.2, UY + 0.4, 4.9); group.add(dCandle); flames.push(dCandle);
    // pit shaft walls so the glimpse reads as the hall, not the void
    for (const sx of [-1, 1]) {
      const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.7, 6.6), wallMat);
      shaft.position.set(U + sx * 3.65, UY + 1.85, 3.4); group.add(shaft);
    }
    const shaftS = new THREE.Mesh(new THREE.BoxGeometry(7.6, 3.7, 0.3), wallMat);
    shaftS.position.set(U, UY + 1.85, 6.5); group.add(shaftS);
    const shaftN = new THREE.Mesh(new THREE.BoxGeometry(7.6, 3.7, 0.3), wallMat);
    shaftN.position.set(U, UY + 1.85, 0.25); group.add(shaftN);
  }

  // --- upper rooms ----------------------------------------------------------
  // hallway spine z[-2,0] + around the balcony; rooms off it.
  // master bedroom: x[U+6,U+16] z[0,13] — the garden key lives here
  wallGap(U + 6, 0, U + 6, 13, UP_H, 6.5, 1.5);                    // west wall w/ door
  wall(U + 6, 0, U + 16, 0, UP_H);                                 // south wall — the door is the ONLY way in
  wall(U + 4.5, 0, U + 6, 0, UP_H); wall(U - 6, 0, U - 4.5, 0, UP_H);
  // nursery: x[U-16,U-6] z[2,13]
  wallGap(U - 6, 2, U - 6, 13, UP_H, 6.5, 1.5);                    // east wall w/ door
  wallGap(U - 16, 2, U - 6, 2, UP_H, U - 11, 1.5);                 // south wall w/ its own door
  wall(U - 6, 0, U - 6, 2, UP_H);
  // sewing room: x[U-16,U-6] z[-12,-2]; small hall wall
  wallGap(U - 16, -2, U - 6, -2, UP_H, -11, 1.5);
  wall(U - 6, -12, U - 6, -2, UP_H);
  // linen/store room: x[U+6,U+16] z[-12,-2]
  wallGap(U + 6, -2, U + 16, -2, UP_H, 11, 1.5);
  wall(U + 6, -12, U + 6, -2, UP_H);

  // hallway dressing: runner, portraits, one candle stand, window at each end
  {
    const runner = makeRug(1.4, 16); runner.position.set(U, 0.005, -1); runner.rotation.y = Math.PI / 2;
    runner.scale.set(1, 1, 0.55); group.add(runner);
    for (const [px, pz, ry, sp] of [[U - 9, -1.82, Math.PI, 3], [U - 2, -1.82, Math.PI, 6], [U + 5, -1.82, Math.PI, 9], [U + 10, -0.18 - 1.8, Math.PI, 2]]) {
      const p = makePortrait(sp); p.position.set(px, 1.62, pz); p.rotation.y = ry; group.add(p);
    }
    const hc = makeFlame(0xffaa44, 0.8, 5.5); hc.position.set(U - 5.4, 0.95, -1); group.add(hc); flames.push(hc);
    window_(U - 15.85, 1.8, -1, Math.PI / 2); window_(U + 15.85, 1.8, -1, -Math.PI / 2);
  }

  // master bedroom
  const keyPos = new THREE.Vector3(U + 12.5, 0.86, 8.5);
  {
    const bx = U + 11, bz = 5;
    // four-poster bed
    const bed = makeBed(); bed.scale.set(1.5, 1.2, 1.35); bed.position.set(bx, 0, bz); group.add(bed);
    field.addBox(bx - 1.05, bz - 1.35, bx + 1.05, bz + 1.35, 2);
    for (const [px, pz] of [[bx - 1, bz - 1.25], [bx + 1, bz - 1.25], [bx - 1, bz + 1.25], [bx + 1, bz + 1.25]]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 2.4, 6), trimMat);
      post.position.set(px, 1.2, pz); group.add(post);
    }
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.06, 2.8), new THREE.MeshStandardMaterial({ color: 0x241a20, roughness: 1 }));
    canopy.position.set(bx, 2.42, bz); group.add(canopy);
    // wardrobe, vanity with a covered mirror (someone knew)
    const ward = makeShelf(2.6); ward.scale.set(1.4, 1, 1.6); ward.position.set(U + 15.4, 0, 2.5); ward.rotation.y = -Math.PI / 2; group.add(ward);
    field.addBox(U + 14.8, 1.6, U + 16, 3.4, 2);
    const vanity = makeTable(1.2, 0.5, 0.8); vanity.position.set(U + 15.2, 0, 10.5); group.add(vanity);
    field.addBox(U + 14.6, 10.1, U + 15.8, 10.9, 2);
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.2), new THREE.MeshStandardMaterial({ color: 0x4a463c, roughness: 1, side: THREE.DoubleSide }));
    sheet.position.set(U + 15.7, 1.5, 10.5); sheet.rotation.y = -Math.PI / 2; sheet.rotation.z = 0.05; group.add(sheet);
    // the key table, and the key
    const kt = makeTable(0.8, 0.8, 0.82); kt.position.set(keyPos.x, 0, keyPos.z); group.add(kt);
    field.addCircle(keyPos.x, keyPos.z, 0.55, 2);
    window_(U + 11, 1.8, 12.85, Math.PI); window_(U + 15.85, 1.8, 6.5, -Math.PI / 2);
    const mk = makeFlame(0xffaa44, 0.9, 6); mk.position.set(keyPos.x + 0.45, 0.95, keyPos.z); group.add(mk); flames.push(mk);
  }
  const gardenKey = makeKey('brass'); gardenKey.position.copy(keyPos); group.add(gardenKey);
  ctx.interactables.push({
    object: gardenKey, pos: keyPos.clone(), radius: 1.7, once: true, focusable: true, canUse: () => true,
    onUse: (state, c) => {
      group.remove(gardenKey);
      state.inventory.add('gardenkey');
      c.director.dismissGuardian('shriekHard');       // it was standing over the key
      c.director.setObjective('graveyard');
      c.director.armHunt(4);                          // the house is awake now
      c.audio.setTension(0.72);
    },
  });
  // the guardian beat: it is standing over the key when you come for it
  ctx.triggers.push({ x: U + 9.5, z: 6.5, r: 2.6, once: true, onEnter: (c) => {
    c.audio.whisper(keyPos);
    c.director.sentinelAt(keyPos.x - 0.6, keyPos.z - 0.4);
  } });
  // master door (closed; you open it)
  {
    const md = new THREE.Group(); md.position.set(U + 6, 0, 6.5); group.add(md);
    const mDoor = makeDoor(1.5, 2.15); mDoor.position.set(0, 0, -0.75); mDoor.rotation.y = Math.PI / 2; md.add(mDoor);
    const mdBlocker = field.addDynamicBox(U + 5.85, 5.75, U + 6.15, 7.25, 2);
    ctx.interactables.push({
      object: mDoor, pos: new THREE.Vector3(U + 6, 1.2, 6.5), radius: 2.0, focusable: true, canUse: () => true,
      onUse: (state, c) => {
        mDoor.userData.targetAngle = Math.PI * 0.58; mdBlocker.active = false;
        c.audio.doorCreak(new THREE.Vector3(U + 6, 1.2, 6.5));
      },
    });
    animated.push({ update: (dt) => { const ud = mDoor.userData; ud.angle += (ud.targetAngle - ud.angle) * Math.min(1, dt * 2.2); mDoor.rotation.y = Math.PI / 2 + ud.angle; } });
  }

  // nursery: crib, rocking horse that rocks, a music box you can wind
  {
    const nx = U - 11, nz = 7;
    const cribM = new THREE.MeshStandardMaterial({ color: 0x2a2118, roughness: 0.9 });
    const crib = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 0.65), cribM); base.position.y = 0.45; crib.add(base);
    for (const [ox, oz] of [[-0.52, -0.3], [0.52, -0.3], [-0.52, 0.3], [0.52, 0.3]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.95, 6), cribM); leg.position.set(ox, 0.48, oz); crib.add(leg);
    }
    for (let i = -4; i <= 4; i++) {
      for (const sz of [-1, 1]) { const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 4), cribM); bar.position.set(i * 0.12, 0.75, sz * 0.3); crib.add(bar); }
    }
    crib.position.set(nx, 0, nz + 2.2); group.add(crib); field.addBox(nx - 0.6, nz + 1.85, nx + 0.6, nz + 2.55, 2);
    // rocking horse — it is rocking when you come in; it stops when watched
    const horse = new THREE.Group();
    const hbody = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.4, 4, 8), cribM); hbody.rotation.z = Math.PI / 2; hbody.position.y = 0.55; horse.add(hbody);
    const hhead = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.24, 0.1), cribM); hhead.position.set(0.32, 0.78, 0); hhead.rotation.z = -0.4; horse.add(hhead);
    for (const sx of [-1, 1]) { const rocker = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.04), cribM); rocker.position.set(0, 0.08, sx * 0.12); rocker.rotation.z = 0.0; horse.add(rocker); }
    horse.position.set(nx - 2.2, 0, nz - 0.5); horse.rotation.y = 0.7; group.add(horse);
    field.addCircle(nx - 2.2, nz - 0.5, 0.5, 2);
    let horseRock = 1.0;   // eases to 0 once seen
    animated.push({ update: (dt, t, player) => {
      const dx2 = player.pos.x - (nx - 2.2), dz2 = player.pos.z - (nz - 0.5);
      const near = Math.hypot(dx2, dz2) < 7;
      const facing = (player.forward.x * -dx2 + player.forward.z * -dz2) < 0;   // looking toward it
      if (near && facing) horseRock = Math.max(0, horseRock - dt * 1.6);
      horse.rotation.x = Math.sin(t * 2.1) * 0.16 * horseRock;
    } });
    const smallBed = makeBed(); smallBed.scale.set(0.7, 0.8, 0.7); smallBed.position.set(nx - 3.4, 0, nz + 2.2); group.add(smallBed);
    field.addBox(nx - 3.9, nz + 1.5, nx - 2.9, nz + 2.9, 2);
    // the music box: winding it is optional — and it answers from the hall.
    const mbox = new THREE.Group();
    const mb = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.16, 0.2), new THREE.MeshStandardMaterial({ color: 0x3a2416, roughness: 0.5, metalness: 0.2 }));
    mb.position.y = 0.08; mbox.add(mb);
    const crank = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.1, 5), trimMat);
    crank.rotation.z = Math.PI / 2; crank.position.set(0.18, 0.1, 0); mbox.add(crank);
    const mtable = makeTable(0.7, 0.5, 0.7); mtable.position.set(nx + 2.6, 0, nz + 2.4); group.add(mtable);
    field.addCircle(nx + 2.6, nz + 2.4, 0.45, 2);
    mbox.position.set(nx + 2.6, 0.7, nz + 2.4); group.add(mbox);
    ctx.interactables.push({
      object: mbox, pos: new THREE.Vector3(nx + 2.6, 0.85, nz + 2.4), radius: 1.6, once: true, focusable: true, canUse: () => true,
      onUse: (state, c) => {
        c.audio.musicBox?.(new THREE.Vector3(nx + 2.6, 0.85, nz + 2.4));
        c.audio.hush(0.9);
        c.director._after(() => { c.director.behindYou(); }, 2600);
      },
    });
    window_(nx, 1.8, 12.85, Math.PI);
    const nc = makeFlame(0xd88a3a, 0.6, 5); nc.position.set(nx, 0.9, nz - 2); group.add(nc); flames.push(nc);
  }

  // sewing room: dress forms that turn to face you when unwatched
  {
    const sx0 = U - 11, sz0 = -7;
    const forms = [];
    for (let i = 0; i < 3; i++) {
      const fg = new THREE.Group();
      const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.5, 4, 8), new THREE.MeshStandardMaterial({ color: 0x4a4038, roughness: 1 }));
      torso.position.y = 1.15; fg.add(torso);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.85, 6), trimMat); pole.position.y = 0.45; fg.add(pole);
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.06, 8), trimMat); foot.position.y = 0.03; fg.add(foot);
      fg.position.set(sx0 - 2.5 + i * 2.3, 0, sz0 - 2 + (i % 2) * 1.4);
      fg.rotation.y = rand() * Math.PI * 2;
      group.add(fg); forms.push(fg);
      field.addCircle(fg.position.x, fg.position.z, 0.36, 2);
    }
    animated.push({ update: (dt, t, player) => {
      for (const f of forms) {
        const dx2 = player.pos.x - f.position.x, dz2 = player.pos.z - f.position.z;
        const d = Math.hypot(dx2, dz2);
        if (d > 12) continue;
        const facing = (player.forward.x * -dx2 + player.forward.z * -dz2) / (d || 1) > 0.5;
        if (!facing) {   // only move when you cannot see them
          const want = Math.atan2(dx2, dz2);
          let diff = ((want - f.rotation.y + Math.PI) % (Math.PI * 2)) - Math.PI;
          f.rotation.y += diff * Math.min(1, dt * 0.55);
        }
      }
    } });
    const table = makeTable(1.6, 0.9, 0.75); table.position.set(sx0 + 2.5, 0, sz0 + 2); group.add(table);
    field.addBox(sx0 + 1.7, sz0 + 1.55, sx0 + 3.3, sz0 + 2.45, 2);
    const sc2 = makeFlame(0xffaa44, 0.55, 5); sc2.position.set(sx0 + 2.5, 0.9, sz0 + 2); group.add(sc2); flames.push(sc2);
    window_(U - 15.85, 1.8, sz0, Math.PI / 2);
    ctx.triggers.push({ x: sx0, z: sz0, r: 3, once: true, onEnter: (c) => { c.audio.creak(new THREE.Vector3(sx0, 1.4, sz0 - 2)); } });
  }

  // linen room: shelves, a wash basin, a child's chair facing the corner
  {
    const lx = U + 11, lz = -7;
    for (let i = 0; i < 2; i++) { const sh = makeShelf(2.4); sh.position.set(lx + 2 + i * 1.9, 0, lz - 4.4); group.add(sh); field.addBox(lx + 1.4 + i * 1.9, lz - 4.8, lx + 2.6 + i * 1.9, lz - 4.0, 2); }
    const chair = makeChair(); chair.position.set(U + 15.2, 0, -11.2); chair.rotation.y = Math.PI * 0.78; group.add(chair);
    const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.28, 0.3, 10), new THREE.MeshStandardMaterial({ color: 0x777468, roughness: 0.4 }));
    basin.position.set(lx - 2, 0.5, lz); group.add(basin); field.addCircle(lx - 2, lz, 0.4, 2);
    ctx.triggers.push({ x: lx, z: lz, r: 3.2, once: true, onEnter: (c) => { c.director.hallucinate(U + 15.2, -11.2); } });
    window_(lx, 1.8, -11.85, 0);
  }

  // upstairs guidance: a cold draft of candles along the hall toward the master
  for (const [cx, cz] of [[U + 1.5, -1], [U + 4.5, -0.6], [U + 6.8, 3.4]]) {
    const f = makeFlame(0xc9dcff, 0.42, 4.2); f.position.set(cx, 0.35, cz); group.add(f); flames.push(f);
  }
  // ground-floor guidance: candles hint UP the stairs
  for (const [cx, cz] of [[-1.7, 6.4], [1.7, 5.2], [2.5, 2.0]]) {
    const f = makeFlame(0xc9dcff, 0.42, 4.2); f.position.set(cx, 0.35, cz); group.add(f); flames.push(f);
  }

  // upstairs scripted beats
  ctx.triggers.push({ x: U, z: 6, r: 2.4, once: true, onEnter: (c) => {
    // your first step onto the balcony: something crosses the hall BELOW you
    c.audio.footstep(new THREE.Vector3(U, UY, 8), 'dry');
    c.director._after(() => c.audio.footstep(new THREE.Vector3(U + 2, UY, 9), 'dry'), 380);
    c.director._after(() => c.audio.footstep(new THREE.Vector3(U + 3.5, UY, 10.5), 'dry'), 760);
    c.director._after(() => c.audio.slam(new THREE.Vector3(U, UY + 1.5, 13.2)), 1400);
    c.audio.bumpHeart(0.45, 92);
  } });
  ctx.triggers.push({ x: U - 3.5, z: -1, r: 2.2, once: true, onEnter: (c) => { c.director.peripheral(); } });

  // =========================================================================
  // shared: walls -> instanced meshes, flames -> pooled lights, nav grid
  // =========================================================================
  const wallMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), wallMat, wallXf.length);
  wallMesh.castShadow = true; wallMesh.receiveShadow = true;
  wallXf.forEach((w, i) => { P.set(w.x, w.y, w.z); S.set(w.sx, w.sy, w.sz); m4.compose(P, Q, S); wallMesh.setMatrixAt(i, m4); });
  wallMesh.instanceMatrix.needsUpdate = true; group.add(wallMesh);
  const wainMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), wainMat, wainXf.length);
  wainMesh.receiveShadow = true;
  wainXf.forEach((w, i) => { P.set(w.x, w.y, w.z); S.set(w.sx, w.sy, w.sz); m4.compose(P, Q, S); wainMesh.setMatrixAt(i, m4); });
  wainMesh.instanceMatrix.needsUpdate = true; group.add(wainMesh);

  // pool the candle lights (constant light count, no shader recompiles)
  const pooled = poolifyFlames(flames);
  const pool = makeFlamePool(9);
  group.add(pool);

  const zc = CFG.zones.house;
  const nav = new NavGrid(field, -17, -13, UX + 17, 15, 0.65, 0.4);

  function update(dt, t, player) {
    if (gardenKey.parent) { gardenKey.rotation.y += dt * 1.1; gardenKey.position.y = keyPos.y + Math.sin(t * 2) * 0.03; }
    const ud = gDoor.userData; ud.angle += (ud.targetAngle - ud.angle) * Math.min(1, dt * 2.0); gDoor.rotation.y = ud.angle;
    for (const a of animated) a.update(dt, t, player);
    updateFlamePool(pooled, pool.userData.poolLights, player.pos.x, player.pos.z, t);
  }

  return {
    name: 'house', group, field, flames: [],       // flames are pooled + driven here, not by main
    spawn: { x: 0, z: 11.5, yaw: 0 },              // just inside the front door, facing the hall + stairs
    fog: { color: zc.fog, density: zc.fogDensity },
    ambient: { color: zc.ambient, intensity: zc.ambientI },
    sky: zc.sky, update, groundAt, nav,
    surface: 'dry',
  };
}

// a chandelier: iron ring, chain, candle sprites (no own lights — the one real
// chandelier light is added by the hall)
function buildChandelier() {
  const g = new THREE.Group();
  const iron = new THREE.MeshStandardMaterial({ color: 0x0d0d0f, roughness: 0.5, metalness: 0.7 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.04, 6, 18), iron);
  ring.rotation.x = Math.PI / 2; g.add(ring);
  const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.6, 4), iron);
  chain.position.y = 0.8; g.add(chain);
  const dotTex = softDot('#ffcf87');
  for (let a = 0; a < 8; a++) {
    const cs = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTex, color: 0xffb24a, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    cs.position.set(Math.cos(a / 8 * Math.PI * 2) * 0.75, 0.12, Math.sin(a / 8 * Math.PI * 2) * 0.75);
    cs.scale.set(0.1, 0.17, 1); g.add(cs);
    const stub = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.024, 0.12, 5), iron);
    stub.position.set(Math.cos(a / 8 * Math.PI * 2) * 0.75, 0.02, Math.sin(a / 8 * Math.PI * 2) * 0.75); g.add(stub);
  }
  return g;
}
