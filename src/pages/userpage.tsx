"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface RecipeSaved {
	recipe_id: string;
	title: string;
	ingredients: string[];
	instructions: string[];
}

export default function UserPage() {
	//get user session data
	const { data } = useSession();
	const email = data?.user?.email || "";
	const id = data?.user?.id || "";

	//routing obj
	const router = useRouter();

	const [savedRecipe, setSavedRecipe] = useState<RecipeSaved[]>([]);

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
				setSavedRecipe(res.data.recipes);
			} catch (error) {
				console.log(error);
			}
		};

		if (id) {
			fetchUserSavedRecipes();
		} else {
			router.push("/");
		}
	});

	//display user's saved recipes
	const displaySavedRecipes = savedRecipe.map((recipe) => (
		<div key={recipe.recipe_id} className="border p-4 rounded-md mb-4">
			<h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
			{/* Display ingredients */}
			<ul className="text-left">
				{recipe.ingredients.map((ingredient, index) => (
					<li key={index}>{ingredient}</li>
				))}
			</ul>
			{/* Display instructions */}
			{/* <ol className="text-left">
				{recipe.instructions.map((instruction, index) => (
					<li key={index}>{instruction}</li>
				))}
			</ol> */}
		</div>
	));

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<div className="flex flex-col w-full max-w-md p-6 md:p-8 lg:p-10 text-headline text-center">
				<h2 className="text-xl font-semibold p-10">User Account</h2>
				<div>
					{email && id ? (
						<section className="mb-8 flex flex-col items-center gap-4">
							<div className="w-1/3">
								<p>Email: {email}</p>
								<p>UID: {id}</p>
							</div>
							<hr className="w-full border-stroke" />
							<div className="w-2/3">{displaySavedRecipes}</div>
						</section>
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
