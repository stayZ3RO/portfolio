import { useEffect, useRef } from 'react';

/* Reveal variants (transform/opacity only, compositor-friendly):
   rise  - 24px rise + blur settle (default; preserves existing behavior)
   soft  - 10px rise, no blur, quicker (terminal lines, dense lists)
   fade  - opacity only
   scale - 8px rise + 0.985 scale
   lines - no own motion; children with .hl-line animate inside masks
   none  - toggles rv-in only, styling left to CSS
*/
function Reveal({ children, className = '', delay = 0, as: Tag = 'div', variant = 'rise' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      document.documentElement.dataset.motion === 'reduced' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.classList.add('rv-in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('rv-in');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`rv rv-${variant} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
