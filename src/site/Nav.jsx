import ThemeSwitcher from './ThemeSwitcher';

/* Shared masthead, the blog's: wordmark, mono doc tag, one tagline, mono
   lowercase links, the theme switcher, a double rule underneath. Sticky,
   never drops a link: at 600px and below the nav wraps to its own row.
   The blog link is the one link both sites always carry to each other. */
const HOME_LINKS = [
  ['systems', '#systems'],
  ['lab', '#lab'],
  ['now', '#now'],
  ['experience', '#experience'],
  ['contact', '#contact'],
  ['resume', '/resume.pdf'],
  ['blog', 'https://blog.chrisalorenzo.com'],
];

export default function Nav({ links = HOME_LINKS }) {
  return (
    <header className="site">
      <div className="brand-block">
        <a href="/" className="brand" aria-label="Christopher Lorenzo home">
          <span className="brand-name">Christopher Lorenzo</span>
          <span className="doc-tag" aria-hidden="true">PF-01</span>
        </a>
        <p className="tagline">portfolio · systems, lab, and the road to platform engineering</p>
      </div>
      <nav aria-label="Primary">
        {links.map(([label, href]) => (
          <a key={label} href={href}>{label}</a>
        ))}
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
