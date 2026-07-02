// Terrain: one analytic height function (used by rendering, collision, AI,
// and prop placement — they can never disagree), rendered as lazily-built
// chunk meshes around the player. Flat-shaded, vertex-colored by region.

import * as THREE from 'three';
import { fbm2, noise2, hash2 } from '../core/rng.js';
import { clamp01, lerp, smoothstep } from '../core/math.js';
import { REGIONS, REGION_KEYS, regionWeights } from './regions.js';
import { DESTS, FROZEN_LAKE, SPIRE } from './destdata.js';
import { CFG } from '../config.js';

const ridge = (x, z, seed) => 1 - Math.abs(fbm2(x, z, 3, seed));

// Raw island height, before building sites flatten it.
function rawHeight(x, z) {
  const d = Math.hypot(x, z);

  // Island silhouette: rises from the sea floor, falls off past ~620m.
  const edge = smoothstep(690, 540, d);
  let h = -8 + edge * (14 + 4 * fbm2(x * 0.004, z * 0.004, 3, 11));

  if (edge > 0.001) {
    const w = regionWeights(x, z);
    h += edge * w.vale * (6.0 * fbm2(x * 0.013, z * 0.013, 4, 21) + 3.0);
    h += edge * w.ember * (2.8 * ridge(x * 0.02, z * 0.02, 31) + 0.4);
    h += edge * w.frost * (7.5 * fbm2(x * 0.009, z * 0.009, 4, 41) + 4.5);
    h += edge * w.mycel * (2.2 * fbm2(x * 0.02, z * 0.02, 3, 51) - 3.4);
    h += edge * w.shatter * (14 + 9 * ridge(x * 0.012, z * 0.012, 61));
  }

  // The hub hill under the Spire.
  h += 14 * Math.exp(-(d * d) / (95 * 95));
  return h;
}

// Sites that flatten the terrain (destinations, spire, frozen lake). Their
// heights derive from the raw terrain (with earlier flats applied, so the
// fisher's hut inherits the lake surface) — buildings always sit naturally.
const FLATS = [];
function flatsHeight(x, z, upTo) {
  let h = rawHeight(x, z);
  for (let i = 0; i < upTo; i++) {
    const f = FLATS[i];
    const dd = Math.hypot(x - f.x, z - f.z);
    if (dd < f.r) h = lerp(f.y, h, smoothstep(f.rim, f.r, dd));
  }
  return h;
}
{
  const sites = [
    { ref: FROZEN_LAKE, r: FROZEN_LAKE.r, rimF: 0.8, dy: -2.0 },   // the lake sinks below the snowfield
    { ref: SPIRE, r: SPIRE.r, rimF: 0.7, dy: 0 },
    ...DESTS.map((d) => ({ ref: d, r: d.r, rimF: 0.85, dy: 0 })),
  ];
  for (const s of sites) {
    const y = flatsHeight(s.ref.x, s.ref.z, FLATS.length) + s.dy;
    s.ref.y = y;                     // buildings/props read the same number
    FLATS.push({ x: s.ref.x, z: s.ref.z, r: s.r, rim: s.r * s.rimF, y });
  }
}

export function terrainHeight(x, z) {
  return flatsHeight(x, z, FLATS.length);
}

// Approximate normal by central differences — for slope checks + placement.
export function terrainNormal(x, z, out = new THREE.Vector3()) {
  const e = 0.6;
  const hx = terrainHeight(x + e, z) - terrainHeight(x - e, z);
  const hz = terrainHeight(x, z + e) - terrainHeight(x, z - e);
  return out.set(-hx, 2 * e, -hz).normalize();
}

// ---------------------------------------------------------------------------

const CHUNK = CFG.world.chunk;         // 70m
const SEGS = 35;                       // 2m per quad, flat-shaded

function chunkKey(cx, cz) { return cx + ',' + cz; }

export class Terrain {
  constructor(scene) {
    this.scene = scene;
    this.chunks = new Map();
    this.mat = new THREE.MeshStandardMaterial({
      vertexColors: true, flatShading: true, roughness: 1.0, metalness: 0.0,
    });
    this.lastCx = null;
    this.lastCz = null;
  }

  buildChunk(cx, cz) {
    const ox = cx * CHUNK, oz = cz * CHUNK;
    // Skip chunks that are entirely deep sea (beyond the island).
    const dc = Math.hypot(ox + CHUNK / 2, oz + CHUNK / 2);
    if (dc > 900) return null;

    const geo = new THREE.PlaneGeometry(CHUNK, CHUNK, SEGS, SEGS);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) + ox + CHUNK / 2;
      const z = pos.getZ(i) + oz + CHUNK / 2;
      const h = terrainHeight(x, z);
      pos.setY(i, h);

