import { useState } from "react";
import SectionWrapper from "../../../../components/ui/common/SectionWrapper";
import Heading from "../../../../components/ui/headings/Heading";
import Tabs from "../../../../components/ui/tabs/Tabs";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { PersonalInfo } from "./PersonalInfo";
import { PasswordTab } from "./PasswordTab";
import { SpecialtiesTab } from "./SpecialtiesTab";
import { Education } from "./Education";
import { Experience } from "./Experience";

const MY_ACCOUNT_TABS = [
  "Personal Info",
  "Password",
  "Specialties",
  "Education",
  "Experience",
];

// Removed "export" from here
const MyAccount = () => {
  const [activeTab, setActiveTab] = useState(MY_ACCOUNT_TABS[0]);

  const renderContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return <PersonalInfo />;
      case "Password":
        return <PasswordTab />;
      case "Specialties":
        return <SpecialtiesTab />;
      case "Education":
        return <Education />;
      case "Experience":
        return <Experience />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <SectionWrapper>
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-20 h-20">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150"
            alt="Doctor"
            className="w-full h-full rounded-xl object-cover"
          />
          <button className="absolute -bottom-1 -right-1 bg-white p-1 rounded-md border border-[#D4CFCC] shadow-sm text-[#705295]">
            <HiOutlinePencilAlt size={16} />
          </button>
        </div>
        <Heading
          title="Dr. Olivia Green"
          className="font-bold text-[#3a2014]"
        />
      </div>

      <Tabs
        tabs={MY_ACCOUNT_TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="mt-8">{renderContent()}</div>
    </SectionWrapper>
  );
};

// Add this line at the very bottom
export default MyAccount;
