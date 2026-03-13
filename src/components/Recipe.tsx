import React, { JSX } from "react";

type RecipeProps = {
	recipe: string;
};

export default function Recipe({ recipe }: RecipeProps): JSX.Element {
	//parse the string to JSON object
	const recipeObj = recipe && JSON.parse(recipe);

	return (
		<section className="p-8 sm:px-10 sm:mx-16 sm:mt-10 md:px-12 md:mx-24  lg:px-14 lg:mx-32 xl:px-16 xl:mx-40  text-paragraph">
			{recipeObj ? (
				<>
					<h1 className="text-headline text-3xl font-semibold mb-4">
						{recipeObj?.title}
					</h1>
					<h2 className="text-headline text-2xl font-semibold mb-2">
						Ingredients
					</h2>
					<ul className="list-disc ml-6 mb-4">
						{recipeObj?.ingredients.map((ing: string, index: number) => (
							<li key={index}>{ing}</li>
						))}
					</ul>
					<h2 className="text-headline text-2xl font-semibold mb-2">
						Instructions
					</h2>
					<ol className="list-decimal ml-6">
						{recipeObj?.instructions.map((step: string, index: number) => (
							<li key={index}>{step}</li>
						))}
					</ol>
					{/* <ReactMarkdown components={components}>{recipe}</ReactMarkdown> */}
				</>
			) : (
				<p className="text-paragraph">No recipe found. Please try again.</p>
			)}
		</section>
	);
}
