import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Heading from "../../../components/ui/headings/Heading";
import AsynchronousVisitsChart from "../../../components/ui/charts/AsynchronousVisitsChart";
import VisitsStatusCard from "../../../components/ui/charts/VisitsStatusCard";
import ProviderResponseTimeChart from "../../../components/ui/charts/ProviderResponseTimeChart";

const Statistics: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SectionWrapper className="m-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-[#0A1E25] hover:text-[#705295] transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>
        <Heading
          title="Statistics"
          textSize="text-[24px]"
          className="font-bold text-[#1A202C]"
        />
      </div>

      {/* Asynchronous Visits Chart */}
      <AsynchronousVisitsChart />

      {/* Bottom Row: Visits Status and Response Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitsStatusCard />
        <ProviderResponseTimeChart />
      </div>
    </SectionWrapper>
  );
};

export default Statistics;
