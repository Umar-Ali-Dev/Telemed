import { useState } from "react";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Button from "../../../components/ui/button/Button";
import { HiOutlineDownload } from "react-icons/hi";
import UploadModal from "../../../components/ui/modals/UploadModal";

const DocumentHandling = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const documentGroups = [
    {
      date: "Dec 21, 2025",
      files: [
        {
          name: "myReport.jpeg",
          url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200",
        },
        {
          name: "myReport.jpeg",
          url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=200",
        },
        {
          name: "myReport.jpeg",
          url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200",
        },
      ],
    },
    {
      date: "Jan 21, 2026",
      files: [
        {
          name: "myReport.jpeg",
          url: "https://images.unsplash.com/photo-1579152276503-3150bc24d39c?q=80&w=200",
        },
        {
          name: "myReport.jpeg",
          url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=200",
        },
      ],
    },
  ];

  return (
    <SectionWrapper className="m-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-[24px] font-bold text-[#0A1E25]">Documents</h2>
        <Button
          label="Upload Documents"
          bgColor="bg-[#EBE5F1]"
          textColor="text-[#705295]"
          height="h-auto"
          rounded="rounded-xl"
          width="w-auto"
          className="font-bold border border-[#705295] px-6 py-2.5 shadow-sm hover:opacity-90 transition-all"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Grouped Document List */}
      <div className="space-y-12">
        {documentGroups.map((group, idx) => (
          <div key={idx} className="space-y-6">
            <h3 className="text-[18px] font-bold text-[#0A1E25]">
              {group.date}
            </h3>
            <div className="flex flex-wrap gap-8">
              {group.files.map((file, fIdx) => (
                <div key={fIdx} className="w-[200px] space-y-3 group">
                  {/* Image Card */}
                  <div className="relative aspect-[1.5/1] rounded-[24px] overflow-hidden border border-gray-100 bg-white shadow-sm transition-transform duration-200 hover:scale-[1.02]">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* File Metadata */}
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[14px] font-medium text-[#4A5568] truncate">
                      {file.name}
                    </span>
                    <button className="text-[#705295] hover:opacity-70 transition-opacity">
                      <HiOutlineDownload size={22} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SectionWrapper>
  );
};

export default DocumentHandling;
