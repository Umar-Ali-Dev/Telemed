import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Heading from "../../../components/ui/headings/Heading";
import Button from "../../../components/ui/button/Button";
import VisitNote from "../dashboard/profile-components/VisitNote";

const DetailPage2: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Determine the page title based on route
  const getPageTitle = () => {
    if (location.pathname.includes("/new-visits/")) {
      return "New Visits Details";
    } else if (location.pathname.includes("/all-visits/")) {
      return "All Visits Details";
    } else if (location.pathname.includes("/all-patients/")) {
      return "Patient Details";
    }
    return "Details";
  };

  // Determine the base path to go back to Page 1
  const getBasePath = () => {
    if (location.pathname.includes("/new-visits/")) {
      return `/provider/new-visits/${id}`;
    } else if (location.pathname.includes("/all-visits/")) {
      return `/provider/all-visits/${id}`;
    } else if (location.pathname.includes("/all-patients/")) {
      return `/provider/all-patients/${id}`;
    }
    return `/provider/new-visits/${id}`;
  };

  return (
    <SectionWrapper className="m-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-[#0A1E25] hover:text-[#705295] transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>
        <Heading
          title={getPageTitle()}
          textSize="text-[24px]"
          className="font-bold text-[#1A202C]"
        />
      </div>

      {/* Visit Note - includes Condition & Symptoms, Medications Needed, Vitals, Pharmacy, Progress Note, Prescriptions, and Chat */}
      <VisitNote />

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-12">
        <Button
          label="Back"
          width="w-[120px]"
          bgColor="bg-transparent"
          textColor="text-[#A3948C]"
          className="hover:bg-gray-50 !font-bold"
          onClick={() => navigate(getBasePath())}
        />
        <Button
          label="Next"
          width="w-[120px]"
          bgColor="bg-[#705295]"
        />
      </div>
    </SectionWrapper>
  );
};

export default DetailPage2;
