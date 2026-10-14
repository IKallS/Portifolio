import { usePlaying } from "../../audio/usePlayer";

export function Equalizer() {
  const playing = usePlaying();
  return <span className={`sp-eq ${playing ? "is-playing" : ""}`} aria-hidden="true"><i /><i /><i /><i /></span>;
}
