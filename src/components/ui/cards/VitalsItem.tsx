import React from "react";

interface VitalsItemProps {
  label: string;
  value: string | number;
}

const VitalsItem: React.FC<VitalsItemProps> = ({ label, value }) => {
  return (
    <div className="flex items-center gap-4">
      <p className="text-[12px] text-[#A3948C] font-medium ">{label}</p>
      <p className="text-[12px] font-semibold text-[#271100]">{value}</p>
    </div>
  );
};

export default VitalsItem;
