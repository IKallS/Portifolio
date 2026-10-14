import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

// Motor único de movimento da página Dev.
// - A rolagem e o mouse passam por uma inércia (interpolação por quadro), então as camadas deslizam
//   atrás da rolagem em vez de pular junto com ela.
// - As posições são medidas uma vez (e de novo quando o layout muda), não a cada quadro.
// - Variáveis escritas: no #hero --sy, --mx e --my; na barra do topo --bar; em cada [data-parallax] --p
//   (-1 acima, 0 no centro da tela, 1 abaixo). [data-lyric] acende ao passar de 60% da tela e
//   [data-reveal] ganha .is-in ao entrar na tela e perde ao sair (nos dois sentidos).
// - Com movimento reduzido nada disso roda: tudo fica parado e visível.

const SCROLL_EASE = 0.14;
const POINTER_EASE = 0.07;

function documentTop(element: HTMLElement) {
  let top = 0;
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
  return top;
}

export function useParallax() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>("#hero");
    const bar = document.querySelector<HTMLElement>(".sp-topbar");
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const lyrics = Array.from(document.querySelectorAll<HTMLElement>("[data-lyric]"));
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reducedMotion) {
      root.classList.remove("sp-motion");
      lyrics.forEach((line) => line.classList.add("is-sung"));
      reveals.forEach((element) => element.classList.add("is-in"));
      return;
    }
    root.classList.add("sp-motion");

    // Revelação reversível: entra ao aparecer e recolhe ao sair; .from-above marca que saiu (ou volta) por cima.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const above = entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
        if (entry.isIntersecting) entry.target.classList.add("is-in");
        else {
          entry.target.classList.remove("is-in");
          entry.target.classList.toggle("from-above", above);
        }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.06 });
    reveals.forEach((element) => observer.observe(element));

    let viewport = window.innerHeight;
    let heroHeight = 0;
    let layerCenters: number[] = [];
    let lyricTops: number[] = [];
    const measure = () => {
      viewport = window.innerHeight;
      heroHeight = hero?.offsetHeight ?? 0;
      layerCenters = layers.map((layer) => documentTop(layer) + layer.offsetHeight / 2);
      lyricTops = lyrics.map((line) => documentTop(line));
    };

    let scroll = window.scrollY;
    let mx = 0;
    let my = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let last = 0;

    const write = () => {
      if (hero) {
        hero.style.setProperty("--sy", Math.min(scroll, heroHeight * 1.5).toFixed(2));
        hero.style.setProperty("--mx", mx.toFixed(4));
        hero.style.setProperty("--my", my.toFixed(4));
      }
      bar?.style.setProperty("--bar", Math.min(Math.max((scroll - 200) / 160, 0), 1).toFixed(3));
      layers.forEach((layer, index) => {
        const p = (layerCenters[index] - scroll - viewport / 2) / viewport;
        if (p > -2.5 && p < 2.5) layer.style.setProperty("--p", p.toFixed(4));
      });
      lyrics.forEach((line, index) => line.classList.toggle("is-sung", lyricTops[index] - scroll < viewport * 0.6));
    };

    const tick = (now: number) => {
      // Inércia independente da taxa de quadros (60 Hz, 120 Hz...).
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
      if (event.clientY > rect.bottom) return;
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
      wake();
    };
    const leave = () => { targetX = 0; targetY = 0; wake(); };
    const resize = () => { measure(); wake(); };

    // Abrir um projeto ou carregar uma imagem muda o layout: mede de novo.
    const content = document.querySelector("#dev-main");
    const resizeObserver = new ResizeObserver(resize);
    if (content) resizeObserver.observe(content);

    measure();
    write();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", resize);
    hero?.addEventListener("pointermove", pointer);
    hero?.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", resize);
      hero?.removeEventListener("pointermove", pointer);
      hero?.removeEventListener("pointerleave", leave);
      root.classList.remove("sp-motion");
      reveals.forEach((element) => element.classList.remove("from-above"));
      ["--sy", "--mx", "--my"].forEach((name) => hero?.style.removeProperty(name));
      bar?.style.removeProperty("--bar");
      layers.forEach((layer) => layer.style.removeProperty("--p"));
    };
  }, [reducedMotion]);
}
