import type { CSSProperties } from "react";

// Versões leves das capturas (public/dev/shots), no tamanho em que aparecem.
// Duas fileiras de telas reais que correm em sentidos opostos conforme a página rola.
const phones = [
  "la-vamos-nos/explorar", "tmw-connect/inicio", "tmwpix/inicio", "tmw-connect/faturas",
  "tmwpix/canais", "la-vamos-nos/ranking", "tmw-connect/suporte", "tmwpix/guia", "la-vamos-nos/carteira", "tmw-connect/contratos", "tmwpix/buscar",
];
const wide = ["tmwpix/tv-guia", "dashboard-cartao-credito/inicio", "tmwpix/tv-canais", "dashboard-cartao-credito/lote", "dashboard-cartao-credito/individual", "dashboard-cartao-credito/futuros"];

export function Showcase() {
  return (
    <section className="sp-showcase" aria-labelledby="dev-showcase-title" data-parallax>
      <div className="sp-section sp-showcase-head" data-reveal>
        <h2 id="dev-showcase-title">Em cartaz</h2>
        <p className="sp-section-lead">Telas reais dos apps e sistemas: celular, TV e painel web.</p>
      </div>
      <div className="sp-strip" style={{ "--dir": -1 } as CSSProperties} aria-hidden="true">
        {phones.map((shot) => <img key={shot} src={`./dev/shots/${shot.replace("/", "-")}.jpg`} alt="" width={320} height={680} loading="lazy" decoding="async" />)}
      </div>
      <div className="sp-strip sp-strip-wide" style={{ "--dir": 1 } as CSSProperties} aria-hidden="true">
        {wide.map((shot) => <img key={shot} src={`./dev/shots/${shot.replace("/", "-")}.jpg`} alt="" width={800} height={460} loading="lazy" decoding="async" />)}
      </div>
    </section>
  );
}
