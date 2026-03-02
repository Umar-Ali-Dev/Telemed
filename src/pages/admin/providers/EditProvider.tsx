import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import InputField from "../../../components/ui/inputs/InputField";
import SelectField from "../../../components/ui/inputs/SelectField";
import CheckboxField from "../../../components/ui/inputs/CheckboxField";
import Button from "../../../components/ui/button/Button";
import ImageUploadField from "../../../components/ui/inputs/ImageUploadField";

const EditProvider = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Provider Data:", data);
    navigate("/admin/providers/all");
  };

  return (
    <SectionWrapper padding="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ImageUploadField
          name="profileImage"
          control={control}
          defaultValue="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&h=150&auto=format&fit=crop"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl">
          <InputField
            label="First name"
            name="firstName"
            control={control}
            type="text"
            placeholder="Enter first name"
          />
          <InputField
            label="Last name"
            name="lastName"
            control={control}
            type="text"
            placeholder="Enter last name"
          />
          <div className="md:col-span-2">
            <InputField
              label="Email address"
              name="email"
              control={control}
              type="email"
              placeholder="e.g. abc_john@email.com"
            />
          </div>
          <InputField
            label="Phone Number"
            name="phone"
            control={control}
            type="tel"
            placeholder="(000) 000 0000"
          />
          <InputField
            label="NPI Number"
            name="npi"
            control={control}
            type="text"
            placeholder="(000) 000 0000"
          />
          <div className="md:col-span-2">
            <SelectField
              label="Credentials"
              name="credentials"
              control={control}
              options={[{ label: "MD", value: "md" }]}
              placeholder="Select Credentials"
            />
          </div>
          <div className="md:col-span-2">
            <InputField
              label="License Number"
              name="license"
              control={control}
              type="text"
              placeholder="*************"
            />
          </div>
          <InputField
            label="License Expiration Date"
            name="licenseExp"
            control={control}
            type="text"
            placeholder="MM/DD/YYYY"
          />
          <InputField
            label="License State"
            name="licenseState"
            control={control}
            type="text"
            placeholder="e.g. AL"
          />

          <div className="md:col-span-2">
            <InputField
              label="Street"
              name="street"
              control={control}
              type="text"
              placeholder="72 Caisson Trace,"
            />
          </div>
          <InputField
            label="City"
            name="city"
            control={control}
            type="text"
            placeholder="Spanish Fort"
          />
          <InputField
            label="State"
            name="state"
            control={control}
            type="text"
            placeholder="AL"
          />
          <InputField
            label="Zip Code"
            name="zip"
            control={control}
            type="text"
            placeholder="********"
          />
          <div className="md:col-span-2">
            <InputField
              label="Practice Address"
              name="practiceAddress"
              control={control}
              type="text"
              placeholder="Enter Practice Address"
            />
          </div>
        </div>

        <div className="mt-4">
          <CheckboxField
            label="Same as Home Address"
            name="sameAsHome"
            control={control}
          />
        </div>

        <div className="flex justify-end gap-6 pt-10">
          <Button
            label="Cancel"
            onClick={() => navigate(-1)}
            bgColor="bg-transparent"
            textColor="text-[#A3948C]"
            width="w-auto"
            className="font-bold"
          />
          <Button
            label="Save"
            type="submit"
            width="w-[160px]"
            className="rounded-xl font-bold"
          />
        </div>
      </form>
    </SectionWrapper>
  );
};

export default EditProvider;
