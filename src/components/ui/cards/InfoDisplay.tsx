import React from "react";

interface InfoDisplayProps {
  label: string;
  value: string | number;
  className?: string;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({
  label,
  value,
  className = "",
}) => (
  <div className={className}>
    <p className="text-[14px] text-[#A3948C] mb-1">{label}</p>
    <p className="text-[16px] font-medium text-[#1A202C]">{value || "----"}</p>
  </div>
);

export default InfoDisplay;
