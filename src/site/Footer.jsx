import { useEffect, useState } from 'react';
import buildmeta from './buildmeta.json';
import MotionToggle from './MotionToggle';
import { LIVE } from './status';

function utcNow() {
  return new Date().toISOString().slice(11, 19) + ' UTC';
}

/* Colophon: status line (pulses only when the live feed is wired), the
   doc tag, build stamp, the motion override and a live UTC clock, under
   a double rule. The stamp comes from the build-time snapshot
   (scripts/gen-meta.mjs) so it always states when this build was generated. */
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
          <span className="doc-tag">PF-01</span>
        </div>
        <div className="foot-tools">
          <MotionToggle />
          <div className="clock" id="clock" aria-label="Current UTC time">{t}</div>
        </div>
      </div>
    </footer>
  );
}
