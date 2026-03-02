import React, { useState, useMemo } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";
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
} from "../../../constants/commonData";
import type { PatientRecord } from "../../../constants/commonData";

const NewVisits: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PatientRecord | null>(null);

  // Expand dummy data to 50 rows like AllVisits
  const expandedData = useMemo(() => {
    return Array(50)
      .fill(null)
      .map((_, index) => ({
        ...DUMMY_DATA[index % DUMMY_DATA.length],
        id: index + 1,
      }));
  }, []);

  // Filter data based on search query
  const filteredData = expandedData.filter((item: any) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Use CARE_QUEUE_COLUMNS and only override Action column with Cancel handler
  const columns: TableColumn<PatientRecord>[] = useMemo(() => {
    return CARE_QUEUE_COLUMNS.map((col) => {
      if (col.name === "Action") {
        return {
          ...col,
          cell: (row: PatientRecord, rowIndex?: number) => {
            const isOddRow = (rowIndex || 0) % 2 === 0; // 0-indexed: 0,2,4 = odd rows (1st, 3rd, 5th)
            const showAccept = isOddRow;
            const showReview = !isOddRow;

            return (
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRow(row);
                    setIsCancelModalOpen(true);
                  }}
                  className="px-4 py-1.5 rounded-md font-medium text-sm"
                >
                  Cancel
                </button>
                {showAccept && (
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#705295] text-white px-4 py-1.5 rounded-md font-medium text-sm hover:bg-[#5a3f7a] transition-colors"
                  >
                    Accept
                  </button>
                )}
                {showReview && (
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#705295] bg-[#EBE5F1] border border-[#705295] px-4 py-1.5 rounded-md font-medium text-sm hover:bg-[#EBE5F1] transition-colors"
                  >
                    Review
                  </button>
                )}
              </div>
            );
          },
        };
      }
      return col;
    });
  }, []);

  const handleRowClick = (row: PatientRecord) => {
    navigate(`/provider/patient/${row.id}`);
  };

  const handleCancelSubmit = (reason: string) => {
    // Handle cancel logic here
    console.log("Cancelling visit for:", selectedRow, "Reason:", reason);
  };

  return (
    <SectionWrapper>
      <div className="space-y-6">
        {/* Header with Back Arrow and Title */}
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

        {/* Search Bar */}
        <div className="flex justify-end">
          <SearchInput
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="Patient name"
          />
        </div>

        {/* Professional Table Container */}
        <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={commonTableStyles}
            onRowClicked={handleRowClick}
            pagination
            paginationPerPage={15}
            paginationComponentOptions={{
              rowsPerPageText: "Rows per page:",
              rangeSeparatorText: "of",
              noRowsPerPage: false,
              selectAllRowsItem: false,
            }}
            paginationComponent={() => (
              <Pagination
                totalRows={filteredData.length}
                currentPage={1}
                totalPages={Math.ceil(filteredData.length / 15)}
                limit={15}
                onChangePage={() => {}}
                onChangeLimit={() => {}}
              />
            )}
            responsive
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>

      {/* Cancel Reason Modal */}
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
