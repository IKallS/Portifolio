import type { CSSProperties } from "react";
import { ExternalLink, RotateCcw, RotateCw } from "lucide-react";
import { formatTime, useDuration, usePosition } from "../../audio/usePlayer";
import { player, track } from "../../audio/spotify";
import { Equalizer } from "./Equalizer";
import { PlayButton } from "./PlayButton";

export function PlayerBar() {
  const position = usePosition();
  const duration = useDuration();
  const fill = duration ? `${(position / duration) * 100}%` : "0%";

  return (
    <section className="sp-player" aria-label="Player de música">
      <div className="sp-now">
        <span className="sp-now-cover" aria-hidden="true">
          <img src={track.cover} alt="" />
          <Equalizer />
        </span>
        <span className="sp-now-text">
          <strong>{track.title}</strong>
          <small>{track.artist}</small>
        </span>
      </div>
      <div className="sp-controls">
        <div className="sp-buttons">
          <button type="button" className="sp-icon-button" aria-label="Voltar 10 segundos" onClick={() => player.skip(-10)}><RotateCcw aria-hidden="true" /></button>
          <PlayButton className="sp-play-bar" />
          <button type="button" className="sp-icon-button" aria-label="Avançar 10 segundos" onClick={() => player.skip(10)}><RotateCw aria-hidden="true" /></button>
        </div>
        <div className="sp-progress">
          <span>{formatTime(position)}</span>
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.5}
            value={Math.min(position, duration || 1)}
            style={{ "--fill": fill } as CSSProperties}
            aria-label="Posição da música"
            aria-valuetext={`${formatTime(position)} de ${formatTime(duration)}`}
            onChange={(event) => player.seek(Number(event.target.value))}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="sp-volume">
        <a className="sp-open" href={track.url} target="_blank" rel="noopener noreferrer">Ouvir completa no Spotify <ExternalLink aria-hidden="true" /></a>
      </div>
    </section>
  );
}
