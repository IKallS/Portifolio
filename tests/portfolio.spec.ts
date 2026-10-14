import { expect, test } from "@playwright/test";

// O player do Spotify é trocado por um dublê: os testes não dependem da rede nem do login de ninguém.
const spotifyMock = `(() => {
  const api = { createController(element, options, callback) {
    const frame = document.createElement("iframe");
    frame.title = "Spotify";
    element.replaceWith(frame);
    const listeners = {};
    let paused = true, position = 0, timer;
    const emit = (name, data) => (listeners[name] || []).forEach((listener) => listener(data));
    const update = () => emit("playback_update", { data: { isPaused: paused, isBuffering: false, position, duration: 30000 } });
    const controller = {
      addListener: (name, listener) => (listeners[name] ||= []).push(listener),
      play() { position = 0; this.resume(); },
      resume() { paused = false; clearInterval(timer); timer = setInterval(() => { position += 250; update(); }, 250); update(); },
      pause() { paused = true; clearInterval(timer); update(); },
      seek(seconds) { position = seconds * 1000; update(); },
    };
    callback(controller);
    setTimeout(() => emit("ready"), 50);
  } };
  setTimeout(() => window.onSpotifyIframeApiReady(api), 0);
})();`;

test.beforeEach(async ({ page }) => {
  await page.route("https://open.spotify.com/embed/iframe-api/v1", (route) => route.fulfill({ contentType: "application/javascript", body: spotifyMock }));
  await page.route("https://i.scdn.co/**", (route) => route.fulfill({ status: 204 }));
});

test("a escolha inicial apresenta os dois caminhos em desktop e celular", async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("/");
    await expect(page).toHaveTitle(/Dev ou Design/);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Code or Frame?");
    await expect(page.getByText(/Em Kalyston Dev você encontra/)).toHaveCount(0);
    await expect(page.getByRole("link", { name: /Kalyston Dev/ })).toHaveAttribute("href", "./dev.html");
    await expect(page.getByRole("link", { name: /Kalyston Design/ })).toHaveAttribute("href", "./design.html");
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  }
  const keyboardPage = await page.context().newPage();
  await keyboardPage.goto("/");
  await keyboardPage.keyboard.press("Tab");
  await expect(keyboardPage.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();
  await keyboardPage.keyboard.press("Tab");
  await expect(keyboardPage.getByRole("link", { name: /Kalyston Dev/ })).toBeFocused();
  await keyboardPage.keyboard.press("Enter");
  await expect(keyboardPage).toHaveURL(/\/dev\.html$/);
  await expect(keyboardPage.getByRole("heading", { level: 1 })).toContainText("Kalyston");
});

