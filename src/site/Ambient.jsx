import { useEffect, useRef } from 'react';
import { FINE_POINTER, useReducedMotion } from './env';

/* Ambient layer: scroll progress, cursor spotlight + magnetic CTAs,
   particle canvas, hero entrance class, ghost parallax. */
export default function Ambient() {
  const reduced = useReducedMotion();
  const canvasRef = useRef(null);
  const spotRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    /* hero entrance */
    let raf1 = 0, raf2 = 0;
    if (!reduced) {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => document.body.classList.add('loaded'));
      });
    } else {
      document.body.classList.add('loaded');
    }

    /* scroll: progress bar + ghost parallax */
    const prog = progressRef.current;
    let ticking = false;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (prog) prog.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
      if (!reduced) {
        document.querySelectorAll('.ghost').forEach((g) => {
          const s = g.closest('section');
          if (!s) return;
          const r = s.getBoundingClientRect();
          g.style.transform = `translateY(${(r.top * 0.3).toFixed(1)}px)`;
        });
      }
      ticking = false;
    };
    const onScrollRaf = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };
    window.addEventListener('scroll', onScrollRaf, { passive: true });
    onScroll();

    /* particle canvas */
    const cv = canvasRef.current;
    let raf = null;
    let onResize = null;
    let onVis = null;
    if (cv && !reduced) {
      const ctx = cv.getContext('2d');
      /* particle ink comes from the --text token so the canvas can never
         drift from the palette */
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
      const hm = raw.match(/#([0-9a-f]{6})/i);
      const ink = hm
        ? `${parseInt(hm[1].slice(0, 2), 16)},${parseInt(hm[1].slice(2, 4), 16)},${parseInt(hm[1].slice(4, 6), 16)}`
        : '244,244,242';
      let w, h;
      const pts = [];
      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      const size = () => {
        w = window.innerWidth;
        h = window.innerHeight;
        cv.width = w * DPR;
        cv.height = h * DPR;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      };
      size();
      onResize = size;
      window.addEventListener('resize', onResize);
      const N = Math.min(90, Math.floor((w * h) / 20000));
      for (let i = 0; i < N; i++)
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 1.5 + 0.6,
          p: Math.random() * Math.PI * 2,
        });
      const tick = () => {
        ctx.clearRect(0, 0, w, h);
        for (const p of pts) {
          p.x += p.vx; p.y += p.vy; p.p += 0.01;
          if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
          const a = 0.08 + 0.07 * Math.sin(p.p);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 7);
          ctx.fillStyle = 'rgba(' + ink + ',' + a.toFixed(3) + ')';
          ctx.fill();
        }
        for (let i = 0; i < pts.length; i++)
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
            const d = dx * dx + dy * dy;
            if (d < 17000) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = 'rgba(' + ink + ',' + (0.065 * (1 - d / 17000)).toFixed(3) + ')';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      onVis = () => {
        if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
        else if (!raf) { raf = requestAnimationFrame(tick); }
      };
      document.addEventListener('visibilitychange', onVis);
    }

    /* cursor spotlight + magnetic CTAs (fine pointers only) */
    const spot = spotRef.current;
    let magRaf = null;
    let onMove = null;
    if (spot && FINE_POINTER && !reduced) {
      let sx = window.innerWidth / 2, sy = window.innerHeight / 2;
      let tx = sx, ty = sy, shown = false;
      onMove = (e) => {
        tx = e.clientX; ty = e.clientY;
        if (!shown) { shown = true; spot.style.opacity = '1'; }
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      const mags = () => [...document.querySelectorAll('.magnetic')];
      const follow = () => {
        sx += (tx - sx) * 0.12; sy += (ty - sy) * 0.12;
        spot.style.left = sx + 'px';
        spot.style.top = sy + 'px';
        for (const b of mags()) {
          const r = b.getBoundingClientRect();
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          const dx = tx - cx, dy = ty - cy, dist = Math.hypot(dx, dy);
          const R = 90;
          if (dist < R && dist > 0.5) {
            const f = (1 - dist / R) * 7;
            b.style.transform = `translate(${(dx / dist * f).toFixed(1)}px,${(dy / dist * f).toFixed(1)}px)`;
          } else {
            b.style.transform = 'translate(0px,0px)';
          }
        }
        magRaf = requestAnimationFrame(follow);
      };
      magRaf = requestAnimationFrame(follow);
    }

    return () => {
      cancelAnimationFrame(raf1); cancelAnimationFrame(raf2);
      document.body.classList.remove('loaded');
      window.removeEventListener('scroll', onScrollRaf);
      if (onResize) window.removeEventListener('resize', onResize);
      if (onVis) document.removeEventListener('visibilitychange', onVis);
      if (raf) cancelAnimationFrame(raf);
      if (onMove) window.removeEventListener('mousemove', onMove);
      if (magRaf) cancelAnimationFrame(magRaf);
    };
  }, [reduced]);

  return (
    <>
      <div id="progress" ref={progressRef} aria-hidden="true"></div>
      <div id="spot" ref={spotRef} aria-hidden="true"></div>
      <canvas id="canvas" ref={canvasRef} aria-hidden="true"></canvas>
      <div id="node-tip" role="status" aria-live="polite"></div>
    </>
  );
}
