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
import chartLineUpIcon from "../assets/icons/chartLineUp.svg";
import shieldPlusIcon from "../assets/icons/shieldPlus.svg";
import briefcaseMedicalIcon from "../assets/icons/briefcaseMedicalSolid.svg";
import userListIcon from "../assets/icons/userList.svg";
import chatCircleDotsIcon from "../assets/icons/chatCircleDots.svg";
import unionIcon from "../assets/icons/union.svg";
import notebookIcon from "../assets/icons/notebook.svg";
import menuIcon from "../assets/icons/menu.svg";
import briefcaseMedicalSolidIcon from "../assets/icons/briefcaseMedicalSolid.svg";
import fileWaveformSolidIcon from "../assets/icons/fileWaveformSolid.svg";
import adminProviderIcon from "../assets/icons/adminProvider.svg";
import managementIcon from "../assets/icons/management.svg";

export interface NavItem {
  label: string;
  path?: string; // Optional if it has subItems
  icon: IconType | string; // Can be IconType or SVG path
  subItems?: { label: string; path: string }[];
}

export const PROVIDER_LINKS: NavItem[] = [
  { label: "Dashboard", path: "/provider/dashboard", icon: LuLayoutDashboard },
  { label: "New Visits", path: "/provider/new-visits", icon: shieldPlusIcon },
  {
    label: "All Visits",
    path: "/provider/all-visits",
    icon: briefcaseMedicalIcon,
  },
  { label: "All Patients", path: "/provider/all-patients", icon: userListIcon },
  {
    label: "Flagged Patients",
    path: "/provider/flagged-patients",
    icon: unionIcon,
  },
  { label: "Messages", path: "/chat", icon: chatCircleDotsIcon },
  { label: "Statistics", path: "/provider/statistics", icon: chartLineUpIcon },
  {
    label: "Activity Logs",
    path: "/provider/activity-logs",
    icon: notebookIcon,
  },
];

export const ADMIN_LINKS: NavItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: menuIcon },
  { label: "Consultations", path: "/admin/consultations", icon: briefcaseMedicalSolidIcon },
  { label: "Patients", path: "/admin/all-patients", icon: fileWaveformSolidIcon },
  {
    label: "Providers",
    icon: adminProviderIcon,
    subItems: [
      { label: "All Providers", path: "/admin/all-providers" },
      { label: "Provider Requests", path: "/admin/providers/requests" },
    ],
  },
  {
    label: "Management",
    icon: managementIcon,
    subItems: [
      { label: "Prescriptions", path: "/admin/management/prescriptions" },
      { label: "Refund Requests", path: "/admin/management/refunds" },
      { label: "System Controls", path: "/admin/management/controls" },
      { label: "Reporting & Analytics", path: "/admin/management/analytics" },
      { label: "Compliance & Audit Logs", path: "/admin/management/audit" },
      { label: "Document Handling", path: "/admin/management/docs" },
    ],
  },
];
