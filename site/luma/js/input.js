/* ============================================================================
 * LUMA — input.js
 * Unifies mouse / touch / pen via Pointer Events into:
 *   • forces[]      live attractor/vortex forces for the flow field (uv space)
 *   • gesture events tap, drag-streak, hold-release, double-tap
 *   • gravity       optional device-tilt vector (mobile)
 *
 * All positions are reported in GL uv space: (0,0) bottom-left, (1,1) top-right,
 * so downstream shaders need no extra flipping.
 * ========================================================================== */
(function () {
  "use strict";
  const VZ = (window.VZ = window.VZ || {});
  const U = VZ.util;

  class InputEngine {
    constructor(el) {
      this.el = el;
      this.pointers = new Map();
      this.transient = [];          // short-lived forces (taps, releases)
      this.forces = [];             // rebuilt each frame, capped to 8
      this.gravity = { x: 0, y: 0 };
      this.motionEnabled = false;
      this.lastActivity = U.now();

      // gesture callbacks (assigned by app)
      this.onTap = null;
      this.onStroke = null;
      this.onHoldRelease = null;
      this.onDouble = null;
      this.onFirstGesture = null;
      this._firstDone = false;

      this._lastTap = { t: -1, x: 0, y: 0 };
      this._bind();
    }

    _bind() {
      const el = this.el;
      const opt = { passive: false };
      el.addEventListener("pointerdown", (e) => this._down(e), opt);
      el.addEventListener("pointermove", (e) => this._move(e), opt);
      el.addEventListener("pointerup", (e) => this._up(e), opt);
      el.addEventListener("pointercancel", (e) => this._up(e), opt);
      el.addEventListener("pointerleave", (e) => this._up(e), opt);
      el.addEventListener("contextmenu", (e) => e.preventDefault());
      // block iOS double-tap zoom / scroll on the canvas
      el.addEventListener("touchstart", (e) => { if (e.touches.length) e.preventDefault(); }, opt);
      el.addEventListener("touchmove", (e) => e.preventDefault(), opt);
      el.addEventListener("dblclick", (e) => e.preventDefault());
    }

    _xy(e) {
      const r = this.el.getBoundingClientRect();
      const x = (e.clientX - r.left) / Math.max(1, r.width);
      const y = 1 - (e.clientY - r.top) / Math.max(1, r.height); // flip to GL space
      return { x: U.clamp01(x), y: U.clamp01(y) };
    }

    _firstGesture() {
      if (this._firstDone) return;
      this._firstDone = true;
      if (this.onFirstGesture) this.onFirstGesture();
    }

    _down(e) {
      this._firstGesture();
      this.lastActivity = U.now();
      try { this.el.setPointerCapture(e.pointerId); } catch (err) {}
      const p = this._xy(e);
      this.pointers.set(e.pointerId, {
        x: p.x, y: p.y, px: p.x, py: p.y,
        vx: 0, vy: 0,
        down: U.now(), last: U.now(),
        moved: 0, pressure: e.pressure > 0 ? e.pressure : 0.5,
      });
    }

    _move(e) {
      const pt = this.pointers.get(e.pointerId);
      this.lastActivity = U.now();
      const p = this._xy(e);
      if (!pt) {
        // hover (desktop) — gentle force, no emitter
        this._hover = { x: p.x, y: p.y };
        return;
      }
      const t = U.now();
      const dt = Math.max(1, t - pt.last) / 1000;
      // coalesced events for smoother streaks on high-rate touch screens
      const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      let lastP = { x: pt.x, y: pt.y };
      for (const ce of evs) {
        const cp = this._xy(ce);
        const vx = (cp.x - lastP.x);
        const vy = (cp.y - lastP.y);
        const seg = Math.hypot(vx, vy);
        pt.moved += seg;
        if (seg > 0.0008 && this.onStroke) {
          this.onStroke({
            x: cp.x, y: cp.y,
            dx: (cp.x - lastP.x) * 0.5, dy: (cp.y - lastP.y) * 0.5,
            speed: seg / dt,
          });
        }
        lastP = cp;
      }
      pt.vx = (p.x - pt.x) / dt;
      pt.vy = (p.y - pt.y) / dt;
      pt.px = pt.x; pt.py = pt.y;
      pt.x = p.x; pt.y = p.y;
      pt.last = t;
      pt.pressure = e.pressure > 0 ? e.pressure : pt.pressure;
    }

    _up(e) {
      const pt = this.pointers.get(e.pointerId);
      if (!pt) return;
      this.pointers.delete(e.pointerId);
      try { this.el.releasePointerCapture(e.pointerId); } catch (err) {}
      const dur = (U.now() - pt.down) / 1000;
      const p = { x: pt.x, y: pt.y };
      this.lastActivity = U.now();

      if (pt.moved < 0.03 && dur < 0.28) {
        // tap
        this._pushTransient(p.x, p.y, 0, 0, 0.7);
        if (this.onTap) this.onTap({ x: p.x, y: p.y, strength: 1 });
        // double-tap detection
        const now = U.now();
        if (now - this._lastTap.t < 320 &&
            Math.hypot(p.x - this._lastTap.x, p.y - this._lastTap.y) < 0.08) {
          if (this.onDouble) this.onDouble({ x: p.x, y: p.y });
          this._lastTap.t = -1;
        } else {
          this._lastTap = { t: now, x: p.x, y: p.y };
        }
      } else if (pt.moved < 0.03 && dur > 0.4) {
        // hold + release -> charged burst
        const charge = U.clamp01(dur / 2.0);
        this._pushTransient(p.x, p.y, 0, 0, 1.0 + charge);
        if (this.onHoldRelease) this.onHoldRelease({ x: p.x, y: p.y, charge });
      } else {
        // flick release: throw a force in the direction of motion
        this._pushTransient(p.x, p.y, pt.vx, pt.vy, 0.8);
      }
    }

    _pushTransient(x, y, vx, vy, str) {
      this.transient.push({ x, y, vx, vy, str, life: 1, dur: 0.45 });
      if (this.transient.length > 24) this.transient.shift();
    }

    /* ----------------------------- motion ------------------------------- */
    async enableMotion() {
      const DOE = window.DeviceOrientationEvent;
      if (!DOE) return false;
      try {
        if (typeof DOE.requestPermission === "function") {
          const res = await DOE.requestPermission();
          if (res !== "granted") return false;
        }
        window.addEventListener("deviceorientation", (e) => this._orient(e));
        this.motionEnabled = true;
        return true;
      } catch (err) {
        return false;
      }
    }
    _orient(e) {
      // gamma: left-right [-90,90], beta: front-back [-180,180]
      const g = (e.gamma || 0) / 90;
      const b = ((e.beta || 0) - 45) / 90; // bias so "neutral" hold ~ flat
      const k = 0.08;
      this.gravity.x = U.clamp(g, -1, 1) * k;
      this.gravity.y = U.clamp(-b, -1, 1) * k;
    }

    /* ----------------------------- update ------------------------------- */
    update(dt) {
      const forces = [];
      // active pointers (decay their velocity so still-but-pressed = vortex)
      for (const pt of this.pointers.values()) {
        pt.vx *= Math.pow(0.5, dt / 0.09);
        pt.vy *= Math.pow(0.5, dt / 0.09);
        const speed = Math.hypot(pt.vx, pt.vy);
        forces.push({
          x: pt.x, y: pt.y,
          vx: pt.vx, vy: pt.vy,
          str: U.clamp(0.35 + speed * 1.4, 0, 2.2) * (0.6 + pt.pressure),
        });
      }
      // desktop hover -> faint force
      if (this._hover && this.pointers.size === 0) {
        forces.push({ x: this._hover.x, y: this._hover.y, vx: 0, vy: 0, str: 0.18 });
      }
      // transient forces
      for (let i = this.transient.length - 1; i >= 0; i--) {
        const tr = this.transient[i];
        tr.life -= dt / tr.dur;
        if (tr.life <= 0) { this.transient.splice(i, 1); continue; }
        const s = tr.str * tr.life * tr.life;
        forces.push({ x: tr.x, y: tr.y, vx: tr.vx, vy: tr.vy, str: s });
      }
      // keep the 8 strongest
      forces.sort((a, b) => b.str - a.str);
      this.forces = forces.slice(0, 8);
    }

    get idleSeconds() { return (U.now() - this.lastActivity) / 1000; }
    get pointerCount() { return this.pointers.size; }
  }

  VZ.InputEngine = InputEngine;
})();
