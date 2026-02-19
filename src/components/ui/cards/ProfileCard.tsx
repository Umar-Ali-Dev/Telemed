import React from "react";

interface ProfileCardProps {
  label: string;
  value: string | number;
}

const ProfileCard = ({ label, value }: ProfileCardProps) => (
  <div className="flex flex-col space-y-1">
    <span className="text-gray-400 text-sm font-medium">{label}</span>
    <span className="text-[#3a2014] font-semibold">{value || "—"}</span>
  </div>
);

export default ProfileCard;
