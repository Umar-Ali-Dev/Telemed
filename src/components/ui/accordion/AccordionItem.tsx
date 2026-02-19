import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

interface AccordionItemProps {
  question: string;
  answer?: string;
  defaultOpen?: boolean;
}

const AccordionItem = ({
  question,
  answer,
  defaultOpen = false,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left transition-colors hover:bg-gray-50"
      >
        <span className="text-[#1A202C] text-[16px] font-medium">
          {question}
        </span>
        {isOpen ? (
          <HiChevronUp className="text-gray-500" size={20} />
        ) : (
          <HiChevronDown className="text-gray-500" size={20} />
        )}
      </button>

      {isOpen && answer && (
        <div className="px-5 pb-5">
          <p className="text-[#1A202C] text-[14px] font-bold leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
