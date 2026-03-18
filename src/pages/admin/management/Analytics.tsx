import React from "react";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";

// New modular chart imports from the UI folder
import TotalVisitsChart from "../../../components/ui/charts/TotalVisitsChart";
import RevenueOverviewChart from "../../../components/ui/charts/RevenueOverviewChart";
import ResponseTimeChart from "../../../components/ui/charts/ResponseTimeChart";

const Analytics: React.FC = () => {
  return (
    <SectionWrapper padding="p-6" className="space-y-6">
      <TotalVisitsChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueOverviewChart />
        <ResponseTimeChart />
      </div>
    </SectionWrapper>
  );
};

export default Analytics;
