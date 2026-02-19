import React, { useState } from "react";
import Heading from "../../../components/ui/headings/Heading";
import Button from "../../../components/ui/button/Button";
import Tabs from "../../../components/ui/tabs/Tabs";
import PatientDataContent from "./profile-components/PatientDataContent";
import {
  PATIENT_PROFILE_TABS,
  DUMMY_PATIENT_DATA,
} from "../../../constants/commonData";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";

const PatientProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState(PATIENT_PROFILE_TABS[0]);

  return (
    <SectionWrapper>
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={DUMMY_PATIENT_DATA.profileImage}
            alt="Patient"
            className="w-full h-full object-cover"
          />
        </div>
        <Heading
          title={`${DUMMY_PATIENT_DATA.firstName} ${DUMMY_PATIENT_DATA.lastName}`}
          className="font-bold text-[#3a2014]"
        />
      </div>

      {/* Reusable Tabs Component */}
      <Tabs
        tabs={PATIENT_PROFILE_TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Data populated via props for future API integration */}
      <PatientDataContent data={DUMMY_PATIENT_DATA} />

      {/* Navigation Actions using the renamed Button component */}
      <div className="flex justify-end gap-4 mt-12">
        <Button
          label="Back"
          width="w-[120px]"
          bgColor="bg-transparent"
          textColor="text-gray-400"
          className="hover:bg-gray-50 !font-medium"
        />
        <Button
          label="Next"
          width="w-[120px]"
          bgColor="bg-[#705295]" // Standard theme color from your AuthButton
        />
      </div>
    </SectionWrapper>
  );
};

export default PatientProfile;
