import { useEffect, useState } from 'react';
import buildmeta from './buildmeta.json';
import MotionToggle from './MotionToggle';

function utcNow() {
  return new Date().toISOString().slice(11, 19) + ' utc';
}

/* Shared colophon, the blog's: type credits, the © line, a live UTC
   clock, the build stamp (from scripts/gen-meta.mjs, so it always says
   when this build was generated), a links row with the blog first, the
   hire line, and the motion override. Double rule above. */
export default function Footer({ note }) {
  const [t, setT] = useState('--:--:-- utc');
  useEffect(() => {
    setT(utcNow());
    const id = setInterval(() => setT(utcNow()), 1000);
    return () => clearInterval(id);
  }, []);

  const updated = buildmeta && buildmeta.buildDate ? buildmeta.buildDate : null;

  return (
    <footer className="site">
      <p className="colophon">
        Set in Zilla Slab &amp; Source Serif 4 · code in JetBrains Mono · © 2026 Christopher Lorenzo ·{' '}
        <time className="utc" aria-label="Current UTC time">{t}</time>
        {updated && <> · site updated {updated}</>}
        {note && <> · {note}</>}
      </p>
      <p>
        <a href="https://blog.chrisalorenzo.com">blog</a> ·{' '}
        <a href="https://github.com/stayZ3RO">github</a> ·{' '}
        <a href="https://www.linkedin.com/in/christopher-l-2118351ab">linkedin</a> ·{' '}
        <a href="https://status.chrisalorenzo.com">status</a> ·{' '}
        <a href="/resume.pdf">resume</a>
      </p>
      <p className="hire">
        open to platform / systems engineering roles ·{' '}
        <a href="/#contact">get in touch</a>
      </p>
      <MotionToggle />
    </footer>
  );
}
