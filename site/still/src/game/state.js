// Shared context for STILL. main.js is the only writer.

export const G = {
  renderer: null,
  camera: null,
  scene: null,
  rig: null,            // LightRig
  input: null,
  player: null,
  entity: null,
  fear: null,
  collide: null,
  floor: null,          // active floor instance
  floorIdx: 0,
  mode: 'loading',      // loading | title | play | grabbed | ending
  time: { now: 0, raw: 0 },
  interactables: [],    // { x, z, r, label, onUse(), keyIcon }
  debug: { fps: 0, drawCalls: 0, tris: 0, grabs: 0 },
};
