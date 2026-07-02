// Flora: thousands of instances, ~9 draw calls. Each type is a small merged
// geometry with vertex colors, instanced across the island wherever its
// region's weight is high. Grass and flowers take per-instance tints so
// borders blend. Big trunks drop circle colliders into the world field.

import * as THREE from 'three';
import { makeRng } from '../core/rng.js';
import { regionWeights } from './regions.js';
import { terrainHeight, terrainNormal } from './terrain.js';
import { DESTS, SPIRE } from './destdata.js';

// ---- tiny geometry merge (position/normal/color, non-indexed) -------------
function mergeGeos(parts) {
  const geos = parts.map(({ geo, color, translate, scale, rotate }) => {
    let g = geo.toNonIndexed();
    if (scale) g.scale(...scale);
    if (rotate) g.rotateX(rotate[0]), g.rotateY(rotate[1]), g.rotateZ(rotate[2]);
    if (translate) g.translate(...translate);
    const n = g.attributes.position.count;
    const colors = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { colors[i * 3] = color[0]; colors[i * 3 + 1] = color[1]; colors[i * 3 + 2] = color[2]; }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return g;
  });
  let total = 0;
  for (const g of geos) total += g.attributes.position.count;
  const pos = new Float32Array(total * 3), norm = new Float32Array(total * 3), col = new Float32Array(total * 3);
  let off = 0;
  for (const g of geos) {
    pos.set(g.attributes.position.array, off * 3);
    norm.set(g.attributes.normal.array, off * 3);
    col.set(g.attributes.color.array, off * 3);
    off += g.attributes.position.count;
    g.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(norm, 3));
  out.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return out;
}

const C = THREE.CylinderGeometry, I = THREE.IcosahedronGeometry, Co = THREE.ConeGeometry, B = THREE.BoxGeometry;

const FLORA = {
  birch: {
    region: 'vale', count: 240, minW: 0.5, scale: [0.85, 1.5], collider: 0.32, colliderH: 5,
    make: () => mergeGeos([
      { geo: new C(0.16, 0.24, 4.2, 6), color: [0.92, 0.92, 0.88], translate: [0, 2.1, 0] },
      { geo: new I(1.5, 0), color: [0.42, 0.62, 0.28], translate: [0, 4.6, 0], scale: [1, 1.15, 1] },
      { geo: new I(1.0, 0), color: [0.5, 0.7, 0.3], translate: [0.7, 3.7, 0.4] },
      { geo: new I(0.8, 0), color: [0.36, 0.56, 0.24], translate: [-0.6, 3.9, -0.3] },
    ]),
  },
  pine: {
    region: 'frost', count: 210, minW: 0.5, scale: [0.8, 1.6], collider: 0.3, colliderH: 6,
    make: () => mergeGeos([
      { geo: new C(0.14, 0.22, 2.2, 6), color: [0.35, 0.26, 0.2], translate: [0, 1.1, 0] },
      { geo: new Co(1.5, 2.4, 7), color: [0.2, 0.38, 0.34], translate: [0, 2.8, 0] },
      { geo: new Co(1.1, 2.0, 7), color: [0.3, 0.48, 0.45], translate: [0, 4.2, 0] },
      { geo: new Co(0.7, 1.6, 7), color: [0.82, 0.9, 0.95], translate: [0, 5.5, 0] },
    ]),
  },
  shroom: {
    region: 'mycel', count: 130, minW: 0.5, scale: [0.7, 1.8], collider: 0.4, colliderH: 3.5,
    make: () => mergeGeos([
      { geo: new C(0.3, 0.5, 2.6, 7), color: [0.8, 0.78, 0.66], translate: [0, 1.3, 0] },
      { geo: new I(1.6, 1), color: [0.24, 0.65, 0.6], translate: [0, 2.9, 0], scale: [1, 0.55, 1] },
      { geo: new C(1.2, 1.35, 0.18, 9), color: [0.65, 1.0, 0.9], translate: [0, 2.62, 0] },
    ]),
  },
  spike: {
    region: 'ember', count: 150, minW: 0.5, scale: [0.6, 2.2], collider: 0.5, colliderH: 4,
    make: () => mergeGeos([
      { geo: new Co(0.7, 3.4, 5), color: [0.1, 0.07, 0.09], translate: [0, 1.7, 0] },
      { geo: new Co(0.4, 1.8, 5), color: [0.16, 0.1, 0.12], translate: [0.5, 0.9, 0.2], rotate: [0, 0, 0.5] },
      { geo: new Co(0.3, 1.4, 4), color: [0.55, 0.18, 0.08], translate: [-0.45, 0.7, -0.15], rotate: [0, 0, -0.4] },
    ]),
  },
  column: {
    region: 'shatter', count: 80, minW: 0.55, scale: [0.7, 1.5], collider: 0.55, colliderH: 5,
    make: () => mergeGeos([
      { geo: new C(0.55, 0.65, 4.6, 8), color: [0.6, 0.56, 0.66], translate: [0, 2.3, 0] },
      { geo: new B(1.5, 0.35, 1.5), color: [0.5, 0.46, 0.58], translate: [0, 0.18, 0] },
      { geo: new B(1.15, 0.3, 1.15), color: [0.55, 0.5, 0.62], translate: [0.1, 4.7, 0.05] },
    ]),
  },
  rock: {
    region: null, count: 320, minW: 0, scale: [0.4, 1.8], collider: 0.7, colliderH: 1.4, tint: true,
    make: () => {
      const g = new I(1, 0).toNonIndexed();
      g.scale(1, 0.72, 1);
      const n = g.attributes.position.count;
      const colors = new Float32Array(n * 3).fill(0.62);
      g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      return g;
    },
  },
  grass: {
    region: null, count: 5600, minW: 0, scale: [0.7, 1.6], tint: 'region',
    make: () => mergeGeos([
      { geo: new Co(0.05, 0.62, 3), color: [1, 1, 1], translate: [0, 0.31, 0], rotate: [0.12, 0, 0] },
      { geo: new Co(0.05, 0.5, 3), color: [0.85, 0.9, 0.8], translate: [0.14, 0.25, 0.05], rotate: [0, 0, -0.2] },
      { geo: new Co(0.05, 0.44, 3), color: [0.9, 0.95, 0.85], translate: [-0.12, 0.22, -0.07], rotate: [-0.15, 0, 0.18] },
    ]),
  },
  flower: {
    region: null, count: 1400, minW: 0, scale: [0.6, 1.2], tint: 'flower', valeBias: true,
    make: () => mergeGeos([
      { geo: new C(0.015, 0.02, 0.5, 4), color: [0.4, 0.6, 0.3], translate: [0, 0.25, 0] },
      { geo: new I(0.09, 0), color: [1, 1, 1], translate: [0, 0.52, 0] },
    ]),
  },
};

