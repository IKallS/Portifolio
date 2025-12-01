import ClickSpark from "./components/effects/ClickSpark";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Header } from "./components/ui/Header";

function App() {
  return (
    <ClickSpark
      sparkColor="#995BEF"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Hero />
      <Header />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </ClickSpark>
  );
}

export default App;
