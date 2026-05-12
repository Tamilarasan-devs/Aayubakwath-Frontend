import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../config/authApi";
import { toast } from "react-toastify";
import RegisterBrandingPanel from "../components/auth/RegisterBrandingPanel";
import RegisterForm from "../components/auth/RegisterForm";
import authBg from "../assets/images/herbal-login.jpg";
import AuthBackground from "../components/auth/AuthBackground";
import AuthCardShell from "../components/auth/AuthCardShell";

export default function Register() {
  const navigate = useNavigate();

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

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message || "Account created successfully! Please login.");
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
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
    mutation.mutate({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f8f2]">
      <AuthBackground image={authBg} alt="Ayurvedic herbs" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 lg:px-8">
        <AuthCardShell>
          <RegisterBrandingPanel />
          <RegisterForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            mutation={mutation}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            passwordChecks={passwordChecks}
          />
        </AuthCardShell>
      </div>
    </div>
  );
}
