import React, { JSX } from "react";

type RecipeProps = {
  recipe: string;
};

export default function Recipe({ recipe }: RecipeProps): JSX.Element {
  return (
    <section className="p-8 font-semibold sm:px-10 sm:mx-16 sm:mt-10 md:px-12 md:mx-24  lg:px-14 lg:mx-32 xl:px-16 xl:mx-40  text-paragraph">
      {recipe}
    </section>
  );
}
