import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Heading from "../../../components/ui/headings/Heading";
import InputField from "../../../components/ui/inputs/InputField";
import SelectField from "../../../components/ui/inputs/SelectField";
import Button from "../../../components/ui/button/Button";
import { LuImagePlus } from "react-icons/lu";

const EditPatient: React.FC = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "David",
      lastName: "Petersburg",
      email: "davidpetersburg@gmail.com",
      phone: "(8760) 765 8755",
      dob: "02-17-1999",
      height: "5'7\"",
      weight: "90 lbs",
      bmi: "24.4",
      gender: "Female",
      address: "72 Caisson Trace, Spanish Fort, AL 36527, USA",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Updated Data:", data);
    navigate(`/admin/patient/1?showAdminDetail=true`);
  };

  return (
    <SectionWrapper padding="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&h=150&auto=format&fit=crop"
              alt="David Petersburg"
              className="w-full h-full rounded-xl object-cover"
            />
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-500 shadow-sm"
            >
              <LuImagePlus size={14} />
            </button>
          </div>
          <Heading
            title="David Petersburg"
            className="text-[#3a2014] font-bold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl">
          {/* Added required 'type' prop to resolve TypeScript error */}
          <InputField
            label="First name"
            name="firstName"
            control={control}
            type="text"
            placeholder="First name"
          />
          <InputField
            label="Last name"
            name="lastName"
            control={control}
            type="text"
            placeholder="Last name"
          />

          <div className="md:col-span-2">
            <InputField
              label="Email address"
              name="email"
              control={control}
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="md:col-span-2">
            <InputField
              label="Phone Number"
              name="phone"
              control={control}
              type="tel"
              placeholder="Phone"
            />
          </div>

          <div className="md:col-span-2">
            <InputField
              label="Date Of Birth"
              name="dob"
              control={control}
              type="text"
              placeholder="DOB"
            />
          </div>

          <InputField
            label="Height"
            name="height"
            control={control}
            type="text"
            placeholder="5'7\"
          />
          <InputField
            label="Weight"
            name="weight"
            control={control}
            type="text"
            placeholder="90 lbs"
          />

          <InputField
            label="BMI"
            name="bmi"
            control={control}
            type="text"
            placeholder="24.4"
          />

          <SelectField
            label="Gender"
            name="gender"
            control={control}
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "Other" },
            ]}
          />

          <div className="md:col-span-2">
            <InputField
              label="Address"
              name="address"
              control={control}
              type="text"
              placeholder="Address"
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-6 pt-10">
          <Button
            label="Cancel"
            type="button"
            onClick={() => navigate(-1)}
            bgColor="bg-transparent"
            textColor="text-[#A3948C]"
            width="w-auto"
            className="font-bold px-4 hover:text-gray-600"
          />
          <Button
            label="Update"
            type="submit"
            bgColor="bg-[#705295]"
            width="w-[160px]"
            className="rounded-xl font-bold"
          />
        </div>
      </form>
    </SectionWrapper>
  );
};

export default EditPatient;
