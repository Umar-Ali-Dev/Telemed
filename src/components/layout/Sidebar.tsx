import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiOutlineBell, HiOutlineChatAlt2 } from "react-icons/hi";
import { SIDEBAR_LINKS } from "../../constants/navigation";
import logo from "../../assets/icons/Logo.svg";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const routePrefix = location.pathname.startsWith("/admin") ? "/admin" : "/provider";

  return (
    <aside className="w-[102px] h-screen bg-white border-r border-gray-100 flex flex-col items-center py-8 shrink-0">
      <div className="mb-12">
        <img src={logo} alt="InstaVisit" className="w-12 h-12" />
      </div>

      <nav className="flex flex-col gap-8 flex-1">
        {SIDEBAR_LINKS.map((link) => {
          // Build the correct path based on route prefix
          let fullPath = link.path;
          
          // If path starts with /provider or /admin, replace with current prefix
          if (link.path.startsWith("/provider") || link.path.startsWith("/admin")) {
            const pathWithoutPrefix = link.path.replace(/^\/(provider|admin)/, "");
            fullPath = `${routePrefix}${pathWithoutPrefix}`;
          } else if (link.path.startsWith("/")) {
            // If path starts with / but not /provider or /admin, keep as is (e.g., /consultations)
            fullPath = link.path;
          } else {
            // Relative path, prepend route prefix
            fullPath = `${routePrefix}/${link.path}`;
          }
          
          const isDashboard = fullPath.endsWith("/dashboard") || fullPath === `${routePrefix}/dashboard`;
          
          return (
            <NavLink
              key={link.path}
              to={fullPath}
              end={isDashboard}
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
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-6 mt-auto">
        <NavLink
          to={`${routePrefix}/notifications`}
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
          to={`${routePrefix}/chat`}
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
          to={`${routePrefix}/dashboard/my-account`}
          className={({ isActive }) =>
            `w-[54px] h-[54px] rounded-full overflow-hidden border-2 p-0.5 transition-all ${
              isActive ? "border-[#705295]" : "border-[#EFE9E6]"
            }`
          }
        >
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&h=150&auto=format&fit=crop"
            alt="Doctor Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
