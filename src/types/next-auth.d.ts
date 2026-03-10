import { DefaultSession } from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's id and email to be save in session instance */
			id?: string;
			email?: string;
			name?: string;
			image?: string;
			githubId?: string; // GitHub ID (string)
			googleId?: string; // Google ID (string)
		} & DefaultSession["user"];
	}
	// add custom data to the JWT token
	interface User {
		githubId?: string; // GitHub ID (string)
		googleId?: string; // Google ID (string)
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		idToken?: string;
	}
}
