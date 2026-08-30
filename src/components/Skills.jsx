const skillGroups = [
  {
    title: 'Infrastructure & Virtualization',
    text: 'Proxmox virtualization, Raspberry Pi, Docker, Docker Compose, Portainer, TP-Link ER605, Omada Controller, managed switching, AP mode, network topology documentation.',
  },
  {
    title: 'Networking & DNS',
    text: 'DNS, DHCP, static IP planning, LAN troubleshooting, router/gateway configuration, firewall concepts, VLAN concepts, Tailscale, Pi-hole, Unbound, high-availability DNS.',
  },
  {
    title: 'Cloud & Infrastructure as Code',
    text: 'Linux VPS hosting, DNS records, reverse proxy planning, HTTPS planning, GitHub Pages, GitHub Actions, AWS VPC networking with Terraform/OpenTofu, reusable IaC module design.',
  },
  {
    title: 'Linux / Systems Administration',
    text: 'Linux administration, WSL Ubuntu, shell scripting, Git/GitHub workflows, service and package management, self-hosted services.',
  },
  {
    title: 'Automation & Development',
    text: 'Python automation with pytest, PowerShell scripting, GitHub Actions CI pipelines, network drift-check tooling.',
  },
  {
    title: 'Observability & Operations',
    text: 'Prometheus, Grafana, Alertmanager, Blackbox Exporter, service health checks, dashboard building, alert testing, failover validation.',
  },
  {
    title: 'Enterprise IT',
    text: 'Windows/macOS, Microsoft 365, Exchange Online, Azure Entra ID, Intune concepts, VPN/MFA/SSO troubleshooting, Jira/JSM, endpoint support, onboarding/offboarding, SLA-based ticket handling.',
  },
  {
    title: 'Engineering Practice',
    text: 'Technical documentation, README writing, runbooks, architecture diagrams, root cause analysis, change documentation, and separating validated work from active builds and learning labs.',
  },
  {
    title: 'AI-Assisted Engineering',
    text: 'Agent-assisted research, coding, debugging, review, and documentation across multiple model and coding-agent workflows, with operator review and technical validation before changes are accepted.',
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
          managed network work, learning labs, and active cloud infrastructure buildouts.
        </p>
      </div>

      <div className="skills-list">
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
