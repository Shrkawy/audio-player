import { useContext } from "react";
import Image from "next/image";
import { PlayerContext } from "../context/player-context";

const CurrentSong = () => {
  const { playerState } = useContext(PlayerContext);
  const currentSong = playerState.songs[playerState.currentSong];

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ position: "relative", width: "4rem", height: "4rem" }}>
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
