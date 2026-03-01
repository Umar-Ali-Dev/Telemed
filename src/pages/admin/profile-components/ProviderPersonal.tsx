import React from "react";
import { LuPencil } from "react-icons/lu";

const ProviderPersonal: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <section>
        <h3 className="text-[18px] font-bold text-[#0A1E25] mb-6">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div>
            <p className="text-[14px] text-[#A3948C] mb-1">First Name</p>
            <p className="text-[16px] font-medium text-[#1A202C]">Dr. Alina</p>
          </div>
          <div>
            <p className="text-[14px] text-[#A3948C] mb-1">Last Name</p>
            <p className="text-[16px] font-medium text-[#1A202C]">Star</p>
          </div>
          <div>
            <p className="text-[14px] text-[#A3948C] mb-1">Email Address</p>
            <p className="text-[16px] font-medium text-[#1A202C]">
              alinastar@gmail.com
            </p>
          </div>
          <div>
            <p className="text-[14px] text-[#A3948C] mb-1">NPI Number</p>
            <p className="text-[16px] font-medium text-[#1A202C]">837264723</p>
          </div>
          <div>
            <p className="text-[14px] text-[#A3948C] mb-1">Phone Number</p>
            <p className="text-[16px] font-medium text-[#1A202C]">
              (876) 876 9876
            </p>
          </div>
          <div>
            <p className="text-[14px] text-[#A3948C] mb-1">Address</p>
            <p className="text-[16px] font-medium text-[#1A202C]">
              72 Caisson Trace, Spanish Fort, AL, 732846, USA
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-6">
          <h3 className="text-[18px] font-bold text-[#0A1E25]">
            Assigned State
          </h3>
          <button className="flex items-center gap-1.5 text-[#A3948C] hover:text-[#705295] text-[14px] font-medium transition-colors">
            <LuPencil size={14} /> Edit Assigned State
          </button>
        </div>
        <div>
          <p className="text-[14px] text-[#A3948C] mb-1">State</p>
          <p className="text-[16px] font-medium text-[#1A202C]">LA</p>
        </div>
      </section>
    </div>
  );
};

export default ProviderPersonal;
