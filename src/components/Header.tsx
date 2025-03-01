import { Phudu } from "next/font/google";
const phudu = Phudu({ weight: "600", subsets: ["latin"] });

export default function Header() {
  return (
    <div
      className={`${phudu.className} flex items-center justify-center w-full h-[100px] p-10 bg-background border-b-2 border-stroke`}
    >
      <img
        className="w-[50px] h-[50px] mr-2"
        src="./spoon-and-fork.png"
        alt="spoon and fork"
      />
      <h1 className="text-3xl font-black text-headline">Kitchen Top</h1>
    </div>
  );
}
