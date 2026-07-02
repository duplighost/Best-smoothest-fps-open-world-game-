// Glide tree-climb regression test.
//
// The bug ("stutter but never stick"): two layers conspired against climbing.
//  1. index.html's page patch blocked all ground/near-ground grabs unless the
//     glide button was held, and re-armed _grabCooldown=0.45 every idle ground
//     frame, so ground grabs were permanently dead.
//  2. The bundle's _climb ejected (_leap) when the squared distance to the
//     segment AXIS exceeded 9 (3m), but grabs trigger at the attach-window
//     boundary (~3.3-4.1m) - so any grab that did land was ejected next frame.
// This test drives the real game through window.__GAME and passes only when a
// grab holds and the squirrel gains height on the trunk, from ground and air.
//
// Hook placement matters: index.html wraps _leap/_tryGrabTree as instance own
// properties (shadowing the prototype), so those are hooked on the instance;
// _enterClimb has no wrapper and is hooked on the prototype.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const PORT = 8791;

let pass = 0, fail = 0;
const ok = (cond, name, extra = '') => {
  if (cond) { pass++; console.log(`  ok  ${name}`); }
  else { fail++; console.log(`FAIL  ${name}${extra ? ' — ' + extra : ''}`); }
};

const server = spawn('node', [join(root, 'tests/serve.mjs'), String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader-webgl', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.setDefaultTimeout(180000);
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(String(e)));

await page.goto(`http://localhost:${PORT}/site/glide/`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => {
  const g = window.__GAME;
  return !!(g && g.player && g.player.world && g.player.world.activeTrees && g.player.world.activeTrees.length > 20
    && g.__uprightGlidePatched); // page wrappers installed - hooks must go on top of them
});
console.log('game booted, trees active, page patch installed');

await page.evaluate(() => {
  const g = window.__GAME, p = g.player;
  const P = Object.getPrototypeOf(p);
  window.__log = [];
  const enter0 = P._enterClimb;
  P._enterClimb = function (...a) {
    window.__log.push({ ev: 'enter', y: +this.position.y.toFixed(2) });
    return enter0.apply(this, a);
  };
  const leap0 = p._leap.bind(p);
  p._leap = function (...a) {
    window.__log.push({ ev: 'leap', mag: a[0], st: this.state });
    return leap0(...a);
  };
  const grab0 = p._tryGrabTree.bind(p);
  p._tryGrabTree = function (...a) {
    const r = grab0(...a);
    window.__log.push({ ev: 'grab', ok: r });
    return r;
  };
  window.__samples = [];
  (function samp() {
    const q = window.__GAME.player;
    window.__samples.push({ st: q.state, y: +q.position.y.toFixed(2) });
    requestAnimationFrame(samp);
  })();
});

// One approach scenario: place the squirrel, keep feeding motion toward the
// trunk until a grab happens (or timeout), then hold "up" and watch the climb.
async function scenario(name, { air }) {
  const result = await page.evaluate(async ({ air }) => {
    const g = window.__GAME, p = g.player;
    g.__leftLaunchPerch = true; // clear the intro high-perch idle
    // nearest active tree with a decent, normal-sized trunk (skip the giant perch)
    let tree = null, best = 1 / 0;
    for (const t of p.world.activeTrees) {
      if (t.giant || !t.segments?.length || t.segments[0].r > 2) continue;
      if (t.topY - t.baseY < 5) continue;
      const d = Math.hypot(t.x - p.position.x, t.z - p.position.z);
      if (d < best) { best = d; tree = t; }
    }
    if (!tree) return { err: 'no suitable tree' };
    window.__log.length = 0;
    window.__samples.length = 0;
    p._grabCooldown = 0;
    p.climbTree = null; p.climbSeg = null;
    const startY = air ? Math.min(tree.baseY + 9, tree.topY - 1) : tree.baseY + 0.3;
    const D = air ? 6 : 6.5;
    p.position.set(tree.x + D, startY, tree.z);
    p.state = air ? 'air' : 'ground';
    p.velocity.set(0, 0, 0);

    const t0 = performance.now();
    await new Promise((done) => {
      const iv = setInterval(() => {
        if (p.state === 'climb' || performance.now() - t0 > 30000) { clearInterval(iv); done(); return; }
        if ((p.state === 'ground' || p.state === 'air') && p._grabCooldown <= 0) {
          const dx = tree.x - p.position.x, dz = tree.z - p.position.z;
          const d = Math.hypot(dx, dz) || 1;
          const spd = air ? 13 : 11; // air: stay above the <12 facing-rescue rewrite
          p.velocity.x = (dx / d) * spd;
          p.velocity.z = (dz / d) * spd;
          p.facing = Math.atan2(dx, dz);
          if (air) {
            p.velocity.y = Math.max(p.velocity.y, -2);
            p.position.y = Math.max(p.position.y, tree.baseY + 5);
          }
          if (d < 0.5) { p.position.x = tree.x + D; p.position.z = tree.z; } // passed through: reset approach
        }
      }, 16);
    });

    const grabbedAt = window.__samples.length;
    const yAtGrab = p.position.y;
    if (p.state === 'climb') {
      const t1 = performance.now();
      await new Promise((done) => {
        const iv = setInterval(() => {
          if (g.input?.move) g.input.move.y = 1; // hold "up" the trunk
          if (performance.now() - t1 > 10000 || p.state !== 'climb') { clearInterval(iv); done(); }
        }, 16);
      });
      if (g.input?.move) g.input.move.y = 0;
    }
    const tail = window.__samples.slice(grabbedAt);
    return {
      attempts: window.__log.filter((e) => e.ev === 'grab').length,
      enters: window.__log.filter((e) => e.ev === 'enter').length,
      leaps: window.__log.filter((e) => e.ev === 'leap').length,
      climbFrames: tail.filter((s) => s.st === 'climb').length,
      yGain: +(p.position.y - yAtGrab).toFixed(2),
      endState: p.state,
      firstEvents: window.__log.slice(0, 8),
    };
  }, { air });

  console.log(`\n[${name}]`, JSON.stringify(result));
  if (result.err) { ok(false, `${name}: ${result.err}`); return; }
  ok(result.enters > 0, `${name}: grab attached on approach`, `attempts=${result.attempts}`);
  // climb "held" = still on the tree after the 10s climb phase with zero auto-ejects
  // (frame counts are useless under SwiftShader's ~1fps sampling; assert state instead)
  ok(result.endState === 'climb' && result.leaps === 0, `${name}: climb state held`, `end=${result.endState} leaps=${result.leaps}`);
  ok(result.yGain > 1.0, `${name}: climbed up the trunk (dy=${result.yGain})`);
}

// Intro high-perch must survive the radius-aware tether (its giant trunk is
// r=9.4, so the squirrel idles ~10m from the segment axis - a flat tether ejects it).
const perch = await page.evaluate(async () => {
  const g = window.__GAME, p = g.player;
  window.__log.length = 0;
  const st0 = p.state;
  await new Promise((r) => setTimeout(r, 5000));
  return { st0, st1: p.state, leaps: window.__log.filter((e) => e.ev === 'leap').length };
});
console.log('\n[intro perch]', JSON.stringify(perch));
ok(perch.st0 === 'climb' && perch.st1 === 'climb' && perch.leaps === 0, 'intro perch: idle climb holds', JSON.stringify(perch));

await scenario('ground approach', { air: false });

// Deliberate exit: Space while climbing must still launch the squirrel off the tree.
const offTree = await page.evaluate(() => window.__GAME.player.state);
if (offTree === 'climb') {
  await page.keyboard.press('Space');
  await page.waitForFunction(() => window.__GAME.player.state !== 'climb', null, { timeout: 30000 });
  const st = await page.evaluate(() => window.__GAME.player.state);
  ok(st === 'air', `space launches off the tree (state=${st})`);
} else {
  ok(false, 'space launch: player was not climbing after ground scenario');
}

await scenario('air approach', { air: true });

ok(pageErrors.length === 0, 'no page errors', pageErrors.join(' | '));
await browser.close();
server.kill();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
