import React from "react";
import { useNavigate } from "react-router-dom";

interface NavigationCardProps {
  label: string;
  path: string;
  icon: string; // Placeholder image path
  badge?: number; // Optional badge count
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  label,
  path,
  icon,
  badge,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className="relative bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#705295] group"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-lg bg-[#EBE5F1] flex items-center justify-center overflow-hidden">
          <img
            src={icon}
            alt={label}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
            onError={(e) => {
              // Fallback to a placeholder if image fails to load
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect fill='%23EBE5F1' width='64' height='64'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23705295'%3E?%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <span className="text-sm font-medium text-[#0A1E25] group-hover:text-[#705295] transition-colors">
          {label}
        </span>
      </div>
      {badge && badge > 0 && (
        <span className="absolute top-2 right-2 bg-[#F76D00] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};

export default NavigationCard;
