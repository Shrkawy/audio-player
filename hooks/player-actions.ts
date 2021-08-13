import { Song } from "../models/Song";

export enum ActionType {
  PlayPause,
  SetSongs,
  CurrentSong,
  SongFullTime,
  SetProgress,
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
  type: ActionType.SetProgress;
  payload: number | undefined;
}

export interface SongFullTime {
  type: ActionType.SongFullTime;
  payload: number | undefined;
}

export type PlayerActions =
  | Songs
  | CurrentSong
  | SongFullTime
  | ReadyToPlay
  | PlayPause
  | SetProgress;
