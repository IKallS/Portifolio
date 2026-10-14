// Trilha do portfólio tocada pelo player oficial do Spotify (Embed iFrame API): o áudio não é hospedado aqui.
// Quem não está logado no Spotify ouve a prévia da faixa, que volta ao início sozinha.
// A faixa só começa quando o visitante aperta play.

export const track = {
  title: "Tadow",
  artist: "Masego & FKJ",
  uri: "spotify:track:3tsyvCHCbKdQMrJvgvGLq0",
  url: "https://open.spotify.com/track/3tsyvCHCbKdQMrJvgvGLq0",
  cover: "https://i.scdn.co/image/ab67616d00001e02aabe49311bf31b77bb4d9c29",
};

interface Controller {
  play(): void;
  pause(): void;
  resume(): void;
  seek(seconds: number): void;
  addListener(event: "ready", callback: () => void): void;
  addListener(event: "playback_update", callback: (event: { data: { isPaused: boolean; isBuffering: boolean; position: number; duration: number } }) => void): void;
}

interface IFrameAPI {
  createController(element: HTMLElement, options: { uri: string; width?: string | number; height?: string | number }, callback: (controller: Controller) => void): void;
}

declare global {
  interface Window { onSpotifyIframeApiReady?: (api: IFrameAPI) => void }
}

type Listener = () => void;

class TrackPlayer {
  private controller: Controller | null = null;
  private listeners = new Set<Listener>();
  private mounted = false;
  private started = false;
  private userPaused = false;
  status: "loading" | "ready" | "unavailable" = "loading";
  playing = false;
  position = 0;
  duration = 0;

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  };

  private emit() { this.listeners.forEach((listener) => listener()); }

  mount(element: HTMLElement) {
    if (this.mounted) return;
    this.mounted = true;
    // O Spotify troca o elemento pelo iframe; usamos um filho próprio para não mexer no nó do React.
    const host = document.createElement("div");
    element.appendChild(host);
    window.onSpotifyIframeApiReady = (api) => {
      api.createController(host, { uri: track.uri, width: "100%", height: 80 }, (controller) => {
        this.controller = controller;
        // O Spotify cria o iframe com loading="lazy"; no rodapé ele só carregaria ao rolar até o fim.
        element.querySelector("iframe")?.setAttribute("loading", "eager");
        controller.addListener("ready", () => {
          this.status = "ready";
          this.emit();
          if (this.started) controller.play();
        });
        controller.addListener("playback_update", ({ data }) => this.onUpdate(data));
      });
    };
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    script.onerror = () => this.fail();
    document.head.appendChild(script);
    window.setTimeout(() => { if (this.status === "loading") this.fail(); }, 15000);
  }

  private fail() {
    this.status = "unavailable";
    this.playing = false;
    this.emit();
  }

  private onUpdate(data: { isPaused: boolean; isBuffering: boolean; position: number; duration: number }) {
    this.position = data.position / 1000;
    this.duration = data.duration / 1000;
    this.playing = !data.isPaused;
    // No fim da prévia (ou da faixa) o Spotify para em position === duration: recomeça do início.
    if (this.started && !this.userPaused && data.duration > 0 && data.position >= data.duration) {
      this.position = 0;
      this.controller?.play();
    }
    this.emit();
  }

  start() {
    if (this.started) return;
    this.started = true;
    this.userPaused = false;
    this.controller?.play();
    this.emit();
  }

  toggle() {
    if (!this.started) return this.start();
    if (!this.controller) return;
    if (this.playing) {
      this.userPaused = true;
      this.controller.pause();
    } else {
      this.userPaused = false;
      this.controller.resume();
    }
  }

  seek(seconds: number) {
    if (!this.controller) return;
    this.position = Math.min(Math.max(seconds, 0), this.duration || seconds);
    this.controller.seek(this.position);
    this.emit();
  }

  skip(seconds: number) { this.seek(this.position + seconds); }
}

export const player = new TrackPlayer();
