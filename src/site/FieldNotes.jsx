import './fieldnotes.css';
import Reveal from './Reveal';

/* Real posts from the field manual (stayz3ro.dev), titles copied verbatim
   from frontmatter on 2026-09-29. All draft:false. URL pattern verified as
   https://<site>/blog/<slug> via src/pages/blog/[...slug].astro. */
const BLOG = 'https://stayz3ro.dev';

const POSTS = [
  {
    date: '2026-05-11',
    title: 'Hardening a public VPS before it hosts anything',
    slug: 'hardening-a-public-vps',
  },
  {
    date: '2026-04-25',
    title: 'Remote access without opening ports',
    slug: 'remote-access-without-opening-ports',
  },
  {
    date: '2026-04-19',
    title: 'Monitoring the DNS stack',
    slug: 'monitoring-the-dns-stack',
  },
];

export default function FieldNotes() {
  return (
    <Reveal className="fieldnotes" aria-label="Field notes from the blog">
      <p className="fn-kicker">LOGBOOK EXCERPT</p>
      <h2 className="fn-head">Field notes</h2>
      <p className="fn-sub">
        What the lab taught me, written up in the{' '}
        <a className="fn-link" href={BLOG} target="_blank" rel="noreferrer">field manual</a>.
      </p>
      <ul className="fn-list">
        {POSTS.map((p) => (
          <li key={p.slug} className="fn-row">
            <a className="fn-a" href={`${BLOG}/blog/${p.slug}`} target="_blank" rel="noreferrer">
              <span className="fn-date">{p.date}</span>
              <span className="fn-title">{p.title}</span>
              <span className="fn-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
