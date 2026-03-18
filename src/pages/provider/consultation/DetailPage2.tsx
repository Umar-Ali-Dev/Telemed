import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Heading from "../../../components/ui/headings/Heading";
import Button from "../../../components/ui/button/Button";
import VisitNote from "../dashboard/profile-components/VisitNote";
import toast from "react-hot-toast";

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
    if (path.includes("/consultations/")) return "Consultation Details";

    return "Details";
  };

  /**
   * BASE ROUTE DETECTION
   * This identifies the "Home" list for the current flow.
   */
  const getMainListPage = () => {
    const path = location.pathname;

    // Provider Paths
    if (path.includes("/provider/new-visits/")) return "/provider/new-visits";
    if (path.includes("/provider/all-visits/")) return "/provider/all-visits";
    if (path.includes("/provider/all-patients/"))
      return "/provider/all-patients";
    if (path.includes("/provider/flagged-patients/"))
      return "/provider/flagged-patients";
    if (path.includes("/provider/consultations/"))
      return "/provider/consultations";

    // Admin Paths
    if (path.includes("/admin/consultations/")) return "/admin/consultations";
    if (path.includes("/admin/dashboard/")) return "/admin/dashboard";

    return "/provider/dashboard"; // Fallback
  };

  const pageTitle = getPageTitle();
  const mainListPath = getMainListPage();

  const handleSendRX = () => {
    // Perform your logic here (API calls, etc.)
    toast.success("Prescription sent successfully");

    // Redirect back to the BASE ROUTE (e.g., /provider/new-visits)
    navigate(mainListPath);
  };

  return (
    <SectionWrapper className="m-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#0A1E25]"
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
          pageTitle === "Visits Detail" ||
          pageTitle === "Consultation Details" ||
          pageTitle === "Queue Request Details"
        }
      />

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-gray-100">
        <Button
          label="Back"
          width="w-[120px]"
          bgColor="bg-transparent"
          textColor="text-[#A3948C]"
          className="border border-gray-200 hover:bg-gray-50 !font-bold"
          // Takes user back to DetailPage1
          onClick={() => navigate(-1)}
        />
        <Button
          label="Send RX"
          width="w-[160px]"
          bgColor="bg-[#705295]"
          textColor="text-white"
          className="hover:opacity-90 !font-bold"
          // Redirects back to the main list (e.g. New Visits)
          onClick={handleSendRX}
        />
      </div>
    </SectionWrapper>
  );
};

export default DetailPage2;
