/* Site data. SYSTEMS rows were rewritten 2026-09-29 with real content
   from project repo READMEs and memory notes. Status words are honest:
   running / building reflect verified state, and rows say what is pending
   instead of implying completion. Live lab status now lives in status.js;
   the old LAB_STATUS stub was removed 2026-09-29 as dead code. */

export const SYSTEMS = [
  {
    status: 'building',
    title: 'Service desk automation platform',
    diagram: 'desk',
    outcome: 'Ticketing workflows and dashboards the desk runs on, built in my off hours.',
    pills: ['n8n', 'Grafana', 'ticketing API'],
    body: {
      type: 'declog',
      blocks: [
        {
          label: 'WHAT I BUILT',
          text: 'Around 10 n8n workflows on manual trigger. Each one validates ticketing API auth first and refuses to emit a false "zero open tickets" report when auth fails. Behind them sit 2 native platform dashboard pages (live queue status and KB health, refreshed hourly, viewable by every licensed user) and 4 Grafana dashboards: leadership queue split plus assignee workload plus aging backlog and SLA watchlist, a personal execution view, KB operations, and queue trends.',
        },
        {
          label: 'WHAT IS LIVE',
          text: 'The dashboards are the live part. Every licensed user can view the native pages, and two leadership stakeholders hold read-only Grafana viewer accounts. Both directors have seen the work and want more of it.',
        },
        {
          label: 'WHAT IS PENDING',
          text: 'The n8n workflows are staged, waiting on leadership approval and platform activation. The AI Metrics variant is excluded from that batch and stays in manual internal testing.',
        },
      ],
    },
  },
  {
    status: 'running',
    title: 'HA DNS lab',
    diagram: 'dns',
    outcome: 'High-availability DNS with recursive resolution, moved from Raspberry Pis to Proxmox VMs.',
    pills: ['Pi-hole', 'Unbound', 'Keepalived', 'Proxmox'],
    links: { github: 'https://github.com/stayZ3RO/dns' },
    body: {
      type: 'declog',
      blocks: [
        {
          label: 'WHAT I BUILT',
          text: 'A dual-node Pi-hole design behind a Keepalived shared VIP with Unbound for local recursive resolution. The pair moved from physical Raspberry Pis to Proxmox VMs. Monitoring runs on a Proxmox-hosted Docker VM with Prometheus, Grafana, Alertmanager, and a Discord alert hook.',
        },
        {
          label: 'WHAT BROKE',
          text: 'Gravity Sync replicated Pi-hole config between the Pis. After the VM migration its operational status went unrevalidated for a while, so it sat unlisted as a live service until a dedicated pass replaced it with Nebula Sync: hourly selective policy sync between the pair, gravity sets now byte-identical, TLS-verified API access, and alerting proven end to end with an induced-failure test.',
        },
        {
          label: "WHAT I'D DO DIFFERENTLY",
          text: 'Retire replication methods in the same phase as the migration that made them obsolete. History stays useful only when each record carries its phase date.',
        },
      ],
    },
  },
  {
    status: 'running',
    title: 'Managed network infrastructure lab',
    diagram: 'net',
    outcome: 'UniFi UDM Pro and USW-24-PoE live since 2026-09-27; flat LAN today, VLAN segmentation planned.',
    pills: ['UniFi UDM Pro', 'USW-24-PoE', 'Deco AP mode', 'VLANs'],
    links: { github: 'https://github.com/stayZ3RO/netlab' },
    body: {
      type: 'declog',
      blocks: [
        {
          label: 'WHAT I BUILT',
          text: 'Moved routing off the consumer mesh first, onto a TP-Link ER605 router and a managed TL-SG2210P switch with an Omada SDN controller, then replaced that core with a UniFi UDM Pro and USW-24-PoE on 2026-09-27. The Deco units stayed in AP mode through both cutovers, and Pi-hole HA with VIP failover stayed up the whole time. The old ER605 and TL-SG2210P are unplugged and retired.',
        },
        {
          label: 'WHAT BROKE',
          text: 'The second Proxmox node went through a full chassis transplant mid-project and came back as an OptiPlex 3070 Micro with 32GB RAM. The inventory needed a correction afterward, which is why reconciliation is now a documented step instead of an afterthought.',
        },
        {
          label: 'WHAT IS NEXT',
          text: 'The LAN is still flat. VLAN segmentation and firewall policy are the next phase, with the addressing plan drafted on paper first.',
        },
      ],
    },
  },
  {
    status: 'running',
    title: 'VPS cloud edge',
    outcome: 'Public edge on a Netcup VPS: Caddy, HTTPS, a monitored status page, and a hardened host.',
    pills: ['Netcup', 'Caddy', 'Uptime Kuma', 'Tailscale'],
    links: { github: 'https://github.com/stayZ3RO/vps-lab' },
    body: {
      type: 'list',
      items: [
        'Reverse proxy with Caddy and HTTPS live: the public status page and self-hosted ntfy are publicly accessible over secure connections',
        'Uptime Kuma watches the public edge and alerts through Discord and self-hosted ntfy',
        'SSH and private services reachable over Tailscale only; no public SSH',
        'The portfolio and blog are hosted on Cloudflare Pages, not on the VPS',
        'Still ahead: app-layer auth (Authelia is the candidate), a public Grafana dashboard, backups',
      ],
    },
  },
  {
    status: 'building',
    title: 'Homelab command center',
    outcome: 'A self-hosted ops console for the lab: inventory, monitoring, and subscriptions in one place.',
    pills: ['React', 'FastAPI', 'MongoDB', 'Proxmox'],
    body: {
      type: 'list',
      items: [
        'Single-tenant console: Proxmox discovery, device inventory, an alert inbox, and subscription tracking with a public status page on the roadmap',
        'v1 is code-complete on a local branch; the backend security review closed with the test suite green',
        'Honest scope: not yet deployed against the live lab. Proxmox live discovery and real notification delivery still need hardware validation',
      ],
    },
  },
  {
    status: 'building',
    title: 'Cloud networking as code',
    outcome: 'The VLAN mental model from my rack, expressed as reviewable infrastructure as code. Nothing applied yet.',
    pills: ['OpenTofu', 'Python', 'pytest', 'GitHub Actions'],
    links: { github: 'https://github.com/stayZ3RO/cloud-netlab' },
    body: {
      type: 'list',
      items: [
        'Reusable network module: VPC, public and private subnets across AZs, internet gateway, routing, and a baseline deny-inbound/allow-egress security group',
        'net-drift-check: a Python CLI that compares desired vs actual network state and exits non-zero on drift, backed by 101 pytest tests',
        'CI runs fmt, validate, and the test suite on every push; no cloud resources have been applied',
        'Honest scope: this is a lab demonstrating IaC authoring and CI-gated testing, not production cloud operations',
      ],
    },
  },
  {
    status: 'running',
    title: 'Service desk diagnostic toolkit',
    outcome: 'A portable PowerShell diagnostics toolkit the desk uses for Windows triage.',
    pills: ['PowerShell', 'WPF', 'Windows'],
    body: {
      type: 'list',
      items: [
        'Guided diagnostics for network, VPN, DNS, app access, Cloud PC, device health, and known fixes',
        'WPF troubleshooting console with dashboard, network, apps, device health, and reporting sections; WinForms and CLI fallbacks',
        'Ticket-ready summaries with sanitized reporting; admin and high-impact repairs gated behind elevation checks and confirmations',
        'Everything in Git with local CI: lint and secret scanning',
      ],
    },
  },
];

