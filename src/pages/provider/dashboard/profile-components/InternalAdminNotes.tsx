import React, { useState } from "react";
import { LuPencil, LuSave } from "react-icons/lu";

const InternalAdminNotes: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(
    "Progress notes are the written notes that you'll add to your patient's chart when any changes occur. If the patient's condition starts to decline or there are any changes in the patient's care, then you will want to put a note in the chart so that it is documented.",
  );

  const handleSave = () => {
    // Logic to save the note to your backend would go here
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-[18px] font-bold text-[#0A1E25]">
          Internal Admin Note
        </h3>

        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={`flex items-center gap-2 font-medium text-[14px] transition-colors ${
            isEditing
              ? "text-[#705295] font-bold"
              : "text-[#A3948C] hover:text-[#705295]"
          }`}
        >
          {isEditing ? (
            <>
              <LuSave size={16} /> Save Note
            </>
          ) : (
            <>
              <LuPencil size={16} /> Edit Note
            </>
          )}
        </button>
      </div>

      <div
        className={`
        p-6 border border-[#D4CFCC] rounded-[20px] bg-white min-h-[150px] transition-all
        ${isEditing ? "ring-1 ring-[#705295] border-[#705295]" : ""}
      `}
      >
        {isEditing ? (
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-32 p-0 text-[13px] text-gray-600 leading-relaxed outline-none resize-none bg-transparent"
            autoFocus
            placeholder="Enter internal admin note..."
          />
        ) : (
          <p className="text-[13px] text-gray-500 leading-relaxed max-w-2xl">
            {note}
          </p>
        )}
      </div>
    </div>
  );
};

export default InternalAdminNotes;
