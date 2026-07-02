// Progress persistence. Everything the player has earned lives here so a
// refresh never costs progress. Writes are debounced to avoid hammering
// localStorage during rapid pickups.

const KEY = 'skyshard-save-v1';

const DEFAULTS = () => ({
  abilities: {},        // { dash:true, doubleJump:true, glide:true, grapple:true, slam:true }
  weaponLevel: 0,       // 0..3 visual evolution stage
  altFires: {},         // { lance:true, seeker:true }
  bossesDown: {},       // { mill:true, forge:true, ... }
  found: {},            // destination ids discovered
  shards: 0,            // health core shards (3 => +1 pip)
  maxPips: 4,
  entered: {},          // interiors visited at least once
  skins: {},            // cosmetic gun skins earned at battle shrines
  skin: 'default',      // currently worn
  playSeconds: 0,
});

let state = null;
let writeTimer = 0;

export function loadSave() {
  if (state) return state;
  state = DEFAULTS();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') Object.assign(state, parsed);
    }
  } catch (e) { /* corrupted or blocked storage — play with defaults */ }
  return state;
}

export function save() {
  if (!state) return;
  if (writeTimer) return;
  writeTimer = setTimeout(() => {
    writeTimer = 0;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage blocked */ }
  }, 250);
}

export function wipeSave() {
  state = DEFAULTS();
  try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
}
