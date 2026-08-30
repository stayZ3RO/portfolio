function ProjectCard({ project }) {
  const { statusTone, status, title, summary, links } = project;
  const link = links[0];

  return (
    <li className="work-item reveal">
      <div className="work-item-main">
        <span className={`status-kicker ${statusTone}`}>{status}</span>
        <h3 className="work-title">
          {link ? (
            <a href={link.href} target="_blank" rel="noreferrer">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="work-desc">{summary}</p>
      </div>
      <span className="work-link">
        {link ? (
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ) : (
          'Private project'
        )}
      </span>
    </li>
  );
}

export default ProjectCard;
