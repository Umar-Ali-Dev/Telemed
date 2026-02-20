import { useForm } from "react-hook-form";
import InputField from "../../../../components/ui/inputs/InputField";
import Button from "../../../../components/ui/button/Button";
import { HiOutlinePlusCircle } from "react-icons/hi";
import {
  BUTTON_GROUP_CLASS,
  FORM_LAYOUT_CLASS,
} from "../../../../constants/commonData";
export const SpecialtiesTab = () => {
  const { control, handleSubmit } = useForm();
  return (
    <div className={FORM_LAYOUT_CLASS}>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="space-y-6"
      >
        <InputField
          name="specialization"
          control={control}
          label="Field of Specialization"
          type="text"
        />
        <InputField
          name="subSpecialty"
          control={control}
          label="Sub-specialty"
          type="text"
        />
        <button
          type="button"
          className="flex items-center gap-2 text-[#705295] font-medium text-[14px]"
        >
          <HiOutlinePlusCircle size={20} /> Add More
        </button>
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
