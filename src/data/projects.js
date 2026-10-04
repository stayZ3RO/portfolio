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
        href: 'https://github.com/stayZ3RO/dns',
      },
    ],
  },
  {
    title: 'Managed Network Infrastructure Lab',
    subtitle: 'Router, Switching & Segmentation',
    status: 'Active / UniFi Core Live',
    statusTone: 'active',
    categories: ['Infrastructure', 'Networking'],
    focus:
      'UDM Pro and USW-24-PoE live since 2026-09-27; flat LAN and Deco APs; VLAN and firewall segmentation planned',
    summary:
      'Replaced the earlier Omada core with a UniFi UDM Pro and USW-24-PoE on 2026-09-27. The LAN remains flat, Deco nodes run as APs, and segmentation is planned.',
    proof: ['UniFi cutover', 'Current state documented', 'Segmentation planned'],
    tools: [
      'UniFi UDM Pro',
      'USW-24-PoE',
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
        text: 'Documented the original Omada cutover, then replaced the router and switch with a UDM Pro and USW-24-PoE on 2026-09-27. Deco nodes remain in AP mode.',
      },
      {
        label: 'Validation',
        text: 'Validated internet access, DNS, client connectivity, AP mode, DHCP, and service reachability after the UniFi cutover.',
      },
      {
        label: 'Next Steps',
        text: 'Continue subnetting, VLAN planning, firewall policy design, pilot VLAN testing, and controlled renumbering without overstating segmentation as finished.',
      },
    ],
    visuals: {
      figure: {
        src: '/proof/managed-topology.webp',
        alt: 'Historical Omada topology before the September 2026 UniFi cutover',
        caption:
          'Historical Omada topology before the 2026-09-27 UniFi cutover. The current core is UDM Pro plus USW-24-PoE; segmentation is still planned.',
      },
      images: [
        {
          src: '/proof/managed-omada-topology.webp',
          alt: 'Historical Omada Controller topology and client list',
          caption: 'Historical Omada Controller evidence from the earlier managed cutover.',
        },
      ],
    },
    links: [
      {
        label: 'GitHub Repo',
        href: 'https://github.com/stayZ3RO/netlab',
      },
    ],
  },
  {
    title: 'VPS Cloud Infrastructure Lab',
    subtitle: 'Linux, Docker & Public Services',
    status: 'In Progress',
    statusTone: 'in-progress',
    categories: ['Cloud', 'Infrastructure'],
    focus: 'Netcup VPS, Docker, Caddy HTTPS, seven Kuma monitors, Discord and self-hosted ntfy alerts; Umami and backups planned',
    summary:
      'A live public edge on a Netcup VPS: Caddy serves HTTPS, Uptime Kuma watches seven targets, and Discord plus self-hosted ntfy carry alerts. Umami and backup/restore work remain planned.',
    proof: ['Caddy HTTPS live', 'Seven Kuma monitors', 'Discord and ntfy alerts tested'],
    tools: [
      'Netcup VPS',
      'Docker',
      'Docker Compose',
      'Cloudflare DNS',
      'Caddy',
      'HTTPS',
      'Uptime Kuma',
      'Discord',
      'ntfy',
      'Tailscale',
    ],
    details: [
      {
        label: 'Problem',
        text: 'Extends homelab experience into public infrastructure, domain management, Linux server administration, and self-hosted application deployment.',
      },
      {
        label: 'Implementation',
        text: 'Hardened the Netcup VPS, restricted SSH to Tailscale, deployed Docker and Caddy HTTPS, and wired Uptime Kuma to Discord and self-hosted ntfy alerts on 2026-09-28.',
      },
      {
        label: 'Validation',
        text: 'Validated public DNS, HTTPS routing, private backend ports, remote access, six public-edge monitors plus ntfy health, Discord DOWN/UP notifications, and ntfy delivery to a phone. Backup/restore remains planned.',
      },
      {
        label: 'Outcome',
        text: 'Runs a monitored HTTPS edge with two alert paths, while keeping administrative access private and leaving stateful app hosting and backup/restore for later phases.',
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
          alt: 'Historical Phase 2 DNS records for stayz3ro.dev',
          caption: 'Historical Phase 2 DNS evidence. The apex now serves the blog from Cloudflare Pages; service subdomains route to the VPS.',
        },
      ],
    },
    links: [
      {
        label: 'GitHub Repo',
        href: 'https://github.com/stayZ3RO/vps-lab',
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
        href: 'https://github.com/stayZ3RO/cloud-netlab',
      },
    ],
  },
];
