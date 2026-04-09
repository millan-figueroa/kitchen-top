import client from "../../libs/db";
import { ObjectId } from "mongodb";

export default async function displaySavedRecipe(req, res) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}

	try {
		//connect to DB
		const clientPromise = await client;
		//select a DB
		//in this case the DB is specified in the MONGODB_URI in env
		const db = clientPromise.db();

		//get dynamic route param
		const { recipe_id } = req.query;

		//check if recipe exists in the DB
		//checking if the recipe exists and belongs to the user making the request using recipe_id and user_id
		const recipe = await db
			.collection("recipes")
			.findOne({ _id: new ObjectId(recipe_id.toString()) });

		if (!recipe) {
			return res
				.status(404)
				.json({ message: "Recipe was not found", code: 404 });
		}

		//recipe exist then return the recipe in JSON
		res.status(200).json({
			id: recipe._id,
			title: recipe.title,
			ingredients: recipe.ingredients,
			instructions: recipe.instructions,
			user_id: recipe.user_id,
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		res.status(500).json({
			message: "The recipe could not be fetched or no longer exists",
			code: 500,
		});
	}
}
