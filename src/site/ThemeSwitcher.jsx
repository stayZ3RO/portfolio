import { useEffect, useRef, useState } from 'react';

/* Theme switcher, shared with the blog: the same nine ids, stored under
   the `theme` localStorage key, applied as data-theme on <html>.
   index.html resolves the stored id before first paint; this component
   only changes it. Dot colors are each theme's accent, as on the blog. */
export const THEMES = [
  ['zero-dark', 'Zero', 'house', '#f4f4f2'],
  ['catppuccin-dark', 'Catppuccin', 'dark', '#cba6f7'],
  ['catppuccin-light', 'Catppuccin', 'light', '#8839ef'],
  ['tokyo-night-dark', 'Tokyo Night', 'dark', '#7aa2f7'],
  ['tokyo-night-light', 'Tokyo Night', 'light', '#2e7de9'],
  ['rose-pine-dark', 'Rosé Pine', 'dark', '#eb6f92'],
  ['rose-pine-light', 'Rosé Pine', 'light', '#b4637a'],
  ['dracula-dark', 'Dracula', 'dark', '#bd93f9'],
  ['dracula-light', 'Dracula', 'light', '#7d5fc4'],
];

function current() {
  const t = typeof document !== 'undefined' ? document.documentElement.dataset.theme : '';
  return THEMES.some(([id]) => id === t) ? t : 'zero-dark';
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(current);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const apply = (id) => {
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem('theme', id);
    } catch (e) {}
    window.dispatchEvent(new Event('themechange'));
    setTheme(id);
    setOpen(false);
  };

  const [, name] = THEMES.find(([id]) => id === theme) || THEMES[0];

  return (
    <div className="theme-switcher" ref={rootRef}>
      <button
        id="theme-btn"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open ? 'true' : 'false'}
        aria-label="Color theme"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="theme-dot" aria-hidden="true"></span>
        <span id="theme-name">{name}</span>
      </button>
      <ul id="theme-menu" role="listbox" aria-label="Color theme" hidden={!open}>
        {THEMES.map(([id, fam, mode, dot]) => (
          <li
            key={id}
            role="option"
            aria-selected={theme === id ? 'true' : 'false'}
            onClick={() => apply(id)}
          >
            <span className="theme-dot" style={{ background: dot }} aria-hidden="true"></span>
            {fam} {mode}
          </li>
        ))}
      </ul>
    </div>
  );
}
