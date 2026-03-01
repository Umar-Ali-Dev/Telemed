import React from "react";

const EXPERIENCE_DATA = [
  {
    id: 1,
    title: "12 years - AIM institute",
    institute: "MBBS",
    from: "1 June, 2020",
    to: "1 May, 2021",
    doc: "MyDoc.pdf",
  },
  {
    id: 2,
    title: "12 years - AIM institute",
    institute: "MBBS",
    from: "1 June, 2020",
    to: "1 May, 2021",
    doc: "MyDoc.pdf",
  },
];

const ProviderExperience: React.FC = () => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {EXPERIENCE_DATA.map((item) => (
        <div key={item.id} className="space-y-4">
          <h4 className="text-[16px] font-bold text-[#0A1E25]">{item.title}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <p className="text-[14px] text-[#A3948C] mb-1">Institute</p>
              <p className="text-[15px] font-medium text-[#1A202C]">
                {item.institute}
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
            <div>
              <p className="text-[14px] text-[#A3948C] mb-1">From</p>
              <p className="text-[15px] font-medium text-[#1A202C]">
                {item.from}
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#A3948C] mb-1">To</p>
              <p className="text-[15px] font-medium text-[#1A202C]">
                {item.to}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProviderExperience;
