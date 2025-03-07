import React, { JSX } from "react";

type IngredientsListProps = {
  ingredientsListItems: JSX.Element[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function IngredientsList({
  ingredientsListItems,
}: IngredientsListProps): JSX.Element {
  return (
    <div className="px-8 py-4 md:px-6 md:py-2">
      <h2 className="md:p-2 text-xl md:text-2xl lg:text-3xl font-semibold text-headline">
        Ingredients on hand:
      </h2>
      <ul className="ml-4 md:ml-6 lg:ml-8 mt-2 md:p-2 lg:p-4 list-disc text-lg md:text-xl lg:text-2xl text-paragraph">
        {ingredientsListItems}
      </ul>
    </div>
  );
}
