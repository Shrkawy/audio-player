import { useContext } from "react";
import Image from "next/image";
import { PlayerContext } from "../context/player-context";

import styles from "../styles/AudioPlayer.module.css";

const CurrentSong = () => {
  const { playerState } = useContext(PlayerContext);
  const currentSong = playerState.songs[playerState.currentSong];

  return (
    <div className={styles.current}>
      <div>
        <Image
          src={currentSong.cover}
          layout="fill"
          objectFit="contain"
          alt={currentSong.name}
        />
      </div>
      <div>
        <p>{currentSong.name}</p>
        <p>{currentSong.artist}</p>
      </div>
    </div>
  );
};

export default CurrentSong;
