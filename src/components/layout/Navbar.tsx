import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuClock } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const { pathname } = useLocation();

  const [isAvailable, setIsAvailable] = useState(true);
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="h-[80px] w-full bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <h1 className="text-[24px] font-bold text-[#0A1E25]">{title}</h1>

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
