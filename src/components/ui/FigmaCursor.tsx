// Cursor colaborativo no estilo Figma, com a etiqueta do nome. É só decoração (aria-hidden).
export function FigmaCursor({ className = "", label = "Kalyston" }: { className?: string; label?: string }) {
  return (
    <span className={`dz-cursor ${className}`} aria-hidden="true">
      <svg viewBox="0 0 16 16" width="18" height="18"><path d="M1 1l5 13 2-5 5-2z" /></svg>
      <span>{label}</span>
      <i className="dz-click" />
    </span>
  );
}
