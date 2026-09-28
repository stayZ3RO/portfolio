import { useEffect, useRef, useState } from 'react';
import { THEMES, applyTheme, currentTheme } from '../theme.js';

const FAMILIES = ['Catppuccin', 'Tokyo Night', 'Rosé Pine', 'Dracula'];

function Swatch({ bg, accent }) {
  return (
    <span className="theme-swatch" style={{ background: bg }} aria-hidden="true">
      <i style={{ background: accent }} />
    </span>
  );
}

function ThemeSwitcher() {
  const [current, setCurrent] = useState(() => currentTheme());
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setCurrent(currentTheme());
    const onThemeChange = () => setCurrent(currentTheme());
    window.addEventListener('themechange', onThemeChange);
    return () => window.removeEventListener('themechange', onThemeChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [open ]);

  const active = THEMES.find((t) => t.id === current) || THEMES[0];

  const pick = (id) => {
    setCurrent(applyTheme(id));
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className="theme-switcher" ref={rootRef}>
      <button
        type="button"
        ref={buttonRef}
        className="theme-button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${active.label}. Change theme`}
        onClick={() => setOpen((v) => !v)}
      >
        <Swatch bg={active.bg} accent={active.accent} />
        <span>{active.family}</span>
        <span className="caret" aria-hidden="true">
          ▾
        </span>
      </button>
      {open && (
        <ul className="theme-menu" role="menu" aria-label="Themes">
          {FAMILIES.map((family) => (
            <li key={family}>
              <div className="theme-group-label" aria-hidden="true">
                {family}
              </div>
              {THEMES.filter((t) => t.family === family).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={t.id === current}
                  className="theme-option"
                  onClick={() => pick(t.id)}
                >
                  <Swatch bg={t.bg} accent={t.accent} />
                  {t.label}
                  <span className="check" aria-hidden="true">
                    ✓
                  </span>
                </button>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top">
        <svg
          className="wordmark-mark"
          viewBox="0 0 64 64"
          aria-hidden="true"
          focusable="false"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M 52 14 H 12 V 50 H 52" />
            <path d="M 28 26 V 38 H 44" />
          </g>
          <circle cx="46" cy="38" r="5.5" fill="currentColor" />
        </svg>
        <span>Christopher Austin Lorenzo</span>
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#work">work</a>
        <a href="#links">links</a>
        <ThemeSwitcher />
      </nav>

      <span className="status-pill">
        <span className="dot"></span>open to opportunities
      </span>
    </header>
  );
}

export default Header;
