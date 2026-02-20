import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SectionWrapper from "../../../../components/ui/common/SectionWrapper";
import Heading from "../../../../components/ui/headings/Heading";
import Button from "../../../../components/ui/button/Button";
import Tabs from "../../../../components/ui/tabs/Tabs";

// Shared Profile Components
import PatientDataContent from "../profile-components/PatientDataContent";
import HealthHistory from "../profile-components/HealthHistory";
import MedicationHistory from "../profile-components/MedicationHistory";
import Attachments from "../profile-components/Attachments";
import Allergies from "../profile-components/Allergies";
import VisitNote from "../profile-components/VisitNote";
import ProviderInfo from "../profile-components/ProviderInfo";
import InternalAdminNotes from "../profile-components/InternalAdminNotes"; // New

import {
  PATIENT_PROFILE_TABS,
  DUMMY_PATIENT_DATA,
} from "../../../../constants/commonData";

const PatientProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // State detection based on URL
  const isAdminPath = location.pathname.startsWith("/admin");
  const showAdminDetail = queryParams.get("showAdminDetail") === "true";
  const hideVisitNote = queryParams.get("hideVisitNote") === "true";

  const availableTabs = useMemo(() => {
    // Mode 1: Admin Patient Detail (Alexis John view)
    if (showAdminDetail) {
      return ["Patient Info", "Internal Admin Notes"];
    }

    // Mode 2: Standard Provider or Admin Consultation view
    let tabs = [...PATIENT_PROFILE_TABS];

    if (isAdminPath) {
      tabs.splice(1, 0, "Provider Info");
    }

    if (hideVisitNote) {
      return tabs.filter((tab) => tab !== "Visit Note");
    }

    return tabs;
  }, [isAdminPath, showAdminDetail, hideVisitNote]);

  const [activeTab, setActiveTab] = useState(availableTabs[0]);

  const renderContent = () => {
    switch (activeTab) {
      case "Patient Info":
        return <PatientDataContent data={DUMMY_PATIENT_DATA} />;
      case "Provider Info":
        return <ProviderInfo />;
      case "Internal Admin Notes":
        return <InternalAdminNotes />; //
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
      {/* Dynamic Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={DUMMY_PATIENT_DATA.profileImage}
            alt="Patient"
            className="w-full h-full object-cover"
          />
        </div>
        <Heading
          title={
            showAdminDetail
              ? "Alexis John"
              : `${DUMMY_PATIENT_DATA.firstName} ${DUMMY_PATIENT_DATA.lastName}`
          }
          className="font-bold text-[#3a2014]"
        />
      </div>

      <Tabs
        tabs={availableTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="min-h-[300px] mt-8">{renderContent()}</div>

      {/* Standardized Footer */}
      <div className="flex justify-end gap-4 mt-12">
        <Button
          label="Back"
          width="w-[120px]"
          bgColor="bg-transparent"
          textColor="text-[#A3948C]"
          className="hover:bg-gray-50 !font-bold"
          onClick={() => navigate(-1)}
        />
        <Button
          label="Next"
          width="w-[120px]"
          bgColor="bg-[#705295]"
          onClick={() => {
            const currentIndex = availableTabs.indexOf(activeTab);
            if (currentIndex < availableTabs.length - 1) {
              setActiveTab(availableTabs[currentIndex + 1]);
            }
          }}
        />
      </div>
    </SectionWrapper>
  );
};

export default PatientProfile;
