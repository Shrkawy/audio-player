import { useContext } from "react";
import { PlayerContext } from "../context/player-context";
import { ActionType } from "../hooks/action";
import { Left, Pause, Play, Right } from "./icons";

const AudioControllers = () => {
  const {
    playerState: { songs, currentSong, readyToPlay, isPlaying },
    dispatch,
  } = useContext(PlayerContext);

  const toNextSong = (): void => {
    const songsIndex: number = songs.length;

    if (currentSong + 1 === songsIndex) {
      dispatch({ type: ActionType.CurrentSong, payload: 1 });
    } else {
      dispatch({ type: ActionType.CurrentSong, payload: currentSong + 1 });
    }
  };

  const toPrevSong = (): void => {
    const songsIndex: number = songs.length;

    if (currentSong + 1 === 1) {
      dispatch({ type: ActionType.CurrentSong, payload: songsIndex - 1 });
    } else {
      dispatch({ type: ActionType.CurrentSong, payload: currentSong - 1 });
    }
  };

  const handlePlay = (): void => {
    if (readyToPlay) dispatch({ type: ActionType.PlayPause, payload: true });
  };

  const handlePause = (): void => {
    if (readyToPlay) dispatch({ type: ActionType.PlayPause, payload: false });
  };

  return (
    <div>
      <div className="audio-controls">
        <button
          type="button"
          className="prev"
          aria-label="Previous"
          onClick={toPrevSong}
        >
          <Left />
        </button>
        {isPlaying ? (
          <button
            type="button"
            className="pause"
            aria-label="Pause"
            onClick={handlePause}
          >
            <Pause />
          </button>
        ) : (
          <button
            type="button"
            className="play"
            aria-label="Play"
            onClick={handlePlay}
          >
            <Play />
          </button>
        )}
        <button
          type="button"
          className="next"
          aria-label="Next"
          onClick={toNextSong}
        >
          <Right />
        </button>
      </div>
    </div>
  );
};

export default AudioControllers;
