import { HiOutlineDownload } from "react-icons/hi";

interface AttachmentCardProps {
  name: string;
  url: string;
  onDownload?: () => void;
}

const AttachmentCard = ({ name, url, onDownload }: AttachmentCardProps) => {
  return (
    <div
      className="bg-[#F9F9F9] rounded-[15px] p-2 shadow-sm border border-gray-50 flex flex-col items-center justify-between"
      style={{ width: "170px", height: "113px" }}
    >
      {/* Image Container with Fixed Size */}
      <div
        className="rounded-[15px] overflow-hidden bg-gray-200 flex-shrink-0 mt-0.5"
        style={{ width: "160px", height: "70px" }}
      >
        <img
          src={url}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* File Info & Download Action */}
      <div className="flex items-center justify-between w-full px-1 mb-1">
        <span className="text-[#271100] text-[12px] font-medium truncate max-w-[120px]">
          {name}
        </span>
        <button
          onClick={onDownload}
          className="text-[#705295] hover:bg-purple-100/50 p-1 rounded-md transition-colors flex-shrink-0"
        >
          <HiOutlineDownload size={18} />
        </button>
      </div>
    </div>
  );
};

export default AttachmentCard;
