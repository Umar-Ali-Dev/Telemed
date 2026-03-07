import Modal from "./Modal";
import Button from "../button/Button";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" width="max-w-md">
      <div className="flex flex-col items-center text-center">
        {/* Purple Warning Icon Container */}
        <div className="w-24 h-24 bg-[#EBE5F1] rounded-full flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-[#705295] rotate-45 flex items-center justify-center rounded-lg">
            <span className="text-white text-3xl font-bold -rotate-45">!</span>
          </div>
        </div>

        <h3 className="text-[20px] font-bold text-[#1A202C] mb-10">
          Are You Sure you want to logout
        </h3>

        <div className="flex gap-4 w-full">
          <Button
            label="Back"
            onClick={onClose}
            bgColor="bg-[#A3948C]"
            textColor="text-white"
            className="rounded-xl font-bold"
          />
          <Button
            label="Logout"
            onClick={onConfirm}
            bgColor="bg-[#F76D00]"
            textColor="text-white"
            className="rounded-xl font-bold"
          />
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
