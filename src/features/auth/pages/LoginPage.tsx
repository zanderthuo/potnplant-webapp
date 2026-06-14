import { useEffect, useState, type FormEvent } from "react";
import { Lock, Mail } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

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
          <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {loginError}
          </div>
        )}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/80">
            Email Address
          </span>

          <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur transition focus-within:border-[#f4b400]/60 focus-within:bg-white/15">
            <Mail className="h-4 w-4 text-[#f4b400]" />

            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              disabled={loggingIn}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@potnplant.com"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/80">
            Password
          </span>

          <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur transition focus-within:border-[#f4b400]/60 focus-within:bg-white/15">
            <Lock className="h-4 w-4 text-[#f4b400]" />

            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              disabled={loggingIn}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </label>

        <Link
            to="/forgot-password"
            className="block text-right text-sm text-[#f4b400] hover:text-white hover:underline"
          >
            Forgot Password?
          </Link>

        <button
          type="submit"
          disabled={loggingIn}
          className="w-full rounded-xl bg-[#f4b400] py-3 text-sm font-semibold uppercase tracking-widest text-[#062d19] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#ffd35a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loggingIn ? "Logging in..." : "Login"}
        </button>
        <div className="flex items-center justify-center gap-4 border-t border-white/10 pt-4">
        <Link
          to="/"
          className="text-sm text-white/70 transition hover:text-[#f4b400]"
        >
          ← Back to Home
        </Link>

        <span className="text-white/20">|</span>

        <Link
          to="/shop"
          className="text-sm text-white/70 transition hover:text-[#f4b400]"
        >
          Browse Plants
        </Link>
      </div>
      </form>
    </AuthLayout>
  );
}