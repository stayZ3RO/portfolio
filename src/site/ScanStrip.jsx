import './scanstrip.css';
import Reveal from './Reveal';

const STACK = [
  'Python',
  'PowerShell',
  'Bash',
  'JavaScript',
  'Docker',
  'Proxmox',
  'Tailscale',
  'Prometheus/Grafana',
  'Terraform/OpenTofu',
  'n8n',
  'Caddy',
];

export default function ScanStrip() {
  return (
    <Reveal className="scanstrip" aria-label="At a glance">
      <div className="scanstrip-facts">
        <span className="scan-fact"><span className="scan-key">loc</span>Hialeah, FL</span>
        <span className="scan-sep" aria-hidden="true">/</span>
        <span className="scan-fact"><span className="scan-key">target</span>Platform / Systems Engineering</span>
        <span className="scan-sep" aria-hidden="true">/</span>
        <span className="scan-fact"><span className="scan-key">open to</span>Hybrid · Remote</span>
      </div>
      <ul className="scan-chips" aria-label="Core stack">
        {STACK.map((s) => (
          <li key={s} className="scan-chip">{s}</li>
        ))}
      </ul>
    </Reveal>
  );
}
