import React from "react";

const ProviderSpeciality: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-[18px] font-bold text-[#0A1E25]">Speciality</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <div>
          <p className="text-[14px] text-[#A3948C] mb-1">
            Field of specialization
          </p>
          <p className="text-[16px] font-medium text-[#1A202C]">
            Cardiology, Medical Specialist
          </p>
        </div>
        <div>
          <p className="text-[14px] text-[#A3948C] mb-1">Sub-specialty</p>
          <p className="text-[16px] font-medium text-[#1A202C]">
            ABC, XYZ, MLN
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProviderSpeciality;
