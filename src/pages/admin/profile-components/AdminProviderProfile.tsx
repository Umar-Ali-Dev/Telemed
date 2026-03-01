import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Heading from "../../../components/ui/headings/Heading";
import Button from "../../../components/ui/button/Button";
import Tabs from "../../../components/ui/tabs/Tabs";

// Updated Imports from the new admin subfolder
import ProviderPersonal from "./ProviderPersonal";
import ProviderSpeciality from "./ProviderSpeciality";
import ProviderEducation from "./ProviderEducation";
import ProviderExperience from "./ProviderExperience";
import ActivityLogs from "./ActivityLogs";

const AdminProviderProfile = () => {
  const navigate = useNavigate();
  const tabs = [
    "Personal Info",
    "Speciality",
    "Education",
    "Experience",
    "Activity Logs",
  ]; //
  const [activeTab, setActiveTab] = useState("Personal Info");

  const renderContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return <ProviderPersonal />;
      case "Speciality":
        return <ProviderSpeciality />;
      case "Education":
        return <ProviderEducation />;
      case "Experience":
        return <ProviderExperience />;
      case "Activity Logs":
        return <ActivityLogs />;
      default:
        return <ProviderPersonal />;
    }
  };

  return (
    <SectionWrapper>
      {/* Header logic remains identical to support Dr. Alina Star design */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
          <img
            src="https://i.pravatar.cc/150?u=alina"
            alt="Dr. Alina Star"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <Heading
            title="Dr. Alina Star."
            className="font-bold text-[#3a2014]"
          />
          <p className="text-[#A3948C] text-[14px]">
            Assigned State: <span className="font-bold text-[#0A1E25]">LA</span>
          </p>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="min-h-[400px] mt-8">{renderContent()}</div>

      <div className="flex justify-end gap-4 mt-12 border-t pt-8">
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
            const currentIndex = tabs.indexOf(activeTab);
            if (currentIndex < tabs.length - 1) {
              setActiveTab(tabs[currentIndex + 1]);
            }
          }}
        />
      </div>
    </SectionWrapper>
  );
};

export default AdminProviderProfile;
