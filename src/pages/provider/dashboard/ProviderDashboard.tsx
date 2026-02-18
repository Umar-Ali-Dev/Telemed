import React from "react";
import DataTable from "react-data-table-component";
import {
  CARE_QUEUE_COLUMNS,
  PAST_VISITS_COLUMNS,
  DUMMY_DATA,
  CHART_DATA_LINE,
  CHART_DATA_BAR,
} from "../../../constants/commonData";
import Heading from "../../../components/ui/headings/Heading";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import StatCard from "../../../components/ui/cards/StatCard";
import {
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineHeart,
} from "react-icons/hi";

const ProviderDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-8 space-y-10">
      {/* Top Header Section */}
      <header className="space-y-6">
        <Heading
          title="Welcome, Dr. Alina Star."
          textSize="text-[24px]"
          className="font-bold"
        />

        {/* Updated Grid: 4 columns, gap of 6 (1.5rem) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Requests"
            value="18"
            chartType="bar"
            chartData={CHART_DATA_BAR}
            icon={<HiOutlineBriefcase size={22} />}
          />
          <StatCard
            label="In Queue"
            value="12"
            chartType="line"
            chartData={CHART_DATA_LINE}
            icon={<HiOutlineDocumentText size={22} />}
          />
          <StatCard
            label="Completed"
            value="6"
            chartType="line"
            chartData={CHART_DATA_LINE}
            color="#D1D1D1"
            icon={<HiOutlineHeart size={22} />}
          />

          {/* Empty 4th Column */}
          <div className="hidden lg:block"></div>
        </div>
      </header>

      {/* Care Queue Section */}
      <section>
        <Heading
          title="Care Queue Visits"
          textSize="text-[18px]"
          className="font-bold mb-4"
        />
        <div className="rounded-xl overflow-hidden border border-[#D4CFCC]">
          <DataTable
            columns={CARE_QUEUE_COLUMNS}
            data={DUMMY_DATA}
            customStyles={commonTableStyles}
            responsive
          />
        </div>
      </section>

      {/* Past Visits Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <Heading
            title="Past Visits"
            textSize="text-[18px]"
            className="font-bold"
          />
          <button className="text-gray-400 text-sm font-medium hover:underline">
            Review All
          </button>
        </div>
        <div className="rounded-xl overflow-hidden border border-[#D4CFCC]">
          <DataTable
            columns={PAST_VISITS_COLUMNS}
            data={DUMMY_DATA}
            customStyles={commonTableStyles}
            responsive
          />
        </div>
      </section>
    </div>
  );
};

export default ProviderDashboard;
