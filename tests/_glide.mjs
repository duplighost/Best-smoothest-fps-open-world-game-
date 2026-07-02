import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const SB = '/home/user/Best-smoothest-fps-open-world-game-/site';
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const srv = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const data = await readFile(normalize(join(SB, p)));
    res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end(); }
}).listen(8765);
const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
await page.goto('http://localhost:8765/glide/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(9000);
await page.mouse.click(320, 200);
await page.waitForTimeout(5000);
await page.keyboard.down('KeyW');
await page.waitForTimeout(4000);
await page.keyboard.up('KeyW');
const v81 = await page.evaluate(() => [...document.scripts].some((s) => s.src.includes('v81')));
console.log('loads v81:', v81, '| pageerrors:', errs.length, errs.join(' | ').slice(0, 300));
await page.screenshot({ path: 'tests/shots/glide-v81.png' });
await browser.close();
srv.close();
process.exit(errs.length ? 1 : 0);
