import type { Ref } from "react";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  buttonRef?: Ref<HTMLButtonElement>;
}

export function HambugerButton({ isOpen, onClick, className = "", buttonRef }: HamburgerButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      aria-expanded={isOpen}
      aria-controls={isOpen ? "mobile-navigation" : undefined}
      onClick={onClick}
      className={className}
    >
      <span aria-hidden="true">{isOpen ? "✕" : "☰"}</span>
    </button>
  );
}
