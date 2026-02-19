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
    <div className=" bg-white space-y-10">
      <div className="space-y-6">
        <Heading
          title="Welcome, Dr. Alina Star."
          textSize="text-[24px]"
          className="font-bold"
        />

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

          <div className="hidden lg:block"></div>
        </div>
      </div>

      <div className="flex flex-col gap-7 bg-base p-4 rounded-2xl">
        <div>
          <Heading
            title="Care Queue Visits"
            textSize="text-[18px]"
            className="font-bold mb-2"
          />
          <div className="rounded-xl overflow-hidden border border-[#D4CFCC]">
            <DataTable
              columns={CARE_QUEUE_COLUMNS}
              data={DUMMY_DATA}
              customStyles={commonTableStyles}
              responsive
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
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
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
