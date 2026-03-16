import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", time: 2 },
  { day: "Tue", time: 3 },
  { day: "Wed", time: 4 },
  { day: "Thu", time: 5 },
  { day: "Fri", time: 8 },
  { day: "Sat", time: 8 },
  { day: "Sun", time: 6 },
];

const ProviderResponseTimeChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm h-full">
      {/* Header Section */}
      <div className="mb-6">
        <h3 className="text-[18px] font-bold text-[#0A1E25]">
          Request Response Time
        </h3>
        <p className="text-[#A3948C] text-[12px] mt-1 font-medium">
          Last 7 Days
        </p>
      </div>

      {/* Chart Area */}
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: -25, bottom: 10 }}
          >
            <CartesianGrid vertical={false} horizontal={false} />

            <XAxis
              dataKey="day"
              axisLine={{ stroke: "#EFE9E6", strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: "#A3948C", fontSize: 11, fontWeight: 500 }}
              dy={15}
              padding={{ left: 10, right: 10 }}
            />

            <YAxis
              axisLine={{ stroke: "#EFE9E6", strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: "#A3948C", fontSize: 11 }}
              tickFormatter={(val) => `${val}H`}
              domain={[0, 10]}
              ticks={[1, 2, 4, 6, 8, 10]}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />

            <Line
              type="monotone"
              dataKey="time"
              stroke="#705295"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#705295",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProviderResponseTimeChart;
