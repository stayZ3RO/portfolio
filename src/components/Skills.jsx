const skillGroups = [
  {
    title: 'Enterprise IT Support',
    text: 'Windows/macOS, Microsoft 365, Exchange Online, Azure Entra ID, Intune concepts, VPN/MFA/SSO troubleshooting, Jira/JSM, endpoint support, onboarding/offboarding, SLA-based ticket handling.',
  },
  {
    title: 'Networking & DNS',
    text: 'DNS, DHCP, static IP planning, LAN troubleshooting, router/gateway configuration, firewall concepts, VLAN concepts, Tailscale, Pi-hole, Unbound, high-availability DNS.',
  },
  {
    title: 'Managed Infrastructure',
    text: 'TP-Link ER605, Omada Controller, managed switching, AP mode, network topology documentation, cutover validation, segmentation planning.',
  },
  {
    title: 'Systems & Self-Hosting',
    text: 'Linux, Raspberry Pi, Proxmox, Docker, Docker Compose, Portainer, WSL Ubuntu, GitHub, GitHub Pages, self-hosted services.',
  },
  {
    title: 'Monitoring & Observability',
    text: 'Prometheus, Grafana, Alertmanager, Blackbox Exporter, service health checks, DNS monitoring, dashboard building, alert testing, failover validation.',
  },
  {
    title: 'Cloud / VPS / Deployment',
    text: 'Linux VPS, DNS records, static site hosting, GitHub Pages, GitHub Actions, reverse proxy planning, HTTPS planning, Cloudflare planning, public service hosting.',
  },
  {
    title: 'Documentation & Troubleshooting',
    text: 'Technical documentation, README writing, runbooks, architecture diagrams, screenshot-based validation, root cause analysis, change documentation, project case studies.',
  },
];

function Skills() {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="section-heading">
        <p className="eyebrow">Skills Snapshot</p>
        <h2 id="skills-title">Current support experience, project practice, and active buildouts.</h2>
        <p>
          Skills shown here reflect current IT support experience, documented homelab projects,
          managed network work, and active cloud infrastructure buildouts.
        </p>
      </div>

      <div className="skills-grid">
        {skillGroups.map((skill) => (
          <article key={skill.title}>
            <h3>{skill.title}</h3>
            <p>{skill.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;
