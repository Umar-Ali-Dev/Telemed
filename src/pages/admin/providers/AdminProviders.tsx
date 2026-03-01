import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import Pagination from "../../../components/ui/table/Pagination";
import Button from "../../../components/ui/button/Button";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import {
  ADMIN_PROVIDER_COLUMNS,
  ADMIN_DASHBOARD_DATA,
} from "../../../constants/commonData";

const AdminProviders: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Handlers passed to the column definition
  const handleEdit = (id: any) => navigate(`/admin/providers/edit/${id}`);
  const handleViewProfile = (id: any) =>
    navigate(`/admin/provider-profile/${id}`);

  const filteredData = ADMIN_DASHBOARD_DATA.filter((item: any) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SectionWrapper padding="p-6">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <Heading
            title="All Providers"
            textSize="text-[24px]"
            className="font-bold text-[#0A1E25]"
          />
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name"
              className="w-full sm:w-[300px]"
            />
            <Button
              label="Add New Provider"
              onClick={() => navigate("/admin/providers/add")}
              bgColor="bg-[#F2EFFF]"
              textColor="text-[#705295]"
              width="w-full sm:w-auto"
              className="px-6 font-bold border-none"
            />
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-[#D4CFCC] bg-white">
          <DataTable
            columns={ADMIN_PROVIDER_COLUMNS(handleEdit, handleViewProfile)}
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

export default AdminProviders;
