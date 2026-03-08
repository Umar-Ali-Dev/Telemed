import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LuPencil, LuSave, LuX } from "react-icons/lu";
import InfoDisplay from "../../../components/ui/cards/InfoDisplay";
import SelectField from "../../../components/ui/inputs/SelectField";

const ProviderPersonal: React.FC = () => {
  const [isEditingState, setIsEditingState] = useState(false);

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      assignedState: "LA",
    },
  });

  const currentState = watch("assignedState");

  // Dummy state options
  const stateOptions = [
    { value: "AL", label: "AL" },
    { value: "CA", label: "CA" },
    { value: "LA", label: "LA" },
    { value: "NY", label: "NY" },
    { value: "TX", label: "TX" },
  ];

  const onSaveState = (data: any) => {
    console.log("Updated State:", data.assignedState);
    setIsEditingState(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <section>
        <h3 className="text-[18px] font-bold text-[#0A1E25] mb-6">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <InfoDisplay label="First Name" value="Dr. Alina" />
          <InfoDisplay label="Last Name" value="Star" />
          <InfoDisplay label="Email Address" value="alinastar@gmail.com" />
          <InfoDisplay label="NPI Number" value="837264723" />
          <InfoDisplay label="Phone Number" value="(876) 876 9876" />
          <InfoDisplay
            label="Address"
            value="72 Caisson Trace, Spanish Fort, AL, 732846, USA"
          />
        </div>
      </section>

      <section className="max-w-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] font-bold text-[#0A1E25]">
            Assigned State
          </h3>

          {/* Dynamic Action Button */}
          {!isEditingState ? (
            <button
              onClick={() => setIsEditingState(true)}
              className="flex items-center gap-1.5 text-[#A3948C] hover:text-[#705295] text-[14px] font-medium transition-colors"
            >
              <LuPencil size={14} /> Edit Assigned State
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditingState(false)}
                className="text-red-500 hover:text-red-700 text-[14px] font-medium flex items-center gap-1"
              >
                <LuX size={14} /> Cancel
              </button>
              <button
                onClick={handleSubmit(onSaveState)}
                className="text-[#705295] hover:text-[#5e447e] text-[14px] font-bold flex items-center gap-1"
              >
                <LuSave size={14} /> Save
              </button>
            </div>
          )}
        </div>

        <div>
          <p className="text-[14px] text-[#A3948C] mb-1">State</p>
          {isEditingState ? (
            <SelectField
              name="assignedState"
              control={control}
              options={stateOptions}
              height="45px"
              placeholder="Select State"
            />
          ) : (
            <p className="text-[16px] font-medium text-[#1A202C]">
              {currentState}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProviderPersonal;
