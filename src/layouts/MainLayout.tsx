import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const MainLayout: React.FC = () => {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;

    if (path.includes("/dashboard/all-visits")) return "Consultations";
    if (path.includes("/dashboard/my-account")) return "My Account";
    if (path.includes("/notifications")) return "Notifications";
    if (path.includes("/chat")) return "Messages";
    if (path.includes("/dashboard/patient/")) return "Patient Profile";
    if (path === "/dashboard") return "Dashboard";

    const segment = path.split("/").pop() || "Dashboard";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <div className="flex h-screen w-full ">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar title={getTitle()} />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
