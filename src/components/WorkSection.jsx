import { useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '../data/projects.js';
import { THEMES, applyTheme, currentTheme } from '../theme.js';
import { getMotion, setMotion } from '../motion.js';
import Reveal from './Reveal.jsx';

/* Work section, art-direction pass ("field manual" language):
   - Sarthak spine: terminal register as native voice, status pill, studies
     framed as systems with real artifact counts, calm multi-page structure
   - Rauno device: a / lab strip of dated, live component studies
   - Sagar discipline: one-accent tokens, persisted motion toggle, a latest
     activity ticker of real shipped work
   Anti-slop rules: asymmetric editorial layouts, no centered hero stacks,
   no gradients, no glass, mono voice used natively, real data only.
   Interactions kept from the approved pass: live ls --filter prompt,
   stack:/status: chips (55/110ms stagger, 320ms ease-out), status dots,
   expanded in-place cards with proof/evidence/P-I-V-O. */

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

/* Latest-activity ticker: real items only, grounded in the project data. */
const TICKER_ITEMS = [
  'home-network-infra: ha dns failover validated',
  'managed-network: phase 1 cutover complete',
  'aws-automation: ci green, 24 pytest passed',
  'vps-cloud: ufw posture hardened',
  'service-desk-toolkit: diagnostics in development',
  '8 themes live: catppuccin, tokyo night, rosé pine, dracula',
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

/* Flagship: full-bleed editorial. The diagram carries the composition;
   title sits on the image, facts run in a ledger strip below. */
function Flagship({ project }) {
  const tone = toneClass[project.statusTone] || 'k-prog';
  const figure = project.visuals?.figure;
  const toolCount = (project.tools || []).length;
  const proofCount = (project.proof || []).length;
  return (
    <Reveal variant="rise">
      <article className="wflag2" aria-label={`Featured project: ${project.title}`}>
        <div className="wflag2-media">
          {figure && <img src={figure.src} alt={figure.alt} loading="lazy" />}
          <span className="wflag2-kicker wlabel">flagship</span>
          <span className={`wflag2-status ${tone}`}>
            <span className={`wdot ${tone}`} aria-hidden="true"></span>
            {project.status}
          </span>
          <div className="wflag2-titleblock">
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
          </div>
        </div>
        <div className="wflag2-strip">
          <div className="wflag2-cell">
            <span className="wlabel">brief</span>
            <p>{project.summary}</p>
          </div>
          <div className="wflag2-cell">
            <span className="wlabel">proof</span>
            <ul>
              {project.proof.map((item) => (
                <li key={item}>
                  <span className="wcheck" aria-hidden="true">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="wflag2-cell">
            <span className="wlabel">record</span>
            <p className="wflag2-meta">
              {toolCount} tools · {proofCount} proof checks · {figure ? 'diagrammed' : 'terminal-native'}
            </p>
            <Evidence project={project} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Entry({ project, index, visible, stagger }) {
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
          <span className="widx" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
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

        <div className={`wx ${open ? 'is-open' : ''}`}>
          <div className="wx-inner">
            {figure && (
              <div className="wx-spread">
                <figure className="wx-figure">
                  <img src={figure.src} alt={figure.alt} loading="lazy" />
                </figure>
                <div className="wx-rail">
                  <div className="wx-rail-top">
                    <div className="wx-rail-row">
                      <span className="wlabel">figure</span>
                      <p className="wx-cap">{figure.caption}</p>
                    </div>
                    <div className="wx-rail-row">
                      <span className="wlabel">status</span>
                      <span className="wstatus-pill">
                        <span className={`wdot ${tone}`} aria-hidden="true"></span>
                        {project.status}
                      </span>
                    </div>
                    <div className="wx-rail-row">
                      <span className="wlabel">stack</span>
                      <span className="wtool-chips">
                        {(project.tools || []).map((tool) => (
                          <span className="wtool" key={tool}>{tool}</span>
                        ))}
                      </span>
                    </div>
                  </div>
                  <Evidence project={project} />
                </div>
              </div>
            )}
            <div className="wx-body">
              <h3 className="wx-title">{project.title}</h3>
              <p className="wsub">{project.subtitle}</p>
              <p className="wsummary">{project.summary}</p>

              {project.proof && project.proof.length > 0 && (
                <div className="wx-proof">
                  <span className="wlabel">proof</span>
                  <ul className="wx-proofgrid">
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
                <dl className="wx-notes">
                  {project.details.map((d) => (
                    <div className="wx-note" key={d.label}>
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
    </div>
  );
}

/* Motion preference as a first-class, persisted control. */
function MotionToggle() {
  const [motion, setMotionState] = useState(() => getMotion());
  useEffect(() => {
    const on = (e) => setMotionState(e.detail);
    window.addEventListener('motionchange', on);
    return () => window.removeEventListener('motionchange', on);
  }, []);
  return (
    <div className="wmotion" role="group" aria-label="Motion preference">
      <span className="wchip-label">motion:</span>
      {['full', 'reduced'].map((m) => (
        <button
          key={m}
          type="button"
          className={`wchip ${motion === m ? 'is-active' : ''}`}
          aria-pressed={motion === m}
          onClick={() => setMotionState(setMotion(m))}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

/* Latest-activity ticker: a thin ops-console strip. CSS marquee; the
   duplicate track is aria-hidden, reduced motion freezes it. */
function Ticker() {
  const row = (hidden) => (
    <div className="wticker-track" aria-hidden={hidden || undefined}>
      {TICKER_ITEMS.map((item) => (
        <span className="wt-item" key={item}>
          <span className="wt-sep" aria-hidden="true">▸</span> {item}
        </span>
      ))}
    </div>
  );
  return (
    <div className="wticker" role="marquee" aria-label="Latest activity">
      <span className="wticker-label wlabel">latest</span>
      <div className="wticker-viewport">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ---------- / lab: dated, live component studies ---------- */

function LabCard({ id, name, date, version, children }) {
  return (
    <article className="wlab-card">
      <header className="wlab-card-head">
        <span className="wlab-id">{id} · {name}</span>
        <span className="wlab-date">{date}</span>
      </header>
      <div className="wlab-body">{children}</div>
      <footer className="wlab-foot">
        <span className="wlab-ver">{version}</span>
        <span className="wlab-live">
          <span className="wdot-live" aria-hidden="true"></span> live
        </span>
      </footer>
    </article>
  );
}

/* lab/01: the site's own eight-theme switcher, exhibited and functional. */
function ThemeMatrix() {
  const [current, setCurrent] = useState(() => currentTheme());
  useEffect(() => {
    const on = () => setCurrent(currentTheme());
    window.addEventListener('themechange', on);
    return () => window.removeEventListener('themechange', on);
  }, []);
  return (
    <div className="lab-theme">
      <div className="lab-swatches" role="group" aria-label="Exhibit: theme switcher">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`lab-sw ${current === t.id ? 'is-active' : ''}`}
            style={{ backgroundColor: t.bg, ['--sw-accent']: t.accent }}
            onClick={() => setCurrent(applyTheme(t.id))}
            aria-label={t.label}
            aria-pressed={current === t.id}
            title={t.label}
          />
        ))}
      </div>
      <p className="lab-note">
        current: <span className="lab-note-val">{current}</span>. eight themes, one contract. click a swatch, the whole site follows.
      </p>
    </div>
  );
}

/* lab/02: live-computed stats from the project index. Real data only. */
function IndexStats() {
  const stats = useMemo(() => {
    const proof = projects.reduce((n, p) => n + (p.proof || []).length, 0);
    const tools = projects.reduce((n, p) => n + (p.tools || []).length, 0);
    const figs = projects.filter((p) => p.visuals && p.visuals.figure).length;
    const bars = projects.map((p) => ({
      dir: p.dir.replace(/\/$/, ''),
      n: (p.tools || []).length,
    }));
    return { projects: projects.length, proof, tools, figs, bars, max: Math.max(...bars.map((b) => b.n)) };
  }, []);
  return (
    <div className="lab-stats">
      <div className="lab-bars" aria-label="Tools per project">
        {stats.bars.map((b) => (
          <div className="lab-bar-row" key={b.dir}>
            <span className="lab-bar-dir">{b.dir}</span>
            <span className="lab-bar-track">
              <span className="lab-bar" style={{ width: `${Math.round((b.n / stats.max) * 100)}%` }} />
            </span>
            <span className="lab-bar-n">{b.n}</span>
          </div>
        ))}
      </div>
      <p className="lab-note">
        {stats.projects} projects · {stats.proof} proof checks · {stats.tools} tools · {stats.figs} diagrammed. computed from the index, live.
      </p>
    </div>
  );
}

/* lab/03: a miniature console over the project index. Real answers only. */
const CONSOLE_HELP = 'commands: ls, status, whoami, clear';

function consoleAnswer(cmd) {
  const c = cmd.trim().toLowerCase();
  if (!c) return null;
  if (c === 'help') return CONSOLE_HELP;
  if (c === 'clear') return 'CLEAR';
  if (c === 'ls') return projects.map((p) => p.dir).join('   ');
  if (c === 'status')
    return projects.map((p) => `${p.dir} -> ${p.status.toLowerCase()}`).join('\n');
  if (c === 'whoami') return 'christopher: infrastructure, applied ai, everything documented';
  const hit = projects.find((p) => p.dir.replace(/\/$/, '') === c);
  if (hit) return `${hit.dir} -> ${hit.status.toLowerCase()} · ${hit.subtitle.toLowerCase()}`;
  return `unknown command: ${cmd}. try 'help'.`;
}

function MiniConsole() {
  const [lines, setLines] = useState([
    { text: "type 'help'. this console reads the project index.", cls: 'lab-term-dim' },
  ]);
  const [value, setValue] = useState('');
  const outRef = useRef(null);

  useEffect(() => {
    const el = outRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = () => {
    const answer = consoleAnswer(value);
    if (answer === 'CLEAR') {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        { text: `❯ ${value}`, cls: 'lab-term-cmd' },
        ...(answer ? [{ text: answer, cls: 'lab-term-ans' }] : []),
      ]);
    }
    setValue('');
  };

  return (
    <div className="lab-term">
      <div className="lab-term-out" ref={outRef} aria-live="polite">
        {lines.map((l, i) => (
          <div className={`lab-term-line ${l.cls}`} key={i}>
            {l.text}
          </div>
        ))}
      </div>
      <div className="lab-term-in">
        <span className="lab-term-p" aria-hidden="true">❯</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') run();
          }}
          placeholder="help"
          aria-label="Lab console input"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

function LabStrip() {
  return (
    <div className="wlab">
      <Reveal variant="soft">
        <div className="wlab-head">
          <p className="eyebrow">/ lab</p>
          <p className="wlab-lede">component studies, live. built for the homelab, exhibited here.</p>
        </div>
      </Reveal>
      <div className="wlab-grid">
        <Reveal variant="soft" delay={55}>
          <LabCard id="lab/01" name="theme-matrix" date="sep 2026" version="v0.3">
            <ThemeMatrix />
          </LabCard>
        </Reveal>
        <Reveal variant="soft" delay={110}>
          <LabCard id="lab/02" name="index-stats" date="sep 2026" version="v0.2">
            <IndexStats />
          </LabCard>
        </Reveal>
        <Reveal variant="soft" delay={165}>
          <LabCard id="lab/03" name="console" date="sep 2026" version="v0.1">
            <MiniConsole />
          </LabCard>
        </Reveal>
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
        <div className="work-head">
          <div className="work-kicker">
            <p className="eyebrow">/ work</p>
            <p className="work-count">index {String(projects.length).padStart(2, '0')}</p>
          </div>
          <h2 className="work-display" aria-label="Selected work.">
            <span className="wd-solid" aria-hidden="true">SELECTED</span>
            <span className="wd-outline" aria-hidden="true">WORK.</span>
          </h2>
          <p className="work-lede">
            <span className="p" aria-hidden="true">❯</span> five builds, documented end to end. type to filter, or open a study.
          </p>
        </div>
      </Reveal>

      <Reveal variant="soft" delay={55}>
        <Ticker />
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

          <div className="wcontrols-meta">
            <p className="wcount" aria-live="polite">
              <span className="cmt">
                {shown} of {projects.length} projects
                {query.trim() || category !== 'all' || status !== 'all' ? ' · matching' : ''}
              </span>
            </p>
            <MotionToggle />
          </div>
        </div>
      </Reveal>

      <div className="windex">
        <div className="windex-head" aria-hidden="true">
          <span className="windex-h-idx">#</span>
          <span className="windex-h-thumb"></span>
          <span>project</span>
          <span>status</span>
          <span>evidence</span>
          <span></span>
        </div>
        {projects.map((project, i) => {
          const visible = visibleSet.has(project.title);
          if (visible) staggerIdx += 1;
          return (
            <Entry
              key={project.title}
              project={project}
              index={i}
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

      <LabStrip />
    </section>
  );
}

export default WorkSection;
