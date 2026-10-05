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
      <span className="sec-num" aria-hidden="true">{num}</span>
      <h2 className="sec-name">
        <span className="sr-only">{name}</span>
        <span className="sec-chars" aria-hidden="true">{chars}</span>
      </h2>
      {extra}
      <span className="sec-rule">
        <span className="sweep"></span>
      </span>
    </Reveal>
  );
}
