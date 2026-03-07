import { useForm } from "react-hook-form";
import {
  HiOutlinePlus,
  HiOutlineRefresh,
  HiOutlineDocumentText,
  HiOutlineChartBar,
} from "react-icons/hi";
import shieldPlusIcon from "../../../../assets/icons/shieldPlus.svg";
import pillIcon from "../../../../assets/icons/pill.svg";
import DataTable from "react-data-table-component";
import InfoCard from "../../../../components/ui/cards/InfoCard";
import Heading from "../../../../components/ui/headings/Heading";
import TextAreaField from "../../../../components/ui/inputs/TextAreaField";
import VitalsItem from "../../../../components/ui/cards/VitalsItem";
import { commonTableStyles } from "../../../../components/ui/table/TableStyles";
import {
  PRESCRIPTION_COLUMNS,
  PRESCRIPTION_DUMMY_DATA,
} from "../../../../constants/commonData";
import PrescriptionBuilderModal from "../../../../components/ui/modals/PrescriptionBuilderModal";
import UpdatePharmacyModal from "../../../../components/ui/modals/UpdatePharmacyModal";
import ChatInterface from "./ChatInterface";
import { useState } from "react";

interface VisitNoteProps {
  isVisitDetail?: boolean;
}

const VisitNote = ({ isVisitDetail = false }: VisitNoteProps) => {
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
      <div className="lg:col-span-8 space-y-8">
        <div className="flex gap-4">
          <InfoCard
            icon={<img src={shieldPlusIcon} alt="Shield" className="w-5 h-5" />}
            title="Condition & Symptoms"
            content="Fever, Fatigue, Chest Pain"
          />
          <InfoCard
            icon={<img src={pillIcon} alt="Pill" className="w-5 h-5" />}
            title="Medications Needed"
            content="I need the refill of Zoloft."
          />
        </div>

        {isVisitDetail && (
          <div className="space-y-6">
            <div className="bg-white rounded-[15px] p-4 shadow-sm">
              <p className="text-[#271100] text-[14px]">
                <span className="font-bold text-[#A3948C] mr-2">Details:</span>I
                recently hit my head and passed out for a short time—maybe less
                than half an hour.
              </p>
            </div>

            <div className="bg-white  rounded-[15px] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#A3948C]">
                <HiOutlineChartBar size={20} />
                <span className="font-bold text-[16px]">Vitals</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                <VitalsItem label="BP:" value="80/120" />
                <VitalsItem label="Temp:" value="100°F" />
                <VitalsItem label="Pulse:" value="96" />
                <VitalsItem label="Height:" value="5'6\" />
                <VitalsItem label="Weight:" value="134 lbs" />
                <VitalsItem label="BMI:" value="32.2 lbs" />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Heading
            title="User Selected Pharmacy"
            textSize="text-[16px]"
            className="font-bold text-[#1A202C]"
          />
          <div className="flex items-center justify-between bg-white border border-[#D4CFCC] rounded-[15px] h-[42px] pl-4 shadow-sm">
            <span className="text-[#271100] text-[14px] font-medium truncate pr-4">
              Nob Hill Pharmacy #605, MOORES, SC, 243737, USA
            </span>
            <button
              onClick={() => setPharmacyModalOpen(true)}
              className="bg-[#705295] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-[#5e447e] shrink-0"
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
          <TextAreaField
            label=""
            name="progressNote"
            control={control}
            placeholder="Write Progress Note"
            height="h-36"
          />
        </div>

        <div className="bg-white border border-[#D4CFCC] rounded-[15px] overflow-hidden shadow-sm p-4">
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

      <ChatInterface />

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
