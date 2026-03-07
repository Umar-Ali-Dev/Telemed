import { Fragment, useState } from "react"; // Added useState
import { Menu, Transition } from "@headlessui/react";
import { LuPencil, LuLogOut } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import profileImage from "../../assets/icons/profile.jpg";
import LogoutModal from "../ui/modals/LogoutModal";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Modal state

  const isProvider = pathname.startsWith("/provider");

  const handleLogoutConfirm = () => {
    console.log("Logout Confirmed");
    setIsLogoutModalOpen(false);
    navigate("/login"); // Adjust route as needed
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="w-10 h-10 rounded-full flex items-center justify-center border-none overflow-hidden focus:outline-none transition-transform active:scale-95">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-3 w-[200px] origin-top-right rounded-2xl bg-white p-2 shadow-xl ring-opacity-5 focus:outline-none z-50">
            <div className="flex flex-col gap-1">
              {isProvider && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/provider/my-account")}
                      className={`${active ? "bg-[#F2EFFF]" : ""} group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-bold text-[#705295] transition-colors`}
                    >
                      <LuPencil size={18} />
                      Update Profile
                    </button>
                  )}
                </Menu.Item>
              )}

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setIsLogoutModalOpen(true)} // Open modal on click
                    className={`${active ? "bg-orange-50" : ""} group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-bold text-[#F76D00] transition-colors`}
                  >
                    <LuLogOut size={18} />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Logout Confirmation Popup */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default ProfileDropdown;
