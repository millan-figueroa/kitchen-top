// import React from "react";

type InputFormProps = {
  addIngredient: (formData: FormData) => void;
};

export default function InputForm({
  addIngredient,
}: InputFormProps): JSX.Element {
  return (
    <form action={addIngredient} className="flex w-full p-4 md:p-6 lg:p-8">
      <input
        className="w-full h-10 lg:h-12 mr-2 pl-2 text-headline border-2 border-stroke rounded-md"
        type="text"
        placeholder="e.g oregano"
        aria-label="Ingredient input"
        name="ingredient"
      />
      <button className="w-32 h-10 md:w-48 lg:w-60 lg:h-12 p-1 bg-button text-buttonText text-sm md:text-md lg:text-md rounded-md">
        <span className="block md:hidden">+ Add</span>
        <span className="hidden md:block lg:block">+ Add ingredient</span>
      </button>
    </form>
  );
}
