import { useRef } from 'react';
import LabFigure from './LabFigure';
import Reveal from './Reveal';
import SecHead from './SecHead';
import { NODE_CARDS, FLEET } from './data';
import { REDUCED } from './env';
import { LIVE } from './status';

function cardHot(apiRef, id, on) {
  if (apiRef.current.setHot) apiRef.current.setHot(id, on);
}

export default function Lab() {
  const sectionRef = useRef(null);
  const apiRef = useRef({});

  return (
    <section id="lab" ref={sectionRef}>
      <div className="ghost" aria-hidden="true">LAB</div>
      <SecHead
        num="LAB"
        name="The Lab"
        extra={<span className="live-tag"><span className={LIVE ? 'pulse' : 'dot'}></span>RUNNING</span>}
      />
      <Reveal><p className="lab-sub">// MY INFRASTRUCTURE, RUNNING RIGHT NOW</p></Reveal>
      <Reveal>
        <p className="lab-copy">
          <strong>Three nodes, 80 gigs of RAM, one Tailscale mesh, and a VPS holding the public edge.</strong>{' '}
          This is where I learn how systems work before I touch them at work. Everything here is real
          and running, and the builds are written up in the field notes. Hover or tap a node card to find it on the map.
        </p>
      </Reveal>
      <Reveal as="figure" className="lab-fig" aria-label="Homelab topology map">
        <div className="cap">
          <span>fig. 1 · the infrastructure, as it runs</span>
          <span className="live-mini"><span className={LIVE ? 'pulse' : 'dot'}></span>FULL MAP</span>
        </div>
        <LabFigure sectionRef={sectionRef} apiRef={apiRef} />
        <div className="lab-legend">DNS · monitoring · Tailscale run across the cluster · tailnet and public edge at the rim</div>
        <div className="lab-foot">placement per homelab-ops service map</div>
      </Reveal>
      <div className="node-cards">
        {NODE_CARDS.map((n, i) => (
          <Reveal
            as="button"
            key={n.id}
            className="node-card"
            data-node={n.id}
            delay={REDUCED ? undefined : (i % 3) * 90}
            onMouseEnter={() => cardHot(apiRef, n.id, true)}
            onMouseLeave={() => cardHot(apiRef, n.id, false)}
            onFocus={() => cardHot(apiRef, n.id, true)}
            onBlur={() => cardHot(apiRef, n.id, false)}
          >
            <div className="nc-id">
              {n.label || n.id} {n.role && <span className="nc-role">{n.role}</span>}
            </div>
            <div className="nc-spec">{n.spec}</div>
            <div className="nc-svcs">
              {n.svcs.map((s) => (
                <span className="nc-svc" key={s}>{s}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      <div className="edge-cards">
        <Reveal
          as="button"
          className="edge-card"
          data-node="vps-edge"
          onMouseEnter={() => cardHot(apiRef, 'vps-edge', true)}
          onMouseLeave={() => cardHot(apiRef, 'vps-edge', false)}
          onFocus={() => cardHot(apiRef, 'vps-edge', true)}
          onBlur={() => cardHot(apiRef, 'vps-edge', false)}
        >
          <div className="ec-id">vps-edge <span className="nc-role">PUBLIC EDGE</span></div>
          <div className="ec-spec">Netcup VPS · Caddy + HTTPS · blog, Uptime Kuma</div>
        </Reveal>
        <Reveal className="edge-card">
          <div className="ec-id">tailnet</div>
          <div className="ec-spec">phone · gaming PC · Mac mini · laptop, via the subnet routers</div>
        </Reveal>
        <Reveal className="edge-card">
          <div className="ec-id">retired pis</div>
          <div className="ec-spec">two Raspberry Pis · cold standby, no production role</div>
        </Reveal>
      </div>
      <Reveal className="manifest-wrap" aria-label="Fleet manifest">
        <p className="manifest-kicker">FLEET MANIFEST · DOCUMENTED STATE</p>
        <table className="manifest">
          <thead>
            <tr><th scope="col">service</th><th scope="col">host</th><th scope="col">purpose</th></tr>
          </thead>
          <tbody>
            {FLEET.map(([svc, host, hostLabel, why]) => (
              <tr key={svc}
                onMouseEnter={() => cardHot(apiRef, host, true)}
                onMouseLeave={() => cardHot(apiRef, host, false)}>
                <td className="svc">{svc}</td>
                <td className="host">{hostLabel}</td>
                <td className="why">{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}
