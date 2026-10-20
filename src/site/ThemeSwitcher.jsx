import { useEffect, useRef, useState } from 'react';

/* Theme switcher. light and dark are the palettes this site defines,
   stored under the `theme` localStorage key and applied as data-theme
   on <html>. index.html resolves the stored id before first paint;
   this component only changes it. */
export const THEMES = [
  ['dark', 'Dark', '', '#f4f4f2'],
  ['light', 'Light', '', '#141518'],
];

function current() {
  const t = typeof document !== 'undefined' ? document.documentElement.dataset.theme : '';
  return THEMES.some(([id]) => id === t) ? t : 'dark';
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
            {mode ? `${fam} ${mode}` : fam}
          </li>
        ))}
      </ul>
    </div>
  );
}
