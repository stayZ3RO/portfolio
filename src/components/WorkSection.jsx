import { useMemo, useRef, useState } from 'react';
import { projects } from '../data/projects.js';
import Reveal from './Reveal.jsx';

/* Project index: a terminal-styled, filterable listing.
   Typing in the prompt line filters entries; chip rows filter by
   category and status. Entries expand in place to the full project
   card (summary, proof, evidence links, detail notes). Status color
   comes from the theme status tokens (k-* classes). */

const toneClass = {
  mature: 'k-mature',
  active: 'k-active',
  'learning-lab': 'k-learning',
  'in-progress': 'k-prog',
  private: 'k-prog',
};

const CATEGORY_CHIPS = ['Infrastructure', 'Networking', 'Cloud', 'Tools'];
const STATUS_CHIPS = [
  { key: 'mature', label: 'mature' },
  { key: 'active', label: 'active' },
  { key: 'in-progress', label: 'in-progress' },
  { key: 'learning-lab', label: 'learning' },
  { key: 'private', label: 'private' },
];

function matches(project, query, category, status) {
  if (category !== 'all' && !project.categories.includes(category)) return false;
  if (status !== 'all' && project.statusTone !== status) return false;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = [
    project.title,
    project.subtitle,
    project.summary,
    project.focus,
    (project.tools || []).join(' '),
    (project.proof || []).join(' '),
  ]
    .join(' ')
    .toLowerCase();
  return q.split(/\s+/).every((part) => hay.includes(part));
}

function Evidence({ project }) {
  const repo = project.links[0];
  const shotCount = project.visuals ? project.visuals.images.length + 1 : 0;
  return (
    <div className="wev-block">
      <span className="wlabel">evidence</span>
      <span className="wev-links">
        {repo ? (
          <a className="wev-link" href={repo.href} target="_blank" rel="noreferrer">
            {repo.label.toLowerCase()} ↗
          </a>
        ) : (
          <span className="wev-private">private repo</span>
        )}
        {shotCount > 0 && <span className="wev-shots">{shotCount} screenshot{shotCount > 1 ? 's' : ''}</span>}
        {project.posts.length > 0 &&
          project.posts.map((post) => (
            <a className="wev-link" key={post.href} href={post.href} target="_blank" rel="noreferrer">
              {post.label.toLowerCase()} ↗
            </a>
          ))}
      </span>
    </div>
  );
}

function Entry({ project, visible, stagger }) {
  const [open, setOpen] = useState(false);
  const tone = toneClass[project.statusTone] || 'k-prog';
  const figure = project.visuals?.figure;
  const repo = project.links[0];

  return (
    <div
      className={`wentry ${visible ? 'is-open' : 'is-closed'}`}
      style={visible && stagger ? { transitionDelay: `${stagger}ms` } : undefined}
      aria-hidden={visible ? undefined : true}
    >
      <div className="wentry-inner">
        <button
          type="button"
          className="wrow"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          tabIndex={visible ? 0 : -1}
        >
          <span className={`wdot ${tone}`} aria-hidden="true"></span>
          <span className="wdir">{project.dir}</span>
          <span className={`wstatus ${tone}`}>{project.status}</span>
          <span className="wcmt"># {project.subtitle}</span>
          <span className="wrow-ev">{repo ? 'github ↗' : 'private'}</span>
          <span className={`wcaret ${open ? 'is-open' : ''}`} aria-hidden="true">
            +
          </span>
        </button>

        <div className={`wdetail ${open ? 'is-open' : ''}`}>
          <div className="wdetail-inner">
            <h3 className="wtitle">{project.title}</h3>
            <p className="wsub">{project.subtitle}</p>
            <p className="wsummary">{project.summary}</p>

            {project.proof && project.proof.length > 0 && (
              <div className="wproof">
                <span className="wlabel">proof</span>
                <ul>
                  {project.proof.map((item) => (
                    <li key={item}>
                      <span className="wcheck" aria-hidden="true">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="wtools">
              <span className="wlabel">stack</span>
              <span className="wtool-chips">
                {(project.tools || []).map((tool) => (
                  <span className="wtool" key={tool}>{tool}</span>
                ))}
              </span>
            </div>

            <Evidence project={project} />

            {project.details && project.details.length > 0 && (
              <dl className="wnotes">
                {project.details.map((d) => (
                  <div className="wnote" key={d.label}>
                    <dt className="wlabel">{d.label.toLowerCase()}</dt>
                    <dd>{d.text}</dd>
                  </div>
                ))}
              </dl>
            )}

            {figure && (
              <figure className="wfigure">
                <img src={figure.src} alt={figure.alt} loading="lazy" />
                <figcaption>{figure.caption}</figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkSection() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const inputRef = useRef(null);

  const visibleSet = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      if (matches(p, query, category, status)) set.add(p.title);
    });
    return set;
  }, [query, category, status]);

  const shown = visibleSet.size;
  let staggerIdx = -1;

  const toggleChip = (setter, current, value) => setter(current === value ? 'all' : value);

  return (
    <section className="section work-sec" id="work" aria-label="Projects">
      <Reveal>
        <div className="sec-head">
          <p className="eyebrow">/ work</p>
          <h2>Projects that show how I build, troubleshoot, and document.</h2>
          <p className="hint">Type to filter the index, or pick a chip. Select an entry to open it.</p>
        </div>
      </Reveal>

      <Reveal variant="soft" delay={110}>
        <div className="term work-term">
          <div className="term-bar">
            <span className="t r"></span>
            <span className="t y"></span>
            <span className="t g"></span>
            <span className="title">~/work : project index</span>
          </div>

          <div className="term-body">
            <div className="ln wfilter" onClick={() => inputRef.current?.focus()}>
              <span className="p">❯</span> <span className="cmd">ls ~/projects</span>
              <span className="wflag"> --filter</span>
              <input
                ref={inputRef}
                className="winput"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="type to filter"
                aria-label="Filter projects"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="cursor" aria-hidden="true"></span>
            </div>

            <div className="ln wchips" role="group" aria-label="Filter by category">
              <span className="wchip-label">stack:</span>
              {CATEGORY_CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`wchip ${category === c ? 'is-active' : ''}`}
                  aria-pressed={category === c}
                  onClick={() => toggleChip(setCategory, category, c)}
                >
                  {c.toLowerCase()}
                </button>
              ))}
              <span className="wchip-label">status:</span>
              {STATUS_CHIPS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className={`wchip ${status === s.key ? 'is-active' : ''}`}
                  aria-pressed={status === s.key}
                  onClick={() => toggleChip(setStatus, status, s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="ln wcount" aria-live="polite">
              <span className="cmt">
                {shown} of {projects.length} projects
                {query.trim() || category !== 'all' || status !== 'all' ? ' · matching' : ''}
              </span>
            </div>

            <div className="windex">
              {projects.map((project) => {
                const visible = visibleSet.has(project.title);
                if (visible) staggerIdx += 1;
                return (
                  <Entry
                    key={project.title}
                    project={project}
                    visible={visible}
                    stagger={visible ? Math.min(staggerIdx, 8) * 55 : 0}
                  />
                );
              })}
            </div>

            {shown === 0 && (
              <div className="ln wempty">
                <span className="cmt">no matches. clear the filter and try again.</span>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default WorkSection;
