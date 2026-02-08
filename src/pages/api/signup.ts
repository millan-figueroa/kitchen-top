// pages/api/signup.js
import client from "../libs/db";
import bcrypt from "bcrypt";

export default async function signup(req, res) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}

	const { email, password, name } = req.body;

	try {
		const clientPromise = await client;
		const db = clientPromise.db(); // Specify your database name if needed

		const existingUser = await db.collection("users").findOne({ email });
		if (existingUser) {
			return res.status(422).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await db.collection("users").insertOne({
			email,
			name,
			hashedPassword, // Store the hashed password
			createdAt: new Date(),
		});

		res.status(201).json({ message: "User created" });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
}
