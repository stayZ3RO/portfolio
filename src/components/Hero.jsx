import Reveal from './Reveal.jsx';

/* Terminal lines reveal one by one once the terminal scrolls into view.
   Delays are staggered from the container's entrance. */
const TERM_DELAY_BASE = 560;
const TERM_DELAY_STEP = 85;

function TermLine({ index, children }) {
  return (
    <Reveal
      as="span"
      variant="soft"
      className="ln"
      delay={TERM_DELAY_BASE + index * TERM_DELAY_STEP}
    >
      {children}
    </Reveal>
  );
}

function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <Reveal variant="fade">
        <p className="eyebrow-row">
          <span className="eyebrow">/ it support &amp; infrastructure</span>
          <span className="eyebrow-rule" aria-hidden="true"></span>
        </p>
      </Reveal>

      <Reveal variant="lines" className="hero-title">
        <h1>
          <span className="hl-mask">
            <span className="hl-line" style={{ transitionDelay: '80ms' }}>
              IT service desk,
            </span>
          </span>
          <span className="hl-mask">
            <span className="hl-line" style={{ transitionDelay: '170ms' }}>
              building toward <span className="dim">infrastructure</span>
            </span>
          </span>
          <span className="hl-mask">
            <span className="hl-line" style={{ transitionDelay: '260ms' }}>
              and <span className="hollow">platform engineering.</span>
            </span>
          </span>
        </h1>
      </Reveal>

      <Reveal delay={340}>
        <p className="sub">
          I run documented, validated infrastructure labs alongside a day job in IT support.
          Every project here links to the evidence behind it, and is labeled by status.{' '}
          <a href="#work">
            See the work <span className="arr" aria-hidden="true">↓</span>
          </a>
        </p>
      </Reveal>

      <Reveal delay={420}>
        <div className="hero-about">
          <p>
            Current focus: HA DNS and monitoring at home, a managed network cutover, and cloud
            infrastructure as code. The work is validated and written up, not just screenshots.
          </p>
        </div>
      </Reveal>

      <Reveal delay={500}>
        <div className="term">
          <div className="term-bar">
            <span className="t r"></span>
            <span className="t y"></span>
            <span className="t g"></span>
            <span className="title">~ zsh</span>
          </div>
          <div className="term-body">
            <TermLine index={0}>
              <span className="p">❯</span> <span className="cmd">whoami</span>
            </TermLine>
            <TermLine index={1}>
              <span className="out">christopher, IT service desk, building into infra &amp; cloud</span>
            </TermLine>
            <span className="ln">&nbsp;</span>
            <TermLine index={2}>
              <span className="p">❯</span> <span className="cmd">ls ~/projects</span>
            </TermLine>
            <TermLine index={3}>
              <a
                className="dir"
                href="https://github.com/stayZ3RO/home-network-infrastructure-HA-DNS"
                target="_blank"
                rel="noreferrer"
              >
                home-network-infra/
              </a>{' '}
              <span className="cmt"># HA DNS + monitoring</span>
            </TermLine>
            <TermLine index={4}>
              <a
                className="dir"
                href="https://github.com/stayZ3RO/home-network-managed-infrastructure-lab"
                target="_blank"
                rel="noreferrer"
              >
                managed-network/
              </a>{' '}
              <span className="cmt"># Omada cutover + VLAN</span>
            </TermLine>
            <TermLine index={5}>
              <a
                className="dir"
                href="https://github.com/stayZ3RO/vps-cloud-infra-lab"
                target="_blank"
                rel="noreferrer"
              >
                vps-cloud/
              </a>{' '}
              <span className="cmt"># Linux + Docker + HTTPS</span>
            </TermLine>
            <TermLine index={6}>
              <a
                className="dir"
                href="https://github.com/stayZ3RO/aws-network-automation-lab"
                target="_blank"
                rel="noreferrer"
              >
                aws-automation/
              </a>{' '}
              <span className="cmt"># Terraform + Python CI</span>
            </TermLine>
            <span className="ln">&nbsp;</span>
            <TermLine index={7}>
              <span className="p">❯</span> <span className="cmd">open</span>{' '}
              <a className="dir" href="https://stayz3ro.dev" target="_blank" rel="noreferrer">
                stayz3ro.dev
              </a>{' '}
              <span className="cmt"># blog</span>
            </TermLine>
            <TermLine index={8}>
              <span className="p">❯</span> <span className="cmd">open</span>{' '}
              <a
                className="dir"
                href="https://status.stayz3ro.dev"
                target="_blank"
                rel="noreferrer"
              >
                status.stayz3ro.dev
              </a>{' '}
              <span className="cmt"># dashboard</span>
            </TermLine>
            <span className="ln">&nbsp;</span>
            <TermLine index={9}>
              <span className="p">❯</span> <span className="cursor"></span>
            </TermLine>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default Hero;
