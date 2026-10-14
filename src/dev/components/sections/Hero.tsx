import type { CSSProperties } from "react";
import { BadgeCheck, Github, Linkedin, Mail } from "lucide-react";
import { usePlaying } from "../../audio/usePlayer";
import { devProjects } from "../../data/projects";
import { PlayButton } from "../ui/PlayButton";

// Camadas do banner, da mais funda para a mais próxima: brilho, disco, celulares e logos.
// Cada uma anda numa velocidade ao rolar (--sy) e ao mexer o mouse (--mx, --my); os valores vêm do useParallax.
const phones = [
  { src: "./dev/shots/la-vamos-nos-explorar.jpg", speed: 0.55, depth: 18 },
  { src: "./dev/shots/tmw-connect-inicio.jpg", speed: 0.3, depth: 10 },
  { src: "./dev/shots/tmwpix-inicio.jpg", speed: 0.75, depth: 26 },
];
const bubbles = devProjects.slice(0, 5).map((project, index) => ({
  logo: project.logo,
  style: {
    "--x": ["50%", "57%", "90%", "73%", "47%"][index],
    "--y": ["18%", "80%", "74%", "6%", "60%"][index],
    "--speed": [1.1, 0.7, 1.4, 0.9, 1.6][index],
    "--depth": [26, 14, 34, 18, 40][index],
    "--size": ["54px", "40px", "64px", "36px", "46px"][index],
  } as CSSProperties,
}));

export function Hero() {
  const playing = usePlaying();

  return (
    <section id="hero" className={`sp-hero ${playing ? "is-playing" : ""}`} aria-labelledby="dev-hero-title">
      <div className="sp-hero-top">
        <div className="sp-hero-banner" aria-hidden="true">
          <div className="sp-hero-glow" />
          <div className="sp-hero-vinyl"><span /></div>
          <div className="sp-hero-phones">
            {phones.map((phone) => (
              <img key={phone.src} src={phone.src} alt="" width={320} height={680} decoding="async" style={{ "--speed": phone.speed, "--depth": phone.depth } as CSSProperties} />
            ))}
          </div>
          {bubbles.map((bubble) => <img key={bubble.logo} className="sp-bubble" src={bubble.logo} alt="" style={bubble.style} />)}
        </div>
        <div className="sp-hero-content">
          <p className="sp-verified"><BadgeCheck aria-hidden="true" /> Desenvolvedor verificado</p>
          <h1 id="dev-hero-title">Kalyston Miranda</h1>
          <p className="sp-hero-meta">Desenvolvedor Full Stack Pleno · mais de 5 anos · foco em meios de pagamento · 6 projetos · 2 apps nas lojas</p>
        </div>
      </div>
      <div className="sp-actions">
        <PlayButton className="sp-play-large" />
        <a className="sp-follow" href="https://www.linkedin.com/in/kalystonmiranda/" target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" /> Seguir no LinkedIn</a>
        <a className="sp-icon-link" href="https://github.com/IKallS" aria-label="GitHub de Kalyston" target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" /></a>
        <a className="sp-icon-link" href="mailto:mirandakalyston@gmail.com" aria-label="Enviar e-mail para Kalyston"><Mail aria-hidden="true" /></a>
      </div>
    </section>
  );
}
