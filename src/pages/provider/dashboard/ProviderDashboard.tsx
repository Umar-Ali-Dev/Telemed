import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import {
  CARE_QUEUE_COLUMNS,
  DUMMY_DATA,
  getVisitColumns,
} from "../../../constants/commonData";
import Heading from "../../../components/ui/headings/Heading";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import NavigationCard from "../../../components/ui/cards/NavigationCard";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import CancelReasonModal from "../../../components/ui/modals/CancelReasonModal";
import type { PatientRecord } from "../../../constants/commonData";

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
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PatientRecord | null>(null);

  const handleRowClick = (row: PatientRecord) => {
    navigate(`/provider/new-visits/${row.id}`);
  };

  const handleCancelClick = (row: PatientRecord) => {
    setSelectedRow(row);
    setIsCancelModalOpen(true);
  };

  const handleCancelSubmit = (reason: string) => {
    console.log("Cancelling visit for:", selectedRow, "Reason:", reason);
    setIsCancelModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="bg-white space-y-10">
      <div className="space-y-6 m-6">
        <Heading
          title="Welcome, Dr. Alina Star."
          textSize="text-[24px]"
          className="font-bold"
        />
      </div>

      <SectionWrapper padding="p-4" className="flex m-6 flex-col gap-7">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          <NavigationCard
            label="New Visits"
            path="/provider/new-visits"
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
            path="/provider/chat"
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
            path="/provider/my-account"
            icon={profileSettingsIcon}
          />
          <NavigationCard
            label="Activity Logs"
            path="/provider/activity-logs"
            icon={activityLogsIcon}
          />
        </div>

        <div>
          <Heading
            title="Care Queue Visits"
            textSize="text-[18px]"
            className="font-bold mb-2"
          />
          <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
            <DataTable
              columns={getVisitColumns(
                handleRowClick,
                handleCancelClick,
                CARE_QUEUE_COLUMNS,
              )}
              data={DUMMY_DATA}
              customStyles={commonTableStyles}
              onRowClicked={handleRowClick}
              responsive
              highlightOnHover
              pointerOnHover
            />
          </div>
        </div>
      </SectionWrapper>

      <CancelReasonModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedRow(null);
        }}
        onSubmit={handleCancelSubmit}
      />
    </div>
  );
};

export default ProviderDashboard;
