import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  MEDICATION_COLUMNS,
  MEDICATION_DUMMY_DATA,
} from "../../../../constants/commonData";
import { commonTableStyles } from "../../../../components/ui/table/TableStyles";
import Pagination from "../../../../components/ui/table/Pagination";

const MedicationHistory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const totalRows = MEDICATION_DUMMY_DATA.length;
  const totalPages = Math.ceil(totalRows / limit);

  return (
    <div className="mt-6">
      <h3 className="text-[20px] font-bold text-[#1A202C] mb-6">
        Currently Taking Medications
      </h3>

      <div className="rounded-xl overflow-hidden ">
        <DataTable
          columns={MEDICATION_COLUMNS}
          data={MEDICATION_DUMMY_DATA.slice((page - 1) * limit, page * limit)}
          customStyles={commonTableStyles}
          responsive
          pagination
          paginationComponent={() => (
            <Pagination
              totalRows={totalRows}
              currentPage={page}
              totalPages={totalPages}
              limit={limit}
              onChangePage={(p: number) => setPage(p)}
              onChangeLimit={(l: number) => {
                setLimit(l);
                setPage(1);
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default MedicationHistory;
