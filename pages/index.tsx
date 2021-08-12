import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Song as SongType } from "../models/Song";
import { useContext, useEffect } from "react";
import { ActionType } from "../hooks/action";
import Song from "../components/Song";
import AudioPlayer from "../components/AudioPlayer";
import { PlayerContext } from "../context/player-context";

interface HomeProps {
  songs: SongType[];
}

export default function Home({ songs }: HomeProps) {
  const { dispatch, playerState } = useContext(PlayerContext);

  useEffect(() => {
    dispatch({ type: ActionType.SetSongs, payload: songs });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Audio Player</title>
        <meta name="description" content="nice audio player" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Songs</h1>
      {playerState.songs.map((song) => (
        <Song
          id={song.id.toString()}
          key={song.id}
          artist={song.artist}
          name={song.name}
          cover={song.cover}
          year={song.year}
        />
      ))}
      
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const responce: Response = await fetch("http://localhost:3000/api/get-songs");
  const data: SongType[] = await responce.json();
  const songs: SongType[] = data;

  return { props: { songs } };
};
