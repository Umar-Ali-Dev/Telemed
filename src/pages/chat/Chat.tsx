import React from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import SectionWrapper from "../../components/ui/common/SectionWrapper";

const Chat: React.FC = () => {
  return (
    <SectionWrapper className="flex  gap-5 min-h-[calc(100vh-200px)]">
      <ChatSidebar />
      <ChatWindow />
    </SectionWrapper>
  );
};

export default Chat;
