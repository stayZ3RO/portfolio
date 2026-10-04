import Reveal from './Reveal.jsx';

const LAST_UPDATED = '2026-10-04';

function relativeLabel(iso) {
  const then = new Date(iso + 'T00:00:00');
  const now = new Date();
  const days = Math.floor((now - then) / 86400000);

  if (days <= 0) return 'updated today';
  if (days === 1) return 'updated yesterday';
  if (days < 7) return `updated ${days} days ago`;
  if (days < 14) return 'updated last week';
  if (days < 30) return `updated ${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return 'updated last month';
  return `updated ${Math.floor(days / 30)} months ago`;
}

function Now() {
  return (
    <section className="now" aria-label="Current project status">
      <Reveal>
        <p className="label">/ now</p>
      </Reveal>
      <Reveal delay={40}>
        <div className="line">
          <span className="t">
            UniFi core live; <b>VLAN and firewall segmentation planned</b>
          </span>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className="line">
          <span className="t">
            VPS HTTPS and seven monitors live; <b>backup/restore planned</b>
          </span>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className="line">
          <span className="t">
            AWS lab <b>CI validated</b>; no cloud resources applied
          </span>
        </div>
      </Reveal>
      <Reveal delay={160}>
        <div className="now-meta">{relativeLabel(LAST_UPDATED)}</div>
      </Reveal>
    </section>
  );
}

export default Now;
