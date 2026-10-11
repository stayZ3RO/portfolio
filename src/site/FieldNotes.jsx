import './fieldnotes.css';
import Reveal from './Reveal';

/* The three newest published entries from the blog, titles copied
   verbatim from frontmatter on 2026-10-11 (all draft: false). URL
   pattern /blog/<slug>/ per the blog's src/pages/blog/[...slug].astro.
   Refresh this list when a new entry publishes; the blog's RSS is the
   source of truth. */
const BLOG = 'https://blog.chrisalorenzo.com';

const POSTS = [
  {
    date: '2026-10-04',
    title: 'Patching four cloud servers took more than apt upgrade',
    slug: 'patching-four-cloud-servers',
  },
  {
    date: '2026-09-29',
    title: 'Moving my home network from Omada to UniFi, looking back',
    slug: 'omada-to-unifi-looking-back',
  },
  {
    date: '2026-09-29',
    title: 'Permission denied, and the server was fine',
    slug: 'permission-denied-locked-key',
  },
];

export default function FieldNotes() {
  return (
    <Reveal className="fieldnotes" aria-label="Field notes from the blog">
      <p className="fn-kicker">LOGBOOK EXCERPT</p>
      <h2 className="fn-head">Field notes</h2>
      <p className="fn-sub">
        What the lab taught me, written up in the{' '}
        <a className="fn-link" href={`${BLOG}/ledger/`} target="_blank" rel="noreferrer">field manual</a>.
      </p>
      <ul className="fn-list">
        {POSTS.map((p) => (
          <li key={p.slug} className="fn-row">
            <a className="fn-a" href={`${BLOG}/blog/${p.slug}/`} target="_blank" rel="noreferrer">
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
