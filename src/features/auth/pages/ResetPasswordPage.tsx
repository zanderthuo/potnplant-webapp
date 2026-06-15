import { useState } from "react";
import { Lock } from "lucide-react";
import { AuthLayout } from "../../../components/layout/AuthLayout";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({
      password,
      confirmPassword,
    });
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Create a new password">
      <form onSubmit={submit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/80">
            New Password
          </span>

          <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur transition focus-within:border-[#f4b400]/60 focus-within:bg-white/15">
            <Lock className="h-4 w-4 text-[#f4b400]" />

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/80">
            Confirm Password
          </span>

          <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur transition focus-within:border-[#f4b400]/60 focus-within:bg-white/15">
            <Lock className="h-4 w-4 text-[#f4b400]" />

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#f4b400] py-3 text-sm font-semibold uppercase tracking-widest text-[#062d19] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#ffd35a]"
        >
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}