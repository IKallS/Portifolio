import { Pause, Play } from "lucide-react";
import { usePlaying, useStatus } from "../../audio/usePlayer";
import { player, track } from "../../audio/spotify";

export function PlayButton({ className = "" }: { className?: string }) {
  const playing = usePlaying();
  const status = useStatus();

  // Sem acesso ao Spotify (bloqueador, rede), o botão leva para a música lá.
  if (status === "unavailable") {
    return <a className={`sp-play ${className}`} href={track.url} target="_blank" rel="noopener noreferrer" aria-label="Ouvir Tadow no Spotify"><Play aria-hidden="true" /></a>;
  }
  return (
    <button
      type="button"
      className={`sp-play ${className}`}
      aria-label={playing ? "Pausar música" : "Tocar música"}
      aria-pressed={playing}
      onClick={() => player.toggle()}
    >
      {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
    </button>
  );
}
