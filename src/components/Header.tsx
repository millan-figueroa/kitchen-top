import { Phudu } from "next/font/google";
const phudu = Phudu({ weight: "600", subsets: ["latin"] });

export default function Header() {
  return (
    <div className="flex items-center justify-center w-full p-3 md:p-4 lg:p-7s bg-background border-b-2 border-stroke">
      <div
        className={`${phudu.className} flex items-center justify-start w-full p-2 md:p-4 lg:p-6`}
      >
        <img
          className="w-6 mr-2 md:w-10 lg:w-12 lg:mr-3"
          src="./spoon-and-fork.png"
          alt="spoon and fork"
        />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-headline">
          Kitchen Top
        </h1>
      </div>
      <button
        onClick={() => (window.location.href = "/login")}
        className="px-3 py-1 bg-button text-buttonText text-sm md:text-md lg:text-lg rounded-md"
      >
        Login
      </button>
    </div>
  );
}
