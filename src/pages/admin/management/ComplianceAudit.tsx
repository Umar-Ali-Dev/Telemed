import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import Pagination from "../../../components/ui/table/Pagination";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import {
  COMPLIANCE_AUDIT_COLUMNS,
  DUMMY_AUDIT_LOGS,
} from "../../../constants/commonData";

const ComplianceAudit: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = DUMMY_AUDIT_LOGS.filter((item) =>
    item.action.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SectionWrapper className="m-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Heading
            title="Activity Logs"
            textSize="text-[24px]"
            className="font-bold text-[#0A1E25]"
          />
          <SearchInput
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="Search action..."
            className="w-[300px]"
          />
        </div>

        <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
          <DataTable
            columns={COMPLIANCE_AUDIT_COLUMNS}
            data={filteredData}
            customStyles={commonTableStyles}
            responsive
            highlightOnHover
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

export default ComplianceAudit;
