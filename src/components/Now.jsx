function Now() {
  return (
    <section className="now" aria-label="Currently working on">
      <p className="label">/ now</p>
      <div className="line">
        <time>aug 30</time>
        <span className="t">
          migrating managed network <b>Omada → UniFi</b>
        </span>
      </div>
      <div className="line">
        <time>aug 30</time>
        <span className="t">
          hardening the VPS <b>reverse-proxy + HTTPS</b> edge
        </span>
      </div>
      <div className="line">
        <time>aug 30</time>
        <span className="t">
          CI-gating the AWS <b>Terraform</b> module
        </span>
      </div>
    </section>
  );
}

export default Now;
