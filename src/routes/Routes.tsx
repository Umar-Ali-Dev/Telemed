import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthModal from "../pages/auth/AuthModal";

// Provider Pages
import ProviderDashboard from "../pages/provider/dashboard/ProviderDashboard";
import AllVisits from "../pages/provider/consultation/AllVisits";
import NewVisits from "../pages/provider/consultation/NewVisits";
import AllPatients from "../pages/provider/dashboard/AllPatients";
import PatientProfile from "../pages/provider/dashboard/profile-components/PatientProfile";
import MyAccount from "../pages/provider/dashboard/account/MyAccount";
import Statistics from "../pages/provider/dashboard/Statistics";
import ActivityLogs from "../pages/provider/dashboard/ActivityLogs";

// Shared Pages
import Chat from "../pages/chat/Chat";
import Notifications from "../pages/notifications/Notifications";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminConsultations from "../pages/admin/AdminConsultations";
import AdminPatients from "../pages/admin/AdminPatients";
import EditPatient from "../pages/admin/patients/EditPatient";
import AdminProviders from "../pages/admin/providers/AdminProviders";
import EditProvider from "../pages/admin/providers/EditProvider";
import ProviderRequests from "../pages/admin/providers/ProviderRequests";
import AdminProviderProfile from "../pages/admin/profile-components/AdminProviderProfile";
import AllPrescriptions from "../pages/admin/management/AllPrescriptions";
import AllRefundRequests from "../pages/admin/management/AllRefundRequests";
import SystemControls from "../pages/admin/management/SystemControls";
import Analytics from "../pages/admin/management/Analytics";
import ComplianceAudit from "../pages/admin/management/ComplianceAudit";
import DocumentHandling from "../pages/admin/management/DocumentHandling";

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
          { path: "new-visits", element: <NewVisits /> },
          { path: "all-visits", element: <AllVisits /> },
          { path: "all-patients", element: <AllPatients /> },
          { path: "statistics", element: <Statistics /> },
          { path: "activity-logs", element: <ActivityLogs /> },
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
          { path: "all-providers", element: <AdminProviders /> },
          { path: "providers/add", element: <EditProvider /> },
          { path: "providers/edit/:id", element: <EditProvider /> },
          { path: "provider-profile/:id", element: <AdminProviderProfile /> },
          { path: "providers/requests", element: <ProviderRequests /> },
          {
            path: "management/prescriptions",
            element: <AllPrescriptions />,
          },
          { path: "management/refunds", element: <AllRefundRequests /> },
          { path: "management/controls", element: <SystemControls /> },
          { path: "management/analytics", element: <Analytics /> },
          { path: "management/audit", element: <ComplianceAudit /> },
          { path: "management/docs", element: <DocumentHandling /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
