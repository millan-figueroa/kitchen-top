import LoginForm from "@/components/LoginForm";
import { currentUser } from "@/firebase/auth";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center min-h-screen p-6">
      <LoginForm />
    </main>
  );
}
