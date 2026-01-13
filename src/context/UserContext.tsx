"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type User = unknown; // TODO: replace with your real user shape later

type UserContextValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogout: () => Promise<void>;
};

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

export const useUserContext = () => {
  //hook throws error if provider is missing
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("useUserContext must be used within UserContextProvider");
  return ctx;
};

type Props = {
  children: ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Whatever "logout" means now that Firebase is removed:
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = useMemo(
    () => ({ user, setUser, handleLogout }),
    [user, handleLogout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
