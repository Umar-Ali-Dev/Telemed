import React from "react";
import { useForm } from "react-hook-form";
import InfoDisplay from "../../../components/ui/cards/InfoDisplay";
import CertificationThumbnail from "../../../components/ui/inputs/CertificationThumbnail";

const EDUCATION_DATA = [
  {
    id: 1,
    title: "MBBS - AIOM University, UI - 2020.",
    degree: "MBBS",
    school: "AIOM University, UI",
    graduationDate: "2020",
    // Field names for react-hook-form
    attachments: [
      { label: "Certificate", name: "edu_1_cert_1" },
      { label: "Certificate", name: "edu_1_cert_2" },
    ],
  },
  {
    id: 2,
    title: "MBBS - AIOM University, UI - 2020.",
    degree: "MBBS",
    school: "AIOM University, UI",
    graduationDate: "2020",
    attachments: [
      { label: "Certificate", name: "edu_2_cert_1" },
      { label: "Certificate", name: "edu_2_cert_2" },
    ],
  },
];

const ProviderEducation: React.FC = () => {
  // Initializing the form to control the thumbnails
  const { control } = useForm();

  return (
    <div className="space-y-12 animate-fadeIn">
      {EDUCATION_DATA.map((item, index) => (
        <div key={item.id} className="space-y-6">
          {/* Main Title Header */}
          <h3 className="text-[18px] font-bold text-[#0A1E25]">{item.title}</h3>

          {/* Grid for Degree Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <InfoDisplay label="Degree Name" value={item.degree} />
            <InfoDisplay label="Name of School" value={item.school} />
            <InfoDisplay label="Graduation Date" value={item.graduationDate} />
          </div>

          <div className="space-y-3">
            <p className="text-[14px] font-bold text-[#A3948C]">Attachment</p>
            <div className="flex gap-4">
              {item.attachments.map((attachment, idx) => (
                <CertificationThumbnail
                  key={idx}
                  name={attachment.name as any}
                  control={control}
                />
              ))}
            </div>
          </div>

          {index !== EDUCATION_DATA.length - 1 && (
            <hr className="border-[#D4CFCC] mt-8" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProviderEducation;
