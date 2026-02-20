import type { IconType } from "react-icons";
import { LuLayoutDashboard, LuStethoscope, LuUsers } from "react-icons/lu";

export interface NavItem {
  label: string;
  path: string;
  icon: IconType;
}

export const SIDEBAR_LINKS: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LuLayoutDashboard },
  {
    label: "Consultations",
    path: "/dashboard/all-visits",
    icon: LuStethoscope,
  },
  { label: "Patients", path: "/dashboard/all-patients", icon: LuUsers },
];
