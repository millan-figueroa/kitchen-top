import React, { JSX, useEffect, useState } from "react";

export default function Loading(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true);
  const [recipeReady, setRecipeReady] = React.useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-500 font-bold">
            Coming up with some delicious ideas...
          </p>
        </div>
      ) : (
        <p className="text-green-600">{recipeReady}</p>
      )}
    </div>
  );
}
