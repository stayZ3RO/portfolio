/* Card diagrams in the blueprint idiom of the lab figure: dashed zones,
   hairline links, ringed nodes, mono labels, one accent highlight per
   figure. Colours come from tokens in site.css. Labels are roles, never
   hostnames or addresses. */

function Node({ x, y, label, hot, dy = 24 }) {
  return (
    <g>
      <circle className={`n${hot ? ' hot' : ''}`} cx={x} cy={y} r="7" />
      <text x={x} y={y + dy} textAnchor="middle">{label}</text>
    </g>
  );
}

function Zone({ x, y, w, h, label }) {
  return (
    <g>
      <rect className="z" x={x} y={y} width={w} height={h} rx="4" />
      <text className="zt" x={x + 8} y={y + 15}>{label}</text>
    </g>
  );
}

const FIGS = {
  desk: {
    label: 'Workflows check ticketing API auth first, then feed the native pages and Grafana',
    body: (
      <>
        <Zone x={10} y={24} w={176} h={152} label="N8N, MANUAL TRIGGER" />
        <Zone x={250} y={24} w={100} h={152} label="DASHBOARDS" />
        <line className="l" x1="40" y1="100" x2="128" y2="100" />
        <line className="l hot" x1="128" y1="100" x2="216" y2="100" />
        <line className="l" x1="216" y1="100" x2="300" y2="70" />
        <line className="l" x1="216" y1="100" x2="300" y2="130" />
        <Node x={40} y={100} label="workflows" />
        <Node x={128} y={100} label="auth check" hot />
        <Node x={216} y={100} label="ticket API" dy={-14} />
        <Node x={300} y={70} label="native pages" dy={-14} />
        <Node x={300} y={130} label="grafana" />
      </>
    ),
  },
  dns: {
    label: 'Clients query one virtual IP; either Pi-hole node answers and resolves recursively with its own Unbound',
    body: (
      <>
        <Zone x={84} y={22} w={176} h={156} label="PI-HOLE + UNBOUND" />
        <line className="l" x1="36" y1="100" x2="122" y2="100" />
        <line className="l hot" x1="122" y1="100" x2="212" y2="60" />
        <line className="l" x1="122" y1="100" x2="212" y2="140" />
        <line className="l" x1="212" y1="60" x2="316" y2="100" />
        <line className="l" x1="212" y1="140" x2="316" y2="100" />
        <Node x={36} y={100} label="clients" />
        <Node x={122} y={100} label="VIP" hot />
        <Node x={212} y={60} label="dns1" />
        <Node x={212} y={140} label="dns2" />
        <Node x={316} y={100} label="root DNS" />
      </>
    ),
  },
  net: {
    label: 'WAN into the UDM Pro, then the USW-24-PoE switch out to the Deco access points and the Proxmox nodes, one flat LAN',
    body: (
      <>
        <Zone x={78} y={22} w={268} h={156} label="FLAT LAN, VLANS NEXT" />
        <line className="l" x1="36" y1="100" x2="122" y2="100" />
        <line className="l hot" x1="122" y1="100" x2="210" y2="100" />
        <line className="l" x1="210" y1="100" x2="302" y2="62" />
        <line className="l" x1="210" y1="100" x2="302" y2="138" />
        <Node x={36} y={100} label="WAN" />
        <Node x={122} y={100} label="UDM Pro" hot />
        <Node x={210} y={100} label="PoE switch" dy={-14} />
        <Node x={302} y={62} label="Deco APs" />
        <Node x={302} y={138} label="Proxmox" />
      </>
    ),
  },
};

export default function Diagram({ kind }) {
  const fig = FIGS[kind];
  if (!fig) return null;
  return (
    <svg className="dg" viewBox="0 0 360 200" role="img" aria-label={fig.label}>
      {fig.body}
    </svg>
  );
}
