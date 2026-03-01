import React from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import {
  CARE_QUEUE_COLUMNS,
  DUMMY_DATA,
} from "../../../constants/commonData";
import Heading from "../../../components/ui/headings/Heading";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import NavigationCard from "../../../components/ui/cards/NavigationCard";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import newVisitsIcon from "../../../assets/icons/newVisits.svg";
import allVisitsIcon from "../../../assets/icons/allVisits.svg";
import allPatientsIcon from "../../../assets/icons/allPatients.svg";
import flaggedPatientsIcon from "../../../assets/icons/faggedPatients.svg";
import chatMessagesIcon from "../../../assets/icons/chatMessages.svg";
import statisticsIcon from "../../../assets/icons/statistics.svg";
import profileSettingsIcon from "../../../assets/icons/profileSettings.svg";
import activityLogsIcon from "../../../assets/icons/activityLogs.svg";

const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (row: any) => {
    navigate(`/provider/patient/${row.id}`);
  };

  return (
    <div className="bg-white space-y-10">
      <div className="space-y-6">
        <Heading
          title="Welcome, Dr. Alina Star."
          textSize="text-[24px]"
          className="font-bold"
        />
      </div>

      <SectionWrapper padding="p-4" className="flex flex-col gap-7">
        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          <NavigationCard
            label="New Visits"
            path="/provider/dashboard"
            icon={newVisitsIcon}
            badge={5}
          />
          <NavigationCard
            label="All Visits"
            path="/provider/all-visits"
            icon={allVisitsIcon}
          />
          <NavigationCard
            label="All Patients"
            path="/provider/all-patients"
            icon={allPatientsIcon}
          />
          <NavigationCard
            label="Flagged Patients"
            path="/provider/flagged-patients"
            icon={flaggedPatientsIcon}
          />
          <NavigationCard
            label="Chat Messages"
            path="/chat"
            icon={chatMessagesIcon}
            badge={5}
          />
          <NavigationCard
            label="Statistics"
            path="/provider/statistics"
            icon={statisticsIcon}
          />
          <NavigationCard
            label="Profile Settings"
            path="/my-account"
            icon={profileSettingsIcon}
          />
          <NavigationCard
            label="Activity Logs"
            path="/provider/activity-logs"
            icon={activityLogsIcon}
          />
        </div>

        {/* Statistics Cards */}
        <div>
          <Heading
            title="Care Queue Visits"
            textSize="text-[18px]"
            className="font-bold mb-2"
          />
          <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
            <DataTable
              columns={CARE_QUEUE_COLUMNS}
              data={DUMMY_DATA}
              customStyles={commonTableStyles}
              onRowClicked={handleRowClick}
              pointerOnHover
              highlightOnHover
              responsive
            />
          </div>
        </div>

      </SectionWrapper>
    </div>
  );
};

export default ProviderDashboard;
