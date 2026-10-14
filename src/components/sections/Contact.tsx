import { useEffect, useRef } from "react";
import { FigmaCursor } from "../ui/FigmaCursor";

// withCursor: só a página inicial do Design mostra o cursor indo até o botão de e-mail.
export function Contact({ withCursor = false }: { withCursor?: boolean }) {
  const section = useRef<HTMLElement>(null);

  // O cursor mira o centro do botão de e-mail (--mail-x/--mail-y, relativos à seção).
  useEffect(() => {
    const element = section.current;
    const button = element?.querySelector<HTMLElement>(".button-primary");
    if (!withCursor || !element || !button) return;
    // Medido pelas caixas na tela, descontando o deslocamento de entrada (translate) dos filhos.
    const place = () => {
      const box = element.getBoundingClientRect();
      const target = button.getBoundingClientRect();
      const shift = new DOMMatrix(getComputedStyle(button.closest(".actions")!).transform).m42 + (parseFloat(getComputedStyle(button.closest(".actions")!).translate.split(" ")[1] ?? "0") || 0);
      element.style.setProperty("--mail-x", `${target.left - box.left + target.width * 0.55}px`);
      element.style.setProperty("--mail-y", `${target.top - box.top - shift + target.height * 0.45}px`);
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(element);
    return () => observer.disconnect();
  }, [withCursor]);

  return (
    <section ref={section} id="contato" className="section-shell contact" aria-labelledby="contact-title" data-reveal>
      <p className="eyebrow">Contato</p>
      <h2 id="contact-title">Vamos conversar sobre experiência e produto?</h2>
      <p>Para falar sobre oportunidades em UX/UI ou sobre este case, escolha um canal direto.</p>
      <div className="actions">
        <a className="button button-primary" href="mailto:mirandakalyston@gmail.com">Enviar e-mail <span aria-hidden="true">↗</span></a>
        <a className="button button-secondary" href="https://www.linkedin.com/in/kalystonmiranda/" target="_blank" rel="noopener noreferrer">Abrir LinkedIn <span aria-hidden="true">↗</span></a>
      </div>
      <p className="contact-address">mirandakalyston@gmail.com</p>
      {withCursor && <FigmaCursor className="dz-cursor-contact" />}
    </section>
  );
}
