import AudioControllers from "./AudioControllers";
import AudioSongInfo from "./CurrentSong";
import styles from "../styles/AudioPlayer.module.css";

const AudioPlayer = () => {
  return (
    <div className={styles.audioPlayer}>
      <AudioSongInfo />
      <AudioControllers />
    </div>
  );
};

export default AudioPlayer;
