import React from "react";
import { Link } from "react-router-dom";
import EyeToggleIcon from "./EyeToggleIcon";
import { UserIcon, MailIcon, LockIcon } from "./AuthIcons";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

export default function RegisterForm({
  form,
  handleChange,
  handleSubmit,
  mutation,
  showPassword,
  setShowPassword,
  showConfirm,
  setShowConfirm,
  passwordChecks,
}) {
  return (
    <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-white px-7 py-10 lg:px-16 lg:py-12">
      <div className="flex lg:hidden items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-[var(--color-sage)] flex items-center justify-center">
          <span className="text-white font-semibold text-sm">A</span>
        </div>
        <span className="text-[#2f3328] font-semibold text-lg">
          Aayubakwath
        </span>
      </div>

      <div className="mb-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-sage)]/20 bg-[var(--color-sage-light)]/70 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-sage)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-dark)]">
            New Account
          </span>
        </div>
        <h1 className="mb-3 font-display text-[34px] font-semibold tracking-tight text-[#11140f]">
          Create Account
        </h1>
        <p className="max-w-md font-body text-[15px] font-medium leading-relaxed text-[var(--color-text-muted)]">
          Join Aayubakwath for faster orders, support, and trusted wellness
          updates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div>
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
            Full Name
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa28e] transition-colors group-focus-within:text-[var(--color-sage)]">
              <UserIcon />
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="inp-field w-full rounded-2xl border border-[#e2decf] bg-[#fbfbf7] py-4 pl-11 pr-4 text-[15px] font-medium text-[#11140f]"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
            Email Address
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa28e] transition-colors group-focus-within:text-[var(--color-sage)]">
              <MailIcon />
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="inp-field w-full rounded-2xl border border-[#e2decf] bg-[#fbfbf7] py-4 pl-11 pr-4 text-[15px] font-medium text-[#11140f]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              Password
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa28e] transition-colors group-focus-within:text-[var(--color-sage)]">
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Create password"
                className="inp-field w-full rounded-2xl border border-[#e2decf] bg-[#fbfbf7] py-4 pl-11 pr-12 text-[15px] font-medium text-[#11140f]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9aa28e] transition-colors hover:text-[var(--color-sage)]"
              >
                <EyeToggleIcon open={showPassword} />
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              Confirm
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa28e] transition-colors group-focus-within:text-[var(--color-sage)]">
                <LockIcon />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Repeat password"
                className="inp-field w-full rounded-2xl border border-[#e2decf] bg-[#fbfbf7] py-4 pl-11 pr-12 text-[15px] font-medium text-[#11140f]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9aa28e] transition-colors hover:text-[var(--color-sage)]"
              >
                <EyeToggleIcon open={showConfirm} />
              </button>
            </div>
          </div>
        </div>

        <PasswordStrengthIndicator
          passwordChecks={passwordChecks}
          password={form.password}
          confirmPassword={form.confirmPassword}
        />

        <div className="flex items-start gap-3 pt-2">
          <div className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={form.agree}
              onChange={handleChange}
              className="sr-only"
            />
            <label
              htmlFor="agree"
              className="w-5 h-5 rounded-md flex items-center justify-center cursor-pointer transition-all duration-300"
              style={{
                background: form.agree ? "#829b1c" : "white",
                border: `2px solid ${form.agree ? "#829b1c" : "#e2decf"}`,
              }}
            >
              {form.agree && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </label>
          </div>
          <label
            htmlFor="agree"
            className="text-[14px] font-medium text-gray-600 cursor-pointer leading-relaxed"
          >
            I agree to the{" "}
            <a
              href="#"
              className="font-semibold text-[var(--color-sage)] transition-colors hover:text-[var(--color-sage-dark)]"
            >
              Terms & Conditions
            </a>
            {" and "}
            <a
              href="#"
              className="font-semibold text-[var(--color-sage)] transition-colors hover:text-[var(--color-sage-dark)]"
            >
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending || mutation.isLoading}
          className="submit-btn mt-8 w-full rounded-2xl bg-[var(--color-sage)] py-4 text-[14px] font-semibold tracking-[0.16em] text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mutation.isPending || mutation.isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--color-border)]" />
        <span className="text-xs font-semibold text-[var(--color-text-muted)]">or</span>
        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <p className="mt-8 text-center text-[14px] font-medium text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-[var(--color-sage)] transition-colors hover:text-[var(--color-sage-dark)]"
        >
          Sign In
        </Link>
      </p>

      <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[var(--color-text-muted)]/70">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>256-bit SSL · Secured & Encrypted</span>
      </div>
    </div>
  );
}
