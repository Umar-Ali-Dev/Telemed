import { useState } from "react";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Heading from "../../../components/ui/headings/Heading";
import Button from "../../../components/ui/button/Button";
import Tabs from "../../../components/ui/tabs/Tabs";
import PatientDataContent from "./profile-components/PatientDataContent";
import HealthHistory from "./profile-components/HealthHistory";
import {
  PATIENT_PROFILE_TABS,
  DUMMY_PATIENT_DATA,
} from "../../../constants/commonData";
import MedicationHistory from "./profile-components/MedicationHistory";
import Attachments from "./profile-components/Attachments";
import Allergies from "./profile-components/Allergies";
import VisitNote from "./profile-components/VisitNote";

const PatientProfile = () => {
  const [activeTab, setActiveTab] = useState(PATIENT_PROFILE_TABS[0]);

  const renderContent = () => {
    switch (activeTab) {
      case "Patient Info":
        return <PatientDataContent data={DUMMY_PATIENT_DATA} />;
      case "Health History":
        return <HealthHistory />;
      case "Medication History":
        return <MedicationHistory />;
      case "Allergies":
        return <Allergies />;
      case "Attachment":
        return <Attachments />;
      case "Visit Note":
        return <VisitNote />;
      default:
        return <PatientDataContent data={DUMMY_PATIENT_DATA} />;
    }
  };

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

      {/* Tabs Component */}
      <Tabs
        tabs={PATIENT_PROFILE_TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Dynamic Content based on active tab */}
      <div className="min-h-[300px]">{renderContent()}</div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 mt-12">
        <Button
          label="Back"
          width="w-[120px]"
          bgColor="bg-transparent"
          textColor="text-gray-400"
          className="hover:bg-gray-50 !font-medium"
        />
        <Button label="Next" width="w-[120px]" bgColor="bg-[#705295]" />
      </div>
    </SectionWrapper>
  );
};

export default PatientProfile;
