import React, { useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { LuImagePlus, LuMaximize2 } from "react-icons/lu";
import ErrorsMessage from "./ErrorMessage";
import Modal from "../modals/Modal";

interface ImageUploadFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: string;
  size?: string;
}

function ImageUploadField<T extends FieldValues>({
  name,
  control,
  defaultValue = "",
  size = "w-20 h-20",
}: ImageUploadFieldProps<T>) {
  const [preview, setPreview] = useState<string>(defaultValue);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value, ...field },
          fieldState: { error },
        }) => {
          const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const result = reader.result as string;
                setPreview(result);
                onChange(file);
                // Automatically show full screen on new upload
                setIsPreviewOpen(true);
              };
              reader.readAsDataURL(file);
            }
          };

          return (
            <div className="flex flex-col gap-2">
              <div className={`relative ${size} group`}>
                {/* Main Image Container - Click to maximize */}
                <div
                  onClick={() => preview && setIsPreviewOpen(true)}
                  className="w-full h-full bg-[#F5F5F5] rounded-xl overflow-hidden border border-[#D4CFCC] flex items-center justify-center cursor-pointer relative transition-all active:scale-95"
                >
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      {/* Modern Hover Overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <LuMaximize2 className="text-white" size={24} />
                      </div>
                    </>
                  ) : (
                    <LuImagePlus size={32} className="text-[#A3948C]" />
                  )}
                </div>

                {/* Upload Action Button */}
                <label
                  htmlFor={String(name)}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center text-[#705295] shadow-sm cursor-pointer hover:bg-gray-50 z-10"
                >
                  <LuImagePlus size={14} />
                  <input
                    type="file"
                    id={String(name)}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    {...field}
                  />
                </label>
              </div>

              {error && (
                <div className="mt-1">
                  <ErrorsMessage title={error.message} className="text-left" />
                </div>
              )}
            </div>
          );
        }}
      />

      {/* Full Screen Image Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Image Preview"
        width="max-w-3xl"
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-full aspect-square md:aspect-video rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <img
              src={preview}
              alt="Full Size View"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex justify-end w-full">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="bg-[#705295] text-white px-8 py-2 rounded-xl font-bold hover:bg-[#5a417a] transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ImageUploadField;
