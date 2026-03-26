"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaRedoAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/ui/headings/Heading";
import InputField from "../../components/ui/inputs/InputField";
import Button from "../../components/ui/button/Button";
import { verifyOtp, resendOtp } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { OTP_PURPOSES, ROLE_DASHBOARDS } from "../../constants/roles";
import type { OtpPurpose } from "../../constants/roles";

interface OTPProps {
  onNavigate: (page: "forgotPassword" | "resetPassword" | "login") => void;
  userEmail: string;
  purpose: OtpPurpose;
  // Only called in password_reset flow — carries OTP to ResetPasswordPage
  onOtpVerifiedForReset: (otp: string) => void;
}

const OTPVerificationPage: React.FC<OTPProps> = ({
  onNavigate,
  userEmail,
  purpose,
  onOtpVerifiedForReset,
}) => {
  const { control, handleSubmit } = useForm({ defaultValues: { otp: "" } });
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: { otp: string }) => {
    setIsLoading(true);
    const loadToast = toast.loading("Verifying...");
    try {
      const res = await verifyOtp(userEmail, data.otp, purpose);
      toast.success("Verified!", { id: loadToast });

      if (purpose === OTP_PURPOSES.LOGIN && res.role) {
        // Set user in context + localStorage, then redirect to role dashboard
        setUser({ email: userEmail, role: res.role });
        navigate(ROLE_DASHBOARDS[res.role], { replace: true });

      } else if (purpose === OTP_PURPOSES.EMAIL_VERIFICATION) {
        // Provider signup — email verified, now pending admin approval
        toast.success("Email verified! Your account is pending admin approval.");
        onNavigate("login");

      } else if (purpose === OTP_PURPOSES.PASSWORD_RESET) {
        // Carry the verified OTP forward to ResetPasswordPage
        onOtpVerifiedForReset(data.otp);
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Invalid OTP", { id: loadToast });
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP — calls dedicated resend endpoint with the same purpose
  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendOtp(userEmail, purpose);
      toast.success("New code sent!");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  const backPage = purpose === OTP_PURPOSES.PASSWORD_RESET ? "forgotPassword" : "login";

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <button type="button" onClick={() => onNavigate(backPage)}>
          <FaArrowLeft size={20} />
        </button>
        <Heading title="OTP verification" />
      </div>
      <p className="text-[14px] text-[#0A1E25] mb-4">
        Code sent to{" "}
        <span className="text-[#705295] font-semibold">{userEmail}</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="One-Time Passcode"
          name="otp"
          type="text"
          control={control}
          placeholder="000000"
          required
        />
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="flex items-center gap-1 text-[#F76D00] text-[14px] font-bold"
          >
            <FaRedoAlt size={14} /> {isResending ? "Sending..." : "Resend OTP"}
          </button>
        </div>
        <div className="mt-4">
          <Button type="submit" label={isLoading ? "Verifying..." : "Verify"} disabled={isLoading} />
        </div>
      </form>
    </>
  );
};

export default OTPVerificationPage;