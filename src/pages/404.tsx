import Link from "next/link";

export default function Custom404() {
	return (
		<div className="flex flex-col items-center justify-center h-screen text-center">
			<h1 className="text-6xl font-bold text-gray-800">404</h1>
			<p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
			<Link
				href="/"
				className="mt-6 px-4 py-2 bg-button text-buttonText rounded">
				Go Back Home
			</Link>
		</div>
	);
}
