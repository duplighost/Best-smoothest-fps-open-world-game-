// HUD: thin DOM layer over the canvas. Philosophy: the world teaches; the HUD
// only confirms. Health is pips, abilities are small glyphs that flash when
// used, kills tick the crosshair, and words appear rarely, in whispers.

import { G } from '../state.js';

const VERB_ICONS = {
  dash: '<svg viewBox="0 0 24 24" fill="none" stroke="#cfe8ff" stroke-width="2.2"><path d="M4 6l7 6-7 6M12 6l7 6-7 6"/></svg>',
  wings: '<svg viewBox="0 0 24 24" fill="none" stroke="#cfe8ff" stroke-width="2"><path d="M12 19V9M12 9C10 4 5 4 3 6c3 1 5 4 9 3zM12 9c2-5 7-5 9-3-3 1-5 4-9 3z"/></svg>',
  grapple: '<svg viewBox="0 0 24 24" fill="none" stroke="#cfe8ff" stroke-width="2.2"><path d="M5 19L17 7M17 7v6M17 7h-6"/></svg>',
  slam: '<svg viewBox="0 0 24 24" fill="none" stroke="#cfe8ff" stroke-width="2.2"><path d="M12 4v12M6 12l6 6 6-6M4 21h16"/></svg>',
  lance: '<svg viewBox="0 0 24 24" fill="none" stroke="#ffd9a0" stroke-width="2.2"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
  seeker: '<svg viewBox="0 0 24 24" fill="none" stroke="#a0ffd0" stroke-width="2"><path d="M12 3a9 9 0 109 9M12 7a5 5 0 105 5M12 11a1.5 1.5 0 101.5 1.5"/></svg>',
};

export class Hud {
  constructor() {
    this.root = document.getElementById('hud');
    this.cross = document.getElementById('cross');
    this.pipsEl = document.getElementById('pips');
    this.verbsEl = document.getElementById('verbs');
    this.whisperEl = document.getElementById('whisper');
    this.bossEl = document.getElementById('bossbar');
    this.bossName = this.bossEl.querySelector('.name');
    this.bossFill = this.bossEl.querySelector('.fill');
    this.hurtEl = document.getElementById('hurt');
    this.faderEl = document.getElementById('fader');
    this.verbEls = {};
    this.whisperTimer = 0;
    this.hurtLevel = 0;
    this._pipCount = -1; this._pipMax = -1;

    for (const key of Object.keys(VERB_ICONS)) {
      const el = document.createElement('div');
      el.className = 'verb';
      el.dataset.verb = key;
      el.innerHTML = VERB_ICONS[key] + '<div class="cool"></div>';
      this.verbsEl.appendChild(el);
      this.verbEls[key] = el;
    }
  }

  show() { this.root.classList.add('show'); }
  hide() { this.root.classList.remove('show'); }

  setPips(cur, max) {
    if (cur === this._pipCount && max === this._pipMax) return;
    if (max !== this._pipMax) {
      this.pipsEl.innerHTML = '';
      for (let i = 0; i < max; i++) {
        const el = document.createElement('div');
        el.className = 'pip';
        this.pipsEl.appendChild(el);
      }
      this._pipMax = max;
    }
    const els = this.pipsEl.children;
    for (let i = 0; i < els.length; i++) els[i].classList.toggle('empty', i >= cur);
    this._pipCount = cur;
  }

  // Which verbs the player owns → visible chips.
  syncVerbs(save) {
    const owned = {
      dash: save.abilities.dash, wings: save.abilities.doubleJump,
      grapple: save.abilities.grapple, slam: save.abilities.slam,
      lance: save.altFires.lance, seeker: save.altFires.seeker,
    };
    for (const [k, el] of Object.entries(this.verbEls)) el.classList.toggle('owned', !!owned[k]);
  }

  verbFlash(key) {
    const el = this.verbEls[key];
    if (!el) return;
    el.classList.remove('ready');
    // force reflow so back-to-back flashes both animate
    void el.offsetWidth;
    el.classList.add('ready');
  }

  // Cooldown fills, called per frame.
  update() {
    const pl = G.player;
    if (!pl) return;
    const dashEl = this.verbEls.dash;
    if (dashEl.classList.contains('owned')) {
      const frac = pl.dashCd > 0 ? pl.dashCd / 1.5 : 0;
      dashEl.querySelector('.cool').style.height = (frac * 100) + '%';
      dashEl.classList.toggle('ready', frac <= 0);
    }
    if (this.hurtLevel > 0) {
      this.hurtLevel = Math.max(0, this.hurtLevel - 0.045);
      this.hurtEl.style.opacity = this.hurtLevel;
    }
    // low health breathing warning
    if (pl.pips === 1 && this.hurtLevel <= 0) {
      this.hurtEl.style.opacity = 0.25 + Math.sin(performance.now() / 300) * 0.12;
    }
  }

  hitPip() {
    this.cross.classList.remove('hit');
    void this.cross.offsetWidth;
    this.cross.classList.add('hit');
  }

  hurtFlash() {
    this.hurtLevel = 1;
    this.hurtEl.style.opacity = 1;
    if (navigator.vibrate && matchMedia('(pointer: coarse)').matches) navigator.vibrate([70, 50, 140]);
  }

  whisper(text, seconds = 3.2) {
    this.whisperEl.textContent = text;
    this.whisperEl.style.opacity = 1;
    clearTimeout(this.whisperTimer);
    this.whisperTimer = setTimeout(() => { this.whisperEl.style.opacity = 0; }, seconds * 1000);
  }

  bossShow(name) {
    this.bossName.textContent = name;
    this.bossFill.style.width = '100%';
    this.bossEl.style.opacity = 1;
  }
  bossSet(frac) { this.bossFill.style.width = Math.max(0, frac * 100) + '%'; }
  bossHide() { this.bossEl.style.opacity = 0; }

  // fade to black and back; returns a promise that resolves mid-fade (screen
  // fully black — the moment to swap scenes).
  fade(holdMs = 120) {
    return new Promise((resolve) => {
      this.faderEl.style.opacity = 1;
      setTimeout(() => {
        resolve();
        setTimeout(() => { this.faderEl.style.opacity = 0; }, holdMs);
      }, 400);
    });
  }
}
