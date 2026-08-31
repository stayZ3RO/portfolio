import { useEffect } from 'react';
import { projects } from '../data/projects.js';
import Reveal from './Reveal.jsx';

const toneClass = {
  mature: 'k-mature',
  active: 'k-active',
  'learning-lab': 'k-learning',
  'in-progress': 'k-prog',
  private: 'k-prog',
};

function WorkSection() {
  useEffect(() => {
    const wrap = document.getElementById('hwrap');
    const track = document.getElementById('htrack');
    if (!wrap || !track) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      const move = Math.max(0, track.scrollWidth - window.innerWidth);
      // total scroll distance = horizontal overflow + one viewport of settle
      const desired = move + window.innerHeight;
      wrap.style.height = `${Math.max(desired, window.innerHeight)}px`;

      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      track.style.transform = `translateX(${-p * move}px)`;
    };

    if (reduce) {
      update();
      return;
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <section className="section" id="work" aria-label="Projects">
        <Reveal>
          <div className="sec-head">
            <p className="eyebrow">/ work</p>
            <h2>Projects that show how I build, troubleshoot, and document.</h2>
          </div>
        </Reveal>
      </section>

      <div id="hwrap">
        <div id="hstage">
          <div id="htrack">
            {projects.map((project) => {
              const repo = project.links[0];
              const figure = project.visuals?.figure;
              const first = figure
                ? figure.src
                : null;
              const imageCount = project.visuals ? project.visuals.images.length + 1 : 0;

              return (
                <a
                  className="panel"
                  key={project.title}
                  href={repo ? repo.href : undefined}
                  target={repo ? '_blank' : undefined}
                  rel={repo ? 'noreferrer' : undefined}
                >
                  <div className="ph">
                    <span className={`kicker ${toneClass[project.statusTone] || 'k-prog'}`}>
                      {project.status}
                    </span>
                    <h3>{project.title}</h3>
                    <span className="sub">{project.subtitle}</span>
                  </div>

                  <div className="media">
                    {first ? (
                      <img src={first} alt={figure.alt} loading="lazy" />
                    ) : (
                      <div className="code-media" aria-hidden="true">
                        {project.codeMedia.map((line, i) => (
                          <span className="code-line" key={i}>
                            {line.prompt ? <span className="code-p">$ </span> : null}
                            <span className={line.prompt ? 'code-cmd' : 'code-out'}>{line.text}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pf">
                    <p>{project.summary}</p>
                    <div className="row">
                      <span className="repo">{repo ? 'github ↗' : 'private'}</span>
                      <span className="stack">
                        {(project.tools || []).slice(0, 6).map((tool) => (
                          <span key={tool}>{tool}</span>
                        ))}
                        {imageCount > 1 ? <span>+{imageCount} images</span> : null}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkSection;
