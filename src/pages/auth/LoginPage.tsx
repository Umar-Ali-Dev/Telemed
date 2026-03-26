"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Heading from "../../components/ui/headings/Heading";
import InputField from "../../components/ui/inputs/InputField";
import Button from "../../components/ui/button/Button";
import { login } from "../../api/auth";

interface LoginPageProps {
  onNavigate: (page: "forgotPassword" | "signUp") => void;
  onLoginSuccess: (email: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    const loadToast = toast.loading("Checking credentials...");
    try {
      await login(data.email, data.password);
      toast.success("OTP sent to your email!", { id: loadToast });
      onLoginSuccess(data.email);
    } catch (err: any) {
      toast.error(err?.message ?? "Invalid credentials", { id: loadToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading title="Login" className="mb-6 font-bold" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <InputField
            label="Email"
            name="email"
            type="email"
            control={control}
            required
            placeholder="email@example.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            control={control}
            required
            placeholder="Enter password"
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={() => onNavigate("forgotPassword")}
            className="text-[#F76D00] text-[14px] font-bold hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="mt-4">
          <Button type="submit" label={isLoading ? "Checking..." : "Login"} disabled={isLoading} />
        </div>
      </form>
      <div className="mt-6 text-center text-[14px] text-[#999999]">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => onNavigate("signUp")}
          className="text-[#705295] font-bold hover:underline"
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default LoginPage;