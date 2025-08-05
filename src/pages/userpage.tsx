"use client";
import { currentUser } from "@/firebase/auth";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

type User = {
  email?: string;
  uid?: string;
};

export default function UserPage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
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
  );
}
