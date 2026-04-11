"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FaRegTrashCan, FaShareNodes } from "react-icons/fa6";
import ModalPopUp from "@/components/ModalPopUp";
import DeletePopUp from "@/components/modal/DeletePopUp";
import Link from "next/link";
import SharePopUp from "@/components/modal/SharePopUp";

interface RecipeSaved {
	_id: string;
	title: string;
	ingredients: string[];
	instructions: string[];
}

export default function UserPage() {
	//get user session data
	const { data } = useSession();
	const email = data?.user?.email || "";
	const id = data?.user?.id || "";

	//modal pop up state
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

	// another state to ensure right modal is popping up
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openShareModal, setOpenShareModal] = useState(false);

	//routing obj
	const router = useRouter();

	const [savedRecipe, setSavedRecipe] = useState<RecipeSaved[]>([]);
	//return a message after detection of a recipe
	const [deleteMessage, setDeleteMessage] = useState<string>("");

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
	}, [id]);

	//delete a saved recipe
	const deleteSavedRecipe = async (recipe_id: string) => {
		try {
			const res = await axios.delete(`/api/delete_saved_recipe/${recipe_id}`, {
				params: { user_id: id },
			});
			// Remove the deleted recipe from the state
			setSavedRecipe(savedRecipe.filter((recipe) => recipe._id !== recipe_id));
			//update the delete message state to show the user which recipe is deleted
			setDeleteMessage(res.data.message);

			//delete the message after 5 seconds
			setTimeout(() => {
				setDeleteMessage("");
			}, 5000);
		} catch (error) {
			console.log(error);
		}
	};

	//display user's saved recipes
	const displaySavedRecipes = savedRecipe.map((recipe) => (
		<div
			key={recipe._id}
			id={recipe._id}
			className="border p-4 rounded-md mb-4">
			<div className="flex justify-between">
				<Link href={`/recipe/${recipe._id}`}>
					<h3 className="text-lg font-semibold mb-2 hover:text-blue-600 hover:cursor-pointer">
						{recipe.title}
					</h3>
				</Link>
				<button
					onClick={() => {
						setSelectedRecipeId(recipe._id);
						setIsModalOpen(true);
						setOpenDeleteModal(true);
						setOpenShareModal(false);
					}}
					className="text-red-500 hover:text-red-700">
					<FaRegTrashCan />
				</button>
				<button
					onClick={() => {
						setSelectedRecipeId(recipe._id);
						setIsModalOpen(true);
						setOpenDeleteModal(false);
						setOpenShareModal(true);
					}}
					className="text-red-500 hover:text-red-700">
					<FaShareNodes />
				</button>
			</div>
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
			{/* popup for delete confirmation */}
			{isModalOpen && openDeleteModal && (
				<ModalPopUp
					isOpen={isModalOpen}
					onClose={() => {
						setIsModalOpen(false);
						setOpenDeleteModal(false);
					}}>
					<DeletePopUp
						setIsModalOpen={setIsModalOpen}
						selectedRecipeId={selectedRecipeId}
						deleteSavedRecipe={deleteSavedRecipe}
					/>
				</ModalPopUp>
			)}
			{/* end of pop up delete confirmation */}
			{/* popup for delete confirmation */}
			{isModalOpen && openShareModal && (
				<ModalPopUp
					isOpen={isModalOpen}
					onClose={() => {
						setIsModalOpen(false);
						setOpenShareModal(false);
					}}>
					<SharePopUp selectedRecipeId={selectedRecipeId} />
				</ModalPopUp>
			)}
			{/* end of pop up delete confirmation */}

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
							{deleteMessage && (
								<div
									className="mt-4 p-4 rounded-md text-center bg-green-100 text-green-800
									">
									{deleteMessage}
								</div>
							)}
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
