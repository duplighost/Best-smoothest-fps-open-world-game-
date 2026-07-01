# Synthesis Brief: Browser Open-World FPS
## Built from studies of Rocket Shoes, Marrow, LUMA, The Screaming Banana Dilemma, and No Moon

---

## 1. TASTE PROFILE

What this developer loves, in priority order, with evidence:

1. **Instant action, zero friction to play.** Rocket Shoes drops you into combat immediately with auto-fire; LUMA starts rendering on page load with no splash or gesture gate; Marrow's title screen is one word and "press enter". No launcher, no loadout screen, no cutscene. The new game should be moving and shooting within seconds of load.

2. **Movement as the core pleasure, with kills feeding the movement loop.** Rocket Shoes is the clearest signal: dash refunds per kill (-0.145s cooldown), dash-kills enforce a *minimum exit speed* of 1780 px/s so you leave a kill faster than you entered, grinding/vents/flow-lanes/REDLINE all reward never stopping. The developer explicitly noted "recoil fights the control goal" in No Moon — feedback goes into the camera, never into stealing player control. Movement flow is sacred.

3. **Layered, calibrated juice on every hit — with exact numbers.** All five projects carry per-event tuned tables (shake 0.07 for a shot connect vs 1.2 for a boss death; hitstop 8ms shot vs 48ms boss). No Moon's lesson is written in its own comments: feedback was originally "tuned so subtly that hits don't register at a glance" and needed amplification passes. Tune loud first.

4. **100% synthesized audio, zero assets, adaptive to game state.** Four of five projects synthesize everything in WebAudio: Rocket Shoes' generative synthwave sequencer whose intensity is driven by combat, Marrow's tension-tracking heartbeat/breath/drone, No Moon's stress-modulated BGM, Banana's distance-attenuated scream drone. The pattern "one global tension/intensity scalar drives many audio channels at once" recurs everywhere.

5. **Teaching through gameplay, not text.** Marrow's explicit rule is "as few words as possible" — light IS the tutorial (ember trails on BFS solution paths). Rocket Shoes names mechanics by scoring them (SLICE ×3, PERFECT!). No Moon's most instructive arc: it shipped text-heavy and the developer spent versions v51-v61 suppressing text and replacing it with nonverbal cues (HUD pulses, door glows, rings). Banana is the outlier (text-forward) and it's also the game the developer likely feels "hit the spot" least in the feel dimension.

6. **Procedural everything: geometry, textures, audio, worlds — with authored flavor on top.** Zero binary assets across the board. But never *pure* random: Bag dealers with no-repeat windows, authored biome data tables, LUMA's "authored ranges + seeded targets + noise drift" director, hand-written per-biome mechanic taglines. Procedural skeleton, authored soul.

7. **Telegraphed fairness and generosity at climaxes.** Nothing spawns on the player (460px clearance + 0.34s spawn glyphs); charger windups; boss phase transitions wipe hostile bullets ("fair reset"); boss deaths wipe bullets so the climax can't kill you; draft screens freeze the world and make you invulnerable. The player is never cheap-shotted.

8. **Ceremony around big moments.** Room-clear celebration sequences (pickup vacuum, slow-mo, style rank), boss FINAL STAND desperation phases, defeat ceremonies with locked exits so victory can't be skipped, procedural run epithets ("The wall remembers you as The Wall-Listener"). Bosses in this new game need ceremony framing *and* better choreography (a stated No Moon weakness).

9. **Adaptive performance as a design requirement, mobile included.** Every project has DPR caps, entity budgets, adaptive quality governors, and mobile-aware throttles. Runs-on-a-phone is clearly a personal constraint.

10. **A consistent voice: deadpan, liturgical-absurdist, kind underneath.** "Every line is about a thing in the room or a thing the player just did; deadpan; kind underneath" (Rocket Shoes); all-caps litany (No Moon); bureaucratic absurdism (Banana). The new game's sparse text should carry this register.

---

## 2. PROVEN TECHNIQUES TO REUSE

### 2A. Game Feel / Juice

**The universal smoothing primitive (use for everything: camera, velocity, music intensity, uniforms, HUD):**
```js
damp(a, b, lambda, dt) = a + (b - a) * (1 - Math.exp(-lambda * dt))
// or half-life form: approach(cur, tgt, dt, half) = cur + (tgt-cur) * (1 - Math.pow(2, -dt/half))
```
Proven lambdas: camera follow 8.8, camera kick return 17, move accel 16-17.5, friction/stop 13-24, speed-zoom 6, combo decay 3, eye-height crouch lerp 7, flashlight lag 12, post-FX ease 3.5. Half-lives (LUMA): audio bands attack 0.04s / release 0.16s, energy 0.05/0.3, beat 0.22.

**Frame-rate-correct multiplicative decay (apply from day one — No Moon shipped without it and chargers dashed 28% farther at 30fps):**
```js
v *= Math.pow(k, dt * 60)   // k = 0.90-0.96 for particles, 0.16^dt for heavy drag
```

