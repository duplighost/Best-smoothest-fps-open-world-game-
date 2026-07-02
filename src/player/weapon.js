// The Sparkcaster — one gun for the whole game, and it grows. Each boss
// welds a new piece onto it and changes its voice. Primary is hitscan with
// real aim (crown hits count double); alt-fires arrive as boss rewards:
// hold-RMB charge lance (piercing), Q seeker burst (homing spores).
// All feedback goes to camera/viewmodel — never steals aim.

import * as THREE from 'three';
import { CFG } from '../config.js';
import { G } from '../state.js';
import { sfx } from '../core/audio.js';
import { juice } from '../fx/juice.js';
import { hitEnemy } from '../combat/damage.js';
import { Pool } from '../core/pool.js';
import { clamp01, damp } from '../core/math.js';
import { SKINS } from '../world/features.js';
import { save } from '../core/save.js';

const W = CFG.weapon;
const _dir = new THREE.Vector3();
const _from = new THREE.Vector3();
const _hit = new THREE.Vector3();
const _tmp = new THREE.Vector3();

// slight self-glow so the gun reads in dusk regions instead of silhouetting
const vmMat = (color, emissive, ei = 0.5) =>
  new THREE.MeshStandardMaterial({
    color, roughness: 0.55, metalness: 0.25,
    emissive: emissive ?? color, emissiveIntensity: emissive ? ei : 0.22,
  });

