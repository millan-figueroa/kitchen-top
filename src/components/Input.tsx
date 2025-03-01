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
    <main className="flex flex-col justify-center items-center w-screen mt-10 bg-background">
      {/* Ingredients Input */}
      <form action={addIngredient} className="flex p-10">
        <input
          className="w-[500px] h-12 mr-2 p-2 text-headline border-2 border-stroke rounded-md"
          type="text"
          placeholder="e.g oregano"
          aria-label="Ingredient input"
          name="ingredient"
        />
        <button className="w-48 h-12 p-1 bg-button text-buttonText text-sm font-bold sm:text-base lg:text-lg rounded-md">
          <span className="block sm:hidden">+ Add</span>
          <span className="hidden sm:block">+ Add ingredient</span>
        </button>
      </form>

      {/* Ingredients List */}
      {ingredientsListItems.length > 0 && (
        <div className="flex flex-col ">
          <h2 className="mr-64 p-2 text-3xl font-semibold text-headline">
            Ingredients on hand:
          </h2>
          <ul className="ml-10 p-4 list-disc text-2xl text-paragraph">
            {ingredientsListItems}
          </ul>
        </div>
      )}

      {/* Get recipe container */}
      <div className="flex justify-between items-center w-[600px] mt-10 px-12 py-6 bg-secondary text-paragraph">
        <div>
          <h3 className="text-3xl text-headline">Ready for a recipe?</h3>
          <p>Generate a recipe from your list of ingredients.</p>
        </div>
        <button className="px-6 py-2 bg-accent text-tertiary rounded-md">
          Get recipe
        </button>
      </div>
    </main>
  );
}
