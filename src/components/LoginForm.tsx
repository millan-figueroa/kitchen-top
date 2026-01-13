import { useUserContext } from "@/context/UserContext";
import { useState, useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import Router from "next/router";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  //setUser after login in
  const { setUser } = useUserContext();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Redirect to user page after login
    Router.push("/userpage");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md p-8 my-8 md:p-8 lg:p-10 rounded-xl border-2 border-stroke space-y-5"
    >
      <h2 className="text-xl font-semibold md:my-4 lg:my-6 text-headline text-center">
        Login to Your Account
      </h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="h-10 lg:h-12 px-3 text-headline border-2 border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-button"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="h-10 lg:h-12 px-3 text-headline border-2 border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-button"
      />

      <button
        type="submit"
        className="h-10 md:h-12 w-full bg-button text-buttonText text-sm md:text-md font-medium rounded-md hover:opacity-90 transition"
      >
        Login
      </button>

      <Link href="/signup">
        <button className="h-10 md:h-12 w-full bg-button text-buttonText text-sm md:text-md font-medium rounded-md hover:opacity-90 transition">
          Register
        </button>
      </Link>
    </form>
  );
}
