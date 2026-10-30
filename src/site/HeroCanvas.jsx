import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './env';

function isDark() {
  return typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
}

/* Particle canvas behind the hero. Dark theme only: paper stays plain.
   One rAF loop, paused while the hero is off screen or the tab is hidden,
   and not started at all under reduced motion. */
export default function HeroCanvas() {
  const reduced = useReducedMotion();
  const [dark, setDark] = useState(isDark);
  const canvasRef = useRef(null);

  useEffect(() => {
    const onTheme = () => setDark(isDark());
    window.addEventListener('themechange', onTheme);
    return () => window.removeEventListener('themechange', onTheme);
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv || reduced || !dark) return undefined;
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
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * DPR;
      cv.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    size();
    window.addEventListener('resize', size);
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
    let raf = null;
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
    let onScreen = true;
    const run = () => {
      if (onScreen && !document.hidden) { if (!raf) raf = requestAnimationFrame(tick); }
      else if (raf) { cancelAnimationFrame(raf); raf = null; }
    };
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; run(); });
    io.observe(cv);
    document.addEventListener('visibilitychange', run);
    run();

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', run);
      window.removeEventListener('resize', size);
      if (raf) cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, w, h);
    };
  }, [reduced, dark]);

  return <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true"></canvas>;
}
