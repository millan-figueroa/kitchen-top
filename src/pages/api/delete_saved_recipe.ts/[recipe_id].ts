import client from "../../libs/db";
import { ObjectId } from "mongodb";

export default async function deleteUserSavedRecipe(req, res) {
	if (req.method !== "DELETE") {
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
		const { user_id } = req.query;

		//check if recipe exists in the DB
		//checking if the recipe exists and belongs to the user making the request using recipe_id and user_id
		const existRecipe = await db
			.collection("recipes")
			.findOne({ _id: new ObjectId(recipe_id.toString()), user_id });

		if (!existRecipe) {
			return res
				.status(404)
				.json({ message: "Recipe not found or unauthorized" });
		}

		//delete the recipe from the DB
		await db
			.collection("recipes")
			.deleteOne({ _id: new ObjectId(recipe_id.toString()) });

		res.status(204).json({ message: "Recipe deleted" });

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		res
			.status(500)
			.json({ message: "Something went wrong fetching your saved recipes" });
	}
}
