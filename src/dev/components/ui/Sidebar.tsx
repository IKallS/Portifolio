import { useState } from "react";
import { BriefcaseBusiness, Disc3, House, Layers, Library, Mail, User } from "lucide-react";
import { devProjects, type DevProject } from "../../data/projects";
import { Logo } from "./Logo";
import { focusSection, navItems } from "./navigation";

const icons = [House, Disc3, BriefcaseBusiness, Layers, User, Mail];
const filters: (DevProject["kind"] | "Tudo")[] = ["Tudo", "Apps", "Web", "IA"];

export function Sidebar() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Tudo");
  const shown = devProjects.filter((project) => filter === "Tudo" || project.kind === filter);

  return (
    <aside className="sp-sidebar">
      <div className="sp-panel">
        <a className="sp-brand" href="#hero" aria-label="Kalyston Dev, voltar ao início">
          <span className="sp-brand-mark" aria-hidden="true">K</span> Kalyston Dev
        </a>
        <nav aria-label="Navegação Dev">
          <ul className="sp-nav">
            {navItems.map((item, index) => {
              const Icon = icons[index];
              return <li key={item.href}><a href={item.href} onClick={() => focusSection(item.href)}><Icon aria-hidden="true" /> {item.label}</a></li>;
            })}
          </ul>
        </nav>
      </div>
      <div className="sp-panel sp-library">
        <p className="sp-library-title"><Library aria-hidden="true" /> Sua biblioteca</p>
        <div className="sp-filters" role="group" aria-label="Filtrar biblioteca">
          {filters.map((item) => (
            <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
        <ul aria-label="Biblioteca de projetos">
          {shown.map((project) => (
            <li key={project.slug}>
              <a href={`#projeto-${project.slug}`}>
                <Logo project={project} />
                <span><strong>{project.title}</strong><small>{project.kind === "Apps" ? "App" : project.kind === "IA" ? "Automação" : "Sistema web"} · {project.status}</small></span>
              </a>
            </li>
          ))}
          {filter === "Tudo" && (
            <li>
              <a href="./design.html">
                <span className="sp-logo sp-logo-design" aria-hidden="true">UX</span>
                <span><strong>Kalyston Design</strong><small>Portfólio · UX/UI</small></span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}
