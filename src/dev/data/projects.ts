export interface DevProject {
  slug: string;
  title: string;
  type: string;
  summary: string;
  built: string[];
  stack: string[];
  status: string;
  /** Logo do app, usado na biblioteca e nas faixas. */
  logo: string;
  /** Captura real do app, mostrada nos detalhes. */
  cover?: string;
  /** Captura em paisagem (painel web) em vez de celular. */
  wide?: boolean;
  color: string;
  kind: "Apps" | "Web" | "IA";
  links: { label: string; href: string; external?: boolean }[];
}

// Projetos privados entram sem link de código: só descrição, stack e links públicos (loja, site ou case).
export const devProjects: DevProject[] = [
  {
    slug: "la-vamos-nos",
    kind: "Apps",
    logo: "./dev/logos/la-vamos-nos.png",
    title: "Lá Vamos Nós",
    type: "App mobile + API + painel web",
    summary: "App que registra viagens por GPS e transforma os quilômetros validados em LVN, a moeda do app, com navegação passo a passo, desafios e sequência de dias.",
    built: [
      "App em Expo/React Native com expo-router, Zustand e NativeWind; rastreamento GPS em segundo plano com fila offline que sincroniza quando a rede volta.",
      "Navegação passo a passo com MapLibre, rotas reais e alternativas, instruções por voz e chegada automática.",
      "API REST em Node.js, Express e TypeScript com Prisma e PostgreSQL, validação com Zod e testes com Vitest e Supertest.",
      "Login com Google, notificações push, atualizações over-the-air com EAS Update e painel administrativo em React.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "MapLibre", "Node.js", "Express", "Prisma", "PostgreSQL", "Vitest"],
    status: "Android em testes",
    cover: "./dev/shots/la-vamos-nos-explorar.jpg",
    color: "#1f8a5b",
    links: [{ label: "Case de UX", href: "./case-la-vamos-nos.html" }],
  },
  {
    slug: "tmw-connect",
    kind: "Apps",
    logo: "./dev/logos/tmw-connect.jpg",
    title: "TMW Connect",
    type: "App mobile + API",
    summary: "Central do Assinante da TMW Telecom: faturas, contratos, suporte e conta em um app de autoatendimento publicado na App Store.",
    built: [
      "App em Expo/React Native com expo-router, NativeWind e Reanimated.",
      "API própria em Fastify e TypeScript com autenticação JWT, limite de requisições, validação com Zod e senhas com bcrypt, sobre MySQL.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Fastify", "JWT", "Zod", "MySQL"],
    status: "Publicado na App Store",
    cover: "./dev/shots/tmw-connect-inicio.jpg",
    color: "#1d4ed8",
    links: [
      { label: "App Store", href: "https://apps.apple.com/br/app/tmwconnect/id6758272461", external: true },
      { label: "Case de UX", href: "./case-tmw-connect.html" },
    ],
  },
  {
    slug: "tmwpix",
    kind: "Apps",
    logo: "./dev/logos/tmwpix.png",
    title: "TMWPIX",
    type: "App de streaming · celular e TV",
    summary: "TV ao vivo, filmes, séries e rádios em um app com versões para celular e Android TV, publicado na Google Play.",
    built: [
      "Um código em Expo/React Native para celular e Android TV.",
      "Navegação por toque no celular e por foco no controle remoto na TV, com guia de programação, player ao vivo e catálogo sob demanda.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Android TV"],
    status: "Publicado na Google Play",
    cover: "./dev/shots/tmwpix-inicio.jpg",
    color: "#b4232f",
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.tmwpix&hl=pt_BR", external: true },
      { label: "tmwpix.com", href: "https://tmwpix.com", external: true },
      { label: "Case de UX", href: "./case-tmwpix.html" },
    ],
  },
  {
    slug: "dashboard-cartao-credito",
    kind: "Web",
    logo: "./dev/logos/dashboard.svg",
    title: "Dashboard de Cartão de Crédito",
    type: "Sistema interno · financeiro",
    summary: "Painel da TMW Telecom em que a equipe acompanha e processa as cobranças recorrentes no cartão de crédito.",
    built: [
      "Cobrança individual e em lote com progresso em tempo real, estorno e histórico de transações integrados à API do gateway de pagamento.",
      "Cartões tokenizados no gateway: o sistema guarda só o token e os últimos dígitos.",
      "Boletos automáticos com juros e arquivo de remessa para cobranças de cartão negadas, além de rotinas agendadas por linha de comando.",
    ],
    stack: ["PHP", "MySQL", "JavaScript", "Tailwind CSS", "API de pagamentos"],
    status: "Ferramenta interna",
    cover: "./dev/shots/dashboard-cartao-credito-inicio.jpg",
    wide: true,
    color: "#0f766e",
    links: [{ label: "Case de UX", href: "./case-dashboard-cartao-credito.html" }],
  },
  {
    slug: "clipado",
    kind: "IA",
    logo: "./dev/logos/clipado.svg",
    title: "Clipado · agentes de clipping",
    type: "Automação com IA + painel",
    summary: "Pipeline de agentes que encontra campanhas de clipping, produz cortes verticais legendados e publica nos canais do Clipado depois de aprovação humana.",
    built: [
      "Serviço em Node.js e TypeScript com Hono: busca campanhas, baixa as fontes, transcreve com whisper.cpp e usa a API do Claude para escolher os trechos.",
      "Corte, enquadramento vertical e legendas queimadas com ffmpeg; publicação automática via APIs das plataformas, sempre depois de aprovação manual.",
      "Escritório visual em React e Three.js que acompanha os agentes em tempo real por SSE.",
    ],
    stack: ["TypeScript", "Node.js", "Hono", "Claude API", "whisper.cpp", "ffmpeg", "Playwright", "React", "Three.js"],
    status: "Em operação",
    color: "#e2552f",
    links: [{ label: "Site do Clipado", href: "https://ikalls.github.io/clipado/", external: true }],
  },
  {
    slug: "portfolio",
    kind: "Web",
    logo: "./dev/logos/portfolio.svg",
    title: "Este portfólio",
    type: "Site estático multipágina",
    summary: "Portfólio com duas versões, Dev e Design, cada uma com sua identidade, e cases de UX com URLs próprias.",
    built: [
      "Vite multipágina com React e TypeScript: cada página é um HTML estático que abre direto e aguenta refresh.",
      "Cases gerados a partir de dados, testes de ponta a ponta com Playwright e deploy contínuo na Vercel.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Playwright"],
    status: "No ar",
    color: "#7c3aed",
    links: [{ label: "Código no GitHub", href: "https://github.com/IKallS/Portifolio", external: true }],
  },
];
