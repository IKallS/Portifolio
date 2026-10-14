import type { CaseData } from "./types";

export const laVamosNos: CaseData = {
  slug: "la-vamos-nos",
  pageTitle: "Lá Vamos Nós",
  eyebrow: "Case 02 · Lá Vamos Nós",
  title: "Cada viagem vira progresso visível.",
  intro: "Como desenhei e construí a experiência de um app mobile que registra viagens por GPS e transforma os quilômetros validados em LVN, a moeda do app, trocável por recompensas de parceiros locais.",
  meta: [
    { label: "Desafio", value: "Explicar uma mecânica nova — quilômetro vira moeda — e manter o progresso sempre à vista." },
    { label: "Minha atuação", value: "UX/UI de ponta a ponta e desenvolvimento do app e do backend." },
    { label: "Estágio", value: "App Android em testes, com distribuição interna; ainda não está nas lojas." },
  ],
  story: {
    eyebrow: "Estrutura da experiência",
    heading: "Do planejamento da rota à recompensa.",
    paragraphs: [
      "O app gira em torno de um ciclo: planejar uma rota, viajar com o GPS ligado, ver os quilômetros validados virarem LVN e trocá-los por recompensas. Dei a cada etapa um lugar fixo. A barra inferior tem Viagens, Comunidade, Planejar e Loja, com Explorar — a tela inicial — em destaque no centro. Desafios, Conquistas, Ranking e Carteira ficam reunidos em abas de uma mesma área, também acessíveis pelos atalhos da tela inicial.",
      "Em todas as telas, apliquei o mesmo princípio: mostrar o progresso em números grandes e barras e sempre indicar o próximo passo — a próxima meta, a próxima posição, o próximo desafio.",
    ],
  },
  screenSize: { width: 720, height: 1528 },
  screenCaption: "Captura do app no Android · versão de testes",
  screens: [
    {
      title: "Explorar",
      image: "/cases/la-vamos-nos/explorar.jpg",
      alt: "Tela inicial Explorar do Lá Vamos Nós com saudação, saldo de LVN e contador de sequência, busca Pra onde vamos hoje, cartões de quilômetros acumulados e cashback com barra de meta, atalhos Destinos, Desafios, Conquistas e Carteira, destino em destaque e barra inferior com Viagens, Comunidade, Explorar, Planejar e Loja",
      question: "Quanto eu já avancei?",
      detail: "No topo ficam a saudação, o saldo de LVN e o contador da sequência de dias. Logo abaixo vêm a busca “Pra onde vamos hoje?” e dois cartões com quilômetros acumulados e cashback em números grandes, com barra de meta. Reuni os atalhos para Destinos, Desafios, Conquistas e Carteira em um único módulo, antes dos destinos em destaque. Quando há uma viagem em andamento, um cartão “Continue sua jornada” mostra quanto falta e retoma a viagem com um toque.",
      principle: "Progresso primeiro; descoberta depois.",
    },
    {
      title: "Viagem ao vivo",
      image: "/cases/la-vamos-nos/viagem-ao-vivo.jpg",
      alt: "Tela Viagem ao vivo com origem e destino (endereço borrado), contadores de tempo, quilômetros e LVN, mapa com a rota traçada (nomes de ruas borrados) e, no rodapé, a confirmação Viagem finalizada com os botões Ver viagens e Ver carteira",
      question: "Quanto esta viagem está rendendo?",
      detail: "Durante a viagem, o cabeçalho mostra origem e destino e três números: tempo, quilômetros e LVN ganhos. O mapa traz a rota traçada e a posição atual. Ao finalizar, a confirmação aparece no rodapé com dois caminhos: ver as viagens ou ir direto para a carteira.",
      principle: "Progresso ao vivo e próximo passo ao terminar.",
    },
    {
      title: "Ranking",
      image: "/cases/la-vamos-nos/ranking.jpg",
      alt: "Tela Ranking com abas Desafios, Conquistas, Ranking e Carteira, aviso Você está em 8º, lista ordenada por LVN com troféu para o primeiro lugar e a linha do próprio usuário destacada em roxo",
      question: "Como estou em relação aos outros?",
      detail: "O ranking ordena por LVN acumulado e destaca os três primeiros com troféu e cores. O topo da tela já informa a posição (“Você está em 8º”), e a linha da própria pessoa aparece em roxo, marcada com “você”, para ser encontrada sem procurar.",
      principle: "Encontrar a si mesmo sem procurar.",
    },
    {
      title: "Carteira",
      image: "/cases/la-vamos-nos/carteira.jpg",
      alt: "Tela Carteira com saldo de LVN em destaque, total ganho e resgatado, aviso de quando o saldo expira, atalhos para Recompensas e Restaurantes e a seção Ganhe mais LVN com desafios em andamento",
      question: "Quanto tenho e o que posso fazer com isso?",
      detail: "O saldo vem em destaque, com total ganho e resgatado. Logo abaixo, um aviso diz quando o saldo expira e como evitar isso (“faça uma viagem pra manter”). Depois vêm os dois usos do saldo — Recompensas e Restaurantes — e “Ganhe mais LVN”, com os desafios em andamento e seu progresso.",
      principle: "Saldo, prazo e próximo ganho no mesmo lugar.",
    },
  ],
  highlights: {
    eyebrow: "Decisões fora das capturas",
    heading: "Durante a viagem, a atenção é da estrada.",
    items: [
      {
        title: "Navegação passo a passo",
        text: "No modo navegação, o mapa ocupa a tela. Uma faixa no topo mostra a próxima manobra e a distância, a instrução é falada em português e o rodapé traz tempo, distância restante e horário de chegada. Ao chegar ao destino, a viagem termina sozinha.",
      },
      {
        title: "Sequência de dias",
        text: "Um dia só conta com movimento real: uma viagem concluída de pelo menos 1 km; check-in sozinho não vale. A sequência zera se for quebrada, mas os marcos já conquistados nunca são perdidos.",
      },
      {
        title: "Viagem sem internet",
        text: "Se a conexão cai, os pontos do GPS ficam salvos no aparelho e são enviados depois. “Finalizar” fecha a viagem na hora, com uma estimativa local que se ajusta quando a rede volta, sem deixar a pessoa presa esperando sinal.",
      },
    ],
  },
  outcome: {
    eyebrow: "Estágio e limite da evidência",
    heading: "Um produto em teste, construído de ponta a ponta.",
    paragraphs: [
      "O Lá Vamos Nós está em testes no Android, com navegação, carteira, desafios e sequência funcionando de ponta a ponta. Desenhei a experiência e a interface e desenvolvi o app e o backend.",
      "As capturas acima foram feitas no app instalado em um Android, na versão de testes. Na Viagem ao vivo, o endereço e os nomes das ruas foram borrados para preservar a localização. O app ainda não está publicado nas lojas, e este recorte não inclui pesquisa com usuários, testes de usabilidade nem indicadores de uso.",
    ],
  },
};
