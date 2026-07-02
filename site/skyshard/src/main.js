// SKYSHARD — boot, fixed-timestep loop, and the state machine that moves the
// player between title, the open world, interiors, and death. All systems
// live on the shared G context (state.js); this file is the only writer.

import * as THREE from 'three';
import { CFG } from './config.js';
import { G } from './state.js';
import { loadSave, save, wipeSave } from './core/save.js';
import { Input } from './core/input.js';
import { initAudio, resumeAudio, sfx } from './core/audio.js';
import { music } from './core/music.js';
import { juice } from './fx/juice.js';
import { Particles } from './fx/particles.js';
import { Motes } from './fx/motes.js';
import { Rovers } from './fx/rovers.js';
import { PostFX } from './fx/postfx.js';
import { Hud } from './ui/hud.js';
import { Player } from './player/controller.js';
import { Weapon } from './player/weapon.js';
import { grantReward } from './player/abilities.js';
import { Terrain, terrainHeight } from './world/terrain.js';
import { Sky } from './world/sky.js';
import { ColliderField } from './world/collision.js';
import { plantWorld } from './world/vegetation.js';
import { Destinations } from './world/destinations.js';
import { Streams } from './world/streams.js';
import { Features } from './world/features.js';
import { updateGlows, updateCulling } from './world/props.js';
import { Enemies } from './combat/enemies.js';
import { Projectiles } from './combat/projectiles.js';
import { Breakables } from './combat/breakables.js';
import { killChain } from './combat/damage.js';
import { InteriorManager } from './interiors/builder.js';
import { SPAWN, SPIRE } from './world/destdata.js';
import { dominantRegion } from './world/regions.js';

const canvas = document.getElementById('c');
const loadFill = document.getElementById('loadfill');
const loadingEl = document.getElementById('loading');
const titleEl = document.getElementById('title');
const pauseEl = document.getElementById('pause');

const setLoad = (f) => { loadFill.style.width = Math.round(f * 100) + '%'; };
const nextFrame = () => new Promise((r) => requestAnimationFrame(r));

let paused = false;
let dead = false;
let transition = false;   // true while fading between scenes
const FIXED = 1 / 60;
let acc = 0;
let lastT = 0;
// fps sampling for the quality governor + debug
let fpsAccum = 0, fpsFrames = 0, fpsTimer = 0, aboveTimer = 0, qualityStep = 0;
let cullTimer = 0;

// ?fx=low → no shadows, no post pass, dpr 1 (weak hardware / headless tests)
const FX_LOW = new URLSearchParams(location.search).get('fx') === 'low';

