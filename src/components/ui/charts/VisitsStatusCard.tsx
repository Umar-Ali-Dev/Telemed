import React from "react";

interface StatusBarProps {
  percentage: number;
  label: string;
  color: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ percentage, label, color }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[#A3948C] text-[14px] font-medium">{label}</span>
        <span className="text-[#0A1E25] text-[14px] font-bold">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-[#F9F9F9] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

const VisitsStatusCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm h-full">
      {/* Header Section */}
      <div className="mb-6">
        <h3 className="text-[18px] font-bold text-[#0A1E25]">Visits Status</h3>
        <p className="text-[#A3948C] text-[12px] mt-1 font-medium">Last 7 Days</p>
      </div>

      {/* Status Bars */}
      <div className="space-y-6">
        <StatusBar percentage={30} label="In-Queue" color="#F76D00" />
        <StatusBar percentage={10} label="Rejected" color="#EF4444" />
        <StatusBar percentage={60} label="Completed" color="#705295" />
      </div>
    </div>
  );
};

export default VisitsStatusCard;
