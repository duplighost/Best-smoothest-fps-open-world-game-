// MARROW — full-playthrough regression test.
// Drives the real game through the ?debug surface (window.__MARROW): forest key
// -> house -> upstairs via the seamless stair swap -> garden key + sentinel ->
// the hunt (nav-driven; the creature must actually REACH you through walls,
// which is the no-more-stuck-in-walls proof) -> garden door -> graveyard beats
// -> chapel -> crypt -> the eye ending -> restart.
//
// SwiftShader runs ~0.2x wall speed, so every wait is a condition with a fat
// timeout — never a frame count or fps threshold.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const PORT = 8796;

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
page.on('pageerror', (e) => pageErrors.push(String(e.message).slice(0, 200)));

// helpers -------------------------------------------------------------------
const M = (fn, arg) => page.evaluate(fn, arg);
async function teleport(x, z, faceX = null, faceZ = null) {
  await M(({ x, z, faceX, faceZ }) => {
    const g = window.__MARROW, p = g.player;
    p.pos.x = x; p.pos.z = z;
    if (p.groundAt) p.pos.y = p.groundAt(x, z);
    if (faceX !== null) { p.yaw = Math.atan2(-(faceX - x), -(faceZ - z)); p.pitch = 0; }
  }, { x, z, faceX, faceZ });
}
async function useFocused(label) {
  // let the interaction manager focus it on a real frame, then use it
  const usedNow = await page.waitForFunction(() => {
    const g = window.__MARROW;
    if (!g.interaction.focused) return false;
    return g.interaction.tryUse(g.ctx);
  }, null, { timeout: 30000 }).catch(() => null);
  ok(!!usedNow, label);
}
const level = () => M(() => window.__MARROW.getLevel()?.name);
async function waitLevel(name) {
  await page.waitForFunction((n) => window.__MARROW.getLevel()?.name === n && !document.getElementById('loading').classList.contains('show'), name, { timeout: 90000 });
  await page.waitForTimeout(1200);
}

// boot ------------------------------------------------------------------------
await page.goto(`http://localhost:${PORT}/site/marrow/?debug`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => window.__MARROW, null, { timeout: 60000 });
await M(() => document.getElementById('boot').dispatchEvent(new PointerEvent('pointerdown')));
await page.waitForFunction(() => window.__MARROW.started() && window.__MARROW.getLevel(), null, { timeout: 60000 });
ok((await level()) === 'forest', 'boots into the forest');

