import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "@/components/Recipe";
import { useSession } from "next-auth/react";
import { FaRegTrashCan, FaShareNodes } from "react-icons/fa6";
import ModalPopUp from "@/components/ModalPopUp";
import DeletePopUp from "@/components/modal/DeletePopUp";
import SharePopUp from "@/components/modal/SharePopUp";
import { GetServerSidePropsContext } from "next";

interface RecipeSaved {
	id: string;
	title: string;
	ingredients: string[];
	instructions: string[];
	user_id: string;
}

interface DisplaySingleRecipeProps {
	recipe: RecipeSaved | null;
	error: boolean;
}

export default function DisplaySingleRecipe({
	recipe,
	error,
}: DisplaySingleRecipeProps) {
	//get the rececipe id from the dynamic route
	const router = useRouter();
	const { recipe_id } = router.query;

	//get user session data
	const { data } = useSession();
	const id = data?.user?.id || "";

	//modal pop up state
	const [isModalOpen, setIsModalOpen] = useState(false);
	// another state to ensure right modal is popping up
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openShareModal, setOpenShareModal] = useState(false);

	const [deleteMessage, setDeleteMessage] = useState<string>("");

	//the owner of the recipe can delete the recipe, this is the function to handle delete recipe button click, call the delete recipe API and display the message after deleting recipe
	const deleteSavedRecipe = async (recipe_id: string) => {
		try {
			const res = await axios.delete(`/api/delete_saved_recipe/${recipe_id}`, {
				params: { user_id: id },
			});

			if (res.status === 200) {
				router.push("/userpage"); // Redirect to user page after deletion
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errResponse = error.response?.data as MyErrorResponse;
				console.log(errResponse);
				setDeleteMessage(
					`${errResponse.message} (Code: ${errResponse.code})` ||
						"An error occurred while fetching the recipe.",
				);
			} else {
				setDeleteMessage("An unexpected error occurred.");
			}
		}
	};

	//display error message if error is true
	if (error) {
		return (
			<div className="flex justify-center items-center h-[60vh]">
				<p className="text-red-500 text-lg">
					Something went wrong loading this recipe
				</p>
			</div>
		);
	}

	return (
		<main className="flex flex-col justify-center items-center">
			{/* display error message if deleteMessage is not empty */}
			{deleteMessage && (
				<div
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
					role="alert">
					{deleteMessage}
				</div>
			)}

			{/* display the recipe if recipe is not null */}
			{recipe && (
				<div>
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
								selectedRecipeId={recipe ? recipe.id : null}
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
							<SharePopUp />
						</ModalPopUp>
					)}
					{/* end of pop up delete confirmation */}
					<div className="flex gap-4 py-2 md:py-4 justify-end">
						{recipe && recipe.user_id === id && (
							<button
								onClick={() => {
									setIsModalOpen(true);
									setOpenDeleteModal(true);
									setOpenShareModal(false);
								}}
								className="px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-accent text-sm md:text-md lg:text-md text-tertiary rounded-md">
								<FaRegTrashCan className="block md:hidden w-3 h-4" />
								<span className="hidden md:block text-sm md:text-md">
									Delete
								</span>
							</button>
						)}
						<button
							onClick={() => {
								setIsModalOpen(true);
								setOpenShareModal(true);
								setOpenDeleteModal(false);
							}}
							className="px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-accent text-sm md:text-md lg:text-md text-tertiary rounded-md">
							<FaShareNodes className="block md:hidden w-3 h-4" />
							<span className="hidden md:block text-sm md:text-md">Share</span>
						</button>
					</div>
					<div>
						<Recipe recipe={recipe} />
					</div>
				</div>
			)}
		</main>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { recipe_id } = context.query;

	try {
		const res = await axios.get(
			`http://localhost:3000/api/get_single_saved_recipe/${recipe_id}`,
		);
		const recipe = res.data;
		// if no error occurs, return the recipe data as props to the page
		return {
			props: {
				recipe,
				error: false,
			},
		};
	} catch (err) {
		if (axios.isAxiosError(err)) {
			//show 404 page if the status coe is 404,
			if (err.response?.status === 404) {
				return {
					notFound: true,
				};
			}
		}
		//overwise, return the error message as props to the page to show the error message on the page
		return {
			props: {
				recipe: null,
				error: true,
			},
		};
	}
}
