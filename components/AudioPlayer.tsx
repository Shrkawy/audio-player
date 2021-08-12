import AudioControllers from "./AudioControllers";
import AudioSongInfo from "./CurrentSong";
import styles from "../styles/AudioPlayer.module.css";
import { useContext } from "react";
import { PlayerContext } from "../context/player-context";

const AudioPlayer = () => {
  const {
    playerState: { songs },
  } = useContext(PlayerContext);

  if (songs.length === 0) return null;

  return (
    <div className={styles.audioPlayer}>
      <AudioSongInfo />
      <AudioControllers />
    </div>
  );
};

export default AudioPlayer;
