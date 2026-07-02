// Headless run of STILL: boots, plays the house scene, walks every floor's
// core loop via the debug surface, reaches the ending, fails on console
// errors. Run: node tests/smoke-still.mjs [--shots]
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const PORT = 8753;
const SHOTS = process.argv.includes('--shots');
const shotDir = join(root, 'tests', 'shots-still');
if (SHOTS) mkdirSync(shotDir, { recursive: true });

const server = spawn('node', [join(root, 'tests/serve.mjs'), String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));

const errors = [];
const failures = [];
const check = (cond, msg) => {
  if (cond) console.log('  ok  -', msg);
  else { console.log('  FAIL-', msg); failures.push(msg); }
};

let browser;
try {
  browser = await chromium.launch({
    args: ['--use-gl=angle', '--use-angle=swiftshader-webgl', '--enable-unsafe-swiftshader',
      '--autoplay-policy=no-user-gesture-required'],
  });
  const page = await browser.newPage({ viewport: { width: 800, height: 450 } });
  page.setDefaultTimeout(90000);
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  const S = () => page.evaluate(() => window.__still.state());
  const shot = async (n) => {
    if (!SHOTS) return;
    await page.waitForFunction(() => document.getElementById('fader').style.opacity === '0', null, { timeout: 20000 }).catch(() => {});
    await page.screenshot({ path: join(shotDir, n + '.png') });
  };

  console.log('· loading…');
  await page.goto(`http://localhost:${PORT}/still/`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__still, null, { timeout: 60000 });
  await page.evaluate(() => localStorage.removeItem('still-floor'));
  check(true, 'boots to title');
  await shot('00-title');

  console.log('· floor 1: the house…');
  await page.evaluate(() => window.__still.start());
  await page.waitForFunction(() => window.__still.state().mode === 'play', null, { timeout: 30000 });
  let s = await S();
  check(s.floor === 0, `starts on the house (floor=${s.floor})`);
  check(s.fps >= 1, `renders (fps=${s.fps})`);
  check(s.drawCalls > 5 && s.drawCalls < 300, `draw calls ${s.drawCalls} sane`);
  await shot('01-house');

  // walk to the parlor: triggers the radio, then the pass. stay god for the tour.
  await page.evaluate(() => window.__still.god(true));
  await page.evaluate(() => window.__still.teleport(-4.2, 0.5));
  await page.waitForTimeout(600);
  // take the key (retry the press until it lands — headless frames are slow)
  await page.evaluate(() => window.__still.teleport(-6.0, 0.6));
  const keyworks = await (async () => {
    for (let i = 0; i < 12; i++) {
      await page.evaluate(() => window.__still.use());
      await page.waitForTimeout(450);
      if (await page.evaluate(() => !window.__still.G.floor.ctx.cellarDoor.locked)) return true;
    }
    return false;
  })();
  check(keyworks, 'key unlocks the cellar door');
  // taking the key summons the second pass
  const passRose = await page.waitForFunction(() =>
    window.__still.state().tension > 0.2 || window.__still.state().entity.mode === 'stalk',
    null, { timeout: 30000 }).then(() => true).catch(() => false);
  s = await S();
  check(passRose, `the pass raises tension (${s.tension}, entity=${s.entity.mode})`);
  await shot('02-house-pass');
  // through the cellar door
  for (let i = 0; i < 8; i++) {
    await page.evaluate(() => { window.__still.teleport(-0.1, -8.2); window.__still.use(); });
    await page.waitForTimeout(400);
    if (await page.evaluate(() => window.__still.G.floor.ctx.cellarDoor.open)) break;
  }
  await page.evaluate(() => window.__still.teleport(-0.1, -8.9));
  await page.waitForFunction(() => window.__still.state().floor === 1, null, { timeout: 20000 });
  check(true, 'descends to the cellar');

  console.log('· floor 2: the cellar…');
  await page.waitForFunction(() => window.__still.state().mode === 'play', null, { timeout: 20000 });
  s = await S();
  check(s.entity.mode === 'hunt', `it hunts (${s.entity.mode})`);
  await shot('03-cellar');
  // grab all three fuses, then the box
  for (const [x, z] of [[-9, -6], [9.2, 6], [4, -6.3]]) {
    for (let i = 0; i < 8; i++) {
      await page.evaluate(([x, z]) => { window.__still.teleport(x, z); window.__still.use(); }, [x, z]);
      await page.waitForTimeout(400);
      const n = await page.evaluate(() => window.__still.G.floor.ctx.state.fuses);
      if (n > 0 && i === 0) continue;
      const before = n;
      if (before) break;
    }
  }
  const fuses = await page.evaluate(() => window.__still.G.floor.ctx.state.fuses);
  check(fuses === 3, `all fuses pulled (${fuses})`);
  let opened = false;
  for (let i = 0; i < 8 && !opened; i++) {
    await page.evaluate(() => { window.__still.teleport(10.3, 3.0); window.__still.use(); });
    await page.waitForTimeout(450);
    opened = await page.evaluate(() => window.__still.G.floor.ctx.exitDoor.open);
  }
  check(opened, 'breaker opens the cellar door');
  await page.evaluate(() => window.__still.teleport(11.8, 1.4));
  await page.waitForFunction(() => window.__still.state().floor === 2, null, { timeout: 20000 });
  check(true, 'descends to the flood');

  console.log('· floor 3: the flood…');
  await page.waitForFunction(() => window.__still.state().mode === 'play', null, { timeout: 20000 });
  await shot('04-flood');
  // start the walk, then simulate walking the corridor
  await page.evaluate(() => window.__still.teleport(0, -4.2));
  await page.waitForTimeout(700);
  s = await S();
  check(s.entity.mode === 'flood', `it follows in the water (${s.entity.mode})`);
  const z0 = (await S()).pos.z;
  await page.evaluate(() => window.__still.hold('KeyW', true));
  await page.waitForTimeout(6000);
  await page.evaluate(() => window.__still.hold('KeyW', false));
  const z1 = (await S()).pos.z;
  check(z0 - z1 > 0.2, `wades forward (${(z0 - z1).toFixed(1)}m in 6s wall time, sim runs ~0.2x headless)`);
  await page.evaluate(() => window.__still.teleport(-0.1, -51.5));
  await page.waitForTimeout(400);
  for (let i = 0; i < 8; i++) {
    await page.evaluate(() => { window.__still.teleport(-0.1, -52.1); window.__still.use(); });
    await page.waitForTimeout(400);
    if (await page.evaluate(() => window.__still.G.floor.ctx.exitDoor.open)) break;
  }
  await page.evaluate(() => window.__still.teleport(-0.1, -52.8));
  await page.waitForFunction(() => window.__still.state().floor === 3, null, { timeout: 20000 });
  check(true, 'crosses the flood');

  console.log('· floor 4: the nursery…');
  await page.waitForFunction(() => window.__still.state().mode === 'play', null, { timeout: 20000 });
  await shot('05-nursery');
  // stand at the crank and hold E until the gate opens
  await page.evaluate(() => {
    window.__still.teleport(1.6, -5.0);
    window.__still.flash(true);
    window.__still.G.floor.ctx.state.progress = 8.4;   // validate the last stretch, not 60s of wall time
    window.__still.hold('KeyE', true);
  });
  await page.waitForFunction(() => window.__still.G.floor.ctx.state.open === true, null, { timeout: 45000 });
  await page.evaluate(() => window.__still.hold('KeyE', false));
  check(true, 'crank opens the gate');
  // the small ones must have crept while our light was on the crank
  const crept = await page.evaluate(() => {
    const ones = window.__still.G.floor.ctx.ones;
    return ones.some((o) => Math.hypot(o.x - window.__still.G.player.pos.x, o.z - window.__still.G.player.pos.z) < 5.5);
  });
  check(crept, 'the small ones crept while cranking');
  await page.evaluate(() => window.__still.teleport(0, -6.6));
  await page.waitForFunction(() => window.__still.state().floor === 4, null, { timeout: 20000 });
  check(true, 'descends into the long dark');

  console.log('· floor 5: the long dark…');
  await page.waitForFunction(() => window.__still.state().mode === 'play', null, { timeout: 20000 });
  s = await S();
  check(s.flash === false, 'the light is taken away');
  await shot('06-dark');
  // walk the S to the door and knock
  let gaze = false;
  for (let i = 0; i < 10 && !gaze; i++) {
    await page.evaluate(() => { window.__still.teleport(-2, -50); window.__still.use(); });
    await page.waitForTimeout(700);
    gaze = await page.evaluate(() => window.__still.G.floor.ctx.state.gaze);
  }
  check(gaze, 'the door asks to be seen');
  // turn around and hold the gaze
  await page.evaluate(() => {
    const G = window.__still.G;
    const e = G.entity.pos;
    G.player.yaw = Math.atan2(-(e.x - G.player.pos.x), -(e.z - G.player.pos.z));
  });
  // keep facing it while it comes
  const ended = await (async () => {
    for (let i = 0; i < 40; i++) {
      await page.waitForTimeout(400);
      const st = await S();
      if (st.mode === 'ending') return true;
      await page.evaluate(() => {
        const G = window.__still.G;
        const e = G.entity.pos;
        G.player.yaw = Math.atan2(-(e.x - G.player.pos.x), -(e.z - G.player.pos.z));
      });
    }
    return false;
  })();
  check(ended, 'holding the gaze ends the game');
  await shot('07-ending');

  // grab flow sanity: reload, get caught on purpose
  console.log('· being taken…');
  await page.evaluate(() => { localStorage.setItem('still-floor', '1'); location.reload(); });
  await page.waitForFunction(() => window.__still, null, { timeout: 60000 });
  await page.evaluate(() => window.__still.start());
  await page.waitForFunction(() => window.__still.state().mode === 'play', null, { timeout: 30000 });
  await page.evaluate(() => {
    const G = window.__still.G;
    G.entity.teleport(G.player.pos.x + 0.5, G.player.pos.z);
  });
  const grabbed = await page.waitForFunction(() => window.__still.state().grabs > 0, null, { timeout: 15000 })
    .then(() => true).catch(() => false);
  check(grabbed, 'it takes you when it reaches you');
  const recovered = await page.waitForFunction(() => window.__still.state().mode === 'play', null, { timeout: 20000 })
    .then(() => true).catch(() => false);
  check(recovered, 'you wake at the stairs');

  const realErrors = errors.filter((e) => !/favicon|Autoplay|GroupMarkerNotSet/i.test(e));
  check(realErrors.length === 0, `no console errors (${realErrors.length})`);
  if (realErrors.length) console.log(realErrors.slice(0, 10).map((e) => '    · ' + e.slice(0, 260)).join('\n'));
} catch (e) {
  failures.push('harness: ' + e.message);
  console.error(e);
} finally {
  await browser?.close();
  server.kill();
}

console.log(failures.length ? `\n${failures.length} FAILURES` : '\nALL OK');
process.exit(failures.length ? 1 : 0);
