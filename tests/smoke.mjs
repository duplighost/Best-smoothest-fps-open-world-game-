// Headless smoke + perf test. Boots the game, fails on any console error,
// walks every region, enters an interior, picks a fight, and reports
// fps/draw-call numbers. Run: node tests/smoke.mjs [--shots]
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const PORT = 8741;
const SHOTS = process.argv.includes('--shots');
const shotDir = join(root, 'tests', 'shots');
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
  page.setDefaultTimeout(60000);
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  console.log('· loading…');
  await page.goto(`http://localhost:${PORT}/?fx=low`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__game && document.getElementById('title').classList.contains('show'), null, { timeout: 60000 });
  check(true, 'boots to title screen');
  if (SHOTS) await page.screenshot({ path: join(shotDir, '00-title.png') });

  console.log('· starting…');
  await page.evaluate(() => window.__game.start());
  await page.waitForTimeout(4000);
  let s = await page.evaluate(() => window.__game.state());
  check(s.mode === 'world', `enters world (mode=${s.mode})`);
  // SwiftShader software-renders at ~20fps; on any real GPU this is 60+
  check(s.drawCalls > 0, `world renders frames (fps=${s.fps}, software rasterizer)`);
  check(s.drawCalls > 5 && s.drawCalls < 400, `draw calls ${s.drawCalls} in (5, 400)`);
  check(s.tris < 900000, `triangles ${(s.tris/1000)|0}k < 900k`);
  console.log(`  info- fps=${s.fps} draws=${s.drawCalls} tris=${(s.tris / 1000) | 0}k pos=(${s.pos.x | 0},${s.pos.y | 0},${s.pos.z | 0})`);
  if (SHOTS) await page.screenshot({ path: join(shotDir, '01-vale.png') });

  // movement sanity: walk forward, expect displacement
  const p0 = s.pos;
  await page.evaluate(() => { window.__game.G.input.keys.add('KeyW'); });
  const walked = await page.waitForFunction(([x0, z0]) => {
    const p = window.__game.state().pos;
    return Math.hypot(p.x - x0, p.z - z0) > 2.5;
  }, [p0.x, p0.z], { timeout: 20000 }).then(() => true).catch(() => false);
  await page.evaluate(() => { window.__game.G.input.keys.delete('KeyW'); });
  check(walked, 'player walks forward');

  // regions tour
  const stops = [
    ['ember', -380, 100], ['frost', -180, -400], ['mycel', 400, 120], ['shatter', 300, -390],
  ];
  for (const [name, x, z] of stops) {
    console.log(`· region ${name}…`);
    await page.evaluate(([x, z]) => window.__game.teleport(x, z), [x, z]);
    await page.waitForTimeout(2200);
    // liveness = game time advances; the fps counter is info only (SwiftShader
    // on a loaded box can dip under 1fps without anything being wrong)
    const t0 = await page.evaluate(() => window.__game.G.time.raw);
    const alive = await page.waitForFunction((t0) => window.__game.G.time.raw > t0 + 0.5, t0, { timeout: 20000 })
      .then(() => true).catch(() => false);
    s = await page.evaluate(() => window.__game.state());
    check(s.region === name, `region reads ${s.region} (want ${name})`);
    check(alive, `${name} renders frames (fps=${s.fps})`);
    check(s.drawCalls < 260, `${name} draw calls ${s.drawCalls} < 260`);
    check(s.pos.y > -3, `${name} player above ground (y=${s.pos.y.toFixed(1)})`);
    console.log(`  info- fps=${s.fps} draws=${s.drawCalls} tris=${(s.tris / 1000) | 0}k`);
    if (SHOTS) await page.screenshot({ path: join(shotDir, `02-${name}.png`) });
  }

  // combat: spawn an enemy dead ahead and hold fire until the kill counter ticks
  console.log('· combat…');
  await page.evaluate(() => {
    window.__game.teleport(0, 130);
    window.__game.G.player.yaw = Math.PI;
    window.__game.G.player.pitch = 0;
    window.__game.god(true);
  });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    const G = window.__game.G;
    const d = { x: -Math.sin(G.player.yaw), z: -Math.cos(G.player.yaw) };
    window.__game.spawn('puff', d.x * 9, d.z * 9);
  });
  await page.waitForFunction(() => window.__game.state().enemies > 0, null, { timeout: 8000 }).catch(() => {});
  const spawned = await page.evaluate(() => window.__game.state().enemies);
  check(spawned > 0, `enemy spawned (${spawned})`);
  await page.evaluate(() => window.__game.fire(true));
  const gotKill = await page.waitForFunction(() => (window.__game.G.debug.kills || 0) > 0, null, { timeout: 10000 })
    .then(() => true).catch(() => false);
  await page.evaluate(() => window.__game.fire(false));
  check(gotKill, 'enemy killed by holding fire');
  await page.evaluate(() => window.__game.god(false));

  // interiors: enter the mill, look for boss, exit
  console.log('· interior…');
  await page.evaluate(() => window.__game.enter('mill'));
  await page.waitForTimeout(1600);
  s = await page.evaluate(() => window.__game.state());
  check(s.mode === 'interior' && s.interior === 'mill', `inside the mill (${s.interior})`);
  check(s.drawCalls > 0, `interior renders frames (fps=${s.fps})`);
  if (SHOTS) await page.screenshot({ path: join(shotDir, '03-mill.png') });

  // walk toward the boss trigger
  await page.evaluate(() => { window.__game.G.player.pos.set(0, 0, -2); });
  const bossWoke = await page.waitForFunction(() => !!window.__game.state().boss, null, { timeout: 15000 })
    .then(() => true).catch(() => false);
  s = await page.evaluate(() => window.__game.state());
  check(bossWoke, `boss woke (${s.boss?.key})`);
  if (SHOTS) await page.screenshot({ path: join(shotDir, '04-boss.png') });

  // kill the boss via debug damage, expect reward flow
  await page.evaluate(() => {
    const b = window.__game.G.boss;
    b.onHit(b.hitSpheres()[0], 999, { kind: 'shot', dir: { x: 0, y: 0, z: 1 }, point: { x: b.pos.x, y: b.pos.y, z: b.pos.z } });
  });
  const bossDown = await page.waitForFunction(() => window.__game.state().bossesDown.millwright === true, null, { timeout: 15000 })
    .then(() => true).catch(() => false);
  check(bossDown, 'boss down recorded');
  // grab the reward crystal
  await page.evaluate(() => { window.__game.G.player.pos.set(0, 0, -4); });
  const gotDash = await page.waitForFunction(() => window.__game.state().abilities.dash === true, null, { timeout: 15000 })
    .then(() => true).catch(() => false);
  check(gotDash, 'dash reward granted');

  await page.evaluate(() => window.__game.exitInterior());
  const backOut = await page.waitForFunction(() => window.__game.state().mode === 'world', null, { timeout: 20000 })
    .then(() => true).catch(() => false);
  check(backOut, 'exits back to world');

  // long-ish soak for leaks/steadiness
  console.log('· soak…');
  await page.evaluate(() => window.__game.giveAll());
  await page.evaluate(() => window.__game.teleport(120, 380));
  await page.waitForTimeout(4000);
  s = await page.evaluate(() => window.__game.state());
  check(s.drawCalls > 0, `post-soak renders frames (fps=${s.fps})`);
  check(s.drawCalls < 260, `post-soak draw calls ${s.drawCalls} < 260`);
  console.log(`  info- fps=${s.fps} draws=${s.drawCalls} tris=${(s.tris / 1000) | 0}k`);
  if (SHOTS) await page.screenshot({ path: join(shotDir, '05-mill-exterior.png') });

  const realErrors = errors.filter((e) => !/favicon|Autoplay|WebGL.*fallback|GroupMarkerNotSet/i.test(e));
  check(realErrors.length === 0, `no console errors (${realErrors.length})`);
  if (realErrors.length) console.log(realErrors.slice(0, 12).map((e) => '    · ' + e.slice(0, 300)).join('\n'));
} catch (e) {
  failures.push('harness: ' + e.message);
  console.error(e);
} finally {
  await browser?.close();
  server.kill();
}

console.log(failures.length ? `\n${failures.length} FAILURES` : '\nALL OK');
process.exit(failures.length ? 1 : 0);
