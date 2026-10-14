export interface DesignProject {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  role: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  /** "landscape" para capturas de desktop/TV no cartão da lista */
  imageOrientation?: "portrait" | "landscape";
  href: string;
  published: boolean;
}

// Para adicionar um case: escreva o conteúdo em src/data/cases/, crie case-<slug>.html,
// inclua a entrada em vite.config.ts e só então acrescente o projeto aqui com published: true.
export const designProjects: DesignProject[] = [
  {
    slug: "tmw-connect",
    title: "TMW Connect",
    category: "App mobile · Autoatendimento",
    summary: "Central do Assinante TMW Telecom com Faturas, Contratos e Suporte em uma navegação mobile.",
    problem: "Reunir serviços com urgências diferentes para que o cliente encontre sua situação e o próximo passo.",
    role: "UX/UI de ponta a ponta e implementação do aplicativo.",
    image: "/cases/tmw-connect/inicio.jpg",
    imageAlt: "Tela pública de Início do TMW Connect, com contrato selecionado, status da conexão, ofertas e acesso rápido",
    imageCredit: "Captura pública do app · App Store",
    href: "./case-tmw-connect.html",
    published: true,
  },
  {
    slug: "la-vamos-nos",
    title: "Lá Vamos Nós",
    category: "App mobile · Mobilidade · Gamificação",
    summary: "App que registra viagens por GPS e transforma quilômetros validados em LVN, trocáveis por recompensas de parceiros locais.",
    problem: "Explicar uma mecânica nova — quilômetro vira moeda — e manter o progresso sempre à vista.",
    role: "UX/UI de ponta a ponta e desenvolvimento do app e do backend.",
    image: "/cases/la-vamos-nos/explorar.jpg",
    imageAlt: "Tela inicial Explorar do Lá Vamos Nós com saldo de LVN, quilômetros acumulados, cashback com barra de meta e atalhos para Destinos, Desafios, Conquistas e Carteira",
    imageCredit: "Captura do app no Android · versão de testes",
    href: "./case-la-vamos-nos.html",
    published: true,
  },
  {
    slug: "tmwpix",
    title: "TMWPIX",
    category: "App de streaming · Celular e TV",
    summary: "TV ao vivo, filmes, séries e rádios em um app com versões para celular e TV.",
    problem: "Organizar conteúdo ao vivo e sob demanda em uma navegação que funcione no toque e no controle remoto.",
    role: "UX/UI das versões para celular e TV e implementação do aplicativo.",
    image: "/cases/tmwpix/inicio.jpg",
    imageAlt: "Tela pública de Início do TMWPIX, com filme em destaque, canais para você e continuar assistindo",
    imageCredit: "Captura pública do app · Google Play",
    href: "./case-tmwpix.html",
    published: true,
  },
  {
    slug: "dashboard-cartao-credito",
    title: "Dashboard de Cartão de Crédito",
    category: "Painel interno · Financeiro · Web",
    summary: "Painel da TMW Telecom para acompanhar e processar as cobranças recorrentes no cartão de crédito.",
    problem: "Dar à equipe uma visão única do mês e ações seguras para cobrar, estornar e tratar cartões negados.",
    role: "UX/UI e desenvolvimento do painel, da interface ao backend.",
    image: "/cases/dashboard-cartao-credito/inicio.jpg",
    imageAlt: "Visão Geral do Dashboard de Cartão de Crédito com total pago no mês, clientes cobrados, falhas e listas de clientes negados e cartões vencendo",
    imageCredit: "Ferramenta interna · dados fictícios",
    imageOrientation: "landscape",
    href: "./case-dashboard-cartao-credito.html",
    published: true,
  },
];

export const publishedDesignProjects = designProjects.filter((project) => project.published);
