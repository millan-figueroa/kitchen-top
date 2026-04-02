import React, { JSX, useEffect } from "react";
import InputForm from "./InputForm";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromAI } from "../../utils/getFromAI";
import axios from "axios";

interface Recipe {
	title: string;
	ingredients: string[];
	instructions: string[];
}

export default function Main(): JSX.Element {
	const [ingredients, setIngredients] = React.useState<string[]>([]);
	const [recipe, setRecipe] = React.useState<Recipe | null>(null);
	const recipeSection = React.useRef<HTMLDivElement>(null);
	const [loading, setLoading] = React.useState<boolean>(false);
	//ingredient error message for empty input
	const [emptyInputError, setEmptyInputError] = React.useState<boolean>(false);
	//ingredient error message for duplicate ingredient item
	const [duplicateIngredientError, setDuplicateIngredientError] =
		React.useState<boolean>(false);
	//status of getRecipe function
	const [getRecipeStatus, setGetRecipeStatus] = React.useState<boolean>(false);

	//Add new ingredient to the list
	function addIngredient(formData: FormData): void {
		const newIngredient = formData.get("ingredient") as string;
		console.log(newIngredient);
		//check if input is empty
		if (newIngredient === "" || newIngredient.length === 0) {
			setEmptyInputError(true);
			return;
		}

		//check for duplicates ingredient items in the list, show error if it already exists
		if (ingredients.includes(newIngredient)) {
			setDuplicateIngredientError(true);
			return;
		}

		setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
		setEmptyInputError(false);
		setDuplicateIngredientError(false);
	}

	//Function passed to IngredientsList component to fetch recipe from AI
	async function getRecipe() {
		//show loading
		setLoading(true);
		const recipeJSON = await getRecipeFromAI(ingredients);
		//turn the recipe string to JSON object and set it to state
		const recipeObj = JSON.parse(recipeJSON);
		setRecipe(recipeObj);
		setLoading(false);
		setGetRecipeStatus(true);
	}

	async function saveRecipe(user_id: string) {
		//message to return to the user after saving the recipe
		const responseMessage = { success: "", error: "" };

		try {
			// if recipe is empty, throw an error
			if (!recipe) {
				throw new Error("No recipe to save");
			}

			const response = await axios.post("/api/save_recipe", {
				user_id,
				title: recipe.title,
				instructions: [...recipe.instructions],
				ingredients: [...recipe.ingredients],
			});
			//if successfully saved, return success message
			if (response.status === 201) {
				responseMessage.success = "Recipe saved successfully!";
				return responseMessage;
			}
		} catch (error) {
			//check if the error is an AxiosError and has a response,
			// then set the error message from the response, otherwise set a generic error message
			if (axios.isAxiosError(error) && error?.response?.status === 422) {
				responseMessage.error = error.response.data.message;
				return responseMessage;
			} else {
				responseMessage.error = "Something went wrong saving your recipe";
				return responseMessage;
			}
		}
	}

	// Scroll to the recipe section when the recipe is generated
	useEffect(() => {
		if (recipe && recipeSection.current) {
			recipeSection.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [recipe]);

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
			<div className="flex flex-col items-start mt-10 bg-background">
				{/* InputForm Component */}
				<InputForm
					addIngredient={addIngredient}
					emptyInputError={emptyInputError}
					duplicateIngredientError={duplicateIngredientError}
					// recipeSection={recipeSection}
				/>

				{/* IngredientsList (and get recipe) Component */}
				{ingredients.length ? (
					<IngredientsList
						ingredients={ingredients}
						getRecipe={getRecipe}
						// recipeSection={recipeSection}
						setRecipe={setRecipe}
						setIngredients={setIngredients}
						getRecipeStatus={getRecipeStatus}
						setGetRecipeStatus={setGetRecipeStatus}
						saveRecipe={saveRecipe}
					/>
				) : null}
			</div>

			{/* Recipe suggestion */}
			{loading ? (
				displayLoading()
			) : (
				<div ref={recipeSection}>
					<Recipe recipe={recipe} />
				</div>
			)}
		</main>
	);
}
