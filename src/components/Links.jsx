function Links() {
  return (
    <section className="links" id="links" aria-label="Links">
      <a className="lcard" href="https://stayz3ro.dev" target="_blank" rel="noreferrer">
        <span className="tag">/ blog</span>
        <h3>stayz3ro.dev</h3>
        <p>Long-form write-ups on the labs, the decisions, and the lessons.</p>
        <span className="go">read →</span>
      </a>
      <a className="lcard" href="https://status.stayz3ro.dev" target="_blank" rel="noreferrer">
        <span className="tag">/ dashboard</span>
        <h3>status.stayz3ro.dev</h3>
        <p>A public status view of the live services, exposed safely, no admin access.</p>
        <span className="go">view →</span>
      </a>
      <a className="lcard" href="https://github.com/stayZ3RO" target="_blank" rel="noreferrer">
        <span className="tag">/ github</span>
        <h3>github.com/stayZ3RO</h3>
        <p>All the source, all the history, all the evidence.</p>
        <span className="go">browse →</span>
      </a>
    </section>
  );
}

export default Links;
