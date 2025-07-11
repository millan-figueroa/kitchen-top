import React, { JSX } from "react";

type SignUpFormProps = {
  onSignUp: (formData: FormData) => void;
};

export default function SignUpForm({ onSignUp }: SignUpFormProps): JSX.Element {
  return (
    <form
      action={onSignUp}
      className="flex flex-col w-full gap-4 p-4 md:p-6 lg:p-8"
    >
      <input
        className="w-full h-10 lg:h-12 pl-2 text-headline border-2 border-stroke rounded-md"
        type="text"
        placeholder="Username"
        aria-label="Username"
        name="username"
        required
      />
      <input
        className="w-full h-10 lg:h-12 pl-2 text-headline border-2 border-stroke rounded-md"
        type="email"
        placeholder="Email"
        aria-label="Email"
        name="email"
        required
      />
      <input
        className="w-full h-10 lg:h-12 pl-2 text-headline border-2 border-stroke rounded-md"
        type="password"
        placeholder="Password"
        aria-label="Password"
        name="password"
        required
      />
      <button className="w-full h-10 lg:h-12 p-1 bg-button text-buttonText text-sm md:text-md lg:text-md rounded-md">
        <span className="block md:hidden">Sign Up</span>
        <span className="hidden md:block lg:block">Create Account</span>
      </button>
    </form>
  );
}
