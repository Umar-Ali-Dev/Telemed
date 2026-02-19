import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Button from "../components/ui/button/Button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Visual Element */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white rounded-[25px] shadow-sm border border-gray-100 flex items-center justify-center text-[#705295]">
            <HiOutlineExclamationCircle size={48} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-[48px] font-bold text-[#271100] leading-tight">
            404
          </h1>
          <h2 className="text-[20px] font-semibold text-[#1A202C]">
            Page Not Found
          </h2>
          <p className="text-[#A3948C] text-[14px]">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex justify-center">
          <Button
            label="Back to Dashboard"
            onClick={() => navigate("/dashboard")}
            bgColor="bg-[#705295]"
          />
        </div>
      </div>

      {/* Subtle Bottom Branding */}
      <div className="absolute bottom-8 text-[12px] text-[#999999]">
        © {new Date().getFullYear()} InstaVisit. All rights reserved.
      </div>
    </div>
  );
};

export default NotFound;
