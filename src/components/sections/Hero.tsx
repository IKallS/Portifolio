// import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "../ui/Button";
import LiquidEther from "../effects/LiquidEther";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 "
    >
      <div className="w-full absolute  h-full">
        {/* <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        /> */}
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      {/* Animated magical background - bem sutil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--primary))]/20 rounded-full blur-[140px] animate-levitate" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/12 rounded-full blur-[140px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/12 rounded-full blur-[120px] animate-levitate"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Floating sparkles - muito sutis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* <Sparkles
          className="absolute top-1/4 left-1/4 w-6 h-6 text-[hsl(var(--primary))]/40 animate-twinkle"
          style={{ animationDelay: "0s" }}
        />
        <Sparkles
          className="absolute top-1/3 right-1/3 w-4 h-4 text-purple-400/35 animate-twinkle"
          style={{ animationDelay: "1s" }}
        />
        <Sparkles
          className="absolute bottom-1/3 left-1/3 w-5 h-5 text-[hsl(var(--primary))]/40 animate-twinkle"
          style={{ animationDelay: "2s" }}
        />
        <Sparkles
          className="absolute top-2/3 right-1/4 w-4 h-4 text-accent/35 animate-twinkle"
          style={{ animationDelay: "1.5s" }}
        /> */}
        {/* <Wand2
          className="absolute top-1/2 left-1/5 w-8 h-8 text-[hsl(var(--primary))]/15 animate-levitate"
          style={{ animationDelay: "0.5s" }}
        /> */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[hsl(var(--primary))]" />
            <span className="text-[hsl(var(--primary))] text-sm font-semibold tracking-wider uppercase">
              Code is the most powerful magic
            </span>
            <Sparkles className="w-4 h-4 text-[hsl(var(--primary))]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text inline-flex items-center gap-3">
              Kalyston
              <Wand2 className="w-12 h-12 md:w-16 md:h-16 inline animate-levitate" />
            </span>
            <br />
            <span className="text-foreground">Miranda</span>
          </h1>

          <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
            Transformando ideias em experiências digitais incríveis.
            <br />
            Especializado em criar soluções web modernas e escaláveis.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12 ">
            <Button
              icon={<Sparkles className="w-4 h-4" />}
              label={"Ver Projetos"}
              onClick={() => scrollToSection("#projects")}
              className={
                "flex justify-center items-center rouded-lg rounded-lg gap-3 p-2 relative overflow-hidden bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-[hsl(var(--primary))]-foreground font-semibold px-8 shadow-lg shadow-[hsl(var(--primary))]/30 hover:shadow-[hsl(var(--primary))]/50 transition-all group "
              }
            />

            {/* <Button
              size="lg"
              onClick={() => scrollToSection("#projects")}
              className="relative overflow-hidden bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-[hsl(var(--primary))]-foreground font-semibold px-8 shadow-lg shadow-[hsl(var(--primary))]/30 hover:shadow-[hsl(var(--primary))]/50 transition-all group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Ver Projetos
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button> */}

            <Button
              icon={<Mail className="w-4 h-4" />}
              label={"Contato"}
              onClick={() => scrollToSection("#contact")}
              className={
                "flex justify-center items-center rouded-lg  rounded-lg gap-3 p-2  relative overflow-hidden border-2 border-[hsl(var(--primary))]/30 hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/8 font-semibold px-8 ornate-border"
              }
            />

            {/* <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#contact")}
              className="border-2 border-[hsl(var(--primary))]/30 hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/8 font-semibold px-8 ornate-border"
            >
              Entrar em Contato
            </Button> */}
          </div>

          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-secondary/40 hover:bg-[hsl(var(--primary))]/12 border border-border hover:border-[hsl(var(--primary))]/30 flex items-center justify-center transition-all group relative overflow-hidden"
            >
              <Github className="w-5 h-5 text-foreground/60 group-hover:text-[hsl(var(--primary))] transition-colors relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-secondary/40 hover:bg-[hsl(var(--primary))]/12 border border-border hover:border-[hsl(var(--primary))]/30 flex items-center justify-center transition-all group relative overflow-hidden"
            >
              <Linkedin className="w-5 h-5 text-foreground/60 group-hover:text-[hsl(var(--primary))] transition-colors relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="mailto:your@email.com"
              className="w-12 h-12 rounded-full bg-secondary/40 hover:bg-[hsl(var(--primary))]/12 border border-border hover:border-[hsl(var(--primary))]/30 flex items-center justify-center transition-all group relative overflow-hidden"
            >
              <Mail className="w-5 h-5 text-foreground/60 group-hover:text-[hsl(var(--primary))] transition-colors relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={() => scrollToSection("#about")}
          className="flex flex-col items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors group"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
