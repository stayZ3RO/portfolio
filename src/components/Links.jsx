import Reveal from './Reveal.jsx';

function Links() {
  return (
    <section className="links" id="links" aria-label="Links">
      <Reveal>
        <a className="lcard" href="https://blog.chrisalorenzo.com" target="_blank" rel="noreferrer">
          <span className="tag">/ blog</span>
          <h3>blog.chrisalorenzo.com</h3>
          <p>Long-form write-ups on the labs, the decisions, and the lessons.</p>
          <span className="go">read →</span>
        </a>
      </Reveal>
      <Reveal delay={80}>
        <a className="lcard" href="https://status.chrisalorenzo.com" target="_blank" rel="noreferrer">
          <span className="tag">/ dashboard</span>
          <h3>status.chrisalorenzo.com</h3>
          <p>A public status view of the live services, exposed safely, no admin access.</p>
          <span className="go">view →</span>
        </a>
      </Reveal>
      <Reveal delay={160}>
        <a className="lcard" href="https://github.com/stayZ3RO" target="_blank" rel="noreferrer">
          <span className="tag">/ github</span>
          <h3>github.com/stayZ3RO</h3>
          <p>All the source, all the history, all the evidence.</p>
          <span className="go">browse →</span>
        </a>
      </Reveal>
    </section>
  );
}

export default Links;
