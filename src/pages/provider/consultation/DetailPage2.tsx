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

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/new-visits/")) return "Visits Detail";
    if (path.includes("/all-visits/")) return "All Visits Details";
    if (path.includes("/all-patients/")) return "Patient Details";
    if (path.includes("/flagged-patients/")) return "Flagged Patient Details";
    if (path.includes("/admin/consultations/")) return "Consultation Details";
    if (path.includes("/admin/dashboard/")) return "Queue Request Details";

    return "Details";
  };

  // Logic to determine the parent list view based on the current URL
  const getMainListPage = () => {
    const path = location.pathname;

    // Provider Paths
    if (path.includes("/provider/new-visits/")) return "/provider/new-visits";
    if (path.includes("/provider/all-visits/")) return "/provider/all-visits";
    if (path.includes("/provider/all-patients/"))
      return "/provider/all-patients";
    if (path.includes("/provider/flagged-patients/"))
      return "/provider/flagged-patients";

    // Admin Paths
    if (path.includes("/admin/consultations/")) return "/admin/consultations";
    if (path.includes("/admin/dashboard/")) return "/admin/dashboard";

    return "/";
  };

  const pageTitle = getPageTitle();
  const mainListPath = getMainListPage();

  return (
    <SectionWrapper className="m-6">
      <div className="flex items-center gap-4 ">
        <button
          onClick={() => navigate(-1)}
          className="text-[#0A1E25] hover:text-[#705295] transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>
        <Heading
          title={pageTitle}
          textSize="text-[24px]"
          className="font-bold text-[#1A202C]"
        />
      </div>

      <VisitNote
        isVisitDetail={
          pageTitle === "Visits Detail" || pageTitle === "Consultation Details"
        }
      />

      <div className="flex justify-end gap-4 ">
        <Button
          label="Back"
          width="w-[120px]"
          bgColor="bg-transparent"
          textColor="text-[#A3948C]"
          className="hover:bg-gray-50 !font-bold"
          // Takes user back to the parent list
          onClick={() => navigate(mainListPath)}
        />
        <Button
          label="Send RX"
          width="w-[120px]"
          bgColor="bg-[#705295]"
          // Now correctly redirects to the main list (e.g., /provider/all-patients)
          onClick={() => navigate(mainListPath)}
        />
      </div>
    </SectionWrapper>
  );
};

export default DetailPage2;
