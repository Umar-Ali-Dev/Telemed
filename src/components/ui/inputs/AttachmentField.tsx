import React from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { HiOutlinePaperClip } from "react-icons/hi";
import ErrorsMessage from "./ErrorMessage";

interface AttachmentFieldProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

function AttachmentField<T extends FieldValues>({
  label = "Attachment",
  name,
  control,
  placeholder = "No file attached",
  className = "",
  required = false,
}: AttachmentFieldProps<T>) {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label className="text-[14px] font-medium text-[#000000]">
        {label} {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} is required` } : {}}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="relative w-full">
            <label
              className={`relative flex items-center w-full h-[48px] bg-white border rounded-xl px-4 cursor-pointer transition-all group  ${error ? "border-red-500" : "border-[#D4CFCC] hover:border-[#705295]"}`}
            >
              <input
                type="file"
                className="hidden"
                onChange={(e) => onChange(e.target.files?.[0])}
              />
              <span
                className={`text-[14px] flex-1 truncate ${value ? "text-[#271100]" : "text-[#A3948C]"}`}
              >
                {value?.name || placeholder}
              </span>
              <HiOutlinePaperClip
                className="text-[#999999] group-hover:text-[#705295]"
                size={22}
              />
            </label>
            {error && (
              <div className="mt-1">
                <ErrorsMessage title={error.message} />
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}

export default AttachmentField;
