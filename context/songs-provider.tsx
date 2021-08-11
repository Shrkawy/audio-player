import { ReactNode } from "react";
import { usePlayer } from "../hooks/audio-player-hook";
import { PlayerContext } from "./player-context";

interface SongsProviderProps {
  children: ReactNode;
}

const SongsProvider = ({ children }: SongsProviderProps) => {
  const { playerState, dispatch } = usePlayer();
  return (
    <PlayerContext.Provider value={{ playerState, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default SongsProvider;
