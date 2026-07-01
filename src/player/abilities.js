// Reward ceremonies. A boss falls → the world slows → the Sparkcaster grows
// a new piece → one whisper names the verb and its key — then the game gets
// out of the way and lets you feel it.

import { G } from '../state.js';
import { save } from '../core/save.js';
import { sfx } from '../core/audio.js';
import { juice } from '../fx/juice.js';

const REWARDS = {
  dash: {
    apply: (s) => { s.abilities.dash = true; },
    line: 'DASH — SHIFT',
  },
  lance: {
    apply: (s) => { s.altFires.lance = true; },
    line: 'LANCE — HOLD RIGHT CLICK',
  },
  wings: {
    apply: (s) => { s.abilities.doubleJump = true; s.abilities.glide = true; },
    line: 'WINGS — JUMP TWICE · HOLD TO GLIDE',
  },
  seeker: {
    apply: (s) => { s.altFires.seeker = true; },
    line: 'SEEKERS — Q',
  },
  grapple: {
    apply: (s) => { s.abilities.grapple = true; s.abilities.slam = true; },
    line: 'GRAPPLE — E · SLAM — C IN AIR',
  },
};

export function grantReward(key) {
  const r = REWARDS[key];
  if (!r) return;
  r.apply(G.save);
  save();
  juice.slowmo('unlock');
  sfx('unlock');
  G.hud?.syncVerbs(G.save);
  G.hud?.whisper(r.line, 5.5);
  G.weapon?.syncEvolution(G.save);
  G.player && (G.player.iFrames = Math.max(G.player.iFrames, 2.5));
}

export function discover(dest) {
  if (G.save.found[dest.id]) return;
  G.save.found[dest.id] = true;
  save();
  sfx('discover');
  G.hud?.whisper(dest.name, 3.6);
}
