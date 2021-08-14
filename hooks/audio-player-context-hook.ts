import { useReducer } from "react";
import { Song } from "../models/Song";
import { playerReducer } from "./player-reducer";

export interface PlayerState {
  songs: Song[];
  currentSong: number;
}

const initPlayerState: PlayerState = {
  songs: [],
  currentSong: 0,
};

export const usePlayer = () => {
  const [playerState, dispatch] = useReducer(playerReducer, initPlayerState);

  return { playerState, dispatch };
};
