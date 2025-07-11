import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl mb-4">Create an Account</h1>
      <SignUpForm
        onSignUp={(formData) => {
          console.log("Sign up data:", formData);
        }}
      />
    </main>
  );
}
