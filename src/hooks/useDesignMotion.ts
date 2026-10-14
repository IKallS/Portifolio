import { useEffect } from "react";

// Movimento da página inicial do portfólio Design (canvas no estilo Figma).
// - Rolagem e mouse passam por inércia; no <html> ficam --sy (rolagem suavizada), e no #inicio --mx/--my.
// - Cada [data-parallax] recebe --p: posição do centro em relação ao centro da tela (-1 acima, 0 meio, 1 abaixo).
// - [data-reveal] ganha .is-in ao entrar na tela e perde ao sair; .from-above indica que saiu (ou volta) por cima.
// - Com movimento reduzido nada roda: tudo fica parado e visível.

const SCROLL_EASE = 0.14;
const POINTER_EASE = 0.07;

function documentTop(element: HTMLElement) {
  let top = 0;
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
  return top;
}

export function useDesignMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop = () => {};

    const start = () => {
      stop();
      const hero = document.querySelector<HTMLElement>("#inicio");
      const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

      if (media.matches) {
        root.classList.remove("dz-motion");
        reveals.forEach((element) => element.classList.add("is-in"));
        stop = () => {};
        return;
      }
      root.classList.add("dz-motion");

      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
          else {
            entry.target.classList.remove("is-in");
            entry.target.classList.toggle("from-above", entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0));
          }
        }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      reveals.forEach((element) => observer.observe(element));

      let viewport = window.innerHeight;
      let centers: number[] = [];
      const measure = () => {
        viewport = window.innerHeight;
        centers = layers.map((layer) => documentTop(layer) + layer.offsetHeight / 2);
      };

      let scroll = window.scrollY;
      let mx = 0;
      let my = 0;
      let targetX = 0;
      let targetY = 0;
      let frame = 0;
      let last = 0;

      const write = () => {
        root.style.setProperty("--sy", scroll.toFixed(2));
        // A grade do canvas anda a 30% da rolagem; o resto da divisão por 40 px evita mover uma camada enorme.
        root.style.setProperty("--grid-shift", `${(-(scroll * 0.3) % 40).toFixed(2)}px`);
        hero?.style.setProperty("--mx", mx.toFixed(4));
        hero?.style.setProperty("--my", my.toFixed(4));
        layers.forEach((layer, index) => {
          const p = (centers[index] - scroll - viewport / 2) / viewport;
          if (p > -2.5 && p < 2.5) layer.style.setProperty("--p", p.toFixed(4));
        });
      };

      const tick = (now: number) => {
        const steps = last ? Math.min((now - last) / (1000 / 60), 4) : 1;
        last = now;
        const target = window.scrollY;
        scroll += (target - scroll) * (1 - Math.pow(1 - SCROLL_EASE, steps));
        mx += (targetX - mx) * (1 - Math.pow(1 - POINTER_EASE, steps));
        my += (targetY - my) * (1 - Math.pow(1 - POINTER_EASE, steps));
        if (Math.abs(target - scroll) < 0.1) scroll = target;
        write();
        const settled = scroll === target && Math.abs(targetX - mx) < 0.0005 && Math.abs(targetY - my) < 0.0005;
        frame = settled ? 0 : requestAnimationFrame(tick);
        if (settled) last = 0;
      };
      const wake = () => { if (!frame) frame = requestAnimationFrame(tick); };
      const pointer = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !hero) return;
        const rect = hero.getBoundingClientRect();
        targetX = (event.clientX - rect.left) / rect.width - 0.5;
        targetY = (event.clientY - rect.top) / rect.height - 0.5;
        wake();
      };
      const leave = () => { targetX = 0; targetY = 0; wake(); };
      const resize = () => { measure(); wake(); };
      const resizeObserver = new ResizeObserver(resize);
      const main = document.querySelector("#main");
      if (main) resizeObserver.observe(main);

      measure();
      write();
      window.addEventListener("scroll", wake, { passive: true });
      window.addEventListener("resize", resize);
      hero?.addEventListener("pointermove", pointer);
      hero?.addEventListener("pointerleave", leave);

      stop = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("scroll", wake);
        window.removeEventListener("resize", resize);
        hero?.removeEventListener("pointermove", pointer);
        hero?.removeEventListener("pointerleave", leave);
        root.classList.remove("dz-motion");
        root.style.removeProperty("--sy");
        root.style.removeProperty("--grid-shift");
        ["--mx", "--my"].forEach((name) => hero?.style.removeProperty(name));
        layers.forEach((layer) => layer.style.removeProperty("--p"));
        reveals.forEach((element) => element.classList.remove("from-above"));
      };
    };

    start();
    media.addEventListener("change", start);
    return () => { media.removeEventListener("change", start); stop(); };
  }, []);
}
