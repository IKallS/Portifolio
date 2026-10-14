export function Footer({ topHref = "#inicio" }: { topHref?: string }) {
  return (
    <footer className="site-footer section-shell">
      <span>© {new Date().getFullYear()} Kalyston Miranda · UX/UI e desenvolvimento</span>
      <a href={topHref}>Voltar ao início ↑</a>
    </footer>
  );
}
