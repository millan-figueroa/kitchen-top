import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="min-h-screen bg-background">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </main>
  );
}
