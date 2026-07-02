// Central tunables and runtime quality detection.
// Keeping every "magic number" that shapes the feel in one place so the
// experience can be tuned without hunting through systems.

export const IS_TOUCH = (('ontouchstart' in window) || navigator.maxTouchPoints > 0);
export const IS_MOBILE = IS_TOUCH && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Rough GPU tier guess. We can't trust UA, so we lean conservative on touch
// devices and let the frame-rate governor in main.js adapt further at runtime.
function guessTier() {
  const mem = navigator.deviceMemory || (IS_MOBILE ? 4 : 8);
  const cores = navigator.hardwareConcurrency || (IS_MOBILE ? 4 : 8);
  if (IS_MOBILE && (mem <= 3 || cores <= 4)) return 'low';
  if (IS_MOBILE) return 'mid';
  if (mem <= 4 || cores <= 4) return 'mid';
  return 'high';
}

export const TIER = guessTier();

// Quality is a mutable object — the runtime governor nudges these if the
// frame budget is blown, so dread never costs us the framerate.
export const Quality = {
  tier: TIER,
  pixelRatio: TIER === 'high' ? Math.min(window.devicePixelRatio, 1.9)
            : TIER === 'mid' ? Math.min(window.devicePixelRatio, 1.35)
            : 1.0,
  shadows: TIER !== 'low',
  shadowSize: TIER === 'high' ? 1024 : 512,
  fogDensityScale: 1.0,
  grain: true,
  // draw distance is intentionally short; the fog hides the edge of the world
  far: TIER === 'high' ? 90 : TIER === 'mid' ? 70 : 55,
  maxInstancedTrees: TIER === 'high' ? 1200 : TIER === 'mid' ? 700 : 360,
  dustMotes: TIER === 'high' ? 600 : TIER === 'mid' ? 280 : 0,
};

export const CFG = {
  // --- Player ---
  eyeHeight: 1.62,
  crouchHeight: 0.95,
  walkSpeed: 2.48,
  runSpeed: 4.1,          // a frightened jog — drains stamina, used rarely
  accel: 16,
  friction: 13,
  playerRadius: 0.32,
  // mouse / stick look
  mouseSensitivity: 0.0021,
  touchLookSensitivity: 0.00135,
  invertY: false,
  maxPitch: 1.45,         // radians from horizon
  // headbob & breathing
  bobAmount: 0.038,
  bobSpeed: 8.8,
  breathAmount: 0.015,

  // --- Flashlight (physically-based candela units in three r160, decay 2) ---
  // The hot core is deliberately softened from its old 980cd: at close range an
  // over-bright core just blows a near wall to a white blob (the "all I see is the
  // flashlight on the wall" complaint) and washes out the zone's colour. With the
  // deep levels' new wall/floor emissive + the lens fill carrying the ambient
  // baseline, the torch can be a gentler, wider pool that reveals the environment
  // instead of nuking it — while a slightly wider/stronger spill keeps the reach.
  flashlight: {
    angle: 0.80,          // radians (cone half-angle-ish) — a touch wider
    penumbra: 0.72,       // softer edge, less hard hot-spot
    intensity: 560.0,     // was 980 — tamer core so near walls read as surfaces, not white blobs
    spillIntensity: 300.0,
    spillAngle: 1.18,
    distance: 68,
    color: 0xffeccb,
  },

  // --- Atmosphere palettes per zone. Fog is a murky blue/charcoal, never pure
  //     black, so trees and rooms silhouette against it like the references. ---
  // Three acts + the crypt beneath. Each act owns one palette: the wood is a
  // drowned blue, the house is dust and dead wallpaper, the graveyard is
  // moonlit verdigris, and the crypt is the colour of the inside of a body.
  // The ambient floor stays high enough that nowhere is a pitch-black void.
  zones: {
    forest:    { fog: 0x0e1622, fogDensity: 0.038, ambient: 0x1a2334, ambientI: 0.5,  sky: 0x0e1622 },
    house:     { fog: 0x0b0b13, fogDensity: 0.046, ambient: 0x1d1824, ambientI: 0.44, sky: 0x0b0b13 },
    graveyard: { fog: 0x14262b, fogDensity: 0.036, ambient: 0x2c4a52, ambientI: 0.62, sky: 0x14262b },
    crypt:     { fog: 0x160611, fogDensity: 0.070, ambient: 0x2a0e1c, ambientI: 0.26, sky: 0x160611 },
  },

  // --- Director / dread ---
  // Global tension 0..1 ramps the soundtrack and the odds of incidental scares.
  tensionRise: 0.06,
  tensionFall: 0.04,
};

// Layer bitmask so the flashlight and entity can be selectively lit/hidden.
export const LAYER = { DEFAULT: 0, ENTITY: 1, NOFLASH: 2 };
