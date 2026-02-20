import { createBrowserRouter } from "react-router-dom";
import AuthModal from "../pages/auth/AuthModal";
import MainLayout from "../layouts/MainLayout";
import ProviderDashboard from "../pages/provider/dashboard/ProviderDashboard";
import AllVisits from "../pages/provider/consultation/AllVisits";
import AllPatients from "../pages/provider/dashboard/AllPatients";
import { MyAccount } from "../pages/provider/dashboard/account/MyAccount"; // New Import
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
      {
        path: "/dashboard/all-patients",
        element: <AllPatients />,
      },
      {
        path: "/dashboard/patient/:id",
        element: <PatientProfile />,
      },
      {
        path: "/dashboard/my-account",
        element: <MyAccount />,
      },
      { path: "/chat", element: <Chat /> },
      { path: "/notifications", element: <Notifications /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
