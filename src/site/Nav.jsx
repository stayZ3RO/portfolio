/* Fixed primary nav: name + section links, Resume on mobile and desktop. */
export default function Nav() {
  return (
    <nav aria-label="Primary">
      <div className="nav-inner">
        <a className="nav-name" href="#main">Christopher Lorenzo</a>
        <div className="nav-links">
          <a className="nav-sec" href="#systems">Systems</a>
          <a className="nav-sec" href="#lab">Lab</a>
          <a className="nav-sec" href="#now">Now</a>
          <a className="nav-sec" href="#experience">Experience</a>
          <a className="nav-sec" href="#contact">Contact</a>
          <a href="./resume.pdf">Resume</a>
        </div>
      </div>
    </nav>
  );
}
