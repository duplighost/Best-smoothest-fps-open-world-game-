// Five floors down. Each teaches one rule, then makes you obey it while
// every instinct says run. Objectives are always simple and always visible —
// the challenge is never "what do I do", only "can I make myself".

import * as THREE from 'three';
import { G } from './state.js';
import { room, door, place, writing, childDrawing, mats } from '../world/kit.js';
import { sfx, sfx3d, playMusicBox, roomTone, entityBreath, lullaby } from '../core/audio.js';
import { clamp01 } from '../core/math.js';

const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);

// a dark descending stairwell: door frame + steps swallowed by black
function stairwell(scene, collide, x, z, rot) {
  const m = mats();
  const frame = box(1.7, 0.18, 0.3, m.woodDark);
  frame.position.set(x, 2.2, z);
  frame.rotation.y = rot;
  scene.add(frame);
  const c = Math.cos(rot), s = Math.sin(rot);
  for (let i = 0; i < 6; i++) {
    const step = box(1.4, 0.16, 0.34, m.woodDark);
    step.position.set(x - s * (0.4 + i * 0.33), -i * 0.22 - 0.08, z - c * (0.4 + i * 0.33));
    step.rotation.y = rot;
    scene.add(step);
  }
  const void_ = box(1.7, 2.6, 0.1, new THREE.MeshBasicMaterial({ color: 0x000000, fog: false }));
  void_.position.set(x - s * 2.4, 1.1, z - c * 2.4);
  void_.rotation.y = rot;
  scene.add(void_);
}

