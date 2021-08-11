import { useCallback, useEffect, useReducer, useState } from "react";
import { Song } from "../models/Song";
import { ActionType, PlayerActions } from "./action";

export interface PlayerState {
  songs: Song[];
  currentSong: number;
  readyToPlay: boolean;
  isPlaying: boolean;
  progress: number;
}

export const initPlayerState: PlayerState = {
  songs: [],
  currentSong: 0,
  readyToPlay: false,
  isPlaying: false,
  progress: 0,
};

const playerReducer = (
  state: PlayerState,
  action: PlayerActions
): PlayerState => {
  switch (action.type) {
    case ActionType.SetSongs:
      return {
        ...state,
        songs: action.payload,
      };
    case ActionType.CurrentSong:
      return {
        ...state,
        currentSong: action.payload,
      };
    case ActionType.ReadyToPlay:
      return {
        ...state,
        readyToPlay: action.payload,
      };
    case ActionType.PlayPause:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case ActionType.setProgress:
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
};

export const usePlayer = () => {
  const [playerState, dispatch] = useReducer(playerReducer, initPlayerState);

  const { currentSong, isPlaying, progress, songs } = playerState;

  // state to handle  audio
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // function to handle play and pause
  const PlayPause = useCallback((): void => {
    if (isPlaying) {
      audio?.play();
    }

    if (!isPlaying) {
      audio?.pause();
    }
  }, [isPlaying, audio]);

  // effect trigger first load && when song is changed by user
  useEffect(() => {
    if (songs.length === 0) return;
    const songToPlay = songs[currentSong].source;

    setAudio(new Audio(songToPlay));

    dispatch({ type: ActionType.ReadyToPlay, payload: true });

    // cleanup function to remove current song from state
    return () => {
      setAudio((currSong) => {
        currSong?.pause();
        return null;
      });
      dispatch({ type: ActionType.ReadyToPlay, payload: false });
    };
  }, [currentSong, songs]);

  // trigger to handle play and pause if user click the btn
  useEffect(() => {
    PlayPause();
  }, [PlayPause]);

  return { playerState, dispatch };
};
