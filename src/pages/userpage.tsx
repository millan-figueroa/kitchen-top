"use client";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col w-full max-w-md p-6 md:p-8 lg:p-10 text-headline text-center">
        <h2 className="text-xl font-semibold p-10">User Account</h2>
        <div>
          {user ? (
            <>
              <p>Email: {user.email}</p>
              <p>UID: {user.uid}</p>
            </>
          ) : (
            <p>No user found.</p>
          )}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="w-32 h-10 my-8 md:w-48 lg:w-60 lg:h-12 p-1 bg-button text-buttonText text-sm md:text-md lg:text-md rounded-md"
      >
        <span className="block md:hidden">Log Out</span>
        <span className="hidden md:block lg:block">Log Out</span>
      </button>
    </div>
  );
}
