import { useState } from 'react';
import Reveal from './Reveal';
import SecHead from './SecHead';
import { SYSTEMS } from './data';
import { REDUCED } from './env';

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
    </section>
  );
}