test("a escolha divide a tela entre Dev e Design, cresce o lado em foco e respeita movimento reduzido", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const split = () => page.locator(".chooser").evaluate((element) => getComputedStyle(element).getPropertyValue("--split").trim());
  const dev = page.getByRole("link", { name: /Kalyston Dev/ });
  const design = page.getByRole("link", { name: /Kalyston Design/ });
  await expect(dev).toHaveCSS("background-color", "rgb(18, 18, 18)");
  await expect(design).toHaveCSS("background-color", "rgb(248, 247, 245)");
  await expect.poll(split).toBe("50%");
  await dev.hover();
  await expect.poll(split).toBe("58%");
  await design.hover();
  await expect.poll(split).toBe("42%");
  // Teclado também expande o lado focado.
  await page.mouse.move(720, 5);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(dev).toBeFocused();
  await expect.poll(split).toBe("58%");
  // Título e telas do Design não se sobrepõem.
  const boxes = await page.evaluate(() => {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector(".chooser-title h1 > span:last-child")!);
    return { title: range.getBoundingClientRect().right, screens: document.querySelector(".design-screens")!.getBoundingClientRect().left };
  });
  expect(boxes.title).toBeLessThan(boxes.screens);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  expect(await page.locator(".dev-vinyl").evaluate((element) => parseFloat(getComputedStyle(element).animationDuration))).toBeLessThanOrEqual(0.001);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("Dev apresenta projetos reais com stack, links e contato", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/dev.html");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page).toHaveTitle(/Kalyston Dev/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Kalyston Miranda");
  await expect(page.getByText("Do problema ao produto no ar.")).toBeAttached();
  await page.setViewportSize({ width: 1280, height: 850 });
  await expect(page.getByRole("navigation", { name: "Navegação Dev" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Navegação móvel Dev" })).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);

  const projects = page.locator("#projects .dev-project");
  await expect(projects).toHaveCount(6);
  for (const title of ["Lá Vamos Nós", "TMW Connect", "TMWPIX", "Dashboard de Cartão de Crédito", "Clipado · agentes de clipping", "Este portfólio"]) {
    await expect(page.locator("#projects").getByRole("heading", { name: title, exact: true })).toBeAttached();
  }
  const tmwConnect = page.locator("#projects").getByRole("button", { name: "TMW Connect", exact: true });
  await expect(tmwConnect).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("list", { name: "Stack de TMW Connect" })).toBeHidden();
  await tmwConnect.click();
  await expect(tmwConnect).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("list", { name: "Stack de TMW Connect" }).getByText("Fastify", { exact: true })).toBeVisible();
  await expect(page.locator("#projects").getByRole("link", { name: /App Store/ })).toHaveAttribute("href", "https://apps.apple.com/br/app/tmwconnect/id6758272461");
  await expect(page.locator("#projects").getByRole("link", { name: /Google Play/, includeHidden: true })).toHaveAttribute("href", "https://play.google.com/store/apps/details?id=com.tmwpix&hl=pt_BR");
  await expect(page.locator("#projects").getByRole("link", { name: /Código no GitHub/, includeHidden: true })).toHaveAttribute("href", "https://github.com/IKallS/Portifolio");
  await expect(page.locator("body").getByText(/maxiPago|CobrançasCC|Lovable|Whop/i)).toHaveCount(0);

  // A biblioteca lateral leva ao projeto e já abre os detalhes dele.
  await page.getByRole("list", { name: "Biblioteca de projetos" }).getByRole("link", { name: /TMWPIX/ }).click();
  await expect(page).toHaveURL(/#projeto-tmwpix$/);
  await expect(page.locator("#projects").getByRole("button", { name: "TMWPIX", exact: true })).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#projects").getByRole("link", { name: /Google Play/ })).toBeVisible();

  await page.locator("#projects").getByRole("button", { name: "Lá Vamos Nós", exact: true }).click();
  await page.locator("#projeto-la-vamos-nos").getByRole("link", { name: /Case de UX/ }).click();
  await expect(page).toHaveURL(/\/case-la-vamos-nos\.html$/);
  await page.goto("/dev.html");
  const career = page.locator("#career");
  await expect(career.getByRole("heading", { level: 3 })).toHaveText(["Desenvolvedor Full Stack Pleno", "Desenvolvedor Full Stack Júnior", "Estágio em Suporte Técnico"]);
  await expect(career.getByText("Tokenização de cartões, sem guardar dados sensíveis na aplicação")).toBeVisible();
  await expect(page.locator("#about").getByText("Tecnólogo em Análise e Desenvolvimento de Sistemas")).toBeAttached();
  await expect(page.locator("#skills").getByRole("heading", { name: "Pagamentos e ERP" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText("99569");
  await expect(page.locator("#contact").getByRole("link", { name: /Enviar e-mail/ })).toHaveAttribute("href", "mailto:mirandakalyston@gmail.com");
  await expect(page.locator("#contact").getByRole("link", { name: /Abrir LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/kalystonmiranda/");
  await expect(page.locator("form")).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Kalyston Miranda");
  await page.getByRole("link", { name: "Escolher portfólio" }).click();
  await expect(page).toHaveURL(/\/index\.html$/);
  await expect(page.getByRole("link", { name: /Kalyston Design/ })).toBeVisible();
});

test("Design abre como lista de projetos sem o case completo", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/design.html");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page).toHaveTitle(/Kalyston Design/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Experiências digitais, do fluxo à interface.");
  const projects = page.locator("#projetos");
  await expect(projects.getByRole("listitem")).toHaveCount(4);
  await expect(projects.getByRole("heading", { name: "TMW Connect" })).toBeVisible();
  await expect(projects.getByRole("heading", { name: "Lá Vamos Nós" })).toBeAttached();
  await expect(projects.getByRole("heading", { name: "TMWPIX" })).toBeAttached();
  await expect(projects.getByRole("heading", { name: "Dashboard de Cartão de Crédito" })).toBeAttached();
  await expect(projects.getByText("Problema", { exact: true })).toHaveCount(4);
  await expect(projects.getByText("Atuação", { exact: true })).toHaveCount(4);
  await expect(projects.getByRole("img", { name: /Tela pública de Início do TMW Connect/ })).toBeVisible();
  await expect(page.locator("#case-tmw-connect")).toHaveCount(0);
  await expect(page.getByText(/Captura oficial pública do TMW Connect/)).toHaveCount(0);
  await expect(page.getByText(/em breve/i)).toHaveCount(0);
  await page.setViewportSize({ width: 1280, height: 850 });
  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  await expect(nav).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  for (const href of await nav.getByRole("link").evaluateAll((links) => links.map((link) => link.getAttribute("href")))) {
    await expect(page.locator(href!)).toHaveCount(1);
  }
  await nav.getByRole("link", { name: "Projetos" }).click();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(page.getByRole("link", { name: /Enviar e-mail/ })).toHaveAttribute("href", "mailto:mirandakalyston@gmail.com");
  await expect(page.getByRole("link", { name: /Abrir LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/kalystonmiranda/");
  await page.getByRole("link", { name: "Escolher portfólio" }).first().click();
  await expect(page).toHaveURL(/\/index\.html$/);
});

test("o cartão TMW abre o case em URL própria, recarregável e com retorno", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/design.html");
  await page.getByRole("link", { name: /Abrir case TMW Connect/ }).click();
  await expect(page).toHaveURL(/\/case-tmw-connect\.html$/);
  await expect(page).toHaveTitle(/TMW Connect — Case de UX\/UI/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Autoatendimento que ajuda/);
  for (const name of ["Início", "Faturas", "Contratos", "Suporte"]) {
    const image = page.locator("#case-tmw-connect").getByRole("img", { name: new RegExp("Tela pública de " + name) });
    await expect(image).toHaveCount(1);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.getByText(/Captura oficial pública do TMW Connect/)).toHaveCount(4);
  await expect(page.getByText(/Nota editorial/)).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Ver aplicativo e capturas originais na App Store/ })).toHaveAttribute("href", "https://apps.apple.com/br/app/tmwconnect/id6758272461");
  await expect(page.getByRole("link", { name: /Enviar e-mail/ })).toHaveAttribute("href", "mailto:mirandakalyston@gmail.com");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);

  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Autoatendimento que ajuda/);
  await page.getByRole("navigation", { name: "Caminho" }).getByRole("link", { name: /Voltar aos projetos/ }).click();
  await expect(page).toHaveURL(/\/design\.html#projetos$/);
  await expect(page.locator("#projetos").getByRole("heading", { name: "TMW Connect" })).toBeInViewport();

  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/case-tmw-connect.html");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.getByRole("navigation", { name: "Continuar navegando" }).getByRole("link", { name: /Escolher entre Dev e Design/ }).click();
  await expect(page).toHaveURL(/\/index\.html$/);
});

test("o cartão Lá Vamos Nós abre o próprio case, sem citar dados de negócio", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/design.html");
  await page.getByRole("link", { name: /Abrir case Lá Vamos Nós/ }).click();
  await expect(page).toHaveURL(/\/case-la-vamos-nos\.html$/);
  await expect(page).toHaveTitle(/Lá Vamos Nós — Case de UX\/UI/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Cada viagem vira progresso visível/);
  for (const name of ["Explorar", "Viagem ao vivo", "Ranking", "Carteira"]) {
    const image = page.locator("#case-la-vamos-nos").getByRole("img", { name: new RegExp("Tela (inicial )?" + name) });
    await expect(image).toHaveCount(1);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.getByText(/Captura do app no Android · versão de testes/)).toHaveCount(4);
  await expect(page.getByRole("heading", { name: "Navegação passo a passo" })).toBeVisible();
  await expect(page.getByText(/Amaro Marques|Charqueadas/)).toHaveCount(0);
  await expect(page.getByText(/Lovable|take rate|Asaas|CPV/i)).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Cada viagem vira progresso visível/);
  await page.getByRole("navigation", { name: "Caminho" }).getByRole("link", { name: /Voltar aos projetos/ }).click();
  await expect(page).toHaveURL(/\/design\.html#projetos$/);
});

test("o cartão TMWPIX abre o case com telas de celular e de TV", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/design.html");
  await page.getByRole("link", { name: /Abrir case TMWPIX/ }).click();
  await expect(page).toHaveURL(/\/case-tmwpix\.html$/);
  await expect(page).toHaveTitle(/TMWPIX — Case de UX\/UI/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/TV ao vivo e streaming/);
  const images = page.locator("#case-tmwpix .screen-figure img");
  await expect(images).toHaveCount(6);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.locator(".screen-row-wide")).toHaveCount(2);
  await expect(page.getByText(/Captura oficial pública do TMWPIX · Google Play/)).toHaveCount(6);
  await expect(page.getByRole("link", { name: /Ver aplicativo e capturas originais na Google Play/ })).toHaveAttribute("href", "https://play.google.com/store/apps/details?id=com.tmwpix&hl=pt_BR");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.setViewportSize({ width: 320, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.reload();
  await page.getByRole("navigation", { name: "Caminho" }).getByRole("link", { name: /Voltar aos projetos/ }).click();
  await expect(page).toHaveURL(/\/design\.html#projetos$/);
});

test("o cartão Dashboard de Cartão de Crédito abre o case do painel com dados fictícios", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/design.html");
  await page.getByRole("link", { name: /Abrir case Dashboard de Cartão de Crédito/ }).click();
  await expect(page).toHaveURL(/\/case-dashboard-cartao-credito\.html$/);
  await expect(page).toHaveTitle(/Dashboard de Cartão de Crédito — Case de UX\/UI/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Cobrança recorrente no cartão/);
  const images = page.locator("#case-dashboard-cartao-credito .screen-figure img");
  await expect(images).toHaveCount(5);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.locator(".screen-row-wide")).toHaveCount(5);
  await expect(page.getByText(/Painel gerado com dados fictícios/)).toHaveCount(5);
  await expect(page.getByText(/maxiPago|tokeniza|CobrançasCC/i)).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.setViewportSize({ width: 320, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.reload();
  await page.getByRole("navigation", { name: "Caminho" }).getByRole("link", { name: /Voltar aos projetos/ }).click();
  await expect(page).toHaveURL(/\/design\.html#projetos$/);
});

test("no case, o menu leva às seções da página inicial Design", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 850 });
  await page.goto("/case-tmw-connect.html");
  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  for (const href of await nav.getByRole("link").evaluateAll((links) => links.map((link) => link.getAttribute("href")))) {
    if (href!.startsWith("#")) await expect(page.locator(href!)).toHaveCount(1);
    else expect(href).toMatch(/^\.\/design\.html#(projetos|sobre|atuacao)$/);
  }
  await nav.getByRole("link", { name: "Sobre" }).click();
  await expect(page).toHaveURL(/\/design\.html#sobre$/);
  await expect(page.locator("#sobre")).toBeInViewport();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/case-tmw-connect.html");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link", { name: "Projetos" }).click();
  await expect(page).toHaveURL(/\/design\.html#projetos$/);
});

test("teclado, menu móvel e movimento reduzido mantêm os caminhos utilizáveis", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  const transition = await page.getByRole("link", { name: /Kalyston Design/ }).evaluate((element) => parseFloat(getComputedStyle(element).transitionDuration));
  expect(transition).toBeLessThanOrEqual(0.001);
  await page.getByRole("link", { name: /Kalyston Design/ }).click();
  await expect(page.locator("#projetos").getByRole("heading", { name: "TMW Connect" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link", { name: "Escolher portfólio" })).toBeVisible();
  await page.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link", { name: "Escolher portfólio" }).click();
  await page.getByRole("link", { name: /Kalyston Dev/ }).click();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Kalyston Miranda");
  await page.getByRole("navigation", { name: "Navegação móvel Dev" }).getByRole("link", { name: "Projetos" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole("heading", { name: "Populares" })).toBeInViewport();
});

test("Dev permite pular ao conteúdo e as abas do celular focam a seção escolhida", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/dev.html");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#dev-main$/);
  await expect(page.locator("#dev-main")).toBeFocused();

  const tabs = page.getByRole("navigation", { name: "Navegação móvel Dev" });
  await expect(tabs).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Navegação Dev" })).toBeHidden();
  await tabs.getByRole("link", { name: "Projetos" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("#projects")).toBeFocused();
  await expect(page.getByRole("heading", { name: "Populares" })).toBeInViewport();
  // O título não fica escondido atrás da barra de cima, nem o fim da página atrás do player e das abas.
  const heading = await page.getByRole("heading", { name: "Populares" }).boundingBox();
  expect(heading!.y).toBeGreaterThanOrEqual(64);
  await tabs.getByRole("link", { name: "Contato" }).click();
  await expect(page.locator("#contact")).toBeFocused();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const note = await page.locator(".sp-footer-note").boundingBox();
  const player = await page.getByRole("region", { name: "Player de música" }).boundingBox();
  expect(note!.y + note!.height).toBeLessThanOrEqual(player!.y);
});

test("Design mantém Escape, foco na seção e o limite móvel de 900 pixels", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 844 });
  await page.goto("/design.html");
  const toggle = page.getByRole("button", { name: "Abrir menu" });
  await expect(toggle).toBeVisible();
  await expect(toggle).not.toHaveAttribute("aria-controls", "mobile-navigation");
  await toggle.click();
  await expect(page.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-controls", "mobile-navigation");
  await expect(page.getByRole("navigation", { name: "Navegação móvel" })).toBeVisible();

  await page.setViewportSize({ width: 901, height: 844 });
  await expect(page.getByRole("navigation", { name: "Navegação principal" })).toBeVisible();
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  await page.setViewportSize({ width: 900, height: 844 });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.click();
  await page.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link", { name: "Projetos" }).focus();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(page.getByRole("navigation", { name: "Navegação móvel" })).toHaveCount(0);

  await toggle.click();
  await page.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link", { name: "Contato" }).click();
  await expect(page).toHaveURL(/#contato$/);
  await expect(page.locator("#contato")).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("Dev só toca Tadow no botão de play e tem parallax só sem movimento reduzido", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 850 });
  await page.goto("/dev.html");
  const player = page.getByRole("region", { name: "Player de música" });
  const position = player.getByRole("slider", { name: "Posição da música" });
  await expect(player.getByText("Tadow", { exact: true })).toBeVisible();
  await expect(player.getByRole("link", { name: /Ouvir completa no Spotify/ })).toHaveAttribute("href", /open\.spotify\.com\/track\//);
  await expect(page.locator(".sp-footer-track iframe")).toHaveCount(1);
  await expect(player.getByText(/qualquer lugar/)).toHaveCount(0);
  await expect(position).toHaveValue("0");

  // Clicar fora do play não toca nada; só o botão de play começa a música.
  await page.getByRole("heading", { level: 1 }).click();
  await page.waitForTimeout(600);
  await expect(position).toHaveValue("0");
  await expect(page.locator("#hero")).not.toHaveClass(/is-playing/);
  await page.locator("#hero").getByRole("button", { name: "Tocar música" }).click();
  await expect(player.getByRole("button", { name: "Pausar música" })).toBeVisible();
  await expect(page.locator("#hero")).toHaveClass(/is-playing/);
  await expect.poll(async () => Number(await position.inputValue())).toBeGreaterThan(0.4);

  await player.getByRole("button", { name: "Avançar 10 segundos" }).click();
  await expect.poll(async () => Number(await position.inputValue())).toBeGreaterThan(10);
  await player.getByRole("button", { name: "Pausar música" }).click();
  const paused = await position.inputValue();
  await page.waitForTimeout(600);
  await expect(position).toHaveValue(paused);
  await expect(page.locator("#hero").getByRole("button", { name: "Tocar música" })).toBeVisible();

  // Biblioteca com logos e filtro.
  const library = page.getByRole("list", { name: "Biblioteca de projetos" });
  await expect(library.locator("img")).toHaveCount(6);
  await page.getByRole("group", { name: "Filtrar biblioteca" }).getByRole("button", { name: "IA" }).click();
  await expect(library.getByRole("listitem")).toHaveCount(1);
  await expect(library).toContainText("Clipado");

  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => Number(document.querySelector<HTMLElement>("#hero")!.style.getPropertyValue("--sy")))).toBeGreaterThan(0);
  await expect(page.locator(".sp-topbar")).toHaveClass(/is-solid/);
  await page.locator("#about").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-lyric].is-sung").first()).toBeAttached();
  expect(await page.locator("[data-lyric]:not(.is-sung)").count()).toBeGreaterThan(0);
  expect(await page.locator(".sp-showcase").evaluate((element) => element.style.getPropertyValue("--p"))).not.toBe("");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.evaluate(() => document.querySelector<HTMLElement>("#hero")!.style.getPropertyValue("--sy"))).toBe("");
  await expect(page.locator("[data-lyric]:not(.is-sung)")).toHaveCount(0);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");

  // Apertar o play direto também começa a música (o primeiro toque não vira pausa).
  const direct = await page.context().newPage();
  await direct.goto("/dev.html");
  await expect(direct.locator(".sp-footer-track iframe")).toHaveCount(1);
  await direct.locator("#hero").getByRole("button", { name: "Tocar música" }).click();
  await expect(direct.locator("#hero").getByRole("button", { name: "Pausar música" })).toBeVisible();
});

