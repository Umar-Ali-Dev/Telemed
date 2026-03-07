import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Use location to detect role
import { PersonalInfo } from "./PersonalInfo";
import { PasswordTab } from "./PasswordTab";
import { SpecialtiesTab } from "./SpecialtiesTab";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { LicenseTab } from "./LicenseTab";
import { AgreementTab } from "./AgreementTab";
import { PaymentHistory } from "./PaymentHistory"; // Added for Admin
import { useForm } from "react-hook-form";
import SectionWrapper from "../../../../components/ui/common/SectionWrapper";
import ImageUploadField from "../../../../components/ui/inputs/ImageUploadField";
import Heading from "../../../../components/ui/headings/Heading";

const MyAccount: React.FC = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin"); // Role detection

  const [activeTab, setActiveTab] = useState("Personal Info");
  const { control } = useForm();

  // Define tabs based on role
  const tabs = isAdmin
    ? ["Personal Info", "Password", "Payment History"]
    : [
        "Personal Info",
        "Password",
        "Specialties",
        "Education",
        "Experience",
        "License",
        "Agreement",
      ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return <PersonalInfo />;
      case "Password":
        return <PasswordTab />;
      case "Payment History":
        return <PaymentHistory />; // Specific for Admin
      case "Specialties":
        return <SpecialtiesTab />;
      case "Education":
        return <Education />;
      case "Experience":
        return <Experience />;
      case "License":
        return <LicenseTab />;
      case "Agreement":
        return <AgreementTab />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <SectionWrapper className="m-6">
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <ImageUploadField
            name="profileImage"
            control={control}
            defaultValue="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&h=150&auto=format&fit=crop"
          />
          <Heading
            title={isAdmin ? "Admin Profile" : "Dr. Olivia Green"} // Conditional title
            textSize="text-[24px]"
            className="font-bold text-[#1A202C]"
          />
        </div>

        <div className="border-b border-[#D4CFCC]">
          <div className="flex flex-wrap gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[14px] font-bold transition-all relative ${
                  activeTab === tab
                    ? "text-[#705295]"
                    : "text-[#A3948C] hover:text-[#705295]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#705295] rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">{renderTabContent()}</div>
      </div>
    </SectionWrapper>
  );
};

export default MyAccount;
