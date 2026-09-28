import { useMemo, useRef, useState } from 'react';
import { projects } from '../data/projects.js';
import Reveal from './Reveal.jsx';

/* Work section, rework pass:
   - display headline (hero treatment), no instruction manual
   - flagship spotlight for the mature build, media-first
   - filter prompt + chips as section controls (no terminal window box)
   - index rows with thumbnails, tactile hover
   - expanded cards lead with the project figure
   Filtering, chips, status tokens, evidence structure: unchanged from v1. */

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

const FLAGSHIP_DIR = 'home-network-infra/';

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

/* Row thumbnail: project figure, or a mini terminal for code-media projects. */
function Thumb({ project }) {
  const figure = project.visuals?.figure;
  if (figure) {
    return (
      <span className="wthumb" aria-hidden="true">
        <img src={figure.src} alt="" loading="lazy" />
      </span>
    );
  }
  const lines = (project.codeMedia || []).slice(0, 3);
  return (
    <span className="wthumb wthumb-code" aria-hidden="true">
      {lines.map((line, i) => (
        <span className="wt-line" key={i}>
          {line.prompt ? <span className="wt-p">$ </span> : null}
          <span className={line.prompt ? 'wt-cmd' : 'wt-out'}>{line.text}</span>
        </span>
      ))}
    </span>
  );
}

function Flagship({ project }) {
  const tone = toneClass[project.statusTone] || 'k-prog';
  const figure = project.visuals?.figure;
  const repo = project.links[0];
  return (
    <Reveal variant="rise">
      <article className="wflag" aria-label={`Featured project: ${project.title}`}>
        {figure && (
          <a
            className="wflag-media"
            href={repo ? repo.href : undefined}
            target={repo ? '_blank' : undefined}
            rel={repo ? 'noreferrer' : undefined}
            aria-label={`${project.title} architecture diagram${repo ? ', opens the repository' : ''}`}
          >
            <img src={figure.src} alt={figure.alt} loading="lazy" />
          </a>
        )}
        <div className="wflag-body">
          <p className="wflag-kicker">
            <span className="wlabel">flagship</span>
            <span className={`wflag-status ${tone}`}>
              <span className={`wdot ${tone}`} aria-hidden="true"></span>
              {project.status}
            </span>
          </p>
          <h3 className="wflag-title">{project.title}</h3>
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

          <Evidence project={project} />
        </div>
      </article>
    </Reveal>
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
          <Thumb project={project} />
          <span className="wrow-main">
            <span className="wrow-top">
              <span className={`wdot ${tone}`} aria-hidden="true"></span>
              <span className="wdir">{project.dir}</span>
              <span className={`wstatus ${tone}`}>{project.status}</span>
            </span>
            <span className="wcmt"># {project.subtitle}</span>
          </span>
          <span className="wrow-ev">{repo ? 'github ↗' : 'private'}</span>
          <span className={`wcaret ${open ? 'is-open' : ''}`} aria-hidden="true">
            +
          </span>
        </button>

        <div className={`wdetail ${open ? 'is-open' : ''}`}>
          <div className="wdetail-inner">
            {figure ? (
              <div className="wvisual">
                <figure className="wfigure wfigure-lead">
                  <img src={figure.src} alt={figure.alt} loading="lazy" />
                </figure>
                <div className="wvisual-side">
                  <div className="wside-row">
                    <span className="wlabel">figure</span>
                    <p className="wfigcaption">{figure.caption}</p>
                  </div>
                  <div className="wside-row">
                    <span className="wlabel">status</span>
                    <span className="wstatus-pill">
                      <span className={`wdot ${tone}`} aria-hidden="true"></span>
                      {project.status}
                    </span>
                  </div>
                  <div className="wside-row">
                    <span className="wlabel">stack</span>
                    <span className="wtool-chips">
                      {(project.tools || []).map((tool) => (
                        <span className="wtool" key={tool}>{tool}</span>
                      ))}
                    </span>
                  </div>
                  <Evidence project={project} />
                </div>
              </div>
            ) : null}
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

            {!figure && (
              <div className="wtools">
                <span className="wlabel">stack</span>
                <span className="wtool-chips">
                  {(project.tools || []).map((tool) => (
                    <span className="wtool" key={tool}>{tool}</span>
                  ))}
                </span>
              </div>
            )}

            {!figure && <Evidence project={project} />}

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

  const flagship = projects.find((p) => p.dir === FLAGSHIP_DIR);

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
          <h2 className="work-title">Selected work.</h2>
        </div>
      </Reveal>

      {flagship && (
        <div className="wflag-wrap">
          <Flagship project={flagship} />
        </div>
      )}

      <Reveal variant="soft" delay={110}>
        <div className="wcontrols">
          <div className="wfilter" onClick={() => inputRef.current?.focus()}>
            <span className="p">❯</span> <span className="cmd">ls ~/projects</span>
            <span className="wfilter-flag"> --filter</span>
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

          <div className="wchips" role="group" aria-label="Filter by category">
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

          <p className="wcount" aria-live="polite">
            <span className="cmt">
              {shown} of {projects.length} projects
              {query.trim() || category !== 'all' || status !== 'all' ? ' · matching' : ''}
            </span>
          </p>
        </div>
      </Reveal>

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
        <p className="wempty">
          <span className="cmt">no matches. clear the filter and try again.</span>
        </p>
      )}
    </section>
  );
}

export default WorkSection;
