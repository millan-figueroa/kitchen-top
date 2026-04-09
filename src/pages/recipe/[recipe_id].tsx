import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import Recipe from "@/components/Recipe";

interface RecipeSaved {
	_id: string;
	title: string;
	ingredients: string[];
	instructions: string[];
}

interface MyErrorResponse {
	message: string;
	code: number;
}

export default function DisplaySingleRecipe() {
	//get the rececipe id from the dynamic route
	const router = useRouter();
	const { recipe_id } = router.query;
	//variable to save the receipe data
	const [recipe, setRecipe] = useState<RecipeSaved | null>(null);
	//loading state for the recipe data
	const [loading, setLoading] = useState<boolean>(false);
	//error state for fetching recipe data
	const [error, setError] = useState<string>("");

	useEffect(() => {
		//fetch the recipe data using the recipe_id
		const fetchRecipe = async () => {
			try {
				setLoading(true);
				setError("");
				const res = await axios.get(
					`/api/get_single_saved_recipe/${recipe_id}`,
				);
				const data = res.data;
				setRecipe(data);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const errResponse = error.response?.data as MyErrorResponse;
					console.log(errResponse);
					setError(
						`${errResponse.message} (Code: ${errResponse.code})` ||
							"An error occurred while fetching the recipe.",
					);
				} else {
					setError("An unexpected error occurred.");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchRecipe();
	}, [recipe_id]);

	// this is to shoe the loading spinner
	//it can be moved to util folder in the future
	const displayLoading = () => {
		return (
			<div role="status" className="size-36 flex justify-center items-center">
				<svg
					aria-hidden="true"
					className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<span className="sr-only">Loading...</span>
			</div>
		);
	};

	return (
		<main className="flex flex-col justify-center items-center">
			{error && !recipe && <p className="text-red-500 mt-10">{error}</p>}
			{loading ? (
				displayLoading()
			) : (
				<div>{recipe && <Recipe recipe={recipe} />}</div>
			)}
		</main>
	);
}
