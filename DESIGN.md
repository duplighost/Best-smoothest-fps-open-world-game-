# SKYSHARD

A browser open-world FPS. No install, no build step, no external network deps — open `index.html` and play.
Three.js r160 (vendored), ES modules, WebAudio-synthesized sound, localStorage saves.

## Pillars

1. **Game feel first.** Every shot, kill, and broken pot must feel physical: hitstop, recoil,
   tracers, shards, sound layers, screenshake with taste. If it doesn't feel good in the hands,
   nothing else matters.
2. **A beautiful, legible world.** Five compact regions, each with an unmistakable palette, sky,
   flora, and soundscape. You always know where you are with your eyes closed half-open.
3. **Discovery is the loop.** Roam → fight the wild → spot a destination → enter it →
   read its story from the objects inside → beat its guardian → come out *changed*.
4. **Power you can feel, not read.** Rewards are new verbs and visible weapon evolution —
   never a stat line. The proof of growth is old enemies dissolving under your new movement.
5. **Teach with the world, not words.** Glyphs, light, and level design do the tutorializing.
   Text appears only as short whispers when unavoidable.

## The world — The Shardlands

A roughly 1.5km × 1.5km island arranged around **the Spire** (central hub landmark, save point,
visual anchor visible from everywhere). Five regions radiate outward:

| Region | Palette / mood | Terrain | Enemies (wild) |
|---|---|---|---|
| **Verdant Vale** (S, start) | warm greens, gold sun, wildflowers | rolling hills, birch groves, creek | Puffs (drifting spores), Hoppers |
| **Ember Flats** (W) | rust/ember orange, black obsidian, heat shimmer | cracked desert, glass dunes, lava seams | Cinder Hounds, Ash Turrets |
| **Frostmere** (N) | pale blue/white, aurora, long shadows | snowfield, frozen lake, ice pines | Wisps (ice), Shard Golems |
| **Mycel Hollow** (E) | bioluminescent teal/violet, gloom | fungal marsh, giant mushrooms, still water | Gasbags (float+burst), Creepers |
| **The Shatter** (NE plateau) | dusk purples, floating rock, ruinstone | broken plateau, levitating islets, ancient roads | Sentinels, Halo Drones |

Region transitions blend fog color, sky gradient, light, and music over ~40m.

## Destinations

~12 discoverable places. Each has an exterior landmark + most are **enterable** (door → interior
mini-scene with fade transition; interiors are separate Three.js scenes = handcrafted atmosphere
AND massive perf win). Interiors carry environmental storytelling: tableaux, murals, left-behind
objects. No lore dumps.

**Majors (boss + ability reward), one per region:**
- Verdant Vale — **The Hollow Mill**: overgrown flour mill, working gears. Boss: *Millwright* (spinning bramble construct). Reward: **DASH**.
- Ember Flats — **The Glass Forge**: half-buried foundry, rivers of light in the floor. Boss: *Foreman Slag*. Reward: **charge shot** weapon evolution (piercing lance).
- Frostmere — **The Frozen Lighthouse**: spiral climb inside ice, beam still slowly turning. Boss: *The Keeper*. Reward: **DOUBLE JUMP + GLIDE**.
- Mycel Hollow — **The Sunken Chapel**: half-drowned nave, glowing spores in god-rays. Boss: *Choir of Caps* (fungal mass). Reward: **seeker burst** alt-fire (homing spore rockets).
- The Shatter — **The Inverted Tower**: enter at the top, descend through a tower built upside-down. Boss: *The Archivist*. Reward: **GRAPPLE + SLAM**.

**Minors (story, treasure, a hard fight, health-core shards):** hollow-tree home, bell tower,
sunken pyramid antechamber, ice-fisher's hut on the frozen lake, giant mushroom cottage,
the observatory, a wanderer's camp, a buried door that hums.

## Progression (the fun kind)

- **Movement verbs**: Dash (i-frames, momentum) → Double-jump + hold-space glide → Grapple
  (terrain + enemies) + aerial Slam (shockwave). Verbs chain: grapple→release→double-jump→glide→slam.
- **Weapon evolution**: one gun, the **Sparkcaster**, physically grows — new barrel, new glow,
  new voice — as bosses fall. Primary fire stays snappy; bosses add alt-fires (charge lance,
  seeker burst) on right-click, swapped with Q. Old enemies visibly disintegrate faster because
  the *behavior* is stronger (pierce, seek), not a hidden multiplier.
- **Health cores**: minor destinations hide shards; 3 shards = one more health pip. Health is
  pips, not numbers.
- Save on the fly (abilities, bosses, found places, shards).

## Combat feel (the checklist every hit must pass)

- Muzzle flash light + viewmodel kick + camera recoil (recovering spring)
- Tracer + impact sparks + decal-ish glow
- Enemy: white hit-flash (1 frame), knockback impulse, damage squash
- Kill: 60–90ms hitstop, shake scaled by weapon, body dissolves into shards + a **soul mote**
  that streaks to the player (kill-confirm), rising-pitch chime on streaks
- Breakables everywhere (pots, crates, crystals, lanterns): physics shards + occasional health mote
- All SFX synthesized in WebAudio: layered click+body+tail recipe per event

## Performance budget (60fps target on mid hardware)

- Terrain: one heightfield sampled analytically (no physics engine), rendered as chunked grid
  (frustum-culled), vertex-colored by region — 1 material, ~40 visible draw calls max
- Vegetation/rocks: InstancedMesh per type per chunk region, distance-culled
- Enemies: pooled, capped (~14 active), simple geo, distance-throttled AI
- Particles: one pooled instanced-quad system (~2000 quads max), one draw call
- Interiors: separate scene — world unloads from render entirely while inside
- Lights: 1 directional (sun w/ tight shadow frustum following player) + small pooled point lights
- No heavyweight postfx: fog + vignette/grade via cheap fullscreen pass; pixel-ratio capped at 2
- Debug API `window.__game` exposes fps, draw calls, teleport, godmode for automated tests

## Code map

```
index.html            boot shell, canvas, HUD DOM, loading screen
vendor/three.module.min.js
src/main.js           boot, game state machine (title → world ↔ interior), main loop
src/core/             math.js rng.js pool.js save.js input.js audio.js music.js
src/player/           controller.js (move+collide), weapon.js (viewmodel+fire), abilities.js
src/world/            terrain.js regions.js sky.js vegetation.js props.js destinations.js water.js
src/combat/           enemies.js enemytypes.js bosses.js projectiles.js breakables.js health.js
src/interiors/        builder.js + defs/*.js (one file per destination interior)
src/fx/               particles.js juice.js postfx.js motes.js
src/ui/               hud.js prompts.js compass.js
tests/                serve.js smoke.spec.mjs perf.spec.mjs
```
