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

  const expandedData = React.useMemo(() => {
    return Array(50)
      .fill(null)
      .map((_, index) => ({
        ...DUMMY_DATA[index % DUMMY_DATA.length],
        id: index + 1,
        date: `Feb ${((index % 28) + 1).toString().padStart(2, "0")}, 2026`,
      }));
  }, []);

  const filteredData = expandedData.filter((item: any) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SectionWrapper>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Heading
            title="Consultation History"
            textSize="text-[24px]"
            className="font-bold text-[#1A202C]"
          />

          <div className="flex items-center gap-3">
            <SelectField
              name="timeFilter"
              control={control}
              options={timeOptions}
              className="min-w-[160px]"
            />
            <SearchInput
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              placeholder="Search by patient name..."
            />
          </div>
        </div>

        {/* Professional Table Container */}
        <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
          <DataTable
            columns={PAST_VISITS_COLUMNS}
            data={filteredData}
            customStyles={commonTableStyles}
            pagination
            paginationPerPage={10}
            paginationComponentOptions={{
              rowsPerPageText: "Rows per page:",
              rangeSeparatorText: "of",
              noRowsPerPage: false,
              selectAllRowsItem: false,
            }}
            paginationComponent={() => (
              <Pagination
                totalRows={filteredData.length}
                currentPage={1}
                totalPages={Math.ceil(filteredData.length / 10)}
                limit={10}
                onChangePage={() => {}}
                onChangeLimit={() => {}}
              />
            )}
            responsive
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AllVisits;
