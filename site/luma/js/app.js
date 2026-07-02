/* ============================================================================
 * LUMA — app.js
 * Boots the engines and runs the frame loop. The visuals start immediately and
 * run/evolve on their own — no audio and almost no UI. The only controls are
 * two auto-hiding icons (mic / open a track), since feeding it sound is the one
 * thing it can't do by itself. Touch paints; everything else is automatic.
 * ========================================================================== */
(function () {
  "use strict";
  const VZ = (window.VZ = window.VZ || {});
  const U = VZ.util;

  class App {
    constructor() {
      this.canvas = document.getElementById("gl");
      this.ui = {};
      this.running = false;
      this.lastT = U.now();
      this._fluxCool = 0;
      this._idleEmitCool = 0;
      this._uiHideAt = 0;
      this.debug = location.hash.indexOf("debug") >= 0;
    }

    init() {
      this._grabUI();
      try {
        this.audio = new VZ.AudioEngine();
        this.input = new VZ.InputEngine(this.canvas);
        this.director = new VZ.Director((Math.random() * 1e9) | 0);
        this.renderer = new VZ.Renderer(this.canvas, { onError: (e) => this._fatal(e) });
      } catch (e) {
        this._fatal(e);
        return;
      }
      // dampen reactivity further for users who ask for reduced motion
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.renderer.calm = reduce ? 0.4 : 1;

      this._wireInput();
      this._wireUI();
      this._wireWindow();
      this.audio.onStateChange(() => this._syncControls());

      // start rendering immediately — no gesture, no splash, no sound needed
      this.running = true;
      this.lastT = U.now();
      requestAnimationFrame((t) => this._loop(t));
      this._revealUI();
      this._showHint();
    }

    _grabUI() {
      const id = (x) => document.getElementById(x);
      this.ui = {
        wrap: id("ui"),
        controls: id("controls"),
        mic: id("mic"),
        music: id("music"),
        play: id("play"),
        file: id("file"),
        hint: id("hint"),
        toast: id("toast"),
        stats: id("stats"),
        error: id("error"),
      };
    }

    /* --------------------------- input wiring --------------------------- */
    _wireInput() {
      const inp = this.input, R = this.renderer, D = this.director;
      inp.onStroke = (s) => {
        const now = U.now();
        if (now - (this._lastStreak || 0) < 24) return;
        this._lastStreak = now;
        R.emit("streak", s.x, s.y, D, {
          vx: s.dx, vy: s.dy, speed: U.clamp(s.speed, 0, 4),
          strength: U.clamp(0.4 + s.speed * 0.45, 0.4, 1.0),
          colorT: Math.random() * 0.2 + (s.x + s.y) * 0.3,
          bright: 1.0 + U.clamp(s.speed * 0.2, 0, 0.5),
        });
        this._dismissHint();
      };
      inp.onTap = (t) => {
        R.emit("spark", t.x, t.y, D, { strength: 1.1, bright: 1.4 });
        R.emit("ripple", t.x, t.y, D, { strength: 0.8, size: 0.34, bright: 1.0 });
        this._dismissHint();
      };
      inp.onHoldRelease = (h) => {
        R.emit("ripple", h.x, h.y, D, { strength: 1.0 + h.charge, size: 0.5 + h.charge * 0.4, bright: 1.4 });
        const kind = Math.random() < 0.5 ? "poly" : "star";
        R.emit(kind, h.x, h.y, D, { strength: 1.0 + h.charge, bright: 1.5 });
        for (let i = 0; i < 4; i++) {
          R.emit("spark", h.x + (Math.random() - 0.5) * 0.1, h.y + (Math.random() - 0.5) * 0.1, D,
            { strength: 0.8, bright: 1.2 });
        }
      };
    }

    /* ------------------------- beat / ambient --------------------------- */
    _reactBeat(dt) {
      const A = this.audio, R = this.renderer, D = this.director;
      // Throttle beat accents so we never flash more than a few times a second,
      // and keep them soft + localized rather than full-frame flashes.
      this._beatCool = (this._beatCool || 0) - dt;
      if (A.beatHit && this._beatCool <= 0) {
        const s = A.beatStrength;
        this._beatCool = 0.26;
        R.emit("ripple", 0.5, 0.5, D, {
          strength: 0.26 + 0.3 * s, size: 0.26 + 0.16 * s, colorT: Math.random(), bright: 0.65 + 0.4 * s,
        });
        if (s > 0.55 && Math.random() < 0.5) {
          const kind = Math.random() < 0.5 ? "poly" : "star";
          R.emit(kind, 0.26 + Math.random() * 0.48, 0.26 + Math.random() * 0.48, D,
            { strength: 0.5 + 0.4 * s, bright: 0.9 });
        }
        const n = 1 + ((s * 2) | 0);
        for (let i = 0; i < n; i++) {
          const a = Math.random() * U.TAU, r = 0.1 + Math.random() * 0.25;
          R.emit("spark", 0.5 + Math.cos(a) * r * 0.6, 0.5 + Math.sin(a) * r, D,
            { strength: 0.5, bright: 0.9, size: 0.025 + Math.random() * 0.03 });
        }
      }
      // treble shimmer — gentle, rate-limited
      this._fluxCool -= dt;
      if (A.flux > 0.5 && this._fluxCool <= 0) {
        this._fluxCool = 0.2;
        R.emit("spark", Math.random(), Math.random(), D,
          { strength: 0.4, size: 0.018 + Math.random() * 0.02, bright: 0.9, colorT: Math.random() });
      }
      // gentle drifting life when there is no sound + no touch
      this._idleEmitCool -= dt;
      if (this.input.idleSeconds > 3 && !A.hasSignal && this._idleEmitCool <= 0) {
        this._idleEmitCool = 1.6 + Math.random() * 1.4;
        R.emit("spark", Math.random(), Math.random(), D, { strength: 0.4, bright: 0.9, size: 0.05 });
      }
    }

    /* ----------------------------- loop --------------------------------- */
    _loop(t) {
      if (!this.running) return;
      const dt = Math.min(0.05, Math.max(0.0001, (t - this.lastT) / 1000));
      this.lastT = t;
      try {
        this.audio.update(dt);
        this.input.update(dt);
        this.director.update(dt, this.audio);
        this._reactBeat(dt);
        this.renderer.render(dt, this.audio, this.input, this.director);
      } catch (e) {
        this._fatal(e);
        return;
      }
      this._tickUI(dt);
      requestAnimationFrame((tt) => this._loop(tt));
    }

    /* ----------------------------- audio -------------------------------- */
    async _toggleMic() {
      this._dismissHint();
      try {
        if (this.audio.sourceType === "mic") await this.audio.setSource("none");
        else await this.audio.setSource("mic");
      } catch (e) {
        this._showToast("Microphone unavailable");
      }
      this._syncControls();
      this._revealUI();
    }
    async _openFile(file) {
      this._dismissHint();
      try {
        await this.audio.setSource("file", file);
      } catch (e) {
        this._showToast("Couldn't play that file");
      }
      this._syncControls();
      this._revealUI();
    }

    _syncControls() {
      const u = this.ui, a = this.audio;
      u.mic.classList.toggle("on", a.sourceType === "mic");
      const fileLoaded = a.sourceType === "file";
      u.play.hidden = !fileLoaded;
      if (fileLoaded) {
        u.play.classList.toggle("playing", a.isPlaying);
        u.play.innerHTML = a.isPlaying ? ICON.pause : ICON.play;
      }
      u.music.classList.toggle("on", fileLoaded);
    }

    /* ------------------------------- UI --------------------------------- */
    _wireUI() {
      const u = this.ui;
      u.mic.addEventListener("click", () => this._toggleMic());
      u.music.addEventListener("click", () => { u.file.click(); this._revealUI(); });
      u.file.addEventListener("change", (e) => {
        const f = e.target.files && e.target.files[0];
        if (f) this._openFile(f);
        e.target.value = "";
      });
      u.play.addEventListener("click", () => { this.audio.toggle(); this._syncControls(); this._revealUI(); });

      window.addEventListener("keydown", (e) => {
        if (e.target && /input|textarea/i.test(e.target.tagName)) return;
        switch (e.key.toLowerCase()) {
          case " ": e.preventDefault(); this.audio.toggle(); this._syncControls(); break;
          case "m": this._toggleMic(); break;
          case "f": this._toggleFullscreen(); break;
          case "h": u.wrap.classList.toggle("hide-ui"); break;
        }
        this._revealUI();
      });

      window.addEventListener("mousemove", () => this._revealUI());
      this.canvas.addEventListener("pointerdown", (e) => {
        const r = this.canvas.getBoundingClientRect();
        if ((e.clientY - r.top) / r.height > 0.78) this._revealUI();
      });
      u.controls.addEventListener("pointerenter", () => this._revealUI(true));
    }

    _showToast(text) {
      const t = this.ui.toast;
      t.textContent = text;
      t.classList.add("show");
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
    }
    _showHint() {
      this.ui.hint.classList.add("show");
      this._hintTimer = setTimeout(() => this._dismissHint(), 6000);
    }
    _dismissHint() {
      if (this.ui.hint) this.ui.hint.classList.remove("show");
      clearTimeout(this._hintTimer);
    }

    _revealUI(sticky) {
      this.ui.wrap.classList.remove("idle");
      this._uiHideAt = U.now() + (sticky ? 9999 : 3500);
    }
    _tickUI() {
      if (U.now() > this._uiHideAt) this.ui.wrap.classList.add("idle");
      if (this.debug && this.ui.stats) {
        const fps = (1 / Math.max(0.0001, this.renderer._dtAvg)).toFixed(0);
        this.ui.stats.textContent =
          `${fps}fps ${this.renderer.dispW}x${this.renderer.dispH} ${this.director.modeName} ` +
          `b${this.audio.levels.bass.toFixed(2)} m${this.audio.levels.mid.toFixed(2)} t${this.audio.levels.treble.toFixed(2)}`;
      }
    }

    _toggleFullscreen() {
      const d = document;
      if (!d.fullscreenElement && !d.webkitFullscreenElement) {
        const el = d.documentElement;
        (el.requestFullscreen || el.webkitRequestFullscreen || (() => {})).call(el);
      } else {
        (d.exitFullscreen || d.webkitExitFullscreen || (() => {})).call(d);
      }
    }

    /* --------------------------- window --------------------------------- */
    _wireWindow() {
      const onResize = () => this.renderer.resize();
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", () => setTimeout(onResize, 200));
      if (window.visualViewport) window.visualViewport.addEventListener("resize", onResize);

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          this.running = false;
        } else if (!this.running) {
          this.running = true;
          this.lastT = U.now();
          requestAnimationFrame((t) => this._loop(t));
        }
      });

      this.canvas.addEventListener("webglcontextlost", (e) => {
        e.preventDefault();
        this.running = false;
        this._fatal(new Error("The WebGL context was lost. Reload the page to restart the visualizer."));
      });
      this.canvas.addEventListener("webglcontextrestored", () => location.reload());
      window.addEventListener("error", (e) => { if (e.error && !this.running) this._fatal(e.error); });
    }

    _fatal(err) {
      this.running = false;
      const msg = (err && err.message) ? err.message : String(err);
      if (/WebGL2 is not available/i.test(msg)) console.warn(msg);
      else console.error(err);
      const el = this.ui.error;
      if (!el) return;
      el.style.display = "flex";
      const m = el.querySelector(".error-msg");
      if (m) m.textContent = msg;
    }
  }

  const ICON = {
    play: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>',
  };

  function boot() {
    const app = new App();
    VZ.app = app;
    app.init();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
