import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface TruncatedCellProps {
  content: string | number;
  className?: string;
}

const TruncatedCell: React.FC<TruncatedCellProps> = ({
  content,
  className = "",
}) => {
  return (
    <Tippy
      content={String(content)}
      delay={0}
      duration={0}
      placement="top-start"
      interactive={true}
      theme="insta-purple" // Added custom theme name
    >
      {/* Removed cursor-help to hide the question mark */}
      <div className={`truncate w-full cursor-default ${className}`}>
        {content}
      </div>
    </Tippy>
  );
};

export default TruncatedCell;
