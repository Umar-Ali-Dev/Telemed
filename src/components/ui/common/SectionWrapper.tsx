import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  padding?: string;
}

const SectionWrapper = ({
  children,
  className = "",
  bg = "bg-[#FFFAF7]",
  padding = "p-8",
}: SectionWrapperProps) => {
  return (
    <div className={`${bg} ${padding} rounded-[20px] shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default SectionWrapper;
