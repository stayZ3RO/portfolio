import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Now from './components/Now.jsx';
import WorkSection from './components/WorkSection.jsx';
import Links from './components/Links.jsx';
import NetworkBackground from './components/NetworkBackground.jsx';

function App() {
  useEffect(() => {
    const progress = document.getElementById('progress');
    const grid = document.getElementById('grid-layer');
    if (!progress) return;

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
      if (grid) {
        grid.style.transform = `translateY(${window.scrollY * 0.06}px)`;
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="progress" id="progress"></div>
      <div className="grid-layer" id="grid-layer"></div>
      <div className="grain"></div>
      <NetworkBackground />

      <Header />
      <main id="top">
        <div className="wrap">
          <Hero />
          <Now />
        </div>
        <WorkSection />
        <div className="wrap">
          <Links />
        </div>
      </main>
      <footer className="site-footer">
        <nav className="footer-links" aria-label="Contact and profile links">
          <a href="mailto:stayz3ro@gmail.com">email</a>
          <a href="https://www.linkedin.com/in/christopher-l-2118351ab/" target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a href="https://github.com/stayZ3RO" target="_blank" rel="noreferrer">
            github
          </a>
          <a href="/resume.pdf" download>
            resume
          </a>
        </nav>
        <p>© 2026 Christopher Austin Lorenzo</p>
      </footer>
    </>
  );
}

export default App;
