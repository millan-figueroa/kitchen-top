import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [],
})