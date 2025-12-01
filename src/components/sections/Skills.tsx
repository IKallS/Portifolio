import { Sparkles } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Vue.js",
        "Framer Motion",
      ],
    },
    {
      title: "Backend",
      skills: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "MongoDB",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      title: "DevOps & Tools",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Linux", "Vercel"],
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 md:py-32 relative overflow-hidden bg-secondary/15"
    >
      <div className="absolute inset-0 opacity-8">
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/12 rounded-full blur-[140px] animate-levitate" />
      </div>

      {/* Floating sparkles */}
      <Sparkles className="absolute top-1/3 left-1/4 w-5 h-5 text-[hsl(var(--primary))]/25 animate-twinkle" />
      <Sparkles
        className="absolute bottom-1/4 right-1/3 w-6 h-6 text-purple-400/25 animate-twinkle"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Minhas <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(var(--primary))] via-purple-400 to-[hsl(var(--accent))] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div className="glow-card ornate-border p-8 rounded-xl group hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                {category.title}
                <Sparkles className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-br from-secondary/50 to-secondary/30 border border-[hsl(var(--primary))]/30 rounded-lg text-sm font-medium hover:bg-[hsl(var(--primary))]/10 hover:border-[hsl(var(--primary))]/50 hover:shadow-lg hover:shadow-[hsl(var(--primary))]/20 transition-all cursor-default relative overflow-hidden group/skill"
                  >
                    <span className="relative z-10">{skill}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--primary))]/10 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-700" />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
