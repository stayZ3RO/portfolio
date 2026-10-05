import { useEffect, useRef, useState } from 'react';
import { SVG_NS, stepMesh, useReducedMotion } from './env';
import { hideTip, showTip } from './tip';
import { STATUS_URL, fetchLiveStatus } from './status';

function labDesktopLayout() {
  return {
    nodes: [
      { id: 'pve01', label: 'Primary node', x: 260, y: 195, R: 30, fs: 15, ldy: 56, sub: 'OptiPlex 7060 Micro · i5-8500T · 32GB RAM',
        tip: 'DNS · tailscale router' },
      { id: 'pve02', label: 'Second node', x: 440, y: 85, R: 30, fs: 15, ldy: 56, sub: 'OptiPlex 3070 Micro · 32GB RAM',
        tip: 'DNS secondary · tailscale router · container host · monitoring · remote access' },
      { id: 'pve03', label: 'Third node', x: 620, y: 195, R: 30, fs: 15, ldy: 56, sub: 'EliteDesk 800 G3 DM · i5-6500T · 16GB · PBS host',
        tip: 'Backup server · Proxmox Backup Server' },
      { id: 'vps-edge', x: 695, y: 52, R: 24, fs: 13, ldy: 50, kind: 'vps', sub: 'Netcup VPS · public edge',
        tip: 'Caddy + HTTPS · blog · Uptime Kuma' },
    ],
    mesh: [[0, 1], [1, 2], [0, 2]],
    edgeLinks: [{ a: 3, b: 2, pkts: 2, speed: 0.00011 }],
    halo: { cx: 110, cy: 236, rx: 70, ry: 62, tag: 'tailnet', tagX: 110, tagY: 314 },
    devices: [
      { label: 'phone', x: 85, y: 210 }, { label: 'laptop', x: 135, y: 210 },
      { label: 'mac-mini', x: 68, y: 262 }, { label: 'gaming-pc', x: 152, y: 262 },
    ],
    deviceUplink: { x: 260, y: 195 },
    haloUplink: { x: 260, y: 195, R: 30 },
    sensors: [
      { label: 'rpi-1', x: 250, y: 318, link: 0 },
      { label: 'rpi-2', x: 550, y: 318, link: 2 },
    ],
  };
}

function labMobileLayout() {
  return {
    nodes: [
      { id: 'pve01', label: 'Primary node', x: 66, y: 84, R: 26, fs: 12.5, ldy: -44, sub: 'OptiPlex 7060 Micro · i5-8500T · 32GB RAM',
        tip: 'DNS · tailscale router' },
      { id: 'pve02', label: 'Second node', x: 180, y: 84, R: 26, fs: 12.5, ldy: -44, sub: 'OptiPlex 3070 Micro · 32GB RAM',
        tip: 'DNS secondary · tailscale router · container host · monitoring · remote access' },
      { id: 'pve03', label: 'Third node', x: 294, y: 84, R: 26, fs: 12.5, ldy: -44, sub: 'EliteDesk 800 G3 DM · i5-6500T · 16GB · PBS host',
        tip: 'Backup server · Proxmox Backup Server' },
      { id: 'vps-edge', x: 66, y: 200, R: 22, fs: 12, ldy: 44, kind: 'vps', sub: 'Netcup VPS · public edge',
        tip: 'Caddy + HTTPS · blog · Uptime Kuma' },
    ],
    mesh: [[0, 1], [1, 2], [0, 2]],
    edgeLinks: [{ a: 3, b: 0, pkts: 2, speed: 0.00011 }],
    tailnetBox: { x: 120, y: 150, w: 230, h: 100, tag: 'tailnet' },
    devices: [
      { label: 'phone', x: 175, y: 180 }, { label: 'laptop', x: 285, y: 180 },
      { label: 'mac-mini', x: 175, y: 218 }, { label: 'gaming-pc', x: 285, y: 218 },
    ],
    boxUplink: { x: 180, y: 110 },
    sensors: [
      { label: 'rpi-1', x: 175, y: 300 },
      { label: 'rpi-2', x: 285, y: 300 },
    ],
  };
}

/* Full infrastructure map: 3-node Proxmox cluster (centerpiece) +
   public-edge VPS + tailnet device halo + on-LAN sensor dots.
   Two layouts: desktop SVG and a simplified mobile SVG (<=560px).
   Only the visible one is built/animated. */
