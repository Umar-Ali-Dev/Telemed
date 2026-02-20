import React from "react";

const ProviderInfo: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <section>
        <h3 className="text-[18px] font-bold text-[#0A1E25] mb-6">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div>
            <p className="text-[14px] text-gray-500 mb-1">First Name</p>
            <p className="text-[16px] font-medium text-[#1A202C]">Dr. Alina</p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Last Name</p>
            <p className="text-[16px] font-medium text-[#1A202C]">Star</p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Email Address</p>
            <p className="text-[16px] font-medium text-[#1A202C]">
              AlinaStar@gmail.com
            </p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Date Of Birth</p>
            <p className="text-[16px] font-medium text-[#1A202C]">09/23/2003</p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Phone Number</p>
            <p className="text-[16px] font-medium text-[#1A202C]">
              (876) 876 9876
            </p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">NPI Number</p>
            <p className="text-[16px] font-medium text-[#1A202C]">
              7824672836487234
            </p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Gender</p>
            <p className="text-[16px] font-medium text-[#1A202C]">Female</p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Address</p>
            <p className="text-[16px] font-medium text-[#1A202C]">
              72 Caisson Trace, Spanish Fort, AL, 732846, USA
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-[18px] font-bold text-[#0A1E25] mb-6">
          Specialties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div>
            <p className="text-[14px] text-gray-500 mb-1">
              Field of specialization
            </p>
            <p className="text-[16px] font-medium text-[#1A202C]">Cardiology</p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Sub-specialty</p>
            <p className="text-[16px] font-medium text-[#1A202C]">
              Electrophysiology
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-[18px] font-bold text-[#0A1E25] mb-6">
          Experience
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div>
            <p className="text-[14px] text-gray-500 mb-1">
              Years of Experience
            </p>
            <p className="text-[16px] font-medium text-[#1A202C]">5 years</p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Institute</p>
            <p className="text-[16px] font-medium text-[#1A202C]">
              California Research Institute
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProviderInfo;
