import { CaseStudy } from "../components/sections/CaseStudy";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/sections/Footer";
import { Header, type NavItem } from "../components/ui/Header";
import type { CaseData } from "../data/cases/types";

const caseNavItems: NavItem[] = [
  { label: "Projetos", href: "./design.html#projetos" },
  { label: "Sobre", href: "./design.html#sobre" },
  { label: "Atuação", href: "./design.html#atuacao" },
  { label: "Contato", href: "#contato" },
];

export function CasePage({ data }: { data: CaseData }) {
  return (
    <>
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <Header navItems={caseNavItems} brandHref="./design.html" />
      <main id="main">
        <nav className="case-breadcrumb section-shell" aria-label="Caminho">
          <a className="text-link" href="./design.html#projetos"><span aria-hidden="true">←</span> Voltar aos projetos</a>
        </nav>
        <CaseStudy data={data} />
        <nav className="case-next section-shell" aria-label="Continuar navegando">
          <a className="button button-primary" href="./design.html#projetos"><span aria-hidden="true">←</span> Voltar aos projetos</a>
          <a className="button button-secondary" href="./index.html">Escolher entre Dev e Design</a>
        </nav>
        <Contact />
      </main>
      <Footer topHref="#main" />
    </>
  );
}
