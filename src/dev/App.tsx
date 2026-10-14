import { About } from "./components/sections/About";
import { Career } from "./components/sections/Career";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { Hero } from "./components/sections/Hero";
import { Marquee } from "./components/sections/Marquee";
import { Projects } from "./components/sections/Projects";
import { Showcase } from "./components/sections/Showcase";
import { Skills } from "./components/sections/Skills";
import { MobileNav } from "./components/ui/MobileNav";
import { PlayerBar } from "./components/ui/PlayerBar";
import { Sidebar } from "./components/ui/Sidebar";
import { TopBar } from "./components/ui/TopBar";
import { useParallax } from "./useParallax";

function App() {
  useParallax();
  return (
    <div className="sp-app">
      <a className="sp-skip-link" href="#dev-main">Pular para o conteúdo</a>
      <Sidebar />
      <div className="sp-main">
        <TopBar />
        <main id="dev-main" tabIndex={-1}>
          <Hero />
          <Projects />
          <Showcase />
          <Career />
          <Marquee text="Apps · APIs · Sistemas · IA" />
          <About />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
      <PlayerBar />
      <MobileNav />
    </div>
  );
}

export default App;
