// Destination registry — pure data, no three.js. Terrain flattens a disc at
// each site (r, y), so buildings always sit on believable ground and the same
// numbers drive worldgen, collision, minimap-free wayfinding, and saves.
//
// kind: 'major' = boss + ability reward. 'minor' = story tableau + health shard.
// enter: has an interior scene behind its door.

export const DESTS = [
  // ---- Verdant Vale ----
  { id: 'mill', kind: 'major', region: 'vale', x: 118, z: 388, r: 26, y: 7.5,
    name: 'The Hollow Mill', boss: 'millwright', reward: 'dash', enter: true },
  { id: 'hollowtree', kind: 'minor', region: 'vale', x: -102, z: 300, r: 15, y: 6.0,
    name: 'The Hollow Home', enter: true },
  { id: 'belltower', kind: 'minor', region: 'vale', x: 40, z: 520, r: 16, y: 5.0,
    name: 'The Bell Tower', enter: true },

  // ---- Ember Flats ----
  { id: 'forge', kind: 'major', region: 'ember', x: -400, z: 132, r: 28, y: 5.5,
    name: 'The Glass Forge', boss: 'slag', reward: 'lance', enter: true },
  { id: 'pyramid', kind: 'minor', region: 'ember', x: -486, z: -40, r: 22, y: 6.0,
    name: 'The Sunken Pyramid', enter: true },
  { id: 'caravan', kind: 'minor', region: 'ember', x: -300, z: 262, r: 14, y: 4.5,
    name: 'The Glass Caravan', enter: false },

  // ---- Frostmere ----
  { id: 'lighthouse', kind: 'major', region: 'frost', x: -178, z: -434, r: 24, y: 8.0,
    name: 'The Frozen Lighthouse', boss: 'keeper', reward: 'wings', enter: true },
  { id: 'fisher', kind: 'minor', region: 'frost', x: -348, z: -338, r: 13, y: 1.45,
    name: "The Fisher's Hut", enter: true },
  { id: 'howlstone', kind: 'minor', region: 'frost', x: -60, z: -560, r: 16, y: 9.0,
    name: 'The Howlstone Circle', enter: false },

  // ---- Mycel Hollow ----
  { id: 'chapel', kind: 'major', region: 'mycel', x: 434, z: 156, r: 26, y: 2.2,
    name: 'The Sunken Chapel', boss: 'choir', reward: 'seeker', enter: true },
  { id: 'capcottage', kind: 'minor', region: 'mycel', x: 512, z: -22, r: 15, y: 2.6,
    name: 'The Cap Cottage', enter: true },
  { id: 'stillpool', kind: 'minor', region: 'mycel', x: 330, z: 292, r: 14, y: 1.2,
    name: 'The Still Pool', enter: false },

  // ---- The Shatter ----
  { id: 'tower', kind: 'major', region: 'shatter', x: 328, z: -428, r: 26, y: 21.0,
    name: 'The Inverted Tower', boss: 'archivist', reward: 'grapple', enter: true },
  { id: 'observatory', kind: 'minor', region: 'shatter', x: 470, z: -260, r: 18, y: 19.5,
    name: 'The Observatory', enter: true },
  { id: 'stairs', kind: 'minor', region: 'shatter', x: 190, z: -540, r: 16, y: 17.0,
    name: 'The Stairs to Nowhere', enter: false },
];

export const destById = Object.fromEntries(DESTS.map((d) => [d.id, d]));

// Frozen lake in Frostmere — terrain flattens to ice height here.
export const FROZEN_LAKE = { x: -320, z: -320, r: 62, y: 1.4 };

// Player start + hub.
export const SPIRE = { x: 0, z: 0, r: 40, y: 14 };
export const SPAWN = { x: 6, z: 96 };
