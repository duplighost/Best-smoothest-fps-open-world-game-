(() => {
  'use strict';

  const AUDIO_SRC = '/assets/audio/jelly-strobe-instrumental-v280.mp3';
  const STORAGE_KEY = 'qualiacologyAmbientAudioEnabled';
  const QUIET_VOLUME = 0.45;

  const onReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  onReady(() => {
    if (document.documentElement.dataset.noAmbientAudio === 'true') return;
    if (document.querySelector('[data-ambient-audio]')) return;

    const audio = document.createElement('audio');
    audio.dataset.ambientAudio = 'true';
    audio.src = AUDIO_SRC;
    audio.loop = true;
    audio.preload = 'none';
    audio.volume = QUIET_VOLUME;
    audio.setAttribute('aria-hidden', 'true');

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ambient-audio-toggle';
    toggle.innerHTML = '<span class="ambient-audio-dot" aria-hidden="true"></span><span data-ambient-audio-label>ambient</span>';
    toggle.setAttribute('aria-label', 'Toggle quiet background music');

    const readPref = () => {
      try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
    };
    const writePref = (value) => {
      try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
    };

    let enabled = readPref() !== 'off';
    let started = false;
    let lastUnlockAttempt = 0;

    const label = () => toggle.querySelector('[data-ambient-audio-label]');
    const setLabel = (text) => {
      const node = label();
      if (node) node.textContent = text;
    };

    const update = (mode) => {
      toggle.setAttribute('aria-pressed', enabled && !audio.paused ? 'true' : 'false');
      if (!enabled) {
        setLabel('sound off');
      } else if (mode === 'blocked' && !started) {
        setLabel('tap sound');
      } else if (!audio.paused) {
        setLabel('quiet sound');
      } else {
        setLabel('ambient');
      }
    };

    const persist = () => {
      writePref(enabled ? 'on' : 'off');
    };

    const playQuietly = async () => {
      if (!enabled) return;
      try {
        audio.volume = QUIET_VOLUME;
        await audio.play();
        started = true;
        update('playing');
      } catch (error) {
        update('blocked');
      }
    };

    const pauseQuietly = () => {
      audio.pause();
      update('paused');
    };

    const unlock = () => {
      if (!enabled || started) return;
      const now = Date.now();
      if (now - lastUnlockAttempt < 1200) return;
      lastUnlockAttempt = now;
      playQuietly();
    };

    const quietEvent = (event) => {
      event.stopPropagation();
    };

    toggle.addEventListener('pointerdown', quietEvent);
    toggle.addEventListener('touchstart', quietEvent);
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      lastUnlockAttempt = 0;

      if (enabled && audio.paused) {
        persist();
        playQuietly();
        return;
      }

      enabled = !enabled;
      persist();
      if (enabled) {
        playQuietly();
      } else {
        pauseQuietly();
      }
    });

    audio.addEventListener('pause', () => update('paused'));
    audio.addEventListener('play', () => update('playing'));
    audio.addEventListener('volumechange', () => {
      if (audio.volume > QUIET_VOLUME) audio.volume = QUIET_VOLUME;
    });

    document.body.append(audio, toggle);
    update('idle');

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
    window.addEventListener('keydown', unlock);
  });
})();
