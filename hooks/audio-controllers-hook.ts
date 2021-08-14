import { MutableRefObject, useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/player-context";
import { ActionType } from "./player-actions";

const initState = {
  isPlaying: false,
  canPlay: false,
  duration: 0,
  currTime: 0,
};

export const useControllers = (
  audioRef: MutableRefObject<HTMLAudioElement | null>
) => {
  const [audioState, setAudioState] = useState(initState);

  const {
    playerState: { songs, currentSong },
    dispatch,
  } = useContext(PlayerContext);

  useEffect(() => {
    const audio = audioRef.current;

    audio?.addEventListener("play", () => {
      setAudioState((curr) => ({ ...curr, isPlaying: true }));
    });
    audio?.addEventListener("pause", () => {
      setAudioState((curr) => ({ ...curr, isPlaying: false }));
    });
    audio?.addEventListener("loadeddata", () => {
      setAudioState((curr) => ({ ...curr, duration: audio.duration }));
      if (audio.readyState >= 3) {
        setAudioState((curr) => ({ ...curr, canPlay: true }));
      } else {
        setAudioState((curr) => ({ ...curr, canPlay: false }));
      }
    });

    audio?.addEventListener("timeupdate", () => {
      setAudioState((curr) => ({ ...curr, currTime: audio.currentTime }));
    });

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
      audio?.addEventListener("loadeddata", () => {
        if (audio.readyState >= 3) {
          setAudioState((curr) => ({ ...curr, canPlay: true }));
        } else {
          setAudioState((curr) => ({ ...curr, canPlay: false }));
        }
      });
      audio?.addEventListener("timeupdate", () => {
        setAudioState((curr) => ({ ...curr, currTime: audio.currentTime }));
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audioState.isPlaying && audio) {
      audio.play();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

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

  const convertDuration = (timeInSeconds: number): string => {
    const mins = Math.floor(timeInSeconds / 60);
    let secs: number | string = Math.floor(timeInSeconds % 60);

    if (secs < 10) {
      secs = `0${String(secs)}`;
    }

    return `${mins}:${secs}`;
  };

  return {
    handlePlayPause,
    toPrevSong,
    toNextSong,
    convertDuration,
    audioState,
  };
};
