/* Motion preference: a user-facing override layered on top of the OS setting.
   Stored under `motion` in localStorage: 'full' | 'reduced'.
   Applied as data-motion on <html>; CSS and Reveal read it. */

const KEY = 'motion';

function osReduced() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    return false;
  }
}

export function getMotion() {
  let stored = null;
  try {
    stored = localStorage.getItem(KEY);
  } catch (e) {}
  if (stored === 'full' || stored === 'reduced') return stored;
  return osReduced() ? 'reduced' : 'full';
}

export function setMotion(value) {
  const next = value === 'reduced' ? 'reduced' : 'full';
  try {
    localStorage.setItem(KEY, next);
  } catch (e) {}
  document.documentElement.dataset.motion = next;
  window.dispatchEvent(new CustomEvent('motionchange', { detail: next }));
  return next;
}

export function initMotion() {
  document.documentElement.dataset.motion = getMotion();
}
