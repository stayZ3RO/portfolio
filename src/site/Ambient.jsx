import { useEffect, useRef } from 'react';
import { useReducedMotion } from './env';

/* Ambient layer: scroll progress and the hero entrance class. The
   particle canvas lives in the hero now (HeroCanvas), dark theme only. */
export default function Ambient() {
  const reduced = useReducedMotion();
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

    /* scroll progress */
    const prog = progressRef.current;
    let ticking = false;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (prog) prog.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
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

    return () => {
      cancelAnimationFrame(raf1); cancelAnimationFrame(raf2);
      document.body.classList.remove('loaded');
      window.removeEventListener('scroll', onScrollRaf);
    };
  }, [reduced]);

  return (
    <>
      <div id="progress" ref={progressRef} aria-hidden="true"></div>
      <div id="node-tip" role="status" aria-live="polite"></div>
    </>
  );
}
