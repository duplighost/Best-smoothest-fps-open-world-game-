// The insides. One entry per enterable destination. Every interior tells a
// little of the island's story with objects, not words: who worked here,
// what they loved, and what the shattering interrupted.

import * as THREE from 'three';
import { mats } from '../world/props.js';

const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
const cyl = (r0, r1, h, seg, mat) => new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, seg), mat);
const glowMat = (color) => new THREE.MeshBasicMaterial({ color, fog: false });

export const INTERIORS = {

  // ---------------------------------------------------------- VERDANT VALE
  mill: {
    fog: [0.10, 0.09, 0.06], fogDensity: 0.028, sun: 0.35, hemiIntensity: 0.5, hemiColor: [0.9, 0.8, 0.6],
    spawn: { x: 0, z: 9, yaw: 0 }, doorOutZ: 7.0,
    bossAt: { x: 0, z: -4 }, bossWake: 9, packTrigger: 7,
    build(c) {
      const m = mats();
      c.room(22, 22, 10, { floor: m.wood, wall: m.stone });
      // the great gears, still slowly turning
      c._gears = [];
      for (const [x, z, r, y] of [[-7, -7, 2.6, 1.2], [-4.4, -7, 1.7, 2.2], [7, -6, 2.2, 1.6]]) {
        const gear = cyl(r, r, 0.5, 9, m.woodDark);
        gear.rotation.x = Math.PI / 2;
        gear.position.set(x, y, z);
        c.scene.add(gear);
        for (let t = 0; t < 6; t++) {
          const tooth = box(0.4, 0.5, 0.5, m.woodDark);
          tooth.position.set(Math.cos(t / 6 * Math.PI * 2) * r, Math.sin(t / 6 * Math.PI * 2) * r, 0);
          gear.add(tooth);
        }
        c._gears.push(gear);
      }
      // center shaft
      c.pillar(0, 0, 0.7, 10);
      // flour sacks, crates, the miller's corner
      c.place('crate', -8, 6, 0.3).place('crate', -7, 7.4, 1.1).place('crate', -6.4, 5.8, 0.7);
      c.place('table', 7.5, 7, -0.4).place('chair', 6.5, 6, 1.8);
      c.place('pot', 8.6, 5.6, 0, { moteChance: 0.5 });
      c.place('candle', 7.5, 7, 0, { y: 0.83 });
      c.loft(-7, 2, 6, 5, 3.4, { stairsFrom: [-3, 6] });
      c.place('lanternPost', 4, 8, 0).place('lanternPost', -4, 8, 0);
      c.mural(0, 2.2, -10.7, 0, 'arrival', 4, 2.6);
      c.light(0, 6, 0, [1, 0.85, 0.6], 1.2);
    },
    update(c, dt) {
      for (const g of c._gears) g.rotation.z += dt * 0.4;
    },
  },

  hollowtree: {
    fog: [0.06, 0.05, 0.03], fogDensity: 0.04, sun: 0.15, hemiIntensity: 0.5, hemiColor: [0.95, 0.8, 0.55],
    spawn: { x: 0, z: 3.6, yaw: 0 }, doorOutZ: 5.6, packTrigger: 3,
    build(c) {
      const m = mats();
      const bark = new THREE.MeshStandardMaterial({ color: 0x54402c, roughness: 1, flatShading: true });
      c.room(9, 9, 5.5, { floor: m.wood, wall: bark });
      // someone small lived here, and left in a hurry
      c.place('bed', -2.8, -2.6, 0.4);
      c.place('table', 1.8, -2.4, 0).place('chair', 1.2, -1.2, 2.6).place('chair', 2.8, -3.4, -0.5);
      c.place('shelf', 3.6, 0.8, -Math.PI / 2);
      c.place('pot', -3.4, 1.8, 0, { moteChance: 0.6 }).place('pot', 3.2, 3.2, 0, { moteChance: 0.6 });
      c.place('candle', 1.8, -2.4, 0, { y: 0.83 }).place('candle', -3.5, -1.5, 0);
      // a second, tiny bed — sized for something smaller than a person
      const tiny = box(0.5, 0.18, 0.8, m.cloth);
      tiny.position.set(2.2, 0.1, 2.6);
      c.scene.add(tiny);
      c.mural(-4.2, 1.8, 0, Math.PI / 2, 'arrival', 2.4, 1.6);
      c.shard(0, -0.5);
      c.pack('hopper', 3, 0, -1.5, 3);
      c.light(0, 3.4, 0, [1, 0.75, 0.45], 1.0);
    },
  },

  belltower: {
    fog: [0.05, 0.05, 0.07], fogDensity: 0.03, sun: 0.55, hemiIntensity: 0.62,
    spawn: { x: 0, z: 1.6, yaw: 0 }, doorOutZ: 4.6, packTrigger: 2,
    build(c) {
      const m = mats();
      c.room(7, 7, 13, { floor: m.stone, wall: m.stone });
      // climb the scaffolding to the bell
      c.loft(-2.2, -2.2, 2.6, 2.6, 2.6);
      c.loft(2.2, -2.2, 2.6, 2.6, 5.2);
      c.loft(2.2, 2.2, 2.6, 2.6, 7.8);
      c.loft(-2.2, 2.2, 2.6, 2.6, 10.4);
      const bell = new THREE.Mesh(new THREE.ConeGeometry(1.0, 1.5, 8), m.iron);
      bell.position.set(0, 11.6, 0);
      c.scene.add(bell);
      c._bell = bell;
      c.shard(-2.2, 2.2, 10.4); // on the top loft — climb for it
      c.pack('puff', 4, 0, 0, 2.5);
      c.mural(0, 1.8, -3.2, 0, 'spire', 2.2, 1.5);
      c.light(0, 11.5, 0, [0.8, 0.9, 1], 0.9);
      c.light(0, 2.8, 0, [1, 0.8, 0.55], 0.85);       // the fight floor is lit, not guessed at
      c.light(2.2, 6.4, -2.2, [0.85, 0.9, 1], 0.6);   // mid-climb waypoint
    },
    update(c, dt, t) {
      c._bell.rotation.z = Math.sin(t * 0.7) * 0.04;
    },
  },

  // ---------------------------------------------------------- EMBER FLATS
  forge: {
    fog: [0.10, 0.04, 0.02], fogDensity: 0.030, sun: 0.1, hemiIntensity: 0.4, hemiColor: [1, 0.5, 0.3],
    spawn: { x: 0, z: 8, yaw: 0 }, doorOutZ: 8.7,
    bossAt: { x: 0, z: -4 }, bossWake: 9,
    build(c) {
      const m = mats();
      const black = new THREE.MeshStandardMaterial({ color: 0x181210, roughness: 0.95, flatShading: true });
      c.room(20, 20, 9, { floor: black, wall: black });
      // rivers of light crossing the floor
      for (const [x, z, w, d] of [[0, 0, 1.2, 18], [-5, -2, 9, 1.0], [5, 3, 8, 1.0]]) {
        const seam = box(w, 0.08, d, glowMat(0xff5a14));
        seam.position.set(x, 0.06, z);
        c.scene.add(seam);
      }
      // anvils and quenching pots
      for (const [x, z] of [[-6, 4], [6, -1], [-5.4, -5]]) {
        const anvil = box(1.2, 0.8, 0.5, m.iron);
        anvil.position.set(x, 0.4, z);
        c.scene.add(anvil);
        c.collide.addBox(x - 0.6, z - 0.25, x + 0.6, z + 0.25, 0, 0.8, { standable: true });
      }
      c.place('barrel', -7.5, 6.5, 0).place('barrel', -8.2, 5.2, 0.8, { moteChance: 0.5 });
      c.place('pot', 7.6, 6.8, 0, { moteChance: 0.5 }).place('pot', 8.3, 5.8, 0);
      // half-finished blades racked on the wall — the work never ended
      for (let i = 0; i < 5; i++) {
        const blade = box(0.12, 1.6, 0.05, m.iron);
        blade.position.set(-9.6, 1.6, -2 + i * 1.1);
        blade.rotation.z = 0.06 * (i % 2 ? 1 : -1);
        c.scene.add(blade);
      }
      c.mural(0, 2.4, -9.7, 0, 'shatter', 4, 2.6);
      c.light(0, 3, 0, [1, 0.4, 0.12], 1.6);
      c.light(-5, 1, -2, [1, 0.35, 0.1], 1.0);
    },
  },

  pyramid: {
    fog: [0.07, 0.05, 0.02], fogDensity: 0.05, sun: 0.05, hemiIntensity: 0.35, hemiColor: [1, 0.7, 0.4],
    spawn: { x: 0, z: 4.6, yaw: 0 }, doorOutZ: 10.2, packTrigger: 3,
    build(c) {
      const m = mats();
      const sand = new THREE.MeshStandardMaterial({ color: 0x6a4826, roughness: 1, flatShading: true });
      c.room(13, 11, 5.5, { floor: sand, wall: sand });
      // the sleeper's box — untouched, ringed by offerings
      const sarc = box(1.4, 1.1, 3.0, m.stone);
      sarc.position.set(0, 0.55, -2.4);
      c.scene.add(sarc);
      c.collide.addBox(-0.7, -3.9, 0.7, -0.9, 0, 1.1, { standable: true });
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        c.place('pot', Math.cos(a) * 3.4, -2.4 + Math.sin(a) * 3.0, a, { moteChance: 0.7 });
      }
      c.place('candle', -1.4, -0.8, 0).place('candle', 1.4, -0.8, 0);
      c.mural(-6.2, 1.8, 0, Math.PI / 2, 'spire', 2.6, 1.8);
      c.mural(6.2, 1.8, 0, -Math.PI / 2, 'shatter', 2.6, 1.8);
      c.shard(0, -4.6);
      c.pack('hound', 2, 0, 1, 3).pack('turret', 1, -4, -2, 1);
      c.light(0, 2, -2.4, [1, 0.6, 0.25], 0.9);
    },
  },

  // ---------------------------------------------------------- FROSTMERE
  lighthouse: {
    fog: [0.06, 0.08, 0.11], fogDensity: 0.026, sun: 0.42, hemiIntensity: 0.66, hemiColor: [0.75, 0.88, 1],
    spawn: { x: 0, z: 4.8, yaw: 0 }, doorOutZ: 4.6,
    bossAt: { x: 0, z: -2 }, bossWake: 8,
    build(c) {
      const m = mats();
      const ice = new THREE.MeshStandardMaterial({ color: 0xbfd8e8, roughness: 0.25, flatShading: true });
      c.room(14, 14, 11, { floor: ice, wall: m.stone });
      // the lamp mechanism, fallen through from above, frozen mid-spill
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(1.2, 10, 8), glowMat(0xfff0c0));
      lamp.position.set(3.5, 1.2, -3.5);
      c.scene.add(lamp);
      c.collide.addCircle(3.5, -3.5, 1.3, 0, 2.4);
      const gearRing = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.3, 8, 18), m.iron);
      gearRing.rotation.x = Math.PI / 2.3;
      gearRing.position.set(3.5, 0.6, -3.5);
      c.scene.add(gearRing);
      // ice stalagmites
      for (const [x, z, s] of [[-4, -4, 1.4], [-5.5, 1, 1.0], [4.5, 3, 1.2], [-2, 4.5, 0.8]]) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.5 * s, 2.4 * s, 6), ice);
        spike.position.set(x, 1.2 * s, z);
        c.scene.add(spike);
        c.collide.addCircle(x, z, 0.5 * s, 0, 2.4 * s);
      }
      // the keeper's chair faces the lamp, a cup still beside it
      c.place('chair', 5.5, -1.2, -2.2).place('pot', 6.1, -0.6, 0, { moteChance: 0.6 });
      c.mural(0, 2.4, -6.7, 0, 'wings', 3.4, 2.2);
      c.light(3.5, 2, -3.5, [1, 0.9, 0.6], 1.8);
    },
  },

  fisher: {
    fog: [0.04, 0.05, 0.08], fogDensity: 0.05, sun: 0.1, hemiIntensity: 0.5, hemiColor: [0.7, 0.8, 1],
    spawn: { x: 0, z: 2.0, yaw: 0 }, doorOutZ: 4.2, packTrigger: 1.5,
    build(c) {
      const m = mats();
      c.room(6.5, 6.5, 3.8, { floor: m.wood, wall: m.woodDark });
      // the ice hole goes down into black water; a line is still set
      const hole = new THREE.Mesh(new THREE.CircleGeometry(0.8, 12), glowMat(0x06121e));
      hole.rotation.x = -Math.PI / 2;
      hole.position.set(-1.4, 0.02, -1.4);
      c.scene.add(hole);
      const rod = box(0.05, 0.05, 1.8, m.woodDark);
      rod.position.set(-0.7, 0.5, -0.8);
      rod.rotation.z = 0.5;
      rod.rotation.y = 0.7;
      c.scene.add(rod);
      c.place('bed', 2.2, -1.8, 1.2);
      c.place('table', 1.8, 1.6, 0.3).place('candle', 1.8, 1.6, 0, { y: 0.83 });
      c.place('barrel', -2.2, 1.8, 0, { moteChance: 0.6 });
      // fish bones arranged neatly by size on the wall — pride of craft
      for (let i = 0; i < 4; i++) {
        const bone = box(0.5 + i * 0.2, 0.06, 0.02, m.bone);
        bone.position.set(-3.1, 1.4 + i * 0.4, -0.8 + i * 0.4);
        c.scene.add(bone);
      }
      c.shard(0, -2.2);
      c.pack('wisp', 2, 0, 0, 2);
      c.light(1.8, 1.5, 1.6, [1, 0.7, 0.4], 0.8);
    },
  },

  // ---------------------------------------------------------- MYCEL HOLLOW
  chapel: {
    fog: [0.03, 0.06, 0.06], fogDensity: 0.034, sun: 0.5, hemiIntensity: 0.4, hemiColor: [0.4, 0.7, 0.65],
    spawn: { x: 0, z: 10, yaw: 0 }, doorOutZ: 8.8,
    bossAt: { x: 0, z: -7 }, bossWake: 9,
    build(c) {
      const m = mats();
      const moss = new THREE.MeshStandardMaterial({ color: 0x3a4a40, roughness: 1, flatShading: true });
      c.room(13, 24, 11, { floor: moss, wall: moss });
      // flooded nave: dark water panes between the pews
      for (const [x, z, w, d] of [[-3, 2, 4, 7], [3.5, -2, 4, 9]]) {
        const water = box(w, 0.05, d, glowMat(0x0c2622));
        water.position.set(x, 0.04, z);
        c.scene.add(water);
      }
      // pews marching toward the altar
      for (let i = 0; i < 4; i++) {
        c.place('bench', -2.2, 6 - i * 2.2, 0);
        c.place('bench', 2.2, 6 - i * 2.2, 0);
      }
      // the altar: a great cap that grew straight through it
      c.place('table', 0, -8.5, 0);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(1.8, 10, 7, 0, Math.PI * 2, 0, Math.PI / 2.2), new THREE.MeshStandardMaterial({ color: 0x7a3a5a, emissive: 0x2a0c1e, emissiveIntensity: 0.6, roughness: 1, flatShading: true }));
      cap.position.set(0, 1.0, -8.5);
      c.scene.add(cap);
      // god-rays through the broken roof
      for (const [x, z, r] of [[-2, 0, 0.8], [2.5, -4, 1.1], [0.5, 4, 0.7]]) {
        const ray = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.5, r, 11, 8, 1, true),
          new THREE.MeshBasicMaterial({ color: 0x9fffd8, transparent: true, opacity: 0.06, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false, fog: false }));
        ray.position.set(x, 5.5, z);
        c.scene.add(ray);
      }
      c.mural(0, 3, -11.7, 0, 'spiral', 4, 2.8);
      c.light(0, 3, -8.5, [0.5, 1, 0.8], 1.4);
    },
  },

  capcottage: {
    fog: [0.03, 0.05, 0.05], fogDensity: 0.045, sun: 0.05, hemiIntensity: 0.5, hemiColor: [0.5, 0.9, 0.8],
    spawn: { x: 0, z: 3.4, yaw: 0 }, doorOutZ: 5.6, packTrigger: 2.5,
    build(c) {
      const m = mats();
      const shroom = new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 1, flatShading: true });
      c.room(8.5, 8.5, 5, { floor: shroom, wall: shroom });
      // everything here is grown, not built
      const stemTable = cyl(0.9, 1.1, 0.8, 8, m.paper);
      stemTable.position.set(1.8, 0.4, -1.5);
      c.scene.add(stemTable);
      c.collide.addCircle(1.8, -1.5, 1.0, 0, 0.85);
      for (const [x, z] of [[-2, -2.4], [-2.8, 0.6], [2.6, 1.8]]) {
        const stool = cyl(0.4, 0.5, 0.5, 7, new THREE.MeshStandardMaterial({ color: 0x8c5a7a, roughness: 1, flatShading: true }));
        stool.position.set(x, 0.25, z);
        c.scene.add(stool);
      }
      // glowing shelf-fungus staircase up the wall
      for (let i = 0; i < 5; i++) {
        const shelf = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 0.2, 7, 1, false, 0, Math.PI),
          new THREE.MeshStandardMaterial({ color: 0x4a8a7a, emissive: 0x1a4a3a, emissiveIntensity: 0.7, roughness: 1, flatShading: true }));
        shelf.position.set(-3.9, 1 + i * 0.8, 2 - i * 0.9);
        shelf.rotation.y = Math.PI / 2;
        c.scene.add(shelf);
      }
      c.place('pot', 3.1, -3, 0, { moteChance: 0.7 }).place('pot', -3, -3.1, 0, { moteChance: 0.7 });
      c.shard(0, -2.8);
      c.pack('gasbag', 3, 0, 0, 2.5);
      c.light(0, 3, 0, [0.45, 1, 0.8], 1.1);
    },
  },

  // ---------------------------------------------------------- THE SHATTER
  tower: {
    fog: [0.05, 0.04, 0.08], fogDensity: 0.024, sun: 0.42, hemiIntensity: 0.62, hemiColor: [0.74, 0.68, 0.95],
    spawn: { x: 0, z: 5.2, y: 12, yaw: 0 }, doorOutZ: 4.2,
    bossAt: { x: 0, z: -3 }, bossWake: 7, packTrigger: 900, // no ambush — the descent is the show
    build(c) {
      const m = mats();
      const ruin = new THREE.MeshStandardMaterial({ color: 0x4a3f5c, roughness: 1, flatShading: true });
      c.room(15, 15, 17, { floor: ruin, wall: ruin });
      // you entered at the top of an upside-down tower: descend the shelves
      c.loft(0, 5.2, 4, 3, 12);          // entry shelf (spawn stands here)
      c.loft(-4.5, 2, 3.4, 3, 9.4);
      c.loft(-2, -3.5, 3.4, 3, 6.8);
      c.loft(3.5, -1.5, 3.4, 3, 4.2);
      c.loft(5, 3.5, 3, 3, 1.8);
      // inverted architecture: arches point the wrong way, chandeliers rise
      for (const [x, z] of [[-5, -5], [5, -5], [-5, 5]]) {
        const chandelier = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.8, 6), m.iron);
        chandelier.position.set(x, 2.4, z);
        chandelier.rotation.x = Math.PI;
        c.scene.add(chandelier);
      }
      // shelves of stone books — the archive, spilled upward
      for (let i = 0; i < 8; i++) {
        const bk = box(0.3, 0.5, 0.2, [m.cloth, m.paper, ruin][i % 3]);
        bk.position.set(-6.8, 13 - i * 1.4, -3 + (i % 4));
        bk.rotation.z = (i % 2) * 0.4;
        c.scene.add(bk);
      }
      c.mural(0, 14.4, -7.2, 0, 'shatter', 4, 2.6);
      c.mural(0, 2.2, -7.2, 0, 'arrival', 3, 2);   // the oldest painting is at the "top" (bottom)
      c.light(0, 8, 0, [0.7, 0.55, 1], 1.2);
      c.light(-4.5, 10.8, 2, [0.7, 0.55, 1], 0.7);    // each shelf of the descent glows
      c.light(3.5, 5.6, -1.5, [0.7, 0.55, 1], 0.7);
      c.light(5, 3.2, 3.5, [0.8, 0.6, 1], 0.6);
    },
  },

  observatory: {
    fog: [0.04, 0.03, 0.07], fogDensity: 0.03, sun: 0.3, hemiIntensity: 0.6, hemiColor: [0.72, 0.68, 0.95],
    spawn: { x: 0, z: 3.4, yaw: 0 }, doorOutZ: 5.7, packTrigger: 2.5,
    build(c) {
      const m = mats();
      const stone = new THREE.MeshStandardMaterial({ color: 0x4c4660, roughness: 1, flatShading: true });
      c.room(11, 11, 8, { floor: stone, wall: stone });
      // the great telescope, aimed at a sky that broke
      const scope = cyl(0.5, 0.7, 5, 8, m.iron);
      scope.position.set(0, 3.4, -1);
      scope.rotation.x = -0.7;
      c.scene.add(scope);
      const mount = cyl(0.9, 1.2, 1.8, 8, stone);
      mount.position.set(0, 0.9, 0.2);
      c.scene.add(mount);
      c.collide.addCircle(0, 0.2, 1.1, 0, 2.2);
      // the orrery still runs — worlds on brass arms
      c._orrery = new THREE.Group();
      c._orrery.position.set(-3.2, 1.4, 2.4);
      const sun = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), glowMat(0xffd890));
      c._orrery.add(sun);
      for (let i = 0; i < 3; i++) {
        const planet = new THREE.Mesh(new THREE.SphereGeometry(0.1 + i * 0.04, 7, 5),
          new THREE.MeshStandardMaterial({ color: [0x8fb2cc, 0xcc8f5a, 0x9a8fcc][i], roughness: 0.8 }));
        planet.userData.orbit = 0.6 + i * 0.45;
        planet.userData.speed = 1.2 - i * 0.3;
        c._orrery.add(planet);
      }
      c.scene.add(c._orrery);
      c.collide.addCircle(-3.2, 2.4, 0.5, 0, 1.6);
      // star charts
      c.mural(-5.2, 2.2, 0, Math.PI / 2, 'spire', 2.6, 1.8);
      c.mural(5.2, 2.2, 0, -Math.PI / 2, 'shatter', 2.6, 1.8);
      c.mural(0, 2.6, -5.2, 0, 'spiral', 3, 2);
      c.place('shelf', 3.8, -3.6, -Math.PI / 4);
      c.place('chair', -1.6, -2.6, 0.6);
      c.shard(3.6, 3.6);
      c.pack('sentinel', 2, 0, -2, 3);
      c.light(0, 5, 0, [0.65, 0.55, 1], 1.0);
    },
    update(c, dt, t) {
      let i = 0;
      for (const child of c._orrery.children) {
        if (!child.userData.orbit) continue;
        const a = t * child.userData.speed + i * 2.1;
        child.position.set(Math.cos(a) * child.userData.orbit, 0, Math.sin(a) * child.userData.orbit);
        i++;
      }
    },
  },
};
