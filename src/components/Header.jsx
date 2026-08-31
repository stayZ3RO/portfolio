function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top">
        Christopher Austin Lorenzo
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#work">work</a>
        <a href="#links">links</a>
      </nav>

      <span className="status-pill">
        <span className="dot"></span>learning in public
      </span>
    </header>
  );
}

export default Header;
