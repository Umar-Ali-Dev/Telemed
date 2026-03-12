import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/landing/Navbar";
import Footer from "../components/ui/landing/Footer";

const LandingLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Landing Page specific Navbar */}
      <Navbar />

      {/* Main content area where sections will render */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Landing Page Footer */}
      <Footer />
    </div>
  );
};

export default LandingLayout;
