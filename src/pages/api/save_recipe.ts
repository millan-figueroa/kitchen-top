import client from "../libs/db";

export default async function saveRecipe(req, res) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}

	try {
		//connect to DB
		const clientPromise = await client;
		//select a DB
		//in this case the DB is specified in the MONGODB_URI in env
		const db = clientPromise.db();

		//user_id and recipe
		const { user_id, title, ingredients, instructions } = req.body;

		//check if the recipe is already saved by the user
		//using user_id, title and instructions to check if the recipe already exists in the DB
		const existingRecipe = await db
			.collection("recipes")
			.findOne({ user_id, title, instructions });
		if (existingRecipe) {
			return res.status(400).json({ message: "Recipe already saved" });
		}

		//add recipe to the DB
		const result = await db.collection("recipes").insertOne({
			user_id,
			title,
			instructions,
			ingredients,
			createdAt: new Date(),
		});

		console.log("These are the results", result);

		res.status(201).json({ message: "Recipe saved" });
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
}
