/* ============================================================================
 * LUMA — gl.js
 * Thin WebGL2 helper: context setup, shader/program compilation with readable
 * error reporting, float-framebuffer allocation, ping-pong targets, and a
 * buffer-less fullscreen draw. Everything else builds on this.
 * ========================================================================== */
(function () {
  "use strict";
  const VZ = (window.VZ = window.VZ || {});

  class GLX {
    constructor(canvas, onError) {
      this.canvas = canvas;
      this.onError = onError || ((e) => console.error(e));
      const opts = {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        // preserved only when explicitly requested (used by the test harness)
        preserveDrawingBuffer: /[?&]preserve/.test(location.search),
        powerPreference: "high-performance",
        desynchronized: true,
      };
      const gl = canvas.getContext("webgl2", opts);
      if (!gl) {
        throw new Error(
          "WebGL2 is not available on this device/browser. Try a recent Chrome, " +
          "Safari, Edge or Firefox."
        );
      }
      this.gl = gl;

      // Float render targets give us HDR for the feedback fluid + bloom.
      this.extColorFloat = gl.getExtension("EXT_color_buffer_float");
      this.extFloatLinear = gl.getExtension("OES_texture_float_linear");
      this.extColorHalfFloat = gl.getExtension("EXT_color_buffer_half_float");

      // Pick the best HDR-capable, linearly-filterable internal format.
      // RGBA16F (half float) is the sweet spot: wide support + linear filtering.
      if (this.extColorFloat) {
        this.hdrInternal = gl.RGBA16F;
        this.hdrType = gl.HALF_FLOAT;
        this.hdr = true;
      } else {
        // LDR fallback — still works, just with less glow headroom.
        this.hdrInternal = gl.RGBA8;
        this.hdrType = gl.UNSIGNED_BYTE;
        this.hdr = false;
      }

      // Empty VAO bound for buffer-less fullscreen draws (required by spec).
      this._emptyVao = gl.createVertexArray();

      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.CULL_FACE);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      this._programs = [];
    }

    /* --------------------------- Shaders -------------------------------- */
    compile(type, src, name) {
      const gl = this.gl;
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh);
        const annotated = annotateSource(src, log);
        gl.deleteShader(sh);
        throw new Error(`Shader compile failed [${name}]:\n${log}\n\n${annotated}`);
      }
      return sh;
    }

    program(vsSrc, fsSrc, name, tfVaryings) {
      const gl = this.gl;
      const vs = this.compile(gl.VERTEX_SHADER, vsSrc, name + ":vs");
      const fs = this.compile(gl.FRAGMENT_SHADER, fsSrc, name + ":fs");
      const p = gl.createProgram();
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      if (tfVaryings && tfVaryings.length) {
        gl.transformFeedbackVaryings(p, tfVaryings, gl.INTERLEAVED_ATTRIBS);
      }
      gl.linkProgram(p);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(p);
        gl.deleteProgram(p);
        throw new Error(`Program link failed [${name}]:\n${log}`);
      }
      // Cache uniform locations lazily.
      const wrapper = new Program(gl, p, name);
      this._programs.push(wrapper);
      return wrapper;
    }

    /* --------------------------- Textures ------------------------------- */
    // Create an HDR-capable 2D texture (RGBA16F when available).
    createTex(w, h, opts = {}) {
      const gl = this.gl;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      const filter = opts.nearest ? gl.NEAREST : gl.LINEAR;
      // If float-linear isn't supported, fall back to NEAREST for HDR targets.
      const safeFilter =
        !opts.nearest && this.hdr && !this.extFloatLinear ? gl.NEAREST : filter;
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, safeFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, safeFilter);
      const wrap = opts.wrap || gl.CLAMP_TO_EDGE;
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
      const internal = opts.internal || this.hdrInternal;
      const format = opts.format || gl.RGBA;
      const type = opts.type || this.hdrType;
      gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, null);
      gl.bindTexture(gl.TEXTURE_2D, null);
      return { tex, w, h, internal, format, type, filter: safeFilter, wrap };
    }

    // A render target = texture + framebuffer.
    createFBO(w, h, opts = {}) {
      const gl = this.gl;
      const t = this.createTex(w, h, opts);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t.tex, 0
      );
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      if (status !== gl.FRAMEBUFFER_COMPLETE) {
        // Retry as LDR if HDR attachment is unsupported on this device.
        if (this.hdr && !opts.internal) {
          this.hdr = false;
          this.hdrInternal = gl.RGBA8;
          this.hdrType = gl.UNSIGNED_BYTE;
          gl.deleteFramebuffer(fbo);
          gl.deleteTexture(t.tex);
          return this.createFBO(w, h, opts);
        }
        throw new Error("Framebuffer incomplete: 0x" + status.toString(16));
      }
      return { fbo, ...t, w, h };
    }

    // Ping-pong pair of render targets with swap().
    createPingPong(w, h, opts) {
      const a = this.createFBO(w, h, opts);
      const b = this.createFBO(w, h, opts);
      return {
        read: a,
        write: b,
        swap() {
          const t = this.read;
          this.read = this.write;
          this.write = t;
        },
      };
    }

    resizeFBO(target, w, h) {
      const gl = this.gl;
      if (target.w === w && target.h === h) return;
      gl.bindTexture(gl.TEXTURE_2D, target.tex);
      gl.texImage2D(
        gl.TEXTURE_2D, 0, target.internal, w, h, 0,
        target.format, target.type, null
      );
      gl.bindTexture(gl.TEXTURE_2D, null);
      target.w = w;
      target.h = h;
    }

    /* ----------------------------- Draw --------------------------------- */
    bindFBO(target) {
      const gl = this.gl;
      if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        gl.viewport(0, 0, target.w, target.h);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    clear(r = 0, g = 0, b = 0, a = 1) {
      const gl = this.gl;
      gl.clearColor(r, g, b, a);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    // Draw a single fullscreen triangle (no vertex buffer needed).
    drawFullscreen() {
      const gl = this.gl;
      gl.bindVertexArray(this._emptyVao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindVertexArray(null);
    }

    bindTexture(texObj, unit) {
      const gl = this.gl;
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texObj.tex);
      return unit;
    }
  }

  /* --------------------- Program wrapper (uniform cache) ---------------- */
  class Program {
    constructor(gl, prog, name) {
      this.gl = gl;
      this.prog = prog;
      this.name = name;
      this._loc = new Map();
      this._warned = new Set();
    }
    use() {
      this.gl.useProgram(this.prog);
      return this;
    }
    loc(name) {
      let l = this._loc.get(name);
      if (l === undefined) {
        l = this.gl.getUniformLocation(this.prog, name);
        this._loc.set(name, l);
      }
      return l;
    }
    // Generic uniform setters (silently ignore uniforms optimized away).
    f(n, v) { const l = this.loc(n); if (l) this.gl.uniform1f(l, v); return this; }
    i(n, v) { const l = this.loc(n); if (l !== null) this.gl.uniform1i(l, v); return this; }
    v2(n, x, y) { const l = this.loc(n); if (l) this.gl.uniform2f(l, x, y); return this; }
    v3(n, x, y, z) { const l = this.loc(n); if (l) this.gl.uniform3f(l, x, y, z); return this; }
    v4(n, x, y, z, w) { const l = this.loc(n); if (l) this.gl.uniform4f(l, x, y, z, w); return this; }
    v3a(n, arr) { const l = this.loc(n); if (l) this.gl.uniform3fv(l, arr); return this; }
    v4a(n, arr) { const l = this.loc(n); if (l) this.gl.uniform4fv(l, arr); return this; }
    fa(n, arr) { const l = this.loc(n); if (l) this.gl.uniform1fv(l, arr); return this; }
    v2a(n, arr) { const l = this.loc(n); if (l) this.gl.uniform2fv(l, arr); return this; }
    tex(n, texObj, unit, glx) {
      glx.bindTexture(texObj, unit);
      return this.i(n, unit);
    }
  }

  // Add line numbers + point at error lines so shader bugs are obvious.
  function annotateSource(src, log) {
    const lines = src.split("\n");
    const bad = new Set();
    const re = /ERROR:\s*\d+:(\d+)/g;
    let m;
    while ((m = re.exec(log))) bad.add(parseInt(m[1], 10));
    return lines
      .map((ln, i) => {
        const n = i + 1;
        const mark = bad.has(n) ? ">>" : "  ";
        return `${mark}${String(n).padStart(4)} | ${ln}`;
      })
      .join("\n");
  }

  VZ.GLX = GLX;
})();
