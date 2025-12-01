import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 border-t border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-[hsl(var(--primary))] fill-[hsl(var(--primary))]" />
            <span>por Kalyston frontend developer</span>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-[hsl(var(--primary))]/20 border border-border hover:border-[hsl(var(--primary))]/50 flex items-center justify-center transition-all group"
            >
              <Github className="w-5 h-5 text-foreground/80 group-hover:text-[hsl(var(--primary))] transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-[hsl(var(--primary))]/20 border border-border hover:border-[hsl(var(--primary))]/50 flex items-center justify-center transition-all group"
            >
              <Linkedin className="w-5 h-5 text-foreground/80 group-hover:text-[hsl(var(--primary))] transition-colors" />
            </a>
            <a
              href="mailto:mirandakalyston@email.com"
              className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-[hsl(var(--primary))]/20 border border-border hover:border-[hsl(var(--primary))]/50 flex items-center justify-center transition-all group"
            >
              <Mail className="w-5 h-5 text-foreground/80 group-hover:text-[hsl(var(--primary))] transition-colors" />
            </a>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-[hsl(var(--muted-foreground))]">
          <p>
            &copy; {new Date().getFullYear()} Kalyston frontend developer. Todos
            os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
