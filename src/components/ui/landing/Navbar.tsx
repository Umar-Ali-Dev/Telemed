import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { HiOutlineMail } from "react-icons/hi";
import instaVisitLogo from "../../../assets/icons/instaVisit.svg";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <header className="w-full bg-white border-b border-gray-100 py-6">
      {/* Internal alignment wrapper to match the MainContainer width */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
        {/* Logo Section */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={instaVisitLogo}
            alt="InstaVisitRx Logo"
            className="h-auto w-auto"
          />
        </div>

        {/* Navigation and Actions */}
        <div className="flex items-center gap-10">
          <nav className="hidden lg:flex items-center gap-10 text-[16px] font-medium text-[#4A5568]">
            <a href="/" className="hover:text-[#705295] transition-colors">
              Home
            </a>
            <a
              href="/provider"
              className="hover:text-[#705295] transition-colors"
            >
              Provider
            </a>
            <a
              href="/patient"
              className="hover:text-[#705295] transition-colors"
            >
              Patient
            </a>
            <a href="/faqs" className="hover:text-[#705295] transition-colors">
              FAQs
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <button className="text-[#0A1E25] hover:text-[#705295] transition-all">
              <HiOutlineMail size={24} />
            </button>
            {/* Added onClick to redirect to /login */}
            <button
              onClick={() => navigate("/login")}
              className="bg-[#705295] text-white px-10 py-3 rounded-[12px] font-bold text-[16px] hover:bg-[#5e447e] transition-all shadow-sm active:scale-95"
            >
              Login | Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
