import React from "react";
import { HiArrowRight } from "react-icons/hi";
import Heading from "../../ui/headings/Heading";

const RecommendedTreatments = () => {
  const treatments = [
    "UTI Treatment",
    "Acne Treatment",
    "Birth Control",
    "Hair Loss",
    "Pink Eye",
    "Erectile Dysfunction",
    "Sinus Infection",
    "Anxiety / Depression",
    "Yeast Infection",
    "Weight Los",
    "Medication Refill",
  ];

  return (
    // Updated padding to py-12 as requested
    <section className="py-12 text-center">
      {/* Section Header */}
      <div className="mb-10">
        <Heading
          title="Recommended Popular"
          highlightText="Treatments"
          textSize="text-[32px] md:text-[40px]"
          className="font-bold text-[#0A1E25]"
        />
        <p className="text-[#A3948C] text-[15px] mt-3">
          Explore commonly used treatments recommended by healthcare providers.
        </p>
      </div>

      {/* Treatments Grid */}
      <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
        {treatments.map((treatment, index) => (
          <button
            key={index}
            className="flex items-center gap-4 bg-white border border-gray-50 px-8 py-5 rounded-[20px] shadow-[0px_10px_30px_rgba(0,0,0,0.04)] hover:shadow-md transition-all group"
          >
            <span className="text-[18px] font-semibold text-[#4A5568] group-hover:text-[#705295] transition-colors">
              {treatment}
            </span>
            <HiArrowRight
              className="text-[#0A1E25] group-hover:text-[#705295] transition-all transform group-hover:translate-x-1"
              size={20}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default RecommendedTreatments;
