import Reveal from './Reveal';
import SecHead from './SecHead';
import './case-study.css';

const BULLETS = [
  'I build the automations and dashboards my team runs on.',
  'Promoted twice in about a year, from contractor to Analyst II.',
  'Led a ~60-device fleet migration across 3 waves, coordinating stakeholders and a carrier partner.',
  'Designed and became the sole point of contact for a formal desk-to-engineering handoff process covering escalations that previously had zero tracking.',
  'Escalations routed to me by name; sole owner of the mobile-device support domain.',
];

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
        <blockquote className="recognition">
          <p>&ldquo;one of the best service desk specialists I&apos;ve ever worked with in my 20+ years of experience&rdquo;</p>
          <cite>FROM A WORKDAY PEER REVIEW</cite>
        </blockquote>
      </Reveal>
    </section>
  );
}
