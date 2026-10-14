import { useEffect, useState } from "react";
import { PlayButton } from "./PlayButton";

// Como na página de artista: depois que o topo some, a barra fica sólida e mostra o nome com o play.
export function TopBar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const update = () => setSolid(window.scrollY > 300);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`sp-topbar ${solid ? "is-solid" : ""}`}>
      <div className="sp-topbar-title" aria-hidden={!solid}>
        <PlayButton className="sp-play-small" />
        <span>Kalyston Miranda</span>
      </div>
      <a className="sp-pill" href="./index.html">Escolher portfólio</a>
    </header>
  );
}
