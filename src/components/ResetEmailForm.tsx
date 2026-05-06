import { useState } from "react";

export default function ResetEmailForm() {
	const [email, setEmail] = useState("");
	return (
		<form
			// onSubmit={handleSubmit}
			className="flex flex-col w-full max-w-md p-8 my-8 md:p-8 lg:p-10 rounded-xl border-2 border-stroke space-y-5">
			<h2 className="text-xl font-semibold md:my-4 lg:my-6 text-headline text-center">
				Reset Password
			</h2>

			<input
				name="email"
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				className="h-10 lg:h-12 px-3 text-headline border-2 border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-button"
			/>

			<button
				type="submit"
				className="h-10 md:h-12 w-full bg-button text-buttonText text-sm md:text-md font-medium rounded-md hover:opacity-90 transition">
				Send Reset Link
			</button>
		</form>
	);
}
