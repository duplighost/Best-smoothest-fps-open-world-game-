// Screenshot pass only — full fx (shadows + post) so shots match real play.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const PORT = 8743;
const dir = join(root, 'tests', 'shots');
mkdirSync(dir, { recursive: true });

const server = spawn('node', [join(root, 'tests/serve.mjs'), String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader-webgl', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.setDefaultTimeout(120000);

await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => window.__game && document.getElementById('title').classList.contains('show'));
await page.evaluate(() => window.__game.start());
await page.waitForTimeout(3000);

const stops = [
  ['09-shrine', -40, 254, 0],
  ['10-vale', 40, 300, -0.5],
  ['11-frost-lake', -300, -300, -2.2],
  ['12-shatter-isles', 330, -400, 2.4],
  ['13-mycel', 420, 140, 0.6],
  ['14-ember-forge', -390, 145, 3.14],
];
for (const [name, x, z, yaw] of stops) {
  await page.evaluate(([x, z, yaw]) => {
    window.__game.teleport(x, z);
    window.__game.G.player.yaw = yaw;
    window.__game.G.player.pitch = -0.06;
  }, [x, z, yaw]);
  await page.waitForTimeout(3200);
  await page.screenshot({ path: join(dir, `${name}.png`) });
  console.log('shot', name);
}

// interior with viewmodel check
await page.evaluate(() => window.__game.enter('mill'));
await page.waitForFunction(() => document.getElementById('fader').style.opacity === '0' && window.__game.state().mode === 'interior', null, { timeout: 60000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: join(dir, '16-mill.png') });
console.log('shot 16-mill');
await page.evaluate(() => window.__game.exitInterior());
await page.waitForFunction(() => window.__game.state().mode === 'world', null, { timeout: 60000 });
await page.evaluate(() => window.__game.enter('hollowtree'));
await page.waitForFunction(() => document.getElementById('fader').style.opacity === '0' && window.__game.state().mode === 'interior', null, { timeout: 60000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: join(dir, '15-hollowtree.png') });
console.log('shot 15-hollowtree');

await browser.close();
server.kill();
console.log('done');