async function boot() {
  // ---- renderer -------------------------------------------------------------
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, stencil: false, powerPreference: 'high-performance' });
  } catch (e) {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, stencil: false });
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.shadowMap.enabled = !FX_LOW;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(FX_LOW ? 1 : Math.min(devicePixelRatio || 1, CFG.fx.dprCap));
  renderer.setSize(innerWidth, innerHeight);
  G.renderer = renderer;

  const camera = new THREE.PerspectiveCamera(74, innerWidth / innerHeight, 0.09, 950);
  camera.rotation.order = 'YXZ';
  G.camera = camera;

  const worldScene = new THREE.Scene();
  worldScene.fog = new THREE.FogExp2(0xb8c4c8, CFG.world.fogBase);
  G.worldScene = worldScene;
  G.scene = worldScene;
  setLoad(0.05);

  // ---- lights (constant count, forever) --------------------------------------
  const hemi = new THREE.HemisphereLight(0x9fb8d8, 0x5a5442, 0.85);
  const sun = new THREE.DirectionalLight(0xfff2d0, 2.4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -42; sun.shadow.camera.right = 42;
  sun.shadow.camera.top = 42; sun.shadow.camera.bottom = -42;
  sun.shadow.camera.near = 10; sun.shadow.camera.far = 220;
  sun.shadow.bias = -0.0002;
  sun.shadow.normalBias = 0.9;   // terrain is one giant receiver — acne killer
  worldScene.add(hemi, sun, sun.target);
  G.hemi = hemi; G.sun = sun;

  // ---- core -----------------------------------------------------------------
  G.save = loadSave();
  G.input = new Input(canvas);
  G.hud = new Hud();
  setLoad(0.1);
  await nextFrame();

  // ---- world ----------------------------------------------------------------
  G.worldCollide = new ColliderField(terrainHeight);
  G.collide = G.worldCollide;

  const terrain = new Terrain(worldScene);
  G.terrain = terrain;
  // build the spawn neighborhood in slices so the bar moves
  terrain.lastCx = null;
  terrain.update(SPAWN.x, SPAWN.z);
  const totalQ = terrain.queue.length;
  while (terrain.queue.length) {
    const [kx, kz] = terrain.queue.shift();
    const key = kx + ',' + kz;
    if (!terrain.chunks.has(key)) {
      const mesh = terrain.buildChunk(kx, kz);
      terrain.chunks.set(key, mesh);
      if (mesh) worldScene.add(mesh);
    }
    if (terrain.queue.length % 8 === 0) {
      setLoad(0.1 + 0.45 * (1 - terrain.queue.length / totalQ));
      await nextFrame();
    }
  }

  const sky = new Sky(worldScene);
  G.sky = sky;
  setLoad(0.6);
  await nextFrame();

  G.breakables = new Breakables();
  plantWorld(worldScene, G.worldCollide);
  setLoad(0.75);
  await nextFrame();

  G.destinations = new Destinations(worldScene, G.worldCollide);
  G.streams = new Streams(worldScene);
  G.features = new Features(worldScene, G.worldCollide);
  setLoad(0.85);
  await nextFrame();

  // ---- systems ----------------------------------------------------------------
  G.particles = new Particles();
  G.particles.addTo(worldScene);
  G.motes = new Motes();
  G.motes.addTo(worldScene);
  G.rovers = new Rovers();
  G.rovers.addTo(worldScene);
  G.projectiles = new Projectiles();
  G.projectiles.setScene(worldScene);
  G.enemies = new Enemies();
  G.enemies.setScene(worldScene);
  G.interiors = new InteriorManager();

  G.player = new Player();
  G.player.pos.set(SPAWN.x, terrainHeight(SPAWN.x, SPAWN.z), SPAWN.z);
  G.weapon = new Weapon(camera, worldScene);
  G.weapon.syncEvolution(G.save);
  G.weapon.applySkin(G.save.skin || 'default');
  worldScene.add(camera);   // viewmodel rides the camera

  G.postfx = new PostFX(renderer);
  if (FX_LOW) G.postfx.enabled = false;
  G.hud.setPips(G.player.pips, G.player.maxPips);
  G.hud.syncVerbs(G.save);
  setLoad(0.95);

  wireGameEvents();
  wireDebug();

  // pre-warm shaders while the loading screen still covers everything
  renderer.compile(worldScene, camera);
  await nextFrame();
  setLoad(1);

  // ---- title ------------------------------------------------------------------
  G.mode = 'title';
  loadingEl.classList.remove('show');
  titleEl.classList.add('show');

  const begin = () => {
    if (G.mode !== 'title') return;
    initAudio();
    resumeAudio();
    music.start();
    music.setRegion('vale');
    titleEl.classList.remove('show');
    G.hud.show();
    G.mode = 'world';
    G.input.requestLock();
    // instant action: something to fight within sight of the first step
    G.enemies.spawn('hopper', SPAWN.x + 14, SPAWN.z - 10, { ctx: 'world' });
    G.enemies.spawn('puff', SPAWN.x - 10, SPAWN.z - 16, { ctx: 'world' });
    G.enemies.spawn('puff', SPAWN.x - 6, SPAWN.z - 20, { ctx: 'world' });
  };
  titleEl.addEventListener('click', begin);

  // pause on lock loss, resume on click
  G.input.onLockChange = (locked) => {
    if (G.mode === 'title') return;
    paused = !locked;
    pauseEl.classList.toggle('show', paused);
    if (!locked) music.setIntensity(0);
  };
  pauseEl.addEventListener('click', () => G.input.requestLock());
  canvas.addEventListener('click', () => {
    if (G.mode !== 'title' && !G.input.locked) G.input.requestLock();
  });

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    G.postfx.resize();
  });
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); paused = true; });
  canvas.addEventListener('webglcontextrestored', () => { location.reload(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { lastT = 0; if (G.input.locked) document.exitPointerLock?.(); }
  });

  requestAnimationFrame(loop);
}

