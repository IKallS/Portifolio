import type { CaseData } from "./types";

export const tmwConnect: CaseData = {
  slug: "tmw-connect",
  pageTitle: "TMW Connect",
  eyebrow: "Case 01 · TMW Connect",
  title: "Autoatendimento que ajuda a encontrar o próximo passo.",
  intro: "Como organizei a experiência mobile da Central do Assinante TMW Telecom para tornar claras as jornadas de Faturas, Contratos e Suporte, a partir de uma tela Início que mostra a situação do serviço.",
  meta: [
    { label: "Desafio", value: "Reunir serviços com urgências diferentes em uma navegação mobile clara." },
    { label: "Minha atuação", value: "UX/UI de ponta a ponta e implementação do aplicativo." },
    { label: "Entrega verificável", value: "Aplicativo de autoatendimento publicado na App Store." },
  ],
  story: {
    eyebrow: "Estrutura da experiência",
    heading: "Serviços organizados pelo que a pessoa precisa fazer.",
    paragraphs: [
      "Conferir uma cobrança, localizar um contrato e buscar ajuda são tarefas distintas. Organizei a navegação em cinco áreas reconhecíveis — Início, Faturas, Contratos, Suporte e Conta — para que o cliente parta do que quer fazer, sem precisar conhecer a estrutura interna da operadora.",
      "Em cada jornada, trabalhei a mesma sequência: mostrar a situação, destacar o que exige atenção e aproximar a próxima ação. A tela Início é o ponto de partida dessa lógica; as telas abaixo permitem examinar essas escolhas no produto publicado.",
    ],
  },
  screenSize: { width: 832, height: 1800 },
  screenCaption: "Captura oficial pública do TMW Connect",
  screens: [
    {
      title: "Início",
      image: "/cases/tmw-connect/inicio.jpg",
      alt: "Tela pública de Início com saudação, contrato selecionado, status Conexão Ativa com a velocidade do plano, carrossel de ofertas e Acesso Rápido; abaixo, a barra com as cinco áreas do app",
      question: "Está tudo certo com a minha conexão?",
      detail: "Coloquei no topo o contrato selecionado e o status da conexão com a velocidade do plano, antes de ofertas e atalhos. Abaixo, o Acesso Rápido e a barra fixa com as cinco áreas levam a pessoa direto ao serviço que procura.",
      principle: "Situação do serviço primeiro; caminhos para o resto logo abaixo.",
    },
    {
      title: "Faturas",
      image: "/cases/tmw-connect/faturas.jpg",
      alt: "Tela pública de Faturas com uma cobrança em aberto, valor, vencimento e botão Pagar; abaixo, histórico de cobranças pagas",
      question: "O que precisa de atenção agora?",
      detail: "Separei a cobrança em aberto do histórico pago. Agrupei valor, vencimento e pagamento para responder de imediato o que está pendente e o que a pessoa pode fazer.",
      principle: "Situação e próxima ação no mesmo contexto.",
    },
    {
      title: "Contratos",
      image: "/cases/tmw-connect/contratos.jpg",
      alt: "Tela pública de Contratos com plano ativo, data de fidelidade, links para assinatura e detalhes do plano",
      question: "Qual é a situação do meu serviço?",
      detail: "Dei prioridade ao plano ativo e à fidelidade. Mantive os links de assinatura próximos da situação do contrato e deixei os detalhes do plano para uma leitura mais aprofundada.",
      principle: "Resumo primeiro; detalhes e pendências depois.",
    },
    {
      title: "Suporte",
      image: "/cases/tmw-connect/suporte.jpg",
      alt: "Tela pública de Suporte com chat, WhatsApp e telefone, seguida de diagnóstico rápido e perguntas frequentes",
      question: "Como resolvo ou peço ajuda?",
      detail: "Separei os canais de atendimento das ações de diagnóstico. Assim, quem precisa de ajuda pode escolher entre falar com alguém, testar a conexão ou abrir um problema.",
      principle: "Caminhos distintos para necessidades distintas.",
    },
  ],
  outcome: {
    eyebrow: "Entrega e limite da evidência",
    heading: "Da estrutura da informação à experiência publicada.",
    paragraphs: [
      "O TMW Connect reúne cobrança, contratos e suporte em um aplicativo de autoatendimento publicado. Minha contribuição passou pelo desenho da experiência e da interface e pela implementação da solução.",
      "Este recorte apresenta as decisões visíveis no app. Ainda não inclui documentação de pesquisa, testes de usabilidade ou indicadores de impacto.",
    ],
    link: { href: "https://apps.apple.com/br/app/tmwconnect/id6758272461", label: "Ver aplicativo e capturas originais na App Store" },
  },
};
