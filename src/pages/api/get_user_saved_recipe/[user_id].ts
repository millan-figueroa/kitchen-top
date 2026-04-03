import client from "../../libs/db";
import { ObjectId } from "mongodb";

export default async function getUserSavedRecipe(req, res) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}

	try {
		//connect to DB
		const clientPromise = await client;
		//select a DB
		//in this case the DB is specified in the MONGODB_URI in env
		const db = clientPromise.db();

		/// dynamic route param
		const { user_id } = req.query;

		//check if user exists in the DB
		//using user_id to check if the user already exists in the DB
		const existUser = await db
			.collection("users")
			.findOne({ _id: new ObjectId(user_id.toString()) });
		if (!existUser) {
			return res.status(422).json({ message: "User not found" });
		}

		//fetch user's saved recipes from the DB
		const recipes = await db.collection("recipes").find({ user_id }).toArray();
		//send the recipe to client
		res.status(200).json({ recipes });

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		res
			.status(500)
			.json({ message: "Something went wrong fetching your saved recipes" });
	}
}
