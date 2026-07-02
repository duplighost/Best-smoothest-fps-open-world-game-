// STILL — boot, loop, floors, and the moments between them.
// The renderer is kept starving on purpose: the flashlight and a handful of
// practicals are all the light there is. Everything else is the dark, and
// the dark is where it lives.

import * as THREE from 'three';
import { G } from './game/state.js';
import { Input } from './core/input.js';
import { initAudio, resumeAudio, startEngines, sfx, roomTone, entityBreath, lullaby } from './core/audio.js';
import { ColliderField } from './world/collision.js';
import { LightRig } from './world/kit.js';
import { Player } from './game/player.js';
import { Entity } from './game/entity.js';
import { Fear } from './game/fear.js';
import { PostFX } from './game/postfx.js';
import { FLOORS } from './game/floors.js';

const canvas = document.getElementById('c');
const titleEl = document.getElementById('title');
const pauseEl = document.getElementById('pause');
const faderEl = document.getElementById('fader');
const grabEl = document.getElementById('grab');
const whisperEl = document.getElementById('whisper');
const handEl = document.getElementById('hand');
const endEl = document.getElementById('end');

const FIXED = 1 / 60;
let acc = 0, lastT = 0;
let paused = false, transition = false;
let whisperTimer = 0;
let fpsFrames = 0, fpsAccum = 0, fpsTimer = 0;
let god = false;

// ---- boot ---------------------------------------------------------------------
function boot() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, stencil: false, powerPreference: 'high-performance' });
  } catch (e) {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, stencil: false });
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.setSize(innerWidth, innerHeight);
  G.renderer = renderer;

  G.camera = new THREE.PerspectiveCamera(66, innerWidth / innerHeight, 0.05, 120);
  G.camera.rotation.order = 'YXZ';

  G.input = new Input(canvas);
  G.player = new Player();
  G.entity = new Entity();
  G.fear = new Fear();
  G.rig = new LightRig(G.camera);
  G.postfx = new PostFX(renderer);

  G.hud = {
    whisper(text, seconds = 3) {
      whisperEl.textContent = text;
      whisperEl.style.opacity = 1;
      clearTimeout(whisperTimer);
      whisperTimer = setTimeout(() => { whisperEl.style.opacity = 0; }, seconds * 1000);
    },
  };

  G.entity.onGrab = onGrab;
  G.endGame = endGame;
  G.entityListening = false;
  entityBreath.onPhase((phase) => { G.entityListening = phase === 'in'; });

  wireDebug();

  G.mode = 'title';
  faderEl.style.opacity = 0;
  titleEl.classList.add('show');

  titleEl.addEventListener('click', () => {
    if (G.mode !== 'title') return;
    initAudio();
    resumeAudio();
    startEngines();
    titleEl.classList.remove('show');
    G.input.requestLock();
    const startAt = Number(localStorage.getItem('still-floor') || 0);
    loadFloor(Math.min(startAt, FLOORS.length - 1), true);
  });

  G.input.onLockChange = (locked) => {
    if (G.mode === 'title' || G.mode === 'ending') return;
    paused = !locked;
    pauseEl.classList.toggle('show', paused);
  };
  pauseEl.addEventListener('click', () => G.input.requestLock());

  addEventListener('resize', () => {
    G.camera.aspect = innerWidth / innerHeight;
    G.camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    G.postfx.resize();
  });
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); paused = true; });
  canvas.addEventListener('webglcontextrestored', () => location.reload());

  requestAnimationFrame(loop);
}

