import { useState } from 'react';
import Reveal from './Reveal';
import SecHead from './SecHead';
import { SYSTEMS } from './data';
import { REDUCED } from './env';
import './case-study.css';

function CaseStudy() {
  return (
    <Reveal as="article" className="case-study" aria-labelledby="cs-title">
      <div className="cs-eyebrow">FEATURED CASE STUDY</div>
      <h3 id="cs-title">The service desk automation platform</h3>
      <p className="cs-status">
        <span className="tag running"><span className="dot"></span>[running]</span> dashboards live
        <span className="cs-sep" aria-hidden="true">/</span>
        <span className="tag building"><span className="dot"></span>[building]</span> workflows pending approval
      </p>
      <p className="cs-lede">
        The desk&apos;s queue and knowledge base needed continuous eyes on them. I built automations
        in my off hours that my team runs on, with one rule: they may never report a clean queue
        they did not actually verify.
      </p>
      <div className="cs-grid">
        <div className="cs-cell">
          <div className="cs-label">THE ARCHITECTURE</div>
          <p>
            Around <strong>10 n8n workflows</strong> sit on manual trigger and talk to the ticketing
            API. Each one validates auth up front and refuses to emit a false &ldquo;zero open
            tickets&rdquo; report when auth fails.
          </p>
          <p>
            Results feed <strong>2 native platform pages</strong>, live queue status and KB health,
            refreshed hourly and viewable by every licensed user. Each page links a live Grafana
            board, and <strong>two leadership stakeholders</strong> hold read-only viewer accounts
            over the <strong>4 Grafana dashboards</strong>.
          </p>
        </div>
        <div className="cs-cell">
          <div className="cs-label">THE DASHBOARDS</div>
          <ul>
            <li><strong>Leadership queue split</strong>, plus assignee workload, aging backlog, and SLA watchlist with 10-day and 20-day thresholds</li>
            <li><strong>Personal execution view</strong> for day-to-day triage</li>
            <li><strong>KB operations view</strong> tracking knowledge base health</li>
            <li><strong>Queue trends time series</strong> for the longer arc</li>
          </ul>
        </div>
        <div className="cs-cell">
          <div className="cs-label">VALIDATION NOTES</div>
          <p>
            The auth-failure guard is the design, not a fallback: a workflow that cannot prove it
            reached the ticketing API will not say the queue is empty. Manual triggers keep a human
            in the loop, and the dashboards read live data, so what leadership sees is what the
            API returned.
          </p>
        </div>
        <div className="cs-cell">
          <div className="cs-label">HONEST STATUS</div>
          <p>
            <strong>Dashboards: live.</strong> The native pages and Grafana boards are deployed,
            and both directors have seen the work and want more of it. My direct supervisor sees
            me in a dev/systems engineer role because of it.
          </p>
          <p>
            <strong>Workflows: staged.</strong> They are waiting on leadership approval and
            platform activation. The AI Metrics variant is excluded from that batch and stays in
            manual internal testing only.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function RowBody({ row }) {
  if (row.body.type === 'declog') {
    return (
      <div className="dec-log">
        {row.body.blocks.map((b) => (
          <div className="dec-block" key={b.label}>
            <div className="dec-label">{b.label}</div>
            <p>{b.text}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <ul className="details">
      {row.body.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function LogRow({ row, open, onToggle, delay }) {
  return (
    <Reveal as="article" className={`logrow${open ? ' open' : ''}`} delay={delay} data-status={row.status}>
      <button className="row-head" aria-expanded={open ? 'true' : 'false'} onClick={onToggle}>
        <span className={`tag ${row.status}`}>
          <span className="dot"></span>[{row.status}]
        </span>
        <span>
          <h3>{row.title}</h3>
          <span className="outcome">{row.outcome}</span>
        </span>
        <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
      <div className="row-body">
        <div className="row-body-inner">
          <div className="row-body-pad">
            <RowBody row={row} />
            <div className="pills">
              {row.pills.map((p) => (
                <span className="pill" key={p}>{p}</span>
              ))}
            </div>
            <div className="rowlinks">
              <a href="#">write-up <span className="arr">↗</span></a>
              <a href="#">github <span className="arr">↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

const FILTERS = [
  { id: 'all', label: 'all' },
  { id: 'running', label: 'running' },
  { id: 'building', label: 'building' },
];

export default function Systems() {
  const [filter, setFilter] = useState('all');
  const [openIdx, setOpenIdx] = useState(null);

  const visible = SYSTEMS.map((row, i) => ({ row, i })).filter(
    ({ row }) => filter === 'all' || row.status === filter,
  );

  const pickFilter = (id) => {
    setFilter(id);
    setOpenIdx(null);
  };

  return (
    <section id="systems">
      <div className="ghost" aria-hidden="true">01</div>
      <SecHead num="01" name="Systems" />
      <Reveal className="filters" role="group" aria-label="Filter systems by status">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`filter${filter === f.id ? ' active' : ''}`}
            data-f={f.id}
            onClick={() => pickFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </Reveal>
      <div id="logrows">
        {visible.map(({ row, i }) => (
          <LogRow
            key={row.title}
            row={row}
            delay={REDUCED ? undefined : (i % 3) * 90}
            open={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
      {filter === 'all' && <CaseStudy />}
    </section>
  );
}
