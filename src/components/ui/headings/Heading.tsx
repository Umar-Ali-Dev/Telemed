import React from "react";

interface HeaderProps {
  title: string;
  highlightText?: string; // Prop for the text that needs the purple color
  className?: string;
  textSize?: string;
  textColor?: string;
  bg?: string;
}

const Heading: React.FC<HeaderProps> = ({
  title,
  highlightText,
  className,
  textSize = "text-[32px]",
  textColor = "text-[#0A1E25]",
  bg = "transparent",
}) => {
  return (
    <h1
      className={`${textSize} ${textColor} ${className || "font-semibold"} rounded-lg px-2 py-1`}
      style={{ backgroundColor: bg }}
    >
      {title}
      {highlightText && (
        <span className="text-[#705295] ml-2">{highlightText}</span>
      )}
    </h1>
  );
};

export default Heading;