      // Color: region palette, height-shaded, cliff tint on slopes,
      // sand near the waterline, per-vertex jitter so fields aren't flat.
      const w = regionWeights(x, z);
      let r = 0, g = 0, b = 0;
      for (const k of REGION_KEYS) {
        const t = REGIONS[k].terra;
        const m = clamp01(0.35 + 0.65 * noise2(x * 0.05, z * 0.05, 99) * 0.5 + h * 0.02);
        r += lerp(t.lo[0], t.hi[0], m) * w[k];
        g += lerp(t.lo[1], t.hi[1], m) * w[k];
        b += lerp(t.lo[2], t.hi[2], m) * w[k];
      }
      // slope → cliff color
      const e = 1.2;
      const slope = Math.abs(terrainHeight(x + e, z) - terrainHeight(x - e, z)) +
                    Math.abs(terrainHeight(x, z + e) - terrainHeight(x, z - e));
      const cliff = clamp01((slope - 1.6) * 0.7);
      if (cliff > 0) {
        let cr = 0, cg = 0, cb = 0;
        for (const k of REGION_KEYS) {
          const c = REGIONS[k].terra.cliff;
          cr += c[0] * w[k]; cg += c[1] * w[k]; cb += c[2] * w[k];
        }
        r = lerp(r, cr, cliff); g = lerp(g, cg, cliff); b = lerp(b, cb, cliff);
      }
      // waterline sand
      const sand = smoothstep(1.6, 0.4, h);
      if (sand > 0) { r = lerp(r, 0.76, sand * 0.8); g = lerp(g, 0.70, sand * 0.8); b = lerp(b, 0.52, sand * 0.8); }
      // the frozen lake reads as ice
      const dLake = Math.hypot(x - FROZEN_LAKE.x, z - FROZEN_LAKE.z);
      if (dLake < FROZEN_LAKE.r * 0.92) {
        const ice = smoothstep(FROZEN_LAKE.r * 0.92, FROZEN_LAKE.r * 0.7, dLake);
        r = lerp(r, 0.72, ice); g = lerp(g, 0.82, ice); b = lerp(b, 0.92, ice);
      }
      // jitter
      const j = (hash2(x * 7, z * 7, 5) - 0.5) * 0.06;
      colors[i * 3] = clamp01(r + j);
      colors[i * 3 + 1] = clamp01(g + j);
      colors[i * 3 + 2] = clamp01(b + j);
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals(); // flatShading ignores these, but keeps raycast sane

    // vertices are already chunk-center-local (only heights were baked in),
    // so the mesh transform alone places the chunk in the world
    const mesh = new THREE.Mesh(geo, this.mat);
    mesh.position.set(ox + CHUNK / 2, 0, oz + CHUNK / 2);
    mesh.receiveShadow = true;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    return mesh;
  }

  // Ensure chunks exist around the player; toggle visibility by ring distance.
  // Missing chunks go into a queue drained a few per frame (building a chunk
  // is noise-heavy; fog hides the brief pop-in at the horizon).
  update(px, pz) {
    const cx = Math.floor(px / CHUNK), cz = Math.floor(pz / CHUNK);
    if (cx !== this.lastCx || cz !== this.lastCz) {
      this.lastCx = cx; this.lastCz = cz;
      const R = CFG.world.chunksVisible;

      for (const [key, mesh] of this.chunks) {
        if (!mesh) continue;
        const [kx, kz] = key.split(',').map(Number);
        mesh.visible = Math.abs(kx - cx) <= R && Math.abs(kz - cz) <= R;
      }
      this.queue = [];
      for (let dx = -R; dx <= R; dx++) {
        for (let dz = -R; dz <= R; dz++) {
          const key = chunkKey(cx + dx, cz + dz);
          if (this.chunks.has(key)) continue;
          this.queue.push([cx + dx, cz + dz, dx * dx + dz * dz]);
        }
      }
      this.queue.sort((a, b) => a[2] - b[2]); // nearest first
    }
    let budget = 2;
    while (this.queue && this.queue.length && budget-- > 0) {
      const [kx, kz] = this.queue.shift();
      const key = chunkKey(kx, kz);
      if (this.chunks.has(key)) continue;
      const mesh = this.buildChunk(kx, kz);
      this.chunks.set(key, mesh);
      if (mesh) this.scene.add(mesh);
    }
  }

  // Build everything within the ring synchronously (used during load and by
  // teleports so the ground exists before the fade lifts).
  buildAround(px, pz) {
    this.lastCx = null;
    this.update(px, pz);
    while (this.queue && this.queue.length) {
      const [kx, kz] = this.queue.shift();
      const key = chunkKey(kx, kz);
      if (this.chunks.has(key)) continue;
      const mesh = this.buildChunk(kx, kz);
      this.chunks.set(key, mesh);
      if (mesh) this.scene.add(mesh);
    }
  }
}
