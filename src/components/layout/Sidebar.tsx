import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiOutlineBell, HiOutlineChatAlt2 } from "react-icons/hi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PROVIDER_LINKS, ADMIN_LINKS } from "../../constants/navigation";
import logo from "../../assets/icons/Logo.svg";

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  const links = isAdmin ? ADMIN_LINKS : PROVIDER_LINKS;
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside className="w-[102px] h-screen bg-white border-r border-gray-100 flex flex-col items-center py-8 shrink-0 overflow-y-auto scrollbar-hide">
      <style>{`
        aside::-webkit-scrollbar { display: none; }
        aside { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="mb-12">
        <img src={logo} alt="InstaVisit" className="w-12 h-12" />
      </div>

      <nav className="flex flex-col gap-8 flex-1 w-full">
        {links.map((link) => (
          <div key={link.label} className="flex flex-col items-center w-full">
            {link.subItems ? (
              <div className="flex flex-col items-center w-full">
                <button
                  onClick={() => toggleMenu(link.label)}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    openMenus[link.label] ? "text-[#705295]" : "text-[#999999]"
                  }`}
                >
                  <link.icon size={28} />
                  <span className="text-[12px] font-medium">{link.label}</span>
                  {openMenus[link.label] ? (
                    <FaChevronUp size={10} className="mt-1" />
                  ) : (
                    <FaChevronDown size={10} className="mt-1" />
                  )}
                </button>

                {openMenus[link.label] && (
                  <div className="flex flex-col items-center gap-3 mt-4 w-full bg-[#F9F9F9] py-3">
                    {link.subItems.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        className={({ isActive }) =>
                          `text-[11px] font-medium transition-colors ${
                            isActive ? "text-[#705295]" : "text-[#A3948C]"
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={link.path!}
                end={
                  link.path === "/provider/dashboard" ||
                  link.path === "/admin/dashboard"
                }
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 transition-colors ${
                    isActive
                      ? "text-[#705295]"
                      : "text-[#999999] hover:text-[#705295]"
                  }`
                }
              >
                <link.icon size={28} />
                <span className="text-[12px] font-medium">{link.label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-6 mt-12 pt-12 border-t border-gray-50 w-full">
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `relative w-[54px] h-[54px] rounded-full flex items-center justify-center border-2 transition-all ${
              isActive
                ? "border-[#705295] text-[#705295] bg-[#705295]/5"
                : "border-[#EFE9E6] text-[#999999] hover:bg-gray-50"
            }`
          }
        >
          <HiOutlineBell size={26} />
          <span className="absolute top-0 right-0 w-4 h-4 bg-[#F76D00] border-2 border-white rounded-full"></span>
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `w-[54px] h-[54px] rounded-full flex items-center justify-center border-2 transition-all ${
              isActive
                ? "border-[#705295] text-[#705295] bg-[#705295]/5"
                : "border-[#EFE9E6] text-[#999999] hover:bg-gray-50"
            }`
          }
        >
          <HiOutlineChatAlt2 size={26} />
        </NavLink>

        <NavLink
          to={isAdmin ? "/admin/my-account" : "/provider/my-account"}
          className={({ isActive }) =>
            `w-[54px] h-[54px] rounded-full overflow-hidden border-2 p-0.5 transition-all ${
              isActive ? "border-[#705295]" : "border-[#EFE9E6]"
            }`
          }
        >
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&h=150&auto=format&fit=crop"
            alt="User Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
