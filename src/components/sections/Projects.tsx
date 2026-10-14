import type { CSSProperties } from "react";
import { publishedDesignProjects } from "../../data/designProjects";

export function Projects() {
  return (
    <section id="projetos" className="section-shell selected-work" aria-labelledby="work-title" data-reveal>
      <div className="section-heading">
        <p className="eyebrow">Projetos e cases</p>
        <h2 id="work-title">Produtos reais, explicados pelas decisões de experiência.</h2>
      </div>
      <ul className="project-list" role="list">
        {publishedDesignProjects.map((project, index) => (
          <li key={project.slug} className="dz-reveal-item" data-reveal style={{ "--i": index } as CSSProperties}>
            <article className="work-card" aria-labelledby={`project-${project.slug}`}>
              <div>
                <p className="work-type">{String(index + 1).padStart(2, "0")} · {project.category}</p>
                <h3 id={`project-${project.slug}`}>{project.title}</h3>
                <p>{project.summary}</p>
                <dl className="work-facts">
                  <div><dt>Problema</dt><dd>{project.problem}</dd></div>
                  <div><dt>Atuação</dt><dd>{project.role}</dd></div>
                </dl>
                <a className="text-link" href={project.href}>Abrir case {project.title} <span aria-hidden="true">↗</span></a>
              </div>
              <div className={project.imageOrientation === "landscape" ? "work-preview work-preview-wide" : "work-preview"} data-parallax>
                <span className="dz-frame-label" aria-hidden="true">{project.title} / {project.imageOrientation === "landscape" ? "Desktop" : "Mobile"}</span>
                <img src={project.image} alt={project.imageAlt} width={project.imageOrientation === "landscape" ? 1600 : 832} height={project.imageOrientation === "landscape" ? 1000 : 1800} loading="lazy" />
                <span>{project.imageCredit}</span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
