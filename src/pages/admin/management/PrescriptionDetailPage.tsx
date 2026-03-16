import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import PrescriptionDetails from "./PrescriptionDetails"; // Using your existing component
import { DUMMY_PRESCRIPTIONS } from "../../../constants/commonData";
import { FaArrowLeft } from "react-icons/fa";

const PrescriptionDetailPage = () => {
  const { id } = useParams(); // Extract ID from the URL
  const navigate = useNavigate();

  // Find the specific prescription record from your dummy data
  const prescriptionData = DUMMY_PRESCRIPTIONS.find((p) => String(p.id) === id);

  return (
    <SectionWrapper className="m-6">
      <div className="flex flex-col gap-6">
        {/* Navigation Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#0A1E25] flex items-center justify-center"
          >
            <FaArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#0A1E25]">
              Prescription Details
            </h1>
          </div>
        </div>

        <PrescriptionDetails data={prescriptionData} />
      </div>
    </SectionWrapper>
  );
};

export default PrescriptionDetailPage;
