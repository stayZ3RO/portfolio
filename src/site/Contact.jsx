import Reveal from './Reveal';
import SecHead from './SecHead';

export default function Contact() {
  return (
    <section id="contact">
      <SecHead name="Contact" />
      <Reveal className="contact-grid">
        <div>
          <p className="contact-line">
            I like work where the fix is written down and the next person can repeat it.
            Email is the easiest way to reach me.
          </p>
          <a className="email-link" href="mailto:stayz3ro@gmail.com">stayz3ro@gmail.com</a>
        </div>
        <div className="contact-side">
          <a className="btn btn-solid" href="./resume.pdf">Download resume</a>
          <div className="socials">
            <a href="https://github.com/stayZ3ro">GitHub <span className="arr">↗</span></a>
            <a href="https://www.linkedin.com/in/christopher-l-2118351ab">LinkedIn <span className="arr">↗</span></a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
