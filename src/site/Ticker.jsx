import { Fragment } from 'react';
import { TICKER_COMMITS } from './data';
import buildmeta from './buildmeta.json';

/* Git-log ticker: real commit subjects as signal. Commits come from the
   build-time snapshot (scripts/gen-meta.mjs writes buildmeta.json on
   `npm run prebuild`); the committed buildmeta.json is the fallback so
   first paint never breaks, with the mockup-era array as a last resort.
   Duplicated for the loop. */
const COMMITS =
  buildmeta && Array.isArray(buildmeta.commits) && buildmeta.commits.length
    ? buildmeta.commits
    : TICKER_COMMITS;

export default function Ticker() {
  const doubled = [...COMMITS, ...COMMITS];
  return (
    <div className="ticker hero-fade" style={{ transitionDelay: '.82s' }} aria-label="Recent commits from the portfolio repository">
      <div className="ticker-head">
        <span className="tk-cmd">$ git log --oneline</span>
        <span>portfolio repo</span>
      </div>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {doubled.map((c, i) => (
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
