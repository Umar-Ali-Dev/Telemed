import React from "react";

const EDUCATION_DATA = [
  {
    id: 1,
    title: "MBBS - AIOM University, UI - 2020.",
    cert: "MBBS",
    institute: "AIOM University, UI",
    year: "2020",
    doc: "MyDoc.pdf",
  },
  {
    id: 2,
    title: "MBBS - AIOM University, UI - 2020.",
    cert: "MBBS",
    institute: "AIOM University, UI",
    year: "2020",
    doc: "MyDoc.pdf",
  },
];

const ProviderEducation: React.FC = () => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {EDUCATION_DATA.map((item) => (
        <div key={item.id} className="space-y-4">
          <h4 className="text-[16px] font-bold text-[#0A1E25]">{item.title}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <p className="text-[14px] text-[#A3948C] mb-1">
                Certification name
              </p>
              <p className="text-[15px] font-medium text-[#1A202C]">
                {item.cert}
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#A3948C] mb-1">
                Institution name
              </p>
              <p className="text-[15px] font-medium text-[#1A202C]">
                {item.institute}
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#A3948C] mb-1">
                Year of certification
              </p>
              <p className="text-[15px] font-medium text-[#1A202C]">
                {item.year}
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#A3948C] mb-1">Attachment</p>
              <a
                href="#"
                className="text-[15px] font-medium text-[#34C759] hover:underline underline-offset-4"
              >
                {item.doc}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProviderEducation;
