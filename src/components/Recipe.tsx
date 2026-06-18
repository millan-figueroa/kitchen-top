import React, { JSX } from "react";

interface Recipe {
	title: string;
	ingredients: string[];
	instructions: string[];
}

type RecipeProps = {
	recipe: Recipe | null;
	savedRecipe?: boolean; //If this is a user's saved recipe remove some styling to fit the page and for printing to PDF, default is false which means it's a recipe from AI
};

export default function Recipe({
	recipe,
	savedRecipe,
}: RecipeProps): JSX.Element {
	return (
		<section
			className={`p-8 sm:px-10  sm:mt-10 md:px-12   lg:px-14  xl:px-16   text-paragraph ${savedRecipe ? "" : "md:mx-24 sm:mx-16 lg:mx-32 xl:mx-40"}`}>
			{recipe ? (
				<>
					<h1 className="text-headline text-3xl font-semibold mb-4">
						{recipe?.title}
					</h1>
					<h2 className="text-headline text-2xl font-semibold mb-2">
						Ingredients
					</h2>
					<ul className="list-disc ml-6 mb-4">
						{recipe?.ingredients.map((ing: string, index: number) => (
							<li key={index}>{ing}</li>
						))}
					</ul>
					<h2 className="text-headline text-2xl font-semibold mb-2">
						Instructions
					</h2>
					<ol className="list-decimal ml-6">
						{recipe?.instructions.map((step: string, index: number) => (
							<li key={index}>{step}</li>
						))}
					</ol>
					{/* <ReactMarkdown components={components}>{recipe}</ReactMarkdown> */}
				</>
			) : (
				<p className="text-paragraph font-semibold text-xl text-center">
					Turn the music up 🎵🎵 and let&apos;s get cooking 🍳🍽️😋🥠!
				</p>
			)}
		</section>
	);
}
