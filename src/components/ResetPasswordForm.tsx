import axios from "axios";
import { useState } from "react";

type FormData = {
	password: string;
	confirmPassword: string;
};

export default function ResetPasswordForm() {
	const [formData, setFormData] = useState<FormData>({
		password: "",
		confirmPassword: "",
	});

	const [error, setError] = useState<string | "">("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			//remove the error message
			setError("");
			//check if the password and confirm password match
			if (formData.password !== formData.confirmPassword) {
				alert("Passwords do not match.");
				return;
			}

			//registering the user
			const res = await axios.post("/api/resetpassword", {
				password: formData.password,
			});
			console.log(res.data);
		} catch (error) {
			//check if the error is an AxiosError and has a response,
			// then set the error message from the response, otherwise set a generic error message
			if (axios.isAxiosError(error) && error.response) {
				console.log("Hello");
				setError(error.response.data.message);
			} else setError(String(error));
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col w-full max-w-md p-6 md:p-8 lg:p-10  rounded-xl border-2 border-stroke space-y-5">
			<h2 className="text-xl font-semibold text-headline text-center">
				Reset Password
			</h2>
			{error && (
				<span className="text-red-600 text-center text-sm font-bold">
					*{error}
				</span>
			)}

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
