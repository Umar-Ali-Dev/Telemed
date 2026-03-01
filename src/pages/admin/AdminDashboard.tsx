import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import {
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineHeart,
  HiOutlineTrendingUp,
} from "react-icons/hi";

// UI Components
import Heading from "../../components/ui/headings/Heading";
import SectionWrapper from "../../components/ui/common/SectionWrapper";
import StatCard from "../../components/ui/cards/StatCard";
import SearchInput from "../../components/ui/inputs/SearchInput";
import DatePicker from "../../components/ui/inputs/DatePicker";
import Pagination from "../../components/ui/table/Pagination";

// Constants & Styles
import {
  ADMIN_QUEUE_COLUMNS,
  CHART_DATA_LINE,
  CHART_DATA_BAR,
  ADMIN_DASHBOARD_DATA,
} from "../../constants/commonData";
import { commonTableStyles } from "../../components/ui/table/TableStyles";
import AssignProviderModal from "../../components/ui/modals/AssignProviderModal";

const AdminDashboard: React.FC = () => {
  const { control } = useForm();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleRowClick = (row: any) => {
    setSelectedRequest(row);
    setIsModalOpen(true); // Open popup on row click
  };

  const handleProviderAssignment = (provider: any) => {
    console.log(
      `Assigning ${provider.name} to patient request`,
      selectedRequest,
    );
    // Add your API call here
  };

  return (
    <div className="bg-white space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Heading
          title="Welcome, Mr. Jhon"
          textSize="text-[24px]"
          className="font-bold text-[#3a2014]"
        />

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <DatePicker
            name="startDate"
            control={control}
            placeholder="01 Dec 2025"
            className="sm:w-[180px]"
          />
          <DatePicker
            name="endDate"
            control={control}
            placeholder="12 Jan 2025"
            className="sm:w-[180px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Requests"
          value="18"
          chartType="bar"
          chartData={CHART_DATA_BAR}
          icon={<HiOutlineBriefcase size={22} />}
        />
        <StatCard
          label="In Queue"
          value="12"
          chartType="line"
          chartData={CHART_DATA_LINE}
          icon={<HiOutlineDocumentText size={22} />}
        />
        <StatCard
          label="Completed"
          value="6"
          chartType="line"
          chartData={CHART_DATA_LINE}
          icon={<HiOutlineHeart size={22} />}
        />
        <StatCard
          label="Total Income"
          value="1,823"
          chartType="line"
          chartData={CHART_DATA_LINE}
          icon={<HiOutlineTrendingUp size={22} />}
        />
      </div>

      <SectionWrapper padding="p-6" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Heading
            title="Queue Requests"
            textSize="text-[18px]"
            className="font-bold"
          />
          <SearchInput
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="Patient name"
            className="w-full sm:w-[300px]"
          />
        </div>

        <div className="rounded-xl overflow-hidden border border-[#D4CFCC]">
          <DataTable
            columns={ADMIN_QUEUE_COLUMNS}
            data={ADMIN_DASHBOARD_DATA}
            customStyles={commonTableStyles}
            onRowClicked={handleRowClick}
            responsive
            highlightOnHover
            pointerOnHover
          />
          <AssignProviderModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAssign={handleProviderAssignment}
          />
        </div>

        <Pagination
          totalRows={995}
          currentPage={1}
          totalPages={8}
          limit={15}
          onChangePage={() => {}}
          onChangeLimit={() => {}}
        />
      </SectionWrapper>
    </div>
  );
};

export default AdminDashboard;
