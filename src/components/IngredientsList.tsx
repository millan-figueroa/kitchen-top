import React, { JSX } from "react";

type IngredientsListProps = {
  ingredients: string[];
  getRecipe: () => void;
  // showRecipe: boolean;
};

export default function IngredientsList({
  ingredients,
  getRecipe,
}: // showRecipe,
IngredientsListProps): JSX.Element {
  const ingredientsListItems = ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>;
  });

  return (
    // Show ingredients list when user inputs more than 2 ingredients
    <div className="px-8 py-4 md:px-6 md:py-2">
      <h2 className="md:p-2 text-xl md:text-2xl lg:text-3xl font-semibold text-headline">
        Ingredients on hand:
      </h2>
      <ul className="ml-4 md:ml-6 lg:ml-8 mt-2 md:p-2 lg:p-4 list-disc text-lg md:text-xl lg:text-2xl text-paragraph">
        {ingredientsListItems}
      </ul>

      {/* Get recipe container */}
      {ingredientsListItems.length > 2 && (
        <div className="flex justify-between items-center w-full px-6 md:px-10 lg:px-12 p-4 md:p-6 lg:py-8 mt-8 bg-secondary text-paragraph  rounded-lg">
          <div className="p-2 mr-4">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-headline">
              Ready for a recipe?
            </h3>
            <p className="mt-2 lg:mt-4">
              Generate a recipe from your list of ingredients.
            </p>
          </div>
          <button
            onClick={getRecipe}
            className="px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-accent text-sm md:text-md lg:text-md text-tertiary rounded-md"
          >
            Get recipe!
          </button>
        </div>
      )}
    </div>
  );
}
