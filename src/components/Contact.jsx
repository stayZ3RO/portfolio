function Contact() {
  return (
    <section className="contact-block" id="contact" aria-labelledby="contact-title">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">Let's connect.</h2>
      </div>

      <div className="contact-list">
        <a
          href="mailto:stayz3ro@gmail.com?subject=Portfolio%20Contact%20-%20Christopher%20Austin%20Lorenzo"
          aria-label="Email Christopher Austin Lorenzo"
        >
          <strong>Email</strong>
          <span>stayz3ro@gmail.com</span>
          <small>Click to email</small>
        </a>
        <a href="https://github.com/stayZ3RO" target="_blank" rel="noreferrer">
          <strong>GitHub</strong>
          <span>github.com/stayZ3RO</span>
        </a>
        <a href="https://www.linkedin.com/in/christopher-l-2118351ab/" target="_blank" rel="noreferrer">
          <strong>LinkedIn</strong>
          <span>christopher-l-2118351ab</span>
        </a>
      </div>
    </section>
  );
}

export default Contact;
