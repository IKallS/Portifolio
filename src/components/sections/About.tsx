import { Code2, Rocket, Zap, Sparkles } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Código limpo, testável e bem documentado",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Otimização e escalabilidade em primeiro lugar",
    },
    {
      icon: Zap,
      title: "Inovação",
      description: "Sempre atualizado com as últimas tendências",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-1/2 left-1/3 w-72 h-72  rounded-full blur-[120px] animate-float" />
      </div>

      {/* Floating sparkles */}
      <Sparkles
        className="absolute top-1/4 right-1/4 w-6 h-6 text-[hsl(var(--primary))]/25 animate-twinkle"
        style={{ animationDelay: "0.5s" }}
      />
      <Sparkles
        className="absolute bottom-1/3 left-1/5 w-5 h-5 text-purple-400/25 animate-twinkle"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(var(--primary))] via-purple-400 to-[hsl(var(--accent))] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
              Desenvolvedor apaixonado por tecnologia e inovação, com foco em
              criar experiências digitais que fazem a diferença. Especializado
              em desenvolvimento full stack com as tecnologias mais modernas do
              mercado.
            </p>
            <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
              Quando não estou codificando, você pode me encontrar explorando
              novas tecnologias, contribuindo para projetos open source, ou
              assistindo a saga Star Wars pela enésima vez.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature) => (
              <div className="glow-card ornate-border p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      {feature.title}
                      <Sparkles className="w-4 h-4 text-[hsl(var(--primary))]/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
