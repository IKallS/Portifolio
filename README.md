# Portfólio Kalyston Miranda

Um único portfólio com duas versões, feito com Vite, React, TypeScript e Tailwind CSS. Cada página é uma entrada HTML estática (Vite multipágina), então todas as URLs abrem diretamente e aguentam refresh em qualquer hospedagem estática.

## Entradas

| URL | Conteúdo | Código |
|---|---|---|
| `/` (`index.html`) | Escolha entre Kalyston Dev e Kalyston Design | `src/chooser-main.tsx`, `src/chooser.css` |
| `/dev.html` | Portfólio de desenvolvimento (visual de player de música, com trilha pelo player do Spotify) | `src/dev/` |
| `/design.html` | Portfólio UX/UI: abertura, lista de projetos, sobre, atuação e contato | `src/main.tsx`, `src/App.tsx`, `src/style.css` |
| `/case-tmw-connect.html` | Case TMW Connect | `src/data/cases/tmwConnect.ts` |
| `/case-la-vamos-nos.html` | Case Lá Vamos Nós | `src/data/cases/laVamosNos.ts` |
| `/case-tmwpix.html` | Case TMWPIX (celular e TV) | `src/data/cases/tmwpix.ts` |
| `/case-dashboard-cartao-credito.html` | Case Dashboard de Cartão de Crédito (painel web interno) | `src/data/cases/dashboardCartaoCredito.ts` |

Todos os cases usam o mesmo componente (`src/components/sections/CaseStudy.tsx`) e a mesma página (`src/pages/CasePage.tsx`), carregados por `src/case-main.tsx`. Cada HTML de case indica qual conteúdo mostrar em `<div id="root" data-case="<slug>">`.

Imagens: `public/cases/tmw-connect/` (capturas públicas da App Store) `public/cases/la-vamos-nos/` (capturas reais do app no Android, versão de testes, com localização borrada) `public/cases/tmwpix/` (capturas públicas da Google Play) e `public/cases/dashboard-cartao-credito/` (painel interno renderizado com dados fictícios). Telas em paisagem, como as de TV, declaram `size` próprio e ganham layout largo.

## Como adicionar um novo case Design

1. Escreva o conteúdo em `src/data/cases/<nome>.ts` (tipo `CaseData`, veja os existentes) e registre-o em `src/data/cases/index.ts`.
2. Copie `case-la-vamos-nos.html` para `case-<slug>.html`, ajustando título, descrição e `data-case`.
3. Registre a entrada em `vite.config.ts` (`build.rollupOptions.input`).
4. Coloque as imagens em `public/cases/<slug>/`.
5. Acrescente o projeto em `src/data/designProjects.ts` com `published: true`. O cartão aparece sozinho na lista de `design.html`. Projetos sem conteúdo pronto ficam fora da lista (ou com `published: false`); não há cartões "em breve".
6. Acrescente um teste em `tests/portfolio.spec.ts` que abra a URL direta e recarregue.

## Comandos

```bash
npm ci
npm run dev        # desenvolvimento
npm run build      # typecheck + build em dist/
npm run lint
npm run test:e2e   # Playwright contra o build (preview na porta 4173)
```

Se já houver um servidor na porta 4173, o Playwright o reutiliza; encerre-o antes para testar o build atualizado.
