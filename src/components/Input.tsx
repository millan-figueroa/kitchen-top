import React, { JSX } from "react";

export default function Input(): JSX.Element {
  const ingredients = ["Chicken", "Beef", "Pork", "Fish", "Vegetables"];

  const ingredientsList = ingredients.map((ingredient) => {
    return (
      <li key={ingredient} className="p-2">
        {ingredient}
      </li>
    );
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");
    ingredients.push(newIngredient as string);
    console.log(ingredients);
  }

  return (
    <main className="bg-slate-100 ">
      <form onSubmit={handleSubmit} className="flex justify-items-center p-10">
        <input
          className="w-[800] h-12 border-2 p-2 mr-2 text-gray-800 border-gray-300 rounded-md"
          type="text"
          placeholder="e.g oregano"
          aria-label="Ingredient input"
          name="ingredient"
        />
        <button className="w-48 h-12 p-1 bg-gray-800 rounded-md text-sm sm:text-base lg:text-lg">
          <span className="block sm:hidden">+ Add</span>
          <span className="hidden sm:block">+ Add ingredient</span>
        </button>
      </form>
      <div className="flex flex-col items-center justify-center mr-48 ml-48 mt-16 mb-16  bg-white">
        <h2 className="font-black text-2xl text-gray-700 p-6">
          Your Ingredients:
        </h2>
        <ul className="ml-10 p-4 list-disc text-lg font-bold text-gray-700">
          {ingredientsList}
        </ul>
      </div>
    </main>
  );
}
