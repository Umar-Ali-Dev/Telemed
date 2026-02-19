import { useForm } from "react-hook-form";
import { HiOutlinePaperClip } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import InputField from "../../../../components/ui/inputs/InputField";

const ChatInterface = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { chatMessage: "" },
  });

  const onSendMessage = (data: any) => {
    console.log("Message sent:", data.chatMessage);
    reset();
  };

  return (
    <div className="lg:col-span-4 h-full min-h-[650px] flex flex-col bg-white border border-gray-100 rounded-[25px] shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=100"
            className="w-10 h-10 rounded-full object-cover"
            alt="Avatar"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <p className="text-[14px] font-bold text-[#1A202C]">Alina Stars.</p>
          <p className="text-[11px] text-green-500 font-medium">Online</p>
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto bg-white no-scrollbar">
        <p className="text-center text-[#A3948C] text-[12px]">
          Sat May 10, 2025.
        </p>

        {/* Attachment Card Message */}
        <div className="flex flex-col gap-1 items-start">
          <div className="bg-[#F9F9F9] p-2 rounded-[15px] border border-gray-100 shadow-sm max-w-[210px]">
            <div className="rounded-[12px] overflow-hidden mb-2 h-[80px]">
              <img
                src="https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=300"
                className="w-full h-full object-cover"
                alt="Report"
              />
            </div>
            <p className="text-[12px] font-medium text-[#271100] px-1">
              myReport.jpeg
            </p>
          </div>
          <span className="text-[10px] text-gray-400 pl-1">01:30 pm</span>
        </div>
      </div>

      {/* Chat Input using your InputField component */}
      <form onSubmit={handleSubmit(onSendMessage)} className="p-4 bg-white">
        <div className="relative flex items-center gap-2 px-2 bg-white rounded-[20px]">
          <InputField
            label=""
            name="chatMessage"
            control={control}
            type="text"
            placeholder="Enter Message..."
            className="flex-1"
            height="h-[52px]" // Adjusted to match the rounded-20px look
          />

          {/* Absolute positioned actions to match UI */}
          <div className="absolute right-4 top-[10px] flex items-center gap-2">
            <button type="button" className="text-gray-400 hover:text-gray-600">
              <HiOutlinePaperClip size={20} />
            </button>
            <button
              type="submit"
              className="bg-[#705295] text-white p-2 rounded-xl hover:bg-[#5e447e] transition-transform active:scale-95"
            >
              <IoSend size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
