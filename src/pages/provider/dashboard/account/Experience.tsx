import React from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import InputField from "../../../../components/ui/inputs/InputField";
import DatePicker from "../../../../components/ui/inputs/DatePicker";
import AttachmentField from "../../../../components/ui/inputs/AttachmentField";
import Button from "../../../../components/ui/button/Button";
import {
  BUTTON_GROUP_CLASS,
  FORM_LAYOUT_CLASS,
} from "../../../../constants/commonData";

export const Experience = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Experience Data:", data);
  };

  return (
    <div className={FORM_LAYOUT_CLASS}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Width Field */}
        <InputField
          label="Name of Certification"
          name="certName"
          control={control}
          type="text"
          placeholder="Name of Certification"
        />

        {/* 2-Column Grid for Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePicker
            label="Start Date"
            name="startDate"
            control={control}
            placeholder="DD/MM/YYYY"
          />
          <DatePicker
            label="Expiration Date"
            name="expiryDate"
            control={control}
            placeholder="DD/MM/YYYY"
          />
        </div>

        {/* Upload Field with Paperclip Icon */}
        <div className="space-y-4">
          <AttachmentField
            label="Upload Certificate"
            name="educationAttachment"
            control={control}
            placeholder="Select year when certification was obtained"
          />

          {/* Right-Aligned Add More Button */}
          <div className="flex justify-center md:justify-end">
            <button
              type="button"
              className="flex items-center gap-2 text-[#705295] font-bold text-[14px] hover:opacity-80 transition-opacity"
            >
              <div className="bg-[#705295] text-white rounded-full p-0.5">
                <HiPlus size={16} />
              </div>
              Add More
            </button>
          </div>
        </div>

        {/* Standard Action Footer */}
        <div className={BUTTON_GROUP_CLASS}>
          <Button
            label="Cancel"
            bgColor="bg-transparent"
            textColor="text-[#3a2014]"
            width="w-auto px-6"
          />
          <Button
            label="Update"
            type="submit"
            bgColor="bg-[#705295]"
            width="w-[140px]"
            className="shadow-lg"
          />
        </div>
      </form>
    </div>
  );
};
