// Rover lights: a fixed pool of PointLights that exists from frame one and
// never grows or shrinks — Three.js bakes light count into every shader, so
// adding/removing lights mid-game would trigger a recompile freeze. Emitters
// (lanterns, muzzle flashes, motes, bosses) *borrow* a rover each frame;
// the nearest requests win and intensity fades with distance so the handoff
// never pops.

import * as THREE from 'three';
import { CFG } from '../config.js';
import { clamp01 } from '../core/math.js';

export class Rovers {
  constructor() {
    this.lights = [];
    for (let i = 0; i < CFG.fx.roverLights; i++) {
      const l = new THREE.PointLight(0xffffff, 0, 18, 1.8);
      l.castShadow = false;
      this.lights.push(l);
    }
    this.requests = [];
    this.pulses = [];        // transient flashes: {x,y,z,color,intensity,decay}
  }

  addTo(scene) { for (const l of this.lights) scene.add(l); }
  moveTo(scene) {
    this.pulses.length = 0;
    for (const l of this.lights) { l.removeFromParent(); scene.add(l); l.intensity = 0; }
  }

  // Persistent emitters call this every frame.
  request(x, y, z, color, intensity, range = 14) {
    this.requests.push({ x, y, z, color, intensity, range });
  }

  // One-shot flash (muzzle, impact, explosion). Decays on raw time.
  pulse(x, y, z, color, intensity = 3, decay = 9, range = 16) {
    this.pulses.push({ x, y, z, color, intensity, decay, range });
  }

  update(dt, px, py, pz) {
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      p.intensity -= p.intensity * p.decay * dt;
      if (p.intensity < 0.08) { this.pulses.splice(i, 1); continue; }
      this.requests.push(p);
    }
    // nearest-first, fade by distance so churn never pops
    for (const r of this.requests) {
      r.d2 = (r.x - px) ** 2 + (r.y - py) ** 2 + (r.z - pz) ** 2;
    }
    this.requests.sort((a, b) => a.d2 - b.d2);
    for (let i = 0; i < this.lights.length; i++) {
      const l = this.lights[i];
      const r = this.requests[i];
      if (!r) { l.intensity = 0; continue; }
      const fall = clamp01(1.15 - Math.sqrt(r.d2) / 46);
      l.position.set(r.x, r.y, r.z);
      l.color.setRGB(r.color[0], r.color[1], r.color[2]);
      // physical light units — request intensities are authored ~0.5-4,
      // scale up so a lantern actually pools light on the floor
      l.intensity = r.intensity * fall * 5;
      l.distance = r.range;
    }
    this.requests.length = 0;
  }
}
