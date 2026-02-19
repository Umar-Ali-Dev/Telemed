import AttachmentCard from "../../../../components/ui/cards/AttachmentCard";
import { ATTACHMENTS_DATA } from "../../../../constants/commonData";

const Attachments = () => {
  return (
    <div className="mt-6 space-y-10">
      {ATTACHMENTS_DATA.map((group, idx) => (
        <div key={idx} className="space-y-4">
          {/* Group Heading (e.g., Dec 21, 2025) */}
          <h4 className="text-[18px] font-bold text-[#1A202C]">{group.date}</h4>

          {/* Responsive Flex Grid */}
          <div className="flex flex-wrap gap-6">
            {group.files.map((file) => (
              <AttachmentCard
                key={file.id}
                name={file.name}
                url={file.url}
                onDownload={() => console.log(`Downloading ${file.name}`)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Attachments;
