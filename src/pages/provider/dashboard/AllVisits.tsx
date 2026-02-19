import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import { PAST_VISITS_COLUMNS, DUMMY_DATA } from "../../../constants/commonData";
import Pagination from "../../../components/ui/table/Pagination";
import SelectField from "../../../components/ui/inputs/SelectField";
import SearchInput from "../../../components/ui/inputs/SearchInput";

const AllVisits: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { control } = useForm({
    defaultValues: {
      timeFilter: "current",
    },
  });

  const timeOptions = [
    { label: "Current month", value: "current" },
    { label: "Last month", value: "last" },
    { label: "Last 3 months", value: "3_months" },
  ];

  // Filtering logic based on debounced search query
  const filteredData = DUMMY_DATA.filter((item: any) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SectionWrapper>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Heading
            title="All Visits"
            textSize="text-[24px]"
            className="font-bold text-[#1A202C]"
          />

          <div className="flex items-center gap-3">
            {/* Refined SelectField without external label */}
            <SelectField
              name="timeFilter"
              control={control}
              options={timeOptions}
              className="min-w-[160px]"
            />

            {/* New Debounced SearchInput */}
            <SearchInput
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              placeholder="Patient name"
            />
          </div>
        </div>

        <DataTable
          columns={PAST_VISITS_COLUMNS}
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
          responsive
          highlightOnHover
          pointerOnHover
        />
      </div>
    </SectionWrapper>
  );
};

export default AllVisits;
