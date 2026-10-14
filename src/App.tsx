import { useEffect } from "react";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Header } from "./components/ui/Header";
import { useDesignMotion } from "./hooks/useDesignMotion";

function App() {
  useDesignMotion();

  // Links vindos das páginas de case (ex.: design.html#projetos) chegam antes de as seções existirem.
  useEffect(() => {
    if (!window.location.hash) return;
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    target?.scrollIntoView({ behavior: "auto" });
  }, []);

  return (
    <div className="dz-page">
      <span className="dz-canvas" aria-hidden="true" />
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact withCursor />
      </main>
      <Footer />
    </div>
  );
}

export default App;
