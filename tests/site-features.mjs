// Verification pass for the site brainstorm features: hero dice, record shelf,
// album pages, 404, dispensary permalinks, boss codex, porch light.
// Serves site/ as the web root (absolute /assets/... paths resolve like Netlify).
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'site');
const PORT = 8811;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(siteRoot, path));
    if (!file.startsWith(siteRoot)) { res.writeHead(403); res.end(); return; }
    const data = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(data);
  } catch {
    try {
      const nf = await readFile(join(siteRoot, '404.html'));
      res.writeHead(404, { 'content-type': 'text/html' }); res.end(nf);
    } catch { res.writeHead(404); res.end('not found'); }
  }
}).listen(PORT);

let pass = 0, fail = 0;
const ok = (cond, name, extra = '') => {
  if (cond) { pass++; console.log(`  ok  ${name}`); }
  else { fail++; console.log(`FAIL  ${name}${extra ? ' — ' + extra : ''}`); }
};

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader-webgl', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.setDefaultTimeout(60000);
const errors = [];
page.on('pageerror', (e) => errors.push(String(e.message).slice(0, 160)));

// --- homepage: hero + shelf + porch light ---
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);
const hero = await page.evaluate(() => {
  const row = document.querySelector('.hero-copy .button-row') || document.querySelector('.button-row');
  return {
    buttons: row ? row.querySelectorAll('a').length : 0,
    dice: !!document.getElementById('hero-random-game'),
    book: !!row?.querySelector('a[href="/book.html"]'),
    porch: !!document.getElementById('porch-light'),
    albums: document.querySelectorAll('.album-card').length,
    artCards: document.querySelectorAll('.album-art').length,
    linerLinks: document.querySelectorAll('a.album-suno-link[href^="/music/"]').length,
    codexLink: !!document.querySelector('a[href="/no-moon/codex/"]'),
    iframesInMusic: document.querySelectorAll('#music iframe').length,
    toyCards: document.querySelectorAll('.toy-card').length,
    retiredLinks: document.querySelectorAll('a[href^="/banana"], a[href^="/luma"]').length,
  };
});
ok(hero.toyCards === 2, `toy shelf holds exactly Glide + Dispensary (${hero.toyCards})`);
ok(hero.retiredLinks === 0, 'no links to the retired banana/LUMA toys remain');
ok(hero.buttons === 3, `hero has exactly 3 buttons (${hero.buttons})`);
ok(hero.dice && hero.book, 'dice button + book button wired');
ok(hero.porch, 'the porch light is on');
ok(hero.albums === 9, `record shelf holds 9 albums (${hero.albums})`);
ok(hero.artCards === 9, `all 9 cards wear real sleeve art (${hero.artCards})`);
ok(hero.linerLinks === 9, `all 9 cards link to liner notes (${hero.linerLinks})`);
ok(hero.codexLink, 'No Moon card links to the boss codex');
ok(hero.iframesInMusic === 0, 'homepage no longer ships YouTube iframes in the shelf');

// dice: click must land on one of the six cabinets
const cabinets = ['/no-moon/', '/skyshard/', '/still/', '/rocket-shoes/', '/marrow/', '/glide/'];
await page.evaluate(() => document.getElementById('hero-random-game').scrollIntoView());
await Promise.all([
  page.waitForURL((u) => cabinets.some((c) => u.pathname === c), { timeout: 30000 }),
  page.click('#hero-random-game'),
]).catch(() => {});
ok(cabinets.includes(new URL(page.url()).pathname), `dice dealt a cabinet (${new URL(page.url()).pathname})`);