// ---- cross-system events ------------------------------------------------------
function wireGameEvents() {
  G.onSlamLand = (pos, slam) => {
    juice.shake(CFG.shake.slam);
    juice.stop('lance');
    sfx('slam');
    G.hud.verbFlash('slam');
    G.particles.burst('impact', pos.x, pos.y + 0.3, pos.z, 24, { color: [0.7, 0.85, 1], sizeMult: 1.5 });
    G.particles.debris(pos.x, pos.y + 0.2, pos.z, 8, [0.5, 0.5, 0.55], { floorY: pos.y });
    G.rovers.pulse(pos.x, pos.y + 1, pos.z, [0.6, 0.8, 1], 3.5, 8, 14);
    G.projectiles.explode(pos.x, pos.y + 0.5, pos.z, slam.radius, [0.6, 0.85, 1], { fromPlayer: true, damage: slam.damage, kind: 'slam' });
  };

  G.onShardCollected = () => {
    G.save.shards = (G.save.shards || 0) + 1;
    save();
    sfx('shard');
    G.postfx.pulse(0.5);
    if (G.save.shards % 3 === 0) {
      G.player.addPip();
      sfx('unlock');
      G.hud.whisper('THE VESSEL DEEPENS', 3.4);
    } else {
      G.hud.whisper(`${3 - (G.save.shards % 3)} MORE`, 1.6);
    }
  };

  G.onRewardTaken = (key) => grantReward(key);

  G.onBossDown = () => {
    G.postfx.pulse(1.2);
  };

  G.onShotHitWorld = (hit) => {
    const bell = G.destinations.bell;
    if (bell && Math.hypot(hit.x - bell.x, hit.y - bell.y, hit.z - bell.z) < 2.2) {
      if (G.time.raw - bell.lastRung > 1.2) {
        bell.lastRung = G.time.raw;
        sfx('chime', { pitch: 0.4, gain: 1.4 });
        sfx('bossroar', { pitch: 2.2, gain: 0.25 });
        G.particles.burst('spark', bell.x, bell.y, bell.z, 18, { color: [1, 0.9, 0.6] });
      }
    }
  };

  G.onPlayerDeath = async () => {
    if (dead) return;
    dead = true;
    music.setIntensity(0);
    G.hud.whisper('THE SPIRE REMEMBERS YOU', 2.8);
    sfx('bossdie', { pitch: 1.6, gain: 0.5 });
    await G.hud.fade(600);
    if (G.interior) G.interiors.exit();
    const pl = G.player;
    pl.pos.set(SPIRE.x + 8, SPIRE.y, SPIRE.z + 10);
    pl.pos.y = G.worldCollide.groundAt(pl.pos.x, pl.pos.z, 200, 2);
    pl.vel.set(0, 0, 0);
    pl.pips = pl.maxPips;
    pl.dead = false;
    pl.iFrames = 2;
    G.hud.setPips(pl.pips, pl.maxPips);
    G.terrain.buildAround(pl.pos.x, pl.pos.z);
    dead = false;
  };

  G.requestExitInterior = async () => {
    if (transition) return;
    transition = true;
    await G.hud.fade();
    G.interiors.exit();
    G.terrain.buildAround(G.player.pos.x, G.player.pos.z);
    transition = false;
  };
}

async function enterInterior(dest) {
  if (transition) return;
  transition = true;
  await G.hud.fade();
  G.interiors.enter(dest);
  transition = false;
}

// ---- debug/test surface ---------------------------------------------------------
function wireDebug() {
  window.__game = {
    G,
    state: () => ({
      mode: G.mode, paused, pos: { x: G.player.pos.x, y: G.player.pos.y, z: G.player.pos.z },
      pips: G.player.pips, region: dominantRegion(G.player.pos.x, G.player.pos.z),
      enemies: G.enemies.list.length, fps: G.debug.fps, drawCalls: G.debug.drawCalls, tris: G.debug.tris,
      abilities: { ...G.save.abilities }, altFires: { ...G.save.altFires },
      bossesDown: { ...G.save.bossesDown }, boss: G.boss ? { hp: G.boss.hp, key: G.boss.key } : null,
      interior: G.interior ? G.interior.dest.id : null,
    }),
    teleport(x, z) {
      G.player.pos.set(x, 60, z);
      G.player.pos.y = G.collide.groundAt(x, z, 200, 2);
      G.player.vel.set(0, 0, 0);
      if (G.mode === 'world') G.terrain.buildAround(x, z);
    },
    start() { titleEl.click(); },
    giveAll() {
      for (const k of ['dash', 'doubleJump', 'glide', 'grapple', 'slam']) G.save.abilities[k] = true;
      for (const k of ['lance', 'seeker']) G.save.altFires[k] = true;
      G.hud.syncVerbs(G.save);
      G.weapon.syncEvolution(G.save);
      save();
    },
    god(on = true) { G.player.iFrames = on ? 1e9 : 0; },
    spawn(type, dx = 8, dz = 0) {
      G.enemies.spawn(type, G.player.pos.x + dx, G.player.pos.z + dz, { ctx: G.mode === 'world' ? 'world' : 'interior' });
    },
    enter(id) {
      const d = G.destinations.doors.find((door) => door.dest.id === id)?.dest;
      if (d) enterInterior(d);
    },
    exitInterior() { G.requestExitInterior(); },
    wipe() { wipeSave(); location.reload(); },
    setPaused(v) { paused = v; },
    fire(down = true) { G.input.mouseDown[0] = down; if (down) G.input.mousePressed[0] = true; },
    press(code) { G.input.keys.add(code); G.input.pressedKeys.add(code); setTimeout(() => G.input.keys.delete(code), 120); },
  };
}

