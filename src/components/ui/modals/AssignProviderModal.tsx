import { useState } from "react";
import Modal from "./Modal";
import Button from "../button/Button";
import { HiCheckCircle } from "react-icons/hi";

const PROVIDERS_LIST = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Orthopedic surgeon",
    image: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    name: "Dr. Devid Doe",
    specialty: "Orthopedic surgeon",
    image: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "Dr. Khuram Doe",
    specialty: "Orthopedic surgeon",
    image: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    name: "Dr. Alina Satr",
    specialty: "Orthopedic surgeon",
    image: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: 5,
    name: "Dr. Alisba Anais",
    specialty: "Orthopedic surgeon",
    image: "https://i.pravatar.cc/150?u=5",
  },
];

const AssignProviderModal = ({ isOpen, onClose, onAssign }: any) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleAssign = () => {
    if (selectedId) {
      const selectedProvider = PROVIDERS_LIST.find((p) => p.id === selectedId);
      onAssign(selectedProvider);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Provider"
      width="max-w-2xl"
    >
      <div className="space-y-4">
        <div className="border border-[#D4CFCC] rounded-[20px] divide-y divide-gray-100 overflow-hidden bg-[#FFFAF7]">
          {PROVIDERS_LIST.map((provider) => (
            <div
              key={provider.id}
              onClick={() => setSelectedId(provider.id)}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A202C] text-[15px]">
                    {provider.name}
                  </h4>
                  <p className="text-[#A3948C] text-[13px]">
                    {provider.specialty}
                  </p>
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  selectedId === provider.id
                    ? "bg-[#705295] text-white"
                    : "bg-gray-200 text-transparent"
                }`}
              >
                <HiCheckCircle size={20} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-6 pt-6">
          <Button
            label="Back"
            onClick={onClose}
            bgColor="bg-transparent"
            textColor="text-[#A3948C]"
            width="w-[120px]"
          />
          <Button
            label="Assign"
            onClick={handleAssign}
            disabled={!selectedId}
            width="w-[180px]"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AssignProviderModal;