export const NODE_CARDS = [
  {
    id: 'node1',
    label: 'Primary node',
    role: 'PRIMARY',
    spec: 'OptiPlex 7060 Micro · i5-8500T · 32GB RAM · 256GB NVMe',
    svcs: ['DNS', 'tailscale router'],
  },
  {
    id: 'node2',
    label: 'Second node',
    role: null,
    spec: 'OptiPlex 3070 Micro · 32GB RAM · 256GB NVMe',
    svcs: ['DNS secondary', 'tailscale router', 'container host', 'monitoring', 'remote access'],
  },
  {
    id: 'node3',
    label: 'Third node',
    role: 'BACKUP',
    spec: 'EliteDesk 800 G3 DM · i5-6500T · 16GB RAM · 256GB NVMe',
    svcs: ['Backup server · PBS'],
  },
];

export const FLEET = [
  ['DNS', 'node1', 'Primary node', 'DNS + network-wide filtering'],
  ['Tailscale router', 'node1', 'Primary node', 'Tailscale subnet router'],
  ['DNS secondary', 'node2', 'Second node', 'DNS secondary'],
  ['Tailscale router (secondary)', 'node2', 'Second node', 'Tailscale subnet router'],
  ['Container host', 'node2', 'Second node', 'container management'],
  ['Monitoring', 'node2', 'Second node', 'Prometheus + Grafana'],
  ['Remote access', 'node2', 'Second node', 'remote desktop'],
  ['Backup server', 'node3', 'Third node', 'Proxmox Backup Server'],
  ['caddy', 'vps-edge', 'VPS edge', 'reverse proxy + HTTPS'],
  ['blog', 'vps-edge', 'VPS edge', 'engineering blog'],
  ['uptime-kuma', 'vps-edge', 'VPS edge', 'status monitoring'],
];
