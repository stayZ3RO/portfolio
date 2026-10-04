import { useEffect, useRef } from 'react';
import { SVG_NS, stepMesh, useReducedMotion } from './env';
import { hideTip, showTip } from './tip';

const NODES = [
  { id: 'pve01', x: 200, y: 120, label: 'pve01', sub: 'OptiPlex 7060 Micro · i5-8500T · 32GB' },
  { id: 'pve02', x: 400, y: 60, label: 'pve02', sub: 'OptiPlex 3070 Micro · 32GB' },
  { id: 'pve03', x: 600, y: 120, label: 'pve03', sub: 'EliteDesk 800 G3 DM · i5-6500T · 16GB' },
];
const LINKS = [[0, 1], [1, 2], [0, 2]];

/* Hero mesh figure: draw-on links, popping nodes, traveling packets. */
export default function HeroMesh() {
  const svgRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const gLinks = svg.querySelector('#mesh-links');
    const gNodes = svg.querySelector('#mesh-nodes');
    const gPkts = svg.querySelector('#mesh-packets');
    const linkEls = [];
    const pktDefs = [];

    LINKS.forEach(([a, b], i) => {
      const A = NODES[a], B = NODES[b];
      const ln = document.createElementNS(SVG_NS, 'line');
      ln.setAttribute('x1', A.x); ln.setAttribute('y1', A.y);
      ln.setAttribute('x2', B.x); ln.setAttribute('y2', B.y);
      gLinks.appendChild(ln);
      const L = { el: ln, A, B };
      linkEls.push(L);
      for (let k = 0; k < 2; k++) {
        const c = document.createElementNS(SVG_NS, 'circle');
        c.setAttribute('r', '3');
        c.setAttribute('opacity', '0');
        gPkts.appendChild(c);
        pktDefs.push({
          el: c, A: k ? B : A, B: k ? B : A,
          phase: (i * 0.37 + k * 0.5) % 1,
          speed: 0.00016 + i * 0.00002,
        });
      }
    });

    const disposers = [];
    NODES.forEach((n, i) => {
      const outer = document.createElementNS(SVG_NS, 'g');
      outer.setAttribute('transform', `translate(${n.x},${n.y})`);
      const inner = document.createElementNS(SVG_NS, 'g');
      inner.setAttribute('class', 'mnode');
      inner.setAttribute('role', 'button');
      inner.setAttribute('tabindex', '0');
      inner.setAttribute('aria-label', `${n.id}: ${n.sub}`);
      inner.style.transitionDelay = `${0.1 + i * 0.16}s`;
      inner.innerHTML =
        '<circle class="hit" r="38" fill="rgba(0,0,0,0)" pointer-events="all"/>' +
        '<circle class="ring" r="26" fill="none" stroke="#f4f4f2" stroke-width="1.5"/>' +
        '<circle class="core" r="5" fill="#f4f4f2"/>' +
        `<text y="46" text-anchor="middle" fill="#9a9da3" font-size="13" font-family="ui-monospace,monospace">${n.label}</text>`;
      outer.appendChild(inner);
      gNodes.appendChild(outer);
      const onEnter = () => showTip(n, inner);
      const onLeave = hideTip;
      const onKey = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showTip(n, inner);
          setTimeout(hideTip, 2200);
        }
      };
      inner.addEventListener('mouseenter', onEnter);
      inner.addEventListener('mouseleave', onLeave);
      inner.addEventListener('focus', onEnter);
      inner.addEventListener('blur', onLeave);
      inner.addEventListener('keydown', onKey);
      disposers.push(() => {
        inner.removeEventListener('mouseenter', onEnter);
        inner.removeEventListener('mouseleave', onLeave);
        inner.removeEventListener('focus', onEnter);
        inner.removeEventListener('blur', onLeave);
        inner.removeEventListener('keydown', onKey);
      });
    });

    let meshRaf = null;
    const timers = [];
    const startLife = () => {
      if (meshRaf) return;
      const cores = [...svg.querySelectorAll('#meshsug .mnode .core')];
      const loop = () => { stepMesh(linkEls, pktDefs, cores); meshRaf = requestAnimationFrame(loop); };
      loop();
    };
    const onVis = () => {
      if (document.hidden && meshRaf) { cancelAnimationFrame(meshRaf); meshRaf = null; }
      else if (!document.hidden && !reduced && document.body.classList.contains('mesh-in')) startLife();
    };
    document.addEventListener('visibilitychange', onVis);

    if (!reduced) {
      const DRAW_MS = 1200;
      linkEls.forEach((L) => {
        const len = L.el.getTotalLength();
        L.el.style.strokeDasharray = String(len);
        L.el.style.strokeDashoffset = String(len);
      });
      timers.push(setTimeout(() => {
        linkEls.forEach((L, i) => {
          L.el.style.transition = `stroke-dashoffset ${DRAW_MS}ms cubic-bezier(.4,0,.2,1) ${i * 140}ms`;
          L.el.style.strokeDashoffset = '0';
        });
        timers.push(setTimeout(() => {
          linkEls.forEach((L) => {
            L.el.style.transition = 'none';
            L.el.style.strokeDasharray = '6 7';
            L.el.style.strokeDashoffset = '0';
          });
          document.body.classList.add('mesh-in');
          startLife();
        }, DRAW_MS + linkEls.length * 140 + 150));
      }, 950));
    } else {
      document.body.classList.add('mesh-in');
      linkEls.forEach((L) => {
        L.el.style.strokeDasharray = '6 7';
        L.el.style.strokeDashoffset = '0';
      });
    }

    return () => {
      timers.forEach(clearTimeout);
      document.removeEventListener('visibilitychange', onVis);
      if (meshRaf) cancelAnimationFrame(meshRaf);
      document.body.classList.remove('mesh-in');
      disposers.forEach((d) => d());
      gLinks.innerHTML = ''; gNodes.innerHTML = ''; gPkts.innerHTML = '';
    };
  }, [reduced]);

  return (
    <figure className="mesh-fig hero-fade" style={{ transitionDelay: '.9s' }} aria-label="Homelab network diagram">
      <div className="cap">HOMELAB MESH</div>
      <svg id="meshsug" ref={svgRef} viewBox="0 0 800 230" role="img" aria-label="Three Proxmox nodes in a Tailscale mesh">
        <g id="mesh-links" stroke="#c9ccd1" strokeWidth="1" fill="none" opacity="0.5"></g>
        <g id="mesh-packets" fill="#ffffff"></g>
        <g id="mesh-nodes"></g>
      </svg>
      <div className="legend">3-node Proxmox cluster, Tailscale mesh. Running in my rack. Hover or tap a node.</div>
    </figure>
  );
}
