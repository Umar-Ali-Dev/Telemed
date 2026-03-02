import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./Modal";
import TextAreaField from "../inputs/TextAreaField";

interface CancelReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (reason: string) => void;
}

const CancelReasonModal: React.FC<CancelReasonModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      cancelReason: "",
    },
  });

  const onFormSubmit = (data: any) => {
    const loadToast = toast.loading("Cancelling visit...");
    setTimeout(() => {
      toast.success("Visit cancelled successfully!", {
        id: loadToast,
      });
      if (onSubmit) {
        onSubmit(data.cancelReason);
      }
      reset();
      onClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Reason"
      width="max-w-2xl"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <TextAreaField
          label="Cancel Reason"
          name="cancelReason"
          control={control}
          placeholder="Reason for cancel Visit"
          height="h-32"
          required
        />

        <div className="flex justify-end items-center gap-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-medium text-[16px] text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl font-bold text-[16px] bg-[#705295] text-white hover:bg-[#5e447e] transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CancelReasonModal;
