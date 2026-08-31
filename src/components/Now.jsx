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

function Now() {
  return (
    <section className="now" aria-label="Currently working on">
      <p className="label">/ now</p>
      <div className="line">
        <span className="t">
          migrating managed network <b>Omada → UniFi</b>
        </span>
      </div>
      <div className="line">
        <span className="t">
          hardening the VPS <b>reverse-proxy + HTTPS</b> edge
        </span>
      </div>
      <div className="line">
        <span className="t">
          CI-gating the AWS <b>Terraform</b> module
        </span>
      </div>
      <div className="now-meta">{relativeLabel(LAST_UPDATED)}</div>
    </section>
  );
}

export default Now;
