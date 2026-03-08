import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import Pagination from "../../../components/ui/table/Pagination";
import CancelReasonModal from "../../../components/ui/modals/CancelReasonModal";
import {
  CARE_QUEUE_COLUMNS,
  DUMMY_DATA,
  getVisitColumns,
} from "../../../constants/commonData";
import type { PatientRecord } from "../../../constants/commonData";

const NewVisits: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PatientRecord | null>(null);

  const expandedData = useMemo(() => {
    return Array(50)
      .fill(null)
      .map((_, index) => ({
        ...DUMMY_DATA[index % DUMMY_DATA.length],
        id: index + 1,
      }));
  }, []);

  const filteredData = expandedData.filter((item: any) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRowClick = (row: PatientRecord) => {
    navigate(`/provider/new-visits/${row.id}`);
  };

  const handleCancelClick = (row: PatientRecord) => {
    setSelectedRow(row);
    setIsCancelModalOpen(true);
  };

  const columns = useMemo(
    () =>
      getVisitColumns(handleRowClick, handleCancelClick, CARE_QUEUE_COLUMNS),
    [handleRowClick],
  );

  const handleCancelSubmit = (reason: string) => {
    console.log("Cancelling visit for:", selectedRow, "Reason:", reason);
    setIsCancelModalOpen(false);
  };

  return (
    <SectionWrapper className="m-6">
      <div className="space-y-6">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/provider/dashboard")}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <HiOutlineArrowLeft size={24} className="text-[#271100]" />
            </button>
            <Heading
              title="New Visits"
              textSize="text-[24px]"
              className="font-bold text-[#1A202C]"
            />
          </div>

          <div className="flex justify-end">
            <SearchInput
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              placeholder="Patient name"
            />
          </div>
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

export default NewVisits;
