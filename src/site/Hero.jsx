import { Fragment, useEffect, useRef } from 'react';
import HeroMesh from './HeroMesh';
import Ticker from './Ticker';
import { useReducedMotion } from './env';

/* Split a line into word spans, each holding letter spans, so the thesis
   enters letter by letter while words still wrap as units. Spaces between
   words are real text nodes. Screen readers get the plain string. */
function kineticLine(line, baseDelay) {
  const words = line.split(' ');
  let i = 0;
  return words.map((word, w) => (
    <Fragment key={w}>
      <span className="k-word" aria-hidden="true">
        {[...word].map((ch, c) => {
          const d = (baseDelay + (i++) * 0.028).toFixed(3);
          return (
            <span key={c} className="k-letter" style={{ transitionDelay: `${d}s` }}>{ch}</span>
          );
        })}
      </span>
      {w < words.length - 1 ? ' ' : null}
    </Fragment>
  ));
}

export default function Hero() {
  const reduced = useReducedMotion();
  const h1Ref = useRef(null);

  /* Scroll-linked drift: the thesis lifts and fades as you leave the hero.
     Skipped entirely under reduced motion. */
  useEffect(() => {
    if (reduced || !h1Ref.current) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          h1Ref.current.style.transform = `translateY(${(-y * 0.22).toFixed(1)}px)`;
          h1Ref.current.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.85)).toFixed(3);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [reduced]);

  return (
    <div className="hero">
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="avail-pill hero-fade" style={{ transitionDelay: '.05s' }}>
        <span className="dot"></span>Open to platform / systems engineering roles
      </div>
      <p className="hero-kicker hero-fade" style={{ transitionDelay: '.1s' }}>Christopher Lorenzo</p>
      <h1 ref={h1Ref} className="kinetic">
        <span className="mask">
          {kineticLine('I study systems', 0.15)}
        </span>
        <span className="mask">
          {kineticLine('by building them.', 0.45)}
        </span>
        <span className="sr-only">I study systems by building them.</span>
      </h1>
      <p className="title-line hero-fade" style={{ transitionDelay: '.56s' }}>
        IT Service Desk Analyst II, Global Service Desk · Hialeah, FL · Hybrid
      </p>
      <p className="bio hero-fade" style={{ transitionDelay: '.62s' }}>
        I&apos;m into tech, AI, and building things. I run a homelab where I teach myself how
        systems work, then I bring what I learn to my day job on the service desk, where the
        automations I build in my off hours are reviewed with my directors.
      </p>
      <div className="ctas hero-fade" style={{ transitionDelay: '.74s' }}>
        <a className="btn btn-solid magnetic" href="#systems">View systems</a>
        <a className="btn btn-ghost magnetic" href="#contact">Get in touch</a>
      </div>
      <Ticker />
      <HeroMesh />
      <div className="scroll-cue hero-fade" style={{ transitionDelay: '1.1s' }}>
        <div className="line"></div>
        <span>SCROLL</span>
      </div>
    </div>
  );
}
