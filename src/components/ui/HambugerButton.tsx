interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function HambugerButton({
  isOpen,
  onClick,
  className,
}: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col justify-center items-center gap-[4px] w-8 h-8 group ${className}`}
    >
      <span
        className={`block h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
          isOpen ? "rotate-45 translate-y-[6px]" : ""
        }`}
      />

      <span
        className={`block h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />

      <span
        className={`block h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-[6px]" : ""
        }`}
      />
    </button>
  );
}
