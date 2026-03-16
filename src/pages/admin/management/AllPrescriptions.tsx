import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom"; // Import for navigation
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import Pagination from "../../../components/ui/table/Pagination";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import {
  ALL_PRESCRIPTIONS_COLUMNS,
  DUMMY_PRESCRIPTIONS,
} from "../../../constants/commonData";

const AllPrescriptions: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [searchQuery, setSearchQuery] = useState("");

  // Update handler to navigate instead of opening modal
  const handleViewDetails = (id: any) => {
    navigate(`/admin/management/prescriptions/${id}`);
  };

  const filteredData = DUMMY_PRESCRIPTIONS.filter((item) =>
    item.patientName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SectionWrapper className="m-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Heading
            title="All Prescriptions"
            textSize="text-[24px]"
            className="font-bold text-[#0A1E25]"
          />
          <SearchInput
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="Patient name"
            className="w-[300px]"
          />
        </div>

        <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
          <DataTable
            columns={ALL_PRESCRIPTIONS_COLUMNS(handleViewDetails)}
            data={filteredData}
            customStyles={commonTableStyles}
            onRowClicked={(row) => handleViewDetails(row.id)}
            responsive
            highlightOnHover
            pointerOnHover
          />
        </div>

        <Pagination
          totalRows={filteredData.length}
          currentPage={1}
          totalPages={Math.ceil(filteredData.length / 10)}
          limit={10}
          onChangePage={() => {}}
          onChangeLimit={() => {}}
        />
      </div>
    </SectionWrapper>
  );
};

export default AllPrescriptions;
