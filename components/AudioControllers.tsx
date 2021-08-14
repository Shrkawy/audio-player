import { useContext, useRef } from "react";
import { PlayerContext } from "../context/player-context";
import { useControllers } from "../hooks/audio-controllers-hook";
import { Left, Pause, Play, Right } from "./icons";
import Button from "./Button";

import styles from "../styles/AudioPlayer.module.css";
import ProgressBar from "./ProgressBar";

const AudioControllers = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    playerState: { songs, currentSong },
  } = useContext(PlayerContext);

  const {
    audioState,
    handlePlayPause,
    toNextSong,
    toPrevSong,
    convertDuration,
  } = useControllers(audioRef);

  return (
    <div>
      <div className={styles.controllers}>
        <Button label="Previous" onClick={toPrevSong}>
          <Left />
        </Button>
        {audioState.isPlaying ? (
          <Button label="Pause" onClick={handlePlayPause}>
            <Pause />
          </Button>
        ) : (
          <Button label="Play" onClick={handlePlayPause}>
            <Play />
          </Button>
        )}
        <Button label="Next" onClick={toNextSong}>
          <Right />
        </Button>
        <audio src={songs[currentSong].source} ref={audioRef} />
        {convertDuration(audioState.duration)}
        <ProgressBar max={audioState.duration} value={audioState.currTime} />
        {convertDuration(audioState.currTime)}
      </div>
    </div>
  );
};

export default AudioControllers;
