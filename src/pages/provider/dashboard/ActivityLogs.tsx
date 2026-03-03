import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Heading from "../../../components/ui/headings/Heading";
import Pagination from "../../../components/ui/table/Pagination";
import { ACTIVITY_LOGS_DATA } from "../../../constants/commonData";

const ActivityLogs: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return ACTIVITY_LOGS_DATA.slice(startIndex, endIndex);
  }, [currentPage, rowsPerPage]);

  const totalPages = Math.ceil(ACTIVITY_LOGS_DATA.length / rowsPerPage);

  return (
    <SectionWrapper className="m-6 flex flex-col">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-[#0A1E25] hover:text-[#705295] transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>
        <Heading
          title="Activity Logs"
          textSize="text-[24px]"
          className="font-bold text-[#1A202C]"
        />
      </div>

      {/* Activity Logs List */}
      <div className="space-y-4 flex-1">
        {paginatedLogs.map((log, index) => (
          <div key={(currentPage - 1) * rowsPerPage + index} className="flex flex-col">
            <p className="text-[14px] text-[#1A202C] font-medium">
              {log.date} at {log.time}
            </p>
            <p className="text-[14px] text-[#A3948C] font-medium mt-1">
              {log.action}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <Pagination
          totalRows={ACTIVITY_LOGS_DATA.length}
          currentPage={currentPage}
          totalPages={totalPages}
          limit={rowsPerPage}
          onChangePage={(page) => setCurrentPage(page)}
          onChangeLimit={(limit) => {
            setRowsPerPage(limit);
            setCurrentPage(1);
          }}
        />
      </div>
    </SectionWrapper>
  );
};

export default ActivityLogs;
