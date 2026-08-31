import Reveal from './Reveal.jsx';

function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <Reveal>
        <p className="eyebrow">/ IT support &amp; infrastructure</p>
      </Reveal>
      <Reveal delay={60}>
        <h1>
          IT service desk, building toward <span className="dim">infrastructure</span> and{' '}
          <span className="hollow">platform engineering.</span>
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <p className="sub">
          I run documented, validated infrastructure labs alongside a day job in IT support.
          Every project here links to the evidence behind it, and is labeled by status.{' '}
          <a href="#work">See the work ↓</a>
        </p>
      </Reveal>

      <Reveal delay={180}>
        <div className="hero-about">
          <p>
            Current focus: HA DNS and monitoring at home, a managed network cutover, and cloud
            infrastructure as code. The work is validated and written up, not just screenshots.
          </p>
        </div>
      </Reveal>

      <Reveal delay={240}>
        <div className="term">
        <div className="term-bar">
          <span className="t r"></span>
          <span className="t y"></span>
          <span className="t g"></span>
          <span className="title">~ zsh</span>
        </div>
        <div className="term-body">
          <span className="ln">
            <span className="p">❯</span> <span className="cmd">whoami</span>
          </span>
          <span className="ln">
            <span className="out">christopher, IT service desk, building into infra &amp; cloud</span>
          </span>
          <span className="ln">&nbsp;</span>
          <span className="ln">
            <span className="p">❯</span> <span className="cmd">ls ~/projects</span>
          </span>
          <span className="ln">
            <a
              className="dir"
              href="https://github.com/stayZ3RO/home-network-infrastructure-HA-DNS"
              target="_blank"
              rel="noreferrer"
            >
              home-network-infra/
            </a>{' '}
            <span className="cmt"># HA DNS + monitoring</span>
          </span>
          <span className="ln">
            <a
              className="dir"
              href="https://github.com/stayZ3RO/home-network-managed-infrastructure-lab"
              target="_blank"
              rel="noreferrer"
            >
              managed-network/
            </a>{' '}
            <span className="cmt"># Omada cutover + VLAN</span>
          </span>
          <span className="ln">
            <a
              className="dir"
              href="https://github.com/stayZ3RO/vps-cloud-infra-lab"
              target="_blank"
              rel="noreferrer"
            >
              vps-cloud/
            </a>{' '}
            <span className="cmt"># Linux + Docker + HTTPS</span>
          </span>
          <span className="ln">
            <a
              className="dir"
              href="https://github.com/stayZ3RO/aws-network-automation-lab"
              target="_blank"
              rel="noreferrer"
            >
              aws-automation/
            </a>{' '}
            <span className="cmt"># Terraform + Python CI</span>
          </span>
          <span className="ln">&nbsp;</span>
          <span className="ln">
            <span className="p">❯</span> <span className="cmd">open</span>{' '}
            <a className="dir" href="https://stayz3ro.dev" target="_blank" rel="noreferrer">
              stayz3ro.dev
            </a>{' '}
            <span className="cmt"># blog</span>
          </span>
          <span className="ln">
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
          </span>
          <span className="ln">
            <span className="p">❯</span> <span className="cursor"></span>
          </span>
        </div>
        </div>
      </Reveal>
    </section>
  );
}

export default Hero;
