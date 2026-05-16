import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginUser } from "../config/authApi";
import { useAuth } from "../hooks/useAuth";

import authBg from "../assets/images/herbal-login.jpg";
import AuthBackground from "../components/auth/AuthBackground";
import AuthCardShell from "../components/auth/AuthCardShell";
import LoginBrandingPanel from "../components/auth/LoginBrandingPanel";
import LoginPanel from "../components/auth/LoginPanel";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: ({ token, refreshToken, user }) => {
      login({ token, refreshToken }, user);

      toast.success("Welcome back!");

      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      const safeRedirect =
        redirect && redirect.startsWith("/") && !redirect.startsWith("//")
          ? redirect
          : "/";

      navigate(safeRedirect);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      email: form.email,
      password: form.password,
    });
  };

  const loading = mutation.isPending || mutation.isLoading;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f8f2]">
      <AuthBackground image={authBg} alt="Ayurvedic herbs" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 lg:px-8">
        <AuthCardShell>
          <LoginBrandingPanel />
          <LoginPanel
            form={form}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={loading}
          />
        </AuthCardShell>
      </div>
    </div>
  );
}
