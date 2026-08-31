import { useEffect, useRef } from 'react';
import { projects } from '../data/projects.js';
import ProjectCard from './ProjectCard.jsx';
import ProjectProof from './ProjectProof.jsx';

function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealables = section.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      revealables.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealables.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section work-section"
      id="projects"
      aria-labelledby="projects-title"
      ref={sectionRef}
    >
      <div className="section-heading reveal">
        <p className="eyebrow">/ work</p>
        <h2 id="projects-title">
          Projects that show how I build, troubleshoot, and document infrastructure.
        </h2>
      </div>

      <ol className="work-list">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </ol>

      <ProjectProof />
    </section>
  );
}

export default Projects;
