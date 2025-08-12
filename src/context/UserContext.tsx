"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase/config";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      console.log("User state changed:", firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state
      router.push("/"); // redirect after logout
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
