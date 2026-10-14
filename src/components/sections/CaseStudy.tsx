import type { CaseData } from "../../data/cases/types";

export function CaseStudy({ data }: { data: CaseData }) {
  return (
      <article id={`case-${data.slug}`} className="case-study" aria-labelledby="case-title">
        <div className="section-shell">
          <div className="case-intro">
            <div>
              <p className="eyebrow">{data.eyebrow}</p>
              <h1 id="case-title">{data.title}</h1>
            </div>
            <p>{data.intro}</p>
          </div>
  
          <div className="case-meta" aria-label="Resumo do projeto">
            {data.meta.map((item) => (
              <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>
            ))}
          </div>
  
          <div className="case-story">
            <div className="section-heading">
              <p className="eyebrow">{data.story.eyebrow}</p>
              <h2>{data.story.heading}</h2>
            </div>
            <div className="case-story-copy">
              {data.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
  
          <div className="screen-list">
            {data.screens.map((screen, index) => {
              const size = screen.size ?? data.screenSize;
              return (
              <article className={size.width > size.height ? "screen-row screen-row-wide" : "screen-row"} key={screen.title}>
                <div className="screen-copy">
                  <p className="screen-number">0{index + 1} / {screen.title}</p>
                  <h2>{screen.question}</h2>
                  <p>{screen.detail}</p>
                  <div className="screen-principle"><span>Decisão de UX</span><strong>{screen.principle}</strong></div>
                </div>
                <figure className="screen-figure">
                  <img src={screen.image} alt={screen.alt} width={size.width} height={size.height} loading="lazy" />
                  <figcaption>{screen.title} · {data.screenCaption}</figcaption>
                </figure>
              </article>
            );
          })}
        </div>

        {data.highlights && (
          <div className="case-highlights">
            <div className="section-heading">
              <p className="eyebrow">{data.highlights.eyebrow}</p>
              <h2>{data.highlights.heading}</h2>
            </div>
            <div className="strength-grid">
              {data.highlights.items.map((item, index) => (
                <div className="strength-card" key={item.title}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="case-outcome">
          <div>
            <p className="eyebrow">{data.outcome.eyebrow}</p>
            <h2>{data.outcome.heading}</h2>
          </div>
          <div>
            {data.outcome.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {data.outcome.link && (
              <a className="text-link" href={data.outcome.link.href} target="_blank" rel="noopener noreferrer">{data.outcome.link.label} <span aria-hidden="true">↗</span></a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
