import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "11 AM", orange: 98, purple: 42 },
  { time: "12 PM", orange: 92, purple: 48 },
  { time: "3 PM", orange: 108, purple: 46 },
  { time: "4 PM", orange: 100, purple: 42 },
  { time: "5 PM", orange: 94, purple: 52 },
  { time: "6 PM", orange: 108, purple: 50 },
  { time: "7 PM", orange: 98, purple: 58 },
  { time: "8 PM", orange: 112, purple: 54 },
  { time: "9 PM", orange: 100, purple: 45 },
  { time: "10 PM", orange: 100, purple: 58 },
];

const TotalVisitsChart = () => (
  <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
    {/* Header Section */}
    <div className="flex justify-between items-start mb-8">
      <div>
        <h2 className="text-[24px] font-bold text-[#0A1E25]">Total Visits</h2>

        {/* Statistics Row */}
        <div className="flex gap-10 mt-6">
          <div className="flex flex-col">
            <span className="text-[#A3948C] text-[14px] font-medium">
              Total Visits
            </span>
            <span className="text-[28px] font-bold text-[#0A1E25]">1002</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#A3948C] text-[14px] font-medium">
              In Queue
            </span>
            <span className="text-[28px] font-bold text-[#0A1E25]">40</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#A3948C] text-[14px] font-medium">
              Completed
            </span>
            <span className="text-[28px] font-bold text-[#0A1E25]">522</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#A3948C] text-[14px] font-medium">
              Canceled
            </span>
            <span className="text-[28px] font-bold text-[#0A1E25]">200</span>
          </div>
        </div>
      </div>

      {/* Range Toggles */}
      <div className="flex items-center p-1 bg-[#F2EFFF] rounded-xl">
        <button className="px-5 py-2 rounded-lg bg-[#705295] text-white text-[14px] font-bold shadow-sm">
          Daily
        </button>
        <button className="px-5 py-2 text-[#A3948C] text-[14px] font-medium hover:text-[#705295]">
          Weekly
        </button>
        <button className="px-5 py-2 text-[#A3948C] text-[14px] font-medium hover:text-[#705295]">
          Monthly
        </button>
      </div>
    </div>

    {/* Chart Area */}
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
            domain={[0, 120]}
            ticks={[0, 40, 80, 100, 120]}
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

export default TotalVisitsChart;
