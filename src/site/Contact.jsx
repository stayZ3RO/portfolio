import Reveal from './Reveal';
import SecHead from './SecHead';

export default function Contact() {
  return (
    <section id="contact">
      <div className="ghost" aria-hidden="true">04</div>
      <SecHead num="04" name="Contact" />
      <Reveal>
        <div className="contact-big">Let&apos;s talk.</div>
        <a className="email-link" href="mailto:stayz3ro@gmail.com">stayz3ro@gmail.com</a>
        <div className="ctas" style={{ marginTop: '32px' }}>
          <a className="btn btn-solid magnetic" href="./resume.pdf">Download resume</a>
        </div>
        <div className="socials">
          <a href="https://github.com/stayZ3ro">GitHub <span className="arr">↗</span></a>
          <a href="https://www.linkedin.com/in/christopher-l-2118351ab">LinkedIn <span className="arr">↗</span></a>
        </div>
      </Reveal>
    </section>
  );
}
