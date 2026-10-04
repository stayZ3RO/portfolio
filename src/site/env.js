/* Shared environment flags and small utilities. */
import { useEffect, useState } from 'react';

export const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const FINE_POINTER =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches;

export const SVG_NS = 'http://www.w3.org/2000/svg';

/* Live reduced-motion state. REDUCED is the value at load (for code that
   only needs the initial answer); useReducedMotion() re-renders the
   component when the user toggles the OS setting mid-session so JS
   animation loops actually stop instead of only the CSS going static. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(REDUCED);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

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