export class Weapon {
  constructor(camera, scene) {
    this.camera = camera;
    this.fireCd = 0;
    this.charging = 0;         // seconds held; -1 = not charging
    this.chargeHeld = false;
    this.lanceCd = 0;
    this.seekerCd = 0;
    this.kickback = 0;         // viewmodel z recoil
    this.swayX = 0; this.swayY = 0;

    // ---- viewmodel ----
    this.rig = new THREE.Group();
    this.rig.position.set(0.24, -0.22, -0.48);
    camera.add(this.rig);

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.11, 0.34), vmMat(0x55617a));
    body.position.z = -0.05;
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.035, 0.3, 8), vmMat(0x6b7890));
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.02, -0.28);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.16, 0.08), vmMat(0x3c4356));
    this.skinMats = { body: body.material, barrel: barrel.material, grip: grip.material };
    this.tracerColor = 0xaee6ff;
    grip.position.set(0, -0.12, 0.06);
    this.coreGlow = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0x86d8ff, fog: false }));
    this.coreGlow.position.set(0, 0.045, -0.12);
    this.muzzle = new THREE.Object3D();
    this.muzzle.position.set(0, 0.02, -0.44);
    this.rig.add(body, barrel, grip, this.coreGlow, this.muzzle);

    // evolution addons appear as bosses fall
    this.addons = {
      lance: this._addon(vmMat(0x552211, 0xff5511, 0.9), [0.05, 0.02, -0.3], [0.02, 0.06, 0.22]),
      seeker: this._addon(vmMat(0x1e3a30, 0x33ffaa, 0.7), [-0.05, 0.02, -0.22], [0.025, 0.05, 0.16]),
      dash: this._addon(vmMat(0x2c3e30, 0x88ff66, 0.6), [0, 0.09, -0.1], [0.05, 0.02, 0.12]),
      wings: this._addon(vmMat(0x2a3a50, 0x66ccff, 0.6), [0, -0.02, -0.36], [0.06, 0.015, 0.08]),
      grapple: this._addon(vmMat(0x3a2a4a, 0xaa66ff, 0.7), [0, 0.05, 0.1], [0.04, 0.04, 0.06]),
    };
    this.rig.traverse((o) => { if (o.isMesh) { o.frustumCulled = false; o.renderOrder = 10; } });

    // ---- tracers (pooled stretched boxes, additive) ----
    const tGeo = new THREE.BoxGeometry(0.03, 0.03, 1);
    tGeo.translate(0, 0, -0.5); // pivot at start, stretch forward
    this.tracers = new Pool((i) => {
      const m = new THREE.Mesh(tGeo, new THREE.MeshBasicMaterial({
        color: 0xaee6ff, transparent: true, opacity: 0.9, fog: false,
        blending: THREE.AdditiveBlending, depthWrite: false,
      }));
      m.visible = false;
      scene.add(m);
      return { mesh: m, life: 0, maxLife: 0.08 };
    }, 14);
  }

  _addon(mat, pos, size) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
    m.position.set(...pos);
    m.visible = false;
    this.rig.add(m);
    return m;
  }

  // cosmetic skins from battle shrines: colors and light only, never numbers
  applySkin(key) {
    const sk = SKINS[key] || SKINS.default;
    this.skinMats.body.color.setHex(sk.body);
    this.skinMats.body.emissive.setHex(sk.body);
    this.skinMats.barrel.color.setHex(sk.barrel);
    this.skinMats.barrel.emissive.setHex(sk.barrel);
    this.skinMats.grip.color.setHex(sk.grip);
    this.skinMats.grip.emissive.setHex(sk.grip);
    this.coreGlow.material.color.setHex(sk.glow);
    this.tracerColor = sk.tracer;
    this.skinKey = key;
  }

  cycleSkin() {
    const owned = ['default', ...Object.keys(G.save.skins).filter((k) => G.save.skins[k])];
    const idx = owned.indexOf(this.skinKey || 'default');
    const next = owned[(idx + 1) % owned.length];
    this.applySkin(next);
    G.save.skin = next;
    save();
    sfx('pickup', { gain: 1.1 });
    G.hud?.whisper(SKINS[next].name, 1.4);
  }

  syncEvolution(save) {
    this.addons.lance.visible = !!save.altFires.lance;
    this.addons.seeker.visible = !!save.altFires.seeker;
    this.addons.dash.visible = !!save.abilities.dash;
    this.addons.wings.visible = !!save.abilities.doubleJump;
    this.addons.grapple.visible = !!save.abilities.grapple;
    const lvl = ['dash', 'lance', 'doubleJump', 'seeker', 'grapple'].filter(
      (k) => save.abilities[k] || save.altFires[k]).length;
    this.level = lvl;
    // evolution tints the core only while unskinned — a worn skin keeps its glow
    if (!this.skinKey || this.skinKey === 'default') {
      this.coreGlow.material.color.setHSL(0.55 + lvl * 0.05, 0.9, 0.6 + lvl * 0.04);
    }
  }

  moveTracersTo(scene) {
    this.tracers.update(() => false);
    for (const t of this.tracers.items) { t.mesh.visible = false; t.mesh.removeFromParent(); scene.add(t.mesh); }
  }

  // ---- firing (sim step) ---------------------------------------------------
  step(dt) {
    const input = G.input;
    const pl = G.player;
    if (!pl || pl.dead) return;

    this.fireCd = Math.max(0, this.fireCd - dt);
    this.lanceCd = Math.max(0, this.lanceCd - dt);
    this.seekerCd = Math.max(0, this.seekerCd - dt);

    // primary — hold to auto-fire
    if (input.mouseDown[0] && this.fireCd <= 0 && this.charging < 0.05) {
      this.fireCd = W.fireInterval;
      this.firePrimary();
    }

    // lance — hold RMB to charge, release to fire
    const hasLance = G.save.altFires.lance;
    if (hasLance && this.lanceCd <= 0) {
      if (input.mouseDown[2]) {
        if (this.charging === 0) sfx('charge');
        this.charging += dt;
        if (this.charging > 0.1) {
          juice.fov(dt * 6);
          if (Math.random() < dt * 20) {
            this.muzzle.getWorldPosition(_tmp);
            G.particles?.burst('spark', _tmp.x, _tmp.y, _tmp.z, 1, { color: [1, 0.6, 0.3] });
          }
        }
      } else if (this.charging > 0) {
        if (this.charging >= W.lance.chargeTime) this.fireLance();
        else this.firePrimary(); // small tap = normal shot, no punishment
        this.charging = 0;
      }
    } else {
      this.charging = 0;
    }

    // skin swap — cosmetic, so it lives on a throwaway key
    if (input.pressed('KeyT')) this.cycleSkin();

    // seeker — Q
    if (G.save.altFires.seeker && input.pressed('KeyQ') && this.seekerCd <= 0) {
      this.seekerCd = W.seeker.cooldown;
      this.fireSeeker();
    }
  }

  _aimRay() {
    G.player.aimDir(_dir);
    _from.set(G.player.pos.x, G.player.eyeY, G.player.pos.z);
    return { from: _from, dir: _dir };
  }

  // Ray vs enemy spheres; returns nearest { e, t, point, headshot } or null.
  _rayEnemies(from, dir, maxDist, width = 0) {
    let best = null;
    const consider = (cx, cy, cz, radius, e, isBossPart) => {
      _tmp.set(cx - from.x, cy - from.y, cz - from.z);
      const tCenter = _tmp.dot(dir);
      if (tCenter < 0 || tCenter > maxDist) return;
      const px = from.x + dir.x * tCenter, py = from.y + dir.y * tCenter, pz = from.z + dir.z * tCenter;
      const dd = Math.hypot(px - cx, py - cy, pz - cz);
      if (dd > radius + width) return;
      if (!best || tCenter < best.t) {
        const hitY = py;
        best = {
          e, t: tCenter, isBossPart,
          point: { x: px, y: py, z: pz },
          headshot: !isBossPart && hitY > cy + radius * 0.42,
        };
      }
    };
    for (const e of G.enemies.list) {
      if ((e.ctx === 'world') !== (G.mode === 'world')) continue;
      consider(e.x, e.y + (e.def.fly > 0 ? 0 : e.def.radius * 1.1), e.z, e.def.radius + 0.15, e, false);
    }
    if (G.boss?.hitSpheres) {
      for (const s of G.boss.hitSpheres()) consider(s.x, s.y, s.z, s.r, s, true);
    }
    return best;
  }

  firePrimary() {
    const { from, dir } = this._aimRay();
    const eHit = this._rayEnemies(from, dir, W.range);
    const wHit = G.collide.raycast(from.x, from.y, from.z, dir.x, dir.y, dir.z, W.range, (this._scr ||= []));

    let endX = from.x + dir.x * W.range, endY = from.y + dir.y * W.range, endZ = from.z + dir.z * W.range;
    if (eHit && (!wHit || eHit.t < wHit.t)) {
      endX = eHit.point.x; endY = eHit.point.y; endZ = eHit.point.z;
      if (eHit.isBossPart) {
        G.boss.onHit(eHit.e, W.damage, { kind: 'shot', dir: { x: dir.x, y: dir.y, z: dir.z }, point: eHit.point });
      } else {
        hitEnemy(eHit.e, W.damage * (eHit.headshot ? W.headshotMult : 1), {
          kind: 'shot', dir: { x: dir.x, y: dir.y, z: dir.z }, point: eHit.point, headshot: eHit.headshot,
        });
      }
    } else if (wHit) {
      endX = wHit.x; endY = wHit.y; endZ = wHit.z;
      if (wHit.item?.breakable) {
        G.breakables.break_(wHit.item.breakable, { x: dir.x, y: dir.y, z: dir.z });
      } else {
        G.particles?.burst('impact', wHit.x, wHit.y, wHit.z, 4, { dir: { x: -dir.x, y: 0.4, z: -dir.z } });
        G.rovers?.pulse(wHit.x, wHit.y, wHit.z, [0.7, 0.85, 1], 0.8, 14, 6);
      }
      G.onShotHitWorld?.(wHit);
    }

    // feel: kick, flash, tracer, voice by evolution level
    juice.kick(W.kickPitch, (Math.random() - 0.5) * 0.004);
    juice.fov(0.8);
    this.kickback = Math.min(0.09, this.kickback + 0.045);
    sfx(this.level >= 2 ? 'shoot2' : 'shoot');
    this.muzzle.getWorldPosition(_tmp);
    G.particles?.burst('muzzle', _tmp.x, _tmp.y, _tmp.z, 2);
    G.rovers?.pulse(_tmp.x, _tmp.y, _tmp.z, [0.6, 0.85, 1], 1.6, 16, 8);
    this._tracer(_tmp.x, _tmp.y, _tmp.z, endX, endY, endZ, this.tracerColor, 0.03);
  }

  fireLance() {
    const { from, dir } = this._aimRay();
    const L = W.lance;
    this.lanceCd = L.cooldown;

    // piercing: everything along the line takes it
    const wHit = G.collide.raycast(from.x, from.y, from.z, dir.x, dir.y, dir.z, L.range, (this._scr ||= []));
    const dist = wHit ? wHit.t : L.range;
    let hits = 0;
    for (const e of [...G.enemies.list]) {
      if ((e.ctx === 'world') !== (G.mode === 'world')) continue;
      _tmp.set(e.x - from.x, (e.y + (e.def.fly > 0 ? 0 : e.def.radius)) - from.y, e.z - from.z);
      const t = _tmp.dot(dir);
      if (t < 0 || t > dist) continue;
      const px = from.x + dir.x * t, py = from.y + dir.y * t, pz = from.z + dir.z * t;
      if (Math.hypot(px - e.x, py - (e.y + (e.def.fly > 0 ? 0 : e.def.radius)), pz - e.z) < e.def.radius + L.width) {
        hitEnemy(e, L.damage, { kind: 'lance', dir: { x: dir.x, y: dir.y, z: dir.z }, point: { x: px, y: py, z: pz } });
        hits++;
      }
    }
    if (G.boss?.hitSpheres) {
      for (const s of G.boss.hitSpheres()) {
        _tmp.set(s.x - from.x, s.y - from.y, s.z - from.z);
        const t = _tmp.dot(dir);
        if (t < 0 || t > dist) continue;
        const px = from.x + dir.x * t, py = from.y + dir.y * t, pz = from.z + dir.z * t;
        if (Math.hypot(px - s.x, py - s.y, pz - s.z) < s.r + L.width) {
          G.boss.onHit(s, L.damage, { kind: 'lance', dir, point: { x: px, y: py, z: pz } });
          hits++;
        }
      }
    }
    if (wHit?.item?.breakable) G.breakables.break_(wHit.item.breakable, dir);

    const ex = from.x + dir.x * dist, ey = from.y + dir.y * dist, ez = from.z + dir.z * dist;
    sfx('lance');
    juice.kick(0.035);
    juice.fov(4);
    juice.shake(0.3);
    juice.stop('lance');
    this.kickback = 0.12;
    this.muzzle.getWorldPosition(_tmp);
    this._tracer(_tmp.x, _tmp.y, _tmp.z, ex, ey, ez, 0xffb060, 0.12, 0.16);
    G.particles?.burst('impact', ex, ey, ez, 14, { color: [1, 0.6, 0.25] });
    G.rovers?.pulse(_tmp.x, _tmp.y, _tmp.z, [1, 0.55, 0.2], 3.2, 10, 14);
  }

  fireSeeker() {
    const { from, dir } = this._aimRay();
    this.muzzle.getWorldPosition(_tmp);
    G.projectiles.seekerVolley({ x: _tmp.x, y: _tmp.y, z: _tmp.z }, dir, W.seeker.count);
    sfx('seeker');
    juice.kick(0.018);
    this.kickback = 0.07;
    G.hud?.verbFlash('seeker');
  }

  _tracer(x0, y0, z0, x1, y1, z1, color, width, life = 0.07) {
    const t = this.tracers.obtain();
    if (!t) return;
    const m = t.mesh;
    m.visible = true;
    m.material.color.setHex(color);
    m.material.opacity = 0.95;
    m.position.set(x0, y0, z0);
    m.lookAt(x1, y1, z1);
    const len = Math.hypot(x1 - x0, y1 - y0, z1 - z0);
    m.scale.set(width / 0.03, width / 0.03, len);
    t.life = t.maxLife = life;
  }

  // ---- viewmodel cosmetics (render frame) ----------------------------------
  render(rawDt, look) {
    const pl = G.player;
    // counter-sway from look, bob from movement [ported]
    this.swayX = damp(this.swayX, -look.x * 4.2, 12, rawDt);
    this.swayY = damp(this.swayY, look.y * 3.4, 12, rawDt);
    this.kickback = damp(this.kickback, 0, 11, rawDt);

    const speedFrac = pl ? clamp01(pl.speedXZ / CFG.player.walkSpeed) : 0;
    const bob = pl && pl.grounded ? Math.sin(pl.bobPhase) * 0.008 * speedFrac : 0;
    const bobY = pl && pl.grounded ? Math.abs(Math.cos(pl.bobPhase)) * 0.006 * speedFrac : 0;

    this.rig.position.set(
      0.24 + this.swayX * 0.012 + bob,
      -0.22 + this.swayY * 0.012 - bobY - (this.charging > 0.1 ? Math.sin(performance.now() / 28) * 0.0035 * Math.min(1, this.charging) : 0),
      -0.48 + this.kickback
    );
    this.rig.rotation.set(this.swayY * 0.02 + this.kickback * 0.8, this.swayX * 0.03, this.swayX * 0.012);

    // charge glow
    const chargeFrac = clamp01(this.charging / W.lance.chargeTime);
    this.coreGlow.scale.setScalar(1 + chargeFrac * 1.6 + Math.sin(performance.now() / 90) * 0.06);

    this.tracers.update((t) => {
      t.life -= rawDt;
      if (t.life <= 0) { t.mesh.visible = false; return false; }
      t.mesh.material.opacity = 0.95 * (t.life / t.maxLife);
      return true;
    });
  }
}
