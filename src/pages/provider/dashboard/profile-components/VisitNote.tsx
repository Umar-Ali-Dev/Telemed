import { useForm } from "react-hook-form";
import {
  HiOutlineShieldCheck,
  HiOutlinePencilAlt,
  HiOutlinePlus,
  HiOutlineRefresh,
  HiOutlineDocumentText,
} from "react-icons/hi";
import DataTable from "react-data-table-component";
import InfoCard from "../../../../components/ui/cards/InfoCard";
import Heading from "../../../../components/ui/headings/Heading";
import TextAreaField from "../../../../components/ui/inputs/TextAreaField";
import { commonTableStyles } from "../../../../components/ui/table/TableStyles";
import {
  PRESCRIPTION_COLUMNS,
  PRESCRIPTION_DUMMY_DATA,
} from "../../../../constants/commonData";
import PrescriptionBuilderModal from "../../../../components/ui/modals/PrescriptionBuilderModal";
import UpdatePharmacyModal from "../../../../components/ui/modals/UpdatePharmacyModal";
import ChatInterface from "./ChatInterface";
import { useState } from "react";

const VisitNote = () => {
  const [isRxModalOpen, setRxModalOpen] = useState(false);
  const [isPharmacyModalOpen, setPharmacyModalOpen] = useState(false);
  const [selectedRx, setSelectedRx] = useState<any>(null);

  const { control } = useForm({
    defaultValues: { progressNote: "" },
  });

  const handleEditRow = (row: any) => {
    setSelectedRx(row);
    setPharmacyModalOpen(true);
  };

  const handleAddNewRx = () => {
    setSelectedRx(null);
    setRxModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
      {/* LEFT AREA: Clinical Documentation */}
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
          <div className="flex items-center justify-between bg-white border border-[#D4CFCC] rounded-[15px] p-1.5 pl-4 shadow-sm">
            <span className="text-[#271100] text-[14px] font-medium">
              Nob Hill Pharmacy #605, MOORES, SC, 243737, USA
            </span>
            <button
              onClick={() => setPharmacyModalOpen(true)}
              className="bg-[#705295] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-[#5e447e]"
            >
              <HiOutlineRefresh size={18} /> Update
            </button>
          </div>
        </div>

        {/* Progress Note using TextAreaField Component */}
        <div className="space-y-3">
          <Heading
            title="Progress Note"
            textSize="text-[16px]"
            className="font-bold text-[#1A202C]"
          />
          <TextAreaField
            label=""
            name="progressNote"
            control={control}
            placeholder="Write Progress Note"
            height="h-36"
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
              className="bg-[#705295] text-white px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-[#5e447e]"
            >
              <HiOutlinePlus size={18} /> Add Prescription
            </button>
          </div>
          <DataTable
            columns={PRESCRIPTION_COLUMNS}
            data={PRESCRIPTION_DUMMY_DATA}
            customStyles={commonTableStyles}
            onRowClicked={handleEditRow}
            pointerOnHover
            highlightOnHover
          />
        </div>
      </div>

      {/* RIGHT AREA: Clean Chat Component */}
      <ChatInterface />

      {/* MODALS */}
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
