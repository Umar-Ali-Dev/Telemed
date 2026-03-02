import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuClock } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi";
import instaVisitLogo from "../../assets/icons/instaVisit.svg";

const Navbar: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <header
      className="h-[80px] w-full flex items-center justify-between px-8 sticky top-0 z-10 transition-all border-b border-gray-100"
      style={{
        boxShadow: "0px 2px 14px 0px #00000021",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center">
        <img src={instaVisitLogo} alt="Logo" className="h-auto w-auto" />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 bg-[#EBE5F1] px-4 py-2 rounded-xl">
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[#705295]">
              {isAvailable ? "Available" : "Unavailable"}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-[#666666]">
              <LuClock size={12} />
              <span>Priority Status</span>
            </div>
          </div>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
              isAvailable ? "bg-[#705295]" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                isAvailable ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
        <Link
          to="/my-account"
          className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 transition-all hover:bg-gray-50 text-[#999999] hover:text-[#705295]"
        >
          <HiOutlineUserCircle size={28} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
