import React from "react";
import { useForm } from "react-hook-form";
import InfoDisplay from "../../../components/ui/cards/InfoDisplay";
import CertificationThumbnail from "../../../components/ui/inputs/CertificationThumbnail";

const LICENSE_DATA = [
  {
    id: 1,
    title: "License State: LA",
    licenseNumber: "1 June, 2020",
    expirationDate: "2020",
    supervisingProvider: "Dr. Jabar Haider",
    attachments: [
      { name: "license_1_cert_1", placeholder: "Certificate" },
      { name: "license_1_cert_2", placeholder: "Certificate" },
    ],
  },
];

const ProviderLicense: React.FC = () => {
  const { control } = useForm();

  return (
    <div className="space-y-12 animate-fadeIn">
      {LICENSE_DATA.map((item, index) => (
        <div key={item.id} className="space-y-6">
          {/* Main Title Header */}
          <h3 className="text-[18px] font-bold text-[#0A1E25]">{item.title}</h3>

          {/* Grid for License Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <InfoDisplay label="License Number" value={item.licenseNumber} />
            <InfoDisplay label="Expiration Date" value={item.expirationDate} />
            <InfoDisplay
              label="Supervising Provider (if applicable)"
              value={item.supervisingProvider}
            />
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
                  placeholder={attachment.placeholder}
                />
              ))}
            </div>
          </div>

          {/* Separator for multiple licenses */}
          {index !== LICENSE_DATA.length - 1 && (
            <hr className="border-[#D4CFCC] mt-8" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProviderLicense;