// draw-call budget per zone: accumulate over a few real frames, take the mean
async function drawCalls() {
  return M(() => new Promise((res) => {
    const r = window.__MARROW.renderer;
    r.info.autoReset = false; r.info.reset();
    let frames = 0;
    const tick = () => {
      if (++frames >= 4) {
        const per = Math.round(r.info.render.calls / frames);
        r.info.autoReset = true;
        res(per);
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }));
}
const forestDraws = await drawCalls();
ok(forestDraws > 5 && forestDraws < 500, `forest draw calls in budget (${forestDraws})`);

// ACT I: the woods -------------------------------------------------------------
await teleport(16, -16.8, 16, -18);           // walk up to the shrine key
await useFocused('take the iron key');
ok(await M(() => window.__MARROW.ctx.inventory.has('ironkey')), 'iron key in inventory');
// rear garden exists and the graveyard gate is a real (locked) thing
const gateLocked = await M(() => {
  const g = window.__MARROW;
  const gate = g.ctx.interactables.find((i) => i.canUse && !i.canUse(g.ctx) && i.pos.z < -60);
  return !!gate;
});
ok(gateLocked, 'rear garden graveyard gate present + locked');
await teleport(0, -41.5, 0, -44);             // the front door
await useFocused('unlock the front door with the iron key');
await waitLevel('house');
ok(true, 'entered the house');

// ACT II: the house -------------------------------------------------------------
const houseDraws = await drawCalls();
ok(houseDraws > 5 && houseDraws < 500, `house draw calls in budget (${houseDraws})`);
// walk up the grand staircase for real — WASD through the swap, turning the
// switchback the way a person does: up, east along the landing past the newel,
// then south up the return flight.
await teleport(0, 8.2, 0, 2);                 // hall, facing the stairs
await M(() => { window.__stairStage = 0; });
await page.keyboard.down('KeyW');
const swapped = await page.waitForFunction(() => {
  const g = window.__MARROW, p = g.player;
  if (p.pos.x > 300) return true;                                   // crossed the seam
  if (window.__stairStage === 0 && p.pos.z < 2.3 && p.pos.y > 1.6) {
    window.__stairStage = 1;                                        // on the landing: head east
  }
  if (window.__stairStage === 1) {
    p.yaw = Math.atan2(-1, 0);                                      // face +x
    if (p.pos.x > 2.3) window.__stairStage = 2;                     // past the newel: head up the flight
  }
  if (window.__stairStage === 2) {
    p.yaw = Math.atan2(-(2.45 - p.pos.x), -(5.2 - p.pos.z));        // south, up the return flight
  }
  return false;
}, null, { timeout: 90000 }).catch(() => null);
await page.keyboard.up('KeyW');
ok(!!swapped, 'walked up the grand staircase through the seamless floor swap');
const upstairsY = await M(() => +window.__MARROW.player.pos.y.toFixed(2));
ok(upstairsY > -2.1 && upstairsY < 0.4, `stair ground-height continuous through swap (y=${upstairsY})`);
// finish the climb onto the balcony
await M(() => { const p = window.__MARROW.player; p.yaw = Math.atan2(-(402.45 - p.pos.x), -(6.6 - p.pos.z)); });
await page.keyboard.down('KeyW');
await page.waitForFunction(() => {
  const p = window.__MARROW.player;
  return p.pos.x > 300 && p.pos.z > 5.6 && Math.abs(p.pos.y) < 0.15;
}, null, { timeout: 60000 }).catch(() => null);
await page.keyboard.up('KeyW');
const balcony = await M(() => ({ x: +window.__MARROW.player.pos.x.toFixed(1), z: +window.__MARROW.player.pos.z.toFixed(1), y: +window.__MARROW.player.pos.y.toFixed(2) }));
ok(balcony.x > 300 && balcony.z > 5.6 && Math.abs(balcony.y) < 0.15, `stepped onto the balcony (x=${balcony.x} z=${balcony.z} y=${balcony.y})`);

// master bedroom: open the door, meet the sentinel, take the key
await teleport(405, 6.5, 406, 6.5);
await useFocused('open the master bedroom door');
await teleport(409.5, 6.5);                    // sentinel trigger
await page.waitForFunction(() => window.__MARROW.director.entity.mode === 'guard', null, { timeout: 30000 }).catch(() => null);
ok(await M(() => window.__MARROW.director.entity.mode === 'guard'), 'the sentinel stands over the garden key');
await teleport(411.4, 8.1, 412.5, 8.5);        // walk up to the key under its gaze
await useFocused('take the garden key');
ok(await M(() => window.__MARROW.ctx.inventory.has('gardenkey')), 'garden key in inventory');
ok(await M(() => window.__MARROW.director._huntArmed === true), 'the house hunt is armed');

// THE HUNT: it must find a path through the house and actually reach you.
// Stand still in the bedroom — walls and a doorway between you and wherever it
// wakes. The old game wedged into a wall here; the nav grid must not.
const caught = await page.waitForFunction(() => {
  const d = window.__MARROW.director;
  return d._hunting && d.entity.isVisible && d.entity.distanceTo(window.__MARROW.player.pos) < 1.6;
}, null, { timeout: 150000 }).catch(() => null);
ok(!!caught, 'the hunter navigated the house and reached the player (never stuck)');
await page.waitForFunction(() => !window.__MARROW.player.frozen, null, { timeout: 30000 }).catch(() => null);
ok(await M(() => !window.__MARROW.player.frozen), 'caught-beat releases the player');

// down and out the garden door
await teleport(9, -8.4, 9, -11.4);             // kitchen approach; the subversion beat arms here
await page.waitForTimeout(600);
await teleport(9, -10.2, 9, -11.4);            // up to the door
await useFocused('unlock the garden door');
await waitLevel('graveyard');
ok(true, 'out into the graveyard');

// ACT III: the graveyard ---------------------------------------------------------
const yardDraws = await drawCalls();
ok(yardDraws > 5 && yardDraws < 500, `graveyard draw calls in budget (${yardDraws})`);
await teleport(0, 22.5, 0, 10);                // gate slams shut behind you
await page.waitForTimeout(800);
ok(await M(() => {
  const f = window.__MARROW.getLevel().field;
  return f.dynamic.some((b) => b.active);      // the gate blocker is armed
}), 'the gate shut and locked behind you');
await teleport(-3, 6, 3.6, 1.5);               // the first grave erupt
await page.waitForFunction(() => window.__MARROW.director.entity.isVisible, null, { timeout: 30000 }).catch(() => null);
ok(await M(() => window.__MARROW.director.entity.isVisible), 'something clawed up out of the mound');
await M(() => window.__MARROW.director.entity.hardHide());
// statues turn while unwatched (their yaw changes when the player faces away)
await teleport(10, 12, 30, 12);                // near a statue, facing away from it
const statueTurns = await M(() => new Promise((res) => {
  const g = window.__MARROW;
  const lvl = g.getLevel();
  // sample any statue-ish rotation via scene: track a known statue position
  let y0 = null; let tries = 0;
  const probe = () => {
    let statue = null;
    g.scene.traverse((o) => { if (!statue && o.isGroup && Math.abs(o.position.x - 8) < 0.1 && Math.abs(o.position.z - 12) < 0.1) statue = o; });
    if (!statue) { res(false); return; }
    if (y0 === null) { y0 = statue.rotation.y; }
    if (Math.abs(statue.rotation.y - y0) > 0.05) { res(true); return; }
    if (++tries > 40) { res(false); return; }
    setTimeout(probe, 250);
  };
  probe();
}));
ok(statueTurns, 'the mourning statue turned while unwatched');
// the chapel breach beat, then in and down
await teleport(10.4, -28, 7, -28);
await page.waitForTimeout(500);
await teleport(3, -28, -4.6, -30);             // inside the chapel
await teleport(-4.6, -31.5, -4.6, -33);        // down the crypt stair
const stairY = await M(() => +window.__MARROW.player.pos.y.toFixed(2));
ok(stairY < -1.2, `descended the crypt stair (y=${stairY})`);
await useFocused('open the crypt door');
await waitLevel('crypt');
ok(true, 'into the crypt');

// FINALE ------------------------------------------------------------------------
ok(await M(() => window.__MARROW.director.entity.mode === 'guard'), 'the altar guardian waits');
const cryptDraws = await drawCalls();
ok(cryptDraws > 5 && cryptDraws < 500, `crypt draw calls in budget (${cryptDraws})`);
await teleport(0, -23.4, 0, -25);
await useFocused('take the relic');
ok(await M(() => window.__MARROW.director.ended), 'the ending began');
await page.waitForFunction(() => document.getElementById('endcard').classList.contains('show'), null, { timeout: 60000 });
ok(true, 'endcard: it kept you');

// restart loops clean
await M(() => document.getElementById('endcard').click());
await page.waitForFunction(() => window.__MARROW.getLevel()?.name === 'forest', null, { timeout: 60000 });
ok(await M(() => window.__MARROW.ctx.inventory.size === 0), 'restart: fresh forest, empty inventory');

ok(pageErrors.length === 0, 'zero page errors across the full playthrough', pageErrors.join(' | '));
await browser.close();
server.kill();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
