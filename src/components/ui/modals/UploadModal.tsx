import Button from "../../../components/ui/button/Button";
import Modal from "./Modal";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload New Documents"
      width="max-w-xl"
    >
      <div className="space-y-6">
        <p className="text-[#A3948C] text-[14px] font-medium">
          Please share the Application details.
        </p>

        {/* Drag and Drop Area */}
        <div className="border-2 border-dashed border-[#EBE5F1] bg-[#F2EFFF] rounded-[24px] p-16 flex flex-col items-center justify-center cursor-pointer">
          <p className="text-[20px] text-[#A3948C] font-medium">
            Drop File Here or{" "}
            <span className="text-[#705295] font-bold">Upload</span>
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end items-center gap-8 mt-10">
          <button
            onClick={onClose}
            className="text-[#0A1E25] font-bold text-[14px] hover:opacity-70 transition-opacity"
          >
            Back
          </button>
          <Button
            label="Upload"
            width="w-[140px]"
            bgColor="bg-[#705295]"
            className="rounded-xl font-bold py-3"
            onClick={() => console.log("File uploaded")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
