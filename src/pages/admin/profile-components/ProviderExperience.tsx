import React from "react";
import { useForm } from "react-hook-form";
import InfoDisplay from "../../../components/ui/cards/InfoDisplay";
import CertificationThumbnail from "../../../components/ui/inputs/CertificationThumbnail";

const EXPERIENCE_DATA = [
  {
    id: 1,
    title: "Senior Doctor - AIOM University, UI - 2020.",
    position: "Senior Doctor",
    hospital: "AIOM University, UI",
    startDate: "2020",
    endDate: "2022",
    description:
      "Progress notes are the written notes that you'll add to your patient's chart when any changes occur. If the patient's condition starts to decline or there are any changes in the patient's care.",
    attachments: [
      { name: "exp_1_cert_1", placeholder: "Certificate" },
      { name: "exp_1_cert_2", placeholder: "Resume" },
    ],
  },
  {
    id: 2,
    title: "Intern Doctor - AIOM University, UI - 2018.",
    position: "Intern Doctor",
    hospital: "AIOM University, UI",
    startDate: "2018",
    endDate: "2020",
    description:
      "Progress notes are the written notes that you'll add to your patient's chart when any changes occur. If the patient's condition starts to decline or there are any changes in the patient's care.",
    attachments: [{ name: "exp_2_cert_1", placeholder: "Internship Cert." }],
  },
];

const ProviderExperience: React.FC = () => {
  const { control } = useForm();

  return (
    <div className="space-y-12 animate-fadeIn">
      {EXPERIENCE_DATA.map((item, index) => (
        <div key={item.id} className="space-y-6">
          {/* Main Title Header */}
          <h3 className="text-[18px] font-bold text-[#0A1E25]">{item.title}</h3>

          {/* Grid for Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <InfoDisplay label="Position" value={item.position} />
            <InfoDisplay label="Hospital Name" value={item.hospital} />
            <InfoDisplay label="Start Date" value={item.startDate} />
            <InfoDisplay label="End Date" value={item.endDate} />
          </div>

          {/* Description Section */}
          <div className="space-y-1">
            <p className="text-[14px] text-[#A3948C]">Description</p>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-2xl">
              {item.description}
            </p>
          </div>

          {/* Attachments Section */}
          <div className="space-y-3">
            <p className="text-[14px] font-bold text-[#A3948C]">Attachment</p>
            <div className="flex gap-4">
              {item.attachments.map((attachment, idx) => (
                <CertificationThumbnail
                  key={idx}
                  name={attachment.name as any}
                  control={control}
                  placeholder={attachment.placeholder} // Sets default label
                />
              ))}
            </div>
          </div>

          {/* Separator */}
          {index !== EXPERIENCE_DATA.length - 1 && (
            <hr className="border-[#D4CFCC] mt-8" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProviderExperience;
