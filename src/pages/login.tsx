import LoginForm from "@/components/LoginForm";
import { currentUser } from "@/firebase/auth";

export default function LoginPage() {
  return (
    <main className="flex justify-center p-6">
      <LoginForm />
    </main>
  );
}
