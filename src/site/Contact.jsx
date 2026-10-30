import Reveal from './Reveal';
import SecHead from './SecHead';

export default function Contact() {
  return (
    <section id="contact">
      <SecHead name="Contact" />
      <Reveal className="contact-grid">
        <div>
          <p className="contact-big">Let&apos;s talk.</p>
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
