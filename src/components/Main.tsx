import React, { JSX } from "react";
import InputForm from "./InputForm";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";

export default function Main(): JSX.Element {
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [showRecipe, setShowRecipe] = React.useState(false);

  //Add new ingredient to the list
  function addIngredient(formData: FormData): void {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      newIngredient as string,
    ]);
  }

  //Function passed to IngredientsList component to toggle the recipe suggestion
  function toggleRecipe() {
    setShowRecipe((prevShowRecipe) => !prevShowRecipe);
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-start mt-10 bg-background">
        {/* InputForm Component */}
        <InputForm addIngredient={addIngredient} />

        {/* IngredientsList Component */}
        {ingredients.length ? (
          <IngredientsList
            ingredients={ingredients}
            toggleRecipe={toggleRecipe}
            showRecipe={showRecipe}
          />
        ) : null}
      </div>

      {/* Recipe suggestion */}
      {showRecipe && <Recipe />}
    </main>
  );
}
