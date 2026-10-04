import HeroMesh from './HeroMesh';
import Ticker from './Ticker';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="avail-pill hero-fade" style={{ transitionDelay: '.05s' }}>
        <span className="dot"></span>Open to platform / systems engineering roles
      </div>
      <p className="hero-kicker hero-fade" style={{ transitionDelay: '.1s' }}>Christopher Lorenzo</p>
      <h1>
        <span className="mask" aria-hidden="true">
          <span className="mask-inner" style={{ transitionDelay: '.15s' }}>I study systems</span>
        </span>
        <span className="mask" aria-hidden="true">
          <span className="mask-inner" style={{ transitionDelay: '.26s' }}>by building them.</span>
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
