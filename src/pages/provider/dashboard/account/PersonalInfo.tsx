import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom"; // Use location to detect role
import InputField from "../../../../components/ui/inputs/InputField";
import Button from "../../../../components/ui/button/Button";
import {
  BUTTON_GROUP_CLASS,
  FORM_LAYOUT_CLASS,
} from "../../../../constants/commonData";

export const PersonalInfo = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin"); // Role detection
  const { control, handleSubmit } = useForm();

  return (
    <div className={FORM_LAYOUT_CLASS}>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="space-y-6"
      >
        {/* Only show Prefix for Provider */}
        {!isAdmin && (
          <InputField
            name="prefix"
            control={control}
            label="Prefix"
            type="text"
            placeholder="e.g. Dr."
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            name="firstName"
            control={control}
            label="First name"
            type="text"
            placeholder="Enter first name"
            required
          />
          <InputField
            name="lastName"
            control={control}
            label="Last name"
            type="text"
            placeholder="Enter last name"
            required
          />
        </div>

        <InputField
          name="email"
          control={control}
          label="Email address"
          type="email"
          placeholder="e.g. abc@email.com"
          required
        />
        <InputField
          name="phone"
          control={control}
          label="Phone Number"
          type="tel"
          placeholder="(000) 000 0000"
          required
        />
        {/* Only show Phone, NPI, and License fields for Provider or shared as needed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <InputField
            name="phone"
            control={control}
            label="Phone Number"
            type="tel"
            placeholder="(000) 000 0000"
            required
          /> */}
          {!isAdmin && (
            <InputField
              name="npi"
              control={control}
              label="NPI Number"
              type="text"
              placeholder="1234567890"
              required
            />
          )}
          {!isAdmin && (
            <InputField
              name="license"
              control={control}
              label="License Number"
              type="text"
              placeholder="***********"
              required
            />
          )}
        </div>

        {/* Address section - Hid for Admin based on reference image */}
        {!isAdmin && (
          <>
            <InputField
              name="street"
              control={control}
              label="Street"
              type="text"
              placeholder="72 Caisson Trace"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <InputField
                  name="city"
                  control={control}
                  label="City"
                  type="text"
                  placeholder="Spanish Fort"
                />
              </div>
              <InputField
                name="state"
                control={control}
                label="State"
                type="text"
                placeholder="AL"
              />
            </div>
            <InputField
              name="zip"
              control={control}
              label="Zip Code"
              type="text"
              placeholder="3724627"
            />
            <InputField
              name="practiceAddress"
              control={control}
              label="Practice Address"
              type="text"
              placeholder="72 Caisson Trace."
            />
          </>
        )}

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
