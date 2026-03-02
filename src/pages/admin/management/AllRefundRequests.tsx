import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import Pagination from "../../../components/ui/table/Pagination";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import {
  REFUND_REQUESTS_COLUMNS,
  DUMMY_REFUND_DATA,
} from "../../../constants/commonData";

const AllRefundRequests: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleApprove = (id: any) => console.log("Approved refund:", id);
  const handleDecline = (id: any) => console.log("Declined refund:", id);

  const filteredData = DUMMY_REFUND_DATA.filter((item) =>
    item.patientName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SectionWrapper padding="p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Heading
            title="All Refund Requests"
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
            columns={REFUND_REQUESTS_COLUMNS(handleApprove, handleDecline)}
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
          totalPages={8}
          limit={10}
          onChangePage={() => {}}
          onChangeLimit={() => {}}
        />
      </div>
    </SectionWrapper>
  );
};

export default AllRefundRequests;
