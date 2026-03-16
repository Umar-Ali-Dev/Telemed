import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PersonalInfo } from "./PersonalInfo";
import { PasswordTab } from "./PasswordTab";
import { SpecialtiesTab } from "./SpecialtiesTab";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { LicenseTab } from "./LicenseTab";
import { AgreementTab } from "./AgreementTab";
import { PaymentHistory } from "./PaymentHistory";
import { useForm } from "react-hook-form";
import SectionWrapper from "../../../../components/ui/common/SectionWrapper";
import ImageUploadField from "../../../../components/ui/inputs/ImageUploadField";
import Heading from "../../../../components/ui/headings/Heading";
import Button from "../../../../components/ui/button/Button"; // Import Button component

const MyAccount: React.FC = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  const [activeTab, setActiveTab] = useState("Personal Info");
  const { control } = useForm();

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

  // Logic to detect the last tab
  const isLastTab = activeTab === tabs[tabs.length - 1];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return <PersonalInfo />;
      case "Password":
        return <PasswordTab />;
      case "Payment History":
        return <PaymentHistory />;
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

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
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
            title={isAdmin ? "Admin Profile" : "Dr. Olivia Green"}
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
                    : "text-[#666666] hover:text-[#705295]"
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

        {/* Action Footer */}
        <div className="flex justify-end gap-4 mt-12 border-t border-gray-100 pt-8">
          {activeTab !== tabs[0] && (
            <Button
              label="Back"
              width="w-[120px]"
              bgColor="bg-transparent"
              textColor="text-[#A3948C]"
              className="hover:bg-gray-50 !font-bold"
              onClick={handleBack}
            />
          )}

          {!isLastTab && (
            <Button
              label="Next"
              width="w-[120px]"
              bgColor="bg-[#705295]"
              onClick={handleNext}
            />
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default MyAccount;
