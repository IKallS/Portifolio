import type { CSSProperties } from "react";
import { career } from "../../data/career";

// Carreira como discografia: cada fase é um "álbum" e as entregas são as faixas.
// Ao aparecer, o disco desliza para fora da capa; com o mouse em cima, ele gira.
export function Career() {
  return (
    <section id="career" className="sp-section" aria-labelledby="dev-career-title" data-reveal>
      <h2 id="dev-career-title">Discografia</h2>
      <p className="sp-section-lead">Mais de 5 anos desenvolvendo na TMW Telecom, com foco em meios de pagamento e nos módulos financeiro e fiscal do ERP.</p>
      <ol className="sp-eras">
        {career.map((era, index) => (
          <li key={era.role} className="sp-era sp-stagger" data-parallax style={{ "--d": [0.4, 0.9, 0.6][index], "--i": index } as CSSProperties}>
            <div className="sp-era-head">
              <span className="sp-era-sleeve" style={{ "--c": era.color } as CSSProperties} aria-hidden="true">
                <span className="sp-era-disc" />
                <span className="sp-era-cover" style={{ background: `linear-gradient(135deg, ${era.color}, #121212 140%)` }}>
                  <strong>{era.years}</strong>
                </span>
              </span>
              <div>
                <p className="sp-era-kind">Álbum · {era.company}</p>
                <h3>{era.role}</h3>
                <p className="sp-era-period">{era.period}</p>
              </div>
            </div>
            <ol className="sp-era-tracks">
              {era.highlights.map((item, track) => <li key={item} style={{ "--j": track } as CSSProperties}>{item}</li>)}
            </ol>
          </li>
        ))}
      </ol>
    </section>
  );
}
