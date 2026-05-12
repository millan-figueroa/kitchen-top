import nodemailer from "nodemailer";

// reusable nodemailer setup
export const transporter = nodemailer.createTransport({
	// host: process.env.SMTP_HOST,
	// port: Number(process.env.SMTP_PORT),
	// secure: true,
	service: "gmail",
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});
