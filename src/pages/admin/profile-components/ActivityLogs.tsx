import React from "react";

const LOGS = [
  { date: "Jan 22, 2026", action: "Logging in to the platform" },
  { date: "Jan 23, 2026", action: "Send prescription" },
  { date: "Jan 23, 2026", action: "Send prescription" },
  { date: "Jan 23, 2026", action: "Send prescription" },
  { date: "Jan 23, 2026", action: "Send prescription" },
];

const ActivityLogs: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-[18px] font-bold text-[#0A1E25]">Activity Logs</h3>
      <div className="space-y-5">
        {LOGS.map((log, index) => (
          <div key={index}>
            <p className="text-[14px] text-[#1A202C] font-semibold">
              {log.date}
            </p>
            <p className="text-[14px] text-[#A3948C] font-medium">
              {log.action}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogs;
