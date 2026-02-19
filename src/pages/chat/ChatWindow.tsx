import React from "react";
import { HiOutlinePaperClip } from "react-icons/hi";
import { IoSend } from "react-icons/io5";

const ChatWindow: React.FC = () => {
  return (
    <div className="flex-1 bg-white border border-[#D4CFCC]/30 rounded-[20px] flex flex-col overflow-hidden shadow-sm">
      {/* Chat Header */}
      <div className="p-5 border-b border-[#D4CFCC]/30 flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop"
          className="w-10 h-10 rounded-full object-cover"
          alt="active user"
        />
        <div>
          <h3 className="font-bold text-[#271100]">John Doe</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#4ADE80] rounded-full border border-white"></span>
            <span className="text-[12px] text-[#999999] font-medium">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#F9F9F9]/30 space-y-8 flex flex-col">
        <span className="self-center text-[12px] text-[#999999] bg-white px-3 py-1 rounded-full border border-[#D4CFCC]/20 shadow-sm">
          Sat Jan 10, 2026
        </span>

        {/* Doctor Message */}
        <div className="self-end max-w-[70%]">
          <div className="bg-[#705295]/15 text-[#271100] p-4 rounded-t-[18px] rounded-bl-[18px] text-[14px] leading-relaxed">
            This is a message sent by the doctor. Lorem ipsum dolor sit amet.
          </div>
          <span className="text-[11px] text-[#999999] mt-1 block text-right">
            01:30 pm
          </span>
        </div>

        {/* Patient Message */}
        <div className="self-start max-w-[70%]">
          <div className="bg-[#FBE8E0] text-[#271100] p-4 rounded-t-[18px] rounded-br-[18px] text-[14px] leading-relaxed">
            This is a message sent by the user. Lorem ipsum dolor sit amet.
          </div>
          <span className="text-[11px] text-[#999999] mt-1 block">
            01:30 pm
          </span>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-5 bg-white border-t border-[#D4CFCC]/30 flex items-center gap-4">
        <div className="flex-1 flex items-center bg-white border border-[#D4CFCC] rounded-[15px] px-4 py-3 gap-3">
          <input
            type="text"
            placeholder="Enter Message..."
            className="flex-1 outline-none text-[14px] text-[#271100] placeholder-[#999999]"
          />
          <button className="text-[#999999] hover:text-[#705295] transition-colors">
            <HiOutlinePaperClip size={22} />
          </button>
        </div>
        <button className="w-[48px] h-[48px] bg-[#705295] text-white rounded-[15px] flex items-center justify-center shadow-lg active:scale-95 transition-all">
          <IoSend size={20} className="rotate-[-25deg]" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
