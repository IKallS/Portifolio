import type { CaseData } from "./types";

export const dashboardCartaoCredito: CaseData = {
  slug: "dashboard-cartao-credito",
  pageTitle: "Dashboard de Cartão de Crédito",
  eyebrow: "Case 04 · Dashboard de Cartão de Crédito",
  title: "Cobrança recorrente no cartão, do resumo do mês à ação.",
  intro: "Como desenhei e construí o painel interno da TMW Telecom em que a equipe acompanha e processa as cobranças mensais no cartão de crédito: o que já entrou, quem falta cobrar, quem precisa de contato e o que vem pela frente.",
  meta: [
    { label: "Desafio", value: "Transformar os dados de cobrança do mês em uma visão clara e em ações seguras: cobrar, estornar e gerar boleto quando o cartão é negado." },
    { label: "Minha atuação", value: "UX/UI e desenvolvimento do painel, da interface ao backend." },
    { label: "Contexto", value: "Ferramenta interna da TMW Telecom, usada pela equipe; não tem acesso público." },
  ],
  story: {
    eyebrow: "Estrutura da experiência",
    heading: "Uma área para cada pergunta da equipe.",
    paragraphs: [
      "O painel tem oito áreas — Início, Cobrança Individual, Cobrança em Lote, Futuros, Histórico, Estorno, Boleto Recurso e Histórico de Recursos — na navegação lateral e repetidas em abas no topo do conteúdo. As ações de cadastro mais frequentes, Nova Recorrência e Novo Cartão, ficam fixas no cabeçalho.",
      "Organizei as telas pela pergunta que a equipe faz em cada momento: quanto já entrou, quem ainda falta cobrar, quem foi negado e o que fazer com essa pessoa, e o que começa nos próximos meses.",
    ],
  },
  screenSize: { width: 1600, height: 1000 },
  screenCaption: "Painel gerado com dados fictícios",
  screens: [
    {
      title: "Início",
      image: "/cases/dashboard-cartao-credito/inicio.jpg",
      alt: "Visão Geral do Dashboard de Cartão de Crédito com total pago no mês, clientes cobrados do total esperado, falhas dos últimos 7 dias, valores de boletos, barras de cobrado x faltando e as listas Clientes negados que precisam de contato e Cartões vencendo",
      question: "Como está o mês?",
      detail: "A visão geral abre com o total pago no mês, separado entre cartão e boleto, quantos clientes já foram cobrados do total esperado e as falhas dos últimos sete dias. Duas barras mostram cobrado x faltando, em valor e em clientes. Abaixo, duas listas transformam os números em tarefas: clientes negados que precisam de contato, com motivo, tentativas, telefone e e-mail, e cartões vencendo.",
      principle: "Do número à próxima tarefa.",
    },
    {
      title: "Cobrança em Lote",
      image: "/cases/dashboard-cartao-credito/lote.jpg",
      alt: "Tabela Cobrança em Lote com caixa de seleção, cliente, assinatura, bandeira e final do cartão, valor e link de detalhes; um cliente tem o selo 3x negado; no rodapé, contador de selecionados, total e botão Cobrar Selecionados",
      question: "Como cobro todos de uma vez sem errar?",
      detail: "A fila do mês aparece em tabela, com assinatura, bandeira e final do cartão e valor de cada cliente. Quem já teve cobrança negada recebe um selo com o número de tentativas. O rodapé mostra quantos clientes e qual valor serão cobrados antes do clique em “Cobrar Selecionados”, e o processamento acompanha o andamento com sucessos e falhas.",
      principle: "Ver o total antes de confirmar.",
    },
    {
      title: "Cobrança Individual",
      image: "/cases/dashboard-cartao-credito/individual.jpg",
      alt: "Cartões de clientes na Cobrança Individual com busca por nome, status Ativo ou Bloqueado, assinatura, código, bandeira e final do cartão, valor, botão de detalhes e botão Cobrar",
      question: "E quando preciso agir sobre um cliente só?",
      detail: "Os mesmos clientes aparecem em cartões pesquisáveis por nome, com status, assinatura, código, cartão e valor. Cada cartão tem o detalhe da cobrança e o botão Cobrar, para resolver casos pontuais sem montar um lote.",
      principle: "Uma ação por cliente, com o contexto ao lado.",
    },
    {
      title: "Futuros",
      image: "/cases/dashboard-cartao-credito/futuros.jpg",
      alt: "Cobranças Futuras em cartões com selo Começa em e o mês, data de início da recorrência, número de parcelas, cartão e valor da primeira cobrança, com busca por nome ou data",
      question: "O que começa nos próximos meses?",
      detail: "Recorrências já cadastradas que ainda não começaram ficam separadas da fila do mês, com selo do mês de início, número de parcelas e valor da primeira cobrança. A busca aceita nome ou data, e a tela serve só para acompanhamento: não há botão de cobrar.",
      principle: "Separar o que é agora do que é depois.",
    },
    {
      title: "Boleto Recurso",
      image: "/cases/dashboard-cartao-credito/recurso.jpg",
      alt: "Boleto Recurso com clientes que tiveram o cartão negado no mês, cada um com tentativas, motivo da recusa, data da última tentativa, valor original, juros e total do boleto; no rodapé, Gerar Boletos Selecionados e Baixar Remessa",
      question: "E se o cartão for negado?",
      detail: "Clientes com cobrança negada no mês aparecem com o motivo da recusa em linguagem simples, a última tentativa, o valor original, os juros e o total do boleto. A equipe seleciona quem vai receber boleto, gera tudo em lote e baixa a remessa; os boletos gerados ficam em uma aba própria de histórico.",
      principle: "Um caminho claro para a cobrança que falhou.",
    },
  ],
  highlights: {
    eyebrow: "Outras decisões do painel",
    heading: "Cuidados com dado sensível e com quem opera.",
    items: [
      {
        title: "Cartão só pelo final",
        text: "Em nenhuma tela aparece o número completo do cartão: só a bandeira e os quatro últimos dígitos, o suficiente para a equipe confirmar com o cliente.",
      },
      {
        title: "Recusas em português",
        text: "As respostas da operadora são traduzidas para mensagens que a equipe entende e pode repassar ao cliente, como “Cartão vencido” ou “Recusado pela operadora do cartão”.",
      },
      {
        title: "Tema claro e escuro",
        text: "O painel tem tema claro e escuro, alternável no cabeçalho, para uma ferramenta que fica aberta durante todo o expediente.",
      },
    ],
  },
  outcome: {
    eyebrow: "Uso e limite da evidência",
    heading: "Uma ferramenta interna da operação financeira.",
    paragraphs: [
      "O Dashboard de Cartão de Crédito é uma ferramenta interna da TMW Telecom e não tem acesso público. Desenhei a experiência e a interface e desenvolvi o painel.",
      "As capturas acima foram geradas a partir do código do painel com dados fictícios: nomes, contatos, valores e cartões não pertencem a clientes reais. Este recorte não inclui pesquisa com a equipe, testes de usabilidade nem indicadores de operação.",
    ],
  },
};
