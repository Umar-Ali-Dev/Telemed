import React from "react";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar } from "recharts";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  chartType: "line" | "bar";
  chartData: any[];
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  chartType,
  chartData,
  color = "#705295",
}) => {
  return (
    <div className="bg-white p-5 rounded-xl flex items-center justify-between min-w-[280px] flex-1 border border-gray-50 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Rounded Icon Container */}
        <div className="w-12 h-12 rounded-full bg-[#EBE5F1] flex items-center justify-center text-[#705295]">
          {icon}
        </div>
        <div>
          <h3 className="text-[20px] font-bold text-[#0A1E25] leading-tight">
            {value}
          </h3>
          <p className="text-gray-500 text-sm font-medium">{label}</p>
        </div>
      </div>

      <div className="w-24 h-12">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="pv"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <Bar dataKey="pv" fill={color} radius={[2, 2, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatCard;
