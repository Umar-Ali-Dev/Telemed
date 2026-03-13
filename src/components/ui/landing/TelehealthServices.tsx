import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import SectionWrapper from "../common/SectionWrapper";
import MainContainer from "../MainContainer";
import { DISEASES_DATA, MEDICATIONS_DATA } from "../../../constants/commonData";

// --- Internal Sub-Components ---

const BulletItem = ({ text }: { text: string }) => {
  const navigate = useNavigate(); // Initialize navigation for individual items

  return (
    <div
      // Click handler to redirect to the request visit route
      onClick={() => navigate("/request-visit")}
      className="flex items-center gap-2 mb-1.5 cursor-pointer group w-fit transition-all active:scale-95"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[#A3948C] group-hover:bg-[#705295] transition-colors" />
      <span className="text-[#666666] text-[14px] font-normal leading-tight group-hover:text-[#705295] group-hover:underline transition-all">
        {text}
      </span>
    </div>
  );
};

const ServiceGroup = ({ title, items }: { title: string; items: string[] }) => (
  <div className="flex flex-col">
    <h3 className="text-[16px] font-bold text-[#0A1E25] mb-3 leading-none">
      {title}
    </h3>
    <div className="flex flex-col">
      {items.map((item, index) => (
        <BulletItem key={index} text={item} />
      ))}
    </div>
  </div>
);

// --- Main Page Component ---

const TelehealthServices = () => {
  const navigate = useNavigate();

  return (
    <MainContainer className="bg-white min-h-screen pb-12">
      <div className="flex items-center gap-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
        >
          <HiArrowLeft size={24} className="text-[#0A1E25]" />
        </button>
        <h1 className="text-[24px] font-bold text-[#0A1E25]">
          Telehealth Services
        </h1>
      </div>

      <div className="space-y-6">
        {/* Section 1: Diseases & Conditions */}
        <SectionWrapper>
          <div>
            <h2 className="text-[20px] font-bold text-[#0A1E25] mb-8 border-b border-[#EBE5F1] pb-4">
              Diseases & Conditions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
              {DISEASES_DATA.map((group, idx) => (
                <ServiceGroup
                  key={idx}
                  title={group.title}
                  items={group.items}
                />
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Section 2: Medications */}
        <SectionWrapper>
          <div>
            <h2 className="text-[20px] font-bold text-[#0A1E25] mb-8 border-b border-[#EBE5F1] pb-4">
              Medications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
              {MEDICATIONS_DATA.map((group, idx) => (
                <ServiceGroup
                  key={idx}
                  title={group.title}
                  items={group.items}
                />
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </MainContainer>
  );
};

export default TelehealthServices;
