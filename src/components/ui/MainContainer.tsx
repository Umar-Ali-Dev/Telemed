import React from "react";

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MainContainer = ({ children, className = "" }: MainContainerProps) => {
  return (
    <div
      className={`max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
};

export default MainContainer;