const FLOWER_COLORS = [[1, 0.65, 0.75], [1, 0.85, 0.4], [0.75, 0.65, 1], [1, 1, 0.9], [0.95, 0.5, 0.35]];

function nearDestination(x, z, pad = 3) {
  if (Math.hypot(x - SPIRE.x, z - SPIRE.z) < SPIRE.r + pad) return true;
  for (const d of DESTS) if (Math.hypot(x - d.x, z - d.z) < d.r + pad) return true;
  return false;
}

export function plantWorld(scene, collide) {
  const rng = makeRng(4242);
  const _m = new THREE.Matrix4(), _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _s = new THREE.Vector3();
  const _e = new THREE.Euler(), _c = new THREE.Color();
  const up = new THREE.Vector3();

  for (const [key, def] of Object.entries(FLORA)) {
    const geo = def.make();
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true, flatShading: true, roughness: 1,
      side: def.doubleSide ? THREE.DoubleSide : THREE.FrontSide,
      alphaTest: 0, transparent: false,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, def.count);
    mesh.castShadow = key !== 'grass' && key !== 'flower';
    mesh.receiveShadow = false;
    let placed = 0, guard = 0;
    while (placed < def.count && guard++ < def.count * 30) {
      const x = (rng() * 2 - 1) * 640;
      const z = (rng() * 2 - 1) * 640;
      if (Math.hypot(x, z) > 620) continue;
      const h = terrainHeight(x, z);
      if (h < 1.2) continue;                       // not on beaches/underwater
      const n = terrainNormal(x, z, up);
      if (n.y < 0.82) continue;                    // not on cliffs
      if (nearDestination(x, z)) continue;
      const w = regionWeights(x, z);
      if (def.region && w[def.region] < def.minW) continue;
      if (def.region && rng() > w[def.region]) continue;
      if (def.valeBias && rng() > w.vale + 0.15) continue;

      const sc = def.scale[0] + rng() * (def.scale[1] - def.scale[0]);
      _e.set(0, rng() * Math.PI * 2, 0);
      _q.setFromEuler(_e);
      _m.compose(_p.set(x, h - 0.05, z), _q, _s.set(sc, sc, sc));
      mesh.setMatrixAt(placed, _m);

      if (def.tint === 'region') {
        // grass takes the local terrain hue so borders blend
        let r = 0.2, g = 0.32, b = 0.14;
        const rw = regionWeights(x, z);
        r = 0.30 * rw.vale + 0.45 * rw.ember + 0.65 * rw.frost + 0.16 * rw.mycel + 0.38 * rw.shatter;
        g = 0.52 * rw.vale + 0.28 * rw.ember + 0.75 * rw.frost + 0.30 * rw.mycel + 0.33 * rw.shatter;
        b = 0.22 * rw.vale + 0.14 * rw.ember + 0.85 * rw.frost + 0.28 * rw.mycel + 0.45 * rw.shatter;
        _c.setRGB(r * (0.8 + rng() * 0.4), g * (0.8 + rng() * 0.4), b * (0.8 + rng() * 0.4));
        mesh.setColorAt(placed, _c);
      } else if (def.tint === 'flower') {
        const fc = FLOWER_COLORS[(rng() * FLOWER_COLORS.length) | 0];
        _c.setRGB(fc[0], fc[1], fc[2]);
        mesh.setColorAt(placed, _c);
      } else if (def.tint) {
        _c.setHSL(0.08 + rng() * 0.05, 0.08 + rng() * 0.1, 0.35 + rng() * 0.2);
        mesh.setColorAt(placed, _c);
      }

      if (def.collider && sc > 0.75) {
        collide.addCircle(x, z, def.collider * sc, h - 1, h + def.colliderH * sc);
      }
      placed++;
    }
    mesh.count = placed;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  }
}
