import { StrictMode, useEffect, useRef, type CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import "./chooser.css";

// Tela de escolha dividida: cada metade antecipa o visual do portfólio que abre.
// Dev = player de música escuro (verde, disco, equalizador); Design = editorial claro (grade, roxo, telas, Figma).

const tracks = [
  { title: "Lá Vamos Nós", meta: "App · Android em testes", logo: "./dev/logos/la-vamos-nos.png" },
  { title: "TMW Connect", meta: "App · App Store", logo: "./dev/logos/tmw-connect.jpg" },
  { title: "TMWPIX", meta: "Streaming · celular e TV", logo: "./dev/logos/tmwpix.png" },
];

// Painel de camadas do Figma: um frame por case, no mesmo ritmo das faixas do lado Dev.
const layers = [
  { title: "TMW Connect", meta: "Frame · Mobile", thumb: "./dev/shots/tmw-connect-inicio.jpg" },
  { title: "Lá Vamos Nós", meta: "Frame · Mobile", thumb: "./dev/shots/la-vamos-nos-explorar.jpg" },
  { title: "TMWPIX", meta: "Frame · Celular e TV", thumb: "./dev/shots/tmwpix-tv-guia.jpg" },
];

const screens = ["./dev/shots/tmw-connect-inicio.jpg", "./dev/shots/la-vamos-nos-explorar.jpg", "./dev/shots/tmwpix-guia.jpg"];

export function Chooser() {
  const root = useRef<HTMLDivElement>(null);

  // O mouse desloca de leve as decorações de cada metade (--mx e --my entre -0,5 e 0,5).
  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty("--mx", (event.clientX / window.innerWidth - 0.5).toFixed(3));
        element.style.setProperty("--my", (event.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); };
  }, []);

  return (
    <div ref={root} className="chooser">
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <header className="chooser-head">
        <span className="chooser-mark">KM<span>.</span></span>
        <span className="chooser-name">Kalyston Miranda</span>
      </header>

      <main id="main" className="chooser-main">
        <div className="chooser-title">
          <p className="chooser-eyebrow">Dois caminhos, um portfólio</p>
          <h1 className="chooser-versus" aria-label="Code or Frame?"><span className="versus-side">Code <span className="chooser-versus-or">o</span></span><span className="versus-side"><span className="chooser-versus-or">r</span> Frame?</span></h1>
        </div>

        <div className="chooser-split">
          <a className="choice choice-dev" href="./dev.html">
            <span className="dev-glow" aria-hidden="true" />
            <span className="dev-vinyl" aria-hidden="true"><span /></span>
            <span className="choice-body">
              <span className="choice-index">01 / Desenvolvimento</span>
              <strong>Kalyston Dev</strong>
              <span className="choice-text">Apps, APIs e sistemas — com trilha sonora.</span>
              <span className="dev-tracks" aria-hidden="true">
                {tracks.map((track, index) => (
                  <span key={track.title} className="dev-track" style={{ "--i": index } as CSSProperties}>
                    <span className="dev-eq"><i /><i /><i /></span>
                    <img src={track.logo} alt="" width={40} height={40} />
                    <span><b>{track.title}</b><small>{track.meta}</small></span>
                  </span>
                ))}
              </span>
              <span className="choice-action dev-action"><span className="dev-play" aria-hidden="true">▶</span> Explorar Dev</span>
            </span>
          </a>

          <span className="chooser-or" aria-hidden="true">ou</span>

          <a className="choice choice-design" href="./design.html">
            <span className="design-grid" aria-hidden="true" />
            <span className="design-screens" aria-hidden="true">
              {screens.map((src, index) => (
                <img key={src} src={src} alt="" width={320} height={680} style={{ "--i": index } as CSSProperties} />
              ))}
            </span>
            <span className="choice-body">
              <span className="choice-index">02 / Experiência</span>
              <strong className="design-selected">
                Kalyston Design
                <span className="design-frame" aria-hidden="true"><i /><i /><i /><i /></span>
              </strong>
              <span className="choice-text">Interfaces, decisões de UX e cases do celular à TV.</span>
              <span className="design-layers" aria-hidden="true">
                {layers.map((layer, index) => (
                  <span key={layer.title} className="design-layer" style={{ "--i": index } as CSSProperties}>
                    <svg className="design-frame-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M5 1v14M11 1v14M1 5h14M1 11h14" /></svg>
                    <img src={layer.thumb} alt="" width={40} height={40} />
                    <span><b>{layer.title}</b><small>{layer.meta}</small></span>
                  </span>
                ))}
              </span>
              <span className="choice-action design-action">Explorar Design <span aria-hidden="true">↗</span></span>
            </span>
            <span className="design-cursor" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="18" height="18"><path d="M1 1l5 13 2-5 5-2z" /></svg>
              <span>Kalyston</span>
            </span>
          </a>
        </div>
      </main>

      <footer className="chooser-foot">© {new Date().getFullYear()} Kalyston Miranda</footer>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><Chooser /></StrictMode>);
