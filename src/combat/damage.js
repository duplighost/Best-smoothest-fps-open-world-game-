// The one place damage changes hands [ported discipline]. Every hit — shot,
// lance, seeker, dash, slam, explosion — routes through hitEnemy so every
// hit gets identical, calibrated juice. Kills feed movement: each kill
// refunds dash cooldown; movement kills hit harder and louder.

import { CFG } from '../config.js';
import { G } from '../state.js';
import { sfx } from '../core/audio.js';
import { juice } from '../fx/juice.js';

const chain = { n: 0, lastAt: -9 };
const TIER_NAMES = ['DOUBLE', 'TRIPLE', 'OVERKILL', 'RAMPAGE', 'MASSACRE', 'ANNIHILATION'];

export function killChain() { return chain.n; }

export function hitEnemy(e, dmg, opts = {}) {
  if (!e.alive) return false;
  const kind = opts.kind || 'shot';
  const px = opts.point?.x ?? e.x, py = opts.point?.y ?? e.y, pz = opts.point?.z ?? e.z;

  e.hp -= dmg;
  e.flashT = CFG.enemies.hitFlash;
  e.squash = Math.min(0.5, (e.squash || 0) + 0.18);

  // knockback along the hit direction — floaty enemies drift, heavies barely
  if (opts.dir && !e.def.heavy) {
    const kb = kind === 'lance' ? 7 : kind === 'slam' ? 9 : 2.6;
    e.vx += opts.dir.x * kb;
    e.vz += opts.dir.z * kb;
    if (e.def.fly > 0) e.vy += 1.2;
  }

  G.particles?.burst('impact', px, py, pz, opts.headshot ? 9 : 5, { dir: opts.dir, color: e.def.color, jitterColor: true });
  G.rovers?.pulse(px, py, pz, e.def.color, 1.2, 12, 8);
  G.hud?.hitPip();
  sfx('hit', { pitch: opts.headshot ? 1.5 : 1 });
  juice.stop('hit');

  if (e.hp <= 0) kill(e, kind, opts);
  return true;
}

function kill(e, kind, opts) {
  const now = G.time.now;
  const moveKill = kind === 'dash' || kind === 'slam';
  G.debug.kills = (G.debug.kills || 0) + 1;

  // ceremony scaled by how you did it [ported calibration]
  juice.shake(moveKill ? CFG.shake.dashKill : CFG.shake.kill);
  juice.stop(moveKill ? 'dashKill' : 'kill');
  sfx('kill', { pitch: moveKill ? 1.2 : 1 });

  // chain crescendo — announce only at exact thresholds [ported]
  chain.n = (now - chain.lastAt <= CFG.chain.window) ? chain.n + 1 : 1;
  chain.lastAt = now;
  const tierIdx = CFG.chain.tiers.indexOf(chain.n);
  if (tierIdx >= 0) {
    sfx('chime', { pitch: 1 + tierIdx * 0.18 });
    G.hud?.whisper(TIER_NAMES[tierIdx], 1.1);
    if (chain.n >= 3) juice.slowmo('kill3');
  }

  // kills feed movement: dash comes back sooner [ported signature loop]
  if (G.player) G.player.dashCd = Math.max(0, G.player.dashCd - CFG.abilities.dash.killRefund);

  // body → debris + soul
  G.particles?.debris(e.x, e.y + 0.4, e.z, e.def.heavy ? 14 : 9, e.def.color, {
    dir: opts.dir, floorY: G.collide.groundAt(e.x, e.z, e.y + 1, 1), power: moveKill ? 1.4 : 1,
  });
  G.particles?.burst('soul', e.x, e.y + 0.5, e.z, 7, { color: e.def.color });
  G.rovers?.pulse(e.x, e.y + 0.5, e.z, e.def.color, 2.6, 7);

  // occasionally the world feeds you back
  if (G.player && G.player.pips < G.player.maxPips && Math.random() < 0.22) {
    G.motes?.spawn('health', e.x, e.y + 0.6, e.z, 1);
  }

  G.enemies.remove(e, true);
  G.onEnemyKilled?.(e, kind);
}
