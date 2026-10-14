import { Linkedin, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="sp-section sp-contact" aria-labelledby="dev-contact-title" data-parallax data-reveal>
      <img className="sp-contact-bg" src="./dev/shots/tmwpix-tv-guia.jpg" decoding="async" alt="" aria-hidden="true" loading="lazy" />
      <h2 id="dev-contact-title">Ao vivo</h2>
      <div className="sp-live">
        <div className="sp-live-date" aria-hidden="true"><small>status</small><strong>ON</strong></div>
        <div className="sp-live-copy">
          <p className="sp-live-title">Vamos construir algo juntos?</p>
          <p>Para oportunidades em desenvolvimento ou para conversar sobre um destes projetos · Charqueadas, RS, Brasil</p>
        </div>
        <div className="sp-live-actions">
          <a className="sp-button-primary" href="mailto:mirandakalyston@gmail.com"><Mail aria-hidden="true" /> Enviar e-mail</a>
          <a className="sp-follow" href="https://www.linkedin.com/in/kalystonmiranda/" target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" /> Abrir LinkedIn</a>
        </div>
      </div>
      <p className="sp-contact-meta">mirandakalyston@gmail.com</p>
    </section>
  );
}
