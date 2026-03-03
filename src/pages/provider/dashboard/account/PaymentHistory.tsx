import React from "react";
import DataTable from "react-data-table-component";
import Heading from "../../../../components/ui/headings/Heading";
import Pagination from "../../../../components/ui/table/Pagination";
import { commonTableStyles } from "../../../../components/ui/table/TableStyles";

const PAYMENT_HISTORY_COLUMNS = [
  {
    name: "Date & Time",
    selector: (row: any) => row.dateTime,
    sortable: true,
  },
  {
    name: "Paid By",
    selector: (row: any) => row.paidBy,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row: any) => row.amount,
    sortable: true,
  },
  {
    name: "Paid To",
    selector: (row: any) => row.paidTo,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: any) => (
      <span className="text-[#3a2014]">{row.status}</span>
    ),
    sortable: true,
  },
];

const PAYMENT_HISTORY_DATA = Array(6).fill({
  id: 1,
  dateTime: "24/01/2023 at 6:00 PM EST",
  paidBy: "Jhon Smith",
  amount: "$ 200.00",
  paidTo: "Admin",
  status: "Completed",
});

export const PaymentHistory: React.FC = () => {
  return (
    <div className="space-y-6">
      <Heading
        title="Past Visits History"
        textSize="text-[18px]"
        className="font-bold text-[#0A1E25]"
      />

      <div className="rounded-xl overflow-hidden bg-[#FFFAF7]">
        <DataTable
          columns={PAYMENT_HISTORY_COLUMNS}
          data={PAYMENT_HISTORY_DATA}
          customStyles={commonTableStyles}
          responsive
          highlightOnHover
        />
      </div>

      <Pagination
        totalRows={PAYMENT_HISTORY_DATA.length}
        currentPage={1}
        totalPages={8}
        limit={10}
        onChangePage={() => {}}
        onChangeLimit={() => {}}
      />
    </div>
  );
};
