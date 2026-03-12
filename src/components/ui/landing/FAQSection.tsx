import React, { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import Heading from "../../ui/headings/Heading";

const FAQCard = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div
    className="bg-white overflow-hidden transition-all duration-300 ease-in-out cursor-pointer mb-4"
    style={{
      boxShadow: "0px 4px 16px 0px #00000021",
      borderRadius: "15px",
    }}
    onClick={onClick}
  >
    {/* Header: Fixed min-height and consistent padding to prevent jumping */}
    <div className="px-6 md:px-8 h-[72px] flex items-center justify-between gap-4">
      <h3
        style={{
          fontFamily: "'Rubik', sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "1.2", // Increased slightly from 100% for vertical stability
          color: isOpen ? "#000000" : "#666666",
          transition: "color 0.3s ease",
        }}
      >
        {question}
      </h3>
      <div className="flex-shrink-0">
        {isOpen ? (
          <div className="border border-[#0A1E25] rounded p-0.5 text-[#0A1E25]">
            <HiMinus size={16} />
          </div>
        ) : (
          <div className="border border-[#D4CFCC] rounded p-0.5 text-[#D4CFCC]">
            <HiPlus size={16} />
          </div>
        )}
      </div>
    </div>

    {/* Answer Area: Using grid-template-rows for the smoothest height transition */}
    <div
      className={`grid transition-all duration-500 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        {/* Answer Padding: Standardized to match the visual gap in the image */}
        <div
          className="px-6 md:px-8 pb-6"
          style={{
            fontFamily: "'Rubik', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "1.5", // Standard readability
            color: "#666666",
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is InstaVisitRx?",
      answer:
        "InstaVisitRx refers to the use of digital technologies and the internet to provide healthcare services and information. It includes telemedicine, online visits, health information resources, and much more. Simply, it is a doctor on a click away!",
    },
    {
      question: "How do I Request an online visit?",
      answer:
        "You can request an online visit by logging into your patient dashboard, selecting 'New Visit', and following the guided steps to share your symptoms and medical history.",
    },
    {
      question: "What types of services are offered?",
      answer:
        "We offer asynchronous telehealth visits for various common conditions including UTI, Acne, Birth Control, and more.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use industry-standard encryption and security protocols to ensure your medical data and personal information are always protected and private.",
    },
    {
      question: "Can I access my medical records online?",
      answer:
        "Absolutely. Your visit summaries, prescriptions, and shared medical history are all available in your secure patient portal.",
    },
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <Heading
          title="Frequently Asked"
          highlightText="Questions"
          textSize="text-[32px] md:text-[40px]"
          className="font-bold text-[#0A1E25]"
        />
        <p className="text-[#A3948C] text-[15px] mt-2 max-w-2xl mx-auto">
          Explore commonly asked questions to better understand our platform,
          features, and care process.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {faqs.map((faq, index) => (
          <FAQCard
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
