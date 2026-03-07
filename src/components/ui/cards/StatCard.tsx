import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  chartType: "bar" | "dot-line" | "simple-line"; // Defines the specific chart style
  chartData: any[];
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  chartType,
  chartData,
}) => {
  return (
    <div className="bg-white p-4 rounded-[10px] flex items-center justify-between border border-gray-100 shadow-sm flex-1 min-w-[260px]">
      <div className="flex items-center gap-4">
        {/* Purple Icon Container */}
        <div className="w-12 h-12 rounded-full bg-[#F2EFFF] flex items-center justify-center text-[#705295]">
          {icon}
        </div>
        <div>
          {/* Main Stat Value */}
          <h3 className="text-[28px] font-bold text-[#0A1E25] leading-tight">
            {value}
          </h3>
          {/* Label Text */}
          <p className="text-[#A3948C] text-sm font-medium">{label}</p>
        </div>
      </div>

      {/* Reusable Chart Container */}
      <div className="w-24 h-12">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={chartData}>
              {/* Bar Chart with Alternating Colors */}
              <Bar dataKey="pv" radius={[2, 2, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#705295" : "#D4CFCC"}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              {/* Line Chart Handling both dot-line and simple-line */}
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#D4CFCC" // Base path color
                strokeWidth={2}
                activeDot={false}
                {...(chartType === "dot-line"
                  ? {
                      dot: {
                        r: 2,
                        fill: "#705295",
                        stroke: "#705295",
                        strokeWidth: 0,
                      },
                    }
                  : {
                      dot: false,
                    })}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatCard;
