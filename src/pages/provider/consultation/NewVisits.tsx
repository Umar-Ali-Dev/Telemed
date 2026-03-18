import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import Pagination from "../../../components/ui/table/Pagination";
import CancelReasonModal from "../../../components/ui/modals/CancelReasonModal";
import { DUMMY_DATA } from "../../../constants/commonData";
import type { PatientRecord } from "../../../constants/commonData";
import type { TableColumn } from "react-data-table-component";
import DataTable from "react-data-table-component";

const NewVisits: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PatientRecord | null>(null);

  // Initialize data in state to allow dynamic updates
  const [visitsData, setVisitsData] = useState<PatientRecord[]>(() => {
    return Array(50)
      .fill(null)
      .map((_, index) => ({
        ...DUMMY_DATA[index % DUMMY_DATA.length],
        id: index + 1,
        // First two rows start as Pending, others as Reviewing for demo
        status: index < 2 ? "Pending Review" : "Reviewing",
      }));
  });

  // Handler to transition Accept -> Review
  const handleAcceptVisit = (id: number) => {
    // setVisitsData((prev) =>
    //   prev.map((visit) =>
    //     visit.id === id ? { ...visit, status: "Reviewing" } : visit,
    //   ),
    // );
    navigate(`/provider/new-visits/${id}`);
  };

  const handleCancelClick = (row: PatientRecord) => {
    setSelectedRow(row);
    setIsCancelModalOpen(true);
  };

  const handleRowClick = (row: PatientRecord) => {
    navigate(`/provider/new-visits/${row.id}`);
  };

  const filteredData = visitsData.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Define columns internally to access state update functions
  const columns: TableColumn<PatientRecord>[] = useMemo(
    () => [
      { name: "Full Name", selector: (row) => row.name, sortable: true },
      { name: "Email", selector: (row) => row.email, sortable: true },
      { name: "Phone", selector: (row) => row.phone, sortable: true },
      { name: "Updated At", selector: (row) => row.updatedAt, sortable: true },
      {
        name: "State",
        selector: (row) => row.state || "N/A",
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Stop row click
                handleCancelClick(row);
              }}
              className="px-4 py-1.5 font-medium text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Cancel
            </button>

            {row.status !== "Reviewing" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAcceptVisit(row.id);
                }}
                className="bg-[#705295] text-white px-4 py-1.5 rounded-md font-medium text-sm hover:bg-[#5a3f7a] transition-colors"
              >
                Accept
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRowClick(row);
                }}
                className="text-[#705295] bg-[#EBE5F1] border border-[#705295] px-4 py-1.5 rounded-md font-medium text-sm hover:bg-[#dfd7e7] transition-colors"
              >
                Review
              </button>
            )}
          </div>
        ),
      },
    ],
    [navigate, visitsData],
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

        <div className="rounded-xl overflow-hidden bg-[#FFFAF7] border border-gray-100">
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
