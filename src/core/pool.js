// Fixed-size object pool. Nothing in the hot path allocates during play:
// projectiles, particles, motes, and shards all cycle through pools.

export class Pool {
  constructor(create, capacity) {
    this.items = new Array(capacity);
    this.active = [];
    this.free = [];
    for (let i = 0; i < capacity; i++) {
      const it = create(i);
      this.items[i] = it;
      this.free.push(it);
    }
  }

  // Returns an item or null when exhausted (callers must tolerate null —
  // dropping a particle beats a frame hitch from growing the pool).
  obtain() {
    const it = this.free.pop();
    if (!it) return null;
    this.active.push(it);
    return it;
  }

  release(it) {
    const idx = this.active.indexOf(it);
    if (idx === -1) return;
    this.active[idx] = this.active[this.active.length - 1];
    this.active.pop();
    this.free.push(it);
  }

  // Iterate active items; callback returning false releases the item.
  // Safe against release-during-iteration because we walk backwards.
  update(fn) {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const it = this.active[i];
      if (fn(it) === false) {
        this.active[i] = this.active[this.active.length - 1];
        this.active.pop();
        this.free.push(it);
      }
    }
  }

  releaseAll() {
    for (let i = this.active.length - 1; i >= 0; i--) this.free.push(this.active[i]);
    this.active.length = 0;
  }
}
