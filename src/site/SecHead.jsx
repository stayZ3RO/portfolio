import Reveal from './Reveal';

/* Section kicker: § and the section word in mono caps, an optional link
   or tag, and a hairline that draws out to the edge once. */
export default function SecHead({ name, extra }) {
  return (
    <Reveal className="kick">
      <h2 className="kick-name"><span className="kick-sec" aria-hidden="true">§</span>{name}</h2>
      {extra}
      <span className="kick-rule" aria-hidden="true"></span>
    </Reveal>
  );
}
