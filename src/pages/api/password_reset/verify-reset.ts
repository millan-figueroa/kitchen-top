import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/db";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export default async function VerifyReset(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET")
		return res.status(405).json({ message: "Method not allowed" });

	const { token } = req.query;
	if (!token) return res.status(400).json({ message: "Token is required" });

	try {
		//connect to DB
		const clientPromise = await client;
		//select a DB
		//in this case the DB is specified in the MONGODB_URI in env
		const db = clientPromise.db();

		//decode the token
		const decoded = jwt.verify(
			token as string,
			process.env.RESET_TOKEN_SECRET!,
		) as { userId: string };

		//find user with the token
		const user = await db.collection("users").findOne({
			_id: new ObjectId(decoded.userId),
			passwordResetToken: token,
		});

		//if user not found, token is invalid or expired
		if (!user) {
			return res.status(400).json({ message: "Invalid or expired token" });
		}

		//token is valid
		return res.status(200).json({ message: "Token is valid" });
	} catch (error) {
		console.error("Error in verify reset:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}
