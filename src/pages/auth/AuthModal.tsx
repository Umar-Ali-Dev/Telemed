"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import OTPVerificationPage from "./OTPVerificationPage";
import ResetPasswordPage from "./ResetPasswordPage";
import instaVisitLogo from "../../assets/icons/instaVisit.svg";
import type { OtpPurpose } from "../../constants/roles";

type AuthPage =
  | "login"
  | "signUp"
  | "forgotPassword"
  | "otpVerification"
  | "resetPassword";

const AuthModal = () => {
  // Read ?token= from URL on initial render — used for provider set-password flow
  const urlToken = new URLSearchParams(window.location.search).get("token") ?? "";

  const [currentPage, setCurrentPage] = useState<AuthPage>(urlToken ? "resetPassword" : "login");
  const [userEmail, setUserEmail] = useState<string>("");
  const [otpPurpose, setOtpPurpose] = useState<OtpPurpose>("login");
  const [verifiedOtp, setVerifiedOtp] = useState<string>("");
  const [setPasswordToken] = useState<string>(urlToken);

  const navigateTo = (page: AuthPage) => setCurrentPage(page);

  // Called after login or signup — go to OTP page with the correct purpose
  const handleStartOtp = (email: string, purpose: OtpPurpose) => {
    setUserEmail(email);
    setOtpPurpose(purpose);
    setCurrentPage("otpVerification");
  };

  // Called after OTP verified in forgot-password flow — carry OTP to reset page
  const handleOtpVerifiedForReset = (otp: string) => {
    setVerifiedOtp(otp);
    setCurrentPage("resetPassword");
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      <Toaster position="top-center" />
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <img src={instaVisitLogo} alt="Logo" className="h-auto w-auto" />
      </div>

      <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
        <div className="w-full max-w-[550px] p-8 bg-white rounded-lg">
          {currentPage === "login" && (
            <LoginPage
              onNavigate={navigateTo}
              onLoginSuccess={(email) => handleStartOtp(email, "login")}
            />
          )}
          {currentPage === "signUp" && (
            <SignUpPage
              onNavigate={navigateTo}
              onSignUpSuccess={(email) => handleStartOtp(email, "email_verification")}
            />
          )}
          {currentPage === "forgotPassword" && (
            <ForgotPasswordPage
              onNavigate={navigateTo}
              onForgotSuccess={(email) => handleStartOtp(email, "password_reset")}
            />
          )}
          {currentPage === "otpVerification" && (
            <OTPVerificationPage
              onNavigate={navigateTo}
              userEmail={userEmail}
              purpose={otpPurpose}
              onOtpVerifiedForReset={handleOtpVerifiedForReset}
            />
          )}
          {currentPage === "resetPassword" && (
            <ResetPasswordPage
              onNavigate={navigateTo}
              userEmail={userEmail}
              verifiedOtp={verifiedOtp}
              setPasswordToken={setPasswordToken}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;