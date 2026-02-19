import { createBrowserRouter } from "react-router-dom";
import AuthModal from "../pages/auth/AuthModal";
import MainLayout from "../layouts/MainLayout";
import ProviderDashboard from "../pages/provider/dashboard/ProviderDashboard";
import AllVisits from "../pages/provider/dashboard/AllVisits"; // New Page Import
import AllPatients from "../pages/provider/dashboard/AllPatients";
import PatientProfile from "../pages/provider/dashboard/profile-components/PatientProfile";

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
        path: "/dashboard/all-visits", // Added route
        element: <AllVisits />,
      },
      { path: "/dashboard/all-patients", element: <AllPatients /> },
      {
        path: "/dashboard/patient/:id",
        element: <PatientProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <div className="p-10 text-center">404 - Page Not Found</div>,
  },
]);
