import type { CSSProperties, PointerEvent } from "react";

const groups = [
  { title: "Pagamentos e ERP", color: "#148a08", skills: ["Cartão de crédito", "Gateways de pagamento", "Tokenização", "Cobrança recorrente", "Webhooks", "Conciliação financeira", "ERP financeiro e fiscal"] },
  { title: "Mobile", color: "#e8115b", skills: ["React Native", "Expo e EAS", "expo-router", "NativeWind", "MapLibre", "Notificações push", "Android TV"] },
  { title: "Back-end", color: "#1e3264", skills: ["Node.js", "TypeScript", "Express", "Fastify", "Nest.js", "Hono", "Prisma", "PostgreSQL", "MySQL", "PHP", "Zod", "JWT"] },
  { title: "Web", color: "#8d67ab", skills: ["React", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "Recharts", "Three.js", "Figma"] },
  { title: "Qualidade e infra", color: "#477d95", skills: ["Vitest", "Jest", "Playwright", "Supertest", "Docker", "Render", "Vercel", "GitHub Actions", "Git", "Linux"] },
  { title: "IA e mídia", color: "#ba5d07", skills: ["Claude API", "whisper.cpp", "ffmpeg", "yt-dlp"] },
];

// Inclinação 3D que segue o mouse, com um brilho no ponto do cursor.
function tilt(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== "mouse") return;
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  card.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
  card.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
  card.style.setProperty("--gx", `${x * 100}%`);
  card.style.setProperty("--gy", `${y * 100}%`);
}

function untilt(event: PointerEvent<HTMLDivElement>) {
  ["--rx", "--ry"].forEach((name) => event.currentTarget.style.removeProperty(name));
}

export function Skills() {
  return (
    <section id="skills" className="sp-section" aria-labelledby="dev-skills-title" data-reveal>
      <h2 id="dev-skills-title">Navegue por gêneros</h2>
      <p className="sp-section-lead">As ferramentas que uso nos projetos acima.</p>
      <div className="sp-genres">
        {groups.map((group, index) => (
          <div className="sp-genre sp-stagger" key={group.title} data-parallax style={{ "--d": [0.9, 0.6, 1.2, 0.3, 1, 0.8][index], "--i": index } as CSSProperties}>
            <div className="sp-genre-card" style={{ background: group.color }} onPointerMove={tilt} onPointerLeave={untilt}>
              <h3>{group.title}</h3>
              <ul>{group.skills.map((skill, item) => <li key={skill} style={{ "--j": item } as CSSProperties}>{skill}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
