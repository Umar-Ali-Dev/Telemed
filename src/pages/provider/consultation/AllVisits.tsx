import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { type TableColumn } from "react-data-table-component";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import { PAST_VISITS_COLUMNS, ALL_VISITS_DATA } from "../../../constants/commonData";
import Pagination from "../../../components/ui/table/Pagination";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import fileTextIcon from "../../../assets/icons/fileText.svg";
import type { PatientRecord } from "../../../constants/commonData";

const AllVisits: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = ALL_VISITS_DATA.filter((item: any) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Create columns with State/Status column and Action column
  const columns: TableColumn<PatientRecord>[] = useMemo(() => {
    return PAST_VISITS_COLUMNS.map((col) => {
      if (col.name === "Status") {
        return {
          ...col,
          name: "State/Status",
          cell: (row: PatientRecord) => {
            // Show state if available, otherwise show status
            const displayValue = row.state || row.status;
            const isState = !!row.state;
            
            const colors: any = {
              "Prescription Sent": "text-[#3B82F6]",
              Completed: "text-[#22C55E]",
              "Resend Prescription": "text-[#92400E]",
              Canceled: "text-[#EF4444]",
            };
            
            const colorClass = isState 
              ? "text-gray-600" 
              : (colors[row.status] || "text-gray-600");
            
            return (
              <span className={`${colorClass} font-medium`}>
                {displayValue}
              </span>
            );
          },
        };
      }
      if (col.name === "Action") {
        return {
          ...col,
          cell: (row: PatientRecord, rowIndex?: number) => {
            // If row has state "AL", show buttons; otherwise show document icon
            if (row.state === "AL") {
              const isOddRow = (rowIndex || 0) % 2 === 0; // 0-indexed: 0,2,4 = odd rows (1st, 3rd, 5th)
              const showAccept = isOddRow;
              const showReview = !isOddRow;

              return (
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="px-4 py-1.5 rounded-md font-medium text-sm"
                  >
                    Cancel
                  </button>
                  {showAccept && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="bg-[#705295] text-white px-4 py-1.5 rounded-md font-medium text-sm hover:bg-[#5a3f7a] transition-colors"
                    >
                      Accept
                    </button>
                  )}
                  {showReview && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="text-[#705295] bg-[#EBE5F1] border border-[#705295] px-4 py-1.5 rounded-md font-medium text-sm hover:bg-[#EBE5F1] transition-colors"
                    >
                      Review
                    </button>
                  )}
                </div>
              );
            }
            // Show document icon for status rows
            return (
              <img
                src={fileTextIcon}
                alt="Document"
                className="cursor-pointer w-6 h-6"
              />
            );
          },
        };
      }
      return col;
    });
  }, []);

  const handleRowClick = (row: PatientRecord) => {
    navigate(`/provider/all-visits/${row.id}`);
  };

  return (
    <SectionWrapper className="m-6">
      <div className="space-y-6">
        {/* Header with Back Arrow and Title */}
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

          {/* Search Bar */}
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
    </SectionWrapper>
  );
};

export default AllVisits;
