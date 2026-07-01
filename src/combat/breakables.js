// Breakables: pots, crates, crystals, lanterns. Registered by prop builders;
// shots and explosions shatter them into region-colored debris. Some hide a
// health mote — smashing things should sometimes pay.

import { G } from '../state.js';
import { sfx } from '../core/audio.js';
import { juice } from '../fx/juice.js';
import { CFG } from '../config.js';

const MATERIAL_SFX = { wood: 'breakwood', pot: 'breakpot', crystal: 'breakcrystal', lantern: 'breakcrystal' };

export class Breakables {
  constructor() {
    this.list = [];
  }

  // colliderItem gets a backref so raycasts can find us.
  register(mesh, colliderItem, material, opts = {}) {
    const b = {
      mesh, colliderItem, material,
      x: opts.x ?? mesh.position.x, y: opts.y ?? mesh.position.y, z: opts.z ?? mesh.position.z,
      color: opts.color || { wood: [0.55, 0.4, 0.25], pot: [0.72, 0.55, 0.4], crystal: [0.6, 0.9, 1.0], lantern: [1.0, 0.8, 0.4] }[material],
      moteChance: opts.moteChance ?? 0.3,
      ctx: opts.ctx || 'world',
      broken: false,
      glowing: material === 'lantern' || material === 'crystal',
    };
    if (colliderItem) colliderItem.breakable = b;
    this.list.push(b);
    return b;
  }

  break_(b, dir) {
    if (b.broken) return;
    b.broken = true;
    b.mesh.visible = false;
    if (b.colliderItem) b.colliderItem.dead = true;

    const floor = G.collide.groundAt(b.x, b.z, b.y + 1, 2);
    G.particles?.debris(b.x, b.y + 0.2, b.z, 10, b.color, { dir, floorY: floor });
    G.particles?.burst('impact', b.x, b.y + 0.2, b.z, 6, { color: b.color });
    if (b.glowing) G.rovers?.pulse(b.x, b.y + 0.4, b.z, b.color, 2.4, 8);
    sfx(MATERIAL_SFX[b.material] || 'breakwood');
    juice.shake(CFG.shake.breakProp);

    if (Math.random() < b.moteChance && G.player && G.player.pips < G.player.maxPips) {
      G.motes?.spawn('health', b.x, b.y + 0.5, b.z, 1);
    }
    G.onBreak?.(b);
  }

  breakNear(x, y, z, radius) {
    for (const b of this.list) {
      if (b.broken) continue;
      const d = Math.hypot(b.x - x, b.y - y, b.z - z);
      if (d < radius) this.break_(b, { x: (b.x - x) / (d || 1), y: 0.3, z: (b.z - z) / (d || 1) });
    }
  }

  // Interior teardown: forget everything registered for that context.
  clearCtx(ctx) {
    this.list = this.list.filter((b) => b.ctx !== ctx);
  }

  // Ambient glow for lanterns/crystals near the player (rover lights).
  update(px, py, pz) {
    const inWorld = G.mode === 'world';
    for (const b of this.list) {
      if (b.broken || !b.glowing) continue;
      if ((b.ctx === 'world') !== inWorld) continue;
      const d2 = (b.x - px) ** 2 + (b.z - pz) ** 2;
      if (d2 < 30 * 30) G.rovers?.request(b.x, b.y + 0.5, b.z, b.color, 1.1, 10);
    }
  }
}
