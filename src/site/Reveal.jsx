import { useEffect, useRef, useState } from 'react';
import { REDUCED } from './env';

let sharedIO = null;
const ioCbs = new WeakMap();
function getIO() {
  if (!sharedIO) {
    sharedIO = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          const cb = ioCbs.get(e.target);
          if (cb) cb();
          sharedIO.unobserve(e.target);
          ioCbs.delete(e.target);
        }
      }),
      { threshold: 0.12 },
    );
  }
  return sharedIO;
}

/* One consistent reveal, driven by a shared IntersectionObserver.
   The revealed state lives in React state (not an imperative classList
   add) so parent re-renders never clobber the `in` class. */
export default function Reveal({ as: Tag = 'div', className = '', delay, variant, children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(REDUCED);
  useEffect(() => {
    const el = ref.current;
    if (!el || REDUCED) return;
    const io = getIO();
    ioCbs.set(el, () => setInView(true));
    io.observe(el);
    return () => {
      io.unobserve(el);
      ioCbs.delete(el);
    };
  }, []);
  const style = delay != null ? { transitionDelay: `${delay}ms` } : undefined;
  return (
    <Tag ref={ref} className={`reveal${variant ? ` reveal-${variant}` : ''} ${className}${inView ? ' in' : ''}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}
