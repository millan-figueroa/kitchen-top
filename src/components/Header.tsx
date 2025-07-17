import { Phudu } from "next/font/google";
const phudu = Phudu({ weight: "600", subsets: ["latin"] });

export default function Header() {
  return (
    <div
      className={`${phudu.className} flex items-center justify-center w-full p-5 md:p-7 lg:p-10 bg-background border-b-2 border-stroke`}
    >
      <img
        className="w-8 mr-2 md:w-10 lg:w-12 lg:mr-3"
        src="./spoon-and-fork.png"
        alt="spoon and fork"
      />
      <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-headline">
        Kitchen Top
      </h1>
      <button
        type="submit"
        className="h-10 md:h-12 bg-button text-buttonText text-sm md:text-md font-medium rounded-md hover:opacity-90 transition"
      >
        Login
      </button>
    </div>
  );
}
