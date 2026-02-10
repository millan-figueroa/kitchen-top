import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/pages/libs/db";
import bcrypt from "bcrypt"

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: MongoDBAdapter(client),
	providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
        async authorize(credentials,req) {
          
            //credentials might be null
            if (!credentials) {
                throw new Error('Credentials are null')
            }
            //connect to mongo server
            const clientDB = await client;
            //specify the db in our case it in the URI
            const db = clientDB.db()
            //find the collection we need
        const user = await db.collection('users').findOne({ email: credentials.email });
        
            //if user exists
            if (user && user.password) {
                const isValid = await bcrypt.compare(credentials.password, user.password)
                if (isValid) {
                    //return the user object
                    return { id: user._id.toString(), email: user.email };
                }
            } else {
                throw new Error("Invalid Email/Password")
            }
            
            return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
});
});
