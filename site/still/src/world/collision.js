// ColliderField: grid-broadphase static collision, extended with height so
// jumps, platforms, and interiors work. Two primitive kinds:
//   circle { x, z, r, y0, y1 }         — trunks, columns, enemies-as-obstacles
//   box    { x0, z0, x1, z1, y0, y1 }  — walls, furniture, floors
// Boxes can be `standable` — their top surface is a floor (with step-up).
// The player capsule resolves in XZ against anything overlapping its Y span,
// and ground height = max(terrain/base floor, standable tops under the feet).

const CELL = 4;

export class ColliderField {
  constructor(groundFn) {
    this.groundFn = groundFn || (() => 0);   // base ground height (terrain or floor)
    this.grid = new Map();
    this.items = [];
    this.standables = [];
  }

  _key(cx, cz) { return cx * 100000 + cz; }

  _insert(item, x0, z0, x1, z1) {
    const idx = this.items.length;
    this.items.push(item);
    for (let cx = Math.floor(x0 / CELL); cx <= Math.floor(x1 / CELL); cx++) {
      for (let cz = Math.floor(z0 / CELL); cz <= Math.floor(z1 / CELL); cz++) {
        const k = this._key(cx, cz);
        let arr = this.grid.get(k);
        if (!arr) { arr = []; this.grid.set(k, arr); }
        arr.push(idx);
      }
    }
    return item;
  }

  addCircle(x, z, r, y0, y1) {
    return this._insert({ kind: 'c', x, z, r, y0, y1 }, x - r, z - r, x + r, z + r);
  }

  addBox(x0, z0, x1, z1, y0, y1, opts = {}) {
    const item = { kind: 'b', x0, z0, x1, z1, y0, y1, standable: !!opts.standable, blockShots: opts.blockShots !== false };
    if (item.standable) this.standables.push(item);
    return this._insert(item, x0, z0, x1, z1);
  }

  // Gather item indices near a point (radius <= ~2 cells).
  _near(x, z, r, out) {
    out.length = 0;
    for (let cx = Math.floor((x - r) / CELL); cx <= Math.floor((x + r) / CELL); cx++) {
      for (let cz = Math.floor((z - r) / CELL); cz <= Math.floor((z + r) / CELL); cz++) {
        const arr = this.grid.get(this._key(cx, cz));
        if (arr) for (let i = 0; i < arr.length; i++) if (!out.includes(arr[i])) out.push(arr[i]);
      }
    }
    return out;
  }

  // Push a capsule (feetY..headY, radius r) out of everything overlapping in
  // XZ. Returns the entity's corrected position via the `p` object {x, z}.
  // Walls produce clean slide because each push is along the contact normal.
  resolve(p, r, feetY, headY, scratch = []) {
    for (let iter = 0; iter < 3; iter++) {
      let pushed = false;
      const near = this._near(p.x, p.z, r + 0.5, scratch);
      for (let i = 0; i < near.length; i++) {
        const it = this.items[near[i]];
        if (it.dead) continue;
        if (headY <= it.y0 + 0.001 || feetY >= it.y1 - 0.001) continue;
        if (it.kind === 'c') {
          const dx = p.x - it.x, dz = p.z - it.z;
          const d = Math.hypot(dx, dz), min = r + it.r;
          if (d < min && d > 1e-5) {
            const push = (min - d) + 0.001;
            p.x += (dx / d) * push; p.z += (dz / d) * push;
            pushed = true;
          }
        } else {
          // circle vs AABB (closest point)
          const cx = Math.max(it.x0, Math.min(p.x, it.x1));
          const cz = Math.max(it.z0, Math.min(p.z, it.z1));
          const dx = p.x - cx, dz = p.z - cz;
          const d2 = dx * dx + dz * dz;
          if (d2 < r * r) {
            if (d2 > 1e-9) {
              const d = Math.sqrt(d2);
              const push = (r - d) + 0.001;
              p.x += (dx / d) * push; p.z += (dz / d) * push;
            } else {
              // center inside the box — exit along the shortest axis
              const exL = p.x - it.x0 + r, exR = it.x1 - p.x + r;
              const ezL = p.z - it.z0 + r, ezR = it.z1 - p.z + r;
              const m = Math.min(exL, exR, ezL, ezR);
              if (m === exL) p.x = it.x0 - r; else if (m === exR) p.x = it.x1 + r;
              else if (m === ezL) p.z = it.z0 - r; else p.z = it.z1 + r;
            }
            pushed = true;
          }
        }
      }
      if (!pushed) break;
    }
    return p;
  }

