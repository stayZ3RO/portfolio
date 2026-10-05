import './scanstrip.css';
import Reveal from './Reveal';

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

export default function ScanStrip() {
  return (
    <Reveal className="scanstrip" aria-label="At a glance" variant="rise-left">
      <p className="scan-kicker">SPEC SHEET</p>
      <div className="scan-cols">
        <dl className="scan-rows">
          {FACTS.map(([k, v]) => (
            <div className="scan-row" key={k}>
              <dt>{k}</dt><dd>{v}</dd>
            </div>
          ))}
        </dl>
        <dl className="scan-rows">
          {STACK.map(([k, v]) => (
            <div className="scan-row" key={k}>
              <dt>{k}</dt><dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}
