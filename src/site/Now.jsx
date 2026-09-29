import Reveal from './Reveal';
import SecHead from './SecHead';

const CELLS = [
  { k: 'NOW', html: <>The <strong>managed cutover</strong> is done and validated. VLAN segmentation is next on the bench.</> },
  { k: 'HOMELAB', html: <><strong>3-node Proxmox cluster</strong> on a Tailscale mesh. Running in my rack, documented in the project repos.</> },
  { k: 'OPEN TO', html: <><strong>Platform and systems engineering roles</strong> where I can keep growing.</> },
];

export default function Now() {
  return (
    <section id="now">
      <div className="ghost" aria-hidden="true">02</div>
      <SecHead num="02" name="Now" />
      <div className="now-grid">
        {CELLS.map((c, i) => (
          <Reveal className="now-cell" key={c.k} delay={i * 80}>
            <div className="k">{c.k}</div>
            <p>{c.html}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
