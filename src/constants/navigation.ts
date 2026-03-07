import type { IconType } from "react-icons";
import chartLineUpIcon from "../assets/icons/chartLineUp.svg";
import shieldPlusIcon from "../assets/icons/shieldPlus.svg";
import briefcaseMedicalIcon from "../assets/icons/briefcaseMedicalSolid.svg";
import userListIcon from "../assets/icons/userList.svg";
import chatCircleDotsIcon from "../assets/icons/chatCircleDots.svg";
import unionIcon from "../assets/icons/union.svg";
import notebookIcon from "../assets/icons/notebook.svg";
import menuIcon from "../assets/icons/menu.svg";
import briefcaseMedicalSolidIcon from "../assets/icons/briefcase-medical-solid.svg";
import fileWaveformSolidIcon from "../assets/icons/fileWaveformSolid.svg";
import adminProviderIcon from "../assets/icons/adminProvider.svg";
import managementIcon from "../assets/icons/management.svg";
import activeMenuIcon from "../assets/icons/activeMenu.svg";
import activeBriefcaseMedicalSolidIcon from "../assets/icons/activebriefcaseMedicalSolid.svg";
import activeFileWaveformSolidIcon from "../assets/icons/ativeFileWaveformSolid.svg";
import activeAdminProviderIcon from "../assets/icons/activeAdminProvider.svg";
import activeManagementIcon from "../assets/icons/actveManagement.svg";
import activeShieldPlusIcon from "../assets/icons/activeShieldPlus.svg";
import activeUserListIcon from "../assets/icons/activeUserList.svg";
import activeUnionIcon from "../assets/icons/activeUnion.svg";
import activeChatCircleDotsIcon from "../assets/icons/activeChatCircleDots.svg";
import activeChartLineUpIcon from "../assets/icons/activeChartLineUp.svg";
import activeNotebookIcon from "../assets/icons/activeNotebook.svg";

export interface NavItem {
  label: string;
  path?: string; // Optional if it has subItems
  icon: IconType | string; // Can be IconType or SVG path
  activeIcon?: IconType | string; // Active state icon
  subItems?: { label: string; path: string }[];
}

export const PROVIDER_LINKS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/provider/dashboard",
    icon: menuIcon,
    activeIcon: activeMenuIcon,
  },
  {
    label: "New Visits",
    path: "/provider/new-visits",
    icon: shieldPlusIcon,
    activeIcon: activeShieldPlusIcon,
  },
  {
    label: "All Visits",
    path: "/provider/all-visits",
    icon: briefcaseMedicalIcon,
    activeIcon: activeBriefcaseMedicalSolidIcon,
  },
  {
    label: "All Patients",
    path: "/provider/all-patients",
    icon: userListIcon,
    activeIcon: activeUserListIcon,
  },
  {
    label: "Flagged Patients",
    path: "/provider/flagged-patients",
    icon: unionIcon,
    activeIcon: activeUnionIcon,
  },
  {
    label: "Messages",
    path: "/chat",
    icon: chatCircleDotsIcon,
    activeIcon: activeChatCircleDotsIcon,
  },
  {
    label: "Statistics",
    path: "/provider/statistics",
    icon: chartLineUpIcon,
    activeIcon: activeChartLineUpIcon,
  },
  {
    label: "Activity Logs",
    path: "/provider/activity-logs",
    icon: notebookIcon,
    activeIcon: activeNotebookIcon,
  },
];

export const ADMIN_LINKS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: menuIcon,
    activeIcon: activeMenuIcon,
  },
  {
    label: "Consultations",
    path: "/admin/consultations",
    icon: briefcaseMedicalSolidIcon,
    activeIcon: activeBriefcaseMedicalSolidIcon,
  },
  {
    label: "Patients",
    path: "/admin/all-patients",
    icon: fileWaveformSolidIcon,
    activeIcon: activeFileWaveformSolidIcon,
  },
  {
    label: "Providers",
    icon: adminProviderIcon,
    activeIcon: activeAdminProviderIcon,
    subItems: [
      { label: "All Providers", path: "/admin/all-providers" },
      { label: "Provider Requests", path: "/admin/providers/requests" },
    ],
  },
  {
    label: "Management",
    icon: managementIcon,
    activeIcon: activeManagementIcon,
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
