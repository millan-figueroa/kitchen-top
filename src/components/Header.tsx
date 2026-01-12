import { Phudu } from "next/font/google";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";

const phudu = Phudu({ weight: "600", subsets: ["latin"] });

export default function Header() {
	// const [user, setUser] = useState<User | null>(null);

	// useEffect(() => {
	//   const unsubscribe = onAuthStateChanged(auth, setUser);
	//   return () => unsubscribe();
	// }, []);

	const { user } = useContext(UserContext);

	return (
		<div className="flex items-center justify-center w-full p-4 md:p-5 lg:p-6 bg-background border-b-2 border-stroke">
			<div
				onClick={() => (window.location.href = "/")}
				className={`${phudu.className} flex items-center justify-start w-full cursor-pointer`}>
				<img
					className="w-6 mr-2 md:w-10 lg:w-12 lg:mr-3"
					src="./spoon-and-fork.png"
					alt="spoon and fork"
				/>
				<h1 className="text-xl md:text-2xl lg:text-3xl font-black text-headline">
					Kitchen Top
				</h1>
			</div>

			{user ? (
				<Link
					href="/userpage"
					className="px-3 py-1 border-2 border-stroke rounded-md text-headline hover:bg-button hover:text-buttonText hover:border-buttonText transition duration-300 ease-in-out flex items-center"
					aria-label="User Profile">
					<FaUser className="block md:hidden w-4 h-4" />
					<span className="hidden md:block text-sm md:text-md">Profile</span>
				</Link>
			) : (
				<button
					onClick={() => (window.location.href = "/login")}
					className="px-3 py-1 border-2 border-stroke rounded-md text-headline hover:bg-button hover:text-buttonText hover:border-buttonText transition duration-300 ease-in-out flex items-center"
					aria-label="Login">
					<FaSignInAlt className="block md:hidden w-3 h-4" />
					<span className="hidden md:block text-sm md:text-md">Login</span>
				</button>
			)}
		</div>
	);
}
