/* Shared environment flags and small utilities. */

export const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const FINE_POINTER =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches;

export const SVG_NS = 'http://www.w3.org/2000/svg';

/* One rAF-driven step for the mesh packet/link/core animation,
   shared by the hero mesh and the lab figure. */
let flowOff = 0;
export function stepMesh(linkEls, pktDefs, cores) {
  flowOff -= 0.3;
  const now = performance.now();
  for (const L of linkEls) L.el.style.strokeDashoffset = String(flowOff);
  for (let i = 0; i < cores.length; i++)
    cores[i].setAttribute('r', (5 * (1 + 0.22 * Math.sin(now / 650 + i * 2.1))).toFixed(2));
  for (const p of pktDefs) {
    const t = (now * p.speed + p.phase) % 1;
    p.el.setAttribute('cx', (p.A.x + (p.B.x - p.A.x) * t).toFixed(1));
    p.el.setAttribute('cy', (p.A.y + (p.B.y - p.A.y) * t).toFixed(2));
    p.el.setAttribute('opacity', (0.85 * Math.sin(Math.PI * t)).toFixed(2));
  }
}
