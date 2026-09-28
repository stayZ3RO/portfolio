import Reveal from './Reveal.jsx';

const LAST_UPDATED = '2026-08-30';

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

const ITEMS = [
  <>migrating managed network <b>Omada → UniFi</b></>,
  <>hardening the VPS <b>reverse-proxy + HTTPS</b> edge</>,
  <>CI-gating the AWS <b>Terraform</b> module</>,
];

function Now() {
  return (
    <section className="now" aria-label="Currently working on">
      <Reveal variant="fade">
        <div className="now-head">
          <p className="label">/ now</p>
          <p className="now-meta">{relativeLabel(LAST_UPDATED)}</p>
        </div>
      </Reveal>
      <ul className="now-list">
        {ITEMS.map((item, i) => (
          <Reveal as="li" key={i} className="now-line" variant="soft" delay={i * 90}>
            <span className="now-row">
              <span className="now-idx" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="t">{item}</span>
            </span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export default Now;
