import { createContext, Dispatch } from "react";
import { PlayerActions } from "../hooks/player-actions";
import { initPlayerState, PlayerState } from "../hooks/audio-player-hook";

export const PlayerContext = createContext<{
  playerState: PlayerState;
  dispatch: Dispatch<PlayerActions>;
}>({
  playerState: initPlayerState,
  dispatch: () => undefined,
});
