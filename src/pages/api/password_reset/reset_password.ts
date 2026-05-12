import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ObjectId } from "bson";

export default async function ResetPassword(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	try {
		//connect to DB
		const clientPromise = await client;
		//select a DB
		//in this case the DB is specified in the MONGODB_URI in env
		const db = clientPromise.db();

		//get token and new password from request body
		const { token, password } = req.body;
		if (!token || !password) {
			return res
				.status(400)
				.json({ message: "Token and password are required" });
		}

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

		//hash the password
		const hashedPassword = await bcrypt.hash(password, 12);

		//update the user's password and remove the reset token
		await db.collection("users").updateOne(
			{ _id: user._id },
			{
				$set: { password: hashedPassword },
				$unset: { passwordResetToken: "" },
			},
		);

		return res.status(200).json({ message: "Password reset successful" });
	} catch (error) {
		console.error("Error in reset password:", error);
		return res.status(400).json({ message: "Invalid or expired token" });
	}
}
