import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../context/player-context";
import { ActionType } from "../hooks/player-actions";
import { Left, Pause, Play, Right } from "./icons";

import styles from "../styles/AudioPlayer.module.css";
import Button from "./Button";

const AudioControllers = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioState, setAudioState] = useState({ isPlaying: false });
  const {
    playerState: { songs, currentSong },
    dispatch,
  } = useContext(PlayerContext);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("play", () => {
        setAudioState((curr) => ({
          ...curr,
          isPlaying: true,
        }));
      });
      audio.addEventListener("pause", () => {
        setAudioState((curr) => ({
          ...curr,
          isPlaying: false,
        }));
      });
    }

    return () => {
      audio?.removeEventListener("play", () => {
        setAudioState((curr) => ({
          ...curr,
          isPlaying: true,
        }));
      });
      audio?.removeEventListener("pause", () => {
        setAudioState((curr) => ({
          ...curr,
          isPlaying: false,
        }));
      });
    };
  }, []);

  useEffect(() => {
    if (audioState.isPlaying) {
      audioRef.current?.play();
    }
  }, [currentSong, audioState.isPlaying]);

  const toNextSong = (): void => {
    const songsIndex: number = songs.length;

    if (currentSong + 1 === songsIndex) {
      dispatch({ type: ActionType.CurrentSong, payload: 0 });
    } else {
      dispatch({ type: ActionType.CurrentSong, payload: currentSong + 1 });
    }
  };

  const toPrevSong = (): void => {
    const songsIndex: number = songs.length;

    if (currentSong === 0) {
      dispatch({ type: ActionType.CurrentSong, payload: songsIndex - 1 });
    } else {
      dispatch({ type: ActionType.CurrentSong, payload: currentSong - 1 });
    }
  };

  const handlePlayPause = (): void => {
    audioState.isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
  };

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
      </div>
    </div>
  );
};

export default AudioControllers;
