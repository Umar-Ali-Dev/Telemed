"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import for redirection
import toast, { Toaster } from "react-hot-toast";
import Heading from "../../components/ui/headings/Heading";
import InputField from "../../components/ui/inputs/InputField";
import Button from "../../components/ui/button/Button";
import instaVisitLogo from "../../assets/icons/instaVisit.svg";

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: any) => {
    const loadToast = toast.loading("Verifying Admin credentials...");

    // Simulate API call
    setTimeout(() => {
      toast.success("Admin access granted!", { id: loadToast });

      // Redirect directly to admin dashboard
      navigate("/admin/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      <Toaster position="top-center" />
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <img src={instaVisitLogo} alt="Logo" className="h-auto w-auto" />
      </div>

      <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
        <div className="flex flex-col w-full max-w-md mx-auto">
          <Heading title="Admin Login" className="mb-6 font-bold" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <InputField
                label="Admin Email"
                name="email"
                type="email"
                control={control}
                required
                placeholder="admin@instavisitrx.com"
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                control={control}
                required
                placeholder="Enter admin password"
              />
            </div>

            {/* <div className="flex justify-end mt-2">
          <button
            type="button"
            className="text-[#F76D00] text-[14px] font-bold hover:underline"
          >
            Forgot password?
          </button>
        </div> */}

            <div className="mt-6">
              <Button
                type="submit"
                label="Login to Dashboard"
                className="w-full bg-[#705295] py-3 rounded-xl font-bold"
              />
            </div>
          </form>

          <div className="mt-8 text-center text-[13px] text-[#999999]">
            Secure access for authorized personnel only.
            <br />
            Contact system administrator for access issues.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
