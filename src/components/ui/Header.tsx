import { useEffect, useRef, useState } from "react";
import { HambugerButton } from "./HambugerButton";

export interface NavItem {
  label: string;
  href: string;
}

const homeNavItems: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Contato", href: "#contato" },
];

interface HeaderProps {
  navItems?: NavItem[];
  brandHref?: string;
}

export function Header({ navItems = homeNavItems, brandHref = "#inicio" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMobileMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMobileMenuOpen]);

  const selectMobileLink = (href: string) => {
    setIsMobileMenuOpen(false);
    if (!href.startsWith("#")) return;
    requestAnimationFrame(() => {
      const destination = document.querySelector<HTMLElement>(href);
      if (destination) {
        destination.tabIndex = -1;
        destination.focus({ preventScroll: true });
      }
    });
  };

  return (
    <header className="site-header">
      <div className="header-inner section-shell">
        <a className="brand" href={brandHref} aria-label="Kalyston Miranda, voltar ao início do portfólio Design">KM<span>.</span></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <a className="portfolio-switch" href="./index.html">Escolher portfólio</a>
        <HambugerButton
          buttonRef={toggleRef}
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="mobile-toggle"
        />
      </div>
      {isMobileMenuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação móvel">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={() => selectMobileLink(item.href)}>{item.label}</a>
          ))}
          <a href="./index.html">Escolher portfólio</a>
        </nav>
      )}
    </header>
  );
}