// ---- the loop --------------------------------------------------------------------
function loop(tMs) {
  requestAnimationFrame(loop);
  const t = tMs / 1000;
  if (!lastT) { lastT = t; return; }
  const trueDt = t - lastT;             // unclamped — honest fps accounting
  let rawDt = Math.min(trueDt, 0.05);
  lastT = t;
  G.time.raw = t;

  // fps sampling + adaptive quality (with recovery)
  fpsFrames++; fpsAccum += trueDt; fpsTimer += trueDt;
  if (fpsTimer >= CFG.governor.sampleEvery) {
    const fps = fpsFrames / fpsAccum;
    G.debug.fps = Math.round(fps);
    fpsTimer = 0; fpsFrames = 0; fpsAccum = 0;
    if (G.mode !== 'title' && !paused) {
      if (fps < CFG.governor.downAt && qualityStep < 2) {
        qualityStep++;
        applyQuality();
        aboveTimer = 0;
      } else if (fps > CFG.governor.upAt) {
        aboveTimer += CFG.governor.sampleEvery;
        if (aboveTimer > CFG.governor.upAfter && qualityStep > 0) {
          qualityStep--;
          applyQuality();
          aboveTimer = 0;
        }
      } else {
        aboveTimer = 0;
      }
    }
  }

  if (G.mode === 'title') {
    renderTitle(t, rawDt);
    return;
  }
  if (paused || dead || transition) {
    // frozen world, but the camera still breathes so it never feels crashed
    G.renderer.render(G.scene, G.camera);
    G.input.endFrame();
    return;
  }

  // ---- feel kernel: hitstop / slow-mo ----
  const timeMult = juice.update(rawDt);
  if (timeMult === 0) {
    // hitstop: world frozen, particles keep blooming at 55% raw [ported]
    G.particles.update(rawDt * 0.55, G.camera);
    renderFrame(t, rawDt);
    return;
  }

  // ---- fixed-step simulation ----
  acc += rawDt * timeMult;
  let steps = 0;
  while (acc >= FIXED && steps < 3) {
    acc -= FIXED;
    steps++;
    G.time.now += FIXED;
    simStep(FIXED, G.time.now);
  }
  if (steps === 3) acc = 0; // spiral-of-death guard

  // ---- per-render-frame updates ----
  const pl = G.player;
  G.particles.update(rawDt * timeMult, G.camera);
  G.motes.update(rawDt * timeMult, G.time.now);
  updateGlows(t, pl.pos.x, pl.pos.z);
  G.breakables.update(pl.pos.x, pl.pos.y, pl.pos.z);
  G.rovers.update(rawDt, pl.pos.x, pl.pos.y + 1.2, pl.pos.z);

  if (G.mode === 'world') {
    G.terrain.update(pl.pos.x, pl.pos.z);
    cullTimer -= rawDt;
    if (cullTimer <= 0) { cullTimer = 0.4; updateCulling(pl.pos.x, pl.pos.z); }
    G.sky.update(rawDt, t, pl.pos.x, pl.pos.z, G.worldScene, G.sun, G.hemi);
    G.streams.update(rawDt, t);
    G.features.update(rawDt, t);
    const entering = G.destinations.update(rawDt, t, pl.pos.x, pl.pos.z);
    if (entering) { if (pl.stream) G.streams.detach(pl, false); enterInterior(entering); }
    // sun + shadow frustum follow the player
    G.sun.position.set(pl.pos.x + 60, 90, pl.pos.z + 40);
    G.sun.target.position.set(pl.pos.x, pl.pos.y, pl.pos.z);
    music.setRegion(dominantRegion(pl.pos.x, pl.pos.z));
    // ambient region particles
    emitAmbient(rawDt, pl);
  } else if (G.mode === 'interior') {
    G.interiors.update(rawDt * timeMult, t);
  }

  // intensity scalar: enemies near + boss + low health → music + dread
  let danger = 0;
  for (const e of G.enemies.list) {
    if ((e.ctx === 'world') !== (G.mode === 'world')) continue;
    const d = Math.hypot(e.x - pl.pos.x, e.z - pl.pos.z);
    danger += Math.max(0, 1 - d / 40) * 0.34;
  }
  if (G.boss && !G.boss.dead) danger += 0.8;
  if (pl.pips === 1) danger += 0.25;
  G.intensity += (Math.min(1, danger) - G.intensity) * Math.min(1, rawDt * 2);
  music.setIntensity(G.intensity);
  G.postfx.setDread(Math.min(0.55, (G.boss && !G.boss.dead ? 0.3 : 0) + (pl.pips === 1 ? 0.3 : 0)));

  G.hud.update();
  renderFrame(t, rawDt);
}

