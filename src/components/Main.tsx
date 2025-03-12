import React, { JSX } from "react";
import InputForm from "./InputForm";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import { getFromAI } from "@/pages/api/getFromAI";

export default function Main(): JSX.Element {
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  // const [showRecipe, setShowRecipe] = React.useState(false);
  const [fetchRecipe, setFetchRecipe] = React.useState(false);

  //Add new ingredient to the list
  function addIngredient(formData: FormData): void {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      newIngredient as string,
    ]);
  }

  //Function passed to IngredientsList component to fetch recipe
  async function toggleRecipe() {
    setFetchRecipe((prevFetchRecipe) => !prevFetchRecipe);
    if (!fetchRecipe) {
      const recipe = await getFromAI(ingredients);
      console.log(recipe);
    }
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-start mt-10 bg-background">
        {/* InputForm Component */}
        <InputForm addIngredient={addIngredient} />

        {/* IngredientsList (and get recipe) Component */}
        {ingredients.length ? (
          <IngredientsList
            ingredients={ingredients}
            toggleRecipe={toggleRecipe}
            showRecipe={fetchRecipe}
          />
        ) : null}
      </div>

      {/* Recipe suggestion */}
      {fetchRecipe && <Recipe />}
    </main>
  );
}
