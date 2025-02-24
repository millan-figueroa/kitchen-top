import { Phudu } from "next/font/google";
const phudu = Phudu({ weight: "600", subsets: ["latin"] });

export default function Header() {
  return (
    <div
      className={`${phudu.className} flex items-center justify-center w-full h-[80px] p-10 bg-slate-100 border-b-2 border-gray-300`}
    >
      <img
        className="w-[40px] h-[40px] mr-2"
        src="./spoon-and-fork.png"
        alt="spoon and fork"
      />
      <h1 className="text-2xl font-black text-gray-700">Robo Chef</h1>
    </div>
  );
}
