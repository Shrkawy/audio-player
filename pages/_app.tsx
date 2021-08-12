import "../styles/globals.css";
import type { AppProps } from "next/app";
import SongsProvider from "../context/songs-provider";
import AudioPlayer from "../components/AudioPlayer";
import { useContext } from "react";
import { PlayerContext } from "../context/player-context";

function MyApp({ Component, pageProps }: AppProps) {
  const { playerState } = useContext(PlayerContext);
  return (
    <SongsProvider>
      <Component {...pageProps} />
      <AudioPlayer />
    </SongsProvider>
  );
}
export default MyApp;
