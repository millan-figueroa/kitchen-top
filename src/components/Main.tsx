import React, { JSX, useRef, useEffect, useContext } from "react";
import InputForm from "./InputForm";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "@/pages/api/getFromAI";
import { UserContext } from "@/context/UserContext";

/* TODO:
XAutomatically scroll into view when new recipe is generated 
Xloading spinner to let user know recipe is being fetched
-add simple email/ password login system
-add google login
-logic to automatically modify/regenerate same recipe when user adds more ingredients
-button to generate different recipe w same ingredients (add function to getFromAI.ts to ask for different recipe)
-button to clear all ingredients/ start over
-ability to remove ingredients from the list
-ability to save/dl recipes to local storage
-ability to share recipes 
-ability to print recipes
-ability to add notes to recipes
-ability to rate recipes
-User account with ability to save recipe */

export default function Main(): JSX.Element {
  // Get user value from UserContext
  const { user } = useContext(UserContext);
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [recipe, setRecipe] = React.useState<string>("");
  const recipeSection = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

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
    //show loading
    setLoading(true);
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setLoading(false);
    setRecipe(recipeMarkdown);
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
          xmlns="http://www.w3.org/2000/svg"
        >
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