function simStep(dt, now) {
  const pl = G.player;
  pl.step(dt);
  G.weapon.step(dt);
  G.enemies.update(dt, now);
  G.projectiles.update(dt);
  if (G.boss) G.boss.update(dt);
}

function renderFrame(t, rawDt) {
  const look = G.input.consumeLook();
  const pl = G.player;
  pl.applyLook(look);
  pl.updateCamera(G.camera, rawDt);
  G.weapon.render(rawDt, look);
  G.postfx.render(G.scene, G.camera, rawDt, t);
  G.debug.drawCalls = G.postfx.stats?.calls ?? 0;
  G.debug.tris = G.postfx.stats?.triangles ?? 0;
  G.input.endFrame();
}

// slow scenic orbit behind the title
let titleAngle = 0;
function renderTitle(t, rawDt) {
  titleAngle += rawDt * 0.02;
  const cx = SPAWN.x + Math.cos(titleAngle) * 30;
  const cz = SPAWN.z + Math.sin(titleAngle) * 30;
  G.camera.position.set(cx, terrainHeight(cx, cz) + 10, cz);
  G.camera.lookAt(SPIRE.x, SPIRE.y + 18, SPIRE.z);
  G.sky.update(rawDt, t, cx, cz, G.worldScene, G.sun, G.hemi);
  G.sun.position.set(cx + 60, 90, cz + 40);
  G.sun.target.position.set(cx, 0, cz);
  G.destinations.update(rawDt, t, cx, cz);
  G.renderer.render(G.worldScene, G.camera);
  G.input.endFrame();
}

// region-flavored air: spores, embers, snow, pollen, dust
let ambientT = 0;
function emitAmbient(rawDt, pl) {
  ambientT -= rawDt;
  if (ambientT > 0) return;
  ambientT = 0.055;
  const region = dominantRegion(pl.pos.x, pl.pos.z);
  const type = { vale: 'ambient', ember: 'ember', frost: 'snow', mycel: 'spore', shatter: 'ambient' }[region];
  const a = Math.random() * Math.PI * 2;
  const d = 4 + Math.random() * 18;
  const x = pl.pos.x + Math.cos(a) * d;
  const z = pl.pos.z + Math.sin(a) * d;
  const y = pl.pos.y + (region === 'frost' ? 5 + Math.random() * 4 : 0.5 + Math.random() * 3.5);
  G.particles.burst(type, x, y, z, 1, region === 'shatter' ? { color: [0.75, 0.6, 1] } : undefined);
}

function applyQuality() {
  const r = G.renderer;
  const base = Math.min(devicePixelRatio || 1, CFG.fx.dprCap);
  if (qualityStep === 0) {
    r.setPixelRatio(base);
    r.shadowMap.enabled = true;
  } else if (qualityStep === 1) {
    r.setPixelRatio(Math.max(1, base * 0.8));
  } else {
    r.setPixelRatio(Math.max(0.85, base * 0.62));
    r.shadowMap.enabled = false;
  }
  r.setSize(innerWidth, innerHeight);
  G.postfx.resize();
}

boot();
