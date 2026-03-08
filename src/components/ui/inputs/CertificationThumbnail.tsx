import React from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface CertificationThumbnailProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  // Optional if you want to provide a fallback label like "Certificate" or "Resume"
  placeholder?: string;
}

function CertificationThumbnail<T extends FieldValues>({
  name,
  control,
  placeholder = "Attachment",
}: CertificationThumbnailProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        // Casting value to any for the instance check to avoid ts(2358)
        const isFile = value && (value as any) instanceof File;

        // Use the generated preview if it's a new file, or the existing string URL
        const previewUrl = isFile
          ? URL.createObjectURL(value as unknown as File)
          : (value as string);

        // Extract display name from File object or use placeholder
        const displayName = isFile
          ? (value as File).name
          : placeholder || "Attachment";

        return (
          <div className="flex flex-col gap-2 w-24">
            {/* The label acts as the clickable trigger for the system file picker */}
            <label
              htmlFor={String(name)}
              className="w-full h-16 bg-[#F2F2F2] rounded-xl overflow-hidden border border-[#D4CFCC] flex items-center justify-center cursor-pointer hover:border-[#705295] transition-all"
            >
              <input
                type="file"
                id={String(name)}
                className="hidden"
                accept="image/*,.pdf" // Accepting images and PDFs commonly found in certifications
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file); // Update React Hook Form state
                  }
                }}
              />

              {/* Conditional rendering for preview vs placeholder */}
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-[#EBF5FF] w-full h-full flex items-center justify-center">
                  <span className="text-[10px] text-[#007AFF] font-bold uppercase tracking-wider">
                    Image
                  </span>
                </div>
              )}
            </label>

            {/* Dynamic label showing file name or placeholder */}
            <p className="text-[12px] font-medium text-[#1A202C] text-center truncate px-1">
              {displayName}
            </p>
          </div>
        );
      }}
    />
  );
}

export default CertificationThumbnail;
