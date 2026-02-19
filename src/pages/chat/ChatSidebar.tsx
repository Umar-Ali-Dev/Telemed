import React, { useState } from "react";
import SearchInput from "../../components/ui/inputs/SearchInput";

const ChatSidebar: React.FC = () => {
  const [search, setSearch] = useState("");

  const contacts = [
    {
      id: 1,
      name: "John Doe",
      lastMsg: "Ureaplasma",
      time: "4:55 pm",
      active: true,
    },
    { id: 2, name: "John Doe", lastMsg: "Flu (Influenza)", time: "4:55 pm" },
    { id: 3, name: "John Doe", lastMsg: "Sinus infection", time: "4:55 pm" },
    { id: 4, name: "John Doe", lastMsg: "Weight loss", time: "4:55 pm" },
  ];

  return (
    <div className="w-1/3 flex flex-col gap-4">
      <SearchInput
        value={search}
        onChange={(val) => setSearch(val)}
        placeholder="Search doctor"
        className="!min-w-0"
      />
      <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center justify-between p-4 rounded-[15px] border transition-all cursor-pointer ${
              contact.active
                ? "bg-[#705295]/10 border-[#705295]/20"
                : "bg-white border-[#D4CFCC]/40 hover:border-[#705295]/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=50&h=50&fit=crop"
                className="w-12 h-12 rounded-full object-cover border border-gray-100"
                alt="profile"
              />
              <div>
                <h4 className="font-bold text-[#271100] text-[15px]">
                  {contact.name}
                </h4>
                <p className="text-[#999999] text-[13px]">{contact.lastMsg}</p>
              </div>
            </div>
            <span className="text-[#999999] text-[12px] self-start">
              {contact.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
