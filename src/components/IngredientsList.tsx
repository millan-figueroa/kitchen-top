import React, { JSX } from "react";
import Router from "next/router";
import {
	FaDownload,
	FaRedo,
	FaSignInAlt,
	FaShareAlt,
	FaHeart,
} from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { useSession } from "next-auth/react";

interface Recipe {
	title: string;
	ingredients: string[];
	instructions: string[];
}

type IngredientsListProps = {
	ingredients: string[];
	getRecipe: () => void;
	setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
	setRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
	getRecipeStatus: boolean;
	setGetRecipeStatus: React.Dispatch<React.SetStateAction<boolean>>;
	saveRecipe: (
		user_id: string,
	) => Promise<{ success: string; error: string } | undefined>;
};

export default function IngredientsList({
	ingredients,
	getRecipe,
	setIngredients,
	setRecipe,
	getRecipeStatus,
	setGetRecipeStatus,
	saveRecipe,
}: IngredientsListProps): JSX.Element {
	//check ingredients list update
	React.useEffect(() => {
		setGetRecipeStatus(false);
		setSaveRecipeMessage("");
		setError(false);
	}, [ingredients]);

	//get current login user id
	const { data } = useSession();
	const user_id = data?.user?.id;

	const [saveRecipeMessage, setSaveRecipeMessage] = React.useState<string>("");
	const [error, setError] = React.useState(false);

	//display the ingredients list and the get recipe button when user inputs more than 2 ingredients
	const ingredientsListItems = ingredients.map((ingredient, index) => {
		return (
			<li key={index}>
				{ingredient}
				<span
					className="pl-4 text-sm cursor-pointer"
					onClick={() => removeItem(index)}>
					{" "}
					X{" "}
				</span>
			</li>
		);
	});

	//function to remove ingredient from the list
	const removeItem = (id: number) => {
		let listIndex = 0;
		//filter the list and remove the item
		setIngredients(
			ingredients.filter((item) => {
				if (listIndex === id) {
					listIndex++;
					return;
				}
				listIndex++;
				//delete the previous recipe due to removing ingredient
				setRecipe("");
				return item;
			}),
		);
	};

	//function to handle save recipe button click, call the saveRecipe function and display the message after saving recipe
	const saveRecipeHandler = async (user_id: string) => {
		//clear the previous message when user click save recipe button
		setSaveRecipeMessage("");
		setError(false);
		const afterSaveRecipeMessage = await saveRecipe(user_id);
		if (afterSaveRecipeMessage.success) {
			setSaveRecipeMessage(afterSaveRecipeMessage.success);
		} else {
			setError(true);
			setSaveRecipeMessage(afterSaveRecipeMessage.error);
		}
	};

	//function to clear the ingredients list and the recipe when user click new recipe button
	const clearIngredientsItems = () => {
		//clear the ingredients list and the recipe
		setIngredients([]);
		setRecipe("");
	};

	return (
		// Show ingredients list when user inputs more than 2 ingredients
		<div className="px-8 py-4 md:px-6 md:py-2">
			<h2 className="md:p-2 text-xl md:text-2xl lg:text-3xl font-semibold text-headline">
				Ingredients on hand:
			</h2>
			<ul className="ml-4 md:ml-6 lg:ml-8 mt-2 md:p-2 lg:p-4 list-disc text-lg md:text-xl lg:text-2xl text-paragraph">
				{ingredientsListItems}
			</ul>

			{/* Get recipe container */}
			{ingredientsListItems.length > 2 &&
				(!getRecipeStatus ? (
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
							onClick={getRecipe}
							className="px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-accent text-sm md:text-md lg:text-md text-tertiary rounded-md">
							Get recipe!
						</button>
					</div>
				) : (
					<div className="flex justify-between items-center w-full px-6 md:px-10 lg:px-12 p-4 md:p-6 lg:py-8 mt-8 bg-secondary text-paragraph  rounded-lg">
						{/* <div className="p-2 mr-4">
							<h3 className="text-lg md:text-xl lg:text-2xl font-bold text-headline">
								Ready for a recipe?
							</h3>
							<p className="mt-2 lg:mt-4">
								Generate a recipe from your list of ingredients.
							</p>
						</div> */}
						<div className="flex gap-4">
							<button
								onClick={clearIngredientsItems}
								className="px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-accent text-sm md:text-md lg:text-md text-tertiary rounded-md">
								{/* <FaDownload className="block md:hidden w-3 h-4" /> */}
								<GiBroom className="block md:hidden w-3 h-4" />
								<span className="hidden md:block text-sm md:text-md">
									Clear List
								</span>
							</button>
							<button
								// onClick={"Regnerate"}
								className="px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-accent text-sm md:text-md lg:text-md text-tertiary rounded-md">
								<FaRedo className="block md:hidden w-3 h-4" />
								<span className="hidden md:block text-sm md:text-md">
									New Recipe
								</span>
							</button>
							{/* if user is login in display save button else login */}
							{!user_id ? (
								<button
									onClick={() => Router.push("/login")}
									className="px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-accent text-sm md:text-md lg:text-md text-tertiary rounded-md">
									<FaSignInAlt className="block md:hidden w-3 h-4" />
									<span className="hidden md:block text-sm md:text-md">
										Login
									</span>
								</button>
							) : (
								<button
									onClick={() => saveRecipeHandler(user_id)}
									className="px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-accent text-sm md:text-md lg:text-md text-tertiary rounded-md">
									<FaHeart className="block md:hidden w-3 h-4" />
									<span className="hidden md:block text-sm md:text-md">
										Save
									</span>
								</button>
							)}
							<button
								// onClick={"Share"}
								className="px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-accent text-sm md:text-md lg:text-md text-tertiary rounded-md">
								<FaShareAlt className="block md:hidden w-3 h-4" />
								<span className="hidden md:block text-sm md:text-md">
									Share
								</span>
							</button>
						</div>
					</div>
				))}
			{/* display message after saving recipe */}
			{saveRecipeMessage && (
				<div
					className={`mt-4 p-4 rounded-md text-center ${
						error ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
					}`}>
					{saveRecipeMessage}
				</div>
			)}
		</div>
	);
}
