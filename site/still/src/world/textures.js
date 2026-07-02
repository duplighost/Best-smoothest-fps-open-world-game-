// Procedural grime. Canvas-painted, cached, tiled. Everything in this house
// was cared for once — the patterns are pretty under the rot.

import * as THREE from 'three';
import { makeRng } from '../core/rng.js';

const cache = new Map();

function tex(key, size, paint) {
  if (cache.has(key)) return cache.get(key);
  const c = document.createElement('canvas');
  c.width = c.height = size;
  paint(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  cache.set(key, t);
  return t;
}

export const wallpaper = () => tex('wallpaper', 256, (g, s) => {
  g.fillStyle = '#4a4038';
  g.fillRect(0, 0, s, s);
  const rng = makeRng(21);
  // faded damask stripes + diamond motif
  for (let x = 0; x < s; x += 32) {
    g.fillStyle = 'rgba(70,58,48,0.6)';
    g.fillRect(x, 0, 14, s);
  }
  g.strokeStyle = 'rgba(96,80,62,0.35)';
  for (let y = 16; y < s; y += 32) {
    for (let x = 7; x < s; x += 32) {
      g.beginPath();
      g.moveTo(x, y - 8); g.lineTo(x + 6, y); g.lineTo(x, y + 8); g.lineTo(x - 6, y);
      g.closePath(); g.stroke();
    }
  }
  // water stains bleeding down
  for (let i = 0; i < 7; i++) {
    const x = rng() * s, w = 12 + rng() * 40, h = 60 + rng() * 160;
    const grad = g.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(28,22,16,0.55)');
    grad.addColorStop(1, 'rgba(28,22,16,0)');
    g.fillStyle = grad;
    g.save(); g.translate(x, rng() * s * 0.4); g.fillRect(-w / 2, 0, w, h); g.restore();
  }
});

export const floorboards = () => tex('floorboards', 256, (g, s) => {
  g.fillStyle = '#3a2c20';
  g.fillRect(0, 0, s, s);
  const rng = makeRng(33);
  for (let y = 0; y < s; y += 21) {
    g.fillStyle = `rgba(${20 + rng() * 26},${16 + rng() * 18},${10 + rng() * 12},0.85)`;
    g.fillRect(0, y, s, 19);
    // grain
    for (let i = 0; i < 40; i++) {
      g.fillStyle = `rgba(12,9,6,${0.2 + rng() * 0.3})`;
      g.fillRect(rng() * s, y + rng() * 18, 10 + rng() * 60, 1);
    }
    // board seams
    g.fillStyle = 'rgba(6,4,3,0.9)';
    g.fillRect(0, y + 19, s, 2);
    g.fillRect(rng() * s, y, 2, 19);
  }
});

export const moldStone = () => tex('moldstone', 256, (g, s) => {
  g.fillStyle = '#33342e';
  g.fillRect(0, 0, s, s);
  const rng = makeRng(55);
  for (let i = 0; i < 700; i++) {
    const v = 38 + rng() * 30;
    g.fillStyle = `rgba(${v},${v + 4},${v - 4},${0.25 + rng() * 0.3})`;
    g.fillRect(rng() * s, rng() * s, 2 + rng() * 7, 2 + rng() * 5);
  }
  // mortar lines
  g.strokeStyle = 'rgba(14,15,12,0.8)';
  g.lineWidth = 2;
  for (let y = 0; y < s; y += 26) { g.beginPath(); g.moveTo(0, y); g.lineTo(s, y); g.stroke(); }
  for (let y = 0; y < s; y += 26) {
    for (let x = (y / 26) % 2 ? 0 : 24; x < s; x += 48) {
      g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 26); g.stroke();
    }
  }
  // creeping black mold from corners
  for (let i = 0; i < 240; i++) {
    const a = rng() * Math.PI * 2, r = Math.pow(rng(), 0.4) * s * 0.4;
    const cx = rng() < 0.5 ? 0 : s, cy = rng() < 0.5 ? 0 : s;
    g.fillStyle = `rgba(8,12,8,${0.25 + rng() * 0.4})`;
    g.beginPath();
    g.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1 + rng() * 5, 0, 7);
    g.fill();
  }
});

export const concrete = () => tex('concrete', 256, (g, s) => {
  g.fillStyle = '#3c3b38';
  g.fillRect(0, 0, s, s);
  const rng = makeRng(77);
  for (let i = 0; i < 900; i++) {
    const v = 48 + rng() * 26;
    g.fillStyle = `rgba(${v},${v},${v - 3},${0.15 + rng() * 0.25})`;
    g.fillRect(rng() * s, rng() * s, 1 + rng() * 4, 1 + rng() * 3);
  }
  // cracks
  g.strokeStyle = 'rgba(16,15,13,0.7)';
  for (let i = 0; i < 5; i++) {
    let x = rng() * s, y = 0;
    g.beginPath(); g.moveTo(x, y);
    while (y < s) { x += (rng() - 0.5) * 26; y += 12 + rng() * 22; g.lineTo(x, y); }
    g.stroke();
  }
});

