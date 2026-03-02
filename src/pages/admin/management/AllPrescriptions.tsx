import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Heading from "../../../components/ui/headings/Heading";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import SearchInput from "../../../components/ui/inputs/SearchInput";
import Pagination from "../../../components/ui/table/Pagination";
import PrescriptionDetails from "./PrescriptionDetails";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import {
  ALL_PRESCRIPTIONS_COLUMNS,
  DUMMY_PRESCRIPTIONS,
} from "../../../constants/commonData";
import Modal from "../../../components/ui/modals/Modal";

const AllPrescriptions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);

  const handleViewDetails = (id: any) => {
    const details = DUMMY_PRESCRIPTIONS.find((p) => p.id === id);
    setSelectedPrescription(details);
    setIsModalOpen(true);
  };

  const filteredData = DUMMY_PRESCRIPTIONS.filter((item) =>
    item.patientName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SectionWrapper padding="p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Heading
            title="All Prescriptions"
            textSize="text-[24px]"
            className="font-bold text-[#0A1E25]"
          />
          <SearchInput
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="Patient name"
            className="w-[300px]"
          />
        </div>

        <div className="rounded-xl overflow-hidden border border-[#D4CFCC] bg-white">
          <DataTable
            columns={ALL_PRESCRIPTIONS_COLUMNS(handleViewDetails)}
            data={filteredData}
            customStyles={commonTableStyles}
            onRowClicked={(row) => handleViewDetails(row.id)}
            responsive
            highlightOnHover
            pointerOnHover
          />
        </div>

        <Pagination
          totalRows={filteredData.length}
          currentPage={1}
          totalPages={Math.ceil(filteredData.length / 10)}
          limit={10}
          onChangePage={() => {}}
          onChangeLimit={() => {}}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Prescription Details"
        width="max-w-4xl"
      >
        <PrescriptionDetails data={selectedPrescription} />
      </Modal>
    </SectionWrapper>
  );
};

export default AllPrescriptions;
