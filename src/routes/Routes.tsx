import { createBrowserRouter } from "react-router-dom";
import AuthModal from "../pages/auth/AuthModal";
import MainLayout from "../layouts/MainLayout";
import ProviderDashboard from "../pages/provider/dashboard/ProviderDashboard";
import AllVisits from "../pages/provider/dashboard/AllVisits";
import AllPatients from "../pages/provider/dashboard/AllPatients";
import PatientProfile from "../pages/provider/dashboard/profile-components/PatientProfile";
import NotFound from "../pages/NotFound";
import Chat from "../pages/chat/Chat";
import Notifications from "../pages/notifications/Notifications";

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
        path: "/dashboard/all-visits",
        element: <AllVisits />,
      },
      { path: "/dashboard/all-patients", element: <AllPatients /> },
      {
        path: "/dashboard/patient/:id",
        element: <PatientProfile />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      { path: "/notifications", element: <Notifications /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
