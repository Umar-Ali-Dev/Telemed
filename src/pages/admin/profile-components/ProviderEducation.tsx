import React from "react";
import { useForm } from "react-hook-form";
import InfoDisplay from "../../../components/ui/cards/InfoDisplay";
import CertificationThumbnail from "../../../components/ui/inputs/CertificationThumbnail";
import { CERTIFICATE_IMAGES } from "../../../constants/commonData";

const EDUCATION_DATA = [
  {
    id: 1,
    title: "MBBS - AIOM University, UI - 2020.",
    degree: "MBBS",
    school: "AIOM University, UI",
    graduationDate: "2020",
    attachments: [
      {
        label: "Certificate",
        name: "edu_1_cert_1",
        url: CERTIFICATE_IMAGES[0],
      },
      {
        label: "Certificate",
        name: "edu_1_cert_2",
        url: CERTIFICATE_IMAGES[4],
      },
    ],
  },
  {
    id: 2,
    title: "Specialization - AIOM University, UI - 2022.",
    degree: "Specialization",
    school: "AIOM University, UI",
    graduationDate: "2022",
    attachments: [
      {
        label: "Certificate",
        name: "edu_2_cert_1",
        url: CERTIFICATE_IMAGES[2],
      },
      {
        label: "Certificate",
        name: "edu_2_cert_2",
        url: CERTIFICATE_IMAGES[2],
      },
    ],
  },
];

const ProviderEducation: React.FC = () => {
  // Pass the image URLs into defaultValues so CertificationThumbnail renders the preview
  const { control } = useForm({
    defaultValues: {
      edu_1_cert_1: EDUCATION_DATA[0].attachments[0].url,
      edu_1_cert_2: EDUCATION_DATA[0].attachments[1].url,
      edu_2_cert_1: EDUCATION_DATA[1].attachments[0].url,
      edu_2_cert_2: EDUCATION_DATA[1].attachments[1].url,
    },
  });

  return (
    <div className="space-y-12 animate-fadeIn">
      {EDUCATION_DATA.map((item, index) => (
        <div key={item.id} className="space-y-6">
          <h3 className="text-[18px] font-bold text-[#0A1E25]">{item.title}</h3>

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
                  readOnly={true}
                />
              ))}
            </div>
          </div>

          {index < EDUCATION_DATA.length - 1 && (
            <div className="border-b border-gray-100 pt-6" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProviderEducation;
