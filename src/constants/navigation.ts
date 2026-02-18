import type { IconType } from "react-icons";
import { LuLayoutDashboard, LuStethoscope, LuUsers } from "react-icons/lu";

export interface NavItem {
  label: string;
  path: string;
  icon: IconType;
}

export const SIDEBAR_LINKS: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LuLayoutDashboard },
  { label: "Consultations", path: "/consultations", icon: LuStethoscope },
  { label: "Patients", path: "/patients", icon: LuUsers },
];
