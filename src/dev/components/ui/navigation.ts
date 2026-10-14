export const navItems = [
  { label: "Início", href: "#hero" },
  { label: "Projetos", href: "#projects" },
  { label: "Carreira", href: "#career" },
  { label: "Stack", href: "#skills" },
  { label: "Sobre", href: "#about" },
  { label: "Contato", href: "#contact" },
];

/** Depois do salto da âncora, o foco vai para a seção escolhida (leitores de tela e teclado continuam dali). */
export function focusSection(href: string) {
  requestAnimationFrame(() => {
    const destination = document.querySelector<HTMLElement>(href);
    if (destination) {
      destination.tabIndex = -1;
      destination.focus({ preventScroll: true });
    }
  });
}
