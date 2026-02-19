import ProfileCard from "../../../../components/ui/cards/ProfileCard";

interface PatientDataContentProps {
  data: any;
}

const PatientDataContent = ({ data }: PatientDataContentProps) => {
  return (
    <div className="space-y-12">
      {/* Personal Information */}
      <section>
        <h3 className="text-[20px] font-bold text-[#1A202C] mb-6">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <ProfileCard label="First Name" value={data.firstName} />
          <ProfileCard label="Last Name" value={data.lastName} />
          <ProfileCard label="Email Address" value={data.email} />
          <ProfileCard label="Date Of Birth" value={data.dob} />
          <ProfileCard label="Phone Number" value={data.phone} />
          <ProfileCard label="Address" value={data.address} />
        </div>
      </section>

      {/* Health Equity Info */}
      <section>
        <h3 className="text-[20px] font-bold text-[#1A202C] mb-6">
          Health Equity Info.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <ProfileCard label="Age" value={`${data.age} years`} />
          <ProfileCard label="Height" value={data.height} />
          <ProfileCard label="Weight" value={`${data.weight} lbs`} />
          <ProfileCard label="BMI" value={data.bmi} />
          <ProfileCard label="Birth Gender" value={data.birthGender} />
          <ProfileCard label="Current Gender" value={data.currentGender} />
          <ProfileCard label="Race" value={data.race} />
          <ProfileCard label="Ethnicity" value={data.ethnicity} />
          <ProfileCard label="Pronouns" value={data.pronouns} />
          <ProfileCard label="Orientation" value={data.orientation} />
        </div>
      </section>
    </div>
  );
};

export default PatientDataContent;
