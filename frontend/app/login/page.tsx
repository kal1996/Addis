
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const inputClass =
  "h-12 rounded-xl border-slate-200 bg-white text-sm shadow-none placeholder:text-slate-400 focus-visible:border-teal-600 focus-visible:ring-teal-600/20";

function isValidLoginIdentifier(value: string) {
  const trimmed = value.trim();

  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  const digits = trimmed.replace(/\D/g, "");
  const looksLikePhone =
    digits.length >= 9 &&
    digits.length <= 15 &&
    /^[+\d\s()-]+$/.test(trimmed);

  return looksLikeEmail || looksLikePhone;
}

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!isValidLoginIdentifier(identifier)) {
      setError("Enter a valid email address or phone number.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) {
          setError("Invalid email/phone or password.");
        } else {
          setError(
            data.message || "Login failed. Please try again."
          );
        }
        return;
      }

      if (!data.id || !data.email) {
        setError(
          "The server response was incomplete. Please try again."
        );
        return;
      }

      setMessage(`Welcome back, ${data.fullName}!`);

      // The backend currently verifies credentials but does not
      // issue a session or token. Do not store the password.
      // We will add secure session handling in the next step.
    } catch {
      setError(
        "Cannot connect to the server. Check that the AddisLink backend is running."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white shadow-md shadow-teal-700/20 transition group-hover:bg-teal-800">
              <Building2 size={23} />
            </span>

            <span>
              <span className="block text-xl font-black tracking-tight">
                Addis<span className="text-teal-700">Link</span>
              </span>
              <span className="hidden text-xs text-slate-500 sm:block">
                Ethiopia&apos;s construction marketplace
              </span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-teal-50 hover:text-teal-800"
          >
            <ArrowLeft size={16} />
            <span>Back to home</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-16">
        {/* Left introduction */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
              <ShieldCheck size={17} />
              Welcome back to AddisLink
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight">
              Your next construction deal starts{" "}
              <span className="text-teal-700">here.</span>
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
              Sign in to explore construction materials, connect with
              businesses, and manage your marketplace activities.
            </p>

            <div className="mt-9 space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <BadgeCheck size={23} />
                </span>
                <div>
                  <h2 className="font-bold">Trusted connections</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Find suppliers and buyers through a marketplace designed
                    for construction businesses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Building2 size={23} />
                </span>
                <div>
                  <h2 className="font-bold">One place for business</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Keep your supplier and product discovery experience
                    organized in one place.
                  </p>
                </div>
              </div>
            </div>

            <Card className="mt-10 rounded-2xl border-slate-200 shadow-sm">
              <CardContent className="flex items-center gap-3 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={20} />
                </span>
                <div>
                  <p className="font-bold">Good to see you again</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Sign in to continue to AddisLink.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Login card */}
        <div className="mx-auto w-full max-w-lg">
          <Card className="overflow-hidden rounded-3xl border-slate-200 py-0 shadow-xl shadow-slate-200/60">
            <div className="h-1.5 bg-gradient-to-r from-teal-700 via-teal-500 to-emerald-400" />

            <CardHeader className="px-5 pt-8 sm:px-8">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 lg:hidden">
                <Building2 size={25} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                Welcome back
              </p>

              <CardTitle className="text-3xl font-black tracking-tight sm:text-4xl">
                Sign in to your account
              </CardTitle>

              <CardDescription className="text-sm leading-6 text-slate-500">
                Enter your account details to continue.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-8 sm:px-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Email or phone */}
                <div>
                  <Label
                    htmlFor="identifier"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Email address or phone number
                    <span className="ml-1 text-red-500">*</span>
                  </Label>

                  <div className="relative">
                    <Mail
                      size={18}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                      id="identifier"
                      name="identifier"
                      type="text"
                      autoComplete="username"
                      required
                      value={identifier}
                      disabled={isLoading}
                      onChange={(event) => {
                        setIdentifier(event.target.value);
                        setError("");
                        setMessage("");
                      }}
                      placeholder="you@example.com or +251..."
                      aria-invalid={
                        identifier.length > 0 &&
                        !isValidLoginIdentifier(identifier)
                      }
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <Label
                      htmlFor="password"
                      className="text-sm font-bold text-slate-700"
                    >
                      Password
                      <span className="ml-1 text-red-500">*</span>
                    </Label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-teal-700 transition-colors hover:text-teal-900 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      disabled={isLoading}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setError("");
                        setMessage("");
                      }}
                      placeholder="Enter your password"
                      className={`${inputClass} pl-11 pr-12`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    disabled={isLoading}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked === true)
                    }
                    className="data-[state=checked]:border-teal-700 data-[state=checked]:bg-teal-700"
                  />

                  <Label
                    htmlFor="rememberMe"
                    className="cursor-pointer text-sm font-medium text-slate-600"
                  >
                    Remember me on this device
                  </Label>
                </div>

                {/* Error message */}
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                {/* Success message */}
                {message && (
                  <div
                    role="status"
                    className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm leading-6 text-emerald-800"
                  >
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
                    <p>{message}</p>
                  </div>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group h-12 w-full rounded-xl bg-teal-700 font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-xl focus-visible:ring-4 focus-visible:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                  {!isLoading && (
                    <ArrowRight
                      size={19}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  )}
                </Button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  Your sign-in details should be kept private.
                </p>
              </form>

              {/* Register link */}
              <div className="mt-6 border-t border-slate-200 pt-5 text-center">
                <p className="text-sm text-slate-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-bold text-teal-700 transition-colors hover:text-teal-900 hover:underline"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-5 text-center text-xs text-slate-400">
            © 2026 AddisLink · Built for Ethiopia&apos;s construction industry
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href="/"
            className="text-lg font-extrabold text-slate-900 transition-colors hover:text-teal-700"
          >
            Addis<span className="text-teal-700">Link</span>
          </Link>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500"
          >
            <Link href="/" className="transition-colors hover:text-teal-700">
              Home
            </Link>
            <Link
              href="/products"
              className="transition-colors hover:text-teal-700"
            >
              Marketplace
            </Link>
            <Link
              href="/suppliers"
              className="transition-colors hover:text-teal-700"
            >
              Suppliers
            </Link>
            <Link
              href="/register"
              className="transition-colors hover:text-teal-700"
            >
              Register
            </Link>
          </nav>

          <p className="text-xs text-slate-400">© 2026 AddisLink</p>
        </div>
      </footer>
    </main>
  );
}
