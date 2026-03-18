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
  ALL_VISITS_DATA,
  getVisitColumns,
  CARE_QUEUE_COLUMNS,
} from "../../../constants/commonData";
import type { PatientRecord } from "../../../constants/commonData";

const AllVisits: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PatientRecord | null>(null);

  // 1. Initialize data in state (matching NewVisits pattern)
  const [visitsData, setVisitsData] =
    useState<PatientRecord[]>(ALL_VISITS_DATA);

  // 2. Search filtering logic
  const filteredData = useMemo(() => {
    return visitsData.filter((item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, visitsData]);

  // 3. Navigation handler
  const handleRowClick = (row: PatientRecord) => {
    navigate(`/provider/all-visits/${row.id}`);
  };

  // 4. Action Handlers (Cancel / Accept redirect)
  const handleCancelClick = (row: PatientRecord) => {
    setSelectedRow(row);
    setIsCancelModalOpen(true);
  };

  const handleAcceptVisit = (id: number) => {
    navigate(`/provider/all-visits/${id}`);
  };

  const handleCancelSubmit = (reason: string) => {
    if (selectedRow) {
      setVisitsData((prev) => prev.filter((v) => v.id !== selectedRow.id));
      console.log(`Cancelled visit ${selectedRow.id} for reason: ${reason}`);
    }
    setIsCancelModalOpen(false);
    setSelectedRow(null);
  };

  // 5. Generate columns using the shared generator (same as NewVisits)
  const columns = useMemo(
    () =>
      getVisitColumns(
        handleRowClick,
        handleCancelClick,
        CARE_QUEUE_COLUMNS,
        handleAcceptVisit,
      ),
    [navigate],
  );

  return (
    <SectionWrapper className="m-6">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
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
            placeholder="Search patient name..."
            className="w-full md:w-[300px]"
          />
        </div>

        {/* Table Section */}
        <div className="rounded-xl overflow-hidden bg-[#FFFAF7] border border-gray-100">
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={commonTableStyles}
            onRowClicked={handleRowClick}
            responsive
            highlightOnHover
            pointerOnHover
            noDataComponent={
              <div className="p-10 text-gray-500">No records found.</div>
            }
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
