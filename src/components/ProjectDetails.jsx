import { projects } from '../data/projects.js';
import Reveal from './Reveal.jsx';

const toneClass = {
  mature: 'k-mature',
  active: 'k-active',
  'learning-lab': 'k-learning',
  'in-progress': 'k-prog',
  private: 'k-prog',
};

function ProjectDetails() {
  return (
    <section className="section detail-section" aria-label="Project details">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <p className="eyebrow">/ the detail</p>
            <h2>How each project was built and validated.</h2>
          </div>
        </Reveal>

        <div className="detail-list">
          {projects.map((project, idx) => (
            <Reveal key={project.title} delay={Math.min(idx, 4) * 60}>
              <article className="detail">
                <div className="detail-head">
                  <span className={`kicker ${toneClass[project.statusTone] || 'k-prog'}`}>
                    {project.status}
                  </span>
                  <h3>{project.title}</h3>
                  <span className="sub">{project.subtitle}</span>
                </div>

                <dl className="detail-grid">
                  {project.details.map((item) => (
                    <div className="detail-row" key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.text}</dd>
                    </div>
                  ))}
                </dl>

                {project.links[0] ? (
                  <a
                    className="detail-link"
                    href={project.links[0].href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.links[0].label} ↗
                  </a>
                ) : (
                  <span className="detail-link muted">Private project</span>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;
