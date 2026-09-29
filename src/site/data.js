/* Site data. SYSTEMS rows were rewritten 2026-09-29 with real content
   from verified sources (homelab-ops-private service map/inventory, project
   repo READMEs, memory notes). Status words are honest: running / building
   reflect verified state, and rows say what is pending instead of implying
   completion. Live lab status now lives in status.js; the old LAB_STATUS
   stub was removed 2026-09-29 as dead code. */

/* ---------- ticker: git log as signal ----------
   TICKER_COMMITS is a snapshot of REAL commits, captured read-only with
   `git log --oneline -12` in the portfolio repo when the mockup was built.
   Production swap: replace the array with an async fetch (git hosting API
   or a build-time generated commits.json), then call renderTicker(data).
   Expected shape: [{hash:'f39ccf4', subject:'fix: ...'}, ...] */
export const TICKER_COMMITS = [
  { hash: 'f39ccf4', subject: 'fix: hallmark slop sweep passes, stamp recorded, 320-768 viewports verified' },
  { hash: 'fbcda6a', subject: 'fix: craft morph bar starts empty at idle' },
  { hash: '7b79b15', subject: 'wip: craft-lab v5 styles, header, theme picker, page shells' },
  { hash: '4cb2179', subject: 'fix: deepen mobile deep-field bottom fade so palette key fully clears text' },
  { hash: 'e552d08', subject: 'fix: remove em dashes from user-facing project copy' },
  { hash: '4569283', subject: 'fix: deep field never hard-clips on mobile, palette key clears text' },
  { hash: '47e783a', subject: 'chore: finalize hallmark stamp with v4 knob deltas and honest-copy note' },
  { hash: '6c1a734', subject: 'fix: audit ambient copy, no invented heartbeats/metrics/hashes or unifi claims' },
  { hash: '6e71ac1', subject: 'fix: ledger omits zero counts, deep stream never clips mid-word on mobile' },
  { hash: '8493a0e', subject: 'feat: cinematic full-bleed field composition, deep stream layer, hand-set indents' },
  { hash: 'adf0676', subject: 'fix: session-row text wraps inside rows, palette focus cue, hallmark stamp' },
  { hash: 'c63bc15', subject: 'feat: session-log composition, header bar and hero removed' },
];

export const SYSTEMS = [
  {
    status: 'building',
    title: 'Service desk automation platform',
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
    outcome: 'High-availability DNS with recursive resolution, moved from Raspberry Pis to Proxmox VMs.',
    pills: ['Pi-hole', 'Unbound', 'Keepalived', 'Proxmox'],
    links: { github: 'https://github.com/stayZ3RO/home-network-infrastructure-HA-DNS' },
    body: {
      type: 'declog',
      blocks: [
        {
          label: 'WHAT I BUILT',
          text: 'A dual-node Pi-hole design behind a Keepalived shared VIP (192.168.68.20) with Unbound for local recursive resolution. The pair moved from physical Raspberry Pis to Proxmox VMs (pihole01 on pve01, pihole02 on pve02). Monitoring runs on a Proxmox-hosted Docker VM with Prometheus, Grafana, Alertmanager, and a Discord alert hook.',
        },
        {
          label: 'WHAT BROKE',
          text: 'Gravity Sync replicated Pi-hole config between the Pis. After the VM migration its operational status was never revalidated, so it is not listed as a live service. The service map now records exactly what each evidence pass established, and nothing more.',
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
    outcome: 'Managed routing and switching cutover complete; a stable baseline for VLAN segmentation.',
    pills: ['TP-Link ER605', 'TL-SG2210P', 'Omada', 'VLANs'],
    links: { github: 'https://github.com/stayZ3RO/home-network-managed-infrastructure-lab' },
    body: {
      type: 'declog',
      blocks: [
        {
          label: 'WHAT I BUILT',
          text: 'Moved routing off the consumer mesh and onto a dedicated TP-Link ER605 router with a managed TL-SG2210P switch. The Deco units dropped to AP mode, an Omada SDN controller handles device visibility, and Pi-hole HA with VIP failover stayed up through the cutover. Post-cutover validation covered internet access, DNS behavior, client connectivity, and service reachability.',
        },
        {
          label: 'WHAT BROKE',
          text: 'pve02 went through a full chassis transplant mid-project and came back as an OptiPlex 3070 Micro with 32GB RAM. The inventory needed a correction afterward, which is why reconciliation is now a documented step instead of an afterthought.',
        },
        {
          label: 'WHAT IS NEXT',
          text: 'VLAN segmentation is the next phase, and the addressing plan exists on paper first. UniFi gear (USW-24-PoE) is owned but not deployed; the physical swap stays a gated future phase.',
        },
      ],
    },
  },
  {
    status: 'running',
    title: 'VPS cloud edge',
    outcome: 'Public edge on a Netcup VPS: Caddy, HTTPS, and a hardened host.',
    pills: ['Netcup', 'Caddy', 'Docker', 'Tailscale'],
    links: { github: 'https://github.com/stayZ3RO/vps-cloud-infra-lab' },
    body: {
      type: 'list',
      items: [
        'Reverse proxy with Caddy and HTTPS live: the blog and Uptime Kuma are publicly accessible over secure connections',
        'SSH and private services reachable over Tailscale only; no public SSH',
        'The portfolio itself is hosted on Cloudflare Pages, not on the VPS',
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
    links: { github: 'https://github.com/stayZ3RO/aws-network-automation-lab' },
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
    id: 'pve01',
    role: 'PRIMARY',
    spec: 'OptiPlex 7060 Micro · i5-8500T · 32GB RAM · 256GB NVMe',
    svcs: ['pihole01', 'omada-controller', 'ts-router01'],
  },
  {
    id: 'pve02',
    role: null,
    spec: 'OptiPlex 3070 Micro · 32GB RAM · 256GB NVMe',
    svcs: ['pihole02', 'ts-router02', 'portainer', 'monitoring', 'rustdesk'],
  },
  {
    id: 'pve03',
    role: 'BACKUP',
    spec: 'EliteDesk 800 G3 DM · i5-6500T · 16GB RAM · 256GB NVMe',
    svcs: ['backup-svr · PBS'],
  },
];
