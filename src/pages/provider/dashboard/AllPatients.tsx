import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import Pagination from "../../../components/ui/table/Pagination";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import {
  PATIENT_LIST_DATA,
  GET_PATIENT_COLUMNS,
} from "../../../constants/commonData";

const AllPatients: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const PATIENT_COLUMNS = GET_PATIENT_COLUMNS(navigate);

  const filteredPatients = PATIENT_LIST_DATA.filter((p) =>
    `${p.firstName} ${p.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <SectionWrapper className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Heading
          title="All Patients"
          textSize="text-[24px]"
          className="font-bold text-[#1A202C]"
        />

        <SearchInput
          value={searchQuery}
          onChange={(val) => setSearchQuery(val)}
          placeholder="Patient name"
        />
      </div>

      <DataTable
        columns={PATIENT_COLUMNS}
        data={filteredPatients}
        customStyles={commonTableStyles}
        onRowClicked={(row) =>
          navigate(`/provider/patient/${row.id}?hideVisitNote=true`)
        }
        pagination
        paginationComponent={() => (
          <Pagination
            totalRows={filteredPatients.length}
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPatients.length / rowsPerPage)}
            limit={rowsPerPage}
            onChangePage={(page) => setCurrentPage(page)}
            onChangeLimit={(limit) => setRowsPerPage(limit)}
          />
        )}
        responsive
        highlightOnHover
        pointerOnHover
      />
    </SectionWrapper>
  );
};

export default AllPatients;
