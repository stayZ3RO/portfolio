import Reveal from './Reveal';
import SecHead from './SecHead';

const CELLS = [
  { k: 'NOW', html: <>The <strong>managed cutover</strong> is done and validated. VLAN segmentation is next on the bench.</> },
  { k: 'HOMELAB', html: <><strong>3-node Proxmox cluster</strong> on a Tailscale mesh. Running in my rack, written up in the field notes.</> },
  { k: 'STUDYING', html: <>Working through <strong>Network+ and Security+</strong>, labbing everything I study.</> },
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
