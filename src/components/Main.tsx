import React, { JSX } from "react";
import InputForm from "./InputForm";

export default function Main(): JSX.Element {
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [showRecipe, setShowRecipe] = React.useState(false);

  const ingredientsListItems = ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>;
  });

  function addIngredient(formData: FormData): void {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      newIngredient as string,
    ]);
  }

  function toggleRecipe() {
    setShowRecipe((prevShowRecipe) => !prevShowRecipe);
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-start mt-10 bg-background">
        {/* Ingredients Input */}
        <InputForm addIngredient={addIngredient} />

        {/* Ingredients List */}
        {ingredientsListItems.length ? (
          <div className="px-8 py-4 md:px-6 md:py-2">
            <h2 className="md:p-2 text-xl md:text-2xl lg:text-3xl font-semibold text-headline">
              Ingredients on hand:
            </h2>
            <ul className="ml-4 md:ml-6 lg:ml-8 mt-2 md:p-2 lg:p-4 list-disc text-lg md:text-xl lg:text-2xl text-paragraph">
              {ingredientsListItems}
            </ul>
          </div>
        ) : null}

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
              onClick={toggleRecipe}
              className="px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-accent text-sm md:text-md lg:text-md text-tertiary rounded-md"
            >
              Get recipe!
            </button>
          </div>
        )}
      </div>

      {/* Recipe suggestion */}
      {showRecipe && (
        <section className="p-8 sm:px-10 sm:mx-16 sm:mt-10 md:px-12 md:mx-24  lg:px-14 lg:mx-32 xl:px-16 xl:mx-40  text-paragraph">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Kitchen Top Recommends:
          </h2>
          <article aria-live="polite">
            <h3 className="text-lg md:text-xl lg:text-2xl">
              Beef Bolognese Pasta
            </h3>
            <p className="mt-3 text-md md:text-lg lg:text-1xl">
              <strong>Ingredients:</strong>
            </p>
            <ul className="text-md md:text-lg lg:text-1xl">
              <li>1 lb. ground beef</li>
              <li>1 onion, diced</li>
              <li>3 cloves garlic, minced</li>
              <li>2 tablespoons tomato paste</li>
              <li>1 (28 oz) can crushed tomatoes</li>
              <li>1 cup beef broth</li>
              <li>1 teaspoon dried oregano</li>
              <li>1 teaspoon dried basil</li>
              <li>Salt and pepper to taste</li>
              <li>
                8 oz pasta of your choice (e.g., spaghetti, penne, or linguine)
              </li>
            </ul>
            <p className="mt-3 text-md md:text-lg lg:text-1xl">
              <strong>Instructions:</strong>
            </p>

            <ol className="text-md md:text-lg lg:text-1xl">
              <li>
                Bring a large pot of salted water to a boil for the pasta.
              </li>
              <li>
                In a large skillet or Dutch oven, cook the ground beef over
                medium-high heat, breaking it up with a wooden spoon, until
                browned and cooked through, about 5-7 minutes.
              </li>
              <li>
                Add the diced onion and minced garlic to the skillet and cook
                for 2-3 minutes, until the onion is translucent.
              </li>
              <li>Stir in the tomato paste and cook for 1 minute.</li>
              <li>
                Add the crushed tomatoes, beef broth, oregano, and basil. Season
                with salt and pepper to taste.
              </li>
              <li>
                Reduce the heat to low and let the sauce simmer for 15-20
                minutes, stirring occasionally, to allow the flavors to meld.
              </li>
              <li>
                While the sauce is simmering, cook the pasta according to the
                package instructions. Drain the pasta and return it to the pot.
              </li>
              <li>
                Add the Bolognese sauce to the cooked pasta and toss to combine.
              </li>
              <li>
                Serve hot, garnished with additional fresh basil or grated
                Parmesan cheese if desired.
              </li>
            </ol>
          </article>
        </section>
      )}
    </main>
  );
}
