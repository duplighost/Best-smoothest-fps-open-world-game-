// Seeded randomness + value noise. The whole world derives from WORLD_SEED,
// so terrain, vegetation placement, and prop scatter are identical every run
// (and identical between the game and any test that samples them).

export const WORLD_SEED = 20260701;

// mulberry32 — small fast seeded PRNG.
export function makeRng(seed) {
  let s = seed >>> 0;
  return function rng() {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Deterministic 2D hash → [0,1). Fast enough to call per-vertex.
export function hash2(x, y, seed = WORLD_SEED) {
  let h = seed ^ Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);

// Smooth value noise, ~[-1, 1].
export function noise2(x, y, seed = WORLD_SEED) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = fade(xf), v = fade(yf);
  const a = hash2(xi, yi, seed);
  const b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed);
  const d = hash2(xi + 1, yi + 1, seed);
  const x1 = a + (b - a) * u;
  const x2 = c + (d - c) * u;
  return (x1 + (x2 - x1) * v) * 2 - 1;
}

// Fractal brownian motion over noise2, ~[-1, 1].
export function fbm2(x, y, octaves = 4, seed = WORLD_SEED) {
  let sum = 0, amp = 0.5, freq = 1, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += noise2(x * freq, y * freq, seed + i * 1013) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2.02;
  }
  return sum / norm;
}

// Convenience helpers over a rng() function.
export const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
export const range = (rng, a, b) => a + rng() * (b - a);
