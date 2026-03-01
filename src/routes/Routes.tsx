import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthModal from "../pages/auth/AuthModal";
import ProviderDashboard from "../pages/provider/dashboard/ProviderDashboard";
import AllVisits from "../pages/provider/consultation/AllVisits";
import AllPatients from "../pages/provider/dashboard/AllPatients";
import PatientProfile from "../pages/provider/dashboard/profile-components/PatientProfile";
import Chat from "../pages/chat/Chat";
import Notifications from "../pages/notifications/Notifications";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminConsultations from "../pages/admin/AdminConsultations";
import AdminPatients from "../pages/admin/AdminPatients";
import EditPatient from "../pages/admin/patients/EditPatient";
import EditProvider from "../pages/admin/providers/EditProvider";
import AdminProviderProfile from "../pages/admin/profile-components/AdminProviderProfile";
import MyAccount from "../pages/provider/dashboard/account/MyAccount";

const ProviderRequests = () => <div>Provider Requests</div>;
const PrescriptionsManagement = () => <div>Prescriptions Management</div>;
const RefundRequests = () => <div>Refund Requests</div>;
const SystemControls = () => <div>System Controls</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthModal />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "my-account", element: <MyAccount /> },
      { path: "chat", element: <Chat /> },
      { path: "notifications", element: <Notifications /> },
      {
        path: "provider",
        children: [
          { path: "dashboard", element: <ProviderDashboard /> },
          { path: "all-visits", element: <AllVisits /> },
          { path: "all-patients", element: <AllPatients /> },
          { path: "patient/:id", element: <PatientProfile /> },
        ],
      },
      {
        path: "admin",
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "consultations", element: <AdminConsultations /> },
          { path: "all-patients", element: <AdminPatients /> },
          { path: "patients/edit/:id", element: <EditPatient /> },
          { path: "patient/:id", element: <PatientProfile /> },
          { path: "providers/add", element: <EditProvider /> },
          { path: "providers/edit/:id", element: <EditProvider /> },
          { path: "provider-profile/:id", element: <AdminProviderProfile /> },
          { path: "providers/requests", element: <ProviderRequests /> },
          {
            path: "management/prescriptions",
            element: <PrescriptionsManagement />,
          },
          { path: "management/refunds", element: <RefundRequests /> },
          { path: "management/controls", element: <SystemControls /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
