import { useEffect, useState } from 'react';
import buildmeta from './buildmeta.json';
import { LIVE } from './status';

function utcNow() {
  return new Date().toISOString().slice(11, 19) + ' UTC';
}

/* Status footer: status line (pulses only when the live feed is wired) + live UTC clock + build stamp.
   The stamp comes from the build-time snapshot (scripts/gen-meta.mjs)
   so it always states when this build was generated. */
export default function Footer() {
  const [t, setT] = useState('--:--:-- UTC');
  useEffect(() => {
    setT(utcNow());
    const id = setInterval(() => setT(utcNow()), 1000);
    return () => clearInterval(id);
  }, []);

  const updated = buildmeta && buildmeta.buildDate ? `site updated ${buildmeta.buildDate}` : null;

  return (
    <footer>
      <div className="foot-inner">
        <div className="statusline">
          <span className={LIVE ? 'pulse' : 'dot'}></span>
          <span>built and operated by Christopher Lorenzo</span>
          {updated && <span>{updated}</span>}
        </div>
        <div className="clock" id="clock" aria-label="Current UTC time">{t}</div>
      </div>
    </footer>
  );
}