// ---- floors --------------------------------------------------------------------
function loadFloor(idx, first = false) {
  const def = FLOORS[idx];
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.FogExp2(0x020202, 0.055);

  const collide = new ColliderField(() => 0);
  G.scene = scene;
  G.collide = collide;
  G.floorIdx = idx;
  G.interactables = [];

  const ctx = {
    scene, collide,
    rig: G.rig,
    triggers: [],
    state: {},
    trigger(x, z, r, fn, opts = {}) { ctx.triggers.push({ x, z, r, fn, repeat: !!opts.repeat, fired: false }); },
    interact(x, z, r, fn, opts = {}) { G.interactables.push({ x, z, r, fn, once: !!opts.once, used: false }); },
    nextFloor() {
      if (transition) return;
      if (idx + 1 >= FLOORS.length) return;
      fadeTo(() => loadFloor(idx + 1));
    },
  };

  G.entity.setMode('off');

  // rig moves in FIRST — build() claims this floor's practical lights
  scene.add(G.camera);
  G.rig.moveTo(scene);
  def.build(ctx);
  G.floor = { def, ctx };
  G.rig.hemi.intensity = def.hemi ?? 0.2;
  // the house has lamps; the middle floors give you the light; the last takes it
  G.rig.flashOn = idx >= 1 && idx <= 3;
  if (idx === 1) setTimeout(() => { if (G.mode === 'play') G.hud.whisper('f — your light', 3); }, 3000);
  G.entity.moveTo(scene);

  const pl = G.player;
  pl.pos.set(def.spawn.x, 0, def.spawn.z);
  pl.vel.set(0, 0, 0);
  pl.yaw = def.spawn.yaw;
  pl.pitch = 0;
  pl.stepSound = def.stepSound || 'stepWood';
  pl.inWater = false;
  pl.stillTime = 0;
  pl.frozenInput = 1.0;

  G.fear.setBase(def.base);
  roomTone.set(def.tone, 2.5);
  if (idx !== 4) lullaby.setOn(false);
  document.getElementById('gaze').style.opacity = 0;

  localStorage.setItem('still-floor', String(idx));
  G.renderer.compile(scene, G.camera);
  G.mode = 'play';
  if (def.name) G.hud.whisper(def.name, 2.6);
}

function fadeTo(fn, holdMs = 700) {
  transition = true;
  faderEl.style.opacity = 1;
  setTimeout(() => {
    fn();
    setTimeout(() => {
      faderEl.style.opacity = 0;
      transition = false;
    }, holdMs);
  }, 1300);
}

// ---- being taken ------------------------------------------------------------------
function onGrab() {
  if (G.mode !== 'play' || god) return;
  G.mode = 'grabbed';
  G.debug.grabs++;
  sfx('grab', { gain: 1.2 });
  G.fear.spike(1.2);
  grabEl.style.transition = 'opacity 90ms linear';
  grabEl.style.opacity = 1;
  // a half-second of something huge against the lens, then nothing
  setTimeout(() => {
    grabEl.style.transition = 'opacity 1400ms ease';
    setTimeout(() => { grabEl.style.opacity = 0; }, 900);
    loadFloor(G.floorIdx);
    G.fear.tension = 0.55;         // the body remembers
  }, 1300);
}

function endGame() {
  if (G.mode === 'ending') return;
  G.mode = 'ending';
  sfx('grab', { gain: 0.9 });
  sfx('stinger', { gain: 1 });
  lullaby.setOn(false);
  entityBreath.setOn(false);
  grabEl.style.transition = 'opacity 120ms linear';
  grabEl.style.opacity = 1;
  setTimeout(() => {
    endEl.classList.add('show');
    setTimeout(() => { document.getElementById('endline').style.opacity = 1; }, 2400);
    localStorage.removeItem('still-floor');
    document.exitPointerLock?.();
  }, 1600);
}

// ---- interaction ------------------------------------------------------------------
const _aim = new THREE.Vector3();
function updateInteract() {
  const pl = G.player;
  pl.aimDir(_aim);
  let best = null, bd = 1e9;
  for (const it of G.interactables) {
    if (it.once && it.used) continue;
    const dx = it.x - pl.pos.x, dz = it.z - pl.pos.z;
    const d = Math.hypot(dx, dz);
    if (d > it.r + 0.4) continue;
    const dot = d > 0.05 ? (dx / d) * _aim.x + (dz / d) * _aim.z : 1;
    if (dot < 0 && d > 0.9) continue;   // only reject what's truly behind you
    if (d < bd) { bd = d; best = it; }
  }
  handEl.classList.toggle('on', !!best);
  if (best && G.input.pressed('KeyE')) {
    best.used = true;
    best.fn();
  }
}

