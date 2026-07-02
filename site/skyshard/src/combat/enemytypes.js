// The bestiary. Each type: stats + a procedural mesh builder (primitives
// only, tiny polycounts, glowing eyes). behavior keys map to functions in
// enemies.js. Silhouette-first design: you can tell every enemy from a
// distance by shape alone.

import * as THREE from 'three';

const mat = (color, emissive = 0x000000, ei = 0) =>
  new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: ei, roughness: 0.85, flatShading: true });

const glow = (color) =>
  new THREE.MeshBasicMaterial({ color, fog: false });

export const ENEMY_TYPES = {
  // ---- Verdant Vale ----
  puff: {
    region: 'vale', hp: 2, speed: 2.0, fly: 2.2, radius: 0.55, behavior: 'drift',
    contact: 1, score: 1, color: [0.75, 0.9, 0.5],
    build() {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), mat(0xa8cc66, 0x3a5a1a, 0.5));
      const spikes = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 0), mat(0x7da84e));
      spikes.material.wireframe = true;
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), glow(0xfff6c8));
      eye.position.set(0, 0.05, 0.42);
      g.add(body, spikes, eye);
      return g;
    },
  },
  hopper: {
    region: 'vale', hp: 3, speed: 3.2, fly: 0, radius: 0.5, behavior: 'hop',
    contact: 1, score: 1, color: [0.55, 0.75, 0.35],
    build() {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.9, 6), mat(0x86a852, 0x2c4a12, 0.35));
      body.position.y = 0.45;
      const legL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.3), mat(0x5c7a38));
      legL.position.set(-0.3, 0.2, 0);
      const legR = legL.clone();
      legR.position.x = 0.3;
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), glow(0xffe9a0));
      eye.position.set(0, 0.7, 0.3);
      g.add(body, legL, legR, eye);
      return g;
    },
  },

  // ---- Ember Flats ----
  hound: {
    region: 'ember', hp: 4, speed: 5.6, fly: 0, radius: 0.55, behavior: 'chase',
    contact: 1, score: 2, color: [1.0, 0.45, 0.15], lunge: true,
    build() {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.5, 0.45), mat(0x3a1f14, 0xff4400, 0.55));
      body.position.y = 0.55;
      const head = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.6, 5), mat(0x2c160e, 0xff6a00, 0.7));
      head.rotation.x = Math.PI / 2;
      head.position.set(0, 0.6, 0.75);
      const legs = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.45, 0.14), mat(0x241009));
      legs.position.y = 0.22;
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), glow(0xffd080));
      eye.position.set(0, 0.72, 0.95);
      g.add(body, head, legs, eye);
      return g;
    },
  },
  turret: {
    region: 'ember', hp: 5, speed: 0, fly: 0, radius: 0.7, behavior: 'turret',
    contact: 1, score: 2, color: [0.9, 0.3, 0.1], shootEvery: 2.1, projSpeed: 11,
    build() {
      const g = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.85, 0.5, 7), mat(0x27140c));
      base.position.y = 0.25;
      const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.5), mat(0x521f08, 0xff3300, 0.9));
      core.position.y = 1.0;
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), glow(0xffb060));
      eye.position.set(0, 1.0, 0.45);
      g.add(base, core, eye);
      g.userData.spin = core;
      return g;
    },
  },

  // ---- Frostmere ----
  wisp: {
    region: 'frost', hp: 2, speed: 4.2, fly: 2.8, radius: 0.5, behavior: 'orbit',
    contact: 1, score: 2, color: [0.55, 0.85, 1.0], shootEvery: 2.6, projSpeed: 13,
    build() {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), mat(0xbfe4ff, 0x66ccff, 0.9));
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.045, 6, 18), mat(0x9fd4ff, 0x66aaff, 0.6));
      halo.rotation.x = Math.PI / 2;
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), glow(0xe8f8ff));
      eye.position.set(0, 0, 0.36);
      g.add(body, halo, eye);
      g.userData.spin = halo;
      return g;
    },
  },
  golem: {
    region: 'frost', hp: 9, speed: 2.4, fly: 0, radius: 0.85, behavior: 'chase',
    contact: 2, score: 3, color: [0.7, 0.85, 1.0], heavy: true,
    build() {
      const g = new THREE.Group();
      const torso = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.2, 0.8), mat(0x8fb2cc, 0x224466, 0.25));
      torso.position.y = 1.2;
      const head = new THREE.Mesh(new THREE.OctahedronGeometry(0.35), mat(0xaacce0, 0x3388cc, 0.5));
      head.position.y = 2.05;
      const armL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.35), mat(0x7da2bc));
      armL.position.set(-0.8, 1.1, 0);
      const armR = armL.clone(); armR.position.x = 0.8;
      const legs = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 0.5), mat(0x6f92aa));
      legs.position.y = 0.35;
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), glow(0xbfe8ff));
      eye.position.set(0, 2.05, 0.3);
      g.add(torso, head, armL, armR, legs, eye);
      return g;
    },
  },

  // ---- Mycel Hollow ----
  gasbag: {
    region: 'mycel', hp: 2, speed: 1.6, fly: 2.4, radius: 0.75, behavior: 'floatbomb',
    contact: 1, score: 2, color: [0.5, 1.0, 0.8], fuseDist: 3.2, fuseTime: 0.75, boomRadius: 3.4,
    build() {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.65, 10, 8), mat(0x2f4a42, 0x33ffaa, 0.35));
      body.scale.y = 1.2;
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.4, 8), mat(0x24352f, 0x22cc88, 0.3));
      cap.position.y = 0.85;
      const tendrils = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.9, 5), mat(0x1c2a26));
      tendrils.rotation.x = Math.PI;
      tendrils.position.y = -0.9;
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), glow(0xa0ffd8));
      eye.position.set(0, 0.1, 0.6);
      g.add(body, cap, tendrils, eye);
      g.userData.swell = body;
      return g;
    },
  },
  creeper: {
    region: 'mycel', hp: 3, speed: 4.8, fly: 0, radius: 0.5, behavior: 'ambush',
    contact: 1, score: 2, color: [0.35, 0.8, 0.6],
    build() {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), mat(0x1e332c, 0x116644, 0.4));
      body.scale.set(1.3, 0.55, 1.3);
      body.position.y = 0.3;
      const spines = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.55, 4), mat(0x2c4a3e, 0x22aa77, 0.5));
      spines.position.y = 0.7;
      const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), glow(0xb0ffe0));
      eyeL.position.set(-0.2, 0.42, 0.45);
      const eyeR = eyeL.clone(); eyeR.position.x = 0.2;
      g.add(body, spines, eyeL, eyeR);
      return g;
    },
  },

  // ---- The Shatter ----
  sentinel: {
    region: 'shatter', hp: 6, speed: 3.4, fly: 3.4, radius: 0.7, behavior: 'orbit',
    contact: 1, score: 3, color: [0.8, 0.55, 1.0], shootEvery: 2.2, projSpeed: 14, triShot: true,
    build() {
      const g = new THREE.Group();
      const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), mat(0x2c2440, 0x9955ff, 0.8));
      const ringA = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.05, 6, 20), mat(0x554477, 0x8844ff, 0.5));
      const ringB = ringA.clone();
      ringB.rotation.x = Math.PI / 2;
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), glow(0xd8b8ff));
      eye.position.set(0, 0, 0.5);
      g.add(core, ringA, ringB, eye);
      g.userData.spin = ringA;
      g.userData.spin2 = ringB;
      return g;
    },
  },
  drone: {
    region: 'shatter', hp: 2, speed: 6.4, fly: 2.6, radius: 0.4, behavior: 'floatbomb',
    contact: 1, score: 2, color: [1.0, 0.6, 0.9], fuseDist: 2.6, fuseTime: 0.45, boomRadius: 2.8,
    build() {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.TetrahedronGeometry(0.45), mat(0x33203f, 0xff44aa, 0.7));
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.035, 5, 14), mat(0x774466, 0xff66cc, 0.5));
      halo.rotation.x = 1.1;
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), glow(0xffc8e8));
      eye.position.set(0, 0, 0.35);
      g.add(body, halo, eye);
      g.userData.spin = body;
      return g;
    },
  },
};

// Which wild types roam each region (spawn weights).
export const REGION_SPAWNS = {
  vale: [['puff', 0.6], ['hopper', 0.4]],
  ember: [['hound', 0.65], ['turret', 0.35]],
  frost: [['wisp', 0.6], ['golem', 0.4]],
  mycel: [['gasbag', 0.55], ['creeper', 0.45]],
  shatter: [['sentinel', 0.5], ['drone', 0.5]],
};
