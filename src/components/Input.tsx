import React, { JSX } from "react";

export default function Input(): JSX.Element {
  const [ingredients, setIngredients] = React.useState<string[]>([]);

  const ingredientsListItems = ingredients.map((ingredient) => {
    return (
      <li key={ingredient} className="p-2">
        {ingredient}
      </li>
    );
  });

  function addIngredient(formData: any) {
    // event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      newIngredient as string,
    ]);
  }

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col items-start mt-10 bg-background">
        {/* Ingredients Input */}
        <form action={addIngredient} className="flex w-full p-4 md:p-6 lg:p-8">
          <input
            className="w-full h-10 lg:h-12 mr-2 p-2 text-headline border-2 border-stroke rounded-md"
            type="text"
            placeholder="e.g oregano"
            aria-label="Ingredient input"
            name="ingredient"
          />
          <button className="w-32 h-10 md:w-48 lg:w-60 lg:h-12 p-1 bg-button text-buttonText text-sm font-bold  md:text-md lg:text-md rounded-md">
            <span className="block md:hidden">+ Add</span>
            <span className="hidden md:block lg:block">+ Add ingredient</span>
          </button>
        </form>

        {/* Ingredients List */}
        {ingredientsListItems.length ? (
          <div className="p-6 md:p-8 lg:p-10">
            <h2 className="md:p-2 text-lg md:text-xl lg:text-2xl font-semibold text-headline">
              Ingredients on hand:
            </h2>
            <ul className="ml-4 md:ml-6 lg:ml-8 md:p-2 lg:p-4 list-disc text-lg md:text-xl lg:text-2xl text-paragraph">
              {ingredientsListItems}
            </ul>
          </div>
        ) : null}

        {/* Get recipe container */}
        {ingredientsListItems.length > 2 && (
          <div className="flex justify-between items-center w-[600px] ml-8 mt-10 px-12 py-8 bg-secondary text-paragraph  rounded-lg">
            <div>
              <h3 className="text-3xl text-headline">Ready for a recipe?</h3>
              <p className="mt-2">
                Generate a recipe from your list of ingredients.
              </p>
            </div>
            <button className="px-6 py-2 bg-accent text-lg text-tertiary rounded-md">
              Get a recipe
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
