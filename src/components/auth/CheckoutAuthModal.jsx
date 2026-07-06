import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ChevronLeft, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { loginUser, registerUser, verifyOtp, resendOtp } from "../../config/authApi";
import EyeToggleIcon from "./EyeToggleIcon";

export default function CheckoutAuthModal() {
  const { isCheckoutAuthModalOpen, closeCheckoutAuthModal, login } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login"); // "login" | "signup" | "otp"
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  
  const handleClose = () => {
    setActiveTab("login");
    setEmailOrPhone("");
    setPassword("");
    setOtp("");
    setUserId("");
    closeCheckoutAuthModal();
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async ({ token, refreshToken, user }) => {
      await login({ token, refreshToken }, user);
      toast.success("Logged in successfully!");
      handleClose();
      navigate("/checkout");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUserId(data.userId);
      setActiveTab("otp");
      toast.success(data.message || "Verification code sent to your email!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: async (data) => {
      toast.success("Account verified successfully!");
      await login({ token: data.token, refreshToken: data.refreshToken }, data.user);
      handleClose();
      navigate("/checkout");
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

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone || !password) {
      return toast.error("Please fill in all fields.");
    }

    const isPhone = /^\+?\d+$/.test(emailOrPhone.trim());
    const credentials = { password };
    
    if (isPhone) {
      credentials.phoneNumber = emailOrPhone.trim();
    } else {
      credentials.email = emailOrPhone.trim();
    }

    if (activeTab === "login") {
      loginMutation.mutate(credentials);
    } else if (activeTab === "signup") {
      const dummyName = isPhone ? "User" : credentials.email.split("@")[0];
      credentials.name = dummyName;
      registerMutation.mutate(credentials);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length !== 6) return toast.error("Please enter a 6-digit code.");
    verifyMutation.mutate({ userId, otp });
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending || verifyMutation.isPending;

  if (!isCheckoutAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Backdrop - only block clicks outside the drawers */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200 pointer-events-auto"
        onClick={handleClose}
      />
      
      {/* Drawer */}
      <div className="absolute top-0 right-0 md:right-[480px] h-screen w-full max-w-[440px] bg-white shadow-[-24px_0_80px_rgba(15,23,42,0.2)] flex flex-col z-10 animate-in slide-in-from-right duration-300 pointer-events-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
          <button 
            onClick={handleClose}
            className="p-1 -ml-1 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          
          <div className="font-display text-lg font-bold text-[#2f3328] tracking-wide">
            Aayubakwath
          </div>
          
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
            <Lock size={12} className="text-gray-400" />
            <span>100% Secured</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-5 bg-white flex-1 overflow-y-auto">
          {activeTab !== "otp" ? (
            <>
              {/* Yellow Banner */}
              <div className="w-full bg-[#fdf5e6] border border-[#f5e3c3] rounded-lg py-2.5 px-4 mb-6 flex justify-center text-[13px] font-semibold text-[#8b6a2d]">
                Log In or Sign Up for faster checkout
              </div>

              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50">
                  <User size={13} className="text-gray-500" />
                </div>
                <h3 className="text-[15px] font-semibold text-gray-800">
                  {activeTab === "login" ? "Login to continue" : "Sign up to continue"}
                </h3>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="Email Address or Mobile Number"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 px-4 text-[14px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] transition-all"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-4 pr-12 text-[14px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <EyeToggleIcon open={showPassword} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm mt-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
                    className="text-[var(--color-sage)] font-semibold hover:underline"
                  >
                    {activeTab === "login" ? "Create an account" : "Already have an account?"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 w-full rounded-xl bg-[#d4dfb1] hover:bg-[#c9d69f] py-3.5 text-[15px] font-semibold text-[#3b471a] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm border border-[#c3d19b]"
                >
                  {isLoading 
                    ? "Please wait..." 
                    : (activeTab === "login" ? "Proceed to Checkout" : "Create & Continue")}
                </button>
                
                <div className="pt-3 flex items-center justify-center gap-2">
                  <input 
                    type="checkbox" 
                    id="subscribe"
                    checked={subscribe}
                    onChange={(e) => setSubscribe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[var(--color-sage)] focus:ring-[var(--color-sage)]"
                  />
                  <label htmlFor="subscribe" className="text-[12px] font-medium text-gray-600">
                    Send me order updates & offers (no spam)
                  </label>
                </div>
              </form>
            </>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-[18px] font-semibold text-gray-800 mb-2">Verify your email</h3>
                <p className="text-[13px] text-gray-500">We've sent a 6-digit code to your email. Enter it below to verify.</p>
              </div>

              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-full rounded-xl border border-gray-200 bg-white py-4 text-center text-3xl font-bold tracking-[0.4em] text-gray-900 focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] transition-all"
              />
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#d4dfb1] hover:bg-[#c9d69f] py-3.5 text-[15px] font-semibold text-[#3b471a] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm border border-[#c3d19b]"
              >
                {verifyMutation.isPending ? "Verifying..." : "Verify & Checkout"}
              </button>

              <div className="flex flex-col gap-4 text-center pt-2">
                <button
                  type="button"
                  onClick={() => resendMutation.mutate(userId)}
                  disabled={resendMutation.isPending}
                  className="text-[13px] font-semibold text-[var(--color-sage)] hover:underline"
                >
                  {resendMutation.isPending ? "Sending..." : "Resend Code"}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="text-[12px] font-medium text-gray-500 hover:text-gray-800"
                >
                  Back to Sign Up
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
              By proceeding, I agree to Aayubakwath's <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">T&C</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
