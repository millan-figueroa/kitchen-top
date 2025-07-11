import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center min-h-screen p-6">
      <SignUpForm
        onSignUp={(formData) => {
          console.log("Sign up data:", formData);
        }}
      />
    </main>
  );
}
