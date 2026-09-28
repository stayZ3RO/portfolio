import { useEffect } from 'react';

function Header() {
  useEffect(() => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const onClick = () => {
      const root = document.documentElement;
      const current =
        root.dataset.theme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
      window.dispatchEvent(new Event('themechange'));
    };

    btn.addEventListener('click', onClick);
    return () => btn.removeEventListener('click', onClick);
  }, []);

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
        <button id="theme-toggle" type="button" aria-label="Toggle color theme">
          ◐
        </button>
      </nav>

      <span className="status-pill">
        <span className="dot"></span>open to opportunities
      </span>
    </header>
  );
}

export default Header;
