import { Fragment } from 'react';
import HeroCanvas from './HeroCanvas';
import ScanStrip from './ScanStrip';

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

/* Hero: the promise on the left, the spec sheet on the right. The spec
   sheet holds the slot the wireframe keeps for a lab photo. */
export default function Hero() {
  return (
    <div className="hero">
      <HeroCanvas />
      <div className="hero-copy">
        <div className="avail-pill hero-fade" style={{ transitionDelay: '.05s' }}>
          <span className="dot"></span>Open to platform / systems engineering roles
        </div>
        <h1 className="kinetic">
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
          <a className="btn btn-solid" href="#work">View work</a>
          <a className="btn btn-ghost" href="#contact">Get in touch</a>
        </div>
      </div>
      <ScanStrip />
    </div>
  );
}
