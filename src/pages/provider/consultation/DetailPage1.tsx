import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { HiFlag, HiOutlineFlag } from "react-icons/hi";
import toast from "react-hot-toast";

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

  // Determine if we are in a simple "Profile View" (where Next shouldn't show)
  const isPatientPath =
    location.pathname.includes("/all-patients/") ||
    location.pathname.includes("/flagged-patients/");

  // State for flagging logic
  const [isFlagged, setIsFlagged] = useState(
    location.pathname.includes("/flagged-patients/"),
  );

  // Dynamic Page Title based on Route
  const getPageTitle = () => {
    if (location.pathname.includes("/consultations/"))
      return "Consultation Detail";
    if (location.pathname.includes("/new-visits/")) return "Visits Detail";
    if (location.pathname.includes("/all-visits/")) return "All Visits Details";
    return "Patient Details";
  };

  /**
   * DYNAMIC REDIRECT LOGIC
   * Takes the current URL (e.g., /provider/new-visits/1)
   * and appends /details to reach the next step.
   */
  const handleNextNavigation = () => {
    const currentPath = location.pathname;
    // Check to ensure we don't accidentally double-append if the user clicks fast
    if (!currentPath.endsWith("/details")) {
      navigate(`${currentPath}/details`);
    }
  };

  const handleToggleFlag = () => {
    setIsFlagged(!isFlagged);
    toast.success(
      isFlagged ? "Patient unflagged" : "Patient flagged successfully",
    );
  };

  return (
    <SectionWrapper className="m-6">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeft size={20} className="text-[#271100]" />
            </button>
            <Heading
              title={getPageTitle()}
              textSize="text-[24px]"
              className="font-bold text-[#1A202C]"
            />
          </div>

          <button
            onClick={handleToggleFlag}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              isFlagged
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {isFlagged ? <HiFlag size={20} /> : <HiOutlineFlag size={20} />}
            <span className="font-semibold text-[14px]">
              {isFlagged ? "Flagged" : "Flag Patient"}
            </span>
          </button>
        </div>

        {/* Patient Profile Information */}
        <section className="space-y-6">
          <h3 className="text-[20px] font-bold text-[#1A202C]">
            Patient Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <ProfileCard
              label="First Name"
              value={DUMMY_PATIENT_DATA.firstName}
            />
            <ProfileCard
              label="Last Name"
              value={DUMMY_PATIENT_DATA.lastName}
            />
            <ProfileCard
              label="Email Address"
              value={DUMMY_PATIENT_DATA.email}
            />
            <ProfileCard
              label="Phone Number"
              value={DUMMY_PATIENT_DATA.phone}
            />
            <ProfileCard label="Date of Birth" value={DUMMY_PATIENT_DATA.dob} />
            <ProfileCard label="Gender" value={DUMMY_PATIENT_DATA.gender} />
            <ProfileCard label="Address" value={DUMMY_PATIENT_DATA.address} />
          </div>
        </section>

        {/* Medical History Section */}
        <section className="space-y-6">
          <h3 className="text-[20px] font-bold text-[#1A202C]">
            Medical History
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <ProfileCard
              label="Are you currently taking any medications?"
              value={MEDICATION_DUMMY_DATA[0]?.name || "None reported."}
            />
            <ProfileCard
              label="Any Known Allergies"
              value="Pollen, Mold, Seasonal"
            />
            <ProfileCard label="Currently pregnant or planning?" value="No" />
            <ProfileCard label="Currently breastfeeding?" value="No" />
          </div>
        </section>

        {/* Attachments Section */}
        <section className="space-y-6">
          <h3 className="text-[20px] font-bold text-[#1A202C]">Attachments</h3>
          <Attachments />
        </section>

        {/* Footer Navigation Buttons */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
          <Button
            label="Back"
            width="w-[120px]"
            bgColor="bg-white"
            textColor="text-[#A3948C]"
            className="border border-gray-200 hover:bg-gray-50 !font-bold"
            onClick={() => navigate(-1)}
          />

          {!isPatientPath && (
            <Button
              label="Next"
              width="w-[120px]"
              bgColor="bg-[#705295]"
              textColor="text-white"
              className="hover:opacity-90 !font-bold"
              onClick={handleNextNavigation}
            />
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default DetailPage1;
