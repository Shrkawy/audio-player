import "../styles/globals.css";
import type { AppProps } from "next/app";
import SongsProvider from "../context/songs-provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SongsProvider>
      <Component {...pageProps} />
    </SongsProvider>
  );
}
export default MyApp;
