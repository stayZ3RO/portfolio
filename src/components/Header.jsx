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
        Christopher Austin Lorenzo
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
