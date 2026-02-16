// pages/api/signup.js
import client from "../libs/db";
import bcrypt from "bcrypt";

export default async function signup(req, res) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}

	const { email, password } = req.body;

	try {
		//connect to DB
		const clientPromise = await client;
		//select a DB
		//in this case the DB is specified in the MONGODB_URI in env
		const db = clientPromise.db();

		//check if user exists
		const existingUser = await db.collection("users").findOne({ email });
		if (existingUser) {
			return res.status(422).json({ message: "User already exists" });
		}

		//hash the password
		const hashedPassword = await bcrypt.hash(password, 12);

		//add user to the DB
		const result = await db.collection("users").insertOne({
			email,
			password: hashedPassword, // Store the hashed password
			createdAt: new Date(),
		});

		res.status(201).json({ message: "User created" });
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
}
