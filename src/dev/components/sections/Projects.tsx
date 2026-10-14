import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { devProjects } from "../../data/projects";
import { Logo } from "../ui/Logo";

export function Projects() {
  const [open, setOpen] = useState<string | null>(null);

  // Clicar num projeto da biblioteca (link #projeto-slug) já abre os detalhes dele.
  useEffect(() => {
    const openFromHash = () => {
      const slug = window.location.hash.replace("#projeto-", "");
      if (devProjects.some((project) => project.slug === slug)) setOpen(slug);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section id="projects" className="sp-section" aria-labelledby="dev-projects-title" data-reveal>
      <h2 id="dev-projects-title">Populares</h2>
      <p className="sp-section-lead">Projetos em produção e em teste. Toque em uma faixa para ver o que construí.</p>
      <ol className="sp-tracks">
        {devProjects.map((project, index) => {
          const isOpen = open === project.slug;
          return (
            <li key={project.slug} id={`projeto-${project.slug}`} className={`sp-track dev-project sp-stagger ${isOpen ? "is-open" : ""}`} style={{ "--i": index } as CSSProperties}>
              <div className="sp-track-row">
                <span className="sp-track-index">{index + 1}</span>
                <Logo project={project} />
                <div className="sp-track-title">
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={`detalhes-${project.slug}`} onClick={() => setOpen(isOpen ? null : project.slug)}>
                      {project.title}
                    </button>
                  </h3>
                  <p>{project.type}</p>
                </div>
                <span className="sp-track-status">{project.status}</span>
                <ChevronDown className="sp-track-chevron" aria-hidden="true" />
              </div>
              <div id={`detalhes-${project.slug}`} className={`sp-track-details ${project.cover ? "has-shot" : ""} ${project.wide ? "is-wide" : ""}`} hidden={!isOpen}>
                {project.cover && <img className="sp-track-shot" src={project.cover} alt={`Tela de ${project.title}`} loading="lazy" decoding="async" />}
                <div>
                  <p className="sp-track-summary">{project.summary}</p>
                  <div className="sp-track-body">
                    <div>
                      <p className="sp-label">O que construí</p>
                      <ul className="sp-built">{project.built.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                    <div>
                      <p className="sp-label">Stack</p>
                      <ul className="sp-chips" aria-label={`Stack de ${project.title}`}>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                      <div className="sp-track-links">
                        {project.links.map((link) => (
                          <a key={link.href} href={link.href} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                            {link.label} <ArrowUpRight aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
