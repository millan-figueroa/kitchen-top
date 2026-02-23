import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import client from "@/pages/libs/db";
import bcrypt from "bcrypt";

//export these option to [...nextauth].ts
export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(client),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				//credentials might be null
				if (!credentials) {
					throw new Error("Credentials are null");
				}
				//connect to mongo server
				const clientDB = await client;
				//specify the db in our case it in the URI
				const db = clientDB.db();
				//find the collection we need
				const user = await db
					.collection("users")
					.findOne({ email: credentials.email });

				//check user
				console.log("User: ", user);

				//if user exists
				if (user && user.password) {
					const isValid = await bcrypt.compare(
						credentials.password,
						user.password,
					);

					//check valid
					console.log("isValid ", isValid);
					if (isValid) {
						//return the user object
						// Any object returned will be saved in `user` property of the JWT
						return { id: user._id.toString(), email: user.email };
					}
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					throw new Error("Invalid Email/Password");
				}

				return null;
			},
		}),

		// Github Provider
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
			authorization: {
				params: {
					prompt: "select_account", // Forces the account picker
				},
			},

			async profile(profile) {
				console.log("This is a profile:", profile);

				return {
					id: profile.id.toString(), // GitHub ID (string)
					name: profile.name,
					email: profile.email,
					image: profile.avatar_url,
					// Custom fields you want stored in MongoDB
					username: profile.login,
					githubId: profile.id,
				};
			},
		}),
	],
	session: {
		// Set it as jwt instead of database
		strategy: "jwt",

		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 24 * 60 * 60, //24 hours
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id; //MongoDB _id (string)
				token.email = user.email;
			}
			console.log("jwt is: ", token);
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.user.id = token.id as string;
			session.user.email = token.email as string;
			console.log(session, " is this");
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
};
