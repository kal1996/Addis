
"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  UserRound,
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

type AccountType = "buyer" | "supplier";

const passwordRules = [
  {
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "One lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    label: "One number",
    test: (value: string) => /\d/.test(value),
  },
  {
    label: "One special character",
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

const inputClass =
  "h-12 rounded-xl border-slate-200 bg-white text-sm shadow-none placeholder:text-slate-400 focus-visible:border-teal-600 focus-visible:ring-teal-600/20";

function nameIsValid(value: string) {
  const parts = value.trim().split(/[\s'-]+/).filter(Boolean);

  return (
    parts.length >= 2 &&
    parts.every((part) => /^\p{L}[\p{L}\p{M}]*$/u.test(part)) &&
    (value.match(/\p{L}/gu) || []).length >= 5
  );
}

function emailIsValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function phoneIsValid(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

function faydaIsValid(value: string) {
  return /^\d{12}$/.test(value.trim());
}

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-bold text-slate-700"
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </Label>
  );
}

function FieldFeedback({
  valid,
  validText,
  invalidText,
}: {
  valid: boolean;
  validText: string;
  invalidText: string;
}) {
  return (
    <p
      className={`mt-1.5 flex items-center gap-1.5 text-xs ${
        valid ? "text-emerald-600" : "text-red-500"
      }`}
    >
      {valid ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
      {valid ? validText : invalidText}
    </p>
  );
}

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<AccountType>("buyer");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");

  const [faydaNumber, setFaydaNumber] = useState("");
  const [faydaConsent, setFaydaConsent] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordChecks = passwordRules.map((rule) => ({
    ...rule,
    passed: rule.test(password),
  }));

  const passwordValid = passwordChecks.every((rule) => rule.passed);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  function clearFeedback() {
    setError("");
    setSuccess(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearFeedback();

    if (!nameIsValid(fullName)) {
      setError("Enter your full name using at least two name parts.");
      return;
    }

    if (!emailIsValid(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!phoneIsValid(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (accountType === "supplier") {
      if (!businessName.trim()) {
        setError("Please enter your business name.");
        return;
      }

      if (!businessAddress.trim()) {
        setError("Please enter your business location.");
        return;
      }

      if (!businessCategory) {
        setError("Please select your business category.");
        return;
      }
    }

    if (!passwordValid) {
      setError("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (faydaNumber && !faydaIsValid(faydaNumber)) {
      setError("The Fayda number must contain exactly 12 digits.");
      return;
    }

    if (faydaNumber && !faydaConsent) {
      setError("Please provide consent before submitting your Fayda number.");
      return;
    }

    // Prototype only: no database or authentication service is connected.
    setSuccess(true);
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

          {/* Use Link directly: no unsupported asChild prop */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-teal-50 hover:text-teal-800"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-16">
        {/* Left introduction */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
              <ShieldCheck size={17} />
              Join the AddisLink network
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight">
              Build better business with{" "}
              <span className="text-teal-700">trusted connections.</span>
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
              Discover construction materials, connect with suppliers, and
              create opportunities with a marketplace designed for Ethiopia.
            </p>

            <div className="mt-9 space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <Users size={23} />
                </span>
                <div>
                  <h2 className="font-bold">For buyers and suppliers</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Choose the account type that matches your role in the
                    construction industry.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <BadgeCheck size={23} />
                </span>
                <div>
                  <h2 className="font-bold">Trust-focused marketplace</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Build a business profile that supports transparent supplier
                    relationships.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <Building2 size={23} />
                </span>
                <div>
                  <h2 className="font-bold">Made for construction</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Connect with businesses dealing in construction materials
                    and equipment.
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
                  <p className="font-bold">Simple registration</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Start with your basic details and account type.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Registration form */}
        <div className="mx-auto w-full max-w-2xl">
          <Card className="overflow-hidden rounded-3xl border-slate-200 py-0 shadow-xl shadow-slate-200/60">
            <div className="h-1.5 bg-gradient-to-r from-teal-700 via-teal-500 to-emerald-400" />

            <CardHeader className="px-5 pt-7 sm:px-8 lg:px-9">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 lg:hidden">
                <Building2 size={25} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                Get started today
              </p>
              <CardTitle className="text-3xl font-black tracking-tight sm:text-4xl">
                Create your account
              </CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-500">
                Enter your details to join AddisLink. Fields marked with{" "}
                <span className="text-red-500">*</span> are required.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-7 sm:px-8 lg:px-9">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Account type */}
                <fieldset>
                  <legend className="mb-3 text-sm font-bold text-slate-700">
                    Choose account type
                    <span className="ml-1 text-red-500">*</span>
                  </legend>

                  <div className="grid grid-cols-2 gap-3">
                    {(["buyer", "supplier"] as const).map((type) => {
                      const selected = accountType === type;
                      const isBuyer = type === "buyer";

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setAccountType(type);
                            clearFeedback();
                          }}
                          aria-pressed={selected}
                          className={`rounded-2xl border-2 p-4 text-left transition duration-200 hover:-translate-y-0.5 ${
                            selected
                              ? "border-teal-600 bg-teal-50 shadow-md shadow-teal-700/10"
                              : "border-slate-200 hover:border-teal-300"
                          }`}
                        >
                          <span
                            className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                              selected
                                ? "bg-teal-700 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {isBuyer ? (
                              <Users size={21} />
                            ) : (
                              <Building2 size={21} />
                            )}
                          </span>
                          <span className="block font-bold text-slate-800">
                            {isBuyer ? "Buyer" : "Supplier"}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-slate-500">
                            {isBuyer
                              ? "Find materials and suppliers"
                              : "List products and manage orders"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Full name */}
                <div>
                  <FieldLabel htmlFor="fullName" required>
                    Full name
                  </FieldLabel>
                  <div className="relative">
                    <UserRound
                      size={18}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <Input
                      id="fullName"
                      name="fullName"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(event) => {
                        setFullName(event.target.value);
                        clearFeedback();
                      }}
                      placeholder="Enter your full name"
                      aria-invalid={fullName.length > 0 && !nameIsValid(fullName)}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                  {fullName.length > 0 && (
                    <FieldFeedback
                      valid={nameIsValid(fullName)}
                      validText="Name looks good."
                      invalidText="Enter at least two name parts."
                    />
                  )}
                </div>

                {/* Email */}
                <div>
                  <FieldLabel htmlFor="email" required>
                    Email address
                  </FieldLabel>
                  <div className="relative">
                    <Mail
                      size={18}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        clearFeedback();
                      }}
                      placeholder="you@example.com"
                      aria-invalid={email.length > 0 && !emailIsValid(email)}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                  {email.length > 0 && (
                    <FieldFeedback
                      valid={emailIsValid(email)}
                      validText="Email format looks good."
                      invalidText="Enter a valid email address."
                    />
                  )}
                </div>

                {/* Phone */}
                <div>
                  <FieldLabel htmlFor="phone" required>
                    Phone number
                  </FieldLabel>
                  <div className="relative">
                    <Phone
                      size={18}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                        clearFeedback();
                      }}
                      placeholder="+251 9XX XXX XXX"
                      aria-invalid={phone.length > 0 && !phoneIsValid(phone)}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                  {phone.length > 0 && (
                    <FieldFeedback
                      valid={phoneIsValid(phone)}
                      validText="Phone number format looks acceptable."
                      invalidText="Enter a phone number with 9–15 digits."
                    />
                  )}
                </div>

                {/* Supplier-specific fields */}
                {accountType === "supplier" && (
                  <section className="space-y-4 rounded-2xl border border-teal-200 bg-teal-50/50 p-4 sm:p-5">
                    <div>
                      <h3 className="font-bold text-slate-800">
                        Business information
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Tell buyers about your business.
                      </p>
                    </div>

                    <div>
                      <FieldLabel htmlFor="businessName" required>
                        Business name
                      </FieldLabel>
                      <Input
                        id="businessName"
                        name="businessName"
                        required
                        value={businessName}
                        onChange={(event) => {
                          setBusinessName(event.target.value);
                          clearFeedback();
                        }}
                        placeholder="Your business name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <FieldLabel htmlFor="businessAddress" required>
                        Business location
                      </FieldLabel>
                      <div className="relative">
                        <MapPin
                          size={18}
                          aria-hidden="true"
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <Input
                          id="businessAddress"
                          name="businessAddress"
                          required
                          value={businessAddress}
                          onChange={(event) => {
                            setBusinessAddress(event.target.value);
                            clearFeedback();
                          }}
                          placeholder="City, area, or address"
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <FieldLabel htmlFor="businessCategory" required>
                        Business category
                      </FieldLabel>
                      <select
                        id="businessCategory"
                        name="businessCategory"
                        required
                        value={businessCategory}
                        onChange={(event) => {
                          setBusinessCategory(event.target.value);
                          clearFeedback();
                        }}
                        className={`${inputClass} w-full px-3`}
                      >
                        <option value="">Select a category</option>
                        <option value="Cement">Cement</option>
                        <option value="Steel & Metal">Steel &amp; Metal</option>
                        <option value="Sand & Gravel">Sand &amp; Gravel</option>
                        <option value="Concrete Blocks">Concrete Blocks</option>
                        <option value="Finishing Materials">
                          Finishing Materials
                        </option>
                        <option value="Equipment">Equipment</option>
                        <option value="Tools">Tools</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </section>
                )}

                {/* Optional Fayda */}
                <section className="rounded-2xl border border-slate-200 p-4 transition-colors hover:border-teal-200 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <Fingerprint size={21} />
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-800">
                        Fayda identification{" "}
                        <span className="text-xs font-medium text-slate-400">
                          (Optional)
                        </span>
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Format checking does not verify your identity.
                        Providing this information is optional.
                      </p>
                    </div>
                  </div>

                  <Input
                    id="faydaNumber"
                    name="faydaNumber"
                    inputMode="numeric"
                    autoComplete="off"
                    value={faydaNumber}
                    onChange={(event) => {
                      setFaydaNumber(
                        event.target.value.replace(/\D/g, "").slice(0, 12)
                      );
                      clearFeedback();
                    }}
                    placeholder="12-digit Fayda number"
                    aria-label="Optional Fayda number"
                    aria-invalid={
                      faydaNumber.length > 0 && !faydaIsValid(faydaNumber)
                    }
                    className={`${inputClass} mt-4`}
                  />

                  {faydaNumber.length > 0 && (
                    <FieldFeedback
                      valid={faydaIsValid(faydaNumber)}
                      validText="12-digit format entered."
                      invalidText={`${faydaNumber.length}/12 digits entered.`}
                    />
                  )}

                  {faydaNumber.length > 0 && (
                    <div className="mt-3 flex items-start gap-2.5">
                      <Checkbox
                        id="faydaConsent"
                        checked={faydaConsent}
                        onCheckedChange={(checked) => {
                          setFaydaConsent(checked === true);
                          clearFeedback();
                        }}
                        className="mt-0.5 data-[state=checked]:border-teal-700 data-[state=checked]:bg-teal-700"
                      />
                      <Label
                        htmlFor="faydaConsent"
                        className="cursor-pointer text-xs leading-5 text-slate-600"
                      >
                        I consent to providing this number for the intended
                        verification process when an authorized integration
                        becomes available.
                      </Label>
                    </div>
                  )}
                </section>

                {/* Password */}
                <div>
                  <FieldLabel htmlFor="password" required>
                    Password
                  </FieldLabel>
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
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        clearFeedback();
                      }}
                      placeholder="Create a strong password"
                      aria-invalid={password.length > 0 && !passwordValid}
                      className={`${inputClass} pl-11 pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {passwordChecks.map((rule) => (
                      <div
                        key={rule.label}
                        className={`flex items-center gap-2 text-xs ${
                          rule.passed ? "text-emerald-600" : "text-slate-400"
                        }`}
                      >
                        {rule.passed ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <Circle size={15} />
                        )}
                        {rule.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <FieldLabel htmlFor="confirmPassword" required>
                    Confirm password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        clearFeedback();
                      }}
                      placeholder="Enter your password again"
                      aria-invalid={
                        confirmPassword.length > 0 && !passwordsMatch
                      }
                      className={`${inputClass} pr-12 ${
                        confirmPassword.length > 0
                          ? passwordsMatch
                            ? "border-emerald-500 bg-emerald-50/40"
                            : "border-red-400 bg-red-50/40"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((visible) => !visible)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirmation password"
                          : "Show confirmation password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>

                  {confirmPassword.length > 0 && (
                    <FieldFeedback
                      valid={passwordsMatch}
                      validText="Passwords match."
                      invalidText="Passwords do not match."
                    />
                  )}
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
                {success && (
                  <div
                    role="status"
                    className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold">Validation successful!</p>
                        <p className="mt-1">
                          Your details passed the basic checks. This is a
                          prototype: your account has not been saved, and Fayda
                          verification is not connected.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit button: shadcn/ui */}
                <Button
                  type="submit"
                  className="group h-12 w-full rounded-xl bg-teal-700 font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-xl focus-visible:ring-4 focus-visible:ring-teal-200"
                >
                  Create account
                  <ArrowRight
                    size={19}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  By creating an account, you agree to use AddisLink
                  responsibly.
                </p>
              </form>

              {/* Login link */}
              <div className="mt-6 border-t border-slate-200 pt-5 text-center">
                <p className="text-sm text-slate-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-teal-700 transition-colors hover:text-teal-900 hover:underline"
                  >
                    Log in
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
              href="/login"
              className="transition-colors hover:text-teal-700"
            >
              Log in
            </Link>
          </nav>

          <p className="text-xs text-slate-400">© 2026 AddisLink</p>
        </div>
      </footer>
    </main>
  );
}
