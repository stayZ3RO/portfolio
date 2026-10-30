import { useEffect, useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

/* Top bar: wordmark and a one-line description, four section links, the
   Resume button, the blog link and the theme toggle, a double rule
   underneath. Sticky. The link for the section in view is marked. The
   blog link is the one link both sites always carry to each other. */
const SECTIONS = [
  ['Work', 'work'],
  ['Lab', 'lab'],
  ['About', 'about'],
  ['Contact', 'contact'],
];

export default function Nav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const els = SECTIONS.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const seen = new Set();
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id)));
        const hit = SECTIONS.find(([, id]) => seen.has(id));
        setActive(hit ? hit[1] : '');
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="site">
      <div className="site-inner">
        <div className="brand-block">
          <a href="/" className="brand" aria-label="Christopher Lorenzo home">Christopher Lorenzo</a>
          <p className="tagline">systems, the lab, and the road to platform engineering</p>
        </div>
        <nav aria-label="Primary">
          {SECTIONS.map(([label, id]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>
          ))}
          <a className="btn btn-solid btn-sm" href="/resume.pdf">Resume</a>
          <a href="https://blog.chrisalorenzo.com">blog <span aria-hidden="true">↗</span></a>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