export default function LabFigure({ sectionRef, apiRef }) {
  const deskRef = useRef(null);
  const mobRef = useRef(null);
  const reduced = useReducedMotion();

  /* Live node state: null = documented (static) state. When STATUS_URL is
     set, fetchLiveStatus() attempts the public status page on mount; on any
     failure we stay on the documented state, honestly labeled. */
  const [liveInfo, setLiveInfo] = useState(null);
  const [live, setLive] = useState(false);
  const statesRef = useRef(null);
  const paintRef = useRef(null);

  useEffect(() => {
    if (!STATUS_URL) return;
    let alive = true;
    fetchLiveStatus().then((s) => {
      if (!alive || !s) return;
      statesRef.current = s;
      setLiveInfo(s);
      setLive(true);
    });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (paintRef.current) paintRef.current();
  }, [liveInfo]);

  useEffect(() => {
    const labSVGd = deskRef.current;
    const labSVGm = mobRef.current;
    const section = sectionRef.current;
    if (!labSVGd || !labSVGm || !section) return;

    const labMQ = window.matchMedia('(max-width:560px)');
    let labGLinks, labGNodes, labGPkts;
    let labLinkEls = [], labPktDefs = [], labNodeEls = [];
    let labRaf = null, labStarted = false, labIsMobile = labMQ.matches, labGen = 0;
    const timers = [];
    let labIO = null;
    /* one-time hint: pulse pve01 shortly after first reveal so visitors see
       the connection-focus interaction without having to discover it. */
    let hintDone = false, interacted = false, hintOn = null, hintOff = null;

    function labLink(A, B, opts) {
      opts = opts || {};
      const ln = document.createElementNS(SVG_NS, 'line');
      ln.setAttribute('x1', A.x); ln.setAttribute('y1', A.y);
      ln.setAttribute('x2', B.x); ln.setAttribute('y2', B.y);
      if (opts.thin) ln.setAttribute('stroke-width', '0.75');
      labGLinks.appendChild(ln);
      const L = { el: ln, A, B, edge: !!opts.edge, aId: A.id || null, bId: B.id || null };
      labLinkEls.push(L);
      const n = opts.pkts == null ? 4 : opts.pkts;
      for (let k = 0; k < n; k++) {
        const c = document.createElementNS(SVG_NS, 'circle');
        c.setAttribute('r', opts.thin ? '2.5' : '3.5');
        c.setAttribute('opacity', '0');
        labGPkts.appendChild(c);
        const dir = k % 2;
        labPktDefs.push({
          el: c, A: dir ? B : A, B: dir ? A : B,
          aId: A.id || null, bId: B.id || null,
          phase: (labPktDefs.length * 0.23) % 1,
          speed: opts.speed || 0.00013,
        });
      }
      return L;
    }

    function rayEllipseEdge(px, py, tx, ty, h) {
      const dx = tx - px, dy = ty - py;
      const len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
      const ox = px - h.cx, oy = py - h.cy;
      const a = (ux * ux) / (h.rx * h.rx) + (uy * uy) / (h.ry * h.ry);
      const b = 2 * ((ox * ux) / (h.rx * h.rx) + (oy * uy) / (h.ry * h.ry));
      const c = (ox * ox) / (h.rx * h.rx) + (oy * oy) / (h.ry * h.ry) - 1;
      const s = (-b + Math.sqrt(Math.max(b * b - 4 * a * c, 0))) / (2 * a);
      return { x: px + ux * s, y: py + uy * s };
    }

    function labDot(d, big) {
      const c = document.createElementNS(SVG_NS, 'circle');
      c.setAttribute('cx', d.x); c.setAttribute('cy', d.y);
      c.setAttribute('r', big ? '4' : '3.5');
      c.style.setProperty('fill', 'var(--secondary)');
      labGNodes.appendChild(c);
      const t = document.createElementNS(SVG_NS, 'text');
      t.setAttribute('x', d.x); t.setAttribute('y', d.y + 17);
      t.setAttribute('text-anchor', 'middle');
      t.style.setProperty('fill', 'var(--muted)');
      t.setAttribute('font-size', '10.5');
      t.setAttribute('font-family', 'ui-monospace,monospace');
      t.textContent = d.label;
      labGNodes.appendChild(t);
    }

    function labTag(x, y, text) {
      const t = document.createElementNS(SVG_NS, 'text');
      t.setAttribute('x', x); t.setAttribute('y', y);
      t.setAttribute('text-anchor', 'middle');
      t.style.setProperty('fill', 'var(--muted)');
      t.setAttribute('font-size', '10.5');
      t.setAttribute('letter-spacing', '2');
      t.setAttribute('font-family', 'ui-monospace,monospace');
      t.textContent = text;
      labGLinks.appendChild(t);
    }

    /* Paint live node states onto the core dots. Mapping mirrors the
       tag dot styles: running = solid, building = hollow, unknown = dimmed.
       Nodes not covered by live data (e.g. vps-edge) keep the default. */
    function paintNodeStates() {
      const states = statesRef.current;
      labNodeEls.forEach(({ id, label, g, sub }) => {
        const core = g.querySelector('.core');
        if (!core) return;
        if (!states || !(id in states)) {
          g.setAttribute('aria-label', `${label || id}: ${sub}`);
          return;
        }
        const s = states[id] || 'unknown';
        core.removeAttribute('opacity');
        core.removeAttribute('stroke');
        core.removeAttribute('stroke-width');
        if (s === 'running') {
          core.style.setProperty('fill', 'var(--text)');
        } else if (s === 'building') {
          core.setAttribute('fill', 'none');
          core.style.setProperty('stroke', 'var(--muted)');
          core.setAttribute('stroke-width', '1.5');
        } else { /* unknown */
          core.style.setProperty('fill', 'var(--muted)');
          core.setAttribute('opacity', '0.35');
        }
        g.setAttribute('aria-label', `${label || id}: ${sub} · state: ${s}`);
      });
    }
    paintRef.current = paintNodeStates;

    function buildLabFigure() {
      labGen++;
      const L = labIsMobile ? labMobileLayout() : labDesktopLayout();
      const svg = labIsMobile ? labSVGm : labSVGd;
      labGLinks = svg.querySelector('.lab-links');
      labGNodes = svg.querySelector('.lab-nodes');
      labGPkts = svg.querySelector('.lab-packets');
      labGLinks.innerHTML = ''; labGNodes.innerHTML = ''; labGPkts.innerHTML = '';
      labLinkEls = []; labPktDefs = []; labNodeEls = [];

      L.mesh.forEach(([a, b]) => labLink(L.nodes[a], L.nodes[b], {}));
      L.edgeLinks.forEach((e) => labLink(L.nodes[e.a], L.nodes[e.b], { edge: true, pkts: e.pkts, speed: e.speed }));

      if (L.halo) {
        const h = L.halo;
        const halo = document.createElementNS(SVG_NS, 'ellipse');
        halo.setAttribute('cx', h.cx); halo.setAttribute('cy', h.cy);
        halo.setAttribute('rx', h.rx); halo.setAttribute('ry', h.ry);
        halo.setAttribute('fill', 'none'); halo.style.setProperty('stroke', 'var(--hairline)');
        halo.setAttribute('stroke-width', '1'); halo.setAttribute('stroke-dasharray', '4 6');
        labGLinks.appendChild(halo);
        labTag(h.tagX, h.tagY, h.tag);
        L.devices.forEach((d) => {
          const e = rayEllipseEdge(d.x, d.y, L.deviceUplink.x, L.deviceUplink.y, h);
          labLink(d, e, { thin: true, pkts: 0 });
        });
        const he = rayEllipseEdge(h.cx, h.cy, L.haloUplink.x, L.haloUplink.y, h);
        const dx = L.haloUplink.x - he.x, dy = L.haloUplink.y - he.y;
        const dl = Math.hypot(dx, dy) || 1;
        const stop = L.haloUplink.R + 8;
        labLink(he, { x: L.haloUplink.x - (dx / dl) * stop, y: L.haloUplink.y - (dy / dl) * stop },
          { thin: true, edge: true, pkts: 1, speed: 0.00009 });
      }

      if (L.tailnetBox) {
        const b = L.tailnetBox;
        const r = document.createElementNS(SVG_NS, 'rect');
        r.setAttribute('x', b.x); r.setAttribute('y', b.y);
        r.setAttribute('width', b.w); r.setAttribute('height', b.h); r.setAttribute('rx', '12');
        r.setAttribute('fill', 'none'); r.style.setProperty('stroke', 'var(--hairline)');
        r.setAttribute('stroke-width', '1'); r.setAttribute('stroke-dasharray', '4 6');
        labGLinks.appendChild(r);
        labTag(b.x + b.w / 2, b.y - 8, b.tag);
        L.devices.forEach((d) => labLink(d, { x: d.x, y: b.y }, { thin: true, pkts: 0 }));
        labLink({ x: b.x + b.w / 2, y: b.y }, L.boxUplink, { thin: true, edge: true, pkts: 1, speed: 0.00009 });
      }

      L.devices.forEach((d) => labDot(d, true));

      if (L.sensors) {
        L.sensors.forEach((s) => {
          if (s.link != null) {
            labLink(s, L.nodes[s.link], { thin: true, pkts: 1, speed: 0.00008 });
          } else if (L.tailnetBox) {
            labLink(s, { x: s.x, y: L.tailnetBox.y + L.tailnetBox.h }, { thin: true, pkts: 1, speed: 0.00008 });
          }
          labDot(s, false);
        });
      }

      const disposers = [];
      L.nodes.forEach((n, i) => {
        const outer = document.createElementNS(SVG_NS, 'g');
        outer.setAttribute('transform', `translate(${n.x},${n.y})`);
        const inner = document.createElementNS(SVG_NS, 'g');
        inner.setAttribute('class', 'lmnode');
        inner.setAttribute('role', 'button');
        inner.setAttribute('tabindex', '0');
        inner.setAttribute('aria-label', `${n.label || n.id}: ${n.sub}`);
        inner.style.transitionDelay = `${i * 0.2}s`;
        inner.innerHTML =
          `<circle class="hit" r="${n.R + 22}" fill="rgba(0,0,0,0)" pointer-events="all"/>` +
          `<circle class="halo" r="${n.R + 10}" fill="none" stroke="#f4f4f2" stroke-width="1" opacity="0.18"/>` +
          `<circle class="beat" r="${n.R}" style="animation-delay:${(i * 0.9).toFixed(1)}s"/>` +
          `<circle class="ring" r="${n.R}" fill="none" stroke="#f4f4f2" stroke-width="1.5"/>` +
          `<circle class="core" r="${n.R > 24 ? 6 : 5}" fill="#c9ccd1"/>` +
          `<text y="${n.ldy}" text-anchor="middle" fill="#f4f4f2" font-size="${n.fs}" font-weight="600" font-family="ui-monospace,monospace">${n.label || n.id}</text>`;
        outer.appendChild(inner);
        labGNodes.appendChild(outer);
        labNodeEls.push({ id: n.id, label: n.label, g: inner, sub: n.sub });
        const card = section.querySelector(`.node-card[data-node="${n.id}"],.edge-card[data-node="${n.id}"]`);
        const setCard = (on) => { if (card) card.classList.toggle('hot-card', on); };
        /* connection focus: hovering a node lights its links and dims the rest */
        const setFocus = (on) => {
          const svg = labIsMobile ? labSVGm : labSVGd;
          svg.querySelector('.lab-links').classList.toggle('dim', on);
          labLinkEls.forEach((L) => L.el.classList.toggle('lit', on && (L.aId === n.id || L.bId === n.id)));
          labPktDefs.forEach((P) => P.el.classList.toggle('dim', on && !(P.aId === n.id || P.bId === n.id)));
        };
        const onEnter = () => { interacted = true; showTip(n, inner); setCard(true); setFocus(true); };
        const onLeave = () => { interacted = true; hideTip(); setCard(false); setFocus(false); };
        const onKey = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showTip(n, inner); setFocus(true);
            setTimeout(() => { hideTip(); setFocus(false); }, 2200);
          }
        };
        inner.addEventListener('mouseenter', onEnter);
        inner.addEventListener('mouseleave', onLeave);
        inner.addEventListener('focus', onEnter);
        inner.addEventListener('blur', onLeave);
        inner.addEventListener('keydown', onKey);
        if (n.id === 'pve01') { hintOn = onEnter; hintOff = onLeave; }
        disposers.push(() => {
          inner.removeEventListener('mouseenter', onEnter);
          inner.removeEventListener('mouseleave', onLeave);
          inner.removeEventListener('focus', onEnter);
          inner.removeEventListener('blur', onLeave);
          inner.removeEventListener('keydown', onKey);
        });
      });
      paintNodeStates();
      return disposers;
    }

    let nodeDisposers = [];
    function labFinalize() {
      labLinkEls.forEach((L) => {
        L.el.style.transition = '';
        L.el.style.strokeDasharray = L.edge ? '8 7' : '6 7';
        L.el.style.strokeDashoffset = '0';
      });
    }
    function startLabLife() {
      if (labRaf) return;
      const svg = labIsMobile ? labSVGm : labSVGd;
      const cores = [...svg.querySelectorAll('.lmnode .core')];
      const loop = () => { stepMesh(labLinkEls, labPktDefs, cores); labRaf = requestAnimationFrame(loop); };
      loop();
    }
    function teardownLab() { if (labRaf) { cancelAnimationFrame(labRaf); labRaf = null; } }
    function startLab(instant) {
      section.classList.add('live');
      labStarted = true;
      if (reduced) {
        labFinalize();
        const now = performance.now();
        labPktDefs.forEach((p) => {
          const t = (now * p.speed + p.phase) % 1;
          p.el.setAttribute('cx', (p.A.x + (p.B.x - p.A.x) * t).toFixed(1));
          p.el.setAttribute('cy', (p.A.y + (p.B.y - p.A.y) * t).toFixed(2));
          p.el.setAttribute('opacity', '0.85');
        });
        return;
      }
      if (instant) { labFinalize(); startLabLife(); return; }
      const DRAW_MS = 1300, g = labGen;
      labLinkEls.forEach((L) => {
        const len = L.el.getTotalLength();
        L.el.style.strokeDasharray = String(len);
        L.el.style.strokeDashoffset = String(len);
      });
      void labGLinks.getBoundingClientRect();
      labLinkEls.forEach((L, i) => {
        L.el.style.transition = `stroke-dashoffset ${DRAW_MS}ms cubic-bezier(.4,0,.2,1) ${i * 140}ms`;
        L.el.style.strokeDashoffset = '0';
      });
      timers.push(setTimeout(() => {
        if (g !== labGen || !labStarted) return;
        labFinalize();
        startLabLife();
        /* hint pulse, once: show the connection-focus interaction, unless
           the visitor already found it themselves. */
        timers.push(setTimeout(() => {
          if (hintDone || interacted || !hintOn || !hintOff) return;
          hintDone = true;
          hintOn();
          timers.push(setTimeout(() => { hintOff(); }, 1700));
        }, 800));
      }, DRAW_MS + labLinkEls.length * 140 + 150));
    }

    nodeDisposers = buildLabFigure();
    if (reduced) {
      startLab(true);
    } else {
      labIO = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { startLab(false); labIO.disconnect(); }
      }), { threshold: 0.2 });
      labIO.observe(section);
    }

    const onMQ = (e) => {
      if (e.matches === labIsMobile) return;
      labIsMobile = e.matches;
      teardownLab();
      nodeDisposers.forEach((d) => d());
      nodeDisposers = buildLabFigure();
      paintNodeStates();
      if (labStarted) startLab(true);
    };
    labMQ.addEventListener('change', onMQ);

    const onVis = () => {
      if (document.hidden && labRaf) { cancelAnimationFrame(labRaf); labRaf = null; }
      else if (!document.hidden && !reduced && section.classList.contains('live')) startLabLife();
    };
    document.addEventListener('visibilitychange', onVis);

    if (apiRef) {
      apiRef.current.setHot = (id, on) => {
        const o = labNodeEls.find((x) => x.id === id);
        if (o) o.g.classList.toggle('hot', on);
      };
    }

    return () => {
      timers.forEach(clearTimeout);
      labMQ.removeEventListener('change', onMQ);
      document.removeEventListener('visibilitychange', onVis);
      if (labIO) labIO.disconnect();
      teardownLab();
      nodeDisposers.forEach((d) => d());
      section.classList.remove('live');
      if (apiRef) apiRef.current.setHot = null;
    };
  }, [sectionRef, apiRef, reduced]);

  const mapAria = live
    ? 'Infrastructure map: three Proxmox nodes, public-edge VPS, tailnet devices, and sensors. Node dots show live status from the public status page'
    : 'Infrastructure map: three Proxmox nodes, public-edge VPS, tailnet devices, and sensors. Documented state · live status not connected';

  return (
    <>
      <svg id="labsvg" ref={deskRef} viewBox="0 0 800 340" role="img" aria-label={mapAria}>
        <g className="lab-links" stroke="#c9ccd1" strokeWidth="1" fill="none" opacity="0.55"></g>
        <g className="lab-packets" fill="#ffffff"></g>
        <g className="lab-nodes"></g>
      </svg>
      <svg id="labsvg-m" ref={mobRef} viewBox="0 0 360 340" role="img" aria-label={mapAria}>
        <g className="lab-links" stroke="#c9ccd1" strokeWidth="1" fill="none" opacity="0.55"></g>
        <g className="lab-packets" fill="#ffffff"></g>
        <g className="lab-nodes"></g>
      </svg>
      <div
        className="lab-status-note"
        role="note"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginTop: '10px',
          textAlign: 'center',
        }}
      >
        {live
          ? 'live node status · public status page connected'
          : 'documented state · live status not connected'}
      </div>
    </>
  );
}
