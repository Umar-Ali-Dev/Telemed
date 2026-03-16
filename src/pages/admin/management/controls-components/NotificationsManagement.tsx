import { useState } from "react";

const NotificationsManagement = () => {
  const [emailNotify, setEmailNotify] = useState(true);
  const [pushNotify, setPushNotify] = useState(false);

  return (
    <div className="bg-white p-8 rounded-[20px] shadow-sm max-w-[450px] border border-gray-50">
      <h3 className="text-[20px] font-bold text-[#0A1E25] mb-2">
        Notifications Management
      </h3>
      <p className="text-[#A3948C] text-[14px] mb-8">
        Enable OR Disable Notifications
      </p>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold text-[#0A1E25]">
            Email Notifications
          </span>
          <button
            type="button"
            onClick={() => setEmailNotify(!emailNotify)}
            className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${emailNotify ? "bg-[#34C759]" : "bg-[#EFE9E6]"}`}
          >
            <div
              className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ${emailNotify ? "right-1" : "left-1"}`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold text-[#0A1E25]">
            Push Notifications
          </span>
          <button
            type="button"
            onClick={() => setPushNotify(!pushNotify)}
            className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${pushNotify ? "bg-[#34C759]" : "bg-[#EFE9E6]"}`}
          >
            <div
              className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ${pushNotify ? "right-1" : "left-1"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsManagement;
