import React from "react";
import { LuTrash2 } from "react-icons/lu";

interface State {
  id: number;
  name: string;
  code: string;
}

interface StateListProps {
  states: State[];
  setStates: React.Dispatch<React.SetStateAction<State[]>>;
}

const StateList: React.FC<StateListProps> = ({ states, setStates }) => {
  const handleDelete = (id: number) => {
    // Filter out the state by ID
    setStates((prev) => prev.filter((state) => state.id !== id));
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-[18px] font-bold text-[#0A1E25]">
          Existing States
        </h3>
        <span className="text-[13px] text-[#A3948C] font-medium">
          Total: {states.length}
        </span>
      </div>

      <div className="space-y-3">
        {states.length > 0 ? (
          states.map((state) => (
            <div
              key={state.id}
              className="flex items-center justify-between p-4 bg-white border border-[#D4CFCC] rounded-xl hover:shadow-sm transition-all group"
            >
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-[#0A1E25]">
                  {state.name}
                </span>
                <span className="text-[12px] text-[#A3948C] font-medium uppercase">
                  Code: {state.code}
                </span>
              </div>

              <button
                onClick={() => handleDelete(state.id)}
                className="p-2 text-[#A3948C] hover:text-[#EF4444] hover:bg-red-50 rounded-lg transition-colors"
                title="Remove State"
              >
                <LuTrash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="py-10 text-center border-2 border-dashed border-[#D4CFCC] rounded-xl">
            <p className="text-[#A3948C] text-[14px]">No states found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateList;
