import React, { JSX, useRef, useEffect } from "react";
import InputForm from "./InputForm";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "@/pages/api/getFromAI";

/* TODO:
XAutomatically scroll into view when new recipe is generated 
-loading spinner to let user know recipe is being fetched
-logic to automatically modify same recipe when user adds more ingredients
-button to generate different recipe w same ingredients
-button to clear all ingredients/ start over
-ability to remove ingredients from the list
-ability to save/dl recipes to local storage
-ability to share recipes 
-ability to print recipes
-ability to add notes to recipes
-ability to rate recipes
-User account with ability to save recipes*/

export default function Main(): JSX.Element {
	const [ingredients, setIngredients] = React.useState<string[]>([]);
	const [recipe, setRecipe] = React.useState<string>("");
	const recipeSection = React.useRef<HTMLDivElement>(null);

	//Add new ingredient to the list
	function addIngredient(formData: FormData): void {
		const newIngredient = formData.get("ingredient");
		setIngredients((prevIngredients) => [
			...prevIngredients,
			newIngredient as string,
		]);
	}

	//Function passed to IngredientsList component to fetch recipe from AI
	async function getRecipe() {
		const recipeMarkdown = await getRecipeFromMistral(ingredients);
		setRecipe(recipeMarkdown);
	}

	// Scroll to the recipe section when the recipe is generated
	useEffect(() => {
		if (recipe && recipeSection.current) {
			recipeSection.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [recipe]);

	return (
		<main className="flex flex-col justify-center items-center">
			<div className="flex flex-col items-start mt-10 bg-background">
				{/* InputForm Component */}
				<InputForm
					addIngredient={addIngredient}
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
					/>
				) : null}
			</div>

			{/* Recipe suggestion */}
			{recipe && (
				<div ref={recipeSection}>
					<Recipe recipe={recipe} />
				</div>
			)}
		</main>
	);
}
