/* ---------- live status config ----------
   ONE-LINE SETUP: paste your public Uptime Kuma status page base URL and
   slug below, e.g.
     export const STATUS_URL = 'https://status.chrisalorenzo.com';
     export const STATUS_SLUG = 'homelab';
   Leave both empty to keep the site on documented (static) node state.
   When set, LabFigure fetches `${STATUS_URL}/api/status-page/${STATUS_SLUG}`
   on mount and paints the three Proxmox node dots live (running / building /
   unknown). Any failure (network, non-200, bad shape, timeout) returns null
   and the figure falls back to the documented state, honestly labeled. */
export const STATUS_URL = '';
export const STATUS_SLUG = '';

/* True only when a live status feed is configured. Status dots pulse only
   when there is live telemetry behind them; otherwise they render static,
   so the page never implies live polling it is not doing. */
export const LIVE = Boolean(STATUS_URL && STATUS_SLUG);

const NODE_IDS = ['pve01', 'pve02', 'pve03'];

/* Uptime Kuma monitor status codes: 0 = down, 1 = up, 2 = pending, 3 = maintenance. */
function mapMonitorStatus(code) {
  if (code === 1) return 'running';
  if (code === 2 || code === 3) return 'building';
  return 'unknown'; // down or unrecognized: not confirmed running
}

function normalizeName(name) {
  return String(name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/* GET the status page API with a 6s timeout. Returns null on ANY failure:
   unconfigured, network error, timeout, non-200, or a shape we cannot read.
   Otherwise returns a per-node map: { pve01: 'running'|'building'|'unknown', ... }. */
export async function fetchLiveStatus() {
  if (!STATUS_URL || !STATUS_SLUG) return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const url = STATUS_URL.replace(/\/+$/, '') + '/api/status-page/' + encodeURIComponent(STATUS_SLUG);
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) return null;
    const data = await res.json();

    // Shape A: plain per-node map, e.g. { pve01: 'running', pve02: 'building' }.
    if (data && typeof data === 'object' && !Array.isArray(data) && !data.publicGroupList) {
      const out = {};
      let ok = false;
      NODE_IDS.forEach((id) => {
        const v = data[id];
        if (v === 'running' || v === 'building' || v === 'unknown') {
          out[id] = v;
          ok = true;
        }
      });
      return ok ? out : null;
    }

    // Shape B: Uptime Kuma public status page payload
    // { publicGroupList: [{ monitorList: [{ name, status }] }] }.
    // Monitors are matched to nodes by name containing the node id
    // (case-insensitive, punctuation ignored), e.g. "pve01 · ping".
    const groups = data && data.publicGroupList;
    if (!Array.isArray(groups)) return null;
    const monitors = [];
    groups.forEach((g) => {
      if (g && Array.isArray(g.monitorList)) monitors.push(...g.monitorList);
    });
    if (!monitors.length) return null;

    const out = {};
    NODE_IDS.forEach((id) => {
      const m = monitors.find((mon) => mon && normalizeName(mon.name).includes(id));
      out[id] = m ? mapMonitorStatus(m.status) : 'unknown';
    });
    return out;
  } catch (e) {
    return null; // network, timeout, or unparsable body: fall back to documented state
  } finally {
    clearTimeout(timer);
  }
}
