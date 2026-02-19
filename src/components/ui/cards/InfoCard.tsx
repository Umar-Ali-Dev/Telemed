interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const InfoCard = ({ icon, title, content }: InfoCardProps) => {
  return (
    <div className="bg-[#F9F9F9] rounded-[15px] p-5 flex-1 border border-gray-50 shadow-[0px_10px_25px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0px_12px_30px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#A3948C] flex-shrink-0">{icon}</span>
        <span className="text-[#A3948C] text-[14px] font-semibold tracking-tight">
          {title}
        </span>
      </div>
      <p className="text-[#271100] text-[15px] font-medium leading-relaxed">
        {content}
      </p>
    </div>
  );
};

export default InfoCard;
