import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Heading from "../../components/ui/headings/Heading";
import SectionWrapper from "../../components/ui/common/SectionWrapper";
import SearchInput from "../../components/ui/inputs/SearchInput";
import Pagination from "../../components/ui/table/Pagination";
import { commonTableStyles } from "../../components/ui/table/TableStyles";
import {
  ADMIN_PATIENT_COLUMNS,
  ADMIN_DASHBOARD_DATA,
} from "../../constants/commonData";
import { useNavigate } from "react-router-dom";

const AdminPatients: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleEdit = (id: any) => {
    navigate(`/admin/patients/edit/${id}`);
  };
  const handleFlag = (id: any) => console.log("Flag patient:", id);

  const filteredData = ADMIN_DASHBOARD_DATA.filter((item: any) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SectionWrapper padding="p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Heading
            title="All Patients"
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

        <div className="rounded-xl overflow-hidden border border-[#D4CFCC] bg-white">
          <DataTable
            columns={ADMIN_PATIENT_COLUMNS(handleEdit, handleFlag)}
            data={filteredData}
            customStyles={commonTableStyles}
            responsive
            highlightOnHover
            pointerOnHover
          />
        </div>

        <Pagination
          totalRows={filteredData.length}
          currentPage={1}
          totalPages={5}
          limit={10}
          onChangePage={() => {}}
          onChangeLimit={() => {}}
        />
      </div>
    </SectionWrapper>
  );
};

export default AdminPatients;
