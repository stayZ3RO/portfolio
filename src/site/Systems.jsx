import { Fragment, useState } from 'react';
import Diagram from './Diagram';
import Reveal from './Reveal';
import SecHead from './SecHead';
import { SYSTEMS } from './data';
import { REDUCED } from './env';
import './case-study.css';

function CaseStudy() {
  return (
    <article className="case-study" aria-labelledby="cs-title">
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
    </article>
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

function Panel({ row, i, open }) {
  return (
    <div className="wpanel" id={`work-${i}`} hidden={!open}>
      <RowBody row={row} />
      <div className="pills">
        {row.pills.map((p) => (
          <span className="pill" key={p}>{p}</span>
        ))}
      </div>
      {row.links && (row.links.writeup || row.links.github) && (
        <div className="rowlinks">
          {row.links.writeup && <a href={row.links.writeup}>write-up <span className="arr">↗</span></a>}
          {row.links.github && <a href={row.links.github}>github <span className="arr">↗</span></a>}
        </div>
      )}
      {i === 0 && <CaseStudy />}
    </div>
  );
}

function Card({ row, i, open, onToggle, delay }) {
  return (
    <Reveal as="article" className={`wcard${row.diagram ? ' has-fig' : ''}${open ? ' open' : ''}`} delay={delay} data-status={row.status}>
      {row.diagram && (
        <div className="wcard-fig"><Diagram kind={row.diagram} /></div>
      )}
      <p className={`tag ${row.status}`}><span className="dot"></span>{row.status}</p>
      <h3>{row.title}</h3>
      <p className="outcome">{row.outcome}</p>
      <button className="wcard-more" aria-expanded={open ? 'true' : 'false'} aria-controls={`work-${i}`} onClick={onToggle}>
        {open ? 'close' : 'details'} <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
    </Reveal>
  );
}

/* Work: the three featured projects as cards with a diagram, the rest as
   smaller cards. Details open in a full-width panel under the card's row;
   the grid packs densely, so the panel sits after its card in reading
   order and the row above stays intact on wide screens. */
export default function Systems() {
  const [openIdx, setOpenIdx] = useState(null);

  const group = (rows, cls) => (
    <div className={`wgrid ${cls}`}>
      {rows.map(({ row, i }) => (
        <Fragment key={row.title}>
          <Card
            row={row}
            i={i}
            delay={REDUCED ? undefined : (i % 3) * 90}
            open={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
          <Panel row={row} i={i} open={openIdx === i} />
        </Fragment>
      ))}
    </div>
  );

  const all = SYSTEMS.map((row, i) => ({ row, i }));
  return (
    <section id="work">
      <SecHead name="Work" />
      {group(all.filter(({ row }) => row.diagram), 'feat')}
      {group(all.filter(({ row }) => !row.diagram), 'rest')}
    </section>
  );
}
