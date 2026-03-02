import Pagination from "../../../../components/ui/table/Pagination";

const StateManagement = () => {
  const states = [
    { name: "Alabama", active: true },
    { name: "Alaska", active: true },
    { name: "Arizona", active: true },
    { name: "Arkansas", active: true },
    { name: "California", active: true },
    { name: "Colorado", active: false },
    { name: "Connecticut", active: true },
    { name: "Delaware", active: true },
    { name: "Florida", active: false },
    { name: "Georgia", active: true },
    { name: "Hawaii", active: true },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {states.map((state, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white border border-[#D4CFCC] rounded-2xl hover:border-[#705295] transition-all group"
          >
            <span className="text-[14px] font-bold text-[#0A1E25]">
              {state.name}
            </span>
            <button
              type="button"
              className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${state.active ? "bg-[#34C759]" : "bg-[#717171]"}`}
            >
              <div
                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ${state.active ? "right-1" : "left-1"}`}
              />
            </button>
          </div>
        ))}
      </div>

      <Pagination
        totalRows={50}
        currentPage={1}
        totalPages={8}
        limit={10}
        onChangePage={() => {}}
        onChangeLimit={() => {}}
      />
    </div>
  );
};

export default StateManagement;
