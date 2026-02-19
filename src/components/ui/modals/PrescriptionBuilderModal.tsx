import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./Modal";
import InputField from "../inputs/InputField";
import TextAreaField from "../inputs/TextAreaField";
import CheckboxField from "../inputs/CheckboxField"; // Import new component

const PrescriptionBuilderModal = ({ isOpen, onClose, initialData }: any) => {
  const isEdit = !!initialData;
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      drugSearch: initialData?.name || "",
      quantity: initialData?.qty || "",
      dosage: initialData?.dosage || "",
      instructions: initialData?.instructions || "",
      pharmacyNote: "",
      confirm: false,
    },
  });

  const isConfirmed = watch("confirm");

  const onSubmit = (data: any) => {
    const loadToast = toast.loading(
      isEdit ? "Updating prescription..." : "Adding prescription...",
    );
    setTimeout(() => {
      toast.success(isEdit ? "Prescription updated!" : "Prescription added!", {
        id: loadToast,
      });
      onClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Prescription" : "Prescription Builder"}
      width="max-w-3xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          label="Drug Search"
          name="drugSearch"
          control={control}
          type="text"
          placeholder="Prozac"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Total Quantity"
            name="quantity"
            control={control}
            type="number"
            placeholder="0"
            required
          />
          <InputField
            label="Dosage"
            name="dosage"
            control={control}
            type="text"
            placeholder="e.g. Twice daily"
          />
        </div>

        <TextAreaField
          label="Instructions"
          name="instructions"
          control={control}
          placeholder="Add Instructions..."
        />

        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <label className="text-[14px] font-medium text-[#000000]">
              Note For Pharmacy
            </label>
            <span className="text-[12px] text-gray-500 flex items-center gap-1">
              💊 Nob Hill Pharmacy
            </span>
          </div>
          <TextAreaField
            label=""
            name="pharmacyNote"
            control={control}
            placeholder="Write Here..."
            height="h-20"
          />
        </div>

        {/* Clean, Reusable Checkbox Component */}
        <CheckboxField
          label="I confirm that the above prescriptions & instructions are correct."
          name="confirm"
          control={control}
          id="confirm-rx"
          className="pt-2"
        />

        <div className="flex items-center p-4 bg-[#FFF9F5] rounded-xl gap-3 border border-orange-100">
          <div className="bg-[#A3948C] text-white w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold">
            i
          </div>
          <p className="text-[13px] text-gray-600">
            Medication added electronically will be submitted at the end of the
            visit.
          </p>
        </div>

        <div className="flex justify-end items-center gap-6 pt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="text-[#F76D00] font-bold text-[16px]"
          >
            Reset Form
          </button>
          <button
            type="submit"
            disabled={!isConfirmed}
            className={`px-10 py-3.5 rounded-xl font-bold text-[16px] transition-all
              ${isConfirmed ? "bg-[#705295] text-white hover:bg-[#5e447e]" : "bg-[#D4CFCC] text-white cursor-not-allowed"}
            `}
          >
            {isEdit ? "Update Rx" : "Add Rx"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PrescriptionBuilderModal;
