import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

type FormData = {
	password: string;
	confirmPassword: string;
};

export default function ResetPasswordForm() {
	//get the token from the query param to be sent off to the backend when resetting the password
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [formData, setFormData] = useState<FormData>({
		password: "",
		confirmPassword: "",
	});

	const [error, setError] = useState<string | "">("");
	const [successMessage, setSuccessMessage] = useState<string | "">("");

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
			const res = await axios.post("/api/password_reset/reset_password", {
				password: formData.password,
				token,
			});
			console.log(res.data);
			setSuccessMessage(res.data.message);
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

			{successMessage && (
				<span className="text-green-600 text-center text-sm font-bold">
					{successMessage}
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
				Reset Password
			</button>
		</form>
	);
}
