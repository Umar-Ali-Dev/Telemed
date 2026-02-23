import React from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom"; // Import navigate hook
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
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import briefcaseMedicalIcon from "../../../assets/icons/briefcaseMedical.svg";
import fileWaveformIcon from "../../../assets/icons/fileWaveform.svg";
import heartPulseIcon from "../../../assets/icons/heartPulse.svg";

const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (row: any) => {
    navigate(`/dashboard/patient/${row.id}`);
  };

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
            icon={<img src={briefcaseMedicalIcon} alt="Briefcase" className="w-[22px] h-[22px]" />}
          />
          <StatCard
            label="In Queue"
            value="12"
            chartType="line"
            chartData={CHART_DATA_LINE}
            icon={<img src={fileWaveformIcon} alt="File Waveform" className="w-[22px] h-[22px]" />}
          />
          <StatCard
            label="Completed"
            value="6"
            chartType="line"
            chartData={CHART_DATA_LINE}
            color="#D1D1D1"
            icon={<img src={heartPulseIcon} alt="Heart Pulse" className="w-[22px] h-[22px]" />}
          />
          <div className="hidden lg:block"></div>
        </div>
      </div>
      <SectionWrapper padding="p-4" className="flex flex-col gap-7">
        <div>
          <Heading
            title="Care Queue Visits"
            textSize="text-[18px]"
            className="font-bold mb-2"
          />
          <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
            <DataTable
              columns={CARE_QUEUE_COLUMNS}
              data={DUMMY_DATA}
              customStyles={commonTableStyles}
              onRowClicked={handleRowClick}
              pointerOnHover
              highlightOnHover
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
            <button
              onClick={() => navigate("/dashboard/all-visits")}
              className="text-gray-400 text-sm font-medium hover:underline"
            >
              Review All
            </button>
          </div>
          <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
            <DataTable
              columns={PAST_VISITS_COLUMNS}
              data={DUMMY_DATA}
              customStyles={commonTableStyles}
              onRowClicked={handleRowClick} // Also redirect for past visits
              pointerOnHover
              highlightOnHover
              responsive
            />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default ProviderDashboard;
