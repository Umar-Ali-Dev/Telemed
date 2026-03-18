import React from "react";
import { useForm } from "react-hook-form";
import InfoDisplay from "../../../components/ui/cards/InfoDisplay";
import CertificationThumbnail from "../../../components/ui/inputs/CertificationThumbnail";
import { CERTIFICATE_IMAGES } from "../../../constants/commonData";

const EXPERIENCE_DATA = [
  {
    id: 1,
    title: "Senior Doctor - AIOM University, UI - 2020.",
    degree: "MBBS Specialization",
    hospital: "AIOM University, UI",
    startDate: "2020",
    endDate: "2022",
    description:
      "Progress notes are the written notes that you'll add to your patient's chart when any changes occur.",
    certificateUrl: CERTIFICATE_IMAGES[0],
  },
  {
    id: 2,
    title: "Intern Doctor - AIOM University, UI - 2018.",
    degree: "Medical Internship",
    hospital: "AIOM University, UI",
    startDate: "2018",
    endDate: "2020",
    description:
      "Progress notes are the written notes that you'll add to your patient's chart when any changes occur.",
    certificateUrl: CERTIFICATE_IMAGES[1],
  },
];

const ProviderExperience: React.FC = () => {
  const { control } = useForm({
    defaultValues: {
      cert_0: EXPERIENCE_DATA[0].certificateUrl,
      cert_1: EXPERIENCE_DATA[1].certificateUrl,
    },
  });

  return (
    <div className="space-y-12 animate-fadeIn">
      {EXPERIENCE_DATA.map((item, index) => (
        <div key={item.id} className="space-y-6">
          {/* Main Title Header - Matches Education */}
          <h3 className="text-[18px] font-bold text-[#0A1E25]">{item.title}</h3>

          {/* Grid for Experience Details - Matches Education spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <InfoDisplay label="Degree Name" value={item.degree} />
            <InfoDisplay label="Hospital / University" value={item.hospital} />
            <InfoDisplay label="Start Date" value={item.startDate} />
            <InfoDisplay label="End Date" value={item.endDate} />
          </div>

          {/* Attachment Section - Matches Education labeling and layout */}
          <div className="space-y-3">
            <p className="text-[14px] font-bold text-[#A3948C]">Attachment</p>
            <div className="flex gap-4">
              <CertificationThumbnail
                name={`cert_${index}` as any}
                control={control}
                placeholder="Certificate"
                readOnly={true}
              />
            </div>
          </div>

          {/* Optional: Add a Divider if you have more than one item, similar to Education's spacing */}
          {index < EXPERIENCE_DATA.length - 1 && (
            <div className="border-b border-gray-100 pt-6" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProviderExperience;