export const FLOORS = [

  // ═════════════════════════════════════ 1 · THE HOUSE ═══════════════════
  {
    name: 'the house',
    spawn: { x: 0, z: 6.5, yaw: 0 },
    base: 0.1,
    stepSound: 'stepWood',
    tone: { sub: 44, subGain: 0.05, windFreq: 300, windGain: 0.022 },
    hemi: 0.72,
    build(c) {
      const m = mats();
      // entry hall runs north; parlor west; kitchen east; cellar door at the end
      room(c.scene, c.collide, 0, 0, 4.4, 17, 3.1, {
        doors: [
          { side: 'w', at: 0.5, w: 1.3 },     // parlor
          { side: 'e', at: -2.5, w: 1.3 },    // kitchen
          { side: 'n', at: 0, w: 1.4 },       // cellar door
        ],
      });
      // side rooms inset 0.3 so shared walls never share a plane
      room(c.scene, c.collide, -6.0, 0.5, 7.2, 6, 3.0, { doors: [{ side: 'e', at: 0, w: 1.3 }] });
      room(c.scene, c.collide, 5.8, -2.5, 6.8, 6, 3.0, { doors: [{ side: 'w', at: 0, w: 1.3 }] });

      // furniture: a house, interrupted
      place(c.scene, c.collide, 'table', -6.5, 0.5, 0.3);
      place(c.scene, c.collide, 'chair', -5.6, 1.5, 2.4);
      place(c.scene, c.collide, 'chair', -7.3, -0.6, -0.6);
      place(c.scene, c.collide, 'shelf', -8.9, 2.2, Math.PI / 2);
      place(c.scene, c.collide, 'radio', -6.7, 0.62, 0.3, { y: 0.8, collide: false });
      place(c.scene, c.collide, 'table', 5.6, -4.2, 0.2);
      place(c.scene, c.collide, 'chair', 6.5, -3.2, -2);
      place(c.scene, c.collide, 'dresser', 8.6, -1.2, -Math.PI / 2);
      place(c.scene, c.collide, 'wardrobe', 1.7, -7.6, Math.PI);
      place(c.scene, c.collide, 'frame', -2.15, 3, 0, { y: 1.5, collide: false });
      place(c.scene, c.collide, 'frame', -2.15, 5.5, 0, { y: 1.6, collide: false });
      place(c.scene, c.collide, 'bulb', 0, 2, 0, { y: 3.05, collide: false });
      place(c.scene, c.collide, 'bulb', -5.8, 0.5, 0, { y: 2.95, collide: false });

      // words
      writing(c.scene, 'STILL', -2.62, 2.3, 0.6, Math.PI / 2, 'it cannot know you', 1.6);
      childDrawing(c.scene, 'tall', 2.1, 1.4, 4.5, -Math.PI / 2);

      // light: hall lamp + parlor lamp. kitchen stays dark on purpose.
      c.hallLamp = c.rig.practical(0, 2.6, 2, [1, 0.68, 0.4], 1.6, 0.1);
      c.parlorLamp = c.rig.practical(-5.8, 2.5, 0.5, [1, 0.72, 0.45], 1.4, 0.08);

      // cellar door: locked until the key
      c.cellarDoor = door(c.scene, c.collide, -0.7, -8.5, 0, { locked: true });
      c.interact(-0.1, -8.3, 1.2, () => c.cellarDoor.interact());
      stairwell(c.scene, c.collide, 0, -9.4, 0);

      c.state = { phase: 0, keyTaken: false, flickerT: 0 };

      // the key, glinting on the parlor table
      const key = box(0.16, 0.03, 0.06, m.iron);
      key.position.set(-6.2, 0.83, 0.5);
      c.scene.add(key);
      c.keyMesh = key;

      // kitchen: something crosses the floor above you
      c.trigger(5.6, -2.5, 2.4, () => {
        sfx3d('thudAbove', 5.6, -2.5, { gain: 1.2 });
        setTimeout(() => sfx3d('dragAbove', 6.5, -3.5, { gain: 1.1 }), 900);
        G.fear.spike(0.4);
      });

      // parlor: the radio plays for you. when it stops, it is in the hall.
      c.trigger(-4.2, 0.5, 1.6, () => {
        c.state.phase = 1;
        playMusicBox(-6.7, 0.3, () => {
          if (G.mode !== 'play') return;
          c.state.flickerT = 7.5;
          sfx('flickerBuzz', { gain: 1.2 });
          G.entity.startPass([[0, -7.8], [0, 3], [0, 7.6]], {
            speed: 1.15,
            onDone: () => { c.state.flickerT = 0.6; },
          });
          G.hud.whisper('still.', 2.2);
        });
      });

      // the key — taking it wakes the second, closer pass
      c.interact(-6.2, 0.5, 1.1, () => {
        if (c.state.keyTaken) return;
        c.state.keyTaken = true;
        c.keyMesh.visible = false;
        sfx('pickup', { gain: 1 });
        c.cellarDoor.locked = false;
        setTimeout(() => {
          if (G.mode !== 'play') return;
          c.state.flickerT = 9;
          sfx('flickerBuzz', { gain: 1.3 });
          sfx3d('doorSlam', 0, 7.5, { gain: 1.2 });
          G.entity.startPass([[0, 7.6], [0, 0.8], [-3.4, 0.5], [0, 0.8], [0, -7.8]], {
            speed: 1.05,
            onDone: () => { c.state.flickerT = 0.8; },
          });
        }, 1400);
      }, { once: true });

      // through the cellar door, down
      c.trigger(-0.1, -8.9, 1.0, () => {
        if (c.cellarDoor.open) c.nextFloor();
      }, { repeat: true });
    },
    update(c, dt, t) {
      c.cellarDoor.update(dt);
      if (c.keyMesh.visible) c.keyMesh.rotation.y = t * 0.8;
      // flicker: the lamps stutter while it walks
      if (c.state.flickerT > 0) {
        c.state.flickerT -= dt;
        const dying = Math.random() < 0.4;
        c.hallLamp.on = dying;
        c.parlorLamp.on = !dying || Math.random() < 0.5;
        if (c.state.flickerT <= 0) { c.hallLamp.on = true; c.parlorLamp.on = true; }
      }
    },
  },

  // ═════════════════════════════════════ 2 · THE CELLAR ══════════════════
  {
    name: 'the cellar',
    spawn: { x: -8.5, z: 5, yaw: Math.PI * 0.75 },
    base: 0.22,
    stepSound: 'stepStone',
    tone: { sub: 36, subGain: 0.07, windFreq: 180, windGain: 0.032 },
    hemi: 0.45,
    build(c) {
      const m = mats();
      room(c.scene, c.collide, 0, 0, 22, 15, 2.5, {
        wall: m.stone, floor: m.concrete, ceil: m.concrete,
        doors: [{ side: 'e', at: 1, w: 1.5 }],
      });
      // pillars make it a maze that eats your sightlines
      for (const [x, z] of [[-5, -2], [-5, 3], [0, -3.5], [0, 1.5], [5, -1], [5, 4], [-2.5, 5], [3, -5.5], [7.5, 1.5], [-7.5, -4]]) {
        const p = box(0.9, 2.5, 0.9, m.stone);
        p.position.set(x, 1.25, z);
        p.castShadow = true;
        c.scene.add(p);
        c.collide.addBox(x - 0.45, z - 0.45, x + 0.45, z + 0.45, 0, 2.5);
      }
      for (const [x, z, r] of [[-3, -6, 0], [6, -6.5, 0], [-9.5, 1, Math.PI / 2], [2, 6.4, Math.PI]]) {
        place(c.scene, c.collide, 'shelf', x, z, r);
      }
      place(c.scene, c.collide, 'wardrobe', 9.9, -5.5, -Math.PI / 2);

      writing(c.scene, 'MOVE WHEN IT BREATHES', -8.4, 1.7, 3.2, Math.PI * 0.75, 'freeze when it listens', 2.6);

      // three fuses, glinting far apart. each one you touch, it hears.
      c.state = { fuses: 0, done: false };
      const fusePts = [[-9, -6], [9.2, 6], [4, -6.3]];
      c.fuseMeshes = [];
      for (const [fx, fz] of fusePts) {
        const f = box(0.1, 0.18, 0.08, m.porcelain);
        f.position.set(fx, 0.55, fz);
        c.scene.add(f);
        c.fuseMeshes.push(f);
        c.interact(fx, fz, 1.0, () => {
          if (!f.visible) return;
          f.visible = false;
          c.state.fuses++;
          sfx3d('fuse', fx, fz, { gain: 1.4 });
          G.entity.hearNoise(fx, fz, 1.0);          // it heard that. it always hears that.
          G.fear.spike(0.5);
          G.hud.whisper(c.state.fuses < 3 ? `${3 - c.state.fuses} left` : 'the box.', 1.8);
        }, { once: false });
      }

      // fusebox by the exit door
      const fb = place(c.scene, c.collide, 'fusebox', 10.8, 3.0, -Math.PI / 2, { collide: false });
      c.fusebox = fb;
      c.exitDoor = door(c.scene, c.collide, 10.9, 1.75, Math.PI / 2, { locked: true });
      c.exitBulb = c.rig.practical(10.2, 2.3, 1.2, [1, 0.75, 0.5], 0, 0.06);
      // two dying sconces so the maze isn't pure void
      c.rig.practical(-6, 2.2, -1, [0.7, 0.55, 0.4], 0.5, 0.3);
      c.rig.practical(4, 2.2, 3, [0.7, 0.55, 0.4], 0.42, 0.34);

      c.interact(10.4, 3.0, 1.2, () => {
        if (c.state.fuses < 3 || c.state.done) { sfx('doorLocked', { gain: 0.8 }); return; }
        c.state.done = true;
        sfx3d('breaker', 10.4, 2.2, { gain: 1.3 });
        c.exitBulb.intensity = 1.8;
        c.exitDoor.locked = false;
        c.exitDoor.interact();
        entityBreath.setOn(false);
        G.hud.whisper('up. quickly.', 2.4);
        G.fear.spike(0.3);
      });

      stairwell(c.scene, c.collide, 12.3, 1.5, -Math.PI / 2);
      c.trigger(11.8, 1.4, 0.9, () => { if (c.state.done) c.nextFloor(); }, { repeat: true });

      // it stands in the middle of the dark, listening
      G.entity.setMode('hunt');
      G.entity.teleport(2, 0);
      entityBreath.period = 3.4;
    },
    update(c, dt) {
      c.exitDoor.update(dt);
      for (const f of c.fuseMeshes) if (f.visible) f.rotation.y += dt * 1.2;
      // your noise, in the silence between its breaths, is a dinner bell
      if (G.entityListening && G.player.noise > 0.3) {
        G.entity.hearNoise(G.player.pos.x, G.player.pos.z, G.player.noise);
      }
    },
  },

  // ═════════════════════════════════════ 3 · THE FLOOD ═══════════════════
  {
    name: 'the flood',
    spawn: { x: 0, z: 2.5, yaw: 0 },
    base: 0.3,
    stepSound: 'stepWater',
    water: 0.32,
    tone: { sub: 30, subGain: 0.09, windFreq: 120, windGain: 0.045 },
    hemi: 0.42,
    build(c) {
      const m = mats();
      // one corridor. fifty-four meters. a light at the end.
      room(c.scene, c.collide, 0, -24, 3.4, 58, 2.7, { wall: m.stone, floor: m.concrete, ceil: m.stone });
      const water = box(3.4, 0.04, 58, m.water);
      water.position.set(0, 0.32, -24);
      c.scene.add(water);
      c.water = water;

      // pipes along the walls, dripping
      for (let i = 0; i < 5; i++) {
        const pipe = box(0.12, 0.12, 10, m.iron);
        pipe.position.set(i % 2 ? -1.6 : 1.6, 2.3, -6 - i * 9);
        c.scene.add(pipe);
      }

      writing(c.scene, 'DO NOT STOP', -1.52, 1.7, -3.5, Math.PI / 2, 'do not look back', 2.2);
      childDrawing(c.scene, 'water', 1.55, 1.3, -6, -Math.PI / 2);

      // the far door and its lamp — the whole game is walking toward this
      c.exitDoor = door(c.scene, c.collide, -0.6, -52.6, 0, {});
      c.rig.practical(0, 2.2, -51.5, [1, 0.8, 0.55], 2.2, 0.1);
      c.rig.practical(0, 2.2, 1.5, [0.6, 0.5, 0.4], 0.5, 0.3);

      c.state = { started: false, backT: 0 };

      c.trigger(0, -4, 1.6, () => {
        c.state.started = true;
        sfx3d('waterWake', 0, 4, { gain: 1.3 });
        G.entity.setMode('flood');
        G.entity.floodDist = 15;
        G.hud.whisper('walk.', 2);
      });
      // brushes: something passes your legs, twice
      c.trigger(0, -20, 1.7, () => { sfx3d('waterWake', 1.2, -19, { gain: 1.5 }); G.fear.spike(0.55); });
      c.trigger(0, -38, 1.7, () => { sfx3d('waterWake', -1.1, -37, { gain: 1.6 }); G.fear.spike(0.6); });

      c.interact(-0.1, -52.2, 1.2, () => {
        c.exitDoor.interact();
        G.entity.setMode('off');
      });
      c.trigger(0, -52.8, 1.0, () => { if (c.exitDoor.open) c.nextFloor(); }, { repeat: true });
    },
    update(c, dt) {
      c.exitDoor.update(dt);
      G.player.inWater = G.player.pos.z < -2 && G.player.pos.z > -52;
      // looking back is how it finds your face
      if (c.state.started && G.entity.mode === 'flood') {
        let a = G.player.yaw % (Math.PI * 2);
        if (a > Math.PI) a -= Math.PI * 2;
        if (a < -Math.PI) a += Math.PI * 2;
        if (Math.abs(a) > 1.85) {
          c.state.backT += dt;
          G.fear.spike(dt * 1.4);
          if (c.state.backT > 0.85) G.entity.grab();
        } else {
          c.state.backT = Math.max(0, c.state.backT - dt * 2);
        }
      }
    },
  },

  // ═════════════════════════════════════ 4 · THE NURSERY ═════════════════
  {
    name: 'the nursery',
    spawn: { x: 0, z: 4.6, yaw: 0 },
    base: 0.26,
    stepSound: 'stepWood',
    tone: { sub: 48, subGain: 0.045, windFreq: 420, windGain: 0.02 },
    hemi: 0.55,
    build(c) {
      const m = mats();
      room(c.scene, c.collide, 0, 0, 15, 12, 2.9, {
        wall: m.nursery,
        doors: [{ side: 's', at: 0, w: 1.4 }, { side: 'n', at: 0, w: 1.6 }],
      });
      // cribs in rows. all empty. all recently slept in.
      for (const [x, z, r] of [[-5.5, -3, 0.1], [-5.5, 0, -0.06], [-5.5, 3, 0.12], [5.5, -3, Math.PI], [5.5, 1, Math.PI + 0.08]]) {
        place(c.scene, c.collide, 'crib', x, z, r);
      }
      place(c.scene, c.collide, 'dresser', 6.8, 4.6, Math.PI);
      place(c.scene, c.collide, 'chair', -6.6, 5, 0.7);

      for (const [k, x, z, ry] of [['still', -7.35, -1, Math.PI / 2], ['tall', -7.35, 1.5, Math.PI / 2], ['water', 7.35, -1, -Math.PI / 2]]) {
        childDrawing(c.scene, k, x, 1.4, z, ry);
      }
      writing(c.scene, 'KEEP THEM IN YOUR LIGHT', 0, 2.2, -5.8, 0, '', 3);

      // the small ones. they were already facing the door when you came in.
      c.ones = [];
      for (const [x, z] of [[-3, -1.5], [-1.2, -3.2], [1.4, -2.2], [3.2, -3.6], [0.2, -0.6], [4.4, -0.9]]) {
        const g = place(c.scene, null, 'smallOne', x, z, 0, { collide: false });
        c.ones.push({ g, x, z, frozenLook: 0 });
      }

      // one bare bulb, swinging faintly. it is not enough. it was never enough.
      c.centerLamp = c.rig.practical(0, 2.6, 0, [1, 0.7, 0.42], 1.1, 0.22);
      c.rig.practical(0, 2.3, -5.2, [0.8, 0.65, 0.5], 0.8, 0.12);

      // the gate out, and the crank that opens it
      c.gate = box(1.5, 2.3, 0.12, m.iron);
      c.gate.position.set(0, 1.15, -6.05);
      c.scene.add(c.gate);
      c.gateItem = c.collide.addBox(-0.75, -6.2, 0.75, -5.9, 0, 2.3);
      const crank = place(c.scene, c.collide, 'crank', 1.6, -5.7, 0, { collide: false });
      c.crank = crank;
      c.state = { progress: 0, open: false, cranking: false };

      stairwell(c.scene, c.collide, 0, -7.1, 0);
      c.trigger(0, -6.6, 0.9, () => { if (c.state.open) c.nextFloor(); }, { repeat: true });
    },
    update(c, dt, t) {
      const pl = G.player;
      const aim = pl.aimDir(new THREE.Vector3());

      // cranking: hold E near the crank. every second of it, your back is a door.
      const nearCrank = Math.hypot(pl.pos.x - 1.6, pl.pos.z + 5.7) < 1.3;
      c.state.cranking = !c.state.open && nearCrank && G.input.down('KeyE');
      if (c.state.cranking) {
        c.state.progress += dt;
        c.crank.userData.spin.rotation.x += dt * 5;
        if (Math.random() < dt * 3.4) sfx3d('crank', 1.6, -5.7, { gain: 1 });
        if (c.state.progress > 9) {
          c.state.open = true;
          c.gateItem.dead = true;
          sfx3d('doorCreak', 0, -6, { gain: 1.4 });
          G.hud.whisper('down.', 2);
        }
      }
      if (!c.state.open) c.gate.position.y = 1.15 + (c.state.progress / 9) * 2.1;

      // the small ones creep whenever your beam is off them
      for (const one of c.ones) {
        const dx = pl.pos.x - one.x, dz = pl.pos.z - one.z;
        const d = Math.hypot(dx, dz);
        const toX = dx / (d || 1), toZ = dz / (d || 1);
        const dot = -(aim.x * toX + aim.z * toZ);   // 1 when the beam is on it
        const lit = G.rig.flashOn && dot > 0.82 && d < 16 &&
          G.collide.segmentClear(pl.pos.x, pl.pos.z, one.x, one.z, 0.9);
        if (!lit && G.mode === 'play') {
          one.x += toX * dt * 0.42;
          one.z += toZ * dt * 0.42;
          if (Math.random() < dt * 3.2) {
            sfx3d('childTick', one.x, one.z, { gain: 0.9 });
            G.fear.spike(0.025);
          }
        }
        one.g.position.set(one.x, 0, one.z);
        one.g.rotation.y = Math.atan2(dx, dz);
        if (d < 0.85) G.entity.grab();
      }
    },
  },

  // ═════════════════════════════════════ 5 · THE LONG DARK ═══════════════
  {
    name: 'the long dark',
    spawn: { x: 0, z: 1.5, yaw: 0 },
    base: 0.4,
    stepSound: 'stepStone',
    tone: { sub: 26, subGain: 0.1, windFreq: 90, windGain: 0.05 },
    hemi: 0.17,
    build(c) {
      const m = mats();
      // an S of corridors, then the door. no lights. only her voice.
      // each junction is a real aligned doorway on a shared (slightly offset) wall line
      const opts = { wall: m.stone, floor: m.concrete, ceil: m.stone };
      room(c.scene, c.collide, 0, -6, 3, 16, 2.5, { ...opts, doors: [{ side: 'n', at: 0, w: 2.0 }] });
      room(c.scene, c.collide, 3.2, -15.9, 9.4, 3.6, 2.5, { ...opts, doors: [{ side: 's', at: -3.2, w: 2.0 }, { side: 'n', at: 3.2, w: 2.0 }] });
      room(c.scene, c.collide, 6.4, -26.8, 3, 18, 2.5, { ...opts, doors: [{ side: 's', at: 0, w: 2.0 }, { side: 'n', at: 0, w: 2.0 }] });
      room(c.scene, c.collide, 2.2, -37.7, 11.4, 3.6, 2.5, { ...opts, doors: [{ side: 's', at: 4.2, w: 2.0 }, { side: 'n', at: -4.2, w: 2.0 }] });
      room(c.scene, c.collide, -2, -45.7, 3, 12, 2.5, { ...opts, doors: [{ side: 's', at: 0, w: 2.0 }] });

      writing(c.scene, 'SHE WILL GUIDE YOU', 0, 1.8, 0.4, 0, 'no light. it hates the light.', 2.6);

      c.finalDoor = door(c.scene, c.collide, -2.6, -51.2, 0, { locked: true });
      c.state = { lightTries: 0, gaze: false, gazeT: 0, done: false, whispered: false };

      lullaby.setPos(-2, -51);
      lullaby.setOn(true);

      c.interact(-2, -50.7, 1.3, () => {
        if (c.state.gaze || c.state.done) return;
        sfx3d('doorLocked', -2, -45.4, { gain: 1.2 });
        if (!c.state.whispered) {
          c.state.whispered = true;
          setTimeout(() => {
            if (G.mode !== 'play') return;
            G.hud.whisper('it wants to be seen', 4.5);
            sfx('stinger', { gain: 0.7 });
            c.state.gaze = true;
            lullaby.setOn(false);
            G.entity.setMode('gaze');
            G.entity.teleport(-2, -40.5);      // ten meters behind you. turn around.
            document.getElementById('gaze').style.opacity = 1;
          }, 1200);
        }
      });

      // it walks somewhere behind you the whole way down
      c.followT = 4;
      G.entity.setMode('off');
    },
    update(c, dt, t) {
      c.finalDoor.update(dt);
      const pl = G.player;

      // your light is forbidden here
      if (G.rig.flashOn) {
        c.state.lightTries++;
        G.rig.flashOn = false;
        sfx('flickerBuzz', { gain: 1.4 });
        sfx3d('entityStep', pl.pos.x, pl.pos.z - 4, { gain: 1.4 });
        G.fear.spike(0.7);
        G.hud.whisper('no.', 1.6);
      }

      if (!c.state.gaze) {
        // footsteps in the dark behind you, keeping your pace
        c.followT -= dt * (0.5 + pl.speedFrac);
        if (c.followT <= 0) {
          c.followT = 3 + Math.random() * 4;
          const back = pl.forward(new THREE.Vector3()).multiplyScalar(-6 - Math.random() * 4);
          sfx3d('entityStep', pl.pos.x + back.x, pl.pos.z + back.z, { gain: 1.1 });
          G.fear.spike(0.12);
        }
      } else if (!c.state.done) {
        // THE ASK: look at it. keep looking. let it come.
        const aim = pl.aimDir(new THREE.Vector3());
        const dx = G.entity.pos.x - pl.pos.x, dz = G.entity.pos.z - pl.pos.z;
        const d = Math.hypot(dx, dz) || 1;
        const dot = aim.x * (dx / d) + aim.z * (dz / d);
        const looking = dot > 0.93;
        if (looking) {
          const proximity = clamp01(1 - d / 12);
          c.state.gazeT += dt * (0.75 + proximity * 0.8);
          G.entity._moveToward(pl.pos.x, pl.pos.z, dt, 0.55 + proximity * 0.5);
          G.fear.spike(dt * (1.2 + proximity));
          if (Math.random() < dt * 5) sfx3d('entityStep', G.entity.pos.x, G.entity.pos.z, { gain: 0.7 + proximity });
        } else {
          c.state.gazeT = Math.max(0, c.state.gazeT - dt * 1.5);
        }
        document.querySelector('#gaze > div').style.width = clamp01(c.state.gazeT / 5) * 100 + '%';
        if (c.state.gazeT >= 5) {
          c.state.done = true;
          document.getElementById('gaze').style.opacity = 0;
          G.endGame();
        }
      }
    },
  },
];
