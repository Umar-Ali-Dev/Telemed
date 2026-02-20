import { useForm } from "react-hook-form";
import InputField from "../../../../components/ui/inputs/InputField";
import DatePicker from "../../../../components/ui/inputs/DatePicker";
import Button from "../../../../components/ui/button/Button";
import { HiOutlinePlusCircle } from "react-icons/hi";
import {
  BUTTON_GROUP_CLASS,
  FORM_LAYOUT_CLASS,
} from "../../../../constants/commonData";
export const Experience = () => {
  const { control, handleSubmit } = useForm();
  return (
    <div className={FORM_LAYOUT_CLASS}>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="space-y-6"
      >
        <InputField
          name="institute"
          control={control}
          label="Institute"
          type="text"
        />
        <InputField
          name="instName"
          control={control}
          label="Institution name"
          type="text"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePicker
            name="from"
            control={control}
            label="From"
            placeholder="Experience from"
          />
          <DatePicker
            name="to"
            control={control}
            label="To"
            placeholder="Experience to"
          />
        </div>
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
