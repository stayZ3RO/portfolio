import { projects } from '../data/projects.js';

function ProjectProof() {
  const withProof = projects.filter((project) => project.visuals);

  if (withProof.length === 0) return null;

  return (
    <div className="proof-band" aria-label="Project diagrams and screenshots">
      {withProof.map((project) => {
        const { visuals: proof } = project;
        const repo = project.links[0];

        return (
          <section className="proof-project reveal" key={project.title}>
            <p className="eyebrow proof-eyebrow">/ {project.title}</p>
            <figure className="proof-figure">
              <img
                className="proof-figure-image"
                src={proof.figure.src}
                alt={proof.figure.alt}
                loading="lazy"
              />
              <figcaption className="proof-caption">
                {proof.figure.caption}
                {repo ? (
                  <>
                    {' '}
                    <a href={repo.href} target="_blank" rel="noreferrer">
                      {repo.label} ↗
                    </a>
                  </>
                ) : null}
              </figcaption>
            </figure>

            {proof.images.map((image) => (
              <figure className="proof-subfigure" key={image.src}>
                <img
                  className="proof-subfigure-image"
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
                <figcaption className="proof-caption">{image.caption}</figcaption>
              </figure>
            ))}
          </section>
        );
      })}
    </div>
  );
}

export default ProjectProof;
