import Reveal from './Reveal';
import './interlude.css';

/* Full-bleed recognition interlude: the rhythmic surprise. One voice,
   big type, oceans of whitespace, nothing else on the row. */
export default function Interlude() {
  return (
    <Reveal className="interlude" variant="rise-scale">
      <blockquote>
        <p>&ldquo;one of the best service desk specialists I&rsquo;ve ever worked with in my 20+ years of experience&rdquo;</p>
        <cite>from a Workday peer review</cite>
      </blockquote>
    </Reveal>
  );
}