export const nurseryPaper = () => tex('nursery', 256, (g, s) => {
  g.fillStyle = '#4c4440';
  g.fillRect(0, 0, s, s);
  const rng = makeRng(91);
  // it was yellow once, with little moons and stars
  g.fillStyle = 'rgba(88,78,54,0.5)';
  g.fillRect(0, 0, s, s);
  for (let y = 20; y < s; y += 48) {
    for (let x = 20; x < s; x += 48) {
      const moon = ((x + y) / 48) % 2 === 0;
      g.strokeStyle = 'rgba(120,105,72,0.55)';
      g.lineWidth = 1.5;
      if (moon) {
        g.beginPath(); g.arc(x, y, 7, 0.6, Math.PI * 2 - 0.6); g.stroke();
      } else {
        g.beginPath();
        for (let k = 0; k < 5; k++) {
          const a = (k / 5) * Math.PI * 2 - Math.PI / 2;
          const px = x + Math.cos(a) * 7, py = y + Math.sin(a) * 7;
          k ? g.lineTo(px, py) : g.moveTo(px, py);
        }
        g.closePath(); g.stroke();
      }
    }
  }
  // one long scratch through everything, wall to wall
  g.strokeStyle = 'rgba(20,14,10,0.8)';
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(0, s * 0.55 + rng() * 10);
  for (let x = 0; x < s; x += 16) g.lineTo(x, s * 0.55 + Math.sin(x * 0.2) * 5 + rng() * 6);
  g.stroke();
});

// Words scratched into a surface. The game's only text lives here.
export function scratchTex(text, sub = '') {
  return tex('scratch-' + text, 256, (g, s) => {
    g.clearRect(0, 0, s, s);
    g.fillStyle = 'rgba(0,0,0,0)';
    g.font = '400 34px Georgia';
    g.textAlign = 'center';
    const rng = makeRng(text.length * 7);
    // scratched: draw each letter multiple times, jittered, pale
    for (let pass = 0; pass < 3; pass++) {
      g.fillStyle = `rgba(${168 + pass * 14},${150 + pass * 10},${128},${0.32})`;
      for (let i = 0; i < text.length; i++) {
        const w = s / (text.length + 1);
        g.save();
        g.translate(w * (i + 1), s * 0.44 + (rng() - 0.5) * 8);
        g.rotate((rng() - 0.5) * 0.14);
        g.fillText(text[i], 0, 0);
        g.restore();
      }
    }
    if (sub) {
      g.font = '400 17px Georgia';
      g.fillStyle = 'rgba(150,134,114,0.5)';
      g.fillText(sub, s / 2, s * 0.66);
    }
  });
}

// A child's crayon drawing. Tells you the rule before the rule tells you.
export function drawingTex(kind) {
  return tex('drawing-' + kind, 128, (g, s) => {
    g.fillStyle = '#c8bfa8';
    g.fillRect(0, 0, s, s);
    g.strokeStyle = '#7a3428';
    g.lineWidth = 3;
    g.lineCap = 'round';
    const stick = (x, y, sc = 1) => {
      g.beginPath(); g.arc(x, y - 18 * sc, 6 * sc, 0, 7); g.stroke();
      g.beginPath(); g.moveTo(x, y - 12 * sc); g.lineTo(x, y + 8 * sc); g.stroke();
      g.beginPath(); g.moveTo(x - 8 * sc, y - 4 * sc); g.lineTo(x + 8 * sc, y - 4 * sc); g.stroke();
      g.beginPath(); g.moveTo(x, y + 8 * sc); g.lineTo(x - 6 * sc, y + 20 * sc); g.moveTo(x, y + 8 * sc); g.lineTo(x + 6 * sc, y + 20 * sc); g.stroke();
    };
    if (kind === 'tall') {
      stick(s * 0.3, s * 0.62, 0.9);
      // the tall one, drawn much too big, no face
      g.strokeStyle = '#1c1c22';
      g.lineWidth = 4;
      g.beginPath(); g.arc(s * 0.68, s * 0.2, 9, 0, 7); g.stroke();
      g.beginPath(); g.moveTo(s * 0.68, s * 0.28); g.lineTo(s * 0.68, s * 0.78); g.stroke();
      g.beginPath(); g.moveTo(s * 0.52, s * 0.42); g.lineTo(s * 0.84, s * 0.42); g.stroke();
    } else if (kind === 'still') {
      stick(s * 0.5, s * 0.6);
      g.strokeStyle = '#1c1c22';
      g.lineWidth = 2.5;
      // eyes closed: two flat dashes above, the tall one right beside
      g.beginPath(); g.moveTo(s * 0.8, s * 0.1); g.lineTo(s * 0.8, s * 0.85); g.stroke();
      g.font = '15px Georgia';
      g.fillStyle = '#4a3a30';
      g.fillText('dont move', s * 0.28, s * 0.9);
    } else if (kind === 'water') {
      g.strokeStyle = '#28405c';
      for (let y = s * 0.55; y < s * 0.9; y += 8) {
        g.beginPath();
        for (let x = 6; x < s - 6; x += 10) {
          g.quadraticCurveTo(x + 5, y - 4, x + 10, y);
        }
        g.stroke();
      }
      stick(s * 0.4, s * 0.42, 0.8);
      g.font = '14px Georgia';
      g.fillStyle = '#4a3a30';
      g.fillText('keep walking', s * 0.3, s * 0.24);
    }
  });
}
