"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import Heading from "../../components/ui/headings/Heading";
import InputField from "../../components/ui/inputs/InputField";
import Button from "../../components/ui/button/Button";
import { resetPassword, setPassword } from "../../api/auth";

interface ResetPasswordPageProps {
  onNavigate: (page: "otpVerification" | "login") => void;
  userEmail: string;       // email from forgot-password flow
  verifiedOtp: string;     // OTP verified on previous step
  setPasswordToken: string; // token from ?token= URL — used for provider set-password flow
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  onNavigate,
  userEmail,
  verifiedOtp,
  setPasswordToken,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
  });
  const [isLoading, setIsLoading] = useState(false);

  // If setPasswordToken exists, this is the provider set-password flow
  const isSetPasswordFlow = Boolean(setPasswordToken);

  const onSubmit = async (data: { newPassword: string; confirmPassword: string }) => {
    if (data.newPassword !== data.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setIsLoading(true);
    const loadToast = toast.loading("Updating password...");
    try {
      if (isSetPasswordFlow) {
        // Provider approval flow — use the token from the email link
        await setPassword(setPasswordToken, data.newPassword);
      } else {
        // Forgot password flow — use email + verified OTP
        await resetPassword(userEmail, verifiedOtp, data.newPassword);
      }
      toast.success("Password set! Please login.", { id: loadToast });
      onNavigate("login");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to reset password", { id: loadToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        {!isSetPasswordFlow && (
          <button
            type="button"
            onClick={() => onNavigate("otpVerification")}
            className="text-[#0A1E25] hover:text-[#705295] transition-colors"
          >
            <FaArrowLeft size={20} />
          </button>
        )}
        <Heading title={isSetPasswordFlow ? "Set password" : "Reset password"} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <InputField
            label="New password"
            name="newPassword"
            type="password"
            control={control}
            placeholder="Choose a strong password"
            required
          />
          <InputField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            control={control}
            placeholder="Re-enter new password"
            required
          />
        </div>
        <div className="mt-4">
          <Button
            type="submit"
            label={isLoading ? "Saving..." : isSetPasswordFlow ? "Set password" : "Reset password"}
            disabled={isLoading}
          />
        </div>
      </form>
    </>
  );
};

export default ResetPasswordPage;