import type { CaseData } from "./types";

const tv = { width: 1600, height: 900 };

export const tmwpix: CaseData = {
  slug: "tmwpix",
  pageTitle: "TMWPIX",
  eyebrow: "Case 03 · TMWPIX",
  title: "TV ao vivo e streaming no toque e no controle remoto.",
  intro: "Como organizei a experiência do TMWPIX, app de TV ao vivo, filmes, séries e rádios, para que a mesma estrutura funcione no celular e na TV.",
  meta: [
    { label: "Desafio", value: "Reunir canais ao vivo, guia, filmes, séries e rádios em uma navegação que funcione no toque e no controle remoto." },
    { label: "Minha atuação", value: "UX/UI das versões para celular e TV e implementação do aplicativo." },
    { label: "Entrega verificável", value: "Aplicativo publicado na Google Play, com versões para celular e TV." },
  ],
  story: {
    eyebrow: "Estrutura da experiência",
    heading: "As mesmas áreas em qualquer tela.",
    paragraphs: [
      "O catálogo mistura conteúdos com lógicas diferentes: canais ao vivo, que dependem do horário, e filmes e séries sob demanda, que a pessoa escolhe quando quiser. Organizei o app em áreas fixas — Início, Buscar, Canais, Filmes, Séries, Rádios e Guia — que aparecem no menu do celular e na barra superior da TV.",
      "Na tela inicial, priorizei retomar e assistir; nas áreas específicas, encontrar. Ao passar do celular para a TV, mantive a estrutura e adaptei a forma de navegar: toque e rolagem no celular, foco visível e fileiras horizontais no controle remoto.",
    ],
  },
  screenSize: { width: 720, height: 1503 },
  screenCaption: "Captura oficial pública do TMWPIX · Google Play",
  screens: [
    {
      title: "Início",
      image: "/cases/tmwpix/inicio.jpg",
      alt: "Tela Início do TMWPIX no celular com filme em destaque, botões Assistir, Minha lista e Gostei, e as seções Canais para você, Continuar assistindo e Minha lista",
      question: "O que eu assisto agora?",
      detail: "A tela abre com um destaque e as três ações principais: Assistir, Minha lista e Gostei. Logo abaixo vêm os canais ao vivo e “Continuar assistindo”, para quem volta ao app retomar sem procurar. As demais áreas ficam no menu.",
      principle: "Retomar e assistir antes de explorar.",
    },
    {
      title: "Canais",
      image: "/cases/tmwpix/canais.jpg",
      alt: "Tela de canais do TMWPIX no celular com alternância entre Início e Grade, prévia do canal PIXTV HD com botão Assistir e listas Canais para você, Aberto e Filmes e séries",
      question: "Como encontro um canal ao vivo?",
      detail: "A área de canais oferece duas formas de ver o mesmo conteúdo: Início, com a prévia do canal no topo e listas por tipo, e Grade, para quem já sabe o que procura. Cada canal mostra número e logotipo, como no controle remoto.",
      principle: "Duas formas de navegar, o mesmo catálogo.",
    },
    {
      title: "Guia",
      image: "/cases/tmwpix/guia.jpg",
      alt: "Guia de Programação do TMWPIX no celular com 47 canais, cada um com logotipo, nome e o programa que está no ar",
      question: "O que está passando agora?",
      detail: "No guia, cada canal mostra o programa no ar em uma linha, sem precisar abrir a grade completa. O total de canais aparece no topo, e um toque leva à programação do canal.",
      principle: "Responder “o que está passando” sem abrir a grade.",
    },
    {
      title: "Buscar",
      image: "/cases/tmwpix/buscar.jpg",
      alt: "Tela Buscar do TMWPIX no celular com campo Filmes, séries e mais e grade de categorias para explorar, como Ação, Animação, Comédia e Documentário",
      question: "E se eu não souber o que quero?",
      detail: "A busca começa pelo campo de texto e, logo abaixo, oferece categorias para explorar — Ação, Animação, Comédia, Documentário e outras — para quem chega sem um título em mente.",
      principle: "Buscar e explorar no mesmo lugar.",
    },
    {
      title: "TV · Canais",
      image: "/cases/tmwpix/tv-canais.jpg",
      alt: "Tela de canais do TMWPIX na TV com barra superior Buscar, Canais, Filmes, Séries, Rádios e EPG, destaque do programa ao vivo e fileiras de canais com selo Ao vivo",
      question: "Como levar a mesma estrutura para a TV?",
      detail: "Na TV, o menu vira uma barra superior com as mesmas áreas do celular. O programa ao vivo aparece em destaque com horário e botão Assistir, e os canais são organizados em fileiras horizontais com selo “Ao vivo”, adequadas à navegação pelo controle remoto.",
      principle: "Mesma estrutura, outro jeito de navegar.",
      size: tv,
    },
    {
      title: "TV · Guia",
      image: "/cases/tmwpix/tv-guia.jpg",
      alt: "Guia de Programação do TMWPIX na TV em duas colunas: lista de canais à esquerda com SBT RS HD em foco e, à direita, a programação do dia com o programa ao vivo destacado",
      question: "Como navegar no guia com o controle?",
      detail: "O guia da TV usa duas colunas: à esquerda, a lista de canais; à direita, a programação do dia do canal selecionado, com o programa ao vivo destacado. O item em foco ganha borda laranja, para que a pessoa saiba sempre onde está.",
      principle: "Foco sempre visível.",
      size: tv,
    },
  ],
  highlights: {
    eyebrow: "Outras decisões nas telas publicadas",
    heading: "Detalhes que acompanham a pessoa enquanto assiste.",
    items: [
      {
        title: "Rádios",
        text: "As estações aparecem em uma grade de logotipos, com indicação de quais estão no ar. Ao tocar uma rádio, um mini player fixo no rodapé mostra a estação e o controle de pausa.",
      },
      {
        title: "Player ao vivo",
        text: "Durante a transmissão, uma faixa mostra o canal, o programa atual com horário e o que vem a seguir, sem tirar a pessoa da imagem.",
      },
      {
        title: "Detalhe do filme",
        text: "Na TV, título, nota, ano e duração vêm no topo, com Assistir já em foco; a sinopse aparece resumida, com opção de ler mais.",
      },
    ],
  },
  outcome: {
    eyebrow: "Entrega e limite da evidência",
    heading: "Um app de streaming publicado, do celular à TV.",
    paragraphs: [
      "O TMWPIX está publicado na Google Play, com versões para celular e TV. Desenhei a experiência e a interface das duas versões e implementei o aplicativo.",
      "Este recorte usa as capturas oficiais da loja e explica as decisões visíveis nelas. Não inclui documentação de pesquisa, testes de usabilidade ou indicadores de uso. Pôsteres, imagens de programas e logotipos de canais pertencem aos respectivos detentores.",
    ],
    link: { href: "https://play.google.com/store/apps/details?id=com.tmwpix&hl=pt_BR", label: "Ver aplicativo e capturas originais na Google Play" },
  },
};
