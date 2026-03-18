import React from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { LuImagePlus } from "react-icons/lu";

interface CertificationThumbnailProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  readOnly?: boolean; // New optional prop
}

function CertificationThumbnail<T extends FieldValues>({
  name,
  control,
  placeholder = "Attachment",
  readOnly = false, // Default to false
}: CertificationThumbnailProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        const isFile = value && (value as any) instanceof File;

        const previewUrl = isFile
          ? URL.createObjectURL(value as unknown as File)
          : (value as string);

        const displayName = isFile
          ? (value as File).name
          : placeholder || "Attachment";

        return (
          <div
            className={`flex flex-col gap-2 w-24 ${readOnly ? "pointer-events-none" : ""}`}
          >
            <label
              // If readOnly, we remove the htmlFor so it doesn't trigger the input click
              htmlFor={readOnly ? undefined : String(name)}
              className={`w-full h-16 bg-[#F8F9FA] rounded-xl overflow-hidden border border-[#D4CFCC] flex items-center justify-center transition-all group ${
                readOnly
                  ? "cursor-default"
                  : "cursor-pointer hover:border-[#705295] hover:bg-[#F2EFFF]"
              }`}
            >
              <input
                type="file"
                id={String(name)}
                className="hidden"
                accept="image/*,.pdf"
                disabled={readOnly} // Prevent interaction
                onChange={(e) => {
                  if (readOnly) return;
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file);
                  }
                }}
              />

              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-1">
                  <LuImagePlus
                    size={24}
                    className={`text-[#A3948C] ${!readOnly && "group-hover:text-[#705295]"} transition-colors`}
                  />
                </div>
              )}
            </label>

            <p className="text-[11px] font-medium text-[#1A202C] text-center truncate px-1">
              {displayName}
            </p>
          </div>
        );
      }}
    />
  );
}

export default CertificationThumbnail;
