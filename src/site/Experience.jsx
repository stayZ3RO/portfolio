import Reveal from './Reveal';

const BULLETS = [
  'I build the automations and dashboards my team runs on.',
  'Promoted twice in about a year, from contractor to Analyst II.',
  'Led a ~60-device fleet migration across 3 waves, coordinating stakeholders and a carrier partner.',
  'Designed and became the sole point of contact for a formal desk-to-engineering handoff process covering escalations that previously had zero tracking.',
  'Escalations routed to me by name; sole owner of the mobile-device support domain.',
];

export default function Experience() {
  return (
    <Reveal className="about-col" id="experience">
      <p className="about-k">experience</p>
      <h3 className="job">IT Service Desk Analyst II <span>· Global Service Desk</span></h3>
      <ul className="bullets">
        {BULLETS.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </Reveal>
  );
}
