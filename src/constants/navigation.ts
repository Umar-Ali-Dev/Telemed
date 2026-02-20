import type { IconType } from "react-icons";
import {
  LuLayoutDashboard,
  LuStethoscope,
  LuUsers,
  LuUserPlus,
  LuSettings,
  LuShieldCheck,
  LuGlobe,
  LuFileText,
} from "react-icons/lu";

export interface NavItem {
  label: string;
  path?: string; // Optional if it has subItems
  icon: IconType;
  subItems?: { label: string; path: string }[];
}

export const PROVIDER_LINKS: NavItem[] = [
  { label: "Dashboard", path: "/provider/dashboard", icon: LuLayoutDashboard },
  {
    label: "Consultations",
    path: "/provider/consultations",
    icon: LuStethoscope,
  },
  { label: "Patients", path: "/provider/all-patients", icon: LuUsers },
];

export const ADMIN_LINKS: NavItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LuLayoutDashboard },
  { label: "Consultations", path: "/admin/consultations", icon: LuStethoscope },
  { label: "Patients", path: "/admin/patients", icon: LuUsers },
  {
    label: "Providers",
    icon: LuUserPlus,
    subItems: [
      { label: "All Providers", path: "/admin/providers/all" },
      { label: "Provider Requests", path: "/admin/providers/requests" },
    ],
  },
  {
    label: "Management",
    icon: LuSettings,
    subItems: [
      { label: "Prescriptions", path: "/admin/management/prescriptions" },
      { label: "Refund Requests", path: "/admin/management/refunds" },
      { label: "System Controls", path: "/admin/management/controls" },
      { label: "Reporting & Analytics", path: "/admin/management/reports" },
    ],
  },
  {
    label: "Compliance",
    icon: LuShieldCheck,
    subItems: [
      { label: "Audit Logs", path: "/admin/compliance/audit" },
      { label: "Document Handling", path: "/admin/compliance/docs" },
    ],
  },
  { label: "Website", path: "/admin/website", icon: LuGlobe },
  { label: "Blogs", path: "/admin/blogs", icon: LuFileText },
];
