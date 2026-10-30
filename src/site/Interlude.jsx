import Reveal from './Reveal';
import './interlude.css';

/* Recognition callout: one line from a peer review, under the role it
   describes. Left rule in the accent, mono label. */
export default function Interlude() {
  return (
    <Reveal className="interlude">
      <blockquote>
        <p>&ldquo;one of the best service desk specialists I&rsquo;ve ever worked with in my 20+ years of experience&rdquo;</p>
        <cite>from a Workday peer review</cite>
      </blockquote>
    </Reveal>
  );
}
