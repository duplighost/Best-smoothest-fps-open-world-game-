// The five lands. Pure data + the region-weight field. Everything that makes
// a region feel like itself reads from here: terrain colors, sky, fog, light,
// music key, ambient particles. Weights blend smoothly across borders.

import { fbm2 } from '../core/rng.js';
import { clamp01 } from '../core/math.js';

// Angular sectors around the island center (atan2(z, x), radians).
const A = Math.PI / 180;

export const REGIONS = {
  vale: {
    name: 'Verdant Vale',
    angle: 90 * A, halfWidth: 40 * A,
    musicKey: 'vale',
    terra: { lo: [0.30, 0.52, 0.24], hi: [0.55, 0.72, 0.30], cliff: [0.42, 0.38, 0.32] },
    sky: { horizon: [1.0, 0.86, 0.62], zenith: [0.36, 0.62, 0.94], feature: 'none' },
    fog: { color: [0.78, 0.83, 0.80], density: 0.0052 },
    sun: { color: [1.0, 0.95, 0.82], intensity: 1.15 },
    hemi: { sky: [0.62, 0.74, 0.92], ground: [0.36, 0.42, 0.28], intensity: 0.85 },
    key: [0.55, 0.85, 0.45],       // identity color (HUD glints, motes, beacons)
  },
  ember: {
    name: 'Ember Flats',
    angle: 162 * A, halfWidth: 40 * A,
    musicKey: 'ember',
    terra: { lo: [0.48, 0.22, 0.12], hi: [0.72, 0.42, 0.18], cliff: [0.16, 0.10, 0.10] },
    sky: { horizon: [1.0, 0.45, 0.20], zenith: [0.30, 0.16, 0.22], feature: 'embers' },
    fog: { color: [0.62, 0.36, 0.22], density: 0.0068 },
    sun: { color: [1.0, 0.55, 0.30], intensity: 1.0 },
    hemi: { sky: [0.72, 0.42, 0.30], ground: [0.30, 0.14, 0.08], intensity: 0.7 },
    key: [1.0, 0.5, 0.25],
  },
  frost: {
    name: 'Frostmere',
    angle: -126 * A, halfWidth: 40 * A,
    musicKey: 'frost',
    terra: { lo: [0.72, 0.80, 0.88], hi: [0.92, 0.96, 1.0], cliff: [0.45, 0.54, 0.68] },
    sky: { horizon: [0.80, 0.88, 0.98], zenith: [0.16, 0.28, 0.52], feature: 'aurora' },
    fog: { color: [0.80, 0.87, 0.95], density: 0.0060 },
    sun: { color: [0.85, 0.92, 1.0], intensity: 0.95 },
    hemi: { sky: [0.70, 0.80, 0.95], ground: [0.55, 0.60, 0.70], intensity: 0.8 },
    key: [0.55, 0.85, 1.0],
  },
  mycel: {
    name: 'Mycel Hollow',
    angle: 18 * A, halfWidth: 40 * A,
    musicKey: 'mycel',
    terra: { lo: [0.13, 0.20, 0.22], hi: [0.24, 0.34, 0.30], cliff: [0.16, 0.14, 0.20] },
    sky: { horizon: [0.35, 0.55, 0.52], zenith: [0.07, 0.10, 0.18], feature: 'spores' },
    fog: { color: [0.16, 0.28, 0.30], density: 0.0105 },
    sun: { color: [0.55, 0.75, 0.70], intensity: 0.55 },
    hemi: { sky: [0.25, 0.45, 0.45], ground: [0.10, 0.14, 0.16], intensity: 0.75 },
    key: [0.45, 1.0, 0.80],
  },
  shatter: {
    name: 'The Shatter',
    angle: -54 * A, halfWidth: 40 * A,
    musicKey: 'shatter',
    terra: { lo: [0.36, 0.30, 0.42], hi: [0.55, 0.48, 0.60], cliff: [0.24, 0.20, 0.30] },
    sky: { horizon: [0.85, 0.55, 0.75], zenith: [0.14, 0.10, 0.30], feature: 'nebula' },
    fog: { color: [0.42, 0.32, 0.48], density: 0.0055 },
    sun: { color: [0.95, 0.70, 0.85], intensity: 0.85 },
    hemi: { sky: [0.50, 0.40, 0.65], ground: [0.22, 0.18, 0.30], intensity: 0.8 },
    key: [0.80, 0.55, 1.0],
  },
};

export const REGION_KEYS = Object.keys(REGIONS);

const angDist = (a, b) => {
  let d = (a - b) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return Math.abs(d);
};

// Blended region weights at a world position. Borders wobble with low-freq
// noise so they read as natural transitions, not pie slices.
const _w = {};
export function regionWeights(x, z) {
  const a = Math.atan2(z, x) + fbm2(x * 0.006, z * 0.006, 2, 777) * 0.42;
  let total = 0;
  for (const k of REGION_KEYS) {
    const r = REGIONS[k];
    const t = clamp01(1 - Math.pow(angDist(a, r.angle) / (r.halfWidth * 1.55), 2));
    const w = t * t;
    _w[k] = w;
    total += w;
  }
  if (total < 1e-6) { for (const k of REGION_KEYS) _w[k] = 0.2; total = 1; }
  for (const k of REGION_KEYS) _w[k] /= total;
  return _w; // NOTE: shared object — copy if you need to keep it
}

export function dominantRegion(x, z) {
  const w = regionWeights(x, z);
  let best = 'vale', bw = -1;
  for (const k of REGION_KEYS) if (w[k] > bw) { bw = w[k]; best = k; }
  return best;
}

// Blend an arbitrary per-region property (array of numbers) by weights.
export function blendRegion(getter, x, z, out = [0, 0, 0]) {
  const w = regionWeights(x, z);
  out[0] = 0; out[1] = 0; out[2] = 0;
  let extra = 0;
  for (const k of REGION_KEYS) {
    const v = getter(REGIONS[k]);
    if (typeof v === 'number') { extra += v * w[k]; continue; }
    out[0] += v[0] * w[k]; out[1] += v[1] * w[k]; out[2] += v[2] * w[k];
  }
  return typeof getter(REGIONS.vale) === 'number' ? extra : out;
}
