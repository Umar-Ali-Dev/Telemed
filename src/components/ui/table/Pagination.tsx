import { FaChevronDown } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRows: number;
  limit: number;
  onChangePage: (page: number) => void;
  onChangeLimit: (limit: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalRows,
  limit,
  onChangePage,
  onChangeLimit,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between w-full py-4 px-2 select-none mt-1">
      <div className="flex items-center gap-6">
        {/* Left Arrow Box (35px) */}
        <button
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-[35px] h-[35px] rounded-lg bg-white border border-gray-100 shadow-sm disabled:opacity-30 transition-all active:scale-95"
        >
          {/* Dynamic color: black (#271100) when clickable, else muted */}
          <HiArrowLeft
            className={currentPage === 1 ? "text-[#A3948C]" : "text-[#271100]"}
            size={18}
          />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-8">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onChangePage(p)}
              className={`transition-colors outline-none ${
                currentPage === p
                  ? "text-[#F76D00] text-[16px] font-semibold"
                  : "text-[#271100] text-[12px] font-normal hover:opacity-70"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Right Arrow Box (35px) */}
        <button
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-[35px] h-[35px] rounded-lg bg-white border border-gray-100 shadow-sm disabled:opacity-30 transition-all active:scale-95"
        >
          {/* Dynamic color: black (#271100) when clickable, else muted */}
          <HiArrowRight
            className={
              currentPage === totalPages ? "text-[#A3948C]" : "text-[#271100]"
            }
            size={18}
          />
        </button>

        {/* Range Text */}
        <span className="text-[#A3948C] text-[12px] font-normal ml-2">
          {limit * (currentPage - 1) + 1} -{" "}
          {Math.min(limit * currentPage, totalRows)} of {totalRows}
        </span>
      </div>

      {/* Rows per page Section */}
      <div className="flex items-center gap-3">
        <span className="text-[#A3948C] text-[14px] font-normal">
          Rows per page
        </span>
        <div className="relative">
          <select
            value={limit}
            onChange={(e) => onChangeLimit(Number(e.target.value))}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 pr-8 text-[14px] font-semibold text-[#271100] focus:outline-none focus:border-[#705295] cursor-pointer shadow-sm"
          >
            {[10, 20, 50].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <FaChevronDown
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A3948C] pointer-events-none"
            size={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
