// Wind streams: the Shardlands' grind rails. Five luminous currents of air
// flow from the Spire out to each region's great door. Touch one and it
// takes you — ~27 m/s, camera stretched, sparks in your wake — and a jump
// throws you out with your speed kept, straight into a glide or a dash.
// No unlock, no prompt: the flow is visible, riding it is touching it.

import * as THREE from 'three';
import { CFG } from '../config.js';
import { G } from '../state.js';
import { terrainHeight } from './terrain.js';
import { REGIONS } from './regions.js';
import { clamp01, damp } from '../core/math.js';
import { sfx } from '../core/audio.js';

const S = CFG.streams;

// Control points hub → region majors, ending short of each building.
const ROUTES = [
  { region: 'vale', pts: [[8, 62], [36, 150], [86, 260], [114, 348]] },
  { region: 'ember', pts: [[-28, 38], [-120, 55], [-240, 85], [-356, 115]] },
  { region: 'frost', pts: [[-18, -48], [-75, -145], [-140, -290], [-170, -392]] },
  { region: 'mycel', pts: [[42, 28], [150, 62], [300, 112], [396, 146]] },
  { region: 'shatter', pts: [[32, -38], [115, -145], [230, -305], [312, -400]] },
];

// Catmull-Rom through [x,z] control points → dense samples.
function sampleRoute(pts, step = 2) {
  const P = [pts[0], ...pts, pts[pts.length - 1]];
  const out = [];
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
    const segLen = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const n = Math.max(2, Math.ceil(segLen / step));
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
      const z = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
      out.push({ x, z, y: 0 });
    }
  }
  out.push({ x: pts[pts.length - 1][0], z: pts[pts.length - 1][1], y: 0 });
  // ride height: above the ground with gentle swoops (smoothed twice)
  for (const s of out) s.y = terrainHeight(s.x, s.z) + 2.6;
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 1; i < out.length - 1; i++) {
      out[i].y = (out[i - 1].y + out[i].y * 2 + out[i + 1].y) / 4;
    }
  }
  return out;
}

