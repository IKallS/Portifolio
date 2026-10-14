import type { CSSProperties } from "react";

const strengths = [
  { number: "01", title: "Arquitetura da informação", description: "Organizar serviços por tarefas reconhecíveis e tornar a navegação previsível." },
  { number: "02", title: "Hierarquia de interface", description: "Dar destaque à situação atual e à ação relevante em cada jornada." },
  { number: "03", title: "Design e implementação", description: "Conectar decisões de UX/UI à construção de interfaces digitais." },
];

export function Skills() {
  return (
    <section id="atuacao" className="section-shell strengths" aria-labelledby="skills-title" data-reveal>
      <div className="section-heading">
        <p className="eyebrow">Como contribuo</p>
        <h2 id="skills-title">Da estrutura à experiência final.</h2>
      </div>
      <div className="strength-grid">
        {strengths.map((strength, index) => (
          <article className="strength-card dz-stagger" key={strength.number} style={{ "--i": index } as CSSProperties}>
            <span>{strength.number}</span>
            <h3>{strength.title}</h3>
            <p>{strength.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
