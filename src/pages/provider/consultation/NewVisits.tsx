import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import Pagination from "../../../components/ui/table/Pagination";
import {
  CARE_QUEUE_COLUMNS,
  DUMMY_DATA,
} from "../../../constants/commonData";
import type { PatientRecord } from "../../../constants/commonData";

const NewVisits: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleRowClick = (row: PatientRecord) => {
    navigate(`/provider/patient/${row.id}`);
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
            columns={CARE_QUEUE_COLUMNS}
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

export default NewVisits;
