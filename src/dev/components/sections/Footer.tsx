import { useEffect, useRef } from "react";
import { player } from "../../audio/spotify";

export function Footer() {
  const frame = useRef<HTMLDivElement>(null);

  // O player oficial do Spotify fica aqui, compacto; o player de baixo e o play do topo o controlam.
  useEffect(() => {
    if (frame.current) player.mount(frame.current);
  }, []);

  return (
    <footer className="sp-footer">
      <div ref={frame} className="sp-footer-track" />
      <div className="sp-footer-links">
        <div>
          <p>Portfólios</p>
          <a href="./design.html">Kalyston Design</a>
          <a href="./index.html">Escolher outro portfólio</a>
        </div>
        <div>
          <p>Contato</p>
          <a href="mailto:mirandakalyston@gmail.com">E-mail</a>
          <a href="https://www.linkedin.com/in/kalystonmiranda/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/IKallS" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <p className="sp-footer-note">© {new Date().getFullYear()} Kalyston Miranda · Trilha: “Tadow”, de Masego & FKJ, tocada pelo player oficial do Spotify (sem login, toca a prévia). Visual inspirado em players de música; sem vínculo com nenhum serviço de streaming.</p>
    </footer>
  );
}
