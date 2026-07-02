# SKYSHARD

An open-world FPS that runs in your browser. Five lands, strange doors, and
the things that wait behind them.

No install, no build step, no assets to download — every texture, sound, and
piece of music is synthesized at runtime.

## Play

Serve the folder with any static server and open it:

```
node tests/serve.mjs        # → http://localhost:8737
```

(or `npx http-server`, `python3 -m http.server`, GitHub Pages, Netlify — anything static works.)

**Controls:** WASD + mouse. Click to fire. Everything else, the world teaches
you when you earn it.

If the game struggles on a weak machine, add `?fx=low` to the URL
(no shadows, no post pass) — the adaptive quality governor also steps
resolution down and back up automatically.

## What you're looking at

- **Five regions**, each with its own palette, sky, weather, flora, music
  key, and enemies — blended smoothly at the borders. The Spire at the
  center is home: safe ground, a campfire, and your respawn.
- **Fifteen destinations.** Most are enterable — walk through the glowing
  veil. Inside: a story told in objects, an ambush or two, and in the five
  majors, a guardian. Undefeated guardians cast a beacon of their region's
  color into the sky. The world is the map.
- **Bosses pay in verbs, not numbers.** Dash. Wings. The charge lance.
  Seekers. Grapple and slam. Kills refund your dash — keep moving.
- **Health is pips.** Shards hidden at minor destinations deepen the vessel
  (three shards = one more pip). Break things; some of them feed you.

## Tests

```
node tests/smoke.mjs          # headless boot/regions/combat/boss/perf audit
node tests/smoke.mjs --shots  # + screenshots into tests/shots/
```

The smoke test drives the game through the debug surface (`window.__game`):
boots it, walks all five regions, kills an enemy, clears the first boss,
takes the reward, and checks draw-call/triangle budgets and console errors.

## Code map

```
index.html              boot shell, HUD DOM, title/pause overlays
vendor/                 Three.js r160 (vendored — no CDN dependency)
src/main.js             fixed-timestep loop, mode state machine, debug API
src/config.js           every tuning constant in the game
src/core/               math, seeded noise, pools, save, input, sfx synth, music
src/player/             controller (the body), weapon (the Sparkcaster), rewards
src/world/              analytic terrain, regions, collision grid, sky, flora,
                        props, destination exteriors
src/interiors/          interior scene builder + one def per enterable place
src/combat/             enemies, bosses, projectiles, breakables, the one
                        damage function every hit routes through
src/fx/                 juice kernel (shake/hitstop/slow-mo), particles,
                        motes, rover lights, single-pass post grade
src/ui/                 pips, verbs, whispers, boss bar
docs/                   design doc + research brief distilled from the
                        previous games in this repo
```
