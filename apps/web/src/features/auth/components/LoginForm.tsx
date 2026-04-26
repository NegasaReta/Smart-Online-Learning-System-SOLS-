import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import {
  loginSchema,
  loginDefaultValues,
  type LoginFormValues,
} from "../validation/login.schema";

/**
 * LoginForm — the Login tab of the auth page.
 * Owner: @Capechusami
 * Issue: #1 — Implement authentication flows with Clerk
 *
 * Uses Clerk's `useSignIn` hook to authenticate. On success, activates the
 * created session and redirects to the dashboard. Validation is handled by
 * `react-hook-form` + Zod (`loginSchema`).
 */
export function LoginForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
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

    if (!isLoaded || !signIn) {
      setServerError(
        "Preview mode: Clerk isn't configured. Add VITE_CLERK_PUBLISHABLE_KEY to .env.local to enable real sign-in."
      );
      return;
    }

    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/student/dashboard", { replace: true });
      } else {
        // Additional steps (MFA, email verification, etc.)
        setServerError(
          "Additional verification is required. Please check your email."
        );
      }
    } catch (err) {
      const message =
        (err as { errors?: { message: string }[] })?.errors?.[0]?.message ??
        "Invalid email or password. Please try again.";
      setServerError(message);
    }
  };

  const handleSocial = async (
    strategy: "oauth_google" | "oauth_microsoft",
    fallbackUrl: string
  ) => {
    // When Clerk is configured, use its OAuth redirect flow.
    if (isLoaded && signIn) {
      try {
        await signIn.authenticateWithRedirect({
          strategy,
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/student/dashboard",
        });
        return;
      } catch (err) {
        // Fall through to the direct redirect below.
        // eslint-disable-next-line no-console
        console.warn("Clerk OAuth failed, opening provider directly:", err);
      }
    }
    // Preview fallback: open the real provider's account page in a new tab.
    window.open(fallbackUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full max-w-[448px] flex-col gap-6"
      aria-label="Login form"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink-900">
          Welcome back
        </h2>
        <p className="text-sm text-ink-700">
          Please enter your details to access your portal.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex w-full items-center justify-center border-b border-ink-300">
        <button
          type="button"
          className="relative flex-1 py-2 text-center text-sm font-semibold tracking-wide text-brand"
          aria-current="page"
        >
          Login
          <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 rounded-t-full bg-brand" />
        </button>
        <Link
          to="/register"
          className="flex-1 py-2 text-center text-sm font-semibold tracking-wide text-ink-700 transition hover:text-ink-900"
        >
          Sign Up
        </Link>
      </div>

      {/* Server error */}
      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{serverError}</span>
        </div>
      )}

      {/* Fields */}
      <div className="flex flex-col gap-4 pt-2">
        {/* Role */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="role"
            className="text-xs font-medium text-ink-700"
          >
            I am logging in as a...
          </label>
          <div className="relative">
            <select
              id="role"
              {...register("role")}
              className="h-12 w-full appearance-none rounded-lg border border-ink-300 bg-white px-4 pr-11 text-base text-ink-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-ink-500"
              aria-hidden
            />
          </div>
          {errors.role && (
            <span className="text-xs text-red-600">{errors.role.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-xs font-medium text-ink-700"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-500"
              aria-hidden
            />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@school.edu"
              {...register("email")}
              className="h-12 w-full rounded-lg border border-ink-300 bg-white pl-11 pr-4 text-base text-ink-900 placeholder:text-ink-500 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-xs font-medium text-ink-700"
          >
            Password
          </label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-500"
              aria-hidden
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password")}
              className="h-12 w-full rounded-lg border border-ink-300 bg-white pl-11 pr-12 text-base text-ink-900 placeholder:text-ink-500 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-ink-500 transition hover:text-ink-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <Eye className="size-5" aria-hidden />
              ) : (
                <EyeOff className="size-5" aria-hidden />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="size-5 rounded border-ink-300 text-brand accent-brand"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-brand transition hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-1.5 rounded-lg bg-brand text-sm font-semibold tracking-wide text-white shadow-[0_1px_2px_0_rgba(0,88,190,0.2)] transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="size-[13px]" aria-hidden />
            </>
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="h-px flex-1 bg-ink-300" />
        <span className="bg-white px-2 text-sm text-ink-700">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-ink-300" />
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() =>
            handleSocial(
              "oauth_google",
              "https://accounts.google.com/signin"
            )
          }
          className="flex h-11 items-center justify-center gap-2.5 rounded-lg border border-ink-300/50 bg-brand-50 text-xs font-medium text-ink-900 transition hover:bg-brand-100"
        >
          <GoogleIcon className="size-4" />
          Google
        </button>
        <button
          type="button"
          onClick={() =>
            handleSocial(
              "oauth_microsoft",
              "https://login.microsoftonline.com"
            )
          }
          className="flex h-11 items-center justify-center gap-2.5 rounded-lg border border-ink-300/50 bg-brand-50 text-xs font-medium text-ink-900 transition hover:bg-brand-100"
        >
          <MicrosoftIcon className="size-4" />
          Microsoft
        </button>
      </div>
    </form>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.12A6.98 6.98 0 015.48 12c0-.74.13-1.45.36-2.12V7.04H2.18A11 11 0 001 12c0 1.78.43 3.46 1.18 4.96l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
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
