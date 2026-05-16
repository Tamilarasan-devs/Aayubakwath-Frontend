import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser, verifyOtp, resendOtp } from "../config/authApi";
import { toast } from "react-toastify";
import RegisterBrandingPanel from "../components/auth/RegisterBrandingPanel";
import RegisterForm from "../components/auth/RegisterForm";
import authBg from "../assets/images/herbal-login.jpg";
import AuthBackground from "../components/auth/AuthBackground";
import AuthCardShell from "../components/auth/AuthCardShell";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordChecks = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
  };

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUserId(data.userId);
      setEmail(data.email);
      setStep(2);
      toast.success(data.message || "Verification code sent to your email!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      toast.success("Email verified successfully! Welcome to Aayubakwath.");
      // Automatically log the user in since verifyOtp returns tokens
      login({ token: data.token, refreshToken: data.refreshToken }, data.user);
      setTimeout(() => navigate("/"), 1500);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Invalid or expired code.");
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendOtp,
    onSuccess: () => {
      toast.success("A new verification code has been sent!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to resend code.");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword)
      return toast.error("Passwords do not match!");
    if (!Object.values(passwordChecks).every(Boolean))
      return toast.error("Password does not meet all requirements.");
    if (!form.agree) return toast.warning("You must agree to the terms!");
    
    registerMutation.mutate({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length !== 6) return toast.error("Please enter a 6-digit code.");
    verifyMutation.mutate({ userId, otp });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f8f2]">
      <AuthBackground image={authBg} alt="Ayurvedic herbs" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 lg:px-8">
        <AuthCardShell>
          <RegisterBrandingPanel />
          
          {step === 1 ? (
            <RegisterForm
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              mutation={registerMutation}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirm={showConfirm}
              setShowConfirm={setShowConfirm}
              passwordChecks={passwordChecks}
            />
          ) : (
            <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-white px-7 py-10 lg:px-16 lg:py-12">
              <div className="mb-10">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-sage)]/20 bg-[var(--color-sage-light)]/70 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-sage)]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-dark)]">
                    Verification
                  </span>
                </div>
                <h1 className="mb-3 font-display text-[34px] font-semibold tracking-tight text-[#11140f]">
                  Verify Email
                </h1>
                <p className="max-w-md font-body text-[15px] font-medium leading-relaxed text-[var(--color-text-muted)]">
                  Enter the 6-digit code sent to <span className="font-bold text-[#11140f]">{email}</span>. 
                  Check your spam folder if you don't see it.
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                    6-Digit Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="inp-field w-full rounded-2xl border border-[#e2decf] bg-[#fbfbf7] py-5 text-center text-3xl font-bold tracking-[0.5em] text-[#11140f]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={verifyMutation.isPending}
                  className="submit-btn w-full rounded-2xl bg-[var(--color-sage)] py-4 text-[14px] font-semibold tracking-[0.16em] text-white disabled:opacity-60"
                >
                  {verifyMutation.isPending ? "Verifying..." : "Verify & Complete"}
                </button>

                <div className="flex flex-col gap-4 text-center">
                  <button
                    type="button"
                    onClick={() => resendMutation.mutate(userId)}
                    disabled={resendMutation.isPending}
                    className="text-sm font-semibold text-[var(--color-sage)] hover:text-[var(--color-sage-dark)] transition-colors"
                  >
                    {resendMutation.isPending ? "Sending..." : "Didn't receive the code? Resend"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Use a different email address
                  </button>
                </div>
              </form>
            </div>
          )}
        </AuthCardShell>
      </div>
    </div>
  );
}
