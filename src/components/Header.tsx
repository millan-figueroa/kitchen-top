import Image from "next/image";
import { Phudu } from "next/font/google";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
const phudu = Phudu({ weight: "600", subsets: ["latin"] });

export default function Header() {
	//get session data
	//get the data and rename it to session
	const { data: session } = useSession();

	//logging out
	const logOutHandle = () => {
		signOut({ redirect: true, callbackUrl: "/" });
	};

	return (
		<div className="flex items-center justify-between w-full p-4 md:p-5 lg:p-6 bg-background border-b-2 border-stroke">
			<div
				onClick={() => (window.location.href = "/")}
				className={`${phudu.className} flex items-center justify-start cursor-pointer`}>
				<Image
					className="w-6 mr-2 md:w-10 lg:w-12 lg:mr-3"
					src="/spoon-and-fork.png"
					width={48}
					height={48}
					alt="spoon and fork"
				/>
				<h1 className="text-xl md:text-2xl lg:text-3xl font-black text-headline">
					Kitchen Top
				</h1>
			</div>

			{session && session.user.email ? (
				<div className="flex items-center gap-4">
					<Link
						href="/userpage"
						className="px-3 py-1 border-2 border-stroke rounded-md text-headline hover:bg-button hover:text-buttonText hover:border-buttonText transition duration-300 ease-in-out flex items-center"
						aria-label="User Profile">
						<FaUser className="block md:hidden w-4 h-4" />
						<span className="hidden md:block text-sm md:text-md">Profile</span>
					</Link>
					<button
						onClick={logOutHandle}
						className="px-3 py-1 border-2 border-stroke rounded-md text-headline hover:bg-button hover:text-buttonText hover:border-buttonText transition duration-300 ease-in-out flex items-center"
						aria-label="Log Out">
						<FaSignOutAlt className="block md:hidden w-3 h-4" />
						<span className="hidden md:block text-sm md:text-md">Log Out</span>
					</button>
				</div>
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
