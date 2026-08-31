export const projects = [
  {
    title: 'Home Network Infrastructure Lab',
    subtitle: 'HA DNS & Core Services',
    status: 'Mature / Finalizing',
    statusTone: 'mature',
    categories: ['Infrastructure', 'Networking'],
    focus: 'HA DNS, monitoring, Tailscale subnet routing, Proxmox-hosted services',
    summary:
      'Self-hosted infrastructure lab focused on high-availability DNS, recursive DNS, monitoring, alerting, remote access, and Proxmox-hosted services.',
    proof: ['HA DNS failover', 'Monitoring and alerts', 'Remote access validated'],
    tools: [
      'Pi-hole',
      'Keepalived',
      'Gravity Sync',
      'Unbound',
      'Prometheus',
      'Grafana',
      'Alertmanager',
      'Tailscale',
      'Proxmox',
      'Raspberry Pi',
      'Docker',
    ],
    details: [
      {
        label: 'Problem',
        text: 'Needed more control and visibility over home DNS, monitoring, service availability, and remote infrastructure access instead of relying only on consumer router defaults.',
      },
      {
        label: 'Implementation',
        text: 'Built Pi-hole DNS, Keepalived VIP failover, Gravity Sync replication, Unbound recursive DNS, Prometheus/Grafana monitoring, Alertmanager notifications, Tailscale remote access, and Proxmox-hosted services.',
      },
      {
        label: 'Validation',
        text: 'Validated DNS behavior, failover between Pi-hole nodes, recursive DNS resolution, monitoring targets, alert testing, service availability, and remote management access.',
      },
      {
        label: 'Outcome',
        text: 'Created a documented infrastructure foundation that demonstrates DNS control, service monitoring, high availability concepts, remote access, and operational validation.',
      },
    ],
    visuals: {
      figure: {
        src: '/proof/ha-dns-foundation.webp',
        alt: 'Home Network Infrastructure Lab final architecture diagram',
        caption:
          'Final home-network architecture: Pi-hole HA pair behind a Keepalived VIP, Unbound recursion, Prometheus/Grafana monitoring, and Tailscale remote access.',
      },
      images: [
        {
          src: '/proof/ha-dns-failover-dashboard.webp',
          alt: 'Grafana DNS-failover dashboard during a live VIP failover',
          caption: 'Grafana DNS-failover dashboard capturing a live VIP failover between the Pi-hole nodes.',
        },
      ],
    },
    links: [
      {
        label: 'GitHub Repo',
        href: 'https://github.com/stayZ3RO/home-network-infrastructure-HA-DNS',
      },
    ],
  },
  {
    title: 'Managed Network Infrastructure Lab',
    subtitle: 'Router, Switching & Segmentation',
    status: 'Active / Phase 1 Complete',
    statusTone: 'active',
    categories: ['Infrastructure', 'Networking'],
    focus:
      'ER605/Omada cutover complete; subnetting, VLAN planning, firewall policy, pilot VLAN, controlled renumbering planned',
    summary:
      'Migrated the network core from a flat consumer-style setup to managed infrastructure using a TP-Link ER605 router/firewall, Omada-managed switch, and Omada Controller.',
    proof: ['Managed cutover', 'Topology documented', 'Segmentation planned'],
    tools: [
      'TP-Link ER605',
      'Omada Controller',
      'TL-SG2210P',
      'Deco AP mode',
      'Proxmox',
      'VLAN planning',
      'DHCP',
      'DNS',
      'Topology diagrams',
    ],
    details: [
      {
        label: 'Problem',
        text: 'The original home network had limitations around control, segmentation, visibility, and documentation. The lab moves toward a more enterprise-style managed routing and switching model.',
      },
      {
        label: 'Implementation',
        text: 'Performed a managed network cutover using an Omada-managed router and switch, updated the physical and logical topology, and documented validation steps after cutover.',
      },
      {
        label: 'Validation',
        text: 'Validated internet access, DNS behavior, client connectivity, AP mode behavior, router/switch management, DHCP behavior, and service reachability after the cutover.',
      },
      {
        label: 'Next Steps',
        text: 'Continue subnetting, VLAN planning, firewall policy design, pilot VLAN testing, and controlled renumbering without overstating segmentation as finished.',
      },
    ],
    visuals: {
      figure: {
        src: '/proof/managed-topology.webp',
        alt: 'Managed network current-topology diagram',
        caption:
          'Current managed topology: ER605 gateway, TL-SG2210P switch, Omada Controller, and the Proxmox service cluster. Single flat VLAN today, segmentation next.',
      },
      images: [
        {
          src: '/proof/managed-omada-topology.webp',
          alt: 'Omada Controller final topology and client list after cutover',
          caption: 'Omada Controller topology and client list after the managed cutover.',
        },
      ],
    },
    links: [
      {
        label: 'GitHub Repo',
        href: 'https://github.com/stayZ3RO/home-network-managed-infrastructure-lab',
      },
    ],
  },
  {
    title: 'VPS Cloud Infrastructure Lab',
    subtitle: 'Linux, Docker & Public Services',
    status: 'In Progress',
    statusTone: 'in-progress',
    categories: ['Cloud', 'Infrastructure'],
    focus: 'Linux VPS, Docker, reverse proxy, HTTPS, monitoring, backups',
    summary:
      'VPS-based cloud infrastructure lab for Linux administration, Docker Compose, reverse proxying, HTTPS, secure remote access, monitoring, backups, and public-facing application hosting.',
    proof: ['Linux VPS buildout', 'Public DNS path', 'HTTPS routing planned'],
    tools: [
      'Linux VPS',
      'Docker',
      'Docker Compose',
      'DNS records',
      'Reverse proxy planning',
      'HTTPS',
      'Cloudflare planning',
      'Netcup VPS',
      'RackNerd VPS',
      'Monitoring',
      'Backups',
    ],
    details: [
      {
        label: 'Problem',
        text: 'Extends homelab experience into public infrastructure, domain management, Linux server administration, and self-hosted application deployment.',
      },
      {
        label: 'Implementation',
        text: 'Building a VPS-based environment using Linux servers, Dockerized services, domain/DNS configuration, reverse proxy and HTTPS planning, monitoring, and backup workflows.',
      },
      {
        label: 'Validation',
        text: 'Planned validation includes DNS records, service reachability, firewall rules, HTTPS routing, container health, remote access, uptime monitoring, and backup/restore workflows.',
      },
      {
        label: 'Outcome',
        text: 'Creates a cloud infrastructure learning path that connects homelab operations with Linux server administration, public DNS, hosting, and future self-hosted applications.',
      },
    ],
    visuals: {
      figure: {
        src: '/proof/vps-architecture.webp',
        alt: 'VPS cloud infrastructure architecture diagram',
        caption:
          'VPS target architecture: Cloudflare DNS, Caddy TLS termination on 80/443, Tailscale-only admin path, and backend services on an internal Docker network.',
      },
      images: [
        {
          src: '/proof/vps-ufw-firewall.webp',
          alt: 'UFW firewall status on the VPS',
          caption: 'UFW firewall posture on the VPS.',
        },
        {
          src: '/proof/vps-dns-records.webp',
          alt: 'Public DNS records for stayz3ro.dev',
          caption: 'Public DNS records routing stayz3ro.dev to the VPS.',
        },
      ],
    },
    links: [
      {
        label: 'GitHub Repo',
        href: 'https://github.com/stayZ3RO/vps-cloud-infra-lab',
      },
    ],
  },
  {
    title: 'AWS Network Automation Lab',
    subtitle: 'Terraform VPC Module + Python Drift Check',
    status: 'Learning Lab / CI Validated',
    statusTone: 'learning-lab',
    categories: ['Cloud', 'Networking'],
    focus:
      'Reusable Terraform/OpenTofu VPC module, Python drift-check CLI with pytest coverage, GitHub Actions CI. No cloud resources applied',
    summary:
      'A focused learning lab that translates on-prem network segmentation practice into AWS infrastructure-as-code: a reusable Terraform/OpenTofu VPC module, a tested Python network-drift-check CLI, and a CI gate that validates both on every push.',
    proof: ['CI-gated IaC validation', 'Tested Python CLI (pytest)', 'No cloud resources applied'],
    tools: ['Terraform', 'OpenTofu', 'AWS VPC', 'Python', 'pytest', 'GitHub Actions'],
    codeMedia: [
      { prompt: true, text: 'tofu fmt -check && tofu validate' },
      { text: '✓ 0 changes, 0 errors' },
      { prompt: true, text: 'pytest -q' },
      { text: '✓ 24 passed in 2.1s' },
      { prompt: true, text: 'exit 0' },
    ],
    details: [
      {
        label: 'Problem',
        text: 'Wanted hands-on AWS and Terraform practice, plus tested Python automation, to close a specific gap between homelab networking practice and cloud infrastructure-as-code, not to claim production AWS experience.',
      },
      {
        label: 'Implementation',
        text: 'Built a reusable network module (VPC, public/private subnets across AZs, internet gateway, routing, baseline security group) consumed by a dev environment, plus a Python net-drift-check CLI with pytest coverage, wired into GitHub Actions CI.',
      },
      {
        label: 'Validation',
        text: 'CI runs tofu fmt -check, tofu validate, and the full pytest suite on every push and pull request. Locally validated with tofu fmt, init -backend=false, and validate; no AWS credentials or cloud resources were applied.',
      },
      {
        label: 'Outcome',
        text: 'Demonstrates AWS IaC authoring, reusable module design, and CI-gated testing as a scoped learning lab, not a production deployment or long-running project.',
      },
    ],
    links: [
      {
        label: 'GitHub Repo',
        href: 'https://github.com/stayZ3RO/aws-network-automation-lab',
      },
    ],
  },
  {
    title: 'Service Desk Toolkit',
    subtitle: 'PowerShell Diagnostics & Reporting',
    status: 'Private / In Development',
    statusTone: 'private',
    categories: ['Tools'],
    focus: 'PowerShell diagnostics, reporting, future repair/remediation workflows',
    summary:
      'Private PowerShell toolkit for repeatable service desk diagnostics, report collection, and future repair/remediation workflows.',
    proof: ['Private toolkit', 'Diagnostics focus', 'Repair workflows planned'],
    tools: ['PowerShell', 'Windows diagnostics', 'Reporting', 'Endpoint support', 'Runbooks'],
    codeMedia: [
      { prompt: true, text: 'Get-Service | Where-Object Status -eq "Running"' },
      { text: 'collecting diagnostics...' },
      { prompt: true, text: 'Export-Report -Path ~/reports' },
      { text: 'report written ✓' },
      { prompt: true, text: 'exit 0' },
    ],
    details: [
      {
        label: 'Problem',
        text: 'Common service desk checks can become repetitive and inconsistent without a small, documented toolkit for gathering useful diagnostic signals.',
      },
      {
        label: 'Implementation',
        text: 'Building private PowerShell scripts for diagnostics and reporting first, with repair and remediation workflows planned only after validation.',
      },
      {
        label: 'Outcome',
        text: 'Aims to improve support consistency, speed up information gathering, and reinforce practical scripting habits without exposing internal or sensitive workflows.',
      },
    ],
    links: [],
  },
];
