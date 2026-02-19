import DataTable from "react-data-table-component";
import {
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlinePencilAlt,
} from "react-icons/hi";
import Heading from "../../../../components/ui/headings/Heading";
import { InfoCard, PharmacySection } from "./VisitNoteComponents";
import { PRESCRIPTION_COLUMNS } from "../../../../constants/commonData";
import { commonTableStyles } from "../../../../components/ui/table/TableStyles";

const VisitNote = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Left Column: Clinical Info */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex gap-4">
          <InfoCard
            icon={<HiOutlineShieldCheck />}
            title="Condition & Symptoms"
            content="Fever, Fatigue, Chest Pain"
          />
          <InfoCard
            icon={<HiOutlinePencilAlt />}
            title="Medications Needed"
            content="I need the refill of Zoloft."
          />
        </div>

        <PharmacySection address="Nob Hill Pharmacy #605, MOORES, SC, 243737, USA" />

        <div>
          <Heading
            title="Progress Note"
            textSize="text-[16px]"
            className="mb-2 font-bold"
          />
          <textarea
            placeholder="Write Progress Note"
            className="w-full h-32 p-4 rounded-xl border border-[#D4CFCC] focus:ring-1 focus:ring-[#705295] outline-none text-sm"
          />
        </div>

        <div className="border border-[#D4CFCC] rounded-xl overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-white border-b border-gray-100">
            <Heading
              title="Prescriptions"
              textSize="text-[16px]"
              className="font-bold"
            />
            <button className="bg-[#705295] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
              <HiOutlinePlus /> Add Prescription
            </button>
          </div>
          <DataTable
            columns={PRESCRIPTION_COLUMNS}
            data={[]}
            customStyles={commonTableStyles}
          />
        </div>
      </div>

      {/* Right Column: Chat Interface Placeholder */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm h-[600px] flex flex-col p-4">
        {/* Chat logic goes here following image_1d98e6.png layout */}
        <div className="flex items-center gap-3 border-b pb-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img src="https://via.placeholder.com/40" alt="Dr" />
          </div>
          <div>
            <p className="text-sm font-bold">Alina Stars.</p>
            <p className="text-[10px] text-green-500 font-medium">● Online</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          {/* Messages would map here */}
        </div>
        <div className="relative border rounded-xl p-2 flex items-center gap-2">
          <input
            className="flex-1 outline-none text-sm px-2"
            placeholder="Enter Message..."
          />
          <button className="bg-[#705295] text-white p-2 rounded-lg">
            <HiOutlinePlus className="rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitNote;
