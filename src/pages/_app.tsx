import { Phudu } from "next/font/google";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Input from "@/components/Input";
import Header from "@/components/Header";

const phudu = Phudu({ weight: "600", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Input />
    </main>
  );
}
