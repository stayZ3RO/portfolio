const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

function Resume() {
  return (
    <section className="resume-panel" id="resume" aria-labelledby="resume-title">
      <p className="eyebrow">Resume</p>
      <h2 id="resume-title">Download my current public resume.</h2>
      <p>
        Download my current public resume focused on IT support, infrastructure, networking,
        cloud fundamentals, and hands-on homelab projects.
      </p>
      <a className="button primary" href={resumeHref} download>
        Download Resume
      </a>
    </section>
  );
}

export default Resume;
