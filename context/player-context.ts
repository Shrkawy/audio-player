import { createContext, Dispatch } from "react";
import { PlayerActions } from "../hooks/action";
import { initPlayerState, PlayerState } from "../hooks/audio-player-hook";

export const PlayerContext = createContext<{
  playerState: PlayerState;
  dispatch: Dispatch<PlayerActions>;
}>({
  playerState: initPlayerState,
  dispatch: () => undefined,
});
