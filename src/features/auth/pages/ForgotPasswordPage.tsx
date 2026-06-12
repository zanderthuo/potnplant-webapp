import { useState } from "react";
import { Mail } from "lucide-react";
import { AuthLayout } from "../../../components/layout/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ email });
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a reset link"
    >
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <div className="flex items-center gap-3 border border-border px-4 py-3">
            <Mail className="h-4 w-4 text-muted-foreground" />

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary py-3 font-medium text-primary-foreground hover:bg-leaf-deep"
        >
          Send Reset Link
        </button>
      </form>
    </AuthLayout>
  );
}