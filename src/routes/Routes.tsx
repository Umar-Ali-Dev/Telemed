import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthModal from "../pages/auth/AuthModal";
import MainLayout from "../layouts/MainLayout";
import ProviderDashboard from "../pages/provider/dashboard/ProviderDashboard";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import AllVisits from "../pages/provider/dashboard/AllVisits";
import AllPatients from "../pages/provider/dashboard/AllPatients";
import { MyAccount } from "../pages/provider/dashboard/account/MyAccount"; // New Import
import PatientProfile from "../pages/provider/dashboard/profile-components/PatientProfile";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthModal />,
  },
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/provider",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/provider/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <ProviderDashboard />,
      },
      {
        path: "dashboard/all-visits",
        element: <AllVisits />,
      },
      { path: "dashboard/all-patients",
        element: <AllPatients />,
      },
      {
        path: "dashboard/patient/:id",
        element: <PatientProfile />,
      },
      {
        path: "dashboard/my-account",
        element: <MyAccount />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
