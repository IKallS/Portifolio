import { Github, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

export function Projects() {
  const projects = [

    {
      title: "Portfolio Dashboard",
      description:
        "Dashboard para visualização de métricas e analytics em tempo real",
      technologies: ["React", "Tailwind", "Chart.js"],
      githubUrl: "https://github.com/IKallS/Portifolio.git",
      demoUrl: "https://portifolio-kalyston.vercel.app/",
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[hsl(var(--primary))]/12 rounded-full blur-[140px] animate-float" />
      </div>

      {/* Floating sparkles */}
      <Sparkles
        className="absolute top-1/4 left-1/3 w-6 h-6 text-purple-400/25 animate-twinkle"
        style={{ animationDelay: "0.7s" }}
      />
      <Sparkles
        className="absolute bottom-1/3 right-1/5 w-5 h-5 text-[hsl(var(--primary))]/25 animate-twinkle"
        style={{ animationDelay: "1.3s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Projetos em <span className="gradient-text">Destaque</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(var(--primary))] via-purple-400 to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="glow-card ornate-border p-6 rounded-xl group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
            >
              {/* Magical shimmer effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[hsl(var(--primary))]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  {project.title}
                  <Sparkles className="w-5 h-5 text-[hsl(var(--primary))]/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-accent/10 border border-[hsl(var(--primary))]/30 rounded-full text-xs font-medium text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    icon={<Github className="w-4 h-4 mr-2" />}
                    label="Code"
                    onClick={() => window.open(project.githubUrl, "_blank")}
                    className="flex-1 flex items-center justify-center border-[.1px] border-[hsl(var(--primary))] p-1 gap-2 hover:bg-[hsl(var(--primary))]/10 transition-colors rounded-lg"
                  />

                  <Button
                    icon={<ExternalLink className="w-4 h-4 mr-2" />}
                    label="Demo"
                    onClick={() => window.open(project.demoUrl, "_blank")}
                    className="flex-1 flex items-center justify-center border-[.1px] border-[hsl(var(--primary))] p-1 gap-2 hover:bg-[hsl(var(--primary))]/90 transition-colors rounded-lg bg-[hsl(var(--primary))]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
