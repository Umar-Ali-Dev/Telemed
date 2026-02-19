import { useState } from "react";
import toast from "react-hot-toast";
import { HiCheck } from "react-icons/hi";
import Modal from "./Modal";
import { PROVIDER_DUMMY_DATA, type ProviderData } from "../../../constants/commonData";
import userDoctorFillIcon from "../../../assets/icons/userDoctorFill.svg";

interface AssignProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestData?: {
    fullName: string;
    email: string;
    phone: string;
    provider: string;
  };
}

const AssignProviderModal = ({
  isOpen,
  onClose,
  requestData,
}: AssignProviderModalProps) => {
  const [selectedProviderId, setSelectedProviderId] = useState<number | null>(
    requestData?.provider && requestData.provider !== "----"
      ? PROVIDER_DUMMY_DATA.find((p) => p.name === requestData.provider)?.id || null
      : null
  );

  const handleAssign = () => {
    if (!selectedProviderId) {
      toast.error("Please select a provider");
      return;
    }
    const loadToast = toast.loading("Assigning provider...");
    setTimeout(() => {
      toast.success("Provider assigned successfully!", { id: loadToast });
      onClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Provider"
      width="max-w-[600px]"
    >
      <div className="space-y-4">
        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
          {PROVIDER_DUMMY_DATA.map((provider: ProviderData) => (
            <div
              key={provider.id}
              className="flex items-center justify-between p-4 rounded-[15px] border border-[#D4CFCC] bg-white hover:border-[#705295]/30 transition-all cursor-pointer"
              onClick={() => setSelectedProviderId(provider.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-[#EBE5F1] flex items-center justify-center flex-shrink-0">
                  <img
                    src={userDoctorFillIcon}
                    alt="Doctor"
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#271100] text-[15px]">
                    {provider.name}
                  </h4>
                  <p className="text-[#999999] text-[13px] mt-0.5">
                    {provider.specialty}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                    selectedProviderId === provider.id
                      ? "bg-[#705295] border-[#705295]"
                      : "bg-white border-[#D4CFCC]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProviderId(provider.id);
                  }}
                >
                  {selectedProviderId === provider.id && (
                    <HiCheck className="text-white text-sm" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end items-center gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="bg-white text-[#271100] px-6 py-2.5 rounded-xl font-bold text-[16px] hover:bg-gray-50 transition-colors border border-[#D4CFCC]"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleAssign}
            className="bg-[#705295] text-white px-6 py-2.5 rounded-xl font-bold text-[16px] hover:bg-[#5e447e] transition-colors"
          >
            Assign
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignProviderModal;