test("Dev: o parallax segue a rolagem com inércia e as seções aparecem ao entrar na tela", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 850 });
  await page.goto("/dev.html");
  // As telas dos apps no topo aparecem inteiras, sem corte pela borda do banner.
  for (const width of [1280, 1024, 390]) {
    await page.setViewportSize({ width, height: 850 });
    await page.waitForTimeout(1500);
    const outside = await page.evaluate(() => {
      const banner = document.querySelector(".sp-hero-banner")!.getBoundingClientRect();
      return [...document.querySelectorAll(".sp-hero-phones img")].some((img) => {
        const box = img.getBoundingClientRect();
        return box.top < banner.top || box.bottom > banner.bottom;
      });
    });
    expect(outside).toBe(false);
  }
  await page.setViewportSize({ width: 1280, height: 850 });
  await expect(page.locator("html")).toHaveClass(/sp-motion/);
  const sy = () => page.evaluate(() => Number(document.querySelector<HTMLElement>("#hero")!.style.getPropertyValue("--sy")));
  const career = page.locator("#career");
  await expect(page.locator("#projects")).toHaveClass(/is-in/);
  await expect(career).not.toHaveClass(/is-in/);
  await expect(career.locator(".sp-era").first()).toHaveCSS("opacity", "0");

  await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
  // Logo depois do salto a camada ainda está a caminho; em seguida assenta exatamente na rolagem.
  expect(await sy()).toBeLessThan(300);
  await expect.poll(sy).toBe(300);
  await career.evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
  await expect(career).toHaveClass(/is-in/);
  await expect(career.locator(".sp-era").first()).toHaveCSS("opacity", "1");
  await expect(career.locator(".sp-era-disc").first()).toHaveCSS("translate", "45%");
  await expect(page.locator("#skills .sp-genre-card")).toHaveCount(6);

  // Reverso: passando da seção ela recolhe por cima; voltando, entra de novo; subindo até o topo, recolhe por baixo.
  await page.locator("#contact").evaluate((element) => element.scrollIntoView({ behavior: "instant", block: "end" }));
  await expect(career).not.toHaveClass(/is-in/);
  await expect(career).toHaveClass(/from-above/);
  await career.evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
  await expect(career).toHaveClass(/is-in/);
  await expect(career.locator(".sp-era-disc").first()).toHaveCSS("translate", "45%");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(career).not.toHaveClass(/is-in/);
  await expect(career).not.toHaveClass(/from-above/);
  await expect(career.locator(".sp-era").first()).toHaveCSS("opacity", "0");
  await expect(career.locator(".sp-era-disc").first()).toHaveCSS("translate", "0px");
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
  await expect.poll(() => page.locator(".sp-topbar").evaluate((element) => element.style.getPropertyValue("--bar"))).toBe("0.625");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/sp-motion/);
  await expect(page.locator("#career .sp-era").first()).toHaveCSS("opacity", "1");
  await expect(page.locator("#skills h2")).toHaveCSS("opacity", "1");
});

