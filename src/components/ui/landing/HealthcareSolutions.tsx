import React from "react";
import {
  FaUserMd,
  FaRegClock,
  FaShieldAlt,
  FaLayerGroup,
} from "react-icons/fa";
import Heading from "../../ui/headings/Heading";

// Sub-card for individual solution cards
const SolutionCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div
    className="bg-white p-8 flex flex-col items-center text-center transition-all hover:scale-[1.02]"
    style={{
      // Applying your exact shadow and radius
      boxShadow: "0px 4px 16px 0px #00000021",
      borderRadius: "20px",
    }}
  >
    {/* Icon Container */}
    <div className="w-16 h-16 bg-[#EBE5F1] rounded-2xl flex items-center justify-center mb-6">
      <div className="text-[#705295] text-2xl">{icon}</div>
    </div>
    <h3 className="text-[20px] font-bold text-[#0A1E25] mb-3">{title}</h3>
    <p className="text-[#A3948C] text-[15px] leading-relaxed max-w-[200px]">
      {description}
    </p>
  </div>
);

const HealthcareSolutions = () => {
  const solutions = [
    {
      title: "Certified Providers",
      description: "Verified Providers across multiple fields.",
      icon: <FaUserMd />,
    },
    {
      title: "24/7 Availability",
      description: "Healthcare support whenever you need it.",
      icon: <FaRegClock />,
    },
    {
      title: "Secure & Private",
      description: "Your medical data is always protected.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Easy & Accessible",
      description: "Request a visit in just a few clicks.",
      icon: <FaLayerGroup />,
    },
  ];

  return (
    <section className="py-12">
      {/* Section Header */}
      <div className="text-center mb-12">
        <Heading
          title="Explore Our Healthcare"
          highlightText="Solutions"
          textSize="text-[32px] md:text-[40px]"
          className="font-bold text-[#0A1E25]"
        />
        <p className="text-[#A3948C] text-[15px] mt-3">
          Find services created to make healthcare simple and accessible.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {solutions.map((item, index) => (
          <SolutionCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default HealthcareSolutions;
