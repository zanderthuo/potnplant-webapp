import { useEffect, useState, type FormEvent } from "react";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loginThunk, resetLoginState } from "../store/authSlice";
import { AuthLayout } from "../../../components/layout/AuthLayout";

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN", "admin", "super_admin"];

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loggingIn, loginError, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAdminUser = (role?: string) => {
    return role ? ADMIN_ROLES.includes(role) : false;
  };

  useEffect(() => {
    dispatch(resetLoginState());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(isAdminUser(user.role) ? "/admin" : "/", {
        replace: true,
      });
    }
  }, [isAuthenticated, user, navigate]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await dispatch(
      loginThunk({
        email: email.trim(),
        password,
      })
    );

    if (loginThunk.fulfilled.match(result)) {
      const role = result.payload.user?.role;

      navigate(isAdminUser(role) ? "/admin" : "/", {
        replace: true,
      });
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your account">
      <form onSubmit={submit} className="space-y-5">
        {loginError && (
          <div className="rounded border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {loginError}
          </div>
        )}

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Email Address
          </span>

          <div className="flex items-center gap-3 border border-border bg-background px-4 py-3">
            <Mail className="h-4 w-4 text-muted-foreground" />

            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              disabled={loggingIn}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@potnplant.com"
              className="w-full bg-transparent text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Password</span>

          <div className="flex items-center gap-3 border border-border bg-background px-4 py-3">
            <Lock className="h-4 w-4 text-muted-foreground" />

            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              disabled={loggingIn}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              className="w-full bg-transparent text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </label>

        <a
          href="/forgot-password"
          className="block text-right text-sm text-primary hover:underline"
        >
          Forgot Password?
        </a>

        <button
          type="submit"
          disabled={loggingIn}
          className="w-full bg-primary py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
}