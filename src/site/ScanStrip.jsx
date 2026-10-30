import './scanstrip.css';

const FACTS = [
  ['loc', 'Hialeah, FL'],
  ['target', 'Platform / Systems Engineering'],
  ['open to', 'Hybrid · Remote'],
];

const STACK = [
  ['languages', 'Python · PowerShell · Bash · JavaScript'],
  ['platforms', 'Docker · Proxmox · Tailscale · n8n'],
  ['infra', 'Caddy · Prometheus / Grafana · Terraform / OpenTofu'],
];

/* Spec sheet: the fast-scan facts in a ruled grid, beside the hero copy. */
export default function ScanStrip() {
  return (
    <aside className="scanstrip hero-fade" style={{ transitionDelay: '.4s' }} aria-label="At a glance">
      <p className="scan-kicker">spec sheet</p>
      <dl className="scan-rows">
        {[...FACTS, ...STACK].map(([k, v]) => (
          <div className="scan-row" key={k}>
            <dt>{k}</dt><dd>{v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
