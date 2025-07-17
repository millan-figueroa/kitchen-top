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
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <h1>User Account</h1>
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
