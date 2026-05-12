import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPassword, verifyResetOtp, resetPassword } from "../config/authApi";
import authBg from "../assets/images/herbal-login.jpg";
import AuthBackground from "../components/auth/AuthBackground";
import AuthCardShell from "../components/auth/AuthCardShell";
import LoginBrandingPanel from "../components/auth/LoginBrandingPanel";
import EyeToggleIcon from "../components/auth/EyeToggleIcon";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const forgotMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setUserId(data.userId);
      setStep(2);
      toast.success("Verification code sent to your email!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to send reset code");
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyResetOtp,
    onSuccess: () => {
      setStep(3);
      toast.success("Code verified! Please set your new password.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Invalid or expired code");
    },
  });

  const resetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successful! Please login.");
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Reset failed");
    },
  });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    forgotMutation.mutate(email);
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    if (form.otp.length !== 6) {
      return toast.error("Please enter a valid 6-digit code");
    }
    verifyMutation.mutate({ userId, otp: form.otp });
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (form.password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }
    resetMutation.mutate({
      userId,
      otp: form.otp,
      password: form.password,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f8f2]">
      <AuthBackground image={authBg} alt="Ayurvedic herbs" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 lg:px-8">
        <AuthCardShell>
          <LoginBrandingPanel />
          
          <div className="flex w-full flex-col justify-center bg-white p-7 lg:w-[58%] lg:p-12">
            <div className="mb-10 text-center lg:text-left">
              <h1 className="mb-2 font-display text-3xl font-bold tracking-tight text-[#111827]">
                {step === 1 ? "Forgot Password?" : step === 2 ? "Verify Code" : "New Password"}
              </h1>
              <p className="font-body text-[15px] font-medium leading-relaxed text-gray-500">
                {step === 1 
                  ? "Enter your email address and we'll send you a 6-digit code to reset your password."
                  : step === 2 
                  ? `Enter the 6-digit code sent to ${email}.`
                  : "Please choose a strong new password for your account."}
              </p>
            </div>

            {step === 1 && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                    Email Address
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa28e] transition-colors group-focus-within:text-[var(--color-sage)]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="inp-field w-full rounded-2xl border border-[#e2decf] bg-[#fbfbf7] py-4 pl-[2.75rem] pr-4 text-[15px] font-medium text-[#11140f]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotMutation.isPending}
                  className="submit-btn mt-8 w-full rounded-2xl bg-[var(--color-sage)] py-4 text-[14px] font-semibold tracking-[0.16em] text-white disabled:opacity-60"
                >
                  {forgotMutation.isPending ? "Sending code..." : "Send Reset Code"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifySubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    name="otp"
                    required
                    maxLength={6}
                    value={form.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit code"
                    className="inp-field w-full rounded-2xl border border-[#e2decf] bg-[#fbfbf7] py-4 px-4 text-center text-xl font-bold tracking-[0.5em] text-[#11140f]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={verifyMutation.isPending}
                  className="submit-btn mt-4 w-full rounded-2xl bg-[var(--color-sage)] py-4 text-[14px] font-semibold tracking-[0.16em] text-white disabled:opacity-60"
                >
                  {verifyMutation.isPending ? "Verifying..." : "Verify Code"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm font-semibold text-gray-500 hover:text-[var(--color-sage)]"
                >
                  Back to email entry
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleResetSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                    New Password
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa28e] transition-colors group-focus-within:text-[var(--color-sage)]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min. 8 characters"
                      className="inp-field w-full rounded-2xl border border-[#e2decf] bg-[#fbfbf7] py-4 pl-[2.75rem] pr-12 text-[15px] font-medium text-[#11140f]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9aa28e]"
                    >
                      <EyeToggleIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                    Confirm New Password
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa28e] transition-colors group-focus-within:text-[var(--color-sage)]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className="inp-field w-full rounded-2xl border border-[#e2decf] bg-[#fbfbf7] py-4 pl-[2.75rem] pr-4 text-[15px] font-medium text-[#11140f]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={resetMutation.isPending}
                  className="submit-btn mt-4 w-full rounded-2xl bg-[var(--color-sage)] py-4 text-[14px] font-semibold tracking-[0.16em] text-white disabled:opacity-60"
                >
                  {resetMutation.isPending ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}

            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-center text-[14px] font-medium text-gray-500">
                Remember your password?{" "}
                <Link to="/login" className="font-semibold text-[var(--color-sage)] hover:text-[var(--color-sage-dark)]">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </AuthCardShell>
      </div>
    </div>
  );
}
