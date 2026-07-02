(() => {
  'use strict';

  // ---------------------------------------------------------------------------
  // The Screaming Banana Dilemma - raw WebGL first-person mini game.
  // No external engine is required; every model and texture is procedural.
  // ---------------------------------------------------------------------------

  const canvas = document.getElementById('gameCanvas');
  const startScreen = document.getElementById('startScreen');
  const startButton = document.getElementById('startButton');
  const restartButton = document.getElementById('restartButton');
  const hud = document.getElementById('hud');
  const objectiveEl = document.getElementById('objective');
  const statsEl = document.getElementById('stats');
  const crosshair = document.getElementById('crosshair');
  const promptEl = document.getElementById('prompt');
  const toastEl = document.getElementById('toast');
  const helpEl = document.getElementById('help');
  const interactButton = document.getElementById('interactButton');
  const choiceOverlay = document.getElementById('choiceOverlay');
  const choiceTitle = document.getElementById('choiceTitle');
  const choiceText = document.getElementById('choiceText');
  const choicesEl = document.getElementById('choices');
  const endingScreen = document.getElementById('endingScreen');
  const endingTitle = document.getElementById('endingTitle');
  const endingText = document.getElementById('endingText');
  const joyLeft = document.getElementById('joystickLeft');
  const joyRight = document.getElementById('joystickRight');
  const joyLeftKnob = joyLeft.querySelector('.knob');
  const joyRightKnob = joyRight.querySelector('.knob');

  const gl = canvas.getContext('webgl', { antialias: true, alpha: false, powerPreference: 'high-performance' }) ||
             canvas.getContext('experimental-webgl', { antialias: true, alpha: false });
  if (!gl) {
    document.body.innerHTML = `
      <a href="/" style="position:fixed;left:16px;top:16px;color:rgba(255,255,255,.82);text-decoration:none;font:800 12px ui-sans-serif,system-ui;letter-spacing:.12em;text-transform:uppercase;border:1px solid rgba(255,255,255,.14);background:rgba(5,7,11,.56);border-radius:999px;padding:9px 12px;backdrop-filter:blur(10px)">← Qualiacology</a>
      <main style="min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 50% 34%,rgba(255,217,63,.14),rgba(3,5,8,.94) 52%,#000);color:white;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
        <section style="width:min(680px,94vw);border:1px solid rgba(255,255,255,.18);border-radius:28px;background:linear-gradient(145deg,rgba(28,18,22,.88),rgba(5,7,11,.82));box-shadow:0 24px 90px rgba(0,0,0,.68);padding:34px 28px;text-align:center">
          <h1 style="margin:0 0 12px;font-size:clamp(2rem,7vw,4.8rem);line-height:.95;letter-spacing:-.055em;color:#ffe770">Banana needs WebGL</h1>
          <p style="margin:0 auto 20px;max-width:540px;line-height:1.5;opacity:.84">Your browser could not start the tiny haunted kitchen renderer. Try a modern desktop or mobile browser with hardware acceleration enabled.</p>
          <a href="/" style="display:inline-block;border-radius:999px;padding:13px 20px;background:linear-gradient(180deg,#fff19e,#ffbe35);color:#211300;text-decoration:none;font-weight:900">Back to Qualiacology</a>
        </section>
      </main>`;
    return;
  }

  const TAU = Math.PI * 2;
  const DEG = Math.PI / 180;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (a, b, x) => {
    const t = clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  const V3 = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
    sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
    scale: (a, s) => [a[0] * s, a[1] * s, a[2] * s],
    dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
    cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
    length: a => Math.hypot(a[0], a[1], a[2]),
    normalize: a => {
      const n = Math.hypot(a[0], a[1], a[2]) || 1;
      return [a[0] / n, a[1] / n, a[2] / n];
    },
    distance: (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
  };

  function mat4Identity() {
    return new Float32Array([1, 0, 0, 0,
                             0, 1, 0, 0,
                             0, 0, 1, 0,
                             0, 0, 0, 1]);
  }

  function mat4Multiply(out, a, b) {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b0, b1, b2, b3;

    b0 = b[0]; b1 = b[1]; b2 = b[2]; b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }

  function mat4Perspective(out, fovy, aspect, near, far) {
    const f = 1 / Math.tan(fovy / 2);
    out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
    out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
    out[8] = 0; out[9] = 0; out[11] = -1;
    out[12] = 0; out[13] = 0; out[15] = 0;
    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
  }

  function mat4LookAt(out, eye, center, up) {
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    z0 = eye[0] - center[0]; z1 = eye[1] - center[1]; z2 = eye[2] - center[2];
    len = Math.hypot(z0, z1, z2) || 1;
    z0 /= len; z1 /= len; z2 /= len;
    x0 = up[1] * z2 - up[2] * z1;
    x1 = up[2] * z0 - up[0] * z2;
    x2 = up[0] * z1 - up[1] * z0;
    len = Math.hypot(x0, x1, x2) || 1;
    x0 /= len; x1 /= len; x2 /= len;
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    out[0] = x0; out[1] = y0; out[2] = z0; out[3] = 0;
    out[4] = x1; out[5] = y1; out[6] = z1; out[7] = 0;
    out[8] = x2; out[9] = y2; out[10] = z2; out[11] = 0;
    out[12] = -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]);
    out[13] = -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]);
    out[14] = -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]);
    out[15] = 1;
    return out;
  }

  function composeMatrix(out, pos, rot, scale) {
    const sx = Math.sin(rot[0]), cx = Math.cos(rot[0]);
    const sy = Math.sin(rot[1]), cy = Math.cos(rot[1]);
    const sz = Math.sin(rot[2]), cz = Math.cos(rot[2]);
    const rx = rot[0], ry = rot[1], rz = rot[2];
    // Rotation order Y * X * Z, expanded and then scaled by columns.
    const m00 = cy * cz + sy * sx * sz;
    const m01 = cx * sz;
    const m02 = -sy * cz + cy * sx * sz;
    const m10 = -cy * sz + sy * sx * cz;
    const m11 = cx * cz;
    const m12 = sy * sz + cy * sx * cz;
    const m20 = sy * cx;
    const m21 = -sx;
    const m22 = cy * cx;
    out[0] = m00 * scale[0]; out[1] = m01 * scale[0]; out[2] = m02 * scale[0]; out[3] = 0;
    out[4] = m10 * scale[1]; out[5] = m11 * scale[1]; out[6] = m12 * scale[1]; out[7] = 0;
    out[8] = m20 * scale[2]; out[9] = m21 * scale[2]; out[10] = m22 * scale[2]; out[11] = 0;
    out[12] = pos[0]; out[13] = pos[1]; out[14] = pos[2]; out[15] = 1;
    return out;
  }

  function compileShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(s) || 'Shader compile error');
    }
    return s;
  }

  function createProgram(vs, fs) {
    const p = gl.createProgram();
    gl.attachShader(p, compileShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(p, compileShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(p) || 'Program link error');
    }
    return p;
  }

  const vertexSrc = `
    attribute vec3 a_position;
    attribute vec3 a_normal;
    attribute vec2 a_uv;
    uniform mat4 u_model;
    uniform mat4 u_viewProj;
    varying vec3 v_normal;
    varying vec3 v_worldPos;
    varying vec2 v_uv;
    void main() {
      vec4 world = u_model * vec4(a_position, 1.0);
      v_worldPos = world.xyz;
      v_normal = normalize(mat3(u_model) * a_normal);
      v_uv = a_uv;
      gl_Position = u_viewProj * world;
    }
  `;

  const fragmentSrc = `
    precision highp float;
    uniform sampler2D u_tex;
    uniform vec3 u_color;
    uniform vec3 u_cameraPos;
    uniform vec3 u_freezerLight;
    uniform vec3 u_bananaLight;
    uniform float u_time;
    uniform float u_alpha;
    uniform float u_emissive;
    uniform float u_scream;
    varying vec3 v_normal;
    varying vec3 v_worldPos;
    varying vec2 v_uv;

    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123);}

    void main() {
      vec4 tex = texture2D(u_tex, v_uv);
      if (tex.a * u_alpha < 0.03) discard;
      vec3 base = tex.rgb * u_color;
      vec3 n = normalize(v_normal);
      vec3 viewDir = normalize(u_cameraPos - v_worldPos);
      vec3 dir = normalize(vec3(-0.35, 0.75, 0.45));
      float nd = max(dot(n, dir), 0.0);
      vec3 light = vec3(0.21, 0.19, 0.165) + nd * vec3(0.66, 0.60, 0.50);

      vec3 toLamp = vec3(-2.5, 2.7, 1.6) - v_worldPos;
      float lampDist = length(toLamp);
      vec3 lampDir = normalize(toLamp);
      float lamp = max(dot(n, lampDir), 0.0) * 1.7 / (1.0 + lampDist * lampDist * 0.18);
      light += lamp * vec3(1.0, 0.82, 0.54);

      vec3 toFreezer = u_freezerLight - v_worldPos;
      float freezerDist = length(toFreezer);
      vec3 freezerDir = normalize(toFreezer);
      float freezer = max(dot(n, freezerDir), 0.0) * 2.9 / (1.0 + freezerDist * freezerDist * 0.45);
      light += freezer * vec3(0.52, 0.77, 1.0);

      vec3 toBan = u_bananaLight - v_worldPos;
      float banDist = length(toBan);
      vec3 banDir = normalize(toBan);
      float ban = max(dot(n, banDir), 0.0) * (0.45 + u_scream * 1.35) / (1.0 + banDist * banDist * 1.15);
      light += ban * vec3(1.0, 0.82, 0.18);

      vec3 h = normalize(dir + viewDir);
      float spec = pow(max(dot(n, h), 0.0), 48.0) * 0.22;
      float grime = hash(floor(v_uv * 80.0)) * 0.025;
      vec3 color = base * (light + grime) + spec + base * u_emissive;
      float d = distance(u_cameraPos, v_worldPos);
      float fog = smoothstep(7.0, 17.0, d);
      vec3 fogColor = vec3(0.06, 0.052, 0.046);
      color = mix(color, fogColor, fog * 0.50);
      gl_FragColor = vec4(color, tex.a * u_alpha);
    }
  `;

  const program = createProgram(vertexSrc, fragmentSrc);
  const loc = {
    position: gl.getAttribLocation(program, 'a_position'),
    normal: gl.getAttribLocation(program, 'a_normal'),
    uv: gl.getAttribLocation(program, 'a_uv'),
    model: gl.getUniformLocation(program, 'u_model'),
    viewProj: gl.getUniformLocation(program, 'u_viewProj'),
    tex: gl.getUniformLocation(program, 'u_tex'),
    color: gl.getUniformLocation(program, 'u_color'),
    cameraPos: gl.getUniformLocation(program, 'u_cameraPos'),
    freezerLight: gl.getUniformLocation(program, 'u_freezerLight'),
    bananaLight: gl.getUniformLocation(program, 'u_bananaLight'),
    time: gl.getUniformLocation(program, 'u_time'),
    alpha: gl.getUniformLocation(program, 'u_alpha'),
    emissive: gl.getUniformLocation(program, 'u_emissive'),
    scream: gl.getUniformLocation(program, 'u_scream')
  };

  function createMesh(positions, normals, uvs) {
    const mesh = { count: positions.length / 3 };
    mesh.pos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.pos);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    mesh.norm = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.norm);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    mesh.uv = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.uv);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
    return mesh;
  }

  function addTri(p, n, uv, a, b, c, normal, uva, uvb, uvc) {
    p.push(...a, ...b, ...c);
    n.push(...normal, ...normal, ...normal);
    uv.push(...uva, ...uvb, ...uvc);
  }

  function createBoxMesh() {
    const p = [], n = [], uv = [];
    const f = [
      { normal: [0, 0, 1], corners: [[-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5]] },
      { normal: [0, 0, -1], corners: [[0.5, -0.5, -0.5], [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5]] },
      { normal: [0, 1, 0], corners: [[-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5]] },
      { normal: [0, -1, 0], corners: [[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5]] },
      { normal: [1, 0, 0], corners: [[0.5, -0.5, 0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5]] },
      { normal: [-1, 0, 0], corners: [[-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5]] }
    ];
    for (const face of f) {
      const c = face.corners;
      addTri(p, n, uv, c[0], c[1], c[2], face.normal, [0, 0], [1, 0], [1, 1]);
      addTri(p, n, uv, c[0], c[2], c[3], face.normal, [0, 0], [1, 1], [0, 1]);
    }
    return createMesh(p, n, uv);
  }

  function createPlaneMesh() {
    const p = [-0.5, 0, 0.5, 0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, -0.5];
    const n = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
    const uv = [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1];
    return createMesh(p, n, uv);
  }

  function createCylinderMesh(radTop = 0.5, radBottom = 0.5, height = 1, seg = 32) {
    const p = [], n = [], uv = [];
    for (let i = 0; i < seg; i++) {
      const a0 = i / seg * TAU, a1 = (i + 1) / seg * TAU;
      const x0 = Math.cos(a0), z0 = Math.sin(a0), x1 = Math.cos(a1), z1 = Math.sin(a1);
      const b0 = [x0 * radBottom, -height / 2, z0 * radBottom];
      const b1 = [x1 * radBottom, -height / 2, z1 * radBottom];
      const t0 = [x0 * radTop, height / 2, z0 * radTop];
      const t1 = [x1 * radTop, height / 2, z1 * radTop];
      const nn0 = V3.normalize([x0, (radBottom - radTop) / height, z0]);
      const nn1 = V3.normalize([x1, (radBottom - radTop) / height, z1]);
      p.push(...b0, ...b1, ...t1, ...b0, ...t1, ...t0);
      n.push(...nn0, ...nn1, ...nn1, ...nn0, ...nn1, ...nn0);
      uv.push(i / seg, 0, (i + 1) / seg, 0, (i + 1) / seg, 1, i / seg, 0, (i + 1) / seg, 1, i / seg, 1);
      // top
      addTri(p, n, uv, [0, height / 2, 0], t0, t1, [0, 1, 0], [0.5, 0.5], [(x0 + 1) / 2, (z0 + 1) / 2], [(x1 + 1) / 2, (z1 + 1) / 2]);
      // bottom
      addTri(p, n, uv, [0, -height / 2, 0], b1, b0, [0, -1, 0], [0.5, 0.5], [(x1 + 1) / 2, (z1 + 1) / 2], [(x0 + 1) / 2, (z0 + 1) / 2]);
    }
    return createMesh(p, n, uv);
  }

  function createSphereMesh(seg = 32, rings = 16) {
    const p = [], n = [], uv = [];
    for (let y = 0; y < rings; y++) {
      const v0 = y / rings, v1 = (y + 1) / rings;
      const th0 = v0 * Math.PI, th1 = v1 * Math.PI;
      for (let x = 0; x < seg; x++) {
        const u0 = x / seg, u1 = (x + 1) / seg;
        const ph0 = u0 * TAU, ph1 = u1 * TAU;
        const pt = (th, ph) => [Math.sin(th) * Math.cos(ph) * 0.5, Math.cos(th) * 0.5, Math.sin(th) * Math.sin(ph) * 0.5];
        const a = pt(th0, ph0), b = pt(th1, ph0), c = pt(th1, ph1), d = pt(th0, ph1);
        const na = V3.normalize(a), nb = V3.normalize(b), nc = V3.normalize(c), nd = V3.normalize(d);
        p.push(...a, ...b, ...c, ...a, ...c, ...d);
        n.push(...na, ...nb, ...nc, ...na, ...nc, ...nd);
        uv.push(u0, v0, u0, v1, u1, v1, u0, v0, u1, v1, u1, v0);
      }
    }
    return createMesh(p, n, uv);
  }

  function createBananaMesh() {
    const p = [], n = [], uv = [];
    const seg = 34, ring = 18;
    const R = 1.28;
    const angle0 = -1.04, angle1 = 1.04;
    for (let i = 0; i < seg; i++) {
      const u0 = i / seg, u1 = (i + 1) / seg;
      for (let j = 0; j < ring; j++) {
        const v0 = j / ring, v1 = (j + 1) / ring;
        const vertex = (u, v) => {
          const a = angle0 + (angle1 - angle0) * u;
          const center = [Math.sin(a) * R * 0.95, Math.cos(a) * R - R * Math.cos(angle0), 0];
          const tangent = V3.normalize([Math.cos(a) * R * 0.95, -Math.sin(a) * R, 0]);
          const bin = [0, 0, 1];
          const nor = V3.normalize(V3.cross(bin, tangent));
          const taper = Math.sin(Math.PI * u);
          const radius = 0.135 * (0.38 + 0.72 * Math.pow(Math.max(taper, 0), 0.55));
          const phi = v * TAU;
          const normal = V3.normalize(V3.add(V3.scale(nor, Math.cos(phi)), V3.scale(bin, Math.sin(phi))));
          const pos = V3.add(center, V3.scale(normal, radius));
          return { pos, normal };
        };
        const a = vertex(u0, v0), b = vertex(u1, v0), c = vertex(u1, v1), d = vertex(u0, v1);
        p.push(...a.pos, ...b.pos, ...c.pos, ...a.pos, ...c.pos, ...d.pos);
        n.push(...a.normal, ...b.normal, ...c.normal, ...a.normal, ...c.normal, ...d.normal);
        uv.push(u0, v0, u1, v0, u1, v1, u0, v0, u1, v1, u0, v1);
      }
    }
    return createMesh(p, n, uv);
  }

  function createRingMesh(seg = 96, inner = 0.46, outer = 0.5) {
    const p = [], n = [], uv = [];
    for (let i = 0; i < seg; i++) {
      const a0 = i / seg * TAU, a1 = (i + 1) / seg * TAU;
      const i0 = [Math.cos(a0) * inner, Math.sin(a0) * inner, 0];
      const i1 = [Math.cos(a1) * inner, Math.sin(a1) * inner, 0];
      const o0 = [Math.cos(a0) * outer, Math.sin(a0) * outer, 0];
      const o1 = [Math.cos(a1) * outer, Math.sin(a1) * outer, 0];
      addTri(p, n, uv, i0, o0, o1, [0, 0, 1], [0, 0], [1, 0], [1, 1]);
      addTri(p, n, uv, i0, o1, i1, [0, 0, 1], [0, 0], [1, 1], [0, 1]);
    }
    return createMesh(p, n, uv);
  }

  function makeCanvas(size = 256) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    return c;
  }

  function makeTexture(draw, repeat = true, size = 256) {
    const c = makeCanvas(size);
    const ctx = c.getContext('2d');
    draw(ctx, size);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);
    return tex;
  }

  function noiseDots(ctx, size, count, color, alphaMin = 0.04, alphaMax = 0.16) {
    for (let i = 0; i < count; i++) {
      ctx.globalAlpha = lerp(alphaMin, alphaMax, Math.random());
      ctx.fillStyle = color;
      const r = Math.random() * 2.5 + 0.35;
      ctx.beginPath();
      ctx.arc(Math.random() * size, Math.random() * size, r, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  const whiteTex = makeTexture((ctx, s) => { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, s, s); }, true, 16);
  const textures = {
    wall: makeTexture((ctx, s) => {
      const g = ctx.createLinearGradient(0, 0, 0, s);
      g.addColorStop(0, '#f4ede0');
      g.addColorStop(0.48, '#ddd1bd');
      g.addColorStop(1, '#c7b9a1');
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
      // soft plaster grain (warm putty paint, not cold drywall)
      noiseDots(ctx, s, 2300, '#3a2f23', 0.010, 0.060);
      noiseDots(ctx, s, 700, '#fff7ea', 0.018, 0.085);
      // subtle wallpaper/panel rhythm so the big room walls stop reading as flat slabs
      for (let x = 0; x <= s; x += s / 4) {
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = '#fff7ea'; ctx.fillRect(x + 1, 0, 1, s);
        ctx.fillStyle = '#7c6f5b'; ctx.fillRect(x - 1, 0, 1, s);
      }
      for (let y of [s * .18, s * .46, s * .78]) {
        ctx.globalAlpha = 0.11;
        ctx.fillStyle = '#fff7ea'; ctx.fillRect(0, y, s, 2);
        ctx.fillStyle = '#7a6d59'; ctx.fillRect(0, y + 3, s, 1);
      }
      ctx.globalAlpha = 0.16;
      for (let i = 0; i < 22; i++) {
        ctx.fillStyle = i % 2 ? '#fff7ea' : '#857862';
        ctx.fillRect(Math.random() * s, Math.random() * s, Math.random() * 90 + 20, 1);
      }
      ctx.globalAlpha = 1;
    }),
    tile: makeTexture((ctx, s) => {
      ctx.fillStyle = '#777674'; ctx.fillRect(0, 0, s, s);
      const tile = s / 4;
      for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
        ctx.fillStyle = (x + y) % 2 ? '#898884' : '#6b6b69';
        ctx.fillRect(x * tile + 2, y * tile + 2, tile - 4, tile - 4);
      }
      ctx.fillStyle = '#343333';
      for (let i = 0; i <= 4; i++) { ctx.fillRect(i * tile - 1, 0, 2, s); ctx.fillRect(0, i * tile - 1, s, 2); }
      noiseDots(ctx, s, 850, '#1d1e1f', 0.03, 0.12);
      noiseDots(ctx, s, 300, '#ffffff', 0.02, 0.08);
    }),
    wood: makeTexture((ctx, s) => {
      const g = ctx.createLinearGradient(0, 0, s, 0);
      g.addColorStop(0, '#6f4226'); g.addColorStop(.5, '#9d6637'); g.addColorStop(1, '#5a351f');
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
      for (let y = 0; y < s; y += 6) {
        ctx.globalAlpha = 0.16 + Math.random() * 0.12;
        ctx.strokeStyle = y % 12 ? '#2a1609' : '#f0bf78';
        ctx.beginPath();
        ctx.moveTo(0, y + Math.sin(y) * 4);
        for (let x = 0; x < s; x += 8) ctx.lineTo(x, y + Math.sin(x * .045 + y * .11) * 7);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }),
    metal: makeTexture((ctx, s) => {
      const g = ctx.createLinearGradient(0, 0, s, s);
      g.addColorStop(0, '#dce4e7'); g.addColorStop(.5, '#95a0a5'); g.addColorStop(1, '#eff6f9');
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
      for (let x = 0; x < s; x += 4) { ctx.globalAlpha = 0.08; ctx.fillStyle = '#fff'; ctx.fillRect(x, 0, 1, s); }
      noiseDots(ctx, s, 260, '#35434a', 0.02, 0.08); ctx.globalAlpha = 1;
    }),
    frost: makeTexture((ctx, s) => {
      const g = ctx.createRadialGradient(s * .5, s * .45, 0, s * .5, s * .45, s * .8);
      g.addColorStop(0, '#ffffff'); g.addColorStop(.55, '#dff3ff'); g.addColorStop(1, '#a9c2d5');
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 72; i++) {
        ctx.globalAlpha = 0.16 + Math.random() * 0.26;
        ctx.strokeStyle = Math.random() < .5 ? '#fff' : '#87b7db';
        ctx.beginPath();
        const x = Math.random() * s, y = Math.random() * s;
        ctx.moveTo(x, y);
        ctx.lineTo(x + (Math.random() - .5) * 60, y + (Math.random() - .5) * 60);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      noiseDots(ctx, s, 600, '#fff', 0.03, 0.18);
    }),
    banana: makeTexture((ctx, s) => {
      const g = ctx.createLinearGradient(0, 0, s, 0);
      g.addColorStop(0, '#e0a900'); g.addColorStop(.22, '#ffe95b'); g.addColorStop(.5, '#ffd72f'); g.addColorStop(.75, '#fff070'); g.addColorStop(1, '#ba7b00');
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
      noiseDots(ctx, s, 650, '#3c2100', 0.09, 0.42);
      noiseDots(ctx, s, 220, '#fff69a', 0.04, 0.18);
      ctx.globalAlpha = .22;
      for (let x = 0; x < s; x += 28) { ctx.fillStyle = '#9b6a00'; ctx.fillRect(x, 0, 3, s); }
      ctx.globalAlpha = 1;
      // Draw an absurd distressed face on the UV strip, positioned on the front of the banana.
      const fx = s * .52, fy = s * .25;
      ctx.fillStyle = '#191000';
      ctx.beginPath(); ctx.ellipse(fx - 30, fy - 8, 10, 16, .1, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(fx + 28, fy - 8, 10, 16, -.1, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#fff089'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(fx - 31, fy - 11, 3, 0, TAU); ctx.stroke();
      ctx.beginPath(); ctx.arc(fx + 27, fy - 11, 3, 0, TAU); ctx.stroke();
      ctx.fillStyle = '#120600';
      ctx.beginPath(); ctx.ellipse(fx, fy + 28, 24, 34, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#fff4a3'; ctx.lineWidth = 4;
      for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(fx + i * 8, fy + 0); ctx.lineTo(fx + i * 5, fy + 14); ctx.stroke(); }
    }),
    fur: makeTexture((ctx, s) => {
      ctx.fillStyle = '#c79055'; ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 900; i++) {
        ctx.globalAlpha = Math.random() * .18 + .04;
        ctx.strokeStyle = Math.random() < .5 ? '#5c321b' : '#ffe3b0';
        const x = Math.random() * s, y = Math.random() * s;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.random() * 16 - 8, y + Math.random() * 8); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }),
    paper: makeTexture((ctx, s) => {
      ctx.fillStyle = '#f7f0d8'; ctx.fillRect(0, 0, s, s);
      noiseDots(ctx, s, 560, '#8a7851', 0.02, 0.08);
      ctx.strokeStyle = 'rgba(40,50,80,.26)'; ctx.lineWidth = 2;
      for (let y = 34; y < s; y += 24) { ctx.beginPath(); ctx.moveTo(16, y); ctx.lineTo(s - 16, y); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(160,30,30,.24)'; ctx.beginPath(); ctx.moveTo(54, 0); ctx.lineTo(54, s); ctx.stroke();
    }),
    plastic: makeTexture((ctx, s) => {
      ctx.fillStyle = '#bfc5ce'; ctx.fillRect(0, 0, s, s);
      const g = ctx.createLinearGradient(0, 0, s, s);
      g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(.52, 'rgba(255,255,255,.08)'); g.addColorStop(1, 'rgba(20,40,60,.18)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
      noiseDots(ctx, s, 300, '#ffffff', 0.04, 0.2);
    }),
    rug: makeTexture((ctx, s) => {
      ctx.fillStyle = '#253249'; ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 8; i++) { ctx.strokeStyle = i % 2 ? '#314d71' : '#1b2232'; ctx.lineWidth = 14; ctx.strokeRect(14 + i * 11, 14 + i * 11, s - 28 - i * 22, s - 28 - i * 22); }
      noiseDots(ctx, s, 1400, '#ffffff', 0.018, 0.06);
    }),
    dark: makeTexture((ctx, s) => { ctx.fillStyle = '#1b1d22'; ctx.fillRect(0, 0, s, s); noiseDots(ctx, s, 400, '#fff', 0.02, 0.08); }),
    black: makeTexture((ctx, s) => { ctx.fillStyle = '#030305'; ctx.fillRect(0, 0, s, s); }, false, 16),
    blueGlow: makeTexture((ctx, s) => {
      const g = ctx.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2);
      g.addColorStop(0, 'rgba(214,245,255,1)'); g.addColorStop(.45, 'rgba(79,177,255,.55)'); g.addColorStop(1, 'rgba(10,24,50,.08)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    }, false),
    hazard: makeTexture((ctx, s) => {
      ctx.fillStyle = '#ffe34e'; ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#111';
      for (let x = -s; x < s * 2; x += 40) {
        ctx.save(); ctx.translate(x, 0); ctx.rotate(-Math.PI / 4); ctx.fillRect(-8, -s, 18, s * 3); ctx.restore();
      }
      ctx.globalAlpha = .75; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, s, 22); ctx.globalAlpha = 1;
    })
  };

  class Material {
    constructor(opts = {}) {
      this.texture = opts.texture || whiteTex;
      this.color = opts.color || [1, 1, 1];
      this.alpha = opts.alpha == null ? 1 : opts.alpha;
      this.emissive = opts.emissive || 0;
      this.transparent = this.alpha < 1 || !!opts.transparent;
      this.name = opts.name || 'material';
    }
  }

  class RenderObject {
    constructor(mesh, material, opts = {}) {
      this.mesh = mesh;
      this.material = material;
      this.pos = opts.pos || [0, 0, 0];
      this.rot = opts.rot || [0, 0, 0];
      this.scale = opts.scale || [1, 1, 1];
      this.visible = opts.visible == null ? true : opts.visible;
      this.name = opts.name || '';
      this.update = opts.update || null;
      this.model = mat4Identity();
      this.sort = opts.sort || 0;
    }
  }

  const meshes = {
    box: createBoxMesh(),
    plane: createPlaneMesh(),
    cylinder: createCylinderMesh(0.5, 0.5, 1, 32),
    cone: createCylinderMesh(0.02, 0.5, 1, 28),
    sphere: createSphereMesh(32, 16),
    banana: createBananaMesh(),
    ring: createRingMesh(96, 0.43, 0.5)
  };

  const materials = {
    wall: new Material({ texture: textures.wall, color: [1.0, 0.97, 0.9] }),
    tile: new Material({ texture: textures.tile, color: [0.88, 0.88, 0.86] }),
    wood: new Material({ texture: textures.wood, color: [1, 0.94, 0.85] }),
    metal: new Material({ texture: textures.metal, color: [0.84, 0.92, 0.98] }),
    frost: new Material({ texture: textures.frost, color: [0.92, 0.98, 1.0] }),
    banana: new Material({ texture: textures.banana, color: [1.15, 1.08, 0.82], emissive: 0.04 }),
    fur: new Material({ texture: textures.fur, color: [1, 0.9, 0.78] }),
    paper: new Material({ texture: textures.paper, color: [1, 1, 1] }),
    dark: new Material({ texture: textures.dark, color: [0.95, 0.95, 1.0] }),
    black: new Material({ texture: textures.black, color: [1, 1, 1] }),
    plastic: new Material({ texture: textures.plastic, color: [0.82, 0.92, 1] }),
    rug: new Material({ texture: textures.rug, color: [1, 1, 1] }),
    blueGlow: new Material({ texture: textures.blueGlow, color: [0.7, 0.9, 1.4], alpha: .74, emissive: 1.2, transparent: true }),
    glass: new Material({ texture: whiteTex, color: [0.72, 0.9, 1.0], alpha: .28, emissive: .16, transparent: true }),
    amber: new Material({ texture: whiteTex, color: [1.0, 0.68, 0.18], alpha: .26, emissive: 1.0, transparent: true }),
    warmGlow: new Material({ texture: whiteTex, color: [1.0, 0.55, 0.18], alpha: .18, emissive: .78, transparent: true }),
    shadow: new Material({ texture: whiteTex, color: [0.025, 0.018, 0.014], alpha: .34, transparent: true }),
    hazard: new Material({ texture: textures.hazard, color: [1, 1, 1] }),
    softWhite: new Material({ texture: whiteTex, color: [1.0, 0.97, 0.9] }),
    red: new Material({ texture: whiteTex, color: [1, 0.18, 0.12], emissive: .15 }),
    green: new Material({ texture: whiteTex, color: [0.1, 0.9, 0.42], emissive: .08 })
  };

  const objects = [];
  const transparentObjects = [];
  const interactables = [];

  function addObject(mesh, material, opts) {
    const obj = new RenderObject(mesh, material, opts || {});
    objects.push(obj);
    if (material.transparent) transparentObjects.push(obj);
    return obj;
  }

  function addBox(name, pos, scale, mat, rotY = 0) {
    return addObject(meshes.box, mat, { name, pos, scale, rot: [0, rotY, 0] });
  }

  function addSphere(name, pos, scale, mat, rot = [0, 0, 0]) {
    return addObject(meshes.sphere, mat, { name, pos, scale, rot });
  }

  function addCylinder(name, pos, scale, mat, rot = [0, 0, 0], mesh = meshes.cylinder) {
    return addObject(mesh, mat, { name, pos, scale, rot });
  }

  function playerForward() {
    const cp = Math.cos(player.pitch);
    return [Math.sin(player.yaw) * cp, Math.sin(player.pitch), -Math.cos(player.yaw) * cp];
  }
  function playerForwardFlat() { return [Math.sin(player.yaw), 0, -Math.cos(player.yaw)]; }
  function playerRightFlat() { return [Math.cos(player.yaw), 0, Math.sin(player.yaw)]; }

  const initialState = () => ({
    started: false,
    ended: false,
    freezerOpen: false,
    bananaFound: false,
    bananaLocation: 'freezer',
    hasGloves: false,
    towelNest: false,
    evidenceLogged: false,
    named: false,
    calledMom: false,
    askedExperts: false,
    catTrust: 45,
    care: 12,
    evidence: 0,
    containment: 0,
    spectacle: 0,
    scream: 18,
    objective: 'Find your kitten. The freezer is making a noise legally distinct from normal appliance behavior.',
    lastPrompt: '',
    shake: 0,
    freeLookHint: true
  });
  let state = initialState();

  const player = {
    pos: [0, 1.62, 3.75],
    yaw: 0,
    pitch: -0.04,
    velocity: [0, 0, 0]
  };

  // ---------------------------------------------------------------------------
  // Scene construction
  // ---------------------------------------------------------------------------

  // Room shell
  addBox('floor', [0, -0.035, 0], [12.2, 0.07, 12.2], materials.tile);
  addBox('ceiling', [0, 3.02, 0], [12.2, 0.07, 12.2], materials.wall);
  addBox('back wall', [0, 1.5, -6.05], [12.2, 3.0, 0.12], materials.wall);
  addBox('front wall', [0, 1.5, 6.05], [12.2, 3.0, 0.12], materials.wall);
  addBox('left wall', [-6.05, 1.5, 0], [0.12, 3.0, 12.2], materials.wall);
  addBox('right wall', [6.05, 1.5, 0], [0.12, 3.0, 12.2], materials.wall);

  // Wall polish: baseboards, upper rails, and a few thin panel seams give the room
  // readable depth on both phone and desktop instead of one cursed landlord-gray box.
  addBox('back baseboard', [0, 0.34, -5.965], [11.75, 0.16, 0.09], materials.wood);
  addBox('front baseboard', [0, 0.34, 5.965], [11.75, 0.16, 0.09], materials.wood);
  addBox('left baseboard', [-5.965, 0.34, 0], [0.09, 0.16, 11.75], materials.wood);
  addBox('right baseboard', [5.965, 0.34, 0], [0.09, 0.16, 11.75], materials.wood);
  addBox('back picture rail', [0, 2.33, -5.955], [11.4, 0.07, 0.07], materials.softWhite);
  addBox('front picture rail', [0, 2.33, 5.955], [11.4, 0.07, 0.07], materials.softWhite);
  addBox('left picture rail', [-5.955, 2.33, 0], [0.07, 0.07, 11.4], materials.softWhite);
  addBox('right picture rail', [5.955, 2.33, 0], [0.07, 0.07, 11.4], materials.softWhite);
  for (const x of [-3.0, 0.0, 3.0]) {
    addBox('back wall vertical seam', [x, 1.45, -5.948], [0.035, 1.62, 0.035], materials.softWhite);
    addBox('front wall vertical seam', [x, 1.45, 5.948], [0.035, 1.62, 0.035], materials.softWhite);
  }
  for (const z of [-3.0, 0.0, 3.0]) {
    addBox('left wall vertical seam', [-5.948, 1.45, z], [0.035, 1.62, 0.035], materials.softWhite);
    addBox('right wall vertical seam', [5.948, 1.45, z], [0.035, 1.62, 0.035], materials.softWhite);
  }
  addBox('weird framed banana notice frame', [-2.55, 1.74, -5.925], [1.28, 0.92, 0.05], materials.wood);
  addBox('weird framed banana notice paper', [-2.55, 1.74, -5.89], [1.10, 0.74, 0.035], materials.paper);
  addBox('tiny freezer policy placard', [5.92, 1.68, -2.2], [0.05, 0.58, 0.92], materials.paper);
  addBox('blue rug', [-0.5, 0.012, 2.65], [4.2, 0.035, 2.5], materials.rug);

  // Mood lighting and set dressing: warm kitchen stage, cold freezer shrine.
  addCylinder('ceiling lamp cord', [-2.5, 2.82, 1.6], [0.025, 0.30, 0.025], materials.dark);
  addSphere('warm pendant lamp globe', [-2.5, 2.53, 1.6], [0.48, 0.24, 0.48], materials.amber);
  addBox('warm lamp floor spill', [-2.5, 0.018, 1.55], [3.25, 0.025, 2.35], materials.warmGlow);
  addBox('soft corner shadow back left', [-5.5, 0.026, -5.25], [1.1, 0.025, 1.3], materials.shadow);
  addBox('soft corner shadow back right', [5.35, 0.026, -5.25], [1.25, 0.025, 1.2], materials.shadow);
  addBox('night window recess', [5.94, 1.62, 2.55], [0.05, 1.16, 1.72], materials.black);
  addBox('moonlit window glass', [5.88, 1.62, 2.55], [0.045, 0.96, 1.46], materials.blueGlow);
  addBox('window vertical mullion', [5.84, 1.62, 2.55], [0.06, 1.08, 0.045], materials.wood);
  addBox('window horizontal mullion', [5.84, 1.62, 2.55], [0.06, 0.045, 1.58], materials.wood);
  addBox('window lower sill', [5.76, 1.02, 2.55], [0.18, 0.08, 1.78], materials.wood);

  // Kitchen counters, cabinets, sink.
  addBox('left lower cabinets', [-5.45, 0.43, -3.2], [0.9, 0.86, 4.55], materials.wood);
  addBox('left countertop', [-5.35, 0.92, -3.2], [1.1, 0.16, 4.75], materials.dark);
  addBox('sink basin', [-5.18, 1.02, -3.62], [0.74, 0.11, 0.68], materials.metal);
  addBox('sink water darkness', [-5.17, 1.09, -3.62], [0.58, 0.04, 0.48], materials.black);
  addCylinder('faucet neck', [-5.14, 1.28, -3.92], [0.06, 0.32, 0.06], materials.metal, [Math.PI / 2, 0, 0], meshes.cylinder);
  addBox('upper cabinets', [-5.53, 2.25, -3.8], [0.65, 0.82, 2.2], materials.wood);
  for (const z of [-4.75, -3.95, -3.15, -2.35, -1.55]) {
    addBox('lower cabinet brass pull', [-4.88, 0.72, z], [0.035, 0.045, 0.34], materials.metal);
  }
  for (const z of [-4.45, -3.55, -2.65]) {
    addBox('upper cabinet brass pull', [-5.13, 2.22, z], [0.035, 0.05, 0.32], materials.metal);
  }
  addBox('warm under cabinet light', [-5.12, 1.78, -3.35], [0.06, 0.035, 2.85], materials.warmGlow);
  addBox('table', [-1.1, 0.74, -0.65], [2.0, 0.16, 1.35], materials.wood);
  addCylinder('table leg 1', [-1.95, 0.36, -1.22], [0.07, 0.72, 0.07], materials.wood);
  addCylinder('table leg 2', [-0.25, 0.36, -1.22], [0.07, 0.72, 0.07], materials.wood);
  addCylinder('table leg 3', [-1.95, 0.36, -0.08], [0.07, 0.72, 0.07], materials.wood);
  addCylinder('table leg 4', [-0.25, 0.36, -0.08], [0.07, 0.72, 0.07], materials.wood);

  // Freezer/fridge body.
  addBox('fridge body', [3.7, 1.27, -5.49], [1.75, 2.54, 0.95], materials.metal);
  addBox('fridge side shade', [4.63, 1.28, -5.0], [0.12, 2.48, 0.86], materials.dark);
  const freezerDoorClosed = addBox('freezer door closed', [3.7, 1.86, -4.94], [1.68, 1.08, 0.13], materials.metal);
  const fridgeLowerDoor = addBox('lower fridge door', [3.7, 0.74, -4.92], [1.68, 1.13, 0.13], materials.metal);
  addBox('freezer handle', [4.36, 1.88, -4.82], [0.10, 0.62, 0.08], materials.softWhite);
  addBox('fridge handle', [4.36, 0.72, -4.80], [0.10, 0.70, 0.08], materials.softWhite);
  const freezerInterior = addBox('freezer glowing interior', [3.7, 1.83, -4.94], [1.54, 0.92, 0.35], materials.frost);
  freezerInterior.visible = false;
  const freezerShelf = addBox('freezer shelf', [3.7, 1.75, -4.62], [1.5, 0.05, 0.55], materials.plastic);
  freezerShelf.visible = false;
  const freezerDoorOpen = addBox('freezer open door', [4.55, 1.82, -4.5], [0.13, 1.08, 0.94], materials.metal, -0.58);
  freezerDoorOpen.visible = false;
  const freezerGlow = addObject(meshes.plane, materials.blueGlow, { name: 'blue freezer glow', pos: [3.72, 1.85, -4.50], rot: [Math.PI / 2, 0, 0], scale: [1.75, 1.1, 1] });
  freezerGlow.visible = false;
  const freezerFloorGlow = addBox('cold freezer spill on floor', [3.65, 0.032, -4.12], [2.15, 0.025, 1.35], materials.blueGlow);
  freezerFloorGlow.visible = false;

  const frozenFood = [];
  function freezerFood(name, x, y, z, sx, sy, sz, mat) {
    const obj = addBox(name, [x, y, z], [sx, sy, sz], mat, Math.random() * 0.2 - 0.1);
    obj.visible = false;
    frozenFood.push(obj);
    return obj;
  }
  freezerFood('peas bag', 3.18, 2.08, -4.58, 0.42, 0.22, 0.24, materials.green);
  freezerFood('mystery brick', 3.78, 2.1, -4.61, 0.54, 0.25, 0.25, materials.plastic);
  freezerFood('ice cream tub', 4.15, 1.57, -4.6, 0.45, 0.34, 0.37, materials.paper);
  freezerFood('frozen ethical vegetables', 3.38, 1.55, -4.57, 0.44, 0.2, 0.3, materials.plastic);

  // Countertop interactable props.
  addBox('towel folded', [-5.24, 1.08, -1.76], [0.62, 0.12, 0.48], materials.softWhite);
  addBox('phone', [-5.25, 1.08, -2.45], [0.32, 0.035, 0.58], materials.black, 0.08);
  addBox('phone glass', [-5.245, 1.105, -2.45], [0.28, 0.012, 0.51], materials.blueGlow, 0.08);
  addBox('clipboard', [-5.22, 1.09, -4.55], [0.56, 0.045, 0.8], materials.wood, -0.05);
  addBox('clipboard paper', [-5.225, 1.125, -4.55], [0.48, 0.028, 0.68], materials.paper, -0.05);
  addBox('evidence box base', [-4.88, 1.15, -0.65], [0.72, 0.34, 0.56], materials.plastic);
  const evidenceBoxLid = addBox('evidence box clear lid', [-4.88, 1.38, -0.65], [0.78, 0.08, 0.62], materials.glass);
  addBox('hazard stripe on box', [-4.88, 1.55, -0.65], [0.80, 0.09, 0.08], materials.hazard);
  addCylinder('blender jar', [-5.14, 1.34, -5.0], [0.28, 0.52, 0.28], materials.glass, [0, 0, 0], meshes.cylinder);
  addBox('blender base', [-5.14, 1.03, -5.0], [0.5, 0.28, 0.46], materials.metal);
  addBox('trash can', [5.32, 0.45, -1.4], [0.72, 0.9, 0.72], materials.dark);
  addBox('legal papers', [-0.05, 0.86, -0.62], [0.48, 0.035, 0.62], materials.paper, 0.35);
  addBox('tiny passport doodle', [0.04, 0.90, -0.56], [0.18, 0.018, 0.25], materials.blueGlow, 0.35);
  addBox('front door', [-3.4, 1.2, 6.00], [1.2, 2.35, 0.08], materials.wood);
  addBox('front door knob', [-2.92, 1.2, 5.92], [0.11, 0.11, 0.11], materials.metal);

  // Kitten geometry.
  const catParts = [];
  function catPart(obj) { catParts.push(obj); return obj; }
  catPart(addSphere('cat body', [0.05, 0.28, 2.42], [0.72, 0.38, 0.42], materials.fur, [0, 0.35, 0]));
  catPart(addSphere('cat head', [-0.35, 0.55, 2.28], [0.36, 0.32, 0.34], materials.fur, [0, 0.2, 0]));
  catPart(addCylinder('cat ear left', [-0.48, 0.83, 2.22], [0.12, 0.24, 0.12], materials.fur, [0.18, 0.05, 0.18], meshes.cone));
  catPart(addCylinder('cat ear right', [-0.23, 0.83, 2.19], [0.12, 0.24, 0.12], materials.fur, [0.16, 0.05, -0.18], meshes.cone));
  catPart(addSphere('cat eye left', [-0.47, 0.6, 1.98], [0.045, 0.045, 0.032], materials.black));
  catPart(addSphere('cat eye right', [-0.25, 0.6, 1.97], [0.045, 0.045, 0.032], materials.black));
  catPart(addSphere('cat nose', [-0.36, 0.52, 1.94], [0.035, 0.026, 0.024], materials.red));
  catPart(addCylinder('cat tail base', [0.55, 0.44, 2.52], [0.08, 0.52, 0.08], materials.fur, [0.8, 0.6, 0.2], meshes.cylinder));
  catPart(addCylinder('cat tail tip', [0.83, 0.76, 2.65], [0.06, 0.36, 0.06], materials.fur, [1.0, 0.85, -0.15], meshes.cylinder));
  catPart(addBox('cat shadow', [0.12, 0.024, 2.45], [1.35, 0.03, 0.78], new Material({ texture: whiteTex, color: [0.05, 0.04, 0.035], alpha: .42, transparent: true })));
  addBox('cat bowl', [0.98, 0.09, 2.02], [0.5, 0.12, 0.5], materials.metal);
  addBox('cat toy banana', [-0.72, 0.09, 2.72], [0.42, 0.08, 0.14], materials.banana, 0.7);

  // The actual banana object and scream rings.
  const bananaObj = addObject(meshes.banana, materials.banana, {
    name: 'screaming banana',
    pos: [3.42, 1.84, -4.32],
    rot: [0.0, 0.12, 1.72],
    scale: [0.48, 0.48, 0.48],
    update: updateBananaTransform
  });
  bananaObj.visible = false;

  const screamRings = [];
  for (let i = 0; i < 4; i++) {
    const ring = addObject(meshes.ring, materials.amber, {
      name: 'scream ring ' + i,
      pos: [3.42, 1.84, -4.28],
      rot: [0, 0, 0],
      scale: [1, 1, 1],
      update: obj => updateScreamRing(obj, i),
      sort: 10
    });
    ring.visible = false;
    screamRings.push(ring);
  }

  const frostBits = [];
  for (let i = 0; i < 52; i++) {
    const obj = addBox('floating frost ' + i, [3.15 + Math.random() * 1.12, 1.45 + Math.random() * 1.05, -4.1 + Math.random() * .6], [0.018, 0.018, 0.018], materials.glass);
    obj.visible = false;
    obj.update = o => {
      if (!state.freezerOpen) { o.visible = false; return; }
      o.visible = true;
      const motion = prefersReducedMotion ? 0.28 : 1;
      o.pos[1] += Math.sin(time * 0.9 + i * 9.1) * 0.0009 * motion;
      o.pos[0] += Math.sin(time * 0.7 + i) * 0.0007 * motion;
      o.rot[1] = time * .2 + i;
    };
    frostBits.push(obj);
  }

  function updateFreezerVisuals() {
    freezerDoorClosed.visible = !state.freezerOpen;
    freezerInterior.visible = state.freezerOpen;
    freezerShelf.visible = state.freezerOpen;
    freezerDoorOpen.visible = state.freezerOpen;
    freezerGlow.visible = state.freezerOpen;
    freezerFloorGlow.visible = state.freezerOpen;
    for (const f of frozenFood) f.visible = state.freezerOpen;
  }

  function currentBananaWorldPos() {
    if (state.bananaLocation === 'held') {
      const f = playerForward();
      const r = playerRightFlat();
      return [player.pos[0] + f[0] * 0.72 + r[0] * 0.33, player.pos[1] - 0.36 + f[1] * 0.18, player.pos[2] + f[2] * 0.72 + r[2] * 0.33];
    }
    if (state.bananaLocation === 'counter') return [-5.03, 1.18, -2.98];
    if (state.bananaLocation === 'box') return [-4.88, 1.45, -0.65];
    if (state.bananaLocation === 'freezer') return [3.42, 1.84, -4.32];
    return [0, -100, 0];
  }

  function updateBananaTransform(obj) {
    obj.visible = state.bananaFound || (state.freezerOpen && state.bananaLocation === 'freezer');
    if (!obj.visible || state.bananaLocation === 'none') return;
    const bp = currentBananaWorldPos();
    obj.pos[0] = bp[0]; obj.pos[1] = bp[1]; obj.pos[2] = bp[2];
    const quiver = Math.sin(time * (8 + state.scream * .07)) * 0.035 * (state.scream / 100);
    if (state.bananaLocation === 'held') {
      obj.rot[0] = 0.22 + player.pitch * 0.35 + quiver;
      obj.rot[1] = player.yaw + 0.25;
      obj.rot[2] = 1.4 + quiver * 2;
      obj.scale = [0.44, 0.44, 0.44];
    } else if (state.bananaLocation === 'counter') {
      obj.rot[0] = 0.05 + quiver;
      obj.rot[1] = -0.8;
      obj.rot[2] = 1.58 + quiver * 2;
      obj.scale = [0.46, 0.46, 0.46];
    } else if (state.bananaLocation === 'box') {
      obj.rot[0] = 0.03 + quiver;
      obj.rot[1] = 0.25;
      obj.rot[2] = 1.63 + quiver;
      obj.scale = [0.37, 0.37, 0.37];
    } else {
      obj.rot[0] = 0.0 + quiver;
      obj.rot[1] = 0.12;
      obj.rot[2] = 1.72 + quiver * 2;
      obj.scale = [0.48, 0.48, 0.48];
    }
  }

  function updateScreamRing(obj, idx) {
    const active = state.bananaFound && state.scream > 8 && state.bananaLocation !== 'none';
    obj.visible = active;
    if (!active) return;
    const bp = currentBananaWorldPos();
    obj.pos = [bp[0], bp[1] + 0.05, bp[2]];
    obj.rot[0] = Math.PI / 2 - player.pitch * .35;
    obj.rot[1] = player.yaw;
    const wave = (time * 0.82 + idx * 0.25) % 1;
    const s = 0.35 + wave * 1.8;
    obj.scale = [s, s, s];
    obj.material.alpha = (1 - wave) * (state.scream / 100) * (prefersReducedMotion ? 0.09 : 0.34);
  }

  function registerInteractable(data) { interactables.push(data); return data; }

  registerInteractable({
    id: 'kitten', label: 'Miso the kitten', pos: [0.0, 0.55, 2.35], radius: 1.6,
    enabled: () => true,
    action: () => {
      playMeow();
      state.catTrust = clamp(state.catTrust + 10, 0, 100);
      if (!state.bananaFound) {
        message('Miso points one paw at the freezer with the grave authority of a very small magistrate. Objective updated: investigate the appliance that is screaming like a tiny lawsuit.');
        state.objective = 'Investigate the freezer. Miso has entered the record as Witness Cat A.';
      } else if (state.bananaLocation === 'held') {
        message('Miso sniffs the banana, makes eye contact with you, and declines both consumption and legal representation. Cat trust +10.');
      } else {
        message('Miso sits beside the evidence with unsettling professionalism. The cat appears to understand chain of custody better than most adults.');
      }
    }
  });

  registerInteractable({
    id: 'freezer', label: 'freezer door', pos: [3.7, 1.75, -4.28], radius: 2.0,
    enabled: () => !state.ended,
    action: () => {
      if (!state.freezerOpen) {
        openFreezer();
      } else if (state.bananaLocation === 'held') {
        showChoices('The freezer exhales blue courtroom air.', 'Returning the banana to cold storage might preserve evidence. It might also be torture. The essays would all begin sweating.', [
          { text: 'Put the live screaming banana back in the freezer.', fn: () => ending('Freezer Habeas Corpus', 'You put it back. The scream becomes muffled, then bureaucratic. Somewhere, a temperature-sensitive ethics committee drafts a dissent.<br><br><b>Result:</b> evidence preserved badly, care damaged, metaphysics not solved.') },
          { text: 'Do not refrigerate it while it is still screaming.', fn: () => { closeChoices(); addCare(7); message('You refuse to treat refrigeration as automatically neutral. The banana continues screaming, but with slightly more procedural dignity.'); } }
        ]);
      } else if (state.bananaLocation === 'freezer') {
        message('The freezer is open. The banana is right there, screaming through a face no fruit should have budgeted for. Aim at it and interact.');
      } else {
        message('The freezer hums innocently, which feels like perjury.');
      }
    }
  });

  registerInteractable({
    id: 'banana', label: 'screaming banana', pos: () => currentBananaWorldPos(), radius: 1.2,
    enabled: () => state.freezerOpen && state.bananaLocation === 'freezer' && !state.bananaFound,
    action: () => {
      state.bananaFound = true;
      state.bananaLocation = 'held';
      state.scream = 78;
      state.care = clamp(state.care + 5, 0, 100);
      state.shake = 0.8;
      state.objective = 'You are now holding a category error. Document, isolate, avoid irreversible harm, and do not let the blender become a philosopher.';
      message('You grab the banana. It screams directly into the part of your soul where normal grocery categories used to live. New objective: decide what to do without becoming history’s worst smoothie artist.');
      playSqueal(0.6);
    }
  });

  registerInteractable({
    id: 'towel', label: 'clean towel', pos: [-5.22, 1.10, -1.78], radius: 1.25,
    enabled: () => true,
    action: () => {
      if (state.bananaLocation === 'held') {
        if (!state.towelNest) {
          state.towelNest = true;
          addCare(16); lowerScream(14); addContainment(4);
          message('You wrap the banana in a clean towel without squeezing. This is not full legal personhood. It is basic non-harm with terry cloth.');
        } else message('The towel nest is already doing its small, absorbent duty.');
      } else message('A clean towel waits for the moment when absurdity needs bedding.');
    }
  });

  registerInteractable({
    id: 'clipboard', label: 'clipboard / chain-of-custody log', pos: [-5.22, 1.18, -4.55], radius: 1.35,
    enabled: () => true,
    action: () => {
      if (!state.bananaFound) {
        message('The clipboard is blank. It feels disappointed, but professionally.');
      } else if (!state.evidenceLogged) {
        state.evidenceLogged = true;
        addEvidence(34); addContainment(5);
        state.objective = state.bananaLocation === 'box' ? 'Use the phone and call experts in boring procedural language.' : 'Isolate the banana gently, then call experts in boring procedural language.';
        message('You start an evidence log: time, location, freezer temperature, witness cat, continuous distress vocalization. Documentation is not vanity; it is care wearing reading glasses.');
      } else {
        addEvidence(3);
        message('You add another timestamp. The clipboard becomes powerful enough to frighten a small municipality.');
      }
    }
  });

  registerInteractable({
    id: 'phone', label: 'phone', pos: [-5.22, 1.15, -2.45], radius: 1.25,
    enabled: () => true,
    action: () => {
      if (!state.bananaFound) {
        showChoices('Your phone has normal-phone confidence.', 'It offers several bad ways to make the situation less believable.', [
          { text: 'Take a selfie with the quiet freezer.', fn: () => { closeChoices(); message('You take no selfie. Even before the banana, restraint was available as a lifestyle.'); } },
          { text: 'Put the phone down.', fn: closeChoices }
        ]);
        return;
      }
      showChoices('Phone: choose your public relationship to the impossible.', 'The correct tone is competent incident report, not prophecy with fruit.', [
        { text: 'Call experts using boring procedural language.', fn: callExperts },
        { text: 'Record raw evidence without posting it.', fn: () => { closeChoices(); addEvidence(18); lowerScream(2); message('You record raw video and audio. No filters, no captions, no “GUYS YOU WON’T BELIEVE THIS.” Evidence becomes the bridge between the banana and the world that will not believe it.'); } },
        { text: 'Livestream it: “SCREAMING BANANA IN MY FREEZER???”', fn: () => ending('Worst Documentary Ever Filmed', 'You livestream the banana. The chat immediately asks if it can vote, whether you are on drugs, and if anyone has tried making bread out of it.<br><br><b>Result:</b> spectacle wins. The banana becomes content before it becomes cared for.') },
        { text: state.named ? 'Whisper “Hang in there, Bananjamin.”' : 'Privately name it Bananjamin.', fn: () => { closeChoices(); if (!state.named) { state.named = true; addCare(7); lowerScream(4); message('You privately name it Bananjamin. The name is objectively stupid and therefore emotionally load-bearing. You do not put it in the official incident report.'); } else { addCare(2); message('Bananjamin screams with the faint dignity of a witness whose nickname will never survive peer review.'); } } },
        { text: 'Call your mom.', fn: () => { closeChoices(); state.calledMom = true; state.spectacle += 2; message('Your mom asks whether you have recently slept. This is not helpful, but it is statistically reasonable.'); } }
      ]);
    }
  });

  registerInteractable({
    id: 'evidenceBox', label: 'ventilated evidence box', pos: [-4.88, 1.35, -0.65], radius: 1.45,
    enabled: () => true,
    action: () => {
      if (state.bananaLocation === 'held' || state.bananaLocation === 'counter') {
        state.bananaLocation = 'box';
        addContainment(36); addCare(state.towelNest ? 12 : 7); lowerScream(state.towelNest ? 16 : 9);
        state.objective = state.evidenceLogged ? 'Now call experts in boring procedural language.' : 'Good: isolated. Now document the encounter before calling experts.';
        message(state.towelNest ?
          'You place the towel-wrapped banana in the ventilated box. Containment and care finally shake hands without making eye contact.' :
          'You place the banana in the ventilated evidence box. It is not cozy, but it is not the blender, and ethics often begins there.');
      } else if (state.bananaLocation === 'box') {
        message('The banana is already isolated. The box emits the grim administrative dignity owed to produce that screams.');
      } else {
        message('A ventilated evidence box waits on the counter. It looks like Tupperware that has read bioethics.');
      }
    }
  });

  registerInteractable({
    id: 'counter', label: 'clear counter space', pos: [-5.12, 1.12, -3.15], radius: 1.4,
    enabled: () => true,
    action: () => {
      if (state.bananaLocation === 'held') {
        state.bananaLocation = 'counter'; addCare(4); lowerScream(5);
        message('You set the banana down gently on a clean counter. The counter did not consent to becoming a metaphysical triage surface, but neither did anyone else.');
      } else if (state.bananaLocation === 'counter') {
        state.bananaLocation = 'held';
        message('You pick the banana back up with slow, non-smoothie intentions.');
      } else message('The counter is clean enough to make a witness statement, which is all anyone can ask of laminate.');
    }
  });

  registerInteractable({
    id: 'blender', label: 'blender', pos: [-5.14, 1.23, -5.0], radius: 1.35,
    enabled: () => true,
    action: () => {
      if (state.bananaFound && (state.bananaLocation === 'held' || state.bananaLocation === 'counter')) {
        showChoices('The blender sits there with appalling confidence.', 'There is no ethically serious version of “test by smoothie.”', [
          { text: 'Test by smoothie.', fn: () => ending('No Ethically Serious Smoothie', 'You choose appliance epistemology. The scream becomes a thesis nobody should have written.<br><br><b>Result:</b> catastrophic irreversible harm, maximum shame, minimum science.') },
          { text: 'Unplug the blender and turn it to face the wall.', fn: () => { closeChoices(); addContainment(6); addCare(4); message('You unplug the blender and rotate it toward the wall like a disgraced philosopher. The kitchen feels safer.'); } },
          { text: 'Back away from the machine of bad ideas.', fn: closeChoices }
        ]);
      } else message('The blender is quiet. This is the best thing about it.');
    }
  });

  registerInteractable({
    id: 'sink', label: 'sink / folk medicine hazard', pos: [-5.15, 1.15, -3.62], radius: 1.35,
    enabled: () => true,
    action: () => {
      if (state.bananaFound) {
        addCare(3); addContainment(2);
        message('You consider water, antiseptic, essential oils, prayers with forceful hand gestures, and banana first aid. You administer none of them. Good.');
      } else message('The sink offers ordinary water to an increasingly non-ordinary day.');
    }
  });

  registerInteractable({
    id: 'trash', label: 'trash can', pos: [5.32, 0.8, -1.4], radius: 1.45,
    enabled: () => true,
    action: () => {
      if (state.bananaLocation === 'held') {
        showChoices('Trash can: the fastest route to moral evidence destruction.', 'Discarding the banana would solve your inconvenience and almost nothing else.', [
          { text: 'Throw it away.', fn: () => ending('The Trash Can Inquiry', 'You discard the screaming banana. The trash can becomes an unlicensed detention facility with banana acoustics.<br><br><b>Result:</b> irreversible neglect, zero chain of custody, one very judgmental kitten.') },
          { text: 'Do not solve ethics with sanitation infrastructure.', fn: () => { closeChoices(); addCare(5); message('You step away from the trash. Somewhere, taxonomy is still doing paperwork, but at least you are not helping it shred documents.'); } }
        ]);
      } else message('The trash can waits for normal trash, a concept that has taken heavy damage today.');
    }
  });

  registerInteractable({
    id: 'gloves', label: 'nitrile gloves cabinet', pos: [-5.48, 2.08, -2.86], radius: 1.5,
    enabled: () => true,
    action: () => {
      if (!state.hasGloves) {
        state.hasGloves = true;
        addContainment(12); addEvidence(6);
        message('You put on nitrile gloves. Not because gloves solve metaphysics, but because fingerprints on the impossible are still fingerprints.');
      } else message('You are already gloved. You look slightly more credible and only slightly more insane.');
    }
  });

  registerInteractable({
    id: 'legalForms', label: 'legal papers / tiny passport doodle', pos: [0.0, 0.92, -0.62], radius: 1.35,
    enabled: () => true,
    action: () => {
      if (state.bananaFound) {
        addCare(2);
        message('You draft provisional safeguards: non-consumption, non-destruction, stable conditions, representation of interests. Not voting rights. Not a Senate seat. Not a tiny passport.');
      } else message('The legal papers are currently about renter’s insurance. Soon, maybe produce habeas corpus.');
    }
  });

  registerInteractable({
    id: 'frontDoor', label: 'front door', pos: [-3.4, 1.2, 5.75], radius: 1.4,
    enabled: () => true,
    action: () => {
      if (state.askedExperts && state.bananaLocation === 'box' && state.evidenceLogged) {
        ending('Temporary Guardian, Successful Handoff', 'You wait by the door with the banana isolated, documented, and not converted into breakfast. The experts arrive expecting a hoax and leave using the phrase “banana-like morphology.”<br><br><b>Result:</b> best available outcome under radical uncertainty. Miso is listed as Witness Cat A.');
      } else if (state.bananaFound) {
        message('Leaving now would convert one apartment-sized mystery into a municipal incident. Better isolate, document, and call before traveling with a screaming produce patient.');
      } else message('The front door is available, but curiosity and one small cat are not done with you.');
    }
  });

  // ---------------------------------------------------------------------------
  // Game logic and UI
  // ---------------------------------------------------------------------------

  function openFreezer() {
    state.freezerOpen = true;
    state.scream = 62;
    state.shake = 0.52;
    updateFreezerVisuals();
    playSqueal(0.45);
    state.objective = 'Aim at the banana and interact to grab it. Then figure out what to do with the least irreversible stupidity.';
    message('The freezer opens. Inside: peas, ice cream, and a banana with a face screaming like a grant proposal from hell.');
  }

  function callExperts() {
    closeChoices();
    state.askedExperts = true;
    state.spectacle = Math.max(0, state.spectacle - 3);
    if (state.bananaLocation === 'box' && state.evidenceLogged) {
      addEvidence(8); addContainment(8); lowerScream(6);
      ending('Boring Language Victory', 'You say: “I have encountered an unknown biological entity with banana-like morphology, a small human-like face, and continuous distress vocalization. I have raw documentation and a temporary containment setup.”<br><br>The person on the line pauses, then asks for timestamps. Against all odds, the impossible has entered paperwork without becoming a freak show.<br><br><b>Result:</b> care, containment, and documentation align. Miso receives no tiny passport but remains morally important.');
    } else if (!state.evidenceLogged && state.bananaLocation !== 'box') {
      message('The expert line asks for raw documentation and gentle isolation. You have neither. The banana screams in a way that sounds like a rejected grant abstract.');
      state.objective = 'Document the encounter and place the banana in the ventilated evidence box.';
    } else if (!state.evidenceLogged) {
      message('The expert line believes you approximately 0.7%. Start the chain-of-custody log on the clipboard and call back with timestamps.');
      state.objective = 'Start a chain-of-custody log on the clipboard.';
    } else {
      message('The expert line asks you to isolate it gently before anyone decides whether this is biology, hoax, or breakfast with standing. Use the evidence box.');
      state.objective = 'Place the banana in the ventilated evidence box, then call again.';
    }
  }

  function addCare(v) { state.care = clamp(state.care + v, 0, 100); }
  function addEvidence(v) { state.evidence = clamp(state.evidence + v, 0, 100); }
  function addContainment(v) { state.containment = clamp(state.containment + v, 0, 100); }
  function lowerScream(v) { state.scream = clamp(state.scream - v, 0, 100); }

  let toastTimer = 0;
  function message(text, duration = 6.5) {
    toastEl.textContent = text;
    toastEl.classList.add('show');
    toastTimer = duration;
  }

  function showChoices(title, text, choices) {
    choiceTitle.textContent = title;
    choiceText.textContent = text;
    choicesEl.innerHTML = '';
    for (const ch of choices) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = ch.text;
      b.addEventListener('click', ch.fn);
      choicesEl.appendChild(b);
    }
    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'secondary';
    cancel.textContent = 'Step back.';
    cancel.addEventListener('click', closeChoices);
    choicesEl.appendChild(cancel);
    choiceOverlay.style.display = 'flex';
  }

  function closeChoices() { choiceOverlay.style.display = 'none'; }

  function ending(title, text) {
    closeChoices();
    state.ended = true;
    state.scream = 0;
    endingTitle.textContent = title;
    const score = Math.round((state.care + state.evidence + state.containment + state.catTrust - state.spectacle) / 4);
    endingText.innerHTML = `<p>${text}</p><p><b>Incident Score:</b> ${score}/100<br><b>Care:</b> ${state.care} · <b>Evidence:</b> ${state.evidence} · <b>Containment:</b> ${state.containment} · <b>Cat Trust:</b> ${state.catTrust} · <b>Spectacle:</b> ${state.spectacle}</p>`;
    endingScreen.style.display = 'flex';
  }

  let lastObjectiveHtml = '';
  let lastStatsHtml = '';
  function updateHUD() {
    const objectiveHtml = `<b>Objective:</b> ${state.objective}<br><span style="opacity:.75">Holding: ${state.bananaLocation === 'held' ? (state.named ? 'Bananjamin' : 'the screaming banana') : 'nothing'} · Gloves: ${state.hasGloves ? 'yes' : 'no'} · Evidence log: ${state.evidenceLogged ? 'started' : 'not yet'}</span>`;
    if (objectiveHtml !== lastObjectiveHtml) {
      objectiveEl.innerHTML = objectiveHtml;
      lastObjectiveHtml = objectiveHtml;
    }
    const bar = (label, value) => `${label}<span class="bar"><span class="fill" style="width:${clamp(value, 0, 100)}%"></span></span>`;
    const statsHtml = `${bar('Care', state.care)}<br>${bar('Evidence', state.evidence)}<br>${bar('Containment', state.containment)}<br>${bar('Scream', state.scream)}<br>${bar('Cat trust', state.catTrust)}`;
    if (statsHtml !== lastStatsHtml) {
      statsEl.innerHTML = statsHtml;
      lastStatsHtml = statsHtml;
    }
  }

  let targetInteractable = null;
  function updateTarget() {
    targetInteractable = null;
    if (!state.started || state.ended || choiceOverlay.style.display === 'flex') return;
    const eye = player.pos;
    const forward = playerForward();
    let bestScore = Infinity;
    for (const item of interactables) {
      if (item.enabled && !item.enabled()) continue;
      const pos = typeof item.pos === 'function' ? item.pos() : item.pos;
      const to = V3.sub(pos, eye);
      const dist = V3.length(to);
      if (dist > item.radius + 2.1) continue;
      const dir = V3.normalize(to);
      const dot = V3.dot(forward, dir);
      if (dot < 0.55) continue;
      const score = dist - dot * 1.25;
      if (score < bestScore) { bestScore = score; targetInteractable = item; }
    }
    if (targetInteractable) {
      promptEl.innerHTML = `<b>${targetInteractable.label}</b><br>${isCoarsePointer ? 'Tap INTERACT' : 'Press E or click'} to interact.`;
      promptEl.classList.add('show');
    } else {
      promptEl.classList.remove('show');
    }
  }

  function interact() {
    if (!state.started || state.ended) return;
    if (choiceOverlay.style.display === 'flex') return;
    updateTarget();
    if (targetInteractable) targetInteractable.action();
    else message('You interact with empty air. Empty air submits no statement.');
  }

  function resetGame() {
    state = initialState();
    player.pos = [0, 1.62, 3.75];
    player.yaw = 0; player.pitch = -0.04;
    closeChoices();
    endingScreen.style.display = 'none';
    startScreen.style.display = 'flex';
    hud.classList.add('hidden'); crosshair.classList.add('hidden'); helpEl.classList.add('hidden');
    promptEl.classList.remove('show'); toastEl.classList.remove('show');
    updateFreezerVisuals();
    bananaObj.visible = false;
  }

  function beginGame() {
    state.started = true;
    startScreen.style.display = 'none';
    hud.classList.remove('hidden'); crosshair.classList.remove('hidden'); helpEl.classList.remove('hidden');
    initAudio();
    updateFreezerVisuals();
    message('You wake beside Miso. The freezer emits a silly, muffled scream. This is not a normal warranty issue.');
  }

  // ---------------------------------------------------------------------------
  // Controls
  // ---------------------------------------------------------------------------

  const keys = Object.create(null);
  const isCoarsePointer = matchMedia('(pointer: coarse)').matches || window.innerWidth < 800;
  let dragging = false, lastMouseX = 0, lastMouseY = 0;
  const stick = { left: { active: false, id: null, sx: 0, sy: 0, x: 0, y: 0 }, right: { active: false, id: null, sx: 0, sy: 0, x: 0, y: 0 } };

  window.addEventListener('keydown', e => {
    keys[e.code] = true;
    if (e.code === 'KeyE') { e.preventDefault(); interact(); }
    if (e.code === 'Escape') closeChoices();
  });
  window.addEventListener('keyup', e => { keys[e.code] = false; });

  canvas.addEventListener('click', e => {
    if (!state.started || state.ended) return;
    if (!isCoarsePointer && document.pointerLockElement !== canvas) {
      const lock = canvas.requestPointerLock?.();
      if (lock && typeof lock.catch === 'function') lock.catch(() => {});
    } else if (!isCoarsePointer) {
      interact();
    }
  });

  document.addEventListener('mousemove', e => {
    if (!state.started || state.ended || choiceOverlay.style.display === 'flex') return;
    if (document.pointerLockElement === canvas) {
      player.yaw += e.movementX * 0.0019;
      player.pitch -= e.movementY * 0.0018;
      player.pitch = clamp(player.pitch, -1.22, 1.12);
    } else if (dragging) {
      const dx = e.clientX - lastMouseX, dy = e.clientY - lastMouseY;
      lastMouseX = e.clientX; lastMouseY = e.clientY;
      player.yaw += dx * 0.0029;
      player.pitch -= dy * 0.0027;
      player.pitch = clamp(player.pitch, -1.22, 1.12);
    }
  });
  canvas.addEventListener('mousedown', e => { dragging = true; lastMouseX = e.clientX; lastMouseY = e.clientY; });
  window.addEventListener('mouseup', () => { dragging = false; });

  function assignTouch(t) {
    if (t.target.closest && t.target.closest('button')) return;
    const side = t.clientX < window.innerWidth / 2 ? 'left' : 'right';
    const s = stick[side];
    if (!s.active) {
      s.active = true; s.id = t.identifier; s.sx = t.clientX; s.sy = t.clientY; s.x = 0; s.y = 0;
      const el = side === 'left' ? joyLeft : joyRight;
      const knob = side === 'left' ? joyLeftKnob : joyRightKnob;
      el.style.display = 'block'; el.style.left = `${s.sx}px`; el.style.top = `${s.sy}px`;
      knob.style.transform = 'translate(0px,0px)';
    }
  }
  function updateTouch(t) {
    for (const side of ['left', 'right']) {
      const s = stick[side];
      if (s.active && s.id === t.identifier) {
        const dx = t.clientX - s.sx, dy = t.clientY - s.sy;
        const len = Math.hypot(dx, dy);
        const max = 54;
        const nx = len > max ? dx / len * max : dx;
        const ny = len > max ? dy / len * max : dy;
        s.x = nx / max; s.y = ny / max;
        const knob = side === 'left' ? joyLeftKnob : joyRightKnob;
        knob.style.transform = `translate(${nx}px,${ny}px)`;
      }
    }
  }
  function endTouch(t) {
    for (const side of ['left', 'right']) {
      const s = stick[side];
      if (s.active && s.id === t.identifier) {
        s.active = false; s.id = null; s.x = 0; s.y = 0;
        const el = side === 'left' ? joyLeft : joyRight;
        el.style.display = 'none';
      }
    }
  }
  window.addEventListener('touchstart', e => { for (const t of e.changedTouches) assignTouch(t); }, { passive: false });
  window.addEventListener('touchmove', e => { e.preventDefault(); for (const t of e.changedTouches) updateTouch(t); }, { passive: false });
  window.addEventListener('touchend', e => { for (const t of e.changedTouches) endTouch(t); }, { passive: false });
  window.addEventListener('touchcancel', e => { for (const t of e.changedTouches) endTouch(t); }, { passive: false });

  startButton.addEventListener('click', beginGame);
  restartButton.addEventListener('click', resetGame);
  interactButton.addEventListener('click', interact);

  // ---------------------------------------------------------------------------
  // Audio: a silly procedural scream and a tiny meow.
  // ---------------------------------------------------------------------------

  let audioCtx = null, screamOsc = null, wobbleOsc = null, screamGain = null, masterGain = null;
  function initAudio() {
    if (audioCtx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audioCtx = new Ctx();
    masterGain = audioCtx.createGain(); masterGain.gain.value = 0.35; masterGain.connect(audioCtx.destination);
    screamGain = audioCtx.createGain(); screamGain.gain.value = 0.0; screamGain.connect(masterGain);
    screamOsc = audioCtx.createOscillator(); screamOsc.type = 'sawtooth'; screamOsc.frequency.value = 430;
    const filter = audioCtx.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 920; filter.Q.value = 3.8;
    wobbleOsc = audioCtx.createOscillator(); wobbleOsc.type = 'sine'; wobbleOsc.frequency.value = 6.2;
    const wobbleGain = audioCtx.createGain(); wobbleGain.gain.value = 120;
    wobbleOsc.connect(wobbleGain); wobbleGain.connect(screamOsc.frequency);
    screamOsc.connect(filter); filter.connect(screamGain);
    screamOsc.start(); wobbleOsc.start();
  }

  function updateAudio(dt) {
    if (!audioCtx || !screamGain || !state.started) return;
    const bananaPos = currentBananaWorldPos();
    const dist = V3.distance(player.pos, bananaPos);
    const att = clamp(1.25 / Math.max(0.7, dist), 0.07, 1.0);
    const target = state.ended ? 0 : (state.scream / 100) * att * 0.18;
    screamGain.gain.setTargetAtTime(target, audioCtx.currentTime, 0.05);
    if (screamOsc) {
      const freq = 420 + Math.sin(time * 5.4) * 70 + Math.sin(time * 13.2) * 34 + state.scream * 2.2;
      screamOsc.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.04);
    }
  }

  function playMeow() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator(); const g = audioCtx.createGain();
    osc.type = 'triangle'; osc.frequency.value = 820;
    g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.11, audioCtx.currentTime + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.33);
    osc.frequency.exponentialRampToValueAtTime(520, audioCtx.currentTime + 0.32);
    osc.connect(g); g.connect(masterGain || audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.36);
  }

  function playSqueal(amount = 0.4) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator(); const g = audioCtx.createGain();
    osc.type = 'square'; osc.frequency.value = 980;
    g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(amount * 0.18, audioCtx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.42);
    osc.frequency.exponentialRampToValueAtTime(380, audioCtx.currentTime + 0.42);
    osc.connect(g); g.connect(masterGain || audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.45);
  }

  // ---------------------------------------------------------------------------
  // Update and rendering
  // ---------------------------------------------------------------------------

  let time = 0;
  let last = performance.now();
  const view = mat4Identity();
  const proj = mat4Identity();
  const viewProj = mat4Identity();
  const model = mat4Identity();

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1.8 : 2.2);
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      canvas.style.width = window.innerWidth + 'px'; canvas.style.height = window.innerHeight + 'px';
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);

  function updatePlayer(dt) {
    if (!state.started || state.ended || choiceOverlay.style.display === 'flex') return;
    let mx = 0, my = 0;
    if (keys.KeyW || keys.ArrowUp) my += 1;
    if (keys.KeyS || keys.ArrowDown) my -= 1;
    if (keys.KeyA || keys.ArrowLeft) mx -= 1;
    if (keys.KeyD || keys.ArrowRight) mx += 1;
    if (stick.left.active) { mx += stick.left.x; my += -stick.left.y; }
    if (stick.right.active) {
      player.yaw += stick.right.x * dt * 1.95;
      player.pitch -= stick.right.y * dt * 1.55;
      player.pitch = clamp(player.pitch, -1.22, 1.12);
    }
    const mag = Math.hypot(mx, my);
    if (mag > 1) { mx /= mag; my /= mag; }
    const f = playerForwardFlat(), r = playerRightFlat();
    const speed = (keys.ShiftLeft || keys.ShiftRight) ? 3.6 : 2.35;
    const dx = (f[0] * my + r[0] * mx) * speed * dt;
    const dz = (f[2] * my + r[2] * mx) * speed * dt;
    let nx = player.pos[0] + dx, nz = player.pos[2] + dz;
    nx = clamp(nx, -5.25, 5.25); nz = clamp(nz, -5.35, 5.35);
    // Soft collision with fridge/counter volumes.
    if (nx > 2.75 && nx < 4.95 && nz < -4.15) { nz = Math.max(nz, -4.15); }
    if (nx < -4.68 && nz > -5.52 && nz < -0.65) { nx = Math.max(nx, -4.68); }
    player.pos[0] = nx; player.pos[2] = nz;
  }

  function updateState(dt) {
    if (!state.started || state.ended) return;
    if (toastTimer > 0) {
      toastTimer -= dt;
      if (toastTimer <= 0) toastEl.classList.remove('show');
    }
    state.shake = Math.max(0, state.shake - dt * 0.75);
    if (state.bananaFound) {
      const calmFactor = (state.bananaLocation === 'box' ? 0.42 : state.bananaLocation === 'counter' ? 0.23 : 0.0) + (state.towelNest ? 0.18 : 0);
      const floor = 20 + (state.spectacle * .15);
      state.scream = clamp(lerp(state.scream, Math.max(floor, 72 - state.care * 0.38 - state.containment * calmFactor), dt * 0.12), 0, 100);
    } else if (state.freezerOpen) {
      state.scream = lerp(state.scream, 62, dt * 0.18);
    } else {
      state.scream = lerp(state.scream, 18, dt * 0.1);
    }
  }

  function drawObject(obj, cameraPos, bananaLight) {
    if (!obj.visible) return;
    composeMatrix(obj.model, obj.pos, obj.rot, obj.scale);
    gl.uniformMatrix4fv(loc.model, false, obj.model);
    gl.uniform3fv(loc.color, obj.material.color);
    gl.uniform1f(loc.alpha, obj.material.alpha);
    gl.uniform1f(loc.emissive, obj.material.emissive);
    gl.uniform1f(loc.scream, state.scream / 100);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, obj.material.texture || whiteTex);
    gl.uniform1i(loc.tex, 0);
    const mesh = obj.mesh;
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.pos);
    gl.enableVertexAttribArray(loc.position);
    gl.vertexAttribPointer(loc.position, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.norm);
    gl.enableVertexAttribArray(loc.normal);
    gl.vertexAttribPointer(loc.normal, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.uv);
    gl.enableVertexAttribArray(loc.uv);
    gl.vertexAttribPointer(loc.uv, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, mesh.count);
  }

  function render() {
    resize();
    gl.clearColor(0.035, 0.045, 0.064, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    const f = playerForward();
    const shake = prefersReducedMotion ? 0 : state.shake * (state.scream / 100);
    const eye = [
      player.pos[0] + (Math.random() - .5) * shake * 0.025,
      player.pos[1] + (Math.random() - .5) * shake * 0.018,
      player.pos[2] + (Math.random() - .5) * shake * 0.025
    ];
    const center = V3.add(eye, f);
    mat4LookAt(view, eye, center, [0, 1, 0]);
    mat4Perspective(proj, 68 * DEG, canvas.width / Math.max(1, canvas.height), 0.05, 60);
    mat4Multiply(viewProj, proj, view);

    const bananaLight = currentBananaWorldPos();
    gl.useProgram(program);
    gl.uniformMatrix4fv(loc.viewProj, false, viewProj);
    gl.uniform3fv(loc.cameraPos, eye);
    gl.uniform3fv(loc.freezerLight, state.freezerOpen ? [3.68, 1.95, -4.38] : [3.68, 1.95, -5.1]);
    gl.uniform3fv(loc.bananaLight, bananaLight);
    gl.uniform1f(loc.time, time);

    // Opaque pass.
    gl.depthMask(true);
    gl.disable(gl.BLEND);
    for (const obj of objects) if (!obj.material.transparent) drawObject(obj, eye, bananaLight);

    // Transparent pass, farthest first.
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthMask(false);
    transparentObjects.sort((a, b) => V3.distance(b.pos, eye) + b.sort - (V3.distance(a.pos, eye) + a.sort));
    for (const obj of transparentObjects) drawObject(obj, eye, bananaLight);
    gl.depthMask(true);
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - last) / 1000 || 0.016);
    last = now;
    time += dt;
    updatePlayer(dt);
    updateState(dt);
    updateFreezerVisuals();
    for (const obj of objects) if (obj.update) obj.update(obj);
    updateTarget();
    updateHUD();
    updateAudio(dt);
    render();
    requestAnimationFrame(loop);
  }

  gl.enable(gl.DEPTH_TEST);
  resize();
  requestAnimationFrame(loop);
})();
