import Heading from "../../../../components/ui/headings/Heading";
import { HiOutlineRefresh } from "react-icons/hi";

export const InfoCard = ({ icon, title, content }: any) => (
  <div className="bg-[#F9F9F9] rounded-2xl p-4 flex-1 border border-gray-50">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-gray-400">{icon}</span>
      <span className="text-[#A3948C] text-[14px] font-semibold">{title}</span>
    </div>
    <p className="text-[#271100] text-[14px] font-medium">{content}</p>
  </div>
);

export const PharmacySection = ({ address }: { address: string }) => (
  <div className="mt-6">
    <Heading
      title="User Selected Pharmacy"
      textSize="text-[16px]"
      className="mb-2 font-bold"
    />
    <div className="flex items-center justify-between bg-white border border-[#D4CFCC] rounded-xl p-1 pl-4">
      <span className="text-[#271100] text-[14px]">{address}</span>
      <button className="bg-[#705295] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
        <HiOutlineRefresh /> Update
      </button>
    </div>
  </div>
);
