import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FigmaCursor } from "../ui/FigmaCursor";

// Telas dos apps como frames no canvas, cada uma numa profundidade (velocidade de parallax).
const frames = [
  { src: "./dev/shots/tmw-connect-inicio.jpg", label: "TMW Connect / Início", speed: 0.18, depth: 18 },
  { src: "./dev/shots/la-vamos-nos-explorar.jpg", label: "Lá Vamos Nós / Explorar", speed: 0.32, depth: 30 },
];

export function Hero() {
  const title = useRef<HTMLHeadingElement>(null);
  const [size, setSize] = useState("");

  // A etiqueta de medidas mostra o tamanho real do título, como o Figma mostra o do frame selecionado.
  useEffect(() => {
    const element = title.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setSize(`${Math.round(element.offsetWidth)} × ${Math.round(element.offsetHeight)}`));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="inicio" className="hero section-shell dz-hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Kalyston Miranda · Portfólio de UX/UI</p>
        <div className="dz-selection">
          <h1 id="hero-title" ref={title}>Experiências digitais, do fluxo à interface.</h1>
          <span className="dz-frame" aria-hidden="true"><i /><i /><i /><i /><b>{size}</b></span>
        </div>
        <p className="hero-lead">
          Atuo em UX/UI e também em desenvolvimento. Nos produtos apresentados aqui — apps, TV e painéis web —, trabalhei de ponta a ponta, principalmente na experiência e na interface.
        </p>
        <div className="actions">
          <a className="button button-primary" href="#projetos">Ver projetos <span aria-hidden="true">↗</span></a>
          <a className="button button-secondary" href="#contato">Entrar em contato</a>
        </div>
      </div>
      <div className="hero-aside" aria-label="Resumo do case em destaque">
        <span className="aside-index">01 / CASE EM DESTAQUE</span>
        <strong>TMW Connect</strong>
        <p>Autoatendimento mobile para clientes de internet: faturas, contratos e suporte.</p>
        <a href="./case-tmw-connect.html">Ler o case TMW Connect <span aria-hidden="true">↗</span></a>
      </div>
      <div className="dz-hero-frames" aria-hidden="true">
        {frames.map((frame, index) => (
          <figure key={frame.src} className="dz-device" style={{ "--speed": frame.speed, "--depth": frame.depth, "--i": index } as CSSProperties}>
            <figcaption>{frame.label}</figcaption>
            <img src={frame.src} alt="" width={320} height={680} decoding="async" />
          </figure>
        ))}
      </div>
      <FigmaCursor className="dz-cursor-hero" />
    </section>
  );
}
