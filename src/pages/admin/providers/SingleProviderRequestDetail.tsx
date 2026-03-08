import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { LuMoveLeft } from "react-icons/lu";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import InputField from "../../../components/ui/inputs/InputField";
import SelectField from "../../../components/ui/inputs/SelectField";
import Button from "../../../components/ui/button/Button";
import ImageUploadField from "../../../components/ui/inputs/ImageUploadField";
import Heading from "../../../components/ui/headings/Heading";
import { FaArrowLeft } from "react-icons/fa";

const SingleProviderRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { control, handleSubmit } = useForm();

  const handleApprove = (data: any) => {
    console.log("Approving Provider:", data);
    navigate("/admin/providers/requests"); // Returns to request table on success
  };

  const handleDecline = () => {
    console.log("Declining Provider Request:", id);
    navigate(-1);
  };

  return (
    <SectionWrapper className="m-6">
      <div className="mb-8 flex items-center ">
        <button
          type="button"
          onClick={() => navigate("/admin/providers/requests")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#0A1E25] flex items-center justify-center"
        >
          <FaArrowLeft size={20} />
        </button>
        <Heading
          title="Provider Request"
          highlightText="Detail"
          textSize="text-[24px]"
          className="font-bold"
        />
      </div>

      <form onSubmit={handleSubmit(handleApprove)} className="space-y-6">
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
            disabled={true}
          />
          <InputField
            label="Last name"
            name="lastName"
            control={control}
            type="text"
            placeholder="Enter last name"
            disabled={true}
          />

          <div className="md:col-span-2">
            <InputField
              label="Email address"
              name="email"
              control={control}
              type="email"
              placeholder="e.g. abc_john@email.com"
              disabled={true}
            />
          </div>

          <InputField
            label="Phone Number"
            name="phone"
            control={control}
            type="tel"
            placeholder="(000) 000 0000"
            disabled={true}
          />
          <InputField
            label="NPI Number"
            name="npi"
            control={control}
            type="text"
            placeholder="Enter NPI Number"
            disabled={true}
          />

          <div className="md:col-span-2">
            <SelectField
              label="Credentials"
              name="credentials"
              control={control}
              options={[{ label: "MD", value: "md" }]}
              placeholder="Select Credentials"
              disabled={true}
            />
          </div>

          <div className="md:col-span-2">
            <InputField
              label="License Number"
              name="license"
              control={control}
              type="text"
              placeholder="*************"
              disabled={true}
            />
          </div>

          <InputField
            label="License Expiration Date"
            name="licenseExp"
            control={control}
            type="text"
            placeholder="MM/DD/YYYY"
            disabled={true}
          />
          <InputField
            label="License State"
            name="licenseState"
            control={control}
            type="text"
            placeholder="e.g. AL"
            disabled={true}
          />

          <div className="md:col-span-2">
            <InputField
              label="Street"
              name="street"
              control={control}
              type="text"
              placeholder="72 Caisson Trace,"
              disabled={true}
            />
          </div>

          <InputField
            label="City"
            name="city"
            control={control}
            type="text"
            placeholder="Spanish Fort"
            disabled={true}
          />
          <InputField
            label="State"
            name="state"
            control={control}
            type="text"
            placeholder="AL"
            disabled={true}
          />
          <InputField
            label="Zip Code"
            name="zip"
            control={control}
            type="text"
            placeholder="********"
            disabled={true}
          />

          <div className="md:col-span-2">
            <InputField
              label="Practice Address"
              name="practiceAddress"
              control={control}
              type="text"
              placeholder="Enter Practice Address"
              disabled={true}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-6 pt-10">
          <Button
            type="button"
            label="Decline"
            onClick={handleDecline}
            bgColor="bg-[#FEE2E2]"
            textColor="text-[#EF4444]"
            width="w-[160px]"
            className="rounded-xl font-bold border-none"
          />
          <Button
            label="Approve"
            type="submit"
            width="w-[160px]"
            className="rounded-xl font-bold"
          />
        </div>
      </form>
    </SectionWrapper>
  );
};

export default SingleProviderRequestDetail;
