// Small math helpers used everywhere. No Three.js dependency.

export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const unlerp = (a, b, v) => (b === a ? 0 : (v - a) / (b - a));
export const remap = (v, a, b, c, d) => lerp(c, d, clamp01(unlerp(a, b, v)));

export const smoothstep = (a, b, v) => {
  const t = clamp01(unlerp(a, b, v));
  return t * t * (3 - 2 * t);
};

// Frame-rate independent exponential approach. `rate` ~ how fast per second.
// damp(current, target, 8, dt) feels like a snappy spring settle.
export const damp = (current, target, rate, dt) =>
  lerp(current, target, 1 - Math.exp(-rate * dt));

// Shortest-arc angle damp (radians), for smooth yaw chasing.
export const dampAngle = (current, target, rate, dt) => {
  let d = (target - current) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return current + d * (1 - Math.exp(-rate * dt));
};

// Easing (t in [0,1]).
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
export const easeInCubic = (t) => t * t * t;
export const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
export const easeOutBack = (t) => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
export const easeOutElastic = (t) => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const c4 = (2 * Math.PI) / 3;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

export const dist2D = (ax, az, bx, bz) => Math.hypot(ax - bx, az - bz);

// Move `v` toward `target` by at most `maxDelta`.
export const moveToward = (v, target, maxDelta) => {
  if (Math.abs(target - v) <= maxDelta) return target;
  return v + Math.sign(target - v) * maxDelta;
};
