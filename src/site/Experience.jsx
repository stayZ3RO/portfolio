import Reveal from './Reveal';
import SecHead from './SecHead';

const BULLETS = [
  'I build the automations and dashboards my team runs on.',
  'Promoted twice in about a year, from contractor to Analyst II.',
  'Led a ~60-device fleet migration across 3 waves, coordinating stakeholders and a carrier partner.',
  'Escalations routed to me by name; sole owner of the mobile-device support domain.',
];

const PILLS = ['Python', 'PowerShell', 'Bash', 'JavaScript', 'Docker', 'Proxmox', 'Tailscale'];

export default function Experience() {
  return (
    <section id="experience">
      <div className="ghost" aria-hidden="true">03</div>
      <SecHead num="03" name="Experience" />
      <Reveal>
        <div className="job">IT Service Desk Analyst II <span>· Global Service Desk</span></div>
        <ul className="bullets">
          {BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className="pills">
          {PILLS.map((p) => (
            <span className="pill" key={p}>{p}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
