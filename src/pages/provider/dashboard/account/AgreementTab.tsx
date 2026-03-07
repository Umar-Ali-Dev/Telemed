import { FORM_LAYOUT_CLASS } from "../../../../constants/commonData";

export const AgreementTab = () => {
  // Static data based on reference
  const documents = [
    {
      date: "Dec 21, 2025 / 12:00:23 pm",
      name: "Agreement",
      previewUrl: "https://via.placeholder.com/150x100",
    },
    {
      date: "Dec 21, 2025 / 12:00:23 pm",
      name: "myReport.jpeg",
      previewUrl: "https://via.placeholder.com/150x100",
    },
  ];

  return (
    <div className={FORM_LAYOUT_CLASS}>
      <div className="flex flex-col gap-8">
        {documents.map((doc, index) => (
          <div key={index} className="flex flex-col gap-3">
            <span className="text-[14px] font-bold text-[#1A202C]">
              {doc.date}
            </span>
            <div className="w-[180px] bg-white border border-[#D4CFCC] rounded-[20px] p-2 shadow-sm">
              <div className="w-full h-[100px] bg-gray-100 rounded-[15px] overflow-hidden mb-2">
                <img
                  src={doc.previewUrl}
                  alt={doc.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[12px] text-[#A3948C] px-1">
                {doc.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
