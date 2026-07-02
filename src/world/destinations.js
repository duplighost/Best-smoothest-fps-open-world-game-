// Destination exteriors: every landmark on the island, its door (a glowing
// veil you walk through — no prompt, no key), its discovery ceremony, and
// the diegetic wayfinding: undefeated majors cast a tall beacon of their
// region's color; minors glimmer faintly. The world is the map.

import * as THREE from 'three';
import { DESTS, SPIRE } from './destdata.js';
import { terrainHeight } from './terrain.js';
import { REGIONS } from './regions.js';
import { G } from '../state.js';
import { mats, place, addCullable } from './props.js';
import { discover } from '../player/abilities.js';
import { sfx } from '../core/audio.js';
import { save } from '../core/save.js';
import { makeRng } from '../core/rng.js';

const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
const cyl = (r0, r1, h, seg, mat) => new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, seg), mat);
const cone = (r, h, seg, mat) => new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), mat);

export class Destinations {
  constructor(scene, collide) {
    this.scene = scene;
    this.collide = collide;
    this.doors = [];      // { x, z, r, dest }
    this.beacons = [];    // { mesh, dest }
    this.pickups = [];    // world shards on pedestals { x, y, z, mesh, id }
    this.time = 0;

    this._buildSpire();
    this._floatingIsles();
    for (const d of DESTS) {
      const g = new THREE.Group();
      g.position.set(d.x, d.y, d.z);
      scene.add(g);
      addCullable(g, d.x, d.z);   // fog wall = draw wall (beacons stay visible)
      const builder = this['_' + d.id];
      if (builder) builder.call(this, g, d);
      g.traverse((o) => { if (o.isMesh && o.castShadow === undefined) o.castShadow = true; });

      if (d.enter) this._door(g, d, g.userData.door);
      if (d.kind === 'major') this._beacon(d, 60, 1.6);
      else this._beacon(d, 22, 0.5);
    }
  }

