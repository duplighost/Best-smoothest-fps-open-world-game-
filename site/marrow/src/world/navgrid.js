// Flow-field navigation over a ColliderField. Bakes a coarse walkable grid for
// a zone once at build time, then BFS-floods it from wherever the player is a
// few times a second. The Presence follows the flow downhill, which means it
// rounds corners and doorways like something that knows the building — and it
// can NEVER wedge itself into a wall, which the old steer-straight-at-you chase
// did constantly.

export class NavGrid {
  constructor(field, minx, minz, maxx, maxz, cell = 0.65, radius = 0.42) {
    this.field = field;
    this.cell = cell;
    this.minx = minx; this.minz = minz;
    this.cols = Math.max(2, Math.ceil((maxx - minx) / cell));
    this.rows = Math.max(2, Math.ceil((maxz - minz) / cell));
    const n = this.cols * this.rows;
    this.walk = new Uint8Array(n);        // 1 = static geometry leaves room here
    this.dist = new Int32Array(n);        // BFS depth from the current target
    this.from = new Int32Array(n);        // index we reached this cell from
    this._queue = new Int32Array(n);
    this._goal = -1;
    this._bakeStatic(radius);
  }

  _idx(ix, iz) { return ix + iz * this.cols; }
  _cellAt(x, z) {
    const ix = Math.floor((x - this.minx) / this.cell);
    const iz = Math.floor((z - this.minz) / this.cell);
    if (ix < 0 || iz < 0 || ix >= this.cols || iz >= this.rows) return -1;
    return this._idx(ix, iz);
  }
  _center(i, out) {
    out.x = this.minx + ((i % this.cols) + 0.5) * this.cell;
    out.z = this.minz + ((Math.floor(i / this.cols)) + 0.5) * this.cell;
    return out;
  }

  _bakeStatic(radius) {
    for (let iz = 0; iz < this.rows; iz++) {
      for (let ix = 0; ix < this.cols; ix++) {
        const x = this.minx + (ix + 0.5) * this.cell;
        const z = this.minz + (iz + 0.5) * this.cell;
        this.walk[this._idx(ix, iz)] = this.field.overlapsStatic(x, z, radius) ? 0 : 1;
      }
    }
  }

  // Doors open and close at runtime, so active dynamic boxes are tested live
  // during the flood instead of baked.
  _dynBlocked(x, z, r) {
    for (const b of this.field.dynamic) {
      if (!b.active) continue;
      const cx = Math.max(b.minx, Math.min(x, b.maxx));
      const cz = Math.max(b.minz, Math.min(z, b.maxz));
      if (Math.hypot(x - cx, z - cz) < r) return true;
    }
    return false;
  }

  // Flood from the target (the player). Call at a few Hz, not per frame.
  flood(tx, tz) {
    const goal = this._cellAt(tx, tz);
    this.dist.fill(-1);
    this._goal = goal;
    if (goal < 0 || !this.walk[goal]) return;
    const q = this._queue;
    let head = 0, tail = 0;
    q[tail++] = goal; this.dist[goal] = 0; this.from[goal] = goal;
    const { cols, rows, cell } = this;
    const r = cell * 0.55;
    while (head < tail) {
      const i = q[head++];
      const ix = i % cols, iz = (i / cols) | 0;
      const d = this.dist[i] + 1;
      // 4-way flood; diagonals come from the smoothing in dirFrom, so corners
      // are never cut through a wall.
      for (let k = 0; k < 4; k++) {
        const nx = ix + (k === 0 ? 1 : k === 1 ? -1 : 0);
        const nz = iz + (k === 2 ? 1 : k === 3 ? -1 : 0);
        if (nx < 0 || nz < 0 || nx >= cols || nz >= rows) continue;
        const ni = nx + nz * cols;
        if (!this.walk[ni] || this.dist[ni] >= 0) continue;
        const wx = this.minx + (nx + 0.5) * cell, wz = this.minz + (nz + 0.5) * cell;
        if (this._dynBlocked(wx, wz, r)) continue;
        this.dist[ni] = d; this.from[ni] = i;
        q[tail++] = ni;
      }
    }
  }

  // BFS depth at a point (in cells), or -1 if unreached/off-grid. The Director
  // compares this to the crow-flies distance to smell "it can see you through a
  // wall it cannot walk through".
  depthAt(x, z) {
    const i = this._cellAt(x, z);
    return i < 0 ? -1 : this.dist[i];
  }

  // Direction (unit XZ, written into out {x,z}) to move from (x,z) toward the
  // flooded target. Walks two steps down the flow and aims at that cell centre,
  // which smooths the 4-way staircase into a natural diagonal — but only when
  // the straight line to it is clear; a diagonal that clips a corner would
  // grind a 0.42-radius body against the wall forever.
  dirFrom(x, z, out) {
    let i = this._cellAt(x, z);
    if (i < 0 || this.dist[i] < 0) {
      // off-grid or in an unreached pocket: try the nearest walkable neighbour
      i = this._nearestReached(x, z);
      if (i < 0) { out.x = 0; out.z = 0; return false; }
    }
    if (this.dist[i] === 0) { out.x = 0; out.z = 0; return true; }
    const one = this.from[i];
    let step = one;
    if (this.dist[step] > 0) {
      const two = this.from[step];
      const c2 = this._center(two, _scratch);
      if (this.field.segmentClear(x, z, c2.x, c2.z)) step = two;
    }
    const c = this._center(step, _scratch);
    const dx = c.x - x, dz = c.z - z;
    const l = Math.hypot(dx, dz) || 1;
    out.x = dx / l; out.z = dz / l;
    return true;
  }

  _nearestReached(x, z) {
    const ix0 = Math.floor((x - this.minx) / this.cell);
    const iz0 = Math.floor((z - this.minz) / this.cell);
    let best = -1, bd = Infinity;
    for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
      const ix = ix0 + dx, iz = iz0 + dz;
      if (ix < 0 || iz < 0 || ix >= this.cols || iz >= this.rows) continue;
      const i = this._idx(ix, iz);
      if (this.dist[i] < 0) continue;
      const d = dx * dx + dz * dz;
      if (d < bd) { bd = d; best = i; }
    }
    return best;
  }

  // A random reached cell whose BFS depth sits in [minD, maxD] cells — used to
  // re-emerge the hunter somewhere it could genuinely have walked to.
  randomReachedNear(minD, maxD, rand = Math.random) {
    const picks = [];
    for (let i = 0; i < this.dist.length; i++) {
      const d = this.dist[i];
      if (d >= minD && d <= maxD) { picks.push(i); if (picks.length > 400) break; }
    }
    if (!picks.length) return null;
    return this._center(picks[(rand() * picks.length) | 0], { x: 0, z: 0 });
  }
}

const _scratch = { x: 0, z: 0 };