  // Ground height under (x, z) for feet currently at feetY: base ground plus
  // any standable top within step-up range (or below the feet — falling lands
  // on platforms).
  groundAt(x, z, feetY, stepUp = 0.55) {
    let g = this.groundFn(x, z);
    for (let i = 0; i < this.standables.length; i++) {
      const s = this.standables[i];
      if (s.dead) continue;
      if (x < s.x0 - 0.05 || x > s.x1 + 0.05 || z < s.z0 - 0.05 || z > s.z1 + 0.05) continue;
      if (s.y1 <= feetY + stepUp && s.y1 > g) g = s.y1;
    }
    return g;
  }

  // Ceiling above the head (lowest y0 of a box whose XZ contains the point
  // and whose bottom is above `y`). Interiors use this; outdoors returns Inf.
  ceilingAt(x, z, y, scratch = []) {
    let c = Infinity;
    const near = this._near(x, z, 0.5, scratch);
    for (let i = 0; i < near.length; i++) {
      const it = this.items[near[i]];
      if (it.dead || it.kind !== 'b') continue;
      if (x < it.x0 || x > it.x1 || z < it.z0 || z > it.z1) continue;
      if (it.y0 >= y && it.y0 < c) c = it.y0;
    }
    return c;
  }

  // 3D ray vs static world. Marches the ray, testing base ground analytically
  // and blockers per-cell. Returns { t, x, y, z } or null. Good enough for
  // hitscan weapons; enemies are tested separately as exact spheres.
  raycast(ox, oy, oz, dx, dy, dz, maxDist, scratch = []) {
    const step = 0.5;
    let t = 0;
    let px = ox, py = oy, pz = oz;
    while (t < maxDist) {
      t += step;
      px = ox + dx * t; py = oy + dy * t; pz = oz + dz * t;
      const g = this.groundFn(px, pz);
      if (py <= g) {
        // refine by bisection for a crisp impact point
        let lo = t - step, hi = t;
        for (let i = 0; i < 5; i++) {
          const mid = (lo + hi) / 2;
          const my = oy + dy * mid;
          if (my <= this.groundFn(ox + dx * mid, oz + dz * mid)) hi = mid; else lo = mid;
        }
        t = hi;
        return { t, x: ox + dx * t, y: oy + dy * t, z: oz + dz * t, ground: true };
      }
      const near = this._near(px, pz, 0.9, scratch);
      for (let i = 0; i < near.length; i++) {
        const it = this.items[near[i]];
        if (it.dead || it.blockShots === false) continue;
        if (py < it.y0 || py > it.y1) continue;
        if (it.kind === 'c') {
          const ddx = px - it.x, ddz = pz - it.z;
          if (ddx * ddx + ddz * ddz < it.r * it.r) return { t, x: px, y: py, z: pz, item: it };
        } else if (px >= it.x0 && px <= it.x1 && pz >= it.z0 && pz <= it.z1) {
          return { t, x: px, y: py, z: pz, item: it };
        }
      }
    }
    return null;
  }

  // 2D line-of-sight between two points at a given height band.
  segmentClear(x0, z0, x1, z1, y, scratch = []) {
    const dist = Math.hypot(x1 - x0, z1 - z0);
    const steps = Math.ceil(dist / 1.2);
    for (let i = 1; i < steps; i++) {
      const f = i / steps;
      const x = x0 + (x1 - x0) * f, z = z0 + (z1 - z0) * f;
      const near = this._near(x, z, 0.4, scratch);
      for (let j = 0; j < near.length; j++) {
        const it = this.items[near[j]];
        if (it.dead) continue;
        if (y < it.y0 || y > it.y1) continue;
        if (it.kind === 'c') {
          const dx = x - it.x, dz = z - it.z;
          if (dx * dx + dz * dz < it.r * it.r) return false;
        } else if (x >= it.x0 && x <= it.x1 && z >= it.z0 && z <= it.z1) return false;
      }
    }
    return true;
  }
}
