import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineBell,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PROVIDER_LINKS, ADMIN_LINKS } from "../../constants/navigation";
import profileImage from "../../assets/icons/profile.jpg";

const ROLE_STORAGE_KEY = "user_role_context";

// In-memory fallback for role when sessionStorage is not available
let roleMemory: "admin" | "provider" | null = null;

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const [userRole, setUserRole] = useState<"admin" | "provider">("provider");
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const sessionStorageAvailable = useRef<boolean | null>(null);

  useEffect(() => {
    // Check if sessionStorage is available (only check once)
    if (sessionStorageAvailable.current === null) {
      try {
        sessionStorage.getItem("test");
        sessionStorageAvailable.current = true;
      } catch (error) {
        sessionStorageAvailable.current = false;
      }
    }

    // Determine role based on current pathname
    if (pathname.startsWith("/admin")) {
      setUserRole("admin");
      roleMemory = "admin";
      // Safely store role in sessionStorage if available
      if (sessionStorageAvailable.current) {
        try {
          sessionStorage.setItem(ROLE_STORAGE_KEY, "admin");
        } catch (error) {
          sessionStorageAvailable.current = false;
        }
      }
    } else if (pathname.startsWith("/provider")) {
      setUserRole("provider");
      roleMemory = "provider";
      // Safely store role in sessionStorage if available
      if (sessionStorageAvailable.current) {
        try {
          sessionStorage.setItem(ROLE_STORAGE_KEY, "provider");
        } catch (error) {
          sessionStorageAvailable.current = false;
        }
      }
    } else {
      // For shared routes, use stored role from sessionStorage or memory
      if (sessionStorageAvailable.current) {
        try {
          const storedRole = sessionStorage.getItem(ROLE_STORAGE_KEY) as "admin" | "provider" | null;
          if (storedRole === "admin" || storedRole === "provider") {
            setUserRole(storedRole);
            roleMemory = storedRole;
          } else if (roleMemory) {
            // Fallback to memory if sessionStorage doesn't have it
            setUserRole(roleMemory);
          }
        } catch (error) {
          sessionStorageAvailable.current = false;
          // Fallback to memory
          if (roleMemory) {
            setUserRole(roleMemory);
          }
        }
      } else {
        // Use memory fallback when sessionStorage is not available
        if (roleMemory) {
          setUserRole(roleMemory);
        }
      }
    }
  }, [pathname]);

  const isAdmin = userRole === "admin";
  const links = isAdmin ? ADMIN_LINKS : PROVIDER_LINKS;

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="w-[102px] h-full bg-white border-r border-gray-100 flex flex-col items-center shrink-0 relative z-20">
      <style>{`
        aside nav::-webkit-scrollbar { display: none; }
        aside nav { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <nav className="flex flex-col gap-8 flex-1 w-full py-6 overflow-y-auto scrollbar-hide min-h-0">
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
                  {(() => {
                    const isActive = link.subItems?.some(sub => pathname === sub.path || pathname.startsWith(sub.path + "/"));
                    const iconToUse = isActive && link.activeIcon ? link.activeIcon : link.icon;
                    return typeof iconToUse === "string" ? (
                      <img src={iconToUse} alt={link.label} className="w-7 h-7" />
                    ) : (
                      React.createElement(iconToUse, { size: 28 })
                    );
                  })()}
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
                          `block w-full text-[11px] font-medium transition-colors text-center px-1 ${isActive ? "text-[#705295]" : "text-[#A3948C]"}`
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
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 transition-colors ${isActive ? "text-[#705295]" : "text-[#999999] hover:text-[#705295]"}`
                }
              >
                {({ isActive }) => {
                  const iconToUse = isActive && link.activeIcon ? link.activeIcon : link.icon;
                  return (
                    <>
                      {typeof iconToUse === "string" ? (
                        <img src={iconToUse} alt={link.label} className="w-7 h-7" />
                      ) : (
                        React.createElement(iconToUse, { size: 28 })
                      )}
                      <span className="text-[12px] font-medium">{link.label}</span>
                    </>
                  );
                }}
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {isAdmin && (
        <div className="flex flex-col items-center gap-6 py-6 pt-12 border-t border-gray-50 w-full shrink-0">
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `relative w-[54px] h-[54px] rounded-full flex items-center justify-center border-2 transition-all ${isActive ? "border-[#705295] text-[#705295] bg-[#705295]/5" : "border-[#EFE9E6] text-[#999999] hover:bg-gray-50"}`
            }
          >
            <HiOutlineBell size={26} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-[#F76D00] border-2 border-white rounded-full"></span>
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `w-[54px] h-[54px] rounded-full flex items-center justify-center border-2 transition-all ${isActive ? "border-[#705295] text-[#705295] bg-[#705295]/5" : "border-[#EFE9E6] text-[#999999] hover:bg-gray-50"}`
            }
          >
            <HiOutlineChatAlt2 size={26} />
          </NavLink>
          <NavLink
            to="/my-account"
            className={({ isActive }) =>
              `w-[54px] h-[54px] rounded-full flex items-center justify-center border-2 transition-all overflow-hidden ${isActive ? "border-[#705295] text-[#705295] bg-[#705295]/5" : "border-[#EFE9E6] text-[#999999] hover:bg-gray-50"}`
            }
          >
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full"
            />
          </NavLink>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
