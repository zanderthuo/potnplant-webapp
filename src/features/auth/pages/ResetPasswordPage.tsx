import { useState } from "react";
import { Lock } from "lucide-react";
import { AuthLayout } from "../../../components/layout/AuthLayout";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

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
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new password"
    >
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            New Password
          </label>

          <div className="flex items-center gap-3 border border-border px-4 py-3">
            <Lock className="h-4 w-4 text-muted-foreground" />

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>

          <div className="flex items-center gap-3 border border-border px-4 py-3">
            <Lock className="h-4 w-4 text-muted-foreground" />

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary py-3 font-medium text-primary-foreground hover:bg-leaf-deep"
        >
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}