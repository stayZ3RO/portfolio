/* Site data ported verbatim from the approved v18 mockup.
   Copy is mockup-grade; Christopher will correct wording and data later. */

/* ---------- lab status config ----------
   Static by design: this asserts states ([running]/[building])
   rather than streaming telemetry. Production swap: set
   LAB_STATUS.source = 'uptime-kuma' and paste the public status page
   slug below; the stub fetches /api/status-page/:slug and falls back
   to static on failure. */
export const LAB_STATUS = {
  source: 'static', // 'static' | 'uptime-kuma'
  uptimeKumaStatusSlug: '', // e.g. 'homelab' -> GET /api/status-page/homelab
  nodes: { pve01: 'running', pve02: 'running', pve03: 'running' },
};

export async function fetchLabStatus() {
  if (LAB_STATUS.source !== 'uptime-kuma' || !LAB_STATUS.uptimeKumaStatusSlug)
    return LAB_STATUS.nodes;
  try {
    const r = await fetch(
      '/api/status-page/' + encodeURIComponent(LAB_STATUS.uptimeKumaStatusSlug),
    );
    if (!r.ok) throw new Error('status ' + r.status);
    return await r.json(); // expected shape: { pve01: 'running'|'building', ... }
  } catch (e) {
    return LAB_STATUS.nodes;
  } // graceful fallback to static
}

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
    status: 'running',
    title: 'Home network infrastructure lab',
    outcome: 'DNS, monitoring, and Tailscale across a 3-node Proxmox cluster.',
    pills: ['Proxmox', 'Tailscale', 'Prometheus'],
    body: {
      type: 'declog',
      blocks: [
        {
          label: 'WHAT I BUILT',
          text: 'A 3-node Proxmox cluster joined by a Tailscale mesh, with DNS and monitoring running across every node. Backups land on Proxmox Backup Server, hosted on pve03.',
        },
        {
          label: 'WHAT BROKE',
          text: 'pve02 went through a full chassis transplant mid-project. The cluster kept serving on two nodes while I moved everything over and brought the third back up.',
        },
        {
          label: "WHAT I'D DO DIFFERENTLY",
          text: 'Write the runbook before the renumbering, not during it. The VLAN work is happening in controlled phases now because the addressing plan exists on paper first.',
        },
      ],
    },
  },
  {
    status: 'building',
    title: 'Managed network infrastructure lab',
    outcome: 'VLAN design, firewall policy, and a controlled renumbering, in progress.',
    pills: ['UniFi', 'VLANs', 'Firewall'],
    body: {
      type: 'list',
      items: [
        'VLAN segmentation design for the home network',
        'Firewall policy being written and tested',
        'Controlled renumbering happening in phases',
      ],
    },
  },
  {
    status: 'building',
    title: 'Homelab command center',
    outcome: 'Inventory, monitoring, and status page in one console.',
    pills: ['React', 'Grafana', 'Uptime Kuma'],
    body: {
      type: 'list',
      items: [
        'One console for inventory, monitoring, and status',
        'Grafana dashboards for the metrics that matter',
        'Uptime Kuma status page for everything I run',
      ],
    },
  },
  {
    status: 'running',
    title: 'Service desk automation',
    outcome: 'Automations and dashboards my team runs on, built in my off hours.',
    pills: ['Python', 'n8n'],
    body: {
      type: 'list',
      items: [
        'Automations and dashboards the team uses every day',
        'Built in my off hours, reviewed with my leads',
        'Workflows staged and waiting on leadership approval',
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
