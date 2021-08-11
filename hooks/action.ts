import { Song } from "../models/Song";

export enum ActionType {
  PlayPause,
  SetSongs,
  CurrentSong,
  setProgress,
  ReadyToPlay,
}

export interface Songs {
  type: ActionType.SetSongs;
  payload: Song[];
}

export interface CurrentSong {
  type: ActionType.CurrentSong;
  payload: number;
}

export interface ReadyToPlay {
  type: ActionType.ReadyToPlay;
  payload: boolean;
}

export interface PlayPause {
  type: ActionType.PlayPause;
  payload: boolean;
}

export interface SetProgress {
  type: ActionType.setProgress;
  payload: number;
}

export type PlayerActions =
  | Songs
  | CurrentSong
  | ReadyToPlay
  | PlayPause
  | SetProgress;
