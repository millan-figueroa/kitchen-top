import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { signIn } from "next-auth/react";

type FormData = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const router = Router;
	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
	});

	//login error state
	const [loginError, setLoginError] = useState<string | "">("");
	//show password state
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		//clear login error when user starts typing
		if (loginError) {
			setLoginError("");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();

			// Call the signIn function with the 'credentials' provider and user data
			const res = await signIn("credentials", {
				email: formData.email,
				password: formData.password,
				redirect: false, // Set to true to redirect to a default or specified callbackUrl after sign-in
				callbackUrl: "/", // Optional: URL to redirect to after success
			});

			if (res?.error) {
				// Handle generic errors or capture the exact thrown message
				if (res.error === "CredentialsSignin") {
					setLoginError("Invalid email or password.");
				} else {
					setLoginError(res.error);
				}
			} else {
				// Login was successful!
				// NextAuth gives you the URL in res.url, but you must trigger the move:
				router.push(res?.url || "/");
			}
		} catch (err) {
			console.error("Error:", err);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col w-full max-w-md p-8 my-8 md:p-8 lg:p-10 rounded-xl border-2 border-stroke space-y-5">
			<h2 className="text-xl font-semibold md:my-4 lg:my-6 text-headline text-center">
				Login to Your Account
			</h2>

			<button
				type="button"
				onClick={() => signIn("github", { callbackUrl: "/" })}
				className="h-10 md:h-12 w-full bg-button text-buttonText text-sm md:text-md font-medium rounded-md hover:opacity-90 transition">
				Github SignIn
			</button>
			<button
				type="button"
				onClick={() => signIn("google", { callbackUrl: "/" })}
				className="h-10 md:h-12 w-full bg-button text-buttonText text-sm md:text-md font-medium rounded-md hover:opacity-90 transition">
				Google SignIn
			</button>

			<div className="flex items-center gap-4">
				<div className="flex-grow border-t-2 border-stroke"></div>
				<span className="text-sm text-headline">OR</span>
				<div className="flex-grow border-t-2 border-stroke"></div>
			</div>

			{/* display the credential error message if it exists */}
			{loginError && (
				<p className="text-red-500 text-sm text-center">{loginError}</p>
			)}

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
				type={showPassword ? "text" : "password"}
				placeholder="Password"
				value={formData.password}
				onChange={handleChange}
				required
				className="h-10 lg:h-12 px-3 text-headline border-2 border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-button"
			/>

			{/* //show password checkbox */}
			<div className="flex items-center">
				<input
					type="checkbox"
					id="showPassword"
					onChange={() => setShowPassword(!showPassword)}
					className="h-4 w-4 text-button focus:ring-button border-stroke rounded"
				/>
				<label htmlFor="showPassword" className="ml-2 text-sm text-headline">
					Show Password
				</label>
			</div>

			<button
				type="submit"
				className="h-10 md:h-12 w-full bg-button text-buttonText text-sm md:text-md font-medium rounded-md hover:opacity-90 transition">
				Login
			</button>

			<Link href="/signup">
				<button className="h-10 md:h-12 w-full bg-button text-buttonText text-sm md:text-md font-medium rounded-md hover:opacity-90 transition">
					Register
				</button>
			</Link>
			<p className="text-sm text-headline text-center">
				<Link href="/forgotpassword" className="text-blue-500 hover:underline">
					Forgot your password?
				</Link>
			</p>
		</form>
	);
}
