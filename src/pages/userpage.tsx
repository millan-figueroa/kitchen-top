"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";

export default function UserPage() {
	const { data } = useSession();
	const email = data?.user?.email || "";
	const id = data?.user?.id || "";

	//logging out
	const logOutHandle = () => {
		signOut({ redirect: true, callbackUrl: "/" });
	};

	useEffect(() => {
		//fetch users saved recipe
		const fetchUserSavedRecipes = async () => {
			try {
				const res = await axios.get(`/api/get_user_saved_recipe/${id}`);
				console.log(res);
			} catch (error) {
				console.log(error instanceof Error ? error.message : 'An error occurred');
			}
		};

		if (id) {
			fetchUserSavedRecipes();
		} else {
			window.location.href = "/";
		}
	});

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<div className="flex flex-col w-full max-w-md p-6 md:p-8 lg:p-10 text-headline text-center">
				<h2 className="text-xl font-semibold p-10">User Account</h2>
				<div>
					{email && id ? (
						<>
							<p>Email: {email}</p>
							<p>UID: {id}</p>
						</>
					) : (
						<p>No user found.</p>
					)}
				</div>
			</div>
			<button
				onClick={logOutHandle}
				className="w-32 h-10 my-8 md:w-48 lg:w-60 lg:h-12 p-1 bg-button text-buttonText text-sm md:text-md lg:text-md rounded-md">
				<span className="block md:hidden">Log Out</span>
				<span className="hidden md:block lg:block">Log Out</span>
			</button>
		</div>
	);
}
