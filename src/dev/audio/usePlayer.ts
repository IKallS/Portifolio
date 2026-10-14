import { useSyncExternalStore } from "react";
import { player } from "./spotify";

function usePlayerValue<T>(get: () => T) {
  return useSyncExternalStore(player.subscribe, get, get);
}

export const usePlaying = () => usePlayerValue(() => player.playing);
export const usePosition = () => usePlayerValue(() => player.position);
export const useDuration = () => usePlayerValue(() => player.duration);
export const useStatus = () => usePlayerValue(() => player.status);

export function formatTime(seconds: number) {
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}
