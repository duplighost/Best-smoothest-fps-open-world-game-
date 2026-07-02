/* ============================================================================
 * LUMA — particles.js
 * GPU particle system via WebGL2 transform feedback. Each particle stores
 * interleaved [pos.xy, vel.xy, misc(life,seed)] and is advected on the GPU by
 * the same flow field as the fluid, then drawn additively as soft glowing
 * points. Positions live in uv space [0,1], independent of resolution.
 * ========================================================================== */
(function () {
  "use strict";
  const VZ = (window.VZ = window.VZ || {});

  const FLOATS = 6;                 // pos(2) + vel(2) + misc(2)
  const STRIDE = FLOATS * 4;        // bytes
  const ATTRS = [
    ["aPos", 2, 0],
    ["aVel", 2, 8],
    ["aMisc", 2, 16],
  ];

  class Particles {
    constructor(glx, count) {
      this.glx = glx;
      this.gl = glx.gl;
      this.count = count;
      this.cur = 0;
      this._ok = false;
    }

    init(updateProg, renderProg) {
      const gl = this.gl;
      this.updateProg = updateProg;
      this.renderProg = renderProg;

      // seed initial state
      const data = new Float32Array(this.count * FLOATS);
      for (let i = 0; i < this.count; i++) {
        const o = i * FLOATS;
        data[o + 0] = Math.random();        // pos.x
        data[o + 1] = Math.random();        // pos.y
        data[o + 2] = (Math.random() - 0.5) * 0.02; // vel.x
        data[o + 3] = (Math.random() - 0.5) * 0.02; // vel.y
        data[o + 4] = Math.random();        // life 0..1
        data[o + 5] = Math.random();        // seed
      }

      this.buffers = [gl.createBuffer(), gl.createBuffer()];
      for (const b of this.buffers) {
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_COPY);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, null);

      // VAOs: one per (program, source buffer)
      this.updateVao = [
        this._makeVao(this.buffers[0], updateProg),
        this._makeVao(this.buffers[1], updateProg),
      ];
      this.renderVao = [
        this._makeVao(this.buffers[0], renderProg),
        this._makeVao(this.buffers[1], renderProg),
      ];
      this.tf = gl.createTransformFeedback();
      this._ok = true;
    }

    _makeVao(buffer, prog) {
      const gl = this.gl;
      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      for (const [name, size, off] of ATTRS) {
        const loc = gl.getAttribLocation(prog.prog, name);
        if (loc >= 0) {
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, size, gl.FLOAT, false, STRIDE, off);
        }
      }
      gl.bindVertexArray(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      return vao;
    }

    // Advance simulation. The renderer has already use()d updateProg and set
    // its uniforms (flow field, dt, etc.).
    update() {
      if (!this._ok) return;
      const gl = this.gl;
      const src = this.cur;
      const dst = 1 - this.cur;

      gl.enable(gl.RASTERIZER_DISCARD);
      gl.bindVertexArray(this.updateVao[src]);
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.tf);
      gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, this.buffers[dst]);
      gl.beginTransformFeedback(gl.POINTS);
      gl.drawArrays(gl.POINTS, 0, this.count);
      gl.endTransformFeedback();
      gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
      gl.bindVertexArray(null);
      gl.disable(gl.RASTERIZER_DISCARD);

      this.cur = dst;
    }

    // Draw additively. Renderer has use()d renderProg, set uniforms, bound the
    // target FBO and configured additive blending.
    render() {
      if (!this._ok) return;
      const gl = this.gl;
      gl.bindVertexArray(this.renderVao[this.cur]);
      gl.drawArrays(gl.POINTS, 0, this.count);
      gl.bindVertexArray(null);
    }
  }

  VZ.Particles = Particles;
})();
