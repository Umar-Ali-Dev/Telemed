import { createBrowserRouter } from "react-router-dom";
import AuthModal from "../pages/auth/AuthModal";
import MainLayout from "../layouts/MainLayout";
import ProviderDashboard from "../pages/provider/dashboard/ProviderDashboard";
import PatientProfile from "../pages/provider/dashboard/PatientProfile"; //

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthModal />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <ProviderDashboard />,
      },
      {
        path: "/dashboard/patient/:id", // New route for the profile
        element: <PatientProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <div className="p-10 text-center">404 - Page Not Found</div>,
  },
]);
