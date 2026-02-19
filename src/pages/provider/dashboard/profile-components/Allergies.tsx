import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  ALLERGIES_COLUMNS,
  ALLERGIES_DUMMY_DATA,
} from "../../../../constants/commonData";
import { commonTableStyles } from "../../../../components/ui/table/TableStyles";
import Pagination from "../../../../components/ui/table/Pagination";
import Heading from "../../../../components/ui/headings/Heading";

const Allergies = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <div className="mt-6">
      <Heading
        title="Allergies"
        textSize="text-[20px]"
        className="font-bold text-[#1A202C] mb-6"
      />
      <div className="rounded-xl overflow-hidden ">
        <DataTable
          columns={ALLERGIES_COLUMNS}
          data={ALLERGIES_DUMMY_DATA}
          customStyles={commonTableStyles}
          responsive
          pagination
          paginationComponent={() => (
            <Pagination
              totalRows={ALLERGIES_DUMMY_DATA.length}
              currentPage={page}
              totalPages={Math.ceil(ALLERGIES_DUMMY_DATA.length / limit)}
              limit={limit}
              onChangePage={(p) => setPage(p)}
              onChangeLimit={(l) => setLimit(l)}
            />
          )}
        />
      </div>
    </div>
  );
};

export default Allergies;
