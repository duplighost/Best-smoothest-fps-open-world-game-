/* ============================================================================
 * LUMA — renderer.js
 * The render orchestrator. Owns the GL pipeline and combines director params
 * with live audio + input each frame:
 *
 *   freqTex  upload spectrum  ->  ADVECT (fluid)  ->  INJECT (sources)
 *   -> DISPLAY (kaleido)  ->  PARTICLES (additive)  ->  BLOOM  ->  COMPOSITE
 *
 * Also manages the emitter pool (taps, streaks, beat shapes) with palette
 * colours, handles resize / DPR / adaptive quality, and exposes emit().
 * ========================================================================== */
(function () {
  "use strict";
  const VZ = (window.VZ = window.VZ || {});
  const U = VZ.util;
  const MAX_EM = 16;

  class Renderer {
    constructor(canvas, opts = {}) {
      this.canvas = canvas;
      this.onError = opts.onError || ((e) => console.error(e));
      this.glx = new VZ.GLX(canvas, this.onError);
      this.gl = this.glx.gl;
      this.time = 0;
      this.kaRot = 0;
      this.viewRot = 0;
      this.hueAcc = 0;
      this._dtAvg = 1 / 60;
      this._adaptCool = 3;

      // quality presets
      const mobile = U.isMobile;
      this.quality = {
        renderScale: mobile ? 0.72 : 0.92,
        simScale: mobile ? 0.66 : 0.8,
        maxDim: mobile ? 1024 : 1700,
        particleCount: mobile ? 3000 : 6000,
        dprCap: mobile ? 2.0 : 2.0,
        minRender: 0.45,
      };

      this.emitters = [];
      this._initBuffers();
      this._initPrograms();
      this._initParticles();
      this._initEmitterArrays();
      this.resize();
      this._clearDye();
    }

    /* ----------------------------- setup -------------------------------- */
    _initPrograms() {
      const g = this.glx, S = VZ.SH;
      try {
        this.prog = {
          advect: g.program(S.FULLSCREEN_VS, S.ADVECT_FS, "advect"),
          inject: g.program(S.FULLSCREEN_VS, S.INJECT_FS, "inject"),
          display: g.program(S.FULLSCREEN_VS, S.DISPLAY_FS, "display"),
          bright: g.program(S.FULLSCREEN_VS, S.BRIGHT_FS, "bright"),
          blur: g.program(S.FULLSCREEN_VS, S.BLUR_FS, "blur"),
          composite: g.program(S.FULLSCREEN_VS, S.COMPOSITE_FS, "composite"),
          pUpdate: g.program(S.PARTICLE_UPDATE_VS, S.PARTICLE_UPDATE_FS, "pUpdate",
            ["vPos", "vVel", "vMisc"]),
          pRender: g.program(S.PARTICLE_RENDER_VS, S.PARTICLE_RENDER_FS, "pRender"),
        };
      } catch (e) {
        this.onError(e);
        throw e;
      }
    }

    _initBuffers() {
      // sized for real in resize(); start at 2x2 placeholders
      this.dye = this.glx.createPingPong(2, 2);
      this.scene = this.glx.createFBO(2, 2);
      this.bloomA = this.glx.createFBO(2, 2);
      this.bloomB = this.glx.createFBO(2, 2);
      this.bloomC = this.glx.createFBO(2, 2);
      this.bloomD = this.glx.createFBO(2, 2);
      // spectrum texture (256x1, R8) for the radial EQ
      const gl = this.gl;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 256, 1, 0, gl.RED, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null);
      this.freqTex = { tex, w: 256, h: 1 };
    }

    _initParticles() {
      try {
        this.particles = new VZ.Particles(this.glx, this.quality.particleCount);
        this.particles.init(this.prog.pUpdate, this.prog.pRender);
      } catch (e) {
        console.warn("particles disabled:", e);
        this.particles = null;
      }
    }

    _initEmitterArrays() {
      this.emPos = new Float32Array(MAX_EM * 2);
      this.emVel = new Float32Array(MAX_EM * 2);
      this.emData = new Float32Array(MAX_EM * 4);
      this.emParam = new Float32Array(MAX_EM);
      this.emColor = new Float32Array(MAX_EM * 3);
      this.forcePos = new Float32Array(8 * 2);
      this.forceVec = new Float32Array(8 * 2);
      this.forceStr = new Float32Array(8);
    }

    /* ----------------------------- resize ------------------------------- */
    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, this.quality.dprCap);
      const cssW = Math.max(1, window.innerWidth);
      const cssH = Math.max(1, window.innerHeight);
      let w = Math.floor(cssW * dpr * this.quality.renderScale);
      let h = Math.floor(cssH * dpr * this.quality.renderScale);
      // cap longest side
      const md = this.quality.maxDim;
      const longest = Math.max(w, h);
      if (longest > md) {
        const s = md / longest;
        w = Math.floor(w * s);
        h = Math.floor(h * s);
      }
      w = Math.max(8, w); h = Math.max(8, h);
      if (this.canvas.width === w && this.canvas.height === h && this._sized) return;
      this.canvas.width = w;
      this.canvas.height = h;
      this.dispW = w; this.dispH = h;
      this.aspect = w / h;

      const sw = Math.max(8, Math.floor(w * this.quality.simScale));
      const sh = Math.max(8, Math.floor(h * this.quality.simScale));
      this.glx.resizeFBO(this.dye.read, sw, sh);
      this.glx.resizeFBO(this.dye.write, sw, sh);
      this.glx.resizeFBO(this.scene, w, h);
      this.glx.resizeFBO(this.bloomA, w >> 1, h >> 1);
      this.glx.resizeFBO(this.bloomB, w >> 1, h >> 1);
      this.glx.resizeFBO(this.bloomC, Math.max(2, w >> 2), Math.max(2, h >> 2));
      this.glx.resizeFBO(this.bloomD, Math.max(2, w >> 2), Math.max(2, h >> 2));
      this.simW = sw; this.simH = sh;
      this._sized = true;
    }

    _clearDye() {
      this.glx.bindFBO(this.dye.read);
      this.glx.clear(0, 0, 0, 1);
      this.glx.bindFBO(this.dye.write);
      this.glx.clear(0, 0, 0, 1);
    }

    /* --------------------------- emitters ------------------------------- */
    // Pick an HDR colour from the current palette at parameter t.
    palColor(dir, t) {
      const p = dir.palette;
      const s = dir.palShift;
      return U.palette((t + s), p.a, p.b, p.c, p.d);
    }

    emit(kind, x, y, dir, o = {}) {
      if (this.emitters.length >= MAX_EM) {
        // drop the weakest/oldest
        let wi = 0, wv = Infinity;
        for (let i = 0; i < this.emitters.length; i++) {
          const e = this.emitters[i];
          const v = e.age * e.strength;
          if (v < wv) { wv = v; wi = i; }
        }
        this.emitters.splice(wi, 1);
      }
      const rnd = Math.random();
      let type = 0, size = 0.06, decay = 1.6, param = 5, strength = 1, vx = 0, vy = 0;
      let colorT = o.colorT != null ? o.colorT : rnd;
      if (kind === "spark") {
        type = 0; size = o.size || 0.05 + rnd * 0.04; decay = 1.8; strength = o.strength || 1;
      } else if (kind === "ripple") {
        type = 1; size = o.size || 0.4 + rnd * 0.35; decay = 0.85; strength = o.strength || 1;
      } else if (kind === "streak") {
        type = 2; size = o.size || 0.02 + (o.speed || 0) * 0.01; decay = 3.0;
        strength = U.clamp(o.strength || 1, 0.2, 1.6); vx = o.vx || 0; vy = o.vy || 0;
        size = U.clamp(size, 0.015, 0.06);
      } else if (kind === "poly") {
        type = 3; size = o.size || 0.05; decay = 0.9; param = 3 + Math.floor(rnd * 6);
        strength = o.strength || 1;
      } else if (kind === "star") {
        type = 4; size = o.size || 0.05; decay = 0.9; param = 5 + Math.floor(rnd * 4);
        strength = o.strength || 1;
      }
      const col = this.palColor(dir, colorT);
      const bright = (o.bright || 1);
      this.emitters.push({
        type, x, y, vx, vy, size, param, decay, strength,
        age: 1, color: [col[0] * bright, col[1] * bright, col[2] * bright],
      });
    }

    _updateEmitters(dt) {
      let n = 0;
      for (let i = this.emitters.length - 1; i >= 0; i--) {
        const e = this.emitters[i];
        e.age -= e.decay * dt;
        if (e.age <= 0) { this.emitters.splice(i, 1); }
      }
      n = Math.min(this.emitters.length, MAX_EM);
      for (let i = 0; i < n; i++) {
        const e = this.emitters[i];
        this.emPos[i * 2] = e.x; this.emPos[i * 2 + 1] = e.y;
        this.emVel[i * 2] = e.vx; this.emVel[i * 2 + 1] = e.vy;
        this.emData[i * 4] = e.type; this.emData[i * 4 + 1] = e.size;
        this.emData[i * 4 + 2] = U.clamp01(e.age); this.emData[i * 4 + 3] = e.strength;
        this.emParam[i] = e.param;
        this.emColor[i * 3] = e.color[0];
        this.emColor[i * 3 + 1] = e.color[1];
        this.emColor[i * 3 + 2] = e.color[2];
      }
      this._emCount = n;
    }

    _packForces(input) {
      const f = input.forces;
      const a = this.aspect;
      const n = Math.min(f.length, 8);
      for (let i = 0; i < n; i++) {
        const o = f[i];
        this.forcePos[i * 2] = (o.x - 0.5) * a;
        this.forcePos[i * 2 + 1] = o.y - 0.5;
        this.forceVec[i * 2] = U.clamp(o.vx, -3, 3) * 0.3 * a;
        this.forceVec[i * 2 + 1] = U.clamp(o.vy, -3, 3) * 0.3;
        this.forceStr[i] = o.str;
      }
      this._forceCount = n;
    }

    // Shared flow-field uniforms for both the advect and particle-update progs.
    // Uses smoothed audio so motion eases with the music instead of jolting.
    _setFlow(prog, d, A, input) {
      const ax = this._ax;
      prog.f("uTime", this.time);
      prog.f("uFlowScale", d.flowScale);
      prog.f("uFlowSpeed", d.flowSpeed * (0.7 + 0.5 * ax.energy));
      prog.f("uFlowWarp", d.flowWarp * (1 + 0.35 * ax.mid * d.midTurb));
      prog.f("uFlowSwirl", d.flowSwirl + ax.mid * 0.28 * d.midTurb);
      prog.f("uBass", ax.bass * d.bassPump);
      prog.f("uMid", ax.mid);
      prog.f("uAspect", this.aspect);
      prog.v2("uCenter", 0.5, 0.5);
      prog.v2("uGravity", input.gravity.x, input.gravity.y);
      prog.i("uForceCount", this._forceCount);
      const gl = this.gl;
      gl.uniform2fv(prog.loc("uForcePos"), this.forcePos);
      gl.uniform2fv(prog.loc("uForceVec"), this.forceVec);
      gl.uniform1fv(prog.loc("uForceStr"), this.forceStr);
      prog.f("uForceRad", 0.2);
    }

    /* ------------------------------ frame ------------------------------- */
    render(dt, audio, input, dir) {
      dt = Math.min(dt, 1 / 20); // clamp big stalls
      this.time += dt;
      const gl = this.gl;
      const A = audio;
      const d = dir.out;

      // Smoothed, low-jitter audio signals for *global* modulation. Sharp
      // per-beat response is kept only for small, localized, throttled accents
      // so the whole frame never strobes (photosensitivity safety).
      const ax = this._ax || (this._ax = { bass: 0, mid: 0, treble: 0, energy: 0, beat: 0, flux: 0 });
      const sm = (cur, tgt, half) => cur + (tgt - cur) * (1 - Math.pow(2, -dt / Math.max(0.0001, half)));
      ax.bass = sm(ax.bass, A.levels.bass, 0.14);
      ax.mid = sm(ax.mid, A.levels.mid, 0.16);
      ax.treble = sm(ax.treble, A.levels.treble, 0.14);
      ax.energy = sm(ax.energy, A.levels.energy, 0.28);
      ax.beat = sm(ax.beat, A.beat, 0.22);
      ax.flux = sm(ax.flux, A.flux, 0.16);
      const calm = this.calm || 1;
      if (calm !== 1) {
        ax.bass *= calm; ax.mid *= calm; ax.treble *= calm;
        ax.energy *= calm; ax.beat *= calm; ax.flux *= calm;
      }

      this._packForces(input);
      this._updateEmitters(dt);

      // upload spectrum
      gl.bindTexture(gl.TEXTURE_2D, this.freqTex.tex);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 256, 1, gl.RED, gl.UNSIGNED_BYTE, audio.specData);

      // accumulate rotations / hue
      this.kaRot += d.kaRotSpeed * dt * (1 + 0.4 * ax.mid);
      this.viewRot += d.viewRotSpeed * dt;
      this.hueAcc += dt * (d.hueCycle * 0.8);

      gl.disable(gl.BLEND);

      /* 1. ADVECT (fluid feedback) */
      this.glx.bindFBO(this.dye.write);
      const adv = this.prog.advect.use();
      this._setFlow(adv, d, A, input);
      adv.f("uDt", dt);
      adv.f("uAdvect", d.advect * (0.85 + 0.35 * ax.energy));
      adv.f("uDecay", d.decay);
      adv.f("uHueDrift", d.hueDrift + ax.flux * 0.12);
      adv.tex("uPrev", this.dye.read, 0, this.glx);
      this.glx.drawFullscreen();
      this.dye.swap();

      /* 2. INJECT (additive sources into dye.read) */
      this.glx.bindFBO(this.dye.read);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      const inj = this.prog.inject.use();
      inj.f("uAspect", this.aspect);
      inj.f("uTime", this.time);
      inj.f("uBeat", ax.beat);
      inj.f("uEnergy", ax.energy);
      inj.i("uEmCount", this._emCount);
      gl.uniform2fv(inj.loc("uEmPos"), this.emPos);
      gl.uniform2fv(inj.loc("uEmVel"), this.emVel);
      gl.uniform4fv(inj.loc("uEmData"), this.emData);
      gl.uniform1fv(inj.loc("uEmParam"), this.emParam);
      gl.uniform3fv(inj.loc("uEmColor"), this.emColor);
      inj.f("uSpecGain", d.specGain * 0.4 * (0.6 + 0.4 * dir.intensity));
      inj.f("uSpecRadius", d.specRadius);
      inj.f("uSpecWidth", d.specWidth * (0.7 + 0.7 * ax.energy));
      const p = dir.palette;
      inj.v3("uPalA", p.a[0], p.a[1], p.a[2]);
      inj.v3("uPalB", p.b[0], p.b[1], p.b[2]);
      inj.v3("uPalC", p.c[0], p.c[1], p.c[2]);
      inj.v3("uPalD", p.d[0], p.d[1], p.d[2]);
      inj.f("uPalShift", dir.palShift);
      // small, frame-rate-aware additive energy so the feedback loop settles at
      // a tasteful brightness instead of saturating to white
      inj.f("uInject", U.clamp(dt * 60, 0.5, 2.0) * 0.06);
      // gentle automatic breathing when silent; smoothed (non-strobing) bass
      // glow when there's sound
      const breath = 0.5 + 0.5 * Math.sin(this.time * 0.55);
      const silent = A.hasSignal ? 0 : 1;
      inj.f("uCenterPulse",
        (0.03 + silent * breath * 0.05 +
          ax.bass * d.centerPulse * 0.13 * (1 + 0.2 * ax.beat)) * dir.intensity);
      inj.tex("uFreq", this.freqTex, 0, this.glx);
      this.glx.drawFullscreen();
      gl.disable(gl.BLEND);

      /* 3. DISPLAY (flowing base field + dye accent -> scene, kaleidoscope) */
      this.glx.bindFBO(this.scene);
      const disp = this.prog.display.use();
      disp.f("uAspect", this.aspect);
      disp.f("uKaSides", Math.max(1, Math.round(d.kaSides)));
      disp.f("uKaMix", d.kaMix);
      disp.f("uKaRot", this.kaRot);
      disp.f("uViewRot", this.viewRot);
      disp.f("uMirror", d.mirror);
      disp.f("uTime", this.time);
      disp.f("uBaseScale", d.baseScale);
      disp.f("uBaseSpeed", d.baseSpeed * (0.55 + 0.6 * ax.energy));
      disp.f("uBaseWarp", d.baseWarp);
      disp.f("uBaseBright", d.baseBright * (0.9 + 0.2 * dir.intensity));
      disp.f("uColorSpread", d.colorSpread);
      disp.f("uRingFreq", d.ringFreq);
      disp.f("uFieldSharp", d.fieldSharp);
      disp.f("uDyeAmt", d.dyeAmt);
      disp.f("uBass", ax.bass);
      disp.f("uMid", ax.mid);
      disp.f("uBeat", ax.beat);
      disp.f("uPalShift", dir.palShift);
      disp.v3("uPalA", p.a[0], p.a[1], p.a[2]);
      disp.v3("uPalB", p.b[0], p.b[1], p.b[2]);
      disp.v3("uPalC", p.c[0], p.c[1], p.c[2]);
      disp.v3("uPalD", p.d[0], p.d[1], p.d[2]);
      disp.f("uExposure", d.exposure * (0.9 + 0.12 * ax.energy) * 0.62);
      disp.tex("uDye", this.dye.read, 0, this.glx);
      this.glx.drawFullscreen();

      /* 4. PARTICLES (update + additive render into scene) */
      if (this.particles) {
        const pu = this.prog.pUpdate.use();
        this._setFlow(pu, d, A, input);
        pu.f("uDt", dt);
        pu.f("uParticleSpeed", d.particleSpeed * (0.85 + 0.5 * ax.energy) * 1.5);
        pu.f("uDamp", d.damp);
        pu.f("uLifeMin", 2.0);
        pu.f("uLifeMax", 7.0);
        this.particles.update();

        this.glx.bindFBO(this.scene);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE);
        const pr = this.prog.pRender.use();
        const sizeScale = this.dispH / 900;
        pr.f("uPointSize", d.particleSize * sizeScale * 1.4 * dir.intensity);
        pr.f("uTreble", ax.treble * d.trebleSpark);
        pr.f("uBeat", ax.beat);
        pr.f("uBrightness", d.particleBright * dir.intensity * 0.24);
        pr.f("uVelColor", d.velColor);
        pr.f("uPalShift", dir.palShift);
        pr.v3("uPalA", p.a[0], p.a[1], p.a[2]);
        pr.v3("uPalB", p.b[0], p.b[1], p.b[2]);
        pr.v3("uPalC", p.c[0], p.c[1], p.c[2]);
        pr.v3("uPalD", p.d[0], p.d[1], p.d[2]);
        this.particles.render();
        gl.disable(gl.BLEND);
      }

      /* 5. BLOOM */
      this._bloom(d, A);

      /* 6. COMPOSITE -> screen */
      this.glx.bindFBO(null);
      const comp = this.prog.composite.use();
      comp.tex("uScene", this.scene, 0, this.glx);
      comp.tex("uBloom", this.bloomB, 1, this.glx);
      comp.tex("uBloom2", this.bloomD, 2, this.glx);
      comp.f("uBloomStr", d.bloomStr * (0.92 + 0.12 * ax.beat) * dir.intensity * 0.5);
      comp.f("uExposure", 1.0 + 0.04 * ax.energy);
      comp.f("uHue", this.hueAcc);
      comp.f("uSat", d.sat);
      comp.f("uContrast", d.contrast);
      comp.f("uVignette", d.vignette);
      comp.f("uChroma", d.chroma * (0.4 + 0.45 * ax.treble));
      comp.f("uGrain", d.grain);
      comp.f("uTime", this.time);
      comp.f("uAspect", this.aspect);
      this.glx.drawFullscreen();

      this._adapt(dt);
    }

    _bloom(d, A) {
      const gl = this.gl;
      gl.disable(gl.BLEND);
      const blurScale = 1.0 + (this._ax ? this._ax.beat : 0) * 0.2;

      // bright prefilter: scene -> bloomA (half res)
      this.glx.bindFBO(this.bloomA);
      const br = this.prog.bright.use();
      br.f("uThreshold", d.bloomThresh * 0.9 + 0.45);
      br.f("uKnee", 0.5);
      br.f("uClamp", 6.0);
      br.tex("uTex", this.scene, 0, this.glx);
      this.glx.drawFullscreen();

      const blur = this.prog.blur;
      // half-res blur: A -> B (H) -> A... we end with result in bloomB
      this._blurPass(this.bloomA, this.bloomB, 1 / this.bloomA.w * blurScale, 0);
      this._blurPass(this.bloomB, this.bloomA, 0, 1 / this.bloomA.h * blurScale);
      this._blurPass(this.bloomA, this.bloomB, 1 / this.bloomA.w * blurScale, 0);
      this._blurPass(this.bloomB, this.bloomA, 0, 1 / this.bloomA.h * blurScale);
      // copy/settle final half into bloomB for composite sampling
      this._blurPass(this.bloomA, this.bloomB, 0, 0);

      // quarter-res wide bloom from bloomB -> bloomC/D
      this._blurPass(this.bloomB, this.bloomC, 1 / this.bloomC.w * 2 * blurScale, 0);
      this._blurPass(this.bloomC, this.bloomD, 0, 1 / this.bloomC.h * 2 * blurScale);
      this._blurPass(this.bloomD, this.bloomC, 1 / this.bloomC.w * 2 * blurScale, 0);
      this._blurPass(this.bloomC, this.bloomD, 0, 1 / this.bloomC.h * 2 * blurScale);
    }

    _blurPass(src, dst, dx, dy) {
      this.glx.bindFBO(dst);
      const b = this.prog.blur.use();
      b.v2("uDir", dx, dy);
      b.tex("uTex", src, 0, this.glx);
      this.glx.drawFullscreen();
    }

    // Gentle adaptive quality: if we are consistently slow, reduce renderScale.
    _adapt(dt) {
      this._dtAvg += (dt - this._dtAvg) * 0.05;
      this._adaptCool -= dt;
      if (this._adaptCool > 0) return;
      const fps = 1 / this._dtAvg;
      if (fps < 40 && this.quality.renderScale > this.quality.minRender) {
        this.quality.renderScale = Math.max(this.quality.minRender, this.quality.renderScale - 0.08);
        this._sized = false;
        this.resize();
        this._adaptCool = 4;
      }
    }

    dispose() {
      // best-effort; the page usually just unloads
    }
  }

  VZ.Renderer = Renderer;
})();