**Trauma screenshake, re-derived for 3D.** Keep the Rocket Shoes trauma model — `addShake(v): shake = max(shake, v)` (never additive), linear decay 2.25/s, response = shake² so small hits barely register (0.07 → ~0.15px) and big ones slam (1.2 → ~43px) — but replace raw per-frame `Math.random` offsets (a stated weakness twice over) with Marrow's incommensurate-sine composition applied to camera *rotation*:
```js
offset = (sin(p*2.1)+sin(p*5.7)*0.35, cos(p*2.7)*0.55, sin(p*3.3+1.7)*0.65) * shake² * amplitude
p += dt * (9 + shake*18)
```
Event calibration table to port (as trauma values): shot connect 0.07, dash/slide hit 0.18, plain kill 0.18, dash-kill 0.34, player hurt 0.46, miniboss death 0.7, boss death 1.2, room/area clear 0.42. Scale by 0.15 under prefers-reduced-motion.

**Directional camera kick for weapon fire (No Moon):** per-shot `kick = clamp(kick - aimDir * amount, -18, 18)` with amount per weapon (shotgun 8.0, twin 3.8, needle 1.9), spring-return via damp lambda 17, global multiplier 0.18 so full-auto never nauseates. In 3D: apply as pitch-up impulse + small FOV kick, never as aim displacement that fights the mouse.

**Hitstop that keeps particles alive (Rocket Shoes — its best trick):**
```js
hitPause(kind): fx.hitPause = max(cur, ms/1000)  // shot 8, kill 18, dashKill 26, boss 48, hurt 60 ms
// main loop: if (hitPause > 0) { updateParticles(raw * 0.55); return; }  — decay on RAW time
```
Everything freezes but sparks keep blooming at 55% speed — feels alive, not paused. **Fix the known flaw:** keep sampling and buffering input during the pause (inputs were lost in Rocket Shoes).

**Slow-mo with eased recovery (No Moon), separate from hitstop:**
```js
currentTimeScale() = timer <= 0 ? 1 : lerp(1, scale, t*t), t = timer/duration
```
Doses: dash launch 0.04s, kill-chain up to 0.16, room clear (0.48, 0.22), boss phase (0.34, 0.28), boss death (0.62-0.92, 0.18-0.23). Use `Math.max` so chained kills don't become a brake. UI/messages/input run on real dt; world runs scaled.