export class Streams {
  constructor(scene) {
    this.routes = ROUTES.map((r) => {
      const samples = sampleRoute(r.pts);
      return { ...r, samples, key: REGIONS[r.region].key };
    });

    // the current itself: one Points cloud, region-tinted, softly additive
    const pos = [], col = [];
    for (const r of this.routes) {
      for (let i = 0; i < r.samples.length; i += 2) {
        const s = r.samples[i];
        const f = i / r.samples.length;
        pos.push(s.x, s.y + Math.sin(i * 0.7) * 0.18, s.z);
        col.push(
          0.55 + (r.key[0] - 0.55) * f,
          0.75 + (r.key[1] - 0.75) * f,
          0.95 + (r.key[2] - 0.95) * f
        );
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    this.cloud = new THREE.Points(geo, new THREE.PointsMaterial({
      map: streakTexture(), size: 1.5, transparent: true, opacity: 0.42,
      vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false,
      sizeAttenuation: true,
    }));
    this.cloud.frustumCulled = false;
    scene.add(this.cloud);

    // runners: bright motes racing along each route = you can read the flow
    const RUN = 10;
    this.runners = [];
    const rpos = new Float32Array(this.routes.length * RUN * 3);
    const rcol = [];
    this.routes.forEach((r, ri) => {
      for (let k = 0; k < RUN; k++) {
        this.runners.push({ route: ri, d: (k / RUN) * r.samples.length });
        rcol.push(r.key[0], r.key[1], r.key[2]);
      }
    });
    const rgeo = new THREE.BufferGeometry();
    rgeo.setAttribute('position', new THREE.BufferAttribute(rpos, 3));
    rgeo.setAttribute('color', new THREE.Float32BufferAttribute(rcol, 3));
    this.runnerCloud = new THREE.Points(rgeo, new THREE.PointsMaterial({
      map: streakTexture(), size: 2.6, transparent: true, opacity: 0.9,
      vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false,
      sizeAttenuation: true,
    }));
    this.runnerCloud.frustumCulled = false;
    scene.add(this.runnerCloud);

    this.cooldown = 0;
    this.rideSfxT = 0;
  }

  // nearest sample on any route within latch radius of a point
  _nearest(x, y, z, maxR) {
    let best = null, bd = maxR * maxR;
    for (let ri = 0; ri < this.routes.length; ri++) {
      const smp = this.routes[ri].samples;
      for (let i = 0; i < smp.length; i++) {
        const s = smp[i];
        const d2 = (s.x - x) ** 2 + (s.y - y) ** 2 + (s.z - z) ** 2;
        if (d2 < bd) { bd = d2; best = { ri, i }; }
      }
    }
    return best;
  }

  update(dt, t) {
    this.cooldown = Math.max(0, this.cooldown - dt);

    // runners flow outward, always
    const rpos = this.runnerCloud.geometry.attributes.position;
    for (let k = 0; k < this.runners.length; k++) {
      const run = this.runners[k];
      const smp = this.routes[run.route].samples;
      run.d += dt * 11;                          // sample steps ≈ 2m → ~22 m/s
      if (run.d >= smp.length - 1) run.d = 0;
      const s = smp[run.d | 0];
      rpos.setXYZ(k, s.x, s.y + Math.sin(t * 3 + k) * 0.15, s.z);
    }
    rpos.needsUpdate = true;

    // latch check
    const pl = G.player;
    if (!pl || pl.stream || this.cooldown > 0 || G.mode !== 'world' || pl.dead) return;
    const hit = this._nearest(pl.pos.x, pl.pos.y + 1.0, pl.pos.z, S.latchR);
    if (hit) this.latch(pl, hit.ri, hit.i);
  }

  latch(pl, ri, i) {
    const smp = this.routes[ri].samples;
    // ride the way you were heading; default outward from the hub
    let dir = 1;
    if (i > 2 && i < smp.length - 3) {
      const tx = smp[i + 1].x - smp[i - 1].x, tz = smp[i + 1].z - smp[i - 1].z;
      if (pl.vel.x * tx + pl.vel.z * tz < -0.5) dir = -1;
    }
    pl.stream = { ri, d: i, dir, speed: Math.max(9, pl.speedXZ) };
    pl.grounded = false;
    pl.gliding = false;
    if (pl.grappling) pl.releaseGrapple(false);
    sfx('grapple', { pitch: 1.4, gain: 0.8 });
    sfx('dash', { pitch: 1.2 });
    G.particles?.burst('dash', pl.pos.x, pl.pos.y + 1, pl.pos.z, 14, { color: this.routes[ri].key });
  }

  // called from the player's fixed step while riding
  ride(pl, dt) {
    const st = pl.stream;
    const route = this.routes[st.ri];
    const smp = route.samples;

    st.speed = damp(st.speed, S.speed, S.accel / S.speed * 3, dt);
    st.d += st.dir * (st.speed / 2) * dt;        // samples are ~2m apart

    // jump = out, keeping the speed — chain into wings/dash mid-air
    if (pl.jumpBuffer > 0) {
      pl.jumpBuffer = 0;
      this.detach(pl, true);
      return;
    }
    // end of the line: flung onward
    if (st.d <= 0 || st.d >= smp.length - 1) {
      this.detach(pl, false);
      return;
    }

    const i = Math.floor(st.d), f = st.d - i;
    const a = smp[i], b = smp[Math.min(i + 1, smp.length - 1)];
    const nx = a.x + (b.x - a.x) * f, ny = a.y + (b.y - a.y) * f, nz = a.z + (b.z - a.z) * f;
    pl.vel.set((nx - pl.pos.x) / dt, (ny - 1.0 - pl.pos.y) / dt, (nz - pl.pos.z) / dt);
    pl.pos.set(nx, ny - 1.0, nz);

    this.rideSfxT -= dt;
    if (this.rideSfxT <= 0) {
      this.rideSfxT = 0.28;
      sfx('glide', { gain: 1.5, pitch: 1.15 });
      G.particles?.burst('dash', pl.pos.x, pl.pos.y + 0.6, pl.pos.z, 2, { color: route.key });
    }
  }

  detach(pl, jumped) {
    const st = pl.stream;
    if (!st) return;
    const smp = this.routes[st.ri].samples;
    const i = Math.max(1, Math.min(smp.length - 2, Math.floor(st.d)));
    const tx = smp[i + 1].x - smp[i - 1].x, tz = smp[i + 1].z - smp[i - 1].z;
    const tl = Math.hypot(tx, tz) || 1;
    const keep = st.speed * S.detachKeep * st.dir;
    pl.vel.set((tx / tl) * keep, jumped ? S.detachUp : 3.5, (tz / tl) * keep);
    pl.stream = null;
    pl.jumpsUsed = 1;                            // wings still available mid-air
    this.cooldown = S.cooldown;
    sfx('doublejump', { pitch: 0.85, gain: 1.1 });
    G.particles?.burst('jump', pl.pos.x, pl.pos.y + 0.6, pl.pos.z, 10);
  }
}

let streakTex = null;
function streakTexture() {
  if (streakTex) return streakTex;
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(16, 16, 1, 16, 16, 15);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0.35)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  streakTex = new THREE.CanvasTexture(c);
  return streakTex;
}
