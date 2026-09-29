import { Fragment } from 'react';
import { TICKER_COMMITS } from './data';

/* Git-log ticker: real commit subjects as signal. Duplicated for the loop. */
export default function Ticker() {
  const doubled = [...TICKER_COMMITS, ...TICKER_COMMITS];
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
