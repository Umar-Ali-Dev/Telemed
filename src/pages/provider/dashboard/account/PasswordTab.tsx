import { useForm } from "react-hook-form";
import InputField from "../../../../components/ui/inputs/InputField";
import Button from "../../../../components/ui/button/Button";
import {
  BUTTON_GROUP_CLASS,
  FORM_LAYOUT_CLASS,
} from "../../../../constants/commonData";
export const PasswordTab = () => {
  const { control, handleSubmit } = useForm();
  return (
    <div className={FORM_LAYOUT_CLASS}>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="max-w-xl space-y-6"
      >
        <InputField
          name="currentPassword"
          control={control}
          label="Current Password"
          type="password"
          required
        />
        <InputField
          name="newPassword"
          control={control}
          label="New Password"
          type="password"
          required
        />
        <InputField
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          type="password"
          required
        />
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
