import DataTable from "react-data-table-component";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";

const PrescriptionDetails = ({ data }: { data: any }) => {
  const prescriptionColumns = [
    {
      name: "Name/Strength/Form",
      selector: (row: any) => row.name,
      sortable: true,
    },
    { name: "Instructions", selector: (row: any) => row.instructions },
    { name: "RXStatus", selector: (row: any) => row.status },
    { name: "Qty", selector: (row: any) => row.qty },
    {
      name: "Actions",
      cell: () => (
        <button className="bg-[#EBE5F1] text-[#705295] px-4 py-1 rounded-lg font-bold text-sm">
          Resend
        </button>
      ),
    },
  ];

  const dummyMeds = [
    {
      name: "Zoloft 50 MG Tablet",
      instructions: "Take 1 cap orally once a day",
      status: "Resend",
      qty: "30",
    },
    {
      name: "Zoloft 50 MG Tablet",
      instructions: "Take 1 cap orally once a day",
      status: "Sent",
      qty: "90",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-[#A3948C]">
            Patient Name
          </label>
          <div className="mt-1 p-3 border border-gray-200 rounded-xl bg-white text-[#0A1E25]">
            {data?.patientName || "Jhon Smith"}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-[#A3948C]">
            Provider Name
          </label>
          <div className="mt-1 p-3 border border-gray-200 rounded-xl bg-white text-[#0A1E25]">
            {data?.providerName || "Dr. Alina Star"}
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-[#A3948C]">
          Pharmacy Name
        </label>
        <div className="mt-1 p-3 border border-gray-200 rounded-xl bg-white text-[#0A1E25]">
          {data?.pharmacyName || "Nob Hill Pharmacy"}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-[#A3948C]">
          Pharmacy Address
        </label>
        <div className="mt-1 p-3 border border-gray-200 rounded-xl bg-white text-[#0A1E25]">
          Nob Hill Pharmacy #605, MOORES, SC, 243737, USA
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-[#A3948C]">
            Phone Number
          </label>
          <div className="mt-1 p-3 border border-gray-200 rounded-xl bg-white text-[#0A1E25]">
            (675) 876 9877
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-[#A3948C]">
            Fax Number
          </label>
          <div className="mt-1 p-3 border border-gray-200 rounded-xl bg-white text-[#0A1E25]">
            (786) 768 6788
          </div>
        </div>
      </div>

      <div className="mt-8 border border-gray-100 rounded-2xl overflow-hidden">
        <div className="bg-white p-4 border-b border-gray-100 flex items-center gap-2">
          <span className="font-bold text-[#0A1E25]">Prescriptions</span>
        </div>
        <DataTable
          columns={prescriptionColumns}
          data={dummyMeds}
          customStyles={commonTableStyles}
        />
      </div>
    </div>
  );
};

export default PrescriptionDetails;
