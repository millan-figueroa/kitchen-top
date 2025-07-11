import { Phudu } from "next/font/google";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Main from "@/components/Main";
import Header from "@/components/Header";
import Head from "next/head";

const phudu = Phudu({ weight: "600", subsets: ["latin"] });

/**
 * Challenge: clean up our code!
 * Let's make a couple new components to make things a
 * little cleaner. (Notice: I'm not suggesting what we
 * have now is bad or wrong. I'm mostly finding an excuse
 * to get in some hands-on practice 🙂)
 *
 * 1. Move the entire recipe <section> into its own
 *    ClaudeRecipe component
 * 2. Move the list of ingredients <section> into its
 *    own IngredientsList component.
 *
 * While you're considering how to structure things, consider
 * where state is, think about if it makes sense or not to
 * move it somewhere else, how you'll communicate between
 * the parent/child components, etc.
 *
 * The app should function as it currently does when you're
 * done, so there will likely be some extra work to be done
 * beyond what I've listed above.
 */

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="min-h-screen bg-background">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      {/* <Main /> */}
      <Component {...pageProps} />
    </main>
  );
}
