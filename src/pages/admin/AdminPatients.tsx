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
  const [patientToggleStates, setPatientToggleStates] = useState<
    Record<number, string>
  >({});

  const handleEdit = (id: any) => {
    navigate(`/admin/patients/edit/${id}`);
  };
  const handleFlag = (id: any) => console.log("Flag patient:", id);
  const handleStatusChange = (id: any, newStatus: string) => {
    setPatientToggleStates((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };
  const handleViewDetails = (id: any) => {
    navigate(`/admin/patient/${id}?showAdminDetail=true`);
  };
  const mappedData = ADMIN_DASHBOARD_DATA.map((item: any) => ({
    ...item,
    toggleStatus: patientToggleStates[item.id] || "Active", // Default to Active
  }));

  const filteredData = mappedData.filter((item: any) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleRowClick = (row: any) => {
    navigate(`/admin/provider-profile/${row.id}`);
  };
  return (
    <SectionWrapper className="m-6">
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

        <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
          <DataTable
            columns={ADMIN_PATIENT_COLUMNS(
              handleEdit,
              handleFlag,
              handleStatusChange,
              handleViewDetails,
            )}
            data={filteredData}
            customStyles={commonTableStyles}
            responsive
            highlightOnHover
            onRowClicked={handleRowClick}
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
