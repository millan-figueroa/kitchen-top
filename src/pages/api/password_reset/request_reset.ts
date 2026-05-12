import client from "../../libs/db";
import * as jwt from "jsonwebtoken";
import { transporter } from "../../libs/nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function RequestReset(
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

		//get email from request body
		const { email } = req.body;

		//check if user with the email exists
		const user = await db.collection("users").findOne({ email });

		//if user not found, do NOT reveal that to the client for security reasons
		if (!user) {
			// Do NOT reveal if user exists
			return res
				.status(200)
				.json({ message: "If that email exists, a reset link was sent" });
		}

		//check if user is sign up via third party
		//google sign in users won't have a password and shouldn't be able to reset password
		if (user.googleId) {
			return res.status(400).json({
				message:
					"This email is registered via Google Sign-In. Please use that to log in.",
			});
		}
		//github sign in users won't have a password and shouldn't be able to reset password
		if (user.githubId) {
			return res.status(400).json({
				message:
					"This email is registered via GitHub Sign-In. Please use that to log in.",
			});
		}

		// Here you would generate a reset token
		const token = jwt.sign(
			{ userId: user._id },
			process.env.RESET_TOKEN_SECRET as string,
			{ expiresIn: "15m" },
		);

		//save it to the user's record
		await db
			.collection("users")
			.updateOne({ _id: user._id }, { $set: { passwordResetToken: token } });

		//reset URL to be sent in the email
		const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/resetpassword?token=${token}`;

		// Here you would send the email with the reset URL
		await transporter.sendMail(
			{
				from: `"Kitchen Top Recipe App" <${process.env.SMTP_USER}>`,
				to: email,
				subject: "Reset Your Password",
				html: `
                    <p>You requested a password reset.</p>
                    <p>Click the link below to reset your password:</p>
                    <a href="${resetUrl}">${resetUrl}</a>
                    <p>This link expires in 15 minutes.</p>
                `,
			},
			(error, info) => {
				if (error) {
					return console.log("Error:", error);
				}
				console.log("Email sent:", info.response);
			},
		);

		// return a success response (do NOT reveal if user exists or not)
		return res.status(200).json({ message: "Reset link sent" });
	} catch (error) {
		console.error("Error in request reset:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}
