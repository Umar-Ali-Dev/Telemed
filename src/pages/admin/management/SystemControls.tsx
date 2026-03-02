import React, { useState } from "react";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Heading from "../../../components/ui/headings/Heading";
import Tabs from "../../../components/ui/tabs/Tabs";
import Button from "../../../components/ui/button/Button";
import NotificationsManagement from "./controls-components/NotificationsManagement";
import VisitPricing from "./controls-components/VisitPricing";
import StateManagement from "./controls-components/StateManagement";

const SystemControls: React.FC = () => {
  const tabs = ["Notifications", "Visit Pricing", "State Management"];
  const [activeTab, setActiveTab] = useState("Notifications");

  const renderContent = () => {
    switch (activeTab) {
      case "Notifications":
        return <NotificationsManagement />;
      case "Visit Pricing":
        return <VisitPricing />;
      case "State Management":
        return <StateManagement />;
      default:
        return <NotificationsManagement />;
    }
  };

  return (
    <SectionWrapper className="m-6">
      <div className="mb-6">
        <Heading title="System Controls" className="font-bold text-[#0A1E25]" />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-10 min-h-[500px]">{renderContent()}</div>

      <div className="flex justify-end gap-4 mt-12 border-t border-gray-100 pt-8">
        <Button
          label="Back"
          width="w-[120px]"
          bgColor="bg-transparent"
          textColor="text-[#A3948C]"
          className="hover:bg-gray-50 !font-bold"
          onClick={() => window.history.back()}
        />
        <Button
          label="Save"
          width="w-[120px]"
          bgColor="bg-[#705295]"
          className="rounded-xl font-bold"
          onClick={() => console.log("Settings Saved")}
        />
      </div>
    </SectionWrapper>
  );
};

export default SystemControls;
