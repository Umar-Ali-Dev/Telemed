import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import Heading from "../../components/ui/headings/Heading";
import SectionWrapper from "../../components/ui/common/SectionWrapper";
import SearchInput from "../../components/ui/inputs/SearchInput";
import SelectField from "../../components/ui/inputs/SelectField";
import Pagination from "../../components/ui/table/Pagination";
import { commonTableStyles } from "../../components/ui/table/TableStyles";
import {
  ADMIN_CONSULTATION_COLUMNS,
  ADMIN_DASHBOARD_DATA,
} from "../../constants/commonData";
import { useNavigate } from "react-router-dom";

const AdminConsultations: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { control } = useForm({
    defaultValues: {
      requestFilter: "all",
    },
  });

  const requestOptions = [
    { label: "All Requests", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];

  const filteredData = ADMIN_DASHBOARD_DATA.filter((item: any) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleRowClick = (row: any) => {
    // Use showProviderInfo=true to enable the extra tab for Admins
    navigate(`/admin/patient/${row.id}?showProviderInfo=true`);
  };
  return (
    <SectionWrapper padding="p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Heading
            title="Asynchronous Visits"
            textSize="text-[24px]"
            className="font-bold text-[#0A1E25]"
          />

          <div className="flex items-center gap-3">
            <SelectField
              name="requestFilter"
              control={control}
              options={requestOptions}
              className="min-w-[180px]"
            />
            <SearchInput
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              placeholder="Patient name"
              className="w-[280px]"
            />
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-[#D4CFCC] bg-white">
          <DataTable
            columns={ADMIN_CONSULTATION_COLUMNS}
            data={filteredData}
            customStyles={commonTableStyles}
            responsive
            highlightOnHover
            onRowClicked={handleRowClick}
            pointerOnHover
          />
        </div>

        <Pagination
          totalRows={filteredData.length > 0 ? 995 : 0}
          currentPage={1}
          totalPages={8}
          limit={15}
          onChangePage={() => {}}
          onChangeLimit={() => {}}
        />
      </div>
    </SectionWrapper>
  );
};

export default AdminConsultations;
