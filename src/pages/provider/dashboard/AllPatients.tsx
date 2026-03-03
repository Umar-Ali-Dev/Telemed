import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import Pagination from "../../../components/ui/table/Pagination";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import {
  ALL_PATIENTS_DATA,
  ALL_PATIENTS_COLUMNS,
} from "../../../constants/commonData";

const AllPatients: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = ALL_PATIENTS_DATA.filter((p) =>
    `${p.firstName} ${p.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleRowClick = (row: any) => {
    navigate(`/provider/all-patients/${row.id}`);
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
              title="All Patients"
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
            columns={ALL_PATIENTS_COLUMNS}
            data={filteredPatients}
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
                totalRows={filteredPatients.length}
                currentPage={1}
                totalPages={Math.ceil(filteredPatients.length / 15)}
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

export default AllPatients;
