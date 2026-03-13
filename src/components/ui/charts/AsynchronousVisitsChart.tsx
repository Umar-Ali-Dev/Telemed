import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dailyData = [
  { time: "11 AM", orange: 60, purple: 25 },
  { time: "12 PM", orange: 65, purple: 30 },
  { time: "1 PM", orange: 58, purple: 22 },
  { time: "2 PM", orange: 70, purple: 35 },
  { time: "3 PM", orange: 62, purple: 28 },
  { time: "4 PM", orange: 68, purple: 32 },
  { time: "5 PM", orange: 64, purple: 30 },
  { time: "6 PM", orange: 72, purple: 38 },
  { time: "7 PM", orange: 66, purple: 33 },
  { time: "8 PM", orange: 70, purple: 36 },
  { time: "9 PM", orange: 65, purple: 31 },
  { time: "10 PM", orange: 68, purple: 34 },
];

const weeklyData = [
  { time: "Mon", orange: 65, purple: 30 },
  { time: "Tue", orange: 70, purple: 35 },
  { time: "Wed", orange: 68, purple: 32 },
  { time: "Thu", orange: 72, purple: 38 },
  { time: "Fri", orange: 75, purple: 40 },
  { time: "Sat", orange: 70, purple: 35 },
  { time: "Sun", orange: 68, purple: 33 },
];

const monthlyData = [
  { time: "Week 1", orange: 68, purple: 33 },
  { time: "Week 2", orange: 72, purple: 36 },
  { time: "Week 3", orange: 70, purple: 35 },
  { time: "Week 4", orange: 75, purple: 38 },
];

const AsynchronousVisitsChart: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  const getData = () => {
    switch (selectedRange) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const data = getData();

  return (
    <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-[24px] font-bold text-[#0A1E25]">
            Asynchronous Visits
          </h2>
        </div>

        {/* Range Toggles */}
        <div className="flex items-center p-1 bg-[#F2EFFF] rounded-xl">
          <button
            onClick={() => setSelectedRange("daily")}
            className={`px-5 py-2 rounded-lg text-[14px] font-bold transition-all ${
              selectedRange === "daily"
                ? "bg-[#705295] text-white shadow-sm"
                : "text-[#A3948C] hover:text-[#705295]"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setSelectedRange("weekly")}
            className={`px-5 py-2 text-[14px] font-medium transition-all ${
              selectedRange === "weekly"
                ? "bg-[#705295] text-white shadow-sm rounded-lg"
                : "text-[#A3948C] hover:text-[#705295]"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setSelectedRange("monthly")}
            className={`px-5 py-2 text-[14px] font-medium transition-all ${
              selectedRange === "monthly"
                ? "bg-[#705295] text-white shadow-sm rounded-lg"
                : "text-[#A3948C] hover:text-[#705295]"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#705295" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#705295" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#EFE9E6" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A3948C", fontSize: 12, fontWeight: 500 }}
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A3948C", fontSize: 12 }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              cursor={{ stroke: "#EFE9E6", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="orange"
              stroke="#F76D00"
              strokeWidth={2}
              fill="transparent"
              dot={{ r: 5, fill: "#F76D00" }}
              activeDot={{
                r: 8,
                fill: "#F76D00",
                stroke: "rgba(247, 109, 0, 0.2)",
                strokeWidth: 10,
              }}
            />
            <Area
              type="monotone"
              dataKey="purple"
              stroke="#705295"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPurple)"
              dot={{ r: 5, fill: "#705295" }}
              activeDot={{
                r: 8,
                fill: "#705295",
                stroke: "rgba(112, 82, 149, 0.2)",
                strokeWidth: 10,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AsynchronousVisitsChart;
