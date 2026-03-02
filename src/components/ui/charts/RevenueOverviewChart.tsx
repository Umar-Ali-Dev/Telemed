import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 22000, target: 25000 },
  { name: "Feb", revenue: 26000, target: 25000 },
  { name: "Mar", revenue: 24000, target: 25000 },
  { name: "Apr", revenue: 31000, target: 27000 },
  { name: "May", revenue: 27000, target: 27000 },
  { name: "Jun", revenue: 34000, target: 30000 },
];

const RevenueOverviewChart = () => (
  <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
    {/* Header with Title and Legend */}
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-[18px] font-bold text-[#0A1E25]">
          Revenue Overview
        </h3>
        <p className="text-[#A3948C] text-[12px] mt-1 font-medium">
          Monthly revenue vs target for the last 6 months
        </p>
      </div>

      {/* Target Legend */}
      <div className="flex items-center gap-2">
        <div className="w-[18px] border-b-2 border-dashed border-[#A3948C]" />
        <span className="text-[#A3948C] text-[12px] font-medium">Target</span>
      </div>
    </div>

    {/* Chart Area */}
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
        >
          {/* Light Horizontal Grid Lines */}
          <CartesianGrid vertical={false} stroke="#EFE9E6" strokeWidth={1} />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#A3948C", fontSize: 11, fontWeight: 500 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#A3948C", fontSize: 11 }}
            tickFormatter={(value) => `$${value / 1000}k`}
            domain={[0, 40000]}
            ticks={[0, 10000, 20000, 30000, 40000]}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            cursor={{ stroke: "#EFE9E6", strokeWidth: 1 }}
            formatter={(value: any) => [
              `$${value.toLocaleString()}`,
              "Revenue",
            ]}
          />

          {/* Solid Purple Line: Matches Total Visits style */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#705295"
            strokeWidth={3}
            dot={{ r: 5, fill: "#705295" }}
            activeDot={{
              r: 8,
              fill: "#705295",
              stroke: "rgba(112, 82, 149, 0.2)",
              strokeWidth: 10,
            }}
          />

          {/* Dashed Target Line: No dots */}
          <Line
            type="monotone"
            dataKey="target"
            stroke="#A3948C"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default RevenueOverviewChart;
