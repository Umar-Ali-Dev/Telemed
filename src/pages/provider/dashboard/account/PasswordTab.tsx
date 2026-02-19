import { useForm } from "react-hook-form";
import InputField from "../../../../components/ui/inputs/InputField";
import Button from "../../../../components/ui/button/Button";

export const PasswordTab = () => {
  const { control, handleSubmit } = useForm();
  return (
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
      <div className="flex justify-end gap-4 pt-10">
        <Button
          label="Cancel"
          bgColor="bg-transparent"
          textColor="text-[#3a2014]"
        />
        <Button
          label="Update"
          type="submit"
          width="w-[140px]"
          bgColor="bg-[#705295]"
        />
      </div>
    </form>
  );
};
