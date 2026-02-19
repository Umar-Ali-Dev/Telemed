import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const MainLayout: React.FC = () => {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname.split("/")[1];
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : "Dashboard";
  };

  return (
    <div className="flex h-screen w-full  ">
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
