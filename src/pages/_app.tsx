import { Phudu } from "next/font/google";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Input from "@/components/Input";
import Header from "@/components/Header";

const phudu = Phudu({ weight: "600", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="bg-gray-900 text-white min-h-screen">
      <Header />
      <Input />
    </main>
  );
}
