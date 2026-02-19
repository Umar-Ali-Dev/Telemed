import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  QUEUE_REQUESTS_COLUMNS,
  QUEUE_REQUESTS_DATA,
  CHART_DATA_LINE,
  CHART_DATA_BAR,
} from "../../../constants/commonData";
import Heading from "../../../components/ui/headings/Heading";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import StatCard from "../../../components/ui/cards/StatCard";
import {
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineHeart,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Pagination from "../../../components/ui/table/Pagination";
import SearchInput from "../../../components/ui/inputs/SearchInput";

const AdminDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = QUEUE_REQUESTS_DATA.filter((item) =>
    item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white space-y-10">
      <div className="space-y-6">
        <Heading
          title="Welcome, Mr. Jhon"
          textSize="text-[24px]"
          className="font-bold"
        />

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
            color="#D1D1D1"
            icon={<HiOutlineHeart size={22} />}
          />
          <StatCard
            label="Total income"
            value="1,823"
            chartType="line"
            chartData={CHART_DATA_LINE}
            icon={<HiOutlineTrendingUp size={22} />}
          />
        </div>
      </div>

      <SectionWrapper padding="p-4" className="flex flex-col gap-7">
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <Heading
              title="Queue Requests"
              textSize="text-[18px]"
              className="font-bold"
            />
            <SearchInput
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              placeholder="Patient name"
            />
          </div>

          <DataTable
            columns={QUEUE_REQUESTS_COLUMNS}
            data={filteredData}
            customStyles={commonTableStyles}
            pagination
            paginationComponent={() => (
            <Pagination
            totalRows={filteredData.length > 0 ? 995 : 0}
            currentPage={1}
            totalPages={8}
            limit={15}
            onChangePage={() => {}}
            onChangeLimit={() => {}}
            />
            )}
            pointerOnHover
            highlightOnHover
            responsive
          />

        </div>
      </SectionWrapper>
    </div>
  );
};

export default AdminDashboard;