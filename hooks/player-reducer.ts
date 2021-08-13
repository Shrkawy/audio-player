import { PlayerState } from "./audio-player-hook";
import { ActionType, PlayerActions } from "./player-actions";

export const playerReducer = (
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
    case ActionType.SongFullTime:
      return {
        ...state,
        songFullTime: action.payload,
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
    case ActionType.SetProgress:
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
};
