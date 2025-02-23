import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Input from "@/components/Input";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Input />
    </>
  );
}