// ---- loop --------------------------------------------------------------------------
function loop(tMs) {
  requestAnimationFrame(loop);
  const t = tMs / 1000;
  if (!lastT) { lastT = t; return; }
  const trueDt = t - lastT;
  const rawDt = Math.min(trueDt, 0.05);
  lastT = t;
  G.time.raw = t;

  fpsFrames++; fpsAccum += trueDt; fpsTimer += trueDt;
  if (fpsTimer > 0.6) {
    G.debug.fps = Math.round(fpsFrames / fpsAccum);
    fpsTimer = 0; fpsFrames = 0; fpsAccum = 0;
  }

  if (G.mode === 'title' || G.mode === 'ending') return;
  if (paused || transition || G.mode === 'grabbed') {
    if (G.scene) G.renderer.render(G.scene, G.camera);
    G.input.endFrame();
    return;
  }

  // flashlight toggle — a soft click you'll wish was quieter
  if (G.input.pressed('KeyF')) {
    G.rig.flashOn = !G.rig.flashOn;
    sfx('fuse', { gain: 0.35 });
    G.player.noise = Math.min(1, G.player.noise + 0.15);
  }

  acc += rawDt;
  let steps = 0;
  while (acc >= FIXED && steps < 3) {
    acc -= FIXED;
    steps++;
    G.time.now += FIXED;
    G.player.step(FIXED);
    G.entity.update(FIXED);
    G.floor.def.update?.(G.floor.ctx, FIXED, G.time.now);

    // triggers
    for (const tr of G.floor.ctx.triggers) {
      if (tr.fired && !tr.repeat) continue;
      const d = Math.hypot(G.player.pos.x - tr.x, G.player.pos.z - tr.z);
      if (d < tr.r) { tr.fired = true; tr.fn(); }
      else if (tr.repeat) tr.fired = false;
    }
  }
  if (steps === 3) acc = 0;

  updateInteract();
  G.fear.update(rawDt, t);
  roomTone.update();
  entityBreath.update();
  lullaby.update();

  const look = G.input.consumeLook();
  G.player.applyLook(look);
  G.player.updateCamera(G.camera, rawDt);
  G.player.aimDir(_aim);
  G.rig.update(rawDt, t, G.camera, _aim);
  G.postfx.render(G.scene, G.camera, rawDt, t);
  G.debug.drawCalls = G.postfx.stats?.calls ?? 0;
  G.debug.tris = G.postfx.stats?.triangles ?? 0;
  G.input.endFrame();
}

// ---- debug / test surface -------------------------------------------------------------
function wireDebug() {
  window.__still = {
    G,
    state: () => ({
      mode: G.mode, floor: G.floorIdx, floorName: G.floor?.def.name,
      pos: { x: G.player.pos.x, y: G.player.pos.y, z: G.player.pos.z },
      tension: Math.round(G.fear.tension * 100) / 100,
      still: Math.round(G.player.stillTime * 10) / 10,
      noise: Math.round(G.player.noise * 100) / 100,
      flash: G.rig.flashOn,
      entity: { mode: G.entity.mode, x: G.entity.pos.x, z: G.entity.pos.z },
      grabs: G.debug.grabs,
      fps: G.debug.fps, drawCalls: G.debug.drawCalls, tris: G.debug.tris,
      paused, transition,
    }),
    start() { titleEl.click(); },
    skip(i) { fadeTo(() => loadFloor(i)); },
    god(on = true) { god = on; },
    teleport(x, z) { G.player.pos.set(x, 0, z); },
    press(code) { G.input.keys.add(code); G.input.pressedKeys.add(code); setTimeout(() => G.input.keys.delete(code), 150); },
    hold(code, on = true) { on ? G.input.keys.add(code) : G.input.keys.delete(code); },
    use() { G.input.pressedKeys.add('KeyE'); },
    flash(on) { G.rig.flashOn = on; },
    wipe() { localStorage.removeItem('still-floor'); location.reload(); },
  };
}

boot();