**Universal hit-connect recipe (combat routed through ONE damage function so every hit gets identical juice — Rocket Shoes' combat.js discipline):** white flash on the body 0.15s decayed at 5/s; bright contact pop particle along the hit direction; 5 sparks (8 heavy) in a ±0.575rad cone around knockback angle, every 3rd white else enemy color; heavy hits add a ground ring ripple. In 3D: emissive flash on the enemy material, world-space spark burst, decal ring.

**Kill-chain crescendo announcer:**
```js
chain = (t - lastKillAt <= 1.2) ? chain+1 : 1
tiers = [[2,'DOUBLE KILL'],[3,'TRIPLE'],[4,'OVERKILL'],[6,'RAMPAGE'],[9,'MASSACRE'],[12,'ANNIHILATION']]
// fire ONLY when n === threshold (re-announce top every 4 past 12) — "punches instead of flickering"
scale = clamp(0.78+n*0.1, 0.85, 1.85); shake = min(0.12+n*0.03, 0.52); slowMo from n>=3
```

**Kills feed movement (the signature loop — this is the ability-progression seed):** per kill refund dash/slide cooldown (-0.145s); movement-kills enforce minimum exit speed + brief i-frames; combo milestones deterministically heal 1 HP or bank a shield (once per tier, Set-tracked) — every milestone "does something".

**Style callouts as teaching:** name the verb at the moment it scores — RAIL KILL, AIR KILL, PERFECT! (eject in last 30% of a traversal), GRIND CHAIN ×N. Per-area style rank (S/A/B/C/D) at clear with color-coded juice.

**REDLINE flow meter:** movement verbs (0.25-0.42/s) and kills (0.045-0.4) fill a bar; at 1.0, 5s of hyperspeed (speed ×1.26, score ×1.6) with a big burst; can't refill mid-surge. In an FPS this is a perfect "keep moving" reward channel.

**One tension scalar drives many channels simultaneously (Banana/Marrow — the strongest cross-game pattern):** a single 0-1 value drives audio gain + pitch, a light's intensity, mesh quiver frequency AND amplitude, ring alpha, shake magnitude, fog density, exposure, heartbeat BPM, player speedScale. For the FPS: a "danger/intensity" scalar fed by nearby enemies, boss phases, low HP — driving music layers, vignette, ambient light, and enemy aggression together so every escalation peaks on all channels at once. Marrow's guardian loom is the template: `near = clamp(1-(d-1)/7, 0, 1)` drives dread, tunnel `pow(near,1.6)`, breath, shake, and speedScale 1-near*0.4 on one curve.

**FP body feel (Marrow, port wholesale):**
- Velocity accel/friction: `vel += (wish*speed - vel) * min(1, rate*dt)`, accel 16 held / friction 13 released; walk 2.48 m/s, run 4.1 (raise these for an action FPS — Banana's 2.35/3.6 felt flat).
- Headbob: `bobPhase += dt*8.8*(running?1.35:1)`; vertical `sin(phase)*0.038*min(1,speed/walk)`; lateral sway `cos(phase*0.5)*0.038*0.6`; camera roll = sway*0.6, Euler 'YXZ'.
- Breathing idle life: `sin(breathPhase)*0.015*(1+(1-stamina)*2.2)`, rate 1.6 calm / 4.5 exerted.
- Wall slide: `into = vel·n; if (into<0) vel -= into*n` after push-out — clean sliding, no jitter.
- Footsteps by distance travelled, not timer: `stepDist += horizSpeed*dt`, step every 2.0m walk / 1.5m run; wall-bump thud at speed >1.2 with 0.45s cooldown.
- Viewmodel counter-sway: `position.x -= look.dx*0.6; rotation.y = -look.dx*0.8` + half-phase bob; MeshBasicMaterial, frustumCulled=false, renderOrder 10.
- Weapon/flashlight lag: aim dir lerps to camera forward at `min(1, dt*12)`.
- Forced-look for boss reveals: shortest-arc yaw `diff = ((desired - yaw + PI) % 2PI) - PI; yaw += diff * strength * min(1, dt*3)`.

**Capped aim assist that never feels like auto-aim (Rocket Shoes' documented retune):** projectile bend max turn 0.07 within a 0.90-dot cone and short range, `score = d*(1.7-align)`, steer by `f = 1-exp(-turn*dt)`; dash/lunge bend at most 0.07 rad (~4°). The config comments record before/after values that killed "magnet feel" — for an FPS keep this only on touch/gamepad, off for mouse. Critically: **do not inherit "the gun aims itself"** — aiming skill must matter this time.

**Muzzle flash without entities (No Moon):** per-shot `firePulse += 0.14-0.46` (clamped 1.15), decays 8.5/s, drawn as additive glow at the muzzle. In 3D: pulse a muzzle PointLight intensity from a pooled light rig (see performance).

**Player-hurt readability stack (No Moon's post-playtest fix — start loud):** red radial vignette=1 decaying at 3.2/s eased `t*(2-t)`; distinct cue for shield vs HP loss (cyan single ring vs red double ring + flash); 0.9s i-frames; shake 0.46; 60ms hitstop; `navigator.vibrate([70,50,140])` on coarse pointers.

**Boss ceremony director (No Moon, verbatim design):** HP thresholds [0.82, 0.60, 0.38, 0.16] with catch-up (loop all thresholds per frame); each surge: wipe hostile projectiles, slowMo(0.34, 0.28), shake (16 at phase≥3), expanding ring, named phase line, one themed add type per phase. Below 25%: one-shot FINAL STAND (0.6s invulnerable, bullet wipe, instant twin rings, speed ×1.14). Defeat: 2.35-3.35s ceremony, exit locked so victory can't be skipped, player invulnerable 3.4-4.8s, all-caps kill line.

**Telegraph grammar:** 0.34s spawn glyph before anything materializes; 460px/equivalent spawn clearance from the player; windup floats/sounds before charges (0.38s) and snipes (0.68s); ring attacks with a safe gap punched toward the player ("read it, dodge the gap").

**Spawn director (Rocket Shoes):** `budget = (11 + depth*1.95 + stage*1.7 + recipeAdj) * clamp(sqrt(area/base), 1, 3.1)`; split 74% first wave (staggered i*0.075s) / reinforcement at rand(1.05,1.95)s OR when ≤2 enemies remain — never flat, never a dogpile. Hunter pressure so big spaces never feel empty ("single biggest feels-faster lever"): enemies beyond 760px get speed ×(1+1.72·hf) and steering blended toward direct pursuit, `hf = clamp((d-760)/(2450-760), 0, 1)`.

**Room/area-clear celebration:** wipe bullets; vacuum pickups to player at 900px/s; flash + shake 0.42 + slowMo 0.12; double ripple; STYLE RANK grade; spawn a forgiving guided route to the exit (huge magnetic latch window so players discover traversal by accident).

**Creature "wrongness" package (Marrow, for horror-tinged bosses/regions):** `malform(geo, amp, seed)` per-vertex sine-product displacement + recomputed normals; stop-motion jitter quantized to `floor(phase*14)` hashed steps; aggression scalar drives jaw/emissive/eye-light together; watched-state test `dot(playerForward, toCreature) > 0.86` + LOS; eye-blink transitions `UI.blink(down, up)` for teleports and reveals.

**Behavior-reactive flavor:** LUMA's idle life (never a dead screen — auto-emit soft events after 3s of nothing); No Moon's procedural epithets on death/win (~60 lines: ordered threshold checks over run stats → "The wall remembers you as X"); Rocket Shoes' behavior notices collected into a codex, not shoved on screen.

### 2B. Audio (all synthesized, zero samples)

**Bus architecture (merge Marrow + No Moon):**
```
all SFX → sfxGain → muffle lowpass (20000 open, 380-2600 for stun/underwater) 
        → DynamicsCompressor(threshold -18, knee 24, ratio 4, attack 0.004, release 0.25) → destination
parallel send → ConvolverNode (procedural IR: 2.8s, pow(1-t,3.2) noise + sparse early reflections every 1733 samples)
        revGain per zone: 0.62 outdoor → 0.95 interior/wet
music bus → gain 0.18 → highpass 74Hz → lowpass 3600Hz → Compressor(-26, knee 18, ratio 5) limiter
```
Fix the Rocket Shoes flaw: SFX get a limiter too. Player breath/heartbeat routed DRY (bypass reverb) so they stay intimate.

**Two-primitive SFX engine (~80 lines covers everything):**
```js
playToneBurst({type, startFreq, endFreq, duration, gain, filterFreq, q, when}):
  osc → biquad lowpass → gain; freq setValueAtTime(start) → exponentialRamp(end, +dur);
  gain 0.0001 → linear attack 0.002-0.012s → exponentialRamp to 0.0001 at +dur
playNoiseBurst({filterType, filterFreq, q, gain, duration, rate}):
  shared white-noise AudioBuffer (0.34s, tapered (1-i/len)^1.6) → biquad → gain; playbackRate = pitch
```
The sound grammar: **noise burst = impact body; low saw/square = threat/weight; rising sine stack = reward.**

Recipe book to port directly:
- Shot: triangle 520Hz 0.035s g0.025 — **add ±5-8% pitch/gain randomization per shot** (stated fatigue weakness)
- Shotgun: bandpass noise 920Hz Q1.1 g0.07 48ms + square 182→72Hz g0.09 55ms
- Hit confirm: bandpass noise (1250+rand(-140,160))Hz Q1.8 + triangle 170→82Hz
- Kill: sine 600 then sine 900 delayed 0.03 (rising = reward)
- Hurt: noise 0.09 + sawtooth 95Hz 0.13
- Locked door: 3 bandpass rattles 1750-2500Hz + 118→56Hz thud
- Clear/pickup: sine arpeggio 392/588/784 staggered 0.06/0.12
- PERFECT: sine 988/1319/1976 (crystalline)
- Elite/threat: sawtooth 70 + square 105 + sawtooth 140 + noise (horn)
- Telegraph: quiet square 180Hz 0.05s g0.02
- Boss death: triangle 72→36Hz 0.22s g0.14 + lowpass noise 300Hz + delayed sine 128→42Hz
- Stinger: detuned saw cluster at 1100Hz × partials [1, 1.0595, 1.414, 2] glissing 0.8→1.15→1.0, preceded by 150→28Hz sub-drop, bed ducked to 0.25 for 120ms
- Footsteps surface-aware: leaf = highpass 700 + crackle transients at 3kHz; wet = lowpass 900; dry = lowpass 1600; heavy monster ×3.4 + 78→42Hz body sine
- Whisper: noise through Q8 bandpass swept 700→1600→900Hz (formants imply voice)
- Cartoon one-shot template (Banana): fast attack + exponential decay + downward pitch glide

**Spam control:** `audioGate(category, interval)` per-category ctx.currentTime timestamps — shots 0.018s, hits 0.024s.

**Spatialization (do better than all predecessors, cheaply):** Marrow's manual StereoPanner — `pan = side component of (source-listener)·right`, `gain = 1/(1 + d²*0.02)` — is the floor. For the FPS, this plus the muffle filter per-source (occlusion approximation via the collision LOS test) is enough; HRTF PannerNode optional on desktop.

**Continuous threat drone (Banana — perfect for boss lairs/guarded destinations):** sawtooth 430Hz → bandpass(920, Q3.8) → gain; sine LFO 6.2Hz × gain 120 into osc.frequency for wobble; per frame `gain.setTargetAtTime(intensity * clamp(1.25/max(0.7,dist), 0.07, 1) * 0.18, now, 0.05)`; pitch `setTargetAtTime(420 + sin(t*5.4)*70 + sin(t*13.2)*34 + intensity*2.2, now, 0.04)`. **Never set .value directly — always setTargetAtTime (tau 0.04-0.05) to avoid zipper/clicks.**

**Tension biology (Marrow):** heartbeat = sine thump sweeping freq*1.6→freq over 60ms, lub + dub (+0.22s, ×0.7), rate eases to 52 + tension*46 BPM at dt*0.8, `bumpHeart(intensity, bpm)` spikes; breath = bandpass noise inhale 540→(980+level*700)Hz over 0.4s + exhale, rate 12 + level*17/min, silent below 0.12.

**Generative BGM (Rocket Shoes' sequencer is the keeper):**
- Lookahead scheduler: setInterval 60-82ms, schedule everything within 0.28-0.30s of ctx.currentTime, STEP = 60/bpm/4.
- Per-region palettes: {scale, chord progression as degrees, bpm, lead style} — aeolian/dorian/phrygian/lydian/harmonic; boss = 130bpm aeolian; root transposed by hashing region id into semitones (rootHz = 55·2^(semis/12)); re-key only at bar boundaries.
- Intensity 0-1 = base 0.30 + depth·0.30 + combo·0.30 + boss 0.16 + elite 0.14 + surge 0.26 + near-death 0.08, smoothed 10%/tick; gates layers (hats >0.22, lead >0.34, arp >0.40, four-on-floor >0.52, kick pickup >0.78) and opens a master lowpass 2600 + s·3200Hz. **Fix the seam weakness: crossfade each layer's gain over ~1 bar instead of hard threshold pops.**
- Sidechain pump: kick = sine 140→46Hz exp over 0.10s; duckGain snaps to 0.42 at each kick, linearRamp back to 1.0 over 2.2 sixteenths.
- Dotted-eighth delay: delayTime 0.75·beat, feedback 0.36, wet 0.26.
- Supersaw lead: 3 saws detuned [-7, 0, +8] cents, lowpass 2600 Q2, glide from 1.04x; 4 hardcoded licks per phrase fitted to the live chord; swing +STEP·0.12 on odd sixteenths.
- Per-note gains tiny (0.004-0.05) — headroom by design.

**Analysis/normalization utilities (LUMA):** attack/release envelope follower `Env(attack, release)` picking half-life by direction; adaptive normalization `max = max(raw, max·pow(0.5, dt/6)); norm = raw/(max+1e-4)` — reuse for auto-leveling the dynamic mix.

**Resilience:** lazy AudioContext on first gesture; resume() on visibilitychange/focus/pointerdown/keydown + 0.5s poll; iOS unlock via near-silent blip; **schedule delayed beats on ctx.currentTime, never setTimeout** (documented drift and pause-desync bugs in Marrow and Rocket Shoes' volatileShard).

### 2C. World Building

**Region system = Marrow's zone data + LUMA's director genome.** Each region is a data object: fog color + FogExp2 density (0.038 open → 0.078 dense), ambient color/intensity, saturated identity key color, music palette, enemy bias pair, ONE signature mechanic with a one-sentence lore/tutorial tagline (No Moon's BIOME_MECHANICS: "furnace rhythm punishes standing still — move between the beats"). On top, run LUMA's director for weather/mood: `out[p] = clamp(lerp(from, to, smootherstep) + fbm1(t*0.08 + phase)·range·driftFrac, min, max)` — authored ranges, seeded targets every 16-34s, slow noise drift. This gives an open world living skies/fog/light with zero assets.

**Enterable destinations = Marrow's parametric wing builder.** One `buildDestination(spec)` + a SPEC table per destination (seed, maze dims, braid 0.5-0.76, guidance color, textures, clutter density) produced six visually distinct dungeons from one code path. Structure per destination: big decorated entry room → maze/arena body → key/objective at `farthestCell` (BFS) → boss guarding it → exit corridor. Recursive backtracker + braid pass (reopen dead-ends with probability braid) for loops; `pathTo` extracts solution paths for diegetic guidance (ember/light trails).

**No-repeat content dealing (Rocket Shoes' Bag):** shuffled bag + recent-history window per content axis (region flavor, layout, encounter recipe, mutator) — "the core anti-boring device". Consecutive areas always differ on every axis.

**Determinism discipline:** one seeded PRNG stream per system (mulberry32); **separate RNG stream for visual baking, hashed from location identity**, so rendering never advances gameplay RNG (Rocket Shoes' documented headless-divergence bug). LCG per builder: `s = s*1664525 + 1013904223 >>> 0`.

**Procedural texture kit (Marrow's textures.js, port wholesale):** mulberry32 → 256² value-noise grid → bilinear + smoothstep → fbm(4-5 octaves); paint to 256/512 canvas, cache by key, RepeatWrapping, anisotropy 8, SRGB; reuse as bumpMap (bumpScale 0.03-0.105). Recipes on file: ground/bark/wallpaper/woodfloor/stone/flesh, plus Banana's wood-grain/frost/hazard-stripe canvas recipes, plus `softDot(color)` radial-gradient sprite for every glow.

**Procedural geometry:** merged vertex-displaced primitives (Marrow's trees: lumpTrunk bend + 4-8 branch cylinders merged into one BufferGeometry, 4 variants as InstancedMesh for 1200 trees); `malform()` displacement for organic horror; parametric swept tubes (Banana's banana: arc-swept tapered tube) for anything curved. Banana's "wall polish" lesson: baseboards, rails, panel seams every 3m so big walls stop reading as flat slabs — dress every large surface with rhythm.

**Zero-cost lighting vocabulary:** emissive materials + additive softDot sprites stand in for lights; fake light spills and blob shadows as alpha quads (warm floor-spill under lamps, glow planes at doorways); warm-vs-cold zone staging (Banana's kitchen: amber lamp side vs blue freezer shrine). Fog doubles as culling budget AND mood (far plane 55-90m in dense regions — an open world needs longer draws in open regions, so make far-plane per-region data).

**Diegetic navigation (this replaces the minimap):** light IS the tutorial — ember/votive trails on solution paths, emissive floor strips, colored glow bleeding from the next objective, faint zone-tinted glow on every non-path cell ("never pitch black" guarantee). For open-world wayfinding: region-colored skyline landmarks + Rocket Shoes' screen-edge danger triangles for threats.

**Guidance generosity:** the escape-rail pattern — after a clear, spawn an irresistible fast route back/onward with a huge magnetic latch window. Softlock insurance: coarse flood-fill from spawn validating objective reachability (breakables count passable), prune unreachable pockets.

**Districts as legibility:** big non-colliding named color slabs ("Neon Arcology") baked into the ground so sprawl reads as a place with zero collision cost.

**Level module contract (Marrow):** `build(ctx) → {name, group, field, flames, spawn, fog, ambient, sky, update(dt,t,player), onEnter}`; shared ctx {scene, audio, post, ui, player, inventory, interactables[], triggers[], director}. For open world: same contract per *chunk/destination*, streamed instead of swapped.

**Ambush spill-outs spawn OUTSIDE the doorway with rush velocity** so nothing clips (sealed annex pattern) — reuse for destination interiors.

### 2D. Performance

**Renderer setup (Marrow, proven):** `WebGLRenderer({antialias:false, stencil:false, powerPreference:'high-performance'})` with 'default' fallback; SRGBColorSpace; ACESFilmicToneMapping exposure ~1.24; pixelRatio capped 1.9/1.35/1.0 by device tier (deviceMemory/hardwareConcurrency + touch UA); shadowMap 1024/512/off.

**The #1 Three.js rule: constant light count.** Three bakes point-light count into every shader program; any change = multi-hundred-ms recompile freeze. Therefore: pooled "rover" PointLights (fixed pool of 12-14 lent per frame to nearest emitters, sorted by squared distance, intensity faded by `fall = clamp(1.15 - dist/(range+0.5))` so pool churn never pops); entity lights on always-visible rigs at intensity 0 when hidden; glow via emissive + additive sprites, never removable lights.

**Shader pre-warm during load fades:** `renderer.compileAsync(scene, camera)` (KHR_parallel_shader_compile); temporarily reveal hidden light-bearing entities at y=-60 during the black fade so their light-count-specific programs compile, then re-hide.

**InstancedMesh for all repetition:** tree variants, wall segments as instanced unit boxes with per-instance scale matrices, props. Module-level material caches (~15 shaders instead of ~230 per area). Merged BufferGeometries per prop variant = one draw call each.

**Collision: grid-broadphase field (Marrow's ColliderField), extended vertically.** `Map<'cx,cz', packed (type<<24|idx)>` cells 3-4.2m; resolve with ≤3 push-out iterations (circle-circle, circle-AABB closest-point, center-inside shortest axis); `addDynamicBox` handles for doors; `segmentClear` for LOS and safe spawns. The 2D-only limitation is a listed weakness — add a height dimension (capsule vs AABB with Y, step-up offset for stairs, gravity) but keep the grid broadphase. Also fixes Rocket Shoes' O(n²) enemy separation: reuse the same grid for enemy-vs-enemy queries.

**Adaptive quality governor (Marrow's, plus recovery — a weakness in all three implementations):** sample FPS every 0.6s; below 46fps escalate: (1) pixelRatio ×0.82 floor 0.8 + resize post RT, (2) drop dust/shadows, (3) pixelRatio ×0.8 floor 0.62, (4) fogDensityScale 1.3 to pull draw distance. **Add hysteresis upscaling when fps > ~72 for several seconds** — no predecessor recovers, and sticky degradation was called out twice.

**Hard entity budgets, mobile-aware, with priority trimming:** caps in config (No Moon: bullets 90/130, enemies 30/42, particles 150/220 mobile/desktop); when over cap, trim by source priority (player primary shots priority 0, never deleted; fragments last); effect fans under pressure shrink count up to 46% but compensate damage by `pow(origCount/finalCount, 0.28)`.

**Single post pass, one RenderTarget** (UnsignedByte, samples 2 high-tier only): aberration + grain + vignette + grade + halation in one fragment shader, no EffectComposer chain. See 2E for the shader contents. If HDR bloom is wanted, LUMA's chain: soft-knee prefilter (`soft = clamp(br-thresh+knee, 0, 2knee); soft = soft²/(4knee+1e-4); contrib = max(soft, br-thresh)/max(br,1e-4)`, knee 0.5, clamp 6.0) + half-res and quarter-res 9-tap gaussian tiers; RGBA16F with runtime fallback to RGBA8.

**GPU particles via transform feedback (LUMA, complete pattern):** interleaved [pos, vel, life, seed] 6 floats, two DYNAMIC_COPY buffers, 4 VAOs, RASTERIZER_DISCARD during update, in-shader respawn when life≤0; point sprite = `exp(-r2*5.5)*0.6 + exp(-r2*24.0)*0.45` halo+core; per-particle brightness `0.3+1.1*fract(seed*3.17)` and size variety so fields read as motes; fade-in first 18% / fade-out last 22% via smoothsteps. Use for rain, ash, embers, sparks, debris fields per region.

**Curl-noise flow field for wind/smoke/debris:** perpendicular gradient of a warped-fbm potential via central differences (e=0.06) — divergence-free by construction; drives region atmosphere particles.

**Accumulation-buffer fairness (if any feedback effect is used):** injection gain `uInject = clamp(dt*60, 0.5, 2.0) * k` so steady-state brightness is identical at 30 vs 144fps.

**Housekeeping that prevented real shipped bugs:** dt clamped to 0.05s; reset globalAlpha/filter/composite state every frame; mark-dead instead of reassigning arrays mid-iteration; defensive `if (!e) continue` in loops that can shrink; WebGL context-loss handling (preventDefault, pause GL, keep sim+audio, rebuild RTs on restore, 7s reload watchdog); rAF fully stopped on document.hidden with lastT reset on resume; texSubImage2D for per-frame texture updates; explicit dispose on level unload with texture caches surviving; string-cache DOM HUD writes; **no service worker** (both "stale-build hell" incidents).

**Fixed-timestep simulation with interpolated render.** Called out as a missing piece in three games (No Moon patched pow(k, dt*60) fixes for three separate frame-rate bugs). Accumulator at 60Hz sim, render interpolation — eliminates the entire bug class.

**Built-in QA harness (Rocket Shoes' oneRoomDebug pattern):** `?debug` exposes state dump, teleport, photo mode, headless world-generation audits, and `selfTest()` returning frame p95, lowFx state, undersized touch targets. Build the verification harness INTO the game — invaluable for agent-driven iteration. Also No Moon's live feel console: all feel constants in one runtime config object readable from devtools while playing.

### 2E. Controls & Post/Presentation

**Desktop:** pointer lock with promise .catch guard; sensitivity 0.0021 rad/px (drag fallback ~0.0029); maxPitch 1.45; look deltas consumed once per frame via consumeLook(). `resetInput()` on blur/visibilitychange/pointerlockchange clears all held keys — prevents "drifts forever".

**Mobile:** floating dual thumbsticks — touchstart on left/right half spawns a stick AT the touch point (radius 54-64px, dead zone 0.12, DOM feedback rings); move stick vector = clamped offset/R, sprint at magnitude >0.92; look stick as turn rate with response curve `sign(v)·pow((|v|-dead)/(1-dead), 1.7)` × maxYaw 3.0 / maxPitch 2.2 rad/s. Tap (<16px moved, <280ms) = interact/fire. Consider adding touch-drag look deltas (Marrow's rate-based stick was self-criticized as indirect). Skip touches on buttons via `closest('button')`. preventDefault on touchstart/touchmove/dblclick/contextmenu. Haptics: navigator.vibrate on hurt/kill, coarse pointers only.

**Input buffering (new — fixes a named weakness):** queue presses during hitstop and cooldowns (dash pressed 100ms early fires the frame it's legal).

**Interaction without prompts (Marrow):** per-frame focus scoring over interactables — reject `dot < 0.35` unless point-blank, `score = dot*2 - d*0.5`, best wins; reticle dot swells 7→13px with warm glow on focus; failed use = rattle + shake(0.12), no text. Banana's cone fallback (`score = dist - dot*1.25`) if raycasting is overkill for a given object class. Fix Banana's flaw: one raycast/LOS check on the winner so you can't interact through walls.

**Post shader (Marrow's single pass — the whole cinematic look in one quad):**
- Chromatic aberration `a = uAberration*(0.25 + r*1.6)`, R at uv+c·a, B at uv−c·a; baseline 0.0015, up to ~0.03 on big hits
- Split-tone: `hi = smoothstep(0.28, 0.88, luma); mix(col·(0.74,0.88,1.10), col·(1.18,0.98,0.74), hi)`
- Contrast `(col-0.5)·(1.10 + dread·0.22 + pulse·0.08) + 0.5`, floor `max(col, 0.006)`
- One-pass halation `col += (1.0,0.66,0.38)·smoothstep(0.52,1.10,luma)·(0.09 + pulse·0.18)`
- Vignette `smoothstep(1.05, 0.3, r)`; tunnel crush at screen edges for danger; red dread wash from edges
- Hash grain + 1/255 dither (kills banding in darkness)
- ACES from LUMA: `clamp((x·(2.51x+0.03))/(x·(2.43x+0.59)+0.14), 0, 1)`
- Uniforms as emotion channels: ease toward targets at `min(1, dt*3.5)`; impulse `kick()` decays at dt*6. Map: pulse = hits, dread = boss proximity, tunnel = low HP, aberration = big impacts.

**IQ cosine palettes, dual CPU/GPU:** `pal(t) = a + b·cos(TAU·(c·t + d))` implemented in both GLSL and JS so gameplay-spawned effect colors exactly match rendered field colors — use for region identity colors and reward tiers.

**UI kit:** DOM for 2D (fade/flash layers, HUD chips, draft cards) over the canvas; glassmorphism panel recipe (rgba(9,13,20,.58), 1px rgba(255,255,255,.12) border, radius 18-28px, backdrop blur 12-14px); 120-180ms opacity/translate transitions on every HUD state change; white flash committed with forced reflow so throttled rAF can't leave it stuck; env(safe-area-inset-*); HUD chip pulse on any stat change (per-frame diff of hp/shield/currency) so pickups are felt without text. prefers-reduced-motion collapses shake/flicker/flash and scales all reactivity ×0.4.

---

## 3. WEAKNESSES TO BEAT

The new game must surpass its predecessors on these, in rough priority:

1. **Real 3D FPS combat depth.** No predecessor has aimed shooting that matters (Rocket Shoes auto-aims, Marrow has no combat, Banana has no weapons). Hitscan/projectile weapons with real aim skill, headshot-style precision rewards, and enemy state machines beyond steering-circles. Boss fights need *choreography* (movement, arena use, readable attack sets), not just ceremony framing around stationary stat balls (No Moon's stated weakness).

2. **Verticality and a real character controller.** Marrow's collision is 2D-only (no gravity, jumping, stairs, ledges); Banana clamps to room bounds. The FPS needs capsule-vs-world with gravity, jump, step-up, slopes — while keeping the grid broadphase and wall-slide math. Rocket Shoes' binary ground/roof levels show the developer already likes *legible* verticality; keep it readable, not free-form.

3. **A contiguous open world, not teleport-swapped facades.** Marrow's mansion exterior is a box; levels are disconnected rebuilds behind 1.15s of black. Chunk streaming with the level-contract pattern, destinations that are physically *in* the world, doors you walk through.

4. **Enemy pathfinding.** Marrow's creature slid into walls and teleported as a "fix"; nothing else navigates at all. Nav grid or flow-field per region; hunter-pressure on top of real navigation.

5. **Fixed-timestep simulation from day one.** Three games shipped frame-rate-dependence bugs that were patched piecemeal. 60Hz accumulator + render interpolation.

6. **Real modules from day one.** No Moon's 100 append-only monkey-patch IIFEs caused boot crashes and unreachable content; delete dead code instead of commenting it out (Rocket Shoes' cruft note). Rocket Shoes' module discipline is the model.

7. **SFX variation and spatialization.** Per-shot pitch/gain randomization, round-robin variants, stereo panning + distance attenuation + occlusion muffle on every one-shot, limiter on the SFX bus.

8. **3D-native juice.** Rotational smoothed camera shake (not random pixel offsets), directional camera kick per weapon, FOV kick on sprint/dash/impact, world-space hit markers — re-derived, not copied from 2D screen-space.

9. **Input buffering** through hitstop and cooldowns (inputs are currently lost during 48-60ms pauses).

10. **Quality governor that recovers** (hysteresis upscaling) — all three implementations only degrade.

11. **Text-light progression UI.** The "teach without text" philosophy died at the meta layer everywhere (dense DOM draft cards, 6.5s toast paragraphs). Ability rewards should be *demonstrated* — a short safe space where the new verb is irresistible — with one-line naming, matching the in-game style-callout teaching.

12. **Music layer crossfades** instead of threshold pops; audio scheduling on ctx.currentTime, never setTimeout.

13. **Save/checkpoint system** — Marrow has none, No Moon's localStorage accreted into "fresh=1 wipe hatch" territory. One versioned save schema with a migration function.

14. **Tune feedback loud first, soften later** — the No Moon lesson, in its own code comments.

---

## 4. RECOMMENDED TECH FOUNDATION

**Renderer: Three.js r160+, vendored, importmap, no bundler (Marrow's setup, proven).**
- `vendor/three.module.min.js`, importmap alias `"three"`, `src/main.js` as module entry, `?v=` cache-busting on imports. No build step, runs from static hosting, no service worker.
- WebGLRenderer({antialias:false, stencil:false, powerPreference:'high-performance'} + fallback), SRGBColorSpace, ACESFilmicToneMapping, PCFSoftShadowMap, tiered pixelRatio 1.9/1.35/1.0.
- Single-pass post shader (Marrow's post.js as the base, LUMA's ACES/bloom pieces as upgrades).
- Context-loss survival + compileAsync pre-warm + constant-light-count discipline as non-negotiable renderer rules.

**Module organization: Rocket Shoes' layout, ported to 3D.**
```
src/config.js        — ALL tuning constants (PLAYER, FX, DIRECTOR, CAPS, HUNT, AUDIO) + device tiering; one file to retune feel
src/state.js         — singleton {mode, run, region, fx, save, frameTimes, lowFx}
src/systems/         — one domain each: player, weapons, enemies, projectiles, combat, director, abilities, juice, interaction
src/data/            — pure tables: regions, enemies, bosses, ability rewards, flavor lines
src/render/          — camera, post, particles, world streaming
src/audio/           — sfx.js (two-primitive engine), bgm.js (sequencer), spatial.js
src/world/           — chunk builders, maze.js, props.js, collision.js (3D-extended ColliderField)
src/main.js          — fixed-timestep loop, mode state machine, debug/selfTest API
```
Key disciplines to carry: **combat.js is the one place damage changes hands** (every hit gets identical juice); systems read config live (runtime feel console); data tables are pure; import direction flows systems → data/render/audio, never sideways.

**Main loop:** rAF → accumulate raw dt (clamped 0.05) → fixed 60Hz sim steps (worldDt = step × currentTimeScale(); hitstop check first: particles-only at 55% raw) → interpolated render → post → governor. FX decay always on raw time. Mode state machine: title/play/transition/pause/dead.

**Carry forward verbatim:**
- Marrow: ColliderField (+Y extension), player.js FP body constants, textures.js, post.js, props.js flame pool, maze.js, level contract + streaming, interaction focus scoring, controls.js (sticks + resetInput), audio.js bus graph + heartbeat/breath, config.js zone-data pattern, quality governor (+recovery).
- Rocket Shoes: damp(), trauma shake model + event table, hitPause table + particles-alive freeze, sfx.js recipes, bgm.js sequencer, Bag dealer, kill-chain announcer, dash-refund/exit-speed loop, spawn director + hunter pressure, telegraph grammar, clear ceremony, capped aim-assist math (touch only), oneRoomDebug/selfTest harness.
- No Moon: slow-mo with eased recovery, directional camera kick, boss phase director + ceremony, damage vignette stack, priority projectile trimming + damage compensation, audioGate, weighted drafts with ownership bias, run epithets, pow(k, dt·60) discipline.
- LUMA: Env follower + approach(), director genome (ranges + seeded targets + noise drift) for weather/mood, IQ palettes dual CPU/GPU, transform-feedback particles, curl-noise flow field, bloom prefilter/ACES, adaptive-resolution pattern, gl.js error-annotated shader compiles.
- Banana: single-tension-scalar-drives-everything pattern, threat drone synth, setTargetAtTime discipline, canvas texture recipes, glassmorphism HUD kit, warm/cold light staging, wall-polish dressing rule.

**Explicitly do NOT carry forward:** append-only monkey-patch versioning; variable timestep; setTimeout game logic; auto-aim on mouse; raw Math.random camera jitter; service workers; sticky-only quality degradation; text-paragraph toasts as primary feedback; commenting out dead systems instead of deleting them.