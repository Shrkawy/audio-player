import Image from "next/image";
import { useContext } from "react";
import { PlayerContext } from "../context/player-context";
import { ActionType } from "../hooks/action";

import styles from "../styles/Song.module.css";

export interface SongProps {
  cover: string;
  name: string;
  artist: string;
  year: number;
  id: string;
}

const Song = ({ cover, name, artist, year, id }: SongProps) => {
  const { playerState, dispatch } = useContext(PlayerContext);
  const playThisSong = () => {
    dispatch({ type: ActionType.CurrentSong, payload: +id - 1 });
  };

  return (
    <button className={styles.song} id={id} onClick={playThisSong}>
      <div style={{ position: "relative", width: "3rem", height: "3rem" }}>
        <Image src={cover} layout="fill" objectFit="contain" alt={name} />
      </div>
      <p>{name}</p>
      <p>{artist}</p>
      <p>{year}</p>
    </button>
  );
};

export default Song;
