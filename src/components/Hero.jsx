const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

function Hero() {
  return (
    <section className="section hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">IT Support | Infrastructure Projects | Cloud & Networking</p>
        <h1 id="hero-title">Christopher Austin Lorenzo</h1>
        <p className="role-line">
          IT Service Desk Analyst II | Growing Toward Cloud, Network & Infrastructure Engineering
        </p>

        <div className="hero-summary">
          <p>
            I am an IT Service Desk Analyst II building toward cloud, network, and infrastructure
            engineering through hands-on projects outside of work.
          </p>
          <p>
            My work combines enterprise IT support experience with practical labs covering DNS,
            monitoring, managed networking, automation, Proxmox, Linux VPS hosting, remote
            access, and cloud/static deployments.
          </p>
        </div>

        <div className="hero-actions">
          <a className="button primary" href="#projects">
            View Projects
          </a>
          <a className="button" href={resumeHref} download>
            Download Resume
          </a>
        </div>

        <div className="profile-links" aria-label="Profile links">
          <a href="https://github.com/stayZ3RO" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/christopher-l-2118351ab/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:stayz3ro@gmail.com?subject=Portfolio%20Contact%20-%20Christopher%20Austin%20Lorenzo">
            Email
          </a>
        </div>
      </div>

      <aside className="infra-panel" aria-label="Infrastructure lab overview">
        <div className="panel-topline">
          <span className="panel-dot" />
          <span>Infrastructure Lab Map</span>
        </div>

        <div className="network-map">
          <div className="node node-internet">
            <span>WAN</span>
            <strong>Public Routing</strong>
          </div>
          <div className="node node-router">
            <span>EDGE</span>
            <strong>ER605 / Omada</strong>
          </div>
          <div className="node node-core">
            <span>CORE</span>
            <strong>DNS + Monitoring</strong>
          </div>
          <div className="node node-proxmox">
            <span>VIRT</span>
            <strong>Proxmox Services</strong>
          </div>
          <div className="node node-vps">
            <span>CLOUD</span>
            <strong>Linux VPS</strong>
          </div>

          <div className="map-line line-1" />
          <div className="map-line line-2" />
          <div className="map-line line-3" />
          <div className="map-line line-4" />
        </div>

        <div className="panel-readout">
          <div>
            <span>Status</span>
            <strong>Documented labs + active buildouts</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>DNS / Routing / Monitoring / Linux</strong>
          </div>
        </div>
      </aside>
    </section>
  );
}

export default Hero;
