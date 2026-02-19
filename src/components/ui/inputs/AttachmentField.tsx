import React from "react";
import { HiOutlinePaperClip } from "react-icons/hi";

interface AttachmentFieldProps {
  label?: string;
  placeholder?: string;
  className?: string;
  fileName?: string;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AttachmentField: React.FC<AttachmentFieldProps> = ({
  label = "Attachment",
  placeholder = "No file attached",
  className = "",
  fileName,
  onFileChange,
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label className="text-[14px] font-medium text-[#000000]">{label}</label>

      <label className="relative flex items-center w-full h-[48px] bg-white border border-[#D4CFCC] rounded-xl px-4 cursor-pointer hover:border-[#705295] transition-all group shadow-sm">
        <input type="file" className="hidden" onChange={onFileChange} />

        <span
          className={`text-[14px] flex-1 truncate ${fileName ? "text-[#271100]" : "text-[#A3948C]"}`}
        >
          {fileName || placeholder}
        </span>

        <HiOutlinePaperClip
          className="text-[#999999] group-hover:text-[#705295] transition-colors"
          size={22}
        />
      </label>
    </div>
  );
};

export default AttachmentField;
