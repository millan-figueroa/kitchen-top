import React, { JSX } from "react";
import ReactMarkdown, { Components } from "react-markdown";

type RecipeProps = {
  recipe: string;
};

export default function Recipe({ recipe }: RecipeProps): JSX.Element {
  console.log(recipe);
  const components: Components = {
    p: ({ node, ...props }) => <p className="text-paragraph" {...props} />,
    h1: ({ node, ...props }) => (
      <h1 className="text-headline text-3xl font-semibold" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-headline text-2xl font-semibold" {...props} />
    ),
  };

  return (
    <section className="p-8 sm:px-10 sm:mx-16 sm:mt-10 md:px-12 md:mx-24  lg:px-14 lg:mx-32 xl:px-16 xl:mx-40  text-paragraph">
      <ReactMarkdown components={components}>{recipe}</ReactMarkdown>
    </section>
  );
}
