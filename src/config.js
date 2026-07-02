// Every tuning constant in the game lives here — one file to retune feel.
// Values marked [ported] are calibrations carried from the developer's
// previous games (see docs/RESEARCH-BRIEF.md).

export const CFG = {
  player: {
    eyeHeight: 1.62,
    radius: 0.38,
    walkSpeed: 6.0,          // action pace — the world should feel eager underfoot
    sprintMult: 1.42,
    accel: 16,               // [ported] vel += (wish - vel) * min(1, accel*dt)
    friction: 13,            // [ported]
    airControl: 0.36,
    gravity: 24,
    jumpVel: 8.6,
    coyoteTime: 0.12,
    jumpBuffer: 0.14,
    stepUp: 0.55,
    maxPitch: 1.5,
    bobRate: 8.8,            // [ported] headbob phase speed
    bobAmp: 0.05,
    hurtIFrames: 0.9,        // [ported]
    startPips: 4,
    maxPipsCap: 8,
  },

  abilities: {
    dash:   { speed: 19.5, time: 0.17, cooldown: 1.4, iFrames: 0.30, killRefund: 0.9, exitSpeedMult: 1.3 },
    doubleJumpVel: 8.2,
    glideFall: 2.6,          // capped fall speed while gliding
    glideControl: 1.5,       // extra air control gliding
    grapple: { maxDist: 46, pullAccel: 44, maxSpeed: 24, detachDist: 2.4, cooldown: 0.8 },
    slam:   { fallSpeed: 30, radius: 6.5, damage: 3, shockKnock: 14 },
  },

  weapon: {
    // Primary — Sparkcaster. Fast semi-auto with tight spread; aim matters.
    fireInterval: 0.135,
    damage: 1,
    range: 90,
    headshotMult: 2,         // hitting the crown sphere of an enemy
    kickPitch: 0.011,        // [ported] camera kick, spring return
    kickReturn: 17,          // [ported] damp lambda
    fovKick: 2.2,
    lance: { chargeTime: 0.55, damage: 5, range: 60, width: 0.6, cooldown: 1.1 },
    seeker: { count: 4, damage: 1, speed: 22, turn: 5.2, cooldown: 2.4, lifetime: 3.2 },
  },

  // [ported] trauma model: addShake(max), response = shake^2, decay 2.25/s
  shake: {
    decay: 2.25,
    ampRot: 0.055,           // rad at trauma=1 (applied as rotational sines)
    ampPos: 0.16,
    shot: 0.07, kill: 0.2, dashKill: 0.34, hurt: 0.46,
    breakProp: 0.12, slam: 0.42, miniboss: 0.7, boss: 1.2, clear: 0.42,
  },

  // [ported] hitstop ms tables; particles keep running at 55% raw during stop
  hitstop: { shot: 0, hit: 8, kill: 18, dashKill: 26, lance: 34, boss: 48, hurt: 60 },

  slowmo: {                  // [ported] eased-recovery slow-mo (separate from hitstop)
    kill3: { scale: 0.55, time: 0.16 },
    bossPhase: { scale: 0.34, time: 0.28 },
    bossDeath: { scale: 0.2, time: 0.9 },
    unlock: { scale: 0.25, time: 0.7 },
  },

  chain: { window: 1.2, tiers: [2, 3, 4, 6, 9, 12] },  // [ported] kill-chain

  enemies: {
    maxActive: 14,
    activateDist: 70,
    sleepDist: 95,
    throttleDist: 45,        // beyond this AI updates at half rate
    spawnClearance: 9,       // [ported] never materialize on the player
    telegraphTime: 0.4,      // [ported] spawn glyph before the body exists
    contactDamage: 1,
    hitFlash: 0.15,          // [ported]
  },

  streams: {                 // wind streams — the Shardlands' grind rails
    speed: 27,
    accel: 16,               // ramp into full speed after latching
    latchR: 2.8,             // touch the current and it takes you
    detachUp: 7.5,           // jumping out pops you into the sky
    detachKeep: 0.92,        // how much stream speed you keep on exit
    cooldown: 1.1,           // no instant re-latch after jumping out
  },

  world: {
    size: 1400,              // island diameter, meters
    chunk: 70,               // terrain chunk size
    chunksVisible: 5,        // ring radius of chunks around player
    seaLevel: 0.0,
    fogBase: 0.0062,
  },

  fx: {
    maxParticles: 900,
    maxMotes: 60,
    maxShards: 220,
    roverLights: 8,          // constant light count — never add/remove lights
    dprCap: 2.0,
  },

  governor: {                // adaptive quality with recovery hysteresis
    sampleEvery: 0.6,
    downAt: 45,
    upAt: 70,
    upAfter: 4,              // seconds above upAt before recovering a step
  },
};