// --- album pages ---
const slugs = ['summer-people', 'immortalized', 'hate-fuck-hotline', 'pretty-guilty', 'bite-marks-and-bubblegum', 'death-threats-and-makeup-sex', 'cherry-lipstick', 'thick-thighs-sweet-lies', 'anthropic-omorphizing'];
let pagesOk = 0, coversOk = 0, tracksOk = 0, pendingOk = 0;
for (const slug of slugs) {
  await page.goto(`http://localhost:${PORT}/music/${slug}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => {
    const i = document.querySelector('img.cover');
    return i ? (i.complete && i.naturalWidth > 0) : !!document.querySelector('.css-cover');
  }, null, { timeout: 20000 }).catch(() => {});
  const r = await page.evaluate(() => ({
    h1: !!document.querySelector('h1'),
    cover: (() => { const i = document.querySelector('img.cover'); return i ? i.complete && i.naturalWidth > 0 : !!document.querySelector('.css-cover'); })(),
    tracks: document.querySelectorAll('.tracks li').length,
    pending: !!document.querySelector('.pending'),
  }));
  if (r.h1) pagesOk++;
  if (r.cover) coversOk++;
  if (r.tracks > 0) tracksOk++;
  if (r.pending) pendingOk++;
}
ok(pagesOk === 9, `all 9 album pages render (${pagesOk})`);
ok(coversOk === 9, `all 9 album covers load (${coversOk})`);
ok(tracksOk === 6, `6 albums show full tracklists (${tracksOk})`);
ok(pendingOk === 3, `3 albums show the transcription notice (${pendingOk})`);
await page.goto(`http://localhost:${PORT}/music/anthropic-omorphizing/`, { waitUntil: 'domcontentloaded' });
const ao = await page.evaluate(() => ({
  tracks: document.querySelectorAll('.tracks li').length,
  blurb: document.querySelector('.blurb')?.textContent || '',
}));
ok(ao.tracks === 15, `Anthropic-Omorphizing carries the corrected 15-track order (${ao.tracks})`);
ok(ao.blurb.includes('Anthropic-omorphizing (v.)'), 'AO page carries the corrected liner blurb');

// --- 404 ---
await page.goto(`http://localhost:${PORT}/this/does/not/exist`, { waitUntil: 'domcontentloaded' });
ok(await page.evaluate(() => document.body.textContent.includes('Dispensary') && document.querySelector('.rx')?.textContent === '404'), 'custom 404 serves with the Dispensary joke');

// --- dispensary permalinks ---
await page.goto(`http://localhost:${PORT}/dispensary/?rx=qualiafen`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(600);
const rx1 = await page.evaluate(() => ({
  name: document.querySelector('.drug-name')?.textContent || '',
  rxno: document.querySelector('.label-top span')?.textContent || '',
  share: !!document.getElementById('copy-rx'),
  print: !!document.getElementById('print-rx'),
}));
ok(rx1.name.includes('QUALIAFEN'), `?rx=qualiafen fills the QUALIAFEN label (${rx1.name.trim().slice(0, 24)})`);
ok(rx1.share && rx1.print, 'share + print buttons present');
await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForTimeout(500);
const rx2 = await page.evaluate(() => document.querySelector('.label-top span')?.textContent || '');
ok(rx2 === rx1.rxno, `prescription number is deterministic (${rx2.trim()})`);
await page.click('#dispense');
await page.waitForTimeout(400);
const urlAfter = await page.evaluate(() => location.search);
ok(/^\?rx=[a-z0-9-]+$/.test(urlAfter), `dispensing updates the permalink (${urlAfter})`);

// --- boss codex ---
await page.goto(`http://localhost:${PORT}/no-moon/codex/`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(600);
const cdx0 = await page.evaluate(() => ({
  cards: document.querySelectorAll('.cardslot').length,
  revealed: document.querySelectorAll('.cardslot.revealed').length,
  count: document.getElementById('count').textContent,
  backImg: (() => { const i = document.querySelector('.face.back img'); return i && i.complete && i.naturalWidth > 0; })(),
}));
ok(cdx0.cards === 8, `codex deals 8 cards (${cdx0.cards})`);
ok(cdx0.revealed === 0 && cdx0.count.startsWith('0 / 6'), `fresh browser: everything sealed (${cdx0.count})`);
ok(cdx0.backImg, 'card-back art loads');
await page.evaluate(() => {
  localStorage.setItem('noMoonSave_v1', JSON.stringify({ defeatedBosses: { falseMoon: true, warden: true } }));
  localStorage.setItem('noMoonProgress_v68', JSON.stringify({ defeatedBosses: { spiggot: true } }));
});
await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2600);
const cdx1 = await page.evaluate(() => ({
  revealed: document.querySelectorAll('.cardslot.revealed').length,
  count: document.getElementById('count').textContent,
  frontImgs: [...document.querySelectorAll('.cardslot.revealed .face.front img')].every((i) => i.complete && i.naturalWidth > 0),
}));
ok(cdx1.revealed === 3 && cdx1.count.startsWith('3 / 6'), `defeats in either save flip their cards (${cdx1.count})`);
ok(cdx1.frontImgs, 'revealed card art loads');

// --- porch light: 3 a.m. behavior (fake clock) ---
const night = await browser.newPage();
await night.clock.install({ time: new Date('2026-07-02T03:10:00') });
await night.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
const nightErrs = [];
night.on('pageerror', (e) => nightErrs.push(String(e)));
await night.evaluate(() => document.getElementById('porch-light').click());
await night.waitForTimeout(400);
ok(nightErrs.length === 0, 'porch light clicks clean at 3 a.m. (a soft piano A, twice)');
await night.close();

ok(errors.length === 0, 'zero page errors across all pages', errors.join(' | '));
await browser.close();
server.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
