import React from "react";
import { useForm } from "react-hook-form";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "../common/SectionWrapper";
import MainContainer from "../MainContainer";
import InputField from "../../../components/ui/inputs/InputField";
import SelectField from "../../../components/ui/inputs/SelectField";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import CheckboxField from "../../../components/ui/inputs/CheckboxField";
import Button from "../../../components/ui/button/Button";

const RequestAsynchronousVisit = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      searchPharmacy: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      sex: null,
      streetAddress: "",
      city: "",
      state: null,
      zipCode: "",
      pastMedicalProblems: "",
      currentMedications: "",
      knownAllergies: "",
      height: "",
      currentWeight: "",
      bmi: null,
      medicationDesired: "",
      dosageDesired: "",
      quantityDesired: null,
      reasonForMedication: "",
      allergicToMounjaro: null,
      familyHistoryThyroid: null,
      diagnosedMultipleEndocrine: null,
      diagnosedGallbladder: null,
      planningSurgery: null,
      thoughtsOfSuicide: null,
      pregnantOrBreastfeeding: null,
      havingHeadaches: null,
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: any) => console.log("Form Data:", data);

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  return (
    <MainContainer className="bg-white min-h-screen pb-12">
      <div className="flex items-center gap-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <HiArrowLeft size={24} className="text-[#0A1E25]" />
        </button>
        <h1 className="text-[24px] font-bold text-[#0A1E25]">
          Request Asynchronous Visit
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SectionWrapper>
          <h2 className="text-[18px] font-bold text-[#0A1E25] mb-6">
            Choose Pharmacy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SearchInput
              value={watch("searchPharmacy")}
              onChange={(val) => setValue("searchPharmacy", val)}
              placeholder="By name, state & zip-code"
              className="w-full"
            />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <h2 className="text-[18px] font-bold text-[#0A1E25] mb-8">
            Patient Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              name="firstName"
              control={control}
              type="text"
              placeholder="e.g. Jhon"
            />
            <InputField
              label="Last Name"
              name="lastName"
              control={control}
              type="text"
              placeholder="e.g. Franklin"
            />
            <InputField
              label="Email Address"
              name="email"
              control={control}
              type="email"
              placeholder="abcd@gmail.com"
            />
            <InputField
              label="Phone Number"
              name="phone"
              control={control}
              type="tel"
              placeholder="(---) --- ----"
            />
            <InputField
              label="Date of birth"
              name="dob"
              control={control}
              type="text"
              placeholder="MM/DD/YYYY"
            />
            <SelectField
              label="Sex"
              name="sex"
              control={control}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              placeholder="Please Select"
            />
            <InputField
              label="Street Address"
              name="streetAddress"
              control={control}
              type="text"
              placeholder="Enter street address"
            />
            <InputField
              label="City"
              name="city"
              control={control}
              type="text"
              placeholder="Enter City"
            />
            <SelectField
              label="State"
              name="state"
              control={control}
              options={[]}
              placeholder="Select State"
            />
            <InputField
              label="Zip Code"
              name="zipCode"
              control={control}
              type="text"
              placeholder="********"
            />
          </div>
        </SectionWrapper>

        {/* Section 3: Health Info - Removed Styling */}
        <SectionWrapper>
          <h2 className="text-[18px] font-bold text-[#0A1E25] mb-8">
            Patient Health Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Past Medical Problems"
              name="pastMedicalProblems"
              control={control}
              type="text"
              placeholder="Enter Past Medical Problems"
            />
            <InputField
              label="Current Medications"
              name="currentMedications"
              control={control}
              type="text"
              placeholder="Enter Currently Taking Medications"
            />
            <InputField
              label="Known Allergies"
              name="knownAllergies"
              control={control}
              type="text"
              placeholder="Enter Known Allergies"
            />
            <InputField
              label="Height"
              name="height"
              control={control}
              type="text"
              placeholder="--' --''"
            />
            <InputField
              label="Current Weight"
              name="currentWeight"
              control={control}
              type="text"
              placeholder="0 lbs"
            />
            <SelectField
              label="BMI"
              name="bmi"
              control={control}
              options={[]}
              placeholder="0 lbs"
            />
            <InputField
              label="Medication Desired"
              name="medicationDesired"
              control={control}
              type="text"
              placeholder="Enter Desired Medication"
            />
            <InputField
              label="Dosage Desired"
              name="dosageDesired"
              control={control}
              type="text"
              placeholder="Enter Desired Dosage"
            />
            <SelectField
              label="Quantity Desired"
              name="quantityDesired"
              control={control}
              options={[]}
              placeholder="Select State"
            />
            <InputField
              label="Reason for Medication"
              name="reasonForMedication"
              control={control}
              type="text"
              placeholder="Enter City"
            />
            <SelectField
              label="Has the patient ever had an allergic reaction..."
              name="allergicToMounjaro"
              control={control}
              options={options}
              placeholder="Select From Followings"
            />
            <SelectField
              label="Does the patient have a personal or family history..."
              name="familyHistoryThyroid"
              control={control}
              options={options}
              placeholder="Select From Followings"
            />
            <SelectField
              label="Has the patient or a family member been diagnosed..."
              name="diagnosedMultipleEndocrine"
              control={control}
              options={options}
              placeholder="Select From Followings"
            />
            <SelectField
              label="Has the patient been diagnosed with gallbladder..."
              name="diagnosedGallbladder"
              control={control}
              options={options}
              placeholder="Select From Followings"
            />
            <SelectField
              label="Is the patient planning on having surgery..."
              name="planningSurgery"
              control={control}
              options={options}
              placeholder="Select From Followings"
            />
            <SelectField
              label="Has the patient ever had thoughts of suicide..."
              name="thoughtsOfSuicide"
              control={control}
              options={options}
              placeholder="Select From Followings"
            />
            <SelectField
              label="Is the patient pregnant, planning to get pregnant..."
              name="pregnantOrBreastfeeding"
              control={control}
              options={options}
              placeholder="Select From Followings"
            />
            <SelectField
              label="Is the patient currently having pain..."
              name="havingHeadaches"
              control={control}
              options={options}
              placeholder="Select From Followings"
            />
          </div>
        </SectionWrapper>

        {/* Section 4: Terms - Removed Styling */}
        <SectionWrapper>
          <h2 className="text-[18px] font-bold text-[#0A1E25] mb-4">
            Confirm Request And Agree To Terms
          </h2>
          <p className="text-[13px] text-[#666666] mb-6 leading-relaxed">
            After you submit your request, a licensed medical provider in your
            area will review your information...
          </p>
          <CheckboxField
            label="By checking this box, you indicate that you... agree to the Terms of Service, Privacy Policy and Consent to InstaVisitRX"
            name="agreeToTerms"
            control={control}
          />
        </SectionWrapper>
        <div className="flex justify-end items-center gap-8 mt-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-[#0A1E25] font-bold text-[14px]"
          >
            Back
          </button>
          <Button
            onClick={() => navigate("/download-app")}
            label="Submit Request"
            type="submit"
            width="w-[180px]"
            bgColor="bg-[#705295]"
            className="rounded-xl py-3 font-bold"
          />
        </div>
      </form>
    </MainContainer>
  );
};

export default RequestAsynchronousVisit;
