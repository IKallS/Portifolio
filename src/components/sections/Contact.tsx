// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Sparkles, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/Button";

export function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "mirandakalyston@email.com",
    },
    {
      icon: Phone,
      title: "Telefone",
      value: "+55 (51) 99999-9999",
    },
    {
      icon: MapPin,
      title: "Localização",
      value: "Charqueadas, Brasil",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Retornarei em breve.");
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 relative overflow-hidden bg-secondary/15"
    >
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/12 rounded-full blur-[140px] animate-levitate" />
      </div>

      {/* Floating sparkles */}
      <Sparkles className="absolute top-1/3 right-1/4 w-6 h-6 text-[hsl(var(--primary))]/25 animate-twinkle" />
      <Sparkles
        className="absolute bottom-1/4 left-1/4 w-5 h-5 text-purple-400/25 animate-twinkle"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(var(--primary))] via-purple-400 to-[hsl(var(--accent))] mx-auto mb-4 rounded-full" />
          <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Tem um projeto em mente? Vamos conversar e criar algo incrível
            juntos!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info) => (
            <div className="glow-card ornate-border p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <info.icon className="w-6 h-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-ellipsis overflow-hidden">
                {info.value}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glow-card ornate-border p-8 rounded-xl relative overflow-hidden group">
            {/* Magical shimmer on hover */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[hsl(var(--primary))]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2 relative z-10">
              <Sparkles className="w-5 h-5 text-[hsl(var(--primary))]" />
              Envie uma Mensagem
              <Sparkles className="w-5 h-5 text-[hsl(var(--primary))]" />
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Seu Nome"
                    required
                    className="bg-background/50 border-border focus:border-[hsl(var(--primary))] transition-all flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-[hsl(var(--background))] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Seu Email"
                    required
                    className="bg-background/50 border-border focus:border-[hsl(var(--primary))] transition-all flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-[hsl(var(--background))] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Assunto"
                  required
                  className="bg-background/50 border-border focus:border-[hsl(var(--primary))] transition-all flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-[hsl(var(--background))] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
              <div>
                <textarea
                  placeholder="Sua Mensagem"
                  required
                  rows={5}
                  className="bg-background/50 border-border focus:border-[hsl(var(--primary))] resize-none transition-all flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Button
                icon={<Send className="w-4 h-4" />}
                label="Enviar Mensagem"
                className="flex justify-center items-center gap-3 text-sm cursor-pointer rounded-lg p-3 w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-[hsl(var(--primary))]-foreground font-semibold shadow-lg shadow-[hsl(var(--primary))]/50 hover:shadow-[hsl(var(--primary))]/70 transition-all group/btn relative overflow-hidden"
                onClick={() => {}}
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