  // ---------------------------------------------------------------- helpers
  _door(group, d, local) {
    local = local || { x: 0, z: 8, w: 1.6, h: 2.6 };
    local.w = local.w || 1.6; local.h = local.h || 2.6;
    // glowing veil in a frame, world-space trigger
    const m = mats();
    const veil = new THREE.Mesh(
      new THREE.PlaneGeometry(local.w, local.h),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(...REGIONS[d.region].key), transparent: true, opacity: 0.35,
        blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false, fog: false,
      })
    );
    veil.position.set(local.x, local.h / 2, local.z);
    if (local.ry) veil.rotation.y = local.ry;
    group.add(veil);
    const wx = d.x + local.x, wz = d.z + local.z; // rotation of group is 0 for all
    this.doors.push({ x: wx, z: wz, r: 1.2, dest: d, veil });
  }

  _beacon(d, height, radius) {
    const geo = new THREE.CylinderGeometry(radius * 0.4, radius, height, 8, 1, true);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(...REGIONS[d.region].key), transparent: true, opacity: 0.16,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false, fog: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(d.x, d.y + height / 2 + 4, d.z);
    this.scene.add(mesh);
    this.beacons.push({ mesh, dest: d });
  }

  _shardPedestal(g, d, lx, lz) {
    if (G.save.found?.['shard-' + d.id]) return;
    place(this.scene, this.collide, 'pedestal', d.x + lx, d.y, d.z + lz, 0);
    const m = mats();
    const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), m.crystal.clone());
    shard.material.emissive = new THREE.Color(0.3, 0.9, 0.5);
    shard.material.color = new THREE.Color(0.5, 1, 0.6);
    shard.position.set(d.x + lx, d.y + 1.55, d.z + lz);
    this.scene.add(shard);
    this.pickups.push({ x: d.x + lx, y: d.y + 1.55, z: d.z + lz, mesh: shard, id: 'shard-' + d.id });
  }

  _ruinWall(g, x, z, w, h, rot, mat) {
    const wall = box(w, h, 0.6, mat);
    wall.position.set(x, h / 2, z);
    wall.rotation.y = rot;
    g.add(wall);
    const hw = (Math.abs(Math.cos(rot)) * w + Math.abs(Math.sin(rot)) * 0.6) / 2;
    const hd = (Math.abs(Math.cos(rot)) * 0.6 + Math.abs(Math.sin(rot)) * w) / 2;
    this.collide.addBox(g.position.x + x - hw, g.position.z + z - hd, g.position.x + x + hw, g.position.z + z + hd, g.position.y, g.position.y + h);
  }

  // Building shell with a doorway gap on +z side; interiors live elsewhere,
  // the shell is what you see outside.
  _shell(g, d, w, h, depth, mat, opts = {}) {
    const t = 0.5;
    const doorW = 2.0;
    const zf = depth / 2;
    // back, left, right
    this._solid(g, 0, h / 2, -zf, w, h, t, mat);
    this._solid(g, -w / 2, h / 2, 0, t, h, depth, mat);
    this._solid(g, w / 2, h / 2, 0, t, h, depth, mat);
    // front with door gap
    const side = (w - doorW) / 2;
    this._solid(g, -(doorW / 2 + side / 2), h / 2, zf, side, h, t, mat);
    this._solid(g, (doorW / 2 + side / 2), h / 2, zf, side, h, t, mat);
    this._solid(g, 0, h - 0.4, zf, doorW + 0.2, 0.8, t, mat); // lintel
    if (!opts.noRoof) {
      const roof = cone(Math.max(w, depth) * 0.78, h * 0.55, 4, mats().woodDark);
      roof.rotation.y = Math.PI / 4;
      roof.position.y = h + h * 0.27;
      g.add(roof);
    }
  }

  _solid(g, x, y, z, w, h, d, mat) {
    const b = box(w, h, d, mat);
    b.position.set(x, y, z);
    g.add(b);
    this.collide.addBox(
      g.position.x + x - w / 2, g.position.z + z - d / 2,
      g.position.x + x + w / 2, g.position.z + z + d / 2,
      g.position.y + y - h / 2, g.position.y + y + h / 2
    );
  }

  // Floating isles over the Shatter — a playground for grapple/wings, each
  // crowned with breakable crystals worth the climb.
  _floatingIsles() {
    const rng = makeRng(909);
    const rock = new THREE.MeshStandardMaterial({ color: 0x4e4260, roughness: 1, flatShading: true });
    this.isles = [];
    const spots = [[260, -300, 10], [360, -330, 14], [420, -420, 12], [250, -470, 16], [330, -520, 11]];
    for (const [x, z, lift] of spots) {
      const y = terrainHeight(x, z) + lift;
      const g = new THREE.Group();
      g.position.set(x, y, z);
      const body = new THREE.Mesh(new THREE.IcosahedronGeometry(4.2, 1), rock);
      body.scale.set(1, 0.55, 1);
      body.position.y = -1.9;
      const under = new THREE.Mesh(new THREE.ConeGeometry(2.6, 4.5, 6), rock);
      under.rotation.x = Math.PI;
      under.position.y = -5.2;
      g.add(body, under);
      this.scene.add(g);
      addCullable(g, x, z);
      // landable top + solid core
      this.collide.addBox(x - 3.4, z - 3.4, x + 3.4, z + 3.4, y - 2.4, y, { standable: true });
      place(this.scene, this.collide, 'crystal', x + (rng() * 2 - 1) * 1.6, y, z + (rng() * 2 - 1) * 1.6, rng() * 3, { moteChance: 0.8 });
      this.isles.push({ g, baseY: y, phase: rng() * Math.PI * 2 });
    }
  }

  // ---------------------------------------------------------------- spire
  _buildSpire() {
    const g = new THREE.Group();
    g.position.set(SPIRE.x, SPIRE.y, SPIRE.z);
    this.scene.add(g);
    const m = mats();
    const spireMat = new THREE.MeshStandardMaterial({ color: 0x9aa8c8, emissive: 0x3355aa, emissiveIntensity: 0.25, roughness: 0.4, flatShading: true });
    const body = cyl(1.2, 3.4, 26, 6, spireMat);
    body.position.y = 13;
    const tip = cone(1.2, 5, 6, spireMat);
    tip.position.y = 28.5;
    g.add(body, tip);
    this.collide.addCircle(SPIRE.x, SPIRE.z, 3.4, SPIRE.y, SPIRE.y + 26);
    // orbiting shards
    this.spireShards = [];
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(new THREE.OctahedronGeometry(0.5), spireMat);
      g.add(s);
      this.spireShards.push(s);
    }
    // ring of lanterns — home reads warm from anywhere
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      place(this.scene, this.collide, 'lanternPost', SPIRE.x + Math.cos(a) * 12, SPIRE.y, SPIRE.z + Math.sin(a) * 12, -a);
    }
    place(this.scene, this.collide, 'campfire', SPIRE.x + 6, SPIRE.y, SPIRE.z + 4, 0);
    place(this.scene, this.collide, 'bench', SPIRE.x + 7.5, SPIRE.y, SPIRE.z + 5.5, 2.4);
  }

  // ---------------------------------------------------------------- vale
  _mill(g, d) {
    g.userData.door = { x: 0, z: 5.15, w: 1.8, h: 2.8 };
    const m = mats();
    const stone = m.stone;
    const tower = cyl(4.2, 5.0, 11, 9, stone);
    tower.position.y = 5.5;
    g.add(tower);
    this.collide.addCircle(d.x, d.z, 4.8, d.y, d.y + 11);
    const roof = cone(5.2, 3.4, 9, m.woodDark);
    roof.position.y = 12.6;
    g.add(roof);
    // sails, still slowly turning
    this.millSails = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const sail = box(0.55, 7.6, 0.12, m.wood);
      sail.position.y = 3.8;
      const holder = new THREE.Group();
      holder.rotation.z = (i / 4) * Math.PI * 2;
      holder.add(sail);
      this.millSails.add(holder);
    }
    this.millSails.position.set(0, 11.2, 5.4);
    g.add(this.millSails);
    // door porch
    const porch = box(3, 0.3, 4, m.wood);
    porch.position.set(0, 0.15, 6.5);
    g.add(porch);
    for (let i = -1; i <= 1; i += 2) {
      place(this.scene, this.collide, 'lanternPost', d.x + i * 2, d.y, d.z + 8.5, 0);
      place(this.scene, this.collide, 'crate', d.x + i * 3.2, d.y, d.z + 4.5, i);
    }
  }

  _hollowtree(g, d) {
    g.userData.door = { x: 0, z: 3.9, w: 1.4, h: 2.4 };
    const m = mats();
    const bark = new THREE.MeshStandardMaterial({ color: 0x5a4330, roughness: 1, flatShading: true });
    const trunk = cyl(3.2, 4.4, 12, 9, bark);
    trunk.position.y = 6;
    g.add(trunk);
    this.collide.addCircle(d.x, d.z, 4.0, d.y, d.y + 12);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x4e7a34, roughness: 1, flatShading: true });
    for (const [ox, oy, oz, s] of [[0, 13, 0, 5.5], [3.5, 11.5, 1, 3.2], [-3, 12, -2, 3.6], [1, 15, -3, 3]]) {
      const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(s, 1), canopyMat);
      puff.position.set(ox, oy, oz);
      g.add(puff);
    }
    // little round window with warm light
    const win = new THREE.Mesh(new THREE.CircleGeometry(0.5, 12), new THREE.MeshBasicMaterial({ color: 0xffc878, fog: false }));
    win.position.set(2.2, 4.2, 3.4);
    win.lookAt(d.x + 8, d.y + 5, d.z + 10);
    g.add(win);
  }

  _belltower(g, d) {
    g.userData.door = { x: 0, z: 3.0, w: 1.8, h: 2.6 };
    const m = mats();
    this._shell(g, d, 6, 9, 6, m.stone, { noRoof: true });
    const bellhouse = box(7, 2.6, 7, m.woodDark);
    bellhouse.position.y = 10.3;
    g.add(bellhouse);
    const bell = cone(1.0, 1.6, 8, m.iron);
    bell.position.y = 9.6;
    g.add(bell);
    this.bell = { x: d.x, y: d.y + 9.6, z: d.z, lastRung: -9 };
  }

  // ---------------------------------------------------------------- ember
  _forge(g, d) {
    g.userData.door = { x: 0, z: 7.0, w: 2.0, h: 2.8 };
    const m = mats();
    const black = new THREE.MeshStandardMaterial({ color: 0x1c1310, roughness: 0.9, flatShading: true });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(7, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), black);
    g.add(dome);
    this.collide.addCircle(d.x, d.z, 6.6, d.y, d.y + 7);
    for (const [ox, oz, h] of [[-4, -3, 9], [3.5, -4, 11], [0, -6, 8]]) {
      const chim = cyl(0.7, 1.0, h, 6, black);
      chim.position.set(ox, h / 2, oz);
      g.add(chim);
      this.collide.addCircle(d.x + ox, d.z + oz, 1.0, d.y, d.y + h);
    }
    // rivers of light in the ground
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xff6a20, fog: false });
    for (let i = 0; i < 4; i++) {
      const seam = box(0.5, 0.06, 6 + i * 2, glowMat);
      seam.position.set(-6 + i * 4, 0.04, 6);
      seam.rotation.y = (i - 1.5) * 0.3;
      g.add(seam);
    }
    // door is a dark arch in the dome front
    const arch = box(2.4, 3.2, 1.2, black);
    arch.position.set(0, 1.6, 6.6);
    g.add(arch);
  }

  _pyramid(g, d) {
    g.userData.door = { x: 0, z: 8.5, w: 1.8, h: 2.6 };
    const m = mats();
    const sand = new THREE.MeshStandardMaterial({ color: 0x8a5c30, roughness: 1, flatShading: true });
    const pyr = cone(10, 9, 4, sand);
    pyr.rotation.y = Math.PI / 4;
    pyr.position.y = 2.2; // half-buried
    g.add(pyr);
    this.collide.addCircle(d.x, d.z, 7, d.y, d.y + 8);
    const doorway = box(2.2, 3, 2.4, new THREE.MeshStandardMaterial({ color: 0x241505, roughness: 1 }));
    doorway.position.set(0, 1.5, 7.2);
    g.add(doorway);
  }

  _caravan(g, d) {
    // a glass-merchant's caravan, stopped forever — tableau + shard
    place(this.scene, this.collide, 'cart', d.x - 2, d.y, d.z, 0.4);
    place(this.scene, this.collide, 'cart', d.x + 3, d.y, d.z + 2, -0.8);
    place(this.scene, this.collide, 'campfire', d.x, d.y, d.z + 4, 0);
    for (let i = 0; i < 5; i++) {
      place(this.scene, this.collide, 'pot', d.x - 4 + i * 1.7, d.y, d.z - 3 + (i % 2), 0, { moteChance: 0.5 });
    }
    place(this.scene, this.collide, 'skeleton', d.x + 1.2, d.y, d.z + 3.2, 2.2, { shadow: false });
    this._shardPedestal(g, d, 0, -6);
  }

  // ---------------------------------------------------------------- frost
  _lighthouse(g, d) {
    g.userData.door = { x: 0, z: 3.0, w: 1.5, h: 2.5 };
    const white = new THREE.MeshStandardMaterial({ color: 0xdfe8ee, roughness: 0.8, flatShading: true });
    const red = new THREE.MeshStandardMaterial({ color: 0xb03838, roughness: 0.8, flatShading: true });
    for (let i = 0; i < 5; i++) {
      const seg = cyl(2.6 - i * 0.22, 2.8 - i * 0.22, 3.6, 10, i % 2 ? red : white);
      seg.position.y = 1.8 + i * 3.6;
      g.add(seg);
    }
    this.collide.addCircle(d.x, d.z, 2.8, d.y, d.y + 18);
    const lampHouse = cyl(1.9, 1.9, 2.4, 8, mats().iron);
    lampHouse.position.y = 19.4;
    g.add(lampHouse);
    this.lampLight = new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfff2c0, fog: false }));
    this.lampLight.position.set(d.x, d.y + 19.4, d.z);
    this.scene.add(this.lampLight);
    addCullable(this.lampLight, d.x, d.z);
    // ice shards around the base
    const rng = makeRng(88);
    for (let i = 0; i < 7; i++) {
      const a = rng() * Math.PI * 2;
      place(this.scene, this.collide, 'crystal', d.x + Math.cos(a) * (5 + rng() * 4), d.y, d.z + Math.sin(a) * (5 + rng() * 4), rng() * 3, { moteChance: 0.4 });
    }
  }

  _fisher(g, d) {
    g.userData.door = { x: 0, z: 2.6, w: 1.6, h: 2.4 };
    const m = mats();
    this._shell(g, d, 5, 3.2, 5, m.woodDark);
    // hole in the ice with a line still set
    const hole = new THREE.Mesh(new THREE.CircleGeometry(0.9, 10), new THREE.MeshBasicMaterial({ color: 0x0a2030, fog: false }));
    hole.rotation.x = -Math.PI / 2;
    hole.position.set(4.5, 0.06, 3);
    g.add(hole);
    const rod = box(0.05, 0.05, 2.2, m.woodDark);
    rod.position.set(3.6, 0.6, 2.4);
    rod.rotation.z = 0.4;
    g.add(rod);
  }

  _howlstone(g, d) {
    // standing stones that sing in the wind — shard in the middle
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x6a7888, roughness: 1, flatShading: true });
    const rng = makeRng(31);
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const h = 3.4 + rng() * 2.2;
      const stone = box(1.1 + rng() * 0.5, h, 0.8, stoneMat);
      stone.position.set(Math.cos(a) * 6.5, h / 2 - 0.3, Math.sin(a) * 6.5);
      stone.rotation.y = a + rng() * 0.3;
      stone.rotation.z = (rng() - 0.5) * 0.14;
      g.add(stone);
      this.collide.addCircle(d.x + Math.cos(a) * 6.5, d.z + Math.sin(a) * 6.5, 0.9, d.y, d.y + h);
    }
    this._shardPedestal(g, d, 0, 0);
  }

  // ---------------------------------------------------------------- mycel
  _chapel(g, d) {
    g.userData.door = { x: 0, z: 7.1, w: 2.0, h: 3.0 };
    const m = mats();
    const mossStone = new THREE.MeshStandardMaterial({ color: 0x4a5a48, roughness: 1, flatShading: true });
    this._shell(g, d, 9, 7, 14, mossStone, { noRoof: true });
    // collapsed pitched roof
    const roofL = box(5.4, 0.4, 15, m.woodDark);
    roofL.position.set(-2.4, 7.8, 0);
    roofL.rotation.z = 0.5;
    g.add(roofL);
    // spire, leaning
    const spike = cone(1.2, 5, 6, mossStone);
    spike.position.set(0, 10.4, -5);
    spike.rotation.x = 0.12;
    g.add(spike);
    // sunken approach: stepping stones through the marsh water
    for (let i = 0; i < 4; i++) {
      const step = cyl(0.9, 1.1, 0.5, 7, mossStone);
      step.position.set(0, -0.15 - 0.02 * i, 8.5 + i * 2.2);
      g.add(step);
    }
  }

  _capcottage(g, d) {
    g.userData.door = { x: 0, z: 4.0, w: 1.5, h: 2.4 };
    // a cottage inside a giant mushroom
    const stemMat = new THREE.MeshStandardMaterial({ color: 0xcfc0a0, roughness: 1, flatShading: true });
    const capMat = new THREE.MeshStandardMaterial({ color: 0x8c4a6a, emissive: 0x36122a, emissiveIntensity: 0.4, roughness: 1, flatShading: true });
    const stem = cyl(3.4, 4.2, 6, 9, stemMat);
    stem.position.y = 3;
    g.add(stem);
    this.collide.addCircle(d.x, d.z, 3.9, d.y, d.y + 6);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(7, 12, 7, 0, Math.PI * 2, 0, Math.PI / 2.4), capMat);
    cap.position.y = 5.6;
    cap.scale.y = 0.62;
    g.add(cap);
    const win = new THREE.Mesh(new THREE.CircleGeometry(0.45, 10), new THREE.MeshBasicMaterial({ color: 0x9fffd8, fog: false }));
    win.position.set(-2.4, 3.4, 2.9);
    win.lookAt(d.x - 6, d.y + 3.5, d.z + 8);
    g.add(win);
  }

  _stillpool(g, d) {
    // a perfect circle of water that does not ripple; offerings at the rim
    const rim = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.5, 8, 22), new THREE.MeshStandardMaterial({ color: 0x3c4a44, roughness: 1, flatShading: true }));
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.2;
    g.add(rim);
    const pool = new THREE.Mesh(new THREE.CircleGeometry(4.1, 24), new THREE.MeshBasicMaterial({ color: 0x0e2e2a, fog: false }));
    pool.rotation.x = -Math.PI / 2;
    pool.position.y = 0.24;
    g.add(pool);
    const rng = makeRng(55);
    for (let i = 0; i < 6; i++) {
      const a = rng() * Math.PI * 2;
      place(this.scene, this.collide, i % 2 ? 'candle' : 'pot', d.x + Math.cos(a) * 5.4, d.y, d.z + Math.sin(a) * 5.4, 0, { moteChance: 0.5 });
    }
    this._shardPedestal(g, d, 0, -7);
  }

  // ---------------------------------------------------------------- shatter
  _tower(g, d) {
    g.userData.door = { x: 0, z: 2.6, w: 1.5, h: 2.6 };
    // the Inverted Tower — wider at the top, hanging over its own door
    const ruin = new THREE.MeshStandardMaterial({ color: 0x574a68, roughness: 1, flatShading: true });
    for (let i = 0; i < 5; i++) {
      const seg = cyl(2.2 + i * 0.75, 2.0 + i * 0.75, 4.4, 8, ruin);
      seg.position.y = 2.2 + i * 4.4;
      seg.rotation.y = i * 0.2;
      g.add(seg);
    }
    this.collide.addCircle(d.x, d.z, 2.6, d.y, d.y + 24);
    // floating fragments orbiting the top
    this.towerBits = [];
    for (let i = 0; i < 6; i++) {
      const bit = new THREE.Mesh(new THREE.OctahedronGeometry(0.7 + (i % 3) * 0.3), ruin);
      this.scene.add(bit);
      addCullable(bit, d.x, d.z);
      this.towerBits.push({ mesh: bit, a: (i / 6) * Math.PI * 2, r: 7 + (i % 3) * 2, y: d.y + 20 + (i % 2) * 3, d });
    }
  }

  _observatory(g, d) {
    g.userData.door = { x: 0, z: 4.1, w: 1.8, h: 2.6 };
    const m = mats();
    const stoneP = new THREE.MeshStandardMaterial({ color: 0x5c5470, roughness: 1, flatShading: true });
    this._shell(g, d, 8, 4.5, 8, stoneP, { noRoof: true });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(4.6, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), stoneP);
    dome.position.y = 4.5;
    g.add(dome);
    // the slit, glowing faint violet — still watching something
    const slit = box(0.7, 4.4, 0.2, new THREE.MeshBasicMaterial({ color: 0xb090ff, fog: false }));
    slit.position.set(0, 6.2, 3.4);
    slit.rotation.x = -0.5;
    g.add(slit);
  }

  _stairs(g, d) {
    // a staircase climbing into empty air, then nothing
    const ruin = new THREE.MeshStandardMaterial({ color: 0x5f5372, roughness: 1, flatShading: true });
    for (let i = 0; i < 14; i++) {
      const step = box(2.4, 0.5, 1.1, ruin);
      const y = i * 0.62, z = -i * 1.0;
      step.position.set(0, y + 0.25, z);
      g.add(step);
      this.collide.addBox(d.x - 1.2, d.z + z - 0.55, d.x + 1.2, d.z + z + 0.55, d.y, d.y + y + 0.5, { standable: true });
    }
    this._shardPedestal(g, d, 0, -16);
    // the pedestal floats where the stairs would have arrived
    const last = this.pickups[this.pickups.length - 1];
    if (last && last.id === 'shard-' + d.id) {
      last.y = d.y + 9.2;
      last.mesh.position.y = d.y + 9.2;
    }
  }

  // ---------------------------------------------------------------- update
  update(dt, t, px, pz) {
    this.time = t;

    // spire shards orbit
    if (this.spireShards) {
      for (let i = 0; i < this.spireShards.length; i++) {
        const s = this.spireShards[i];
        const a = t * 0.3 + (i / this.spireShards.length) * Math.PI * 2;
        s.position.set(Math.cos(a) * 5.5, 17 + Math.sin(t * 0.7 + i) * 1.4, Math.sin(a) * 5.5);
        s.rotation.y = t + i;
      }
    }
    if (this.millSails) this.millSails.rotation.z = t * 0.24;
    if (this.lampLight) this.lampLight.material.color.setHSL(0.13, 0.6, 0.6 + Math.sin(t * 0.8) * 0.25);
    if (this.towerBits) {
      for (const b of this.towerBits) {
        b.a += dt * 0.25;
        b.mesh.position.set(b.d.x + Math.cos(b.a) * b.r, b.y + Math.sin(t * 0.6 + b.a * 2) * 0.8, b.d.z + Math.sin(b.a) * b.r);
        b.mesh.rotation.y += dt * 0.5;
      }
    }

    // beacons: shimmer; majors go dark once their boss is down, minors once found
    for (const b of this.beacons) {
      const done = b.dest.kind === 'major'
        ? G.save.bossesDown[b.dest.boss]
        : (b.dest.enter ? G.save.entered[b.dest.id] : G.save.found['shard-' + b.dest.id]);
      b.mesh.visible = !done;
      if (b.mesh.visible) b.mesh.material.opacity = 0.1 + Math.sin(t * 1.3 + b.dest.x) * 0.05 + 0.06;
    }

    // door veils pulse; return a dest if the player walks through
    let entering = null;
    for (const door of this.doors) {
      const d2 = (door.x - px) ** 2 + (door.z - pz) ** 2;
      door.veil.material.opacity = 0.25 + Math.sin(t * 2.2) * 0.1 + (d2 < 36 ? 0.25 : 0);
      if (d2 < door.r * door.r) entering = door.dest;
    }

    // discovery ceremony
    for (const d of DESTS) {
      if (!G.save.found[d.id] && (d.x - px) ** 2 + (d.z - pz) ** 2 < 22 * 22) discover(d);
    }

    // world shards on pedestals
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const p = this.pickups[i];
      p.mesh.rotation.y = t * 1.4;
      p.mesh.position.y = p.y + Math.sin(t * 2) * 0.12;
      const pl = G.player;
      if (pl && Math.hypot(pl.pos.x - p.x, pl.pos.y + 1 - p.y, pl.pos.z - p.z) < 1.5) {
        p.mesh.removeFromParent();
        this.pickups.splice(i, 1);
        G.save.found[p.id] = true;
        save();
        G.onShardCollected?.();
      }
    }

    return entering;
  }
}
