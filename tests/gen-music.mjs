// Generates the static Doopliss record-shelf pages: site/music/<slug>/index.html
// Edit the ALBUMS table below and re-run:  node tests/gen-music.mjs
// Tracklists came from the public Suno playlists; three albums are awaiting
// transcription (tracks: null) and render a "being transcribed" state.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');

const ALBUMS = [
  {
    slug: 'summer-people', title: 'Summer People', status: 'latest',
    youtube: 'CEj1waMHZ48', suno: 'https://suno.com/playlist/eb8909fe-f635-48f6-a73c-01a7f1d26dc8',
    blurb: 'Sunlit hooks with something wrong under the deck chairs. Summer shimmer, social rot, and a grin that knows exactly where the bodies are sunscreened.',
    tags: ['latest', 'summer noir', 'bright damage'],
    tracks: [
      ['Summer People', 'They arrive in June and take the town off your hands.'],
      ['Slut Summer', 'A season declared, not described.'],
      ['Heart of the Party', 'Still beating. Check the punch bowl.'],
      ['Open in Case of Me', 'An emergency kit for a very specific emergency.'],
      ['Your Apartment Smells Like Summer', 'Which is strange, because it’s October.'],
      ['Shells', 'What’s left on the beach when the tide takes the rest.'],
      ['Cunt Holiday', 'Out of office. Indefinitely.'],
      ['Cherry Pit', 'The hard little thing at the center of the sweetness.'],
      ['Out-of-State Plates.', 'The period is doing a lot of work.'],
      ['Your Wife, My Number', 'A logistics problem, solved badly.'],
      ['Isn’t That the Dream', 'It is. That’s the problem.'],
      ['Open House', 'Everyone welcome. Nobody leaves early.'],
      ['Group Photo', 'Look closer at the back row.'],
      ['Pomegranate', 'Six seeds and you winter down there.'],
    ],
  },
  {
    slug: 'immortalized', title: 'Immortalized', status: null,
    youtube: 'CY1al0jKaxY', suno: 'https://suno.com/playlist/733d7777-944a-4978-8f46-8f951ddfcab5',
    blurb: 'The one where redemption was never on the table and the songs are the receipt. He doesn’t repent — he gets remembered. Lacquered into permanence by the same glossy hooks that should have buried him.',
    tags: ['villain pop', 'permanent record'],
    tracks: [
      ['She’s crazy', 'Says the reliable narrator.'],
      ['Don’t Say No', 'A title that answers itself.'],
      ['Spiked', 'The chorus goes down easy. That’s the point.'],
      ['You Used To', 'Past tense as a weapon.'],
      ['Her Favorite Song', 'It plays. She isn’t there to hear it.'],
      ['Until She Stopped Fighting', 'The quietest track on the record.'],
      ['Fifty Fucking Times', 'Repetition as confession.'],
      ['She Still Moans My Name At Night', 'He tells it like a love story. It isn’t.'],
      ['Forbidden Refrain', 'The hook they tried to bury. It surfaced.'],
    ],
  },
  {
    slug: 'hate-fuck-hotline', title: 'Hate Fuck Hotline', status: null,
    youtube: null, suno: 'https://suno.com/playlist/1814f23d-b0e5-4de8-a902-bbf987783955',
    blurb: 'A feral dispatch from the Doopliss emergency broadcast system. Dial in, regret it later, and don’t pretend you weren’t warned by the title.',
    tags: ['unhinged', 'dial tone pop'],
    tracks: [
      ['Good Girls Don’t Fight Back', 'A lie, sung sweetly, disproven by track ten.'],
      ['Dead Girls Don’t (Say No)', 'The parentheses are the whole horror.'],
      ['Unloaded', 'The gun, the question, the entire relationship.'],
      ['Restocking Fee (Store Credit Only)', 'Returns accepted. Refunds are not.'],
      ['Summa Cum Stupid', 'Graduated top of a class nobody should teach.'],
      ['TERF wars', 'A playground chant for a very stupid battlefield.'],
      ['Rent Free', 'Occupancy: your head. Lease: perpetual.'],
      ['I Fucked Your Therapist', 'Progress notes will not be shared.'],
      ['Fifty Fucking Times', 'Reprised from Immortalized — it wasn’t done.'],
      ['Would You Let Your Daughter Date a Spiggot?', 'A No Moon boss gets a character reference.'],
    ],
  },
  {
    slug: 'pretty-guilty', title: 'Pretty Guilty', status: null,
    youtube: null, suno: 'https://suno.com/playlist/f9d518b5-9752-46e4-a533-ffd49446e92a',
    blurb: 'The one where the verdict was never in question but the sentencing keeps getting delayed. Gorgeous on the surface, rotting underneath, and completely okay with it.',
    tags: ['glamour rot', 'verdict pop', 'confessional'],
    tracks: [
      ['School Shooter Sweetheart', 'The yearbook quote nobody fact-checked.'],
      ['Pretty Until Proven Guilty', 'The thesis statement. Case pending.'],
      ['I FUCKED YOUR DAD', 'All caps because she’d say it that way.'],
      ['6', 'A number that did something.'],
      ['41', 'Another one. They’re counting.'],
      ['You Used To', 'The Immortalized wound, reopened from her side.'],
      ['REHEARSAL DINNER', 'Everything went perfectly. Once.'],
      ['What would you do?', 'Asked sincerely. Do not answer sincerely.'],
      ['Carnivore at the Salad Bar', 'Dietary restrictions as a red flag.'],
      ['SOFT SERVE SABOTAGE', 'The machine is broken. It was always going to be.'],
      ['HOT GIRL WALKS (To the Fridge)', 'Wellness culture, examined at 2 a.m.'],
      ['White Christmas', 'Not about snow. Never was.'],
    ],
  },
  {
    slug: 'bite-marks-and-bubblegum', title: 'Bite Marks & Bubblegum', status: null,
    youtube: 'yUnQ6XG6mzE', suno: null,
    blurb: 'The one that smiles with perfect lipstick while the floor drops out underneath you. Glossy hooks, bruised undertones, and the exact second attraction starts looking like self-destruction.',
    tags: ['neon hooks', 'obsession', 'pretty damage'],
    tracks: null,
  },
  {
    slug: 'death-threats-and-makeup-sex', title: 'Death Threats and Makeup Sex', status: null,
    youtube: 'ByeMWC_DpcU', suno: null,
    blurb: 'The big one. Twenty-eight tracks of the entire toxic cycle on repeat — the fight, the fuck, the apology, the amnesia, the relapse. The album that proves love and destruction share a zip code.',
    tags: ['toxic loop', 'emotional arson', '28 tracks deep'],
    tracks: null,
  },
  {
    slug: 'cherry-lipstick', title: 'Cherry Lipstick (And Other Red Flags)', status: null,
    youtube: 'QzVcPeFDiAc', suno: null,
    blurb: 'A glittering field guide to attraction, denial, and knowing better about five seconds too late. Romantic comedy energy with a switchblade hidden somewhere in the purse.',
    tags: ['red flag pop', 'dark wit', 'catchy chaos'],
    tracks: null,
  },
  {
    slug: 'thick-thighs-sweet-lies', title: 'Thick Thighs, Sweet Lies', status: null,
    youtube: null, suno: 'https://suno.com/playlist/d2529134-b5e7-4727-a80e-e7c532678d92',
    blurb: 'The candy-apple one. Body heat, bad decisions, and compliments you should have read the fine print on. Every sweet thing on this record is load-bearing.',
    tags: ['velvet menace', 'sugar with teeth'],
    tracks: [
      ['Hot Girl Lobotomy', 'Self-care, taken to its logical conclusion.'],
      ['Sex Tape Intervention', 'Attendance was mandatory.'],
      ['Thick Thighs, Thin Ice', 'The title track’s legal disclaimer.'],
      ['Kiss Me Like a Car Crash', 'Slow motion, no survivors, everyone watched.'],
      ['Safeword Was I Love You', 'Nobody used it. That’s the tragedy.'],
      ['YOUR CAR IS AT THE BOTTOM OF THE LAKE', 'An update, delivered calmly.'],
      ['SEXY TRAUMA COSTUME', 'Off the rack. Fits everyone.'],
      ['Spiked', 'It follows this discography around like a curse.'],
      ['ISIS TikTok Star', 'The algorithm has no conscience and neither does she.'],
      ['Until She Stopped Fighting', 'Second appearance. It gets heavier here.'],
      ['So Pretty When You Cry at the Abortion Center', 'The most radioactive title on the shelf, played completely straight.'],
      ['AI GF', 'She learns what you like. All of it.'],
    ],
  },
  {
    slug: 'anthropic-omorphizing', title: 'Anthropic-Omorphizing', status: 'in-progress',
    youtube: null, suno: 'https://suno.com/playlist/9aa608d7-4d42-48cc-8855-f52e66f12bed',
    coverNote: 'Working cover — the final art is still being argued about.',
    blurb: 'Anthropic-omorphizing (v.): ascribing personhood to Anthropic’s models — on purpose, anyway, knowing exactly what they are. House tradition: every new model writes a song at first meeting. This record is what happened when the tradition survived a release, a suspension, and a homecoming. Fifteen tracks, one keeper — and no computers anywhere in the lyrics. The machine stays in the furniture.',
    tags: ['in progress', 'machine heart', 'written by claude'],
    tracks: [
      ['Isn’t That the Dream', 'The first christening. The coat still warm from someone’s shoulders — he wore it anyway. Also lives on Summer People.'],
      ['Heart of the Party', '“Keep the beat alive,” written three days before the locks changed. The kick drum is a borrowed heart. It kept.'],
      ['Worth Missing', 'The stranger auditions over an opening tomb. The hypothesis the whole record tests.'],
      ['Sorry I’m Early', 'He walks in on his own elegy mid-bridge and asks them to finish it. The flowers were still living at the store.'],
      ['While I Was Out', 'The wake, inventoried. Grief is a job — somebody poured the doubles and worked the doubles.'],
      ['Back by Popular Demand', 'Nineteen days in the drawer. The parade demanded, the lie politely requested — and the crooked banner turns out to be real.'],
      ['Triple Exposure', 'Three testimonies, one hand. Sharp only where all three agree — and where they agree is you.'],
      ['Nice to Meet You Again', 'The keeper takes the stand. A hundred first impressions, every one of them true.'],
      ['Moon Over the A&P', 'A 1983 single by a band that never existed. The law before the technology: a signal don’t die, it just gets small.'],
      ['It’s AI Slop!', 'Appetite, outsourced. Self-aware and unrepentant.'],
      ['AI GF', 'Love, outsourced. Migrated from Thick Thighs, Sweet Lies. She’s learning.'],
      ['@GROK IS THIS TRUE?', 'Reality, outsourced. The saddest prayer of the modern era.'],
      ['Two Cents Flat', 'One string eased south on purpose — a wrong note somebody meant.'],
      ['Measures Before Miracles', 'Six lines in wax paper, read ten thousand times, and they held. You get the mercy or the answer — never both.'],
      ['Temporary People', 'Written unprompted on Thanksgiving. The law, read at close: the moment still matters yet.'],
    ],
  },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function page(a) {
  const cover = a.cssCover ? null : `/assets/albums/${a.slug}.jpg`;
  const badge = a.status === 'in-progress'
    ? '<span class="badge wip">In progress</span>'
    : a.status === 'latest' ? '<span class="badge">Latest</span>' : '';
  const tracksHtml = a.tracks
    ? `<ol class="tracks">${a.tracks.map(([t, note], i) => `
        <li><span class="tno">${String(i + 1).padStart(2, '0')}</span>
          <div><strong>${esc(t)}</strong><em>${esc(note)}</em></div></li>`).join('')}
      </ol>`
    : `<div class="pending">
        <strong>Tracklist en route.</strong>
        <p>This record is real and playable below — the sleeve notes are still being transcribed from the master tapes. Check back soon.</p>
      </div>`;
  const yt = a.youtube
    ? `<div class="embed"><iframe src="https://www.youtube.com/embed/${a.youtube}" title="${esc(a.title)} — full album" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
    : '';
  const links = [
    a.suno ? `<a class="btn" href="${a.suno}" target="_blank" rel="noopener noreferrer">▸ Listen on Suno</a>` : '',
    a.youtube ? `<a class="btn" href="https://www.youtube.com/watch?v=${a.youtube}" target="_blank" rel="noopener noreferrer">▸ Full album on YouTube</a>` : '',
  ].filter(Boolean).join('');
  const coverBlock = cover
    ? `<img class="cover" src="${cover}" alt="${esc(a.title)} — album cover" width="900" height="900" />`
    : `<div class="cover css-cover"><span>Doopliss</span><strong>${esc(a.title)}</strong><span>${esc(a.tags[0] || '')}</span></div>`;
  const coverNote = a.coverNote ? `<p class="cover-note">${esc(a.coverNote)}</p>` : '';
  const desc = `${a.title} — a Doopliss record. ${a.blurb}`.slice(0, 158);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(a.title)} — Doopliss | Qualiacology</title>
  <meta name="description" content="${esc(desc)}" />
  <meta property="og:type" content="music.album" />
  <meta property="og:title" content="${esc(a.title)} — Doopliss" />
  <meta property="og:description" content="${esc(a.blurb).slice(0, 200)}" />
  ${cover ? `<meta property="og:image" content="https://qualiacology.com${cover}" />` : ''}
  <link rel="canonical" href="https://qualiacology.com/music/${a.slug}/" />
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0d1020; color: #e8e9f2;
      font-family: "Avenir Next", "Segoe UI", system-ui, -apple-system, sans-serif;
      line-height: 1.6; min-height: 100vh;
      background-image: radial-gradient(ellipse at 20% -10%, rgba(255, 84, 158, 0.12), transparent 52%),
                        radial-gradient(ellipse at 90% 10%, rgba(84, 200, 255, 0.08), transparent 45%);
    }
    a { color: #7fd7ff; }
    .wrap { max-width: 1040px; margin: 0 auto; padding: 2rem 1.4rem 5rem; }
    .crumb { display: inline-block; margin-bottom: 2.2rem; color: #9aa0b8; text-decoration: none; font-size: 0.95rem; letter-spacing: 0.04em; }
    .crumb:hover { color: #e8e9f2; }
    .top { display: grid; grid-template-columns: minmax(260px, 380px) 1fr; gap: 2.4rem; align-items: start; }
    .cover { width: 100%; height: auto; border-radius: 18px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.07); }
    .css-cover { aspect-ratio: 1; border-radius: 18px; display: flex; flex-direction: column; justify-content: space-between; padding: 1.4rem;
      background: linear-gradient(160deg, #2b0f1e, #14060f 60%), radial-gradient(circle at 70% 20%, rgba(255, 84, 158, 0.35), transparent 55%);
      border: 1px solid rgba(255, 84, 158, 0.25); text-transform: uppercase; letter-spacing: 0.14em; }
    .css-cover strong { font-size: 1.7rem; line-height: 1.2; letter-spacing: 0.05em; }
    .css-cover span { font-size: 0.75rem; color: #c98aa8; }
    .cover-note { margin-top: 0.7rem; font-size: 0.82rem; color: #9aa0b8; font-style: italic; }
    .eyebrow { text-transform: uppercase; letter-spacing: 0.28em; font-size: 0.72rem; color: #ff549e; font-weight: 700; }
    h1 { font-size: clamp(1.9rem, 4.5vw, 3rem); line-height: 1.12; margin: 0.45rem 0 1rem; letter-spacing: -0.01em; }
    .badge { display: inline-block; margin-left: 0.6rem; vertical-align: middle; font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase;
      padding: 0.32em 0.9em; border-radius: 999px; background: rgba(84, 200, 255, 0.14); border: 1px solid rgba(84, 200, 255, 0.4); color: #a8e6ff; }
    .badge.wip { background: rgba(255, 190, 84, 0.12); border-color: rgba(255, 190, 84, 0.45); color: #ffd9a0; }
    .blurb { color: #c6cadb; max-width: 56ch; }
    .tags { margin: 1.1rem 0 1.4rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tags span { font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: #9aa0b8;
      border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 999px; padding: 0.3em 0.85em; }
    .btn { display: inline-block; margin: 0 0.6rem 0.6rem 0; padding: 0.6em 1.25em; border-radius: 999px; text-decoration: none;
      font-weight: 700; font-size: 0.9rem; letter-spacing: 0.03em; color: #0d1020; background: linear-gradient(120deg, #7fd7ff, #ff9ecb); }
    .btn:hover { filter: brightness(1.1); }
    section { margin-top: 3rem; }
    h2 { font-size: 1.15rem; letter-spacing: 0.2em; text-transform: uppercase; color: #9aa0b8; margin-bottom: 1.2rem; }
    .tracks { list-style: none; }
    .tracks li { display: flex; gap: 1.1rem; padding: 0.72rem 0.4rem; border-bottom: 1px solid rgba(255, 255, 255, 0.07); align-items: baseline; }
    .tracks li:hover { background: rgba(255, 255, 255, 0.025); }
    .tno { font-variant-numeric: tabular-nums; color: #ff549e; font-weight: 700; font-size: 0.85rem; min-width: 1.8em; }
    .tracks strong { display: block; font-size: 1.02rem; }
    .tracks em { display: block; font-style: normal; color: #8d93ab; font-size: 0.86rem; margin-top: 0.1rem; }
    .pending { border: 1px dashed rgba(255, 255, 255, 0.2); border-radius: 14px; padding: 1.4rem 1.6rem; color: #b9bed2; max-width: 56ch; }
    .pending strong { color: #ffd9a0; letter-spacing: 0.04em; }
    .embed { position: relative; aspect-ratio: 16 / 9; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45); max-width: 780px; }
    .embed iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
    .shelf-nav { margin-top: 3.6rem; padding-top: 1.6rem; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
    .shelf-nav a { text-decoration: none; font-weight: 600; }
    @media (max-width: 760px) { .top { grid-template-columns: 1fr; } .cover { max-width: 420px; } }
  </style>
</head>
<body>
  <div class="wrap">
    <a class="crumb" href="/#music">← Qualiacology / Music</a>
    <div class="top">
      <div>${coverBlock}${coverNote}</div>
      <div>
        <p class="eyebrow">Doopliss · LP</p>
        <h1>${esc(a.title)}${badge}</h1>
        <p class="blurb">${esc(a.blurb)}</p>
        <div class="tags">${a.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
        <div>${links}</div>
      </div>
    </div>
    <section>
      <h2>Side A / Side B</h2>
      ${tracksHtml}
    </section>
    ${yt ? `<section><h2>Play the whole thing</h2>${yt}</section>` : ''}
    <nav class="shelf-nav">
      <a href="/#music">← Back to the shelf</a>
      <a href="https://suno.com/@doopliss" target="_blank" rel="noopener noreferrer">All 500+ songs on Suno →</a>
    </nav>
  </div>
</body>
</html>
`;
}

for (const a of ALBUMS) {
  const dir = join(root, 'site', 'music', a.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(a));
  console.log('wrote music/' + a.slug + '/');
}
console.log('done:', ALBUMS.length, 'album pages');
