import React from "react";
import LoginForm from "./LoginForm";

export default function LoginPanel({
  form,
  showPassword,
  setShowPassword,
  handleChange,
  handleSubmit,
  isLoading,
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
            Welcome Back
          </span>
        </div>
        <h1 className="mb-3 font-display text-[34px] font-semibold tracking-tight text-[#11140f]">
          Sign In
        </h1>
        <p className="max-w-md font-body text-[15px] font-medium leading-relaxed text-[var(--color-text-muted)]">
          Access your account for orders, support, and wellness updates.
        </p>
      </div>

      <LoginForm
        form={form}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

