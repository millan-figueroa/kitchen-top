import { useState } from "react";
import Router from "next/router";

type FormData = {
	email: string;
	password: string;
	confirmPassword: string;
};

export default function SignUpForm() {
	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert("Passwords do not match.");
			return;
		}
		console.log("You are sign in buddy!");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col w-full max-w-md p-6 md:p-8 lg:p-10  rounded-xl border-2 border-stroke space-y-5">
			<h2 className="text-xl font-semibold text-headline text-center">
				Create an Account
			</h2>

			<input
				name="email"
				type="email"
				placeholder="Email"
				value={formData.email}
				onChange={handleChange}
				required
				className="h-10 lg:h-12 px-3 text-headline border-2 border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-button"
			/>

			<input
				name="password"
				type="password"
				placeholder="Password"
				value={formData.password}
				onChange={handleChange}
				required
				className="h-10 lg:h-12 px-3 text-headline border-2 border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-button"
			/>

			<input
				name="confirmPassword"
				type="password"
				placeholder="Confirm Password"
				value={formData.confirmPassword}
				onChange={handleChange}
				required
				className="h-10 lg:h-12 px-3 text-headline border-2 border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-button"
			/>

			<button
				type="submit"
				className="h-10 md:h-12 w-full bg-button text-buttonText text-sm md:text-md font-medium rounded-md hover:opacity-90 transition">
				Sign Up
			</button>
		</form>
	);
}
