import { useForm } from "react-hook-form";
import InputField from "../../../../components/ui/inputs/InputField";
import DatePicker from "../../../../components/ui/inputs/DatePicker";
import AttachmentField from "../../../../components/ui/inputs/AttachmentField";
import Button from "../../../../components/ui/button/Button";
import { HiPlus } from "react-icons/hi";
import {
  FORM_LAYOUT_CLASS,
  BUTTON_GROUP_CLASS,
} from "../../../../constants/commonData";

export const LicenseTab = () => {
  const { control, handleSubmit } = useForm();

  return (
    <div className={FORM_LAYOUT_CLASS}>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="space-y-6"
      >
        <InputField
          name="licenseState"
          control={control}
          label="License State"
          type="text"
          placeholder="e.g. California"
        />
        <InputField
          name="licenseNumber"
          control={control}
          label="License Number"
          type="text"
          placeholder="Enter license number"
        />

        <DatePicker
          name="expirationDate"
          control={control}
          label="Expiration Date"
          placeholder="Select expiration date"
        />

        <InputField
          name="supervisingProvider"
          control={control}
          label="Supervising Provider (if applicable)"
          type="text"
          placeholder="Enter supervising provider name"
        />

        <div className="space-y-2">
          <label className="text-[14px] font-medium text-[#000000]">
            Upload Certificate
          </label>
          <AttachmentField
            label=""
            placeholder="Upload certificate PDF or Image"
          />
        </div>

        <div className="flex justify-center py-4">
          <button
            type="button"
            className="flex items-center gap-2 text-[#705295] font-bold"
          >
            <div className="bg-[#705295] text-white rounded-full p-0.5">
              <HiPlus size={16} />
            </div>
            Add More
          </button>
        </div>

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
          />
        </div>
      </form>
    </div>
  );
};