test("Design: canvas do Figma, cursor colaborativo, parallax e revelação nos dois sentidos", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/design.html");
  await expect(page.locator("html")).toHaveClass(/dz-motion/);
  await expect(page.locator(".dz-canvas")).toHaveCount(1);
  // Etiqueta de medidas com o tamanho real do título selecionado.
  const size = await page.locator("#hero-title").evaluate((element) => `${Math.round(element.offsetWidth)} × ${Math.round(element.offsetHeight)}`);
  await expect(page.locator(".dz-frame b")).toHaveText(size);
  await expect(page.locator(".dz-cursor-hero")).toBeVisible();
  await expect(page.locator(".dz-device")).toHaveCount(2);

  // Grade e telas andam com a rolagem; a captura do cartão se move dentro dele.
  const card = page.locator("#projetos li").nth(1);
  await expect(card).not.toHaveClass(/is-in/);
  await card.evaluate((element) => element.scrollIntoView({ behavior: "instant", block: "center" }));
  await expect(card).toHaveClass(/is-in/);
  await expect(card).toHaveCSS("opacity", "1");
  await expect.poll(() => card.locator(".work-preview").evaluate((element) => element.style.getPropertyValue("--p"))).not.toBe("");
  await expect.poll(() => page.evaluate(() => document.documentElement.style.getPropertyValue("--grid-shift"))).not.toBe("0.00px");

  // Reverso: voltando ao topo, o cartão recolhe por baixo.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(card).not.toHaveClass(/is-in/);
  await expect(card).not.toHaveClass(/from-above/);

  // Contato: o cursor termina sobre o botão de e-mail.
  await page.locator("#contato").evaluate((element) => element.scrollIntoView({ behavior: "instant", block: "center" }));
  await expect(page.locator("#contato")).toHaveClass(/is-in/);
  await page.waitForTimeout(3000);
  const onButton = await page.evaluate(() => {
    const tip = document.querySelector(".dz-cursor-contact svg")!.getBoundingClientRect();
    const button = document.querySelector("#contato .button-primary")!.getBoundingClientRect();
    return tip.left > button.left && tip.left < button.right && tip.top > button.top && tip.top < button.bottom;
  });
  expect(onButton).toBe(true);

  // Movimento reduzido: sem cursores, tudo visível e parado.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/dz-motion/);
  await expect(page.locator(".dz-cursor-hero")).toBeHidden();
  await expect(page.locator("#projetos li").first()).toHaveCSS("opacity", "1");

  // Os cases não ganham cursor nem o canvas.
  await page.goto("/case-tmw-connect.html");
  await expect(page.locator(".dz-cursor, .dz-canvas")).toHaveCount(0);
});
