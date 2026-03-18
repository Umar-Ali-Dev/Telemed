import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Pagination from "../../../components/ui/table/Pagination";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import {
  ADMIN_QUEUE_COLUMNS,
  ADMIN_DASHBOARD_DATA,
} from "../../../constants/commonData";
import { useNavigate } from "react-router-dom";
import AssignProviderModal from "../../../components/ui/modals/AssignProviderModal";
import SearchInput from "../../../components/ui/inputs/SearchInput";

const ProviderVisits: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  // 1. Initialize data in state
  const [visitsData, setVisitsData] = useState(ADMIN_DASHBOARD_DATA);

  // 2. Simple Filter: Only show specific statuses (No search logic)
  const filteredData = useMemo(() => {
    const allowedStatuses = ["Requested", "Reviewing", "Completed"];

    return visitsData.filter((item: any) =>
      allowedStatuses.includes(item.status),
    );
  }, [visitsData]);

  const handleAssignClick = (row: any) => {
    setSelectedRequest(row);
    setIsModalOpen(true);
  };

  const handleViewDetails = (row: any) => {
    navigate(`/provider/new-visits/${row.id}`);
  };

  const handleOnAssign = (provider: any) => {
    if (selectedRequest) {
      setVisitsData((prev) =>
        prev.map((item: any) =>
          item.id === selectedRequest.id
            ? { ...item, status: "Reviewing", provider: provider.name }
            : item,
        ),
      );
    }
    setIsModalOpen(false);
  };

  return (
    <SectionWrapper className="m-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Provider visits"
            textSize="text-[24px]"
            className="font-bold text-[#0A1E25]"
          />
          <SearchInput
            value={""}
            onChange={(val: any) => ""}
            placeholder="Patient name"
            className="w-[300px]"
          />
        </div>

        <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
          <DataTable
            columns={ADMIN_QUEUE_COLUMNS(handleAssignClick, handleViewDetails)}
            data={filteredData}
            customStyles={commonTableStyles}
            responsive
            highlightOnHover
            onRowClicked={handleViewDetails}
            pointerOnHover
          />
        </div>

        <AssignProviderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAssign={handleOnAssign}
        />

        <Pagination
          totalRows={filteredData.length}
          currentPage={1}
          totalPages={Math.ceil(filteredData.length / 15) || 1}
          limit={15}
          onChangePage={() => {}}
          onChangeLimit={() => {}}
        />
      </div>
    </SectionWrapper>
  );
};

export default ProviderVisits;
