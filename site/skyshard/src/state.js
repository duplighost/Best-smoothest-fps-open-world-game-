// Shared game context. Populated once during boot (main.js), read everywhere.
// Import direction: systems read G; only main.js and boot code assign into it.

export const G = {
  // three
  renderer: null,
  camera: null,
  scene: null,          // whichever scene is being rendered right now
  worldScene: null,
  sun: null,
  hemi: null,

  // core
  input: null,
  save: null,

  // time — sim runs fixed-step; fx run on raw time
  time: { now: 0, raw: 0, scale: 1 },

  // gameplay
  player: null,
  weapon: null,
  abilities: null,
  enemies: null,
  projectiles: null,
  breakables: null,
  boss: null,           // active boss controller or null

  // world
  terrain: null,
  regions: null,
  destinations: null,
  collide: null,        // active collider field (world's or interior's)
  worldCollide: null,

  // interiors
  interior: null,       // active interior instance or null
  mode: 'loading',      // loading | title | world | interior | dead

  // fx + ui
  juice: null,
  particles: null,
  motes: null,
  hud: null,
  rovers: null,         // pooled point lights

  // one 0..1 scalar that many channels listen to (music, vignette, light)
  intensity: 0,

  // debug/testing surface — Playwright drives the game through this
  debug: { fps: 0, ms: 0, drawCalls: 0, tris: 0 },
};
