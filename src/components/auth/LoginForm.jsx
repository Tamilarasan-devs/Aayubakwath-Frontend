import React from "react";
import { Link } from "react-router-dom";
import EyeToggleIcon from "./EyeToggleIcon";

export default function LoginForm({ form, showPassword, setShowPassword, handleChange, handleSubmit, isLoading }) {
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
      <div>
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
          Email Address
        </label>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa28e] transition-colors group-focus-within:text-[var(--color-sage)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[18px] h-[18px]"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="inp-field w-full rounded-2xl border border-[#e2decf] bg-[#fbfbf7] py-4 pl-[2.75rem] pr-4 text-[15px] font-medium text-[#11140f]"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-[12px] font-semibold text-[var(--color-sage)] transition-colors hover:text-[var(--color-sage-dark)]"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa28e] transition-colors group-focus-within:text-[var(--color-sage)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[18px] h-[18px]"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="inp-field w-full rounded-2xl border border-[#e2decf] bg-[#fbfbf7] py-4 pl-[2.75rem] pr-12 text-[15px] font-medium text-[#11140f]"
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

      <div className="flex items-center gap-3 pt-2">
        <div className="relative shrink-0">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            checked={form.remember}
            onChange={handleChange}
            className="sr-only"
          />
          <label
            htmlFor="remember"
            className="w-5 h-5 rounded-md flex items-center justify-center cursor-pointer transition-all duration-300"
            style={{
              background: form.remember ? "#829b1c" : "white",
              border: `2px solid ${form.remember ? "#829b1c" : "#e2decf"}`,
            }}
          >
            {form.remember && (
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
          htmlFor="remember"
          className="text-[14px] font-medium text-gray-600 cursor-pointer select-none"
        >
          Keep me signed in
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="submit-btn mt-8 w-full rounded-2xl bg-[var(--color-sage)] py-4 text-[14px] font-semibold tracking-[0.16em] text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
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
            Authenticating...
          </span>
        ) : (
          "Secure Sign In"
        )}
      </button>
    </form>

    <div className="mt-8 flex items-center gap-3">
      <div className="h-px flex-1 bg-[var(--color-border)]" />
      <span className="text-xs font-semibold text-[var(--color-text-muted)]">
        or
      </span>
      <div className="h-px flex-1 bg-[var(--color-border)]" />
    </div>

    <p className="mt-8 text-center text-[14px] font-medium text-gray-500">
      Don’t have an account?{" "}
      <Link
        to="/register"
        className="font-semibold text-[var(--color-sage)] transition-colors hover:text-[var(--color-sage-dark)]"
      >
        Create Account
      </Link>
    </p>

    </>
  );
}
