import { useState } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
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
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/80">
            Email Address
          </span>

          <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur transition focus-within:border-[#f4b400]/60 focus-within:bg-white/15">
            <Mail className="h-4 w-4 text-[#f4b400]" />

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@potnplant.com"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>
        </label>

        <div className="space-y-4">
          <button
            type="submit"
            className="w-full rounded-xl bg-[#f4b400] py-3 text-sm font-semibold uppercase tracking-widest text-[#062d19] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#ffd35a]"
          >
            Send Reset Link
          </button>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-white/70 transition hover:text-[#f4b400] hover:underline"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}