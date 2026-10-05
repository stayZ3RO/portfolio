import { Fragment, useState } from 'react';
import { TICKER_COMMITS } from './data';
import buildmeta from './buildmeta.json';
import { useReducedMotion } from './env';

/* Git-log ticker: real commit subjects as signal. Commits come from the
   build-time snapshot (scripts/gen-meta.mjs writes buildmeta.json on
   `npm run prebuild`); the committed buildmeta.json is the fallback so
   first paint never breaks, with the mockup-era array as a last resort.
   The list is duplicated for the scroll loop only when motion is allowed;
   under reduced motion it renders once, statically. The pause button gives
   keyboard and touch users the stop control hover gives mouse users. */
const COMMITS =
  buildmeta && Array.isArray(buildmeta.commits) && buildmeta.commits.length
    ? buildmeta.commits
    : TICKER_COMMITS;

export default function Ticker() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const items = reduced ? COMMITS : [...COMMITS, ...COMMITS];
  return (
    <div className={`ticker hero-fade${paused ? ' ticker-paused' : ''}`} style={{ transitionDelay: '.82s' }} aria-label="Recent commits from the portfolio repository">
      <div className="ticker-head">
        <span className="tk-cmd">$ git log --oneline</span>
        <span>portfolio repo</span>
        {!reduced && (
          <button
            type="button"
            className="ticker-pause"
            aria-pressed={paused}
            aria-label={paused ? 'Resume commit ticker' : 'Pause commit ticker'}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? 'resume' : 'pause'}
          </button>
        )}
      </div>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {items.map((c, i) => (
            <Fragment key={`${c.hash}-${i}`}>
              <span className="tick-item">
                <span className="tick-hash">{c.hash}</span>
                {c.subject}
              </span>
              <span className="tick-sep">·</span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
