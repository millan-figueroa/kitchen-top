import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function App({
	Component,
	pageProps: { session, ...pageProps }, //session holds the session data and status
}: AppProps) {
	return (
		<main className="min-h-screen bg-background">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			{/* enable to use useSession , session context need to be exposed; <SessionProvider />*/}
			<SessionProvider session={session}>
				<Header />
				<Component {...pageProps} />
			</SessionProvider>
		</main>
	);
}
