import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const MainLayout: React.FC = () => {
  const location = useLocation();

  // Helper to turn "/dashboard" into "Dashboard" for the Navbar title
  const getTitle = () => {
    const path = location.pathname.split("/")[1];
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : "Dashboard";
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F9F9F9]">
      {/* Sidebar: Fixed 102px */}
      <Sidebar />

      {/* Content Area: Occupies remaining width */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar: Full width of this container */}
        <Navbar title={getTitle()} />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
