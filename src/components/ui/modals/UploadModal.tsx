import React, { useRef, useState } from "react";
import Button from "../../../components/ui/button/Button";
import Modal from "./Modal";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("File selected:", file.name);
    }
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />

        {/* Functional Drag and Drop Area */}
        <div
          onClick={onUploadClick}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-[#EBE5F1] bg-[#F2EFFF] rounded-[24px] p-16 flex flex-col items-center justify-center cursor-pointer hover:bg-[#ebe7ff] transition-all group"
        >
          <p className="text-[20px] text-[#A3948C] font-medium text-center">
            {selectedFile ? (
              <span className="text-[#705295] font-bold break-all">
                {selectedFile.name}
              </span>
            ) : (
              <>
                Drop File Here or{" "}
                <span className="text-[#705295] font-bold group-hover:underline">
                  Upload
                </span>
              </>
            )}
          </p>
          {selectedFile && (
            <p className="text-[12px] text-[#A3948C] mt-2">
              Click to change file
            </p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end items-center gap-8 mt-10">
          <button
            onClick={() => {
              setSelectedFile(null);
              onClose();
            }}
            className="text-[#0A1E25] font-bold text-[14px] hover:opacity-70 transition-opacity"
          >
            Back
          </button>
          <Button
            label="Upload"
            width="w-[140px]"
            bgColor={selectedFile ? "bg-[#705295]" : "bg-[#A3948C]"}
            disabled={!selectedFile}
            className="rounded-xl font-bold py-3"
            onClick={() => console.log("Uploading:", selectedFile)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
