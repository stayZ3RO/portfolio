/* Theme registry: the eight station themes.
   data-theme on <html> carries the full id (family + mode); all styling
   switches through CSS variables in tokens.css, never per-theme restyles.
   Kept centralized here so platform subdomains can share the contract. */

export const THEMES = [
  { id: 'catppuccin-dark', family: 'Catppuccin', mode: 'dark', label: 'Catppuccin dark', bg: '#1e1e2e', accent: '#cba6f7' },
  { id: 'catppuccin-light', family: 'Catppuccin', mode: 'light', label: 'Catppuccin light', bg: '#eff1f5', accent: '#8839ef' },
  { id: 'tokyo-night-dark', family: 'Tokyo Night', mode: 'dark', label: 'Tokyo Night dark', bg: '#1a1b26', accent: '#7aa2f7' },
  { id: 'tokyo-night-light', family: 'Tokyo Night', mode: 'light', label: 'Tokyo Night light', bg: '#e1e2e7', accent: '#2e7de9' },
  { id: 'rose-pine-dark', family: 'Rosé Pine', mode: 'dark', label: 'Rosé Pine dark', bg: '#191724', accent: '#eb6f92' },
  { id: 'rose-pine-light', family: 'Rosé Pine', mode: 'light', label: 'Rosé Pine light', bg: '#faf4ed', accent: '#b4637a' },
  { id: 'dracula-dark', family: 'Dracula', mode: 'dark', label: 'Dracula dark', bg: '#282a36', accent: '#bd93f9' },
  { id: 'dracula-light', family: 'Dracula', mode: 'light', label: 'Dracula light', bg: '#f8f8f2', accent: '#7d5fc4' },
];

export const DEFAULT_DARK = 'tokyo-night-dark';
export const DEFAULT_LIGHT = 'catppuccin-light';

const IDS = new Set(THEMES.map((t) => t.id));

function osPrefersLight() {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches;
  } catch (e) {
    return false;
  }
}

/* Resolve the stored value to a valid theme id. Migrates the old
   light/dark-only values from before the eight-theme switcher. */
export function resolveTheme(stored) {
  if (stored && IDS.has(stored)) return stored;
  if (stored === 'light') return DEFAULT_LIGHT;
  if (stored === 'dark') return DEFAULT_DARK;
  return osPrefersLight() ? DEFAULT_LIGHT : DEFAULT_DARK;
}

export function getStoredTheme() {
  let stored = null;
  try {
    stored = localStorage.getItem('theme');
  } catch (e) {}
  return resolveTheme(stored);
}

export function themeMode(id) {
  return id.endsWith('-light') ? 'light' : 'dark';
}

export function syncFavicon(id) {
  const mode = themeMode(id);
  const el = document.getElementById('favicon');
  if (el) el.href = mode === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
}

export function applyTheme(id) {
  const next = IDS.has(id) ? id : getStoredTheme();
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch (e) {}
  syncFavicon(next);
  window.dispatchEvent(new Event('themechange'));
  return next;
}

export function currentTheme() {
  const id = document.documentElement.dataset.theme;
  return IDS.has(id) ? id : getStoredTheme();
}
