// Faixa de texto gigante que desliza de lado com a rolagem.
export function Marquee({ text }: { text: string }) {
  return (
    <div className="sp-marquee" data-parallax aria-hidden="true">
      <p>{Array.from({ length: 4 }, () => text).join(" · ")}</p>
    </div>
  );
}
