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
  FLAGGED_PATIENTS_DATA,
  FLAGGED_PATIENTS_COLUMNS,
} from "../../../constants/commonData";

const FlaggedPatients: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = FLAGGED_PATIENTS_DATA.filter((p) =>
    `${p.firstName} ${p.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleViewDetails = (row: any) => {
    navigate(`/provider/flagged-patients/${row.id}`);
  };

  return (
    <SectionWrapper className="m-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HiOutlineArrowLeft size={24} className="text-[#1A202C]" />
            </button>
            <Heading
              title="Flagged Patients"
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
            columns={FLAGGED_PATIENTS_COLUMNS(handleViewDetails)}
            data={filteredPatients}
            customStyles={commonTableStyles}
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
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FlaggedPatients;
