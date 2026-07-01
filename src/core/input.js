// Input: pointer lock mouse-look + key state. Consumers read `input.look`
// deltas once per frame (they are zeroed after each read) and query keys via
// down()/pressed(). pressed() is edge-triggered and consumed per frame.

export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.pressedKeys = new Set();
    this.mouseDown = [false, false, false];
    this.mousePressed = [false, false, false];
    this.lookX = 0;              // accumulated mouse delta this frame
    this.lookY = 0;
    this.sensitivity = 0.0021;
    this.locked = false;
    this.onLockChange = null;    // game pauses/resumes off this
    this.wheel = 0;

    document.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      this.keys.add(e.code);
      this.pressedKeys.add(e.code);
      // Keep the browser from scrolling/attention-stealing during play.
      if (this.locked && (e.code === 'Space' || e.code === 'Tab')) e.preventDefault();
    });
    document.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => { this.keys.clear(); this.mouseDown = [false, false, false]; });

    document.addEventListener('mousemove', (e) => {
      if (!this.locked) return;
      // Clamp: pointer-lock can emit a giant delta on re-lock glitches.
      const mx = Math.max(-200, Math.min(200, e.movementX));
      const my = Math.max(-200, Math.min(200, e.movementY));
      this.lookX += mx;
      this.lookY += my;
    });
    document.addEventListener('mousedown', (e) => {
      if (!this.locked) return;
      if (e.button <= 2) { this.mouseDown[e.button] = true; this.mousePressed[e.button] = true; }
    });
    document.addEventListener('mouseup', (e) => {
      if (e.button <= 2) this.mouseDown[e.button] = false;
    });
    document.addEventListener('wheel', (e) => { if (this.locked) this.wheel += Math.sign(e.deltaY); }, { passive: true });
    document.addEventListener('contextmenu', (e) => { if (this.locked) e.preventDefault(); });

    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.canvas;
      if (!this.locked) { this.keys.clear(); this.mouseDown = [false, false, false]; }
      if (this.onLockChange) this.onLockChange(this.locked);
    });
  }

  requestLock() {
    if (this.locked) return;
    // unadjustedMovement disables OS mouse accel where supported = cleaner aim.
    const p = this.canvas.requestPointerLock({ unadjustedMovement: true });
    if (p && p.catch) p.catch(() => this.canvas.requestPointerLock());
  }

  down(code) { return this.keys.has(code); }
  pressed(code) {
    if (this.pressedKeys.has(code)) { this.pressedKeys.delete(code); return true; }
    return false;
  }
  firePressed() { if (this.mousePressed[0]) { this.mousePressed[0] = false; return true; } return false; }
  altPressed() { if (this.mousePressed[2]) { this.mousePressed[2] = false; return true; } return false; }

  // Call at end of frame: hand back look deltas and clear one-frame state.
  consumeLook() {
    const x = this.lookX * this.sensitivity;
    const y = this.lookY * this.sensitivity;
    this.lookX = 0; this.lookY = 0;
    return { x, y };
  }
  endFrame() {
    this.pressedKeys.clear();
    this.mousePressed = [false, false, false];
    this.wheel = 0;
  }
}
