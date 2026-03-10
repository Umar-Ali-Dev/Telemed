import { useForm } from "react-hook-form";
import InputField from "../../../../components/ui/inputs/InputField";
import DatePicker from "../../../../components/ui/inputs/DatePicker";
import AttachmentField from "../../../../components/ui/inputs/AttachmentField";
import Button from "../../../../components/ui/button/Button";
import { HiPlus } from "react-icons/hi";
import {
  BUTTON_GROUP_CLASS,
  FORM_LAYOUT_CLASS,
} from "../../../../constants/commonData";

export const Education = () => {
  const { control, handleSubmit } = useForm();

  return (
    <div className={FORM_LAYOUT_CLASS}>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="space-y-6"
      >
        {/* Field 1: Degree Name */}
        <InputField
          name="degreeName"
          control={control}
          label="Degree Name"
          type="text"
          placeholder="Enter name of degree"
        />

        {/* Field 2: Name of School */}
        <InputField
          name="schoolName"
          control={control}
          label="Name of School"
          type="text"
          placeholder="Name of School you get degree from"
        />

        {/* Field 3: Graduation Date */}
        <DatePicker
          name="graduationDate"
          control={control}
          label="Graduation Date"
          placeholder="DD/MM/YYYY"
        />

        {/* Field 4: Upload Certificate */}
        <div className="space-y-4">
          <AttachmentField
            label="Upload Certificate"
            name="educationAttachment"
            control={control}
            placeholder="No file attached"
          />

          {/* Add More Button Styled as per Image */}
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

        {/* Action Footer */}
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
