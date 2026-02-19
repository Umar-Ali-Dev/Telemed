import { useState } from "react";
import {
  HiOutlineShieldCheck,
  HiOutlinePencilAlt,
  HiOutlinePlus,
  HiOutlineRefresh,
  HiOutlinePaperClip,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import DataTable from "react-data-table-component";
import InfoCard from "../../../../components/ui/cards/InfoCard";
import Heading from "../../../../components/ui/headings/Heading";
import { commonTableStyles } from "../../../../components/ui/table/TableStyles";
import { PRESCRIPTION_DUMMY_DATA } from "../../../../constants/commonData";
import UpdatePharmacyModal from "../../../../components/ui/modals/UpdatePharmacyModal";
import PrescriptionBuilderModal from "../../../../components/ui/modals/PrescriptionBuilderModal";

const VisitNote = () => {
  const [isRxModalOpen, setRxModalOpen] = useState(false);
  const [isPharmacyModalOpen, setPharmacyModalOpen] = useState(false);
  const [selectedRx, setSelectedRx] = useState<any>(null);

  const handleEditRx = (row: any) => {
    setSelectedRx(row);
    setRxModalOpen(true);
  };

  const handleAddNewRx = () => {
    setSelectedRx(null);
    setRxModalOpen(true);
  };

  const PRESCRIPTION_COLUMNS = [
    {
      name: "Name/Strength/Form",
      selector: (row: any) => row.name,
      sortable: true,
    },
    { name: "Instructions", selector: (row: any) => row.instructions, grow: 2 },
    { name: "RXStatus", selector: (row: any) => row.status },
    { name: "Qty", selector: (row: any) => row.qty, width: "80px" },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditRx(row);
            }}
            className="text-gray-400 hover:text-blue-500"
          >
            <HiOutlinePencil size={18} />
          </button>
          <button className="text-[#F76D00] hover:text-red-700">
            <HiOutlineTrash size={18} />
          </button>
        </div>
      ),
      width: "100px",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
      <div className="lg:col-span-8 space-y-8">
        <div className="flex gap-4">
          <InfoCard
            icon={<HiOutlineShieldCheck size={20} />}
            title="Condition & Symptoms"
            content="Fever, Fatigue, Chest Pain"
          />
          <InfoCard
            icon={<HiOutlinePencilAlt size={20} />}
            title="Medications Needed"
            content="I need the refill of Zoloft."
          />
        </div>

        <div className="space-y-3">
          <Heading
            title="User Selected Pharmacy"
            textSize="text-[16px]"
            className="font-bold text-[#1A202C]"
          />
          <div className="flex items-center justify-between bg-white border border-[#D4CFCC] rounded-[15px] p-1.5 pl-4">
            <span className="text-[#271100] text-[14px] font-medium">
              Nob Hill Pharmacy #605, MOORES, SC, 243737, USA
            </span>
            <button
              onClick={() => setPharmacyModalOpen(true)}
              className="bg-[#705295] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-[#5e447e] transition-colors"
            >
              <HiOutlineRefresh size={18} /> Update
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <Heading
            title="Progress Note"
            textSize="text-[16px]"
            className="font-bold text-[#1A202C]"
          />
          <textarea
            placeholder="Write Progress Note"
            className="w-full h-36 p-4 rounded-[15px] border border-[#D4CFCC] focus:border-[#705295] outline-none text-[14px] text-[#271100] bg-white resize-none"
          />
        </div>

        <div className="border border-[#D4CFCC] rounded-[15px] overflow-hidden bg-white shadow-sm p-4">
          <div className="flex justify-between items-center pb-4">
            <div className="flex items-center gap-2">
              <HiOutlineDocumentText className="text-[#271100]" size={22} />
              <Heading
                title="Prescriptions"
                textSize="text-[16px]"
                className="font-bold"
              />
            </div>
            <button
              onClick={handleAddNewRx}
              className="bg-[#705295] text-white px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-[#5e447e] transition-colors"
            >
              <HiOutlinePlus size={18} /> Add Prescription
            </button>
          </div>
          <DataTable
            columns={PRESCRIPTION_COLUMNS}
            data={PRESCRIPTION_DUMMY_DATA}
            customStyles={commonTableStyles}
            onRowClicked={handleEditRx}
            pointerOnHover
            highlightOnHover
          />
        </div>
      </div>

      <div className="lg:col-span-4 h-full min-h-[650px] flex flex-col bg-white border border-gray-100 rounded-[25px] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=100"
              className="w-10 h-10 rounded-full object-cover"
              alt="Avatar"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#1A202C]">Alina Stars.</p>
            <p className="text-[11px] text-green-500 font-medium">Online</p>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-6 overflow-y-auto bg-white">
          <p className="text-center text-[#A3948C] text-[12px]">
            Sat May 10, 2025.
          </p>

          <div className="flex flex-col gap-1 items-start">
            <div className="bg-[#F9F9F9] p-2 rounded-[15px] border border-gray-100 shadow-sm max-w-[210px]">
              <div className="rounded-[12px] overflow-hidden mb-2 h-[80px]">
                <img
                  src="https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=300"
                  className="w-full h-full object-cover"
                  alt="Report"
                />
              </div>
              <p className="text-[12px] font-medium text-[#271100] px-1">
                myReport.jpeg
              </p>
            </div>
            <span className="text-[10px] text-gray-400 pl-1">01:30 pm</span>
          </div>
        </div>

        <div className="p-4 bg-white">
          <div className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-[20px] bg-white shadow-sm focus-within:border-[#705295] transition-colors">
            <input
              type="text"
              placeholder="Enter Message..."
              className="flex-1 outline-none text-[14px] text-[#271100] bg-transparent"
            />
            <button className="text-gray-400 hover:text-gray-600">
              <HiOutlinePaperClip size={20} />
            </button>
            <button className="bg-[#705295] text-white p-2.5 rounded-xl hover:bg-[#5e447e] transition-transform active:scale-95">
              <IoSend size={18} />
            </button>
          </div>
        </div>
      </div>

      <PrescriptionBuilderModal
        isOpen={isRxModalOpen}
        onClose={() => setRxModalOpen(false)}
        initialData={selectedRx}
      />

      <UpdatePharmacyModal
        isOpen={isPharmacyModalOpen}
        onClose={() => setPharmacyModalOpen(false)}
      />
    </div>
  );
};

export default VisitNote;
