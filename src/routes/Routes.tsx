import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthModal from "../pages/auth/AuthModal";

// Provider Page Imports
import ProviderDashboard from "../pages/provider/dashboard/ProviderDashboard";
import AllVisits from "../pages/provider/consultation/AllVisits";

// Shared Page Imports
import Chat from "../pages/chat/Chat";
import Notifications from "../pages/notifications/Notifications";
import AllPatients from "../pages/provider/dashboard/AllPatients";
import PatientProfile from "../pages/provider/dashboard/profile-components/PatientProfile";
import { MyAccount } from "../pages/provider/dashboard/account/MyAccount";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminConsultations from "../pages/admin/AdminConsultations";

// Admin Page Placeholders (Create these files in src/pages/admin/)
const AllProviders = () => <div>All Providers</div>;
const ProviderRequests = () => <div>Provider Requests</div>;
const PrescriptionsManagement = () => <div>Prescriptions Management</div>;
const RefundRequests = () => <div>Refund Requests</div>;
const SystemControls = () => <div>System Controls</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthModal />,
  },

  // Provider Section
  {
    path: "/provider",
    element: <MainLayout />,
    children: [
      { path: "dashboard", element: <ProviderDashboard /> },
      { path: "all-visits", element: <AllVisits /> },
      { path: "all-patients", element: <AllPatients /> },
      { path: "patient/:id", element: <PatientProfile /> },
      { path: "my-account", element: <MyAccount /> },
      { path: "chat", element: <Chat /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },

  // Admin Section
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "consultations", element: <AdminConsultations /> },
      { path: "patient/:id", element: <PatientProfile /> },
      { path: "providers/all", element: <AllProviders /> },
      { path: "providers/requests", element: <ProviderRequests /> },
      {
        path: "management/prescriptions",
        element: <PrescriptionsManagement />,
      },
      { path: "management/refunds", element: <RefundRequests /> },
      { path: "management/controls", element: <SystemControls /> },
      { path: "my-account", element: <MyAccount /> },
      { path: "chat", element: <Chat /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
