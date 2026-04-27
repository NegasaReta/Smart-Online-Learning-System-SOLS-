import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import {
  loginSchema,
  loginDefaultValues,
  type LoginFormValues,
} from "../validation/login.schema";

const ROLE_REDIRECTS: Record<string, string> = {
  student: "/student/dashboard",
  teacher: "/student/dashboard",
  admin: "/admin/dashboard",
};

export function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    await new Promise((r) => setTimeout(r, 700));
    navigate(ROLE_REDIRECTS[values.role] ?? "/student/dashboard", { replace: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full max-w-[380px] flex-col gap-5"
      aria-label="Login form"
    >
      {/* Serif heading — matches reference exactly */}
      <div className="flex flex-col gap-1.5 text-center">
        <h2
          className="text-[42px] font-bold leading-tight tracking-tight text-ink-900"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Welcome Back
        </h2>
        <p className="text-sm text-ink-500">
          Enter your email and password to access your account
        </p>
      </div>

      {/* Role selector — small, subtle, below heading */}
      <div className="flex flex-col gap-1">
        <label htmlFor="role" className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
          Sign in as
        </label>
        <select
          id="role"
          {...register("role")}
          className="h-10 w-full rounded-lg border border-ink-200 bg-ink-50 px-3 text-sm text-ink-700 outline-none transition focus:border-ink-900 focus:ring-2 focus:ring-ink-900/10"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <span className="text-xs text-red-600">{errors.role.message}</span>}
      </div>

      {/* Server error */}
      {serverError && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{serverError}</span>
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-ink-900">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          {...register("email")}
          className="h-12 w-full rounded-xl border border-ink-200 bg-[#f7f8fa] px-4 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-ink-900 focus:bg-white focus:ring-2 focus:ring-ink-900/10"
          aria-invalid={!!errors.email}
        />
        {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-ink-900">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register("password")}
            className="h-12 w-full rounded-xl border border-ink-200 bg-[#f7f8fa] px-4 pr-12 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-ink-900 focus:bg-white focus:ring-2 focus:ring-ink-900/10"
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 transition hover:text-ink-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye className="size-4" aria-hidden /> : <EyeOff className="size-4" aria-hidden />}
          </button>
        </div>
        {errors.password && <span className="text-xs text-red-600">{errors.password.message}</span>}
      </div>

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" {...register("rememberMe")} className="size-4 rounded border-ink-300 accent-ink-900" />
          Remember me
        </label>
        <Link to="/forgot-password" className="text-sm font-medium text-ink-900 transition hover:underline">
          Forgot Password
        </Link>
      </div>

      {/* Sign In — full-width black button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-12 w-full items-center justify-center rounded-xl bg-ink-900 text-sm font-semibold text-white transition hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <><Loader2 className="mr-2 size-4 animate-spin" aria-hidden />Signing in…</>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Google — bordered button */}
      <button
        type="button"
        onClick={() => window.open("https://accounts.google.com/signin", "_blank", "noopener,noreferrer")}
        className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-ink-200 bg-white text-sm font-semibold text-ink-900 transition hover:bg-ink-50"
      >
        <GoogleIcon className="size-4" />
        Sign In with Google
      </button>

      {/* Footer link */}
      <p className="text-center text-sm text-ink-500">
        Don't have an account?{" "}
        <Link to="/register" className="font-bold text-ink-900 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.12A6.98 6.98 0 015.48 12c0-.74.13-1.45.36-2.12V7.04H2.18A11 11 0 001 12c0 1.78.43 3.46 1.18 4.96l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function MicrosoftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" />
      <path fill="#FFB900" d="M13 13h10v10H13z" />
    </svg>
  );
}
