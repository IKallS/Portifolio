import type { CSSProperties } from "react";
import { education } from "../../data/career";

// "Letra": o texto sobre mim acende linha a linha conforme a rolagem, como a letra sincronizada de um player.
const lyrics = [
  "Do problema ao produto no ar.",
  "Full stack há mais de 5 anos,",
  "com a mão em meios de pagamento:",
  "cartão de crédito, recorrência e webhooks,",
  "e nos módulos financeiro e fiscal do ERP.",
  "Na TMW Telecom, desenvolvo os apps e sistemas",
  "que clientes e equipe usam no dia a dia:",
  "o app de autoatendimento,",
  "o app de streaming para celular e TV",
  "e o painel de cobrança recorrente no cartão.",
  "Fora dela, construo o Lá Vamos Nós,",
  "um app de viagens com GPS,",
  "e uma pipeline de agentes de IA",
  "que produz e publica cortes de vídeo.",
  "Modelagem, API, app, testes e deploy —",
  "e a experiência de quem usa.",
  "Também desenho as interfaces que construo.",
];

const credits = [
  { role: "Mobile", name: "React Native e Expo" },
  { role: "Back-end", name: "Node.js e TypeScript" },
  { role: "Dados", name: "APIs REST e bancos SQL" },
  { role: "Integrações", name: "Pagamento, mapas e IA" },
  { role: "Design", name: "Figma e UX/UI" },
];

export function About() {
  return (
    <section id="about" className="sp-section" aria-labelledby="dev-about-title" data-reveal>
      <h2 id="dev-about-title">Sobre</h2>
      <div className="sp-about">
        <div className="sp-lyrics sp-stagger">
          <p className="sp-label">Letra</p>
          {lyrics.map((line) => <p key={line} className="sp-lyric" data-lyric>{line}</p>)}
        </div>
        <div className="sp-credits sp-stagger" style={{ "--i": 1 } as CSSProperties}>
          <p className="sp-credits-title">Créditos</p>
          <ul>{credits.map((credit) => <li key={credit.role}><strong>{credit.name}</strong><small>{credit.role}</small></li>)}</ul>
          <p className="sp-credits-title">Formação</p>
          <ul>{education.map((item) => <li key={item.course}><strong>{item.course}</strong><small>{item.school} · {item.period}</small></li>)}</ul>
          <p className="sp-credits-place">Charqueadas, RS, Brasil</p>
        </div>
      </div>
    </section>
  );
}
