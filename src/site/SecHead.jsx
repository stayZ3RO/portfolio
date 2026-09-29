import Reveal from './Reveal';

/* Section header: number, char-staggered name, rule sweep. */
export default function SecHead({ num, name, extra }) {
  const chars = [...name].map((c, i) => (
    <span
      key={i}
      className="ch"
      aria-hidden="true"
      style={{ transitionDelay: `${i * 22}ms` }}
    >
      {c === ' ' ? ' ' : c}
    </span>
  ));
  return (
    <Reveal className="sec-head">
      <span className="sec-num">{num}</span>
      <span className="sec-name" aria-label={name}>
        {chars}
      </span>
      {extra}
      <span className="sec-rule">
        <span className="sweep"></span>
      </span>
    </Reveal>
  );
}
