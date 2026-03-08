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
  ADMIN_QUEUE_COLUMNS, // Using the unified column array
  ADMIN_DASHBOARD_DATA,
} from "../../constants/commonData";
import { useNavigate } from "react-router-dom";
import AssignProviderModal from "../../components/ui/modals/AssignProviderModal";

const AdminConsultations: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const handleAssignClick = (row: any) => {
    setSelectedRequest(row);
    setIsModalOpen(true);
  };

  const handleViewDetails = (row: any) => {
    navigate(`/admin/consultations/${row.id}`);
  };

  const filteredData = ADMIN_DASHBOARD_DATA.filter((item: any) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SectionWrapper className="m-6">
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

        <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
          <DataTable
            columns={ADMIN_QUEUE_COLUMNS(handleAssignClick, handleViewDetails)}
            data={filteredData}
            customStyles={commonTableStyles}
            responsive
            highlightOnHover
            onRowClicked={handleViewDetails}
            pointerOnHover
          />
        </div>

        <AssignProviderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAssign={(provider: any) => console.log(provider, selectedRequest)}
        />

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
