import React, { JSX } from "react";
import InputForm from "./InputForm";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "@/pages/api/getFromAI";

export default function Main(): JSX.Element {
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [recipe, setRecipe] = React.useState<string>("");

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

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-start mt-10 bg-background">
        {/* InputForm Component */}
        <InputForm addIngredient={addIngredient} />

        {/* IngredientsList (and get recipe) Component */}
        {ingredients.length ? (
          <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
        ) : null}
      </div>

      {/* Recipe suggestion */}
      {recipe && <Recipe recipe={recipe} />}
    </main>
  );
}
