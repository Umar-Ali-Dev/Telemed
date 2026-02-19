interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 px-4 text-[16px] whitespace-nowrap transition-all border-b-2 ${
            activeTab === tab
              ? "border-[#705295] text-[#705295] font-semibold"
              : "border-transparent text-[#666666] hover:text-gray-600 font-normal"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
