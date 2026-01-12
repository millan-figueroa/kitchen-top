"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
	const [user, setUser] = useState(false);
	const router = useRouter();

	useEffect(() => {
		console.log("we are in here at the context level");
	}, []);

	const handleLogout = async () => {
		try {
			console.log("You are logged out, sike!");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<UserContext.Provider value={{ user, setUser, handleLogout }}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
