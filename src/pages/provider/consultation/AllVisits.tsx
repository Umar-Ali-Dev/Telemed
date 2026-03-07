import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import Pagination from "../../../components/ui/table/Pagination";
import CancelReasonModal from "../../../components/ui/modals/CancelReasonModal";
import {
  PAST_VISITS_COLUMNS,
  ALL_VISITS_DATA,
  getVisitColumns,
} from "../../../constants/commonData";
import type { PatientRecord } from "../../../constants/commonData";

const AllVisits: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PatientRecord | null>(null);

  const filteredData = ALL_VISITS_DATA.filter((item: any) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRowClick = (row: PatientRecord) => {
    navigate(`/provider/all-visits/${row.id}`);
  };

  const handleCancelClick = (row: PatientRecord) => {
    setSelectedRow(row);
    setIsCancelModalOpen(true);
  };

  const columns = useMemo(
    () =>
      getVisitColumns(handleRowClick, handleCancelClick, PAST_VISITS_COLUMNS),
    [handleRowClick],
  );

  const handleCancelSubmit = (reason: string) => {
    console.log("Cancelling visit for:", selectedRow, "Reason:", reason);
    setIsCancelModalOpen(false);
  };

  return (
    <SectionWrapper className="m-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/provider/dashboard")}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <HiOutlineArrowLeft size={24} className="text-[#271100]" />
            </button>
            <Heading
              title="All Visits"
              textSize="text-[24px]"
              className="font-bold text-[#1A202C]"
            />
          </div>

          <SearchInput
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="Patient name"
          />
        </div>

        <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={commonTableStyles}
            onRowClicked={handleRowClick}
            responsive
            highlightOnHover
            pointerOnHover
          />
          <Pagination
            totalRows={filteredData.length}
            currentPage={1}
            totalPages={Math.ceil(filteredData.length / 15)}
            limit={15}
            onChangePage={() => {}}
            onChangeLimit={() => {}}
          />
        </div>
      </div>

      <CancelReasonModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedRow(null);
        }}
        onSubmit={handleCancelSubmit}
      />
    </SectionWrapper>
  );
};

export default AllVisits;
