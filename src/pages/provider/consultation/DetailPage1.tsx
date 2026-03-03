import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import SectionWrapper from "../../../components/ui/common/SectionWrapper";
import Heading from "../../../components/ui/headings/Heading";
import Button from "../../../components/ui/button/Button";
import ProfileCard from "../../../components/ui/cards/ProfileCard";
import Attachments from "../dashboard/profile-components/Attachments";
import {
  DUMMY_PATIENT_DATA,
  MEDICATION_DUMMY_DATA,
} from "../../../constants/commonData";

const DetailPage1: React.FC = () => {
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

  // Determine the base path to navigate to Page 2
  const getNextPath = () => {
    if (location.pathname.includes("/new-visits/")) {
      return `/provider/new-visits/${id}/details`;
    } else if (location.pathname.includes("/all-visits/")) {
      return `/provider/all-visits/${id}/details`;
    } else if (location.pathname.includes("/all-patients/")) {
      return `/provider/all-patients/${id}/details`;
    }
    return `/provider/new-visits/${id}/details`;
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

      <div className="space-y-8">
        {/* Personal Information */}
        <section>
          <h3 className="text-[20px] font-bold text-[#1A202C] mb-6">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <ProfileCard label="First Name" value={DUMMY_PATIENT_DATA.firstName} />
            <ProfileCard label="Last Name" value={DUMMY_PATIENT_DATA.lastName} />
            <ProfileCard label="Email Address" value={DUMMY_PATIENT_DATA.email} />
            <ProfileCard label="Date Of Birth" value={DUMMY_PATIENT_DATA.dob} />
            <ProfileCard label="Vitals" value={`Weight: 130lbs | Height: 5'6" | BMI: 23.0`} />
          </div>
        </section>

        {/* Patient Health Information */}
        <section>
          <h3 className="text-[20px] font-bold text-[#1A202C] mb-6">
            Patient Health Information
          </h3>
          <div className="space-y-4">
            <div className="bg-white border border-[#D4CFCC] rounded-[15px] p-4 shadow-sm">
              <span className="text-[14px] font-medium text-[#1A202C]">Past Medical Problems: </span>
              <span className="text-[14px] text-[#A3948C]">Asthma.</span>
            </div>
            <div className="bg-white border border-[#D4CFCC] rounded-[15px] p-4 shadow-sm">
              <span className="text-[14px] font-medium text-[#1A202C]">Current Medications: </span>
              <span className="text-[14px] text-[#A3948C]">
                {MEDICATION_DUMMY_DATA[0]?.name || "Zoloft"}.
              </span>
            </div>
            <div className="bg-white border border-[#D4CFCC] rounded-[15px] p-4 shadow-sm">
              <span className="text-[14px] font-medium text-[#1A202C]">Any Known Allergies: </span>
              <span className="text-[14px] text-[#A3948C]">
                Yes, Pollen allergy, Mold allergy, Seasonal allergy
              </span>
            </div>
            <div className="bg-white border border-[#D4CFCC] rounded-[15px] p-4 shadow-sm">
              <span className="text-[14px] font-medium text-[#1A202C]">
                Are you currently pregnant OR planning to become pregnant?:{" "}
              </span>
              <span className="text-[14px] text-[#A3948C]">Yes</span>
            </div>
            <div className="bg-white border border-[#D4CFCC] rounded-[15px] p-4 shadow-sm">
              <span className="text-[14px] font-medium text-[#1A202C]">
                Are you currently breastfeeding?:{" "}
              </span>
              <span className="text-[14px] text-[#A3948C]">Yes</span>
            </div>
          </div>
        </section>

        {/* Attachments - using existing component */}
        <section>
          <h3 className="text-[20px] font-bold text-[#1A202C] mb-6">
            Attachments
          </h3>
          <Attachments />
        </section>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-12">
        <Button
          label="Back"
          width="w-[120px]"
          bgColor="bg-transparent"
          textColor="text-[#A3948C]"
          className="hover:bg-gray-50 !font-bold"
          onClick={() => navigate(-1)}
        />
        <Button
          label="Next"
          width="w-[120px]"
          bgColor="bg-[#705295]"
          onClick={() => navigate(getNextPath())}
        />
      </div>
    </SectionWrapper>
  );
};

export default DetailPage1;
