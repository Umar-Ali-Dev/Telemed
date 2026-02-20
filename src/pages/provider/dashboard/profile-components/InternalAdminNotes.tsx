import React from "react";
import { LuPencil } from "react-icons/lu";

const InternalAdminNotes: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-[18px] font-bold text-[#0A1E25]">
          Internal Admin Note
        </h3>
        <button className="flex items-center gap-2 text-[#A3948C] hover:text-[#705295] font-medium text-[14px]">
          <LuPencil size={16} /> Edit Note
        </button>
      </div>

      <div className="p-6 border border-[#D4CFCC] rounded-[20px] bg-white min-h-[150px]">
        <p className="text-[13px] text-gray-500 leading-relaxed max-w-2xl">
          Progress notes are the written notes that you'll add to your patient's
          chart when any changes occur. If the patient's condition starts to
          decline or there are any changes in the patient's care, then you will
          want to put a note in the chart so that it is documented.
        </p>
      </div>
    </div>
  );
};

export default InternalAdminNotes;
