import React from "react";
import SectionWrapper from "../../components/ui/common/SectionWrapper";
import Heading from "../../components/ui/headings/Heading";
import { HiOutlineChevronRight } from "react-icons/hi";
import { NOTIFICATION_DATA } from "../../constants/commonData";

const Notifications: React.FC = () => {
  return (
    <SectionWrapper>
      <div className="space-y-10">
        <Heading
          title="Notifications"
          textSize="text-[24px]"
          className="font-bold mb-6 text-[#1A202C]"
        />

        {NOTIFICATION_DATA.map((group, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-[16px] font-bold text-[#1A202C]">
              {group.date}
            </h3>

            <SectionWrapper
              padding="p-0"
              className="overflow-hidden border border-[#D4CFCC]/40 rounded-[15px] bg-white shadow-sm"
            >
              <div className="flex flex-col">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-5 transition-colors hover:bg-gray-50/50 cursor-pointer ${
                      itemIndex !== group.items.length - 1
                        ? "border-b border-[#D4CFCC]/20"
                        : ""
                    }`}
                  >
                    <p className="text-[14px] text-[#A3948C] font-normal leading-relaxed max-w-[85%]">
                      {item.text}
                    </p>

                    <button className="flex items-center gap-1 text-[#705295] text-[14px] font-semibold hover:underline group">
                      View
                      <HiOutlineChevronRight
                        className="transition-transform group-hover:translate-x-1"
                        size={18}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Notifications;
