import ResetPasswordForm from "@/components/ResetPasswordForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	// State to track if the token is valid or not
	const [validToken, setValidToken] = useState<boolean | null>(null);

	useEffect(() => {
		// If there's no token, we can immediately set validToken to false
		if (!token) {
			setValidToken(false);
			return;
		}
		// Verify the token by making a request to the backend
		const verifyToken = async () => {
			try {
				const response = await axios.get(
					`/api/password_reset/verify-reset?token=${token}`,
				);
				setValidToken(response.data.valid);
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				setValidToken(false);
			}
		};

		verifyToken();
	}, [token]);

	return (
		<main className="flex justify-center p-6">
			{/* token is invalid */}
			{validToken === false && (
				<div className="text-center">
					<h2 className="text-2xl font-semibold text-headline mb-4">
						Invalid or Expired Token
					</h2>
					<p className="text-headline">
						The token you provided is invalid or has expired.
					</p>
				</div>
			)}
			{/* token is valid */}
			{validToken === true && <ResetPasswordForm />}
		</main>
	);
}
