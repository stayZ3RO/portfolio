import Reveal from './Reveal';

const CELLS = [
  { k: 'NOW', html: <>The <strong>managed cutover</strong> is done and validated. VLAN segmentation is next on the bench.</> },
  { k: 'HOMELAB', html: <><strong>3-node Proxmox cluster</strong> on a Tailscale mesh. Running in my rack, written up in the field notes.</> },
  { k: 'STUDYING', html: <>Studying <strong>Network+</strong> now. <strong>Security+</strong> is next, then a cloud cert.</> },
];

export default function Now() {
  return (
    <Reveal className="about-col" id="now">
      <p className="about-k">status</p>
      <dl className="now-rows">
        {CELLS.map((c) => (
          <div className="now-row" key={c.k}>
            <dt>{c.k}</dt>
            <dd>{c.html}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
