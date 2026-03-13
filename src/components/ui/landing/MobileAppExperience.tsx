import React from "react";
// Using your specified assets
import downloadBg from "../../../assets/images/DownloadMobileBg.svg";
import mobilePhones from "../../../assets/images/Mobile.svg";

const MobileAppExperience = () => {
  return (
    <section className="py-12 flex justify-center items-center w-full">
      <div
        className="w-full max-w-[1440px] rounded-[20px] overflow-hidden relative flex items-center bg-no-repeat bg-cover bg-center"
        style={{
          height: "542px", // Specific BG height
          backgroundImage: `url("${downloadBg}")`,
          backgroundColor: "#FFF9F5",
        }}
      >
        <div className="w-full h-full flex items-center px-12 md:px-24">
          <div className="max-w-[500px] z-10">
            {/* Header Text */}
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0A1E25] leading-tight mb-4">
              For Better Experience <br />
              Download our <span className="text-[#705295]">Mobile App</span>
            </h2>

            <p className="text-[#666666] text-[18px] leading-relaxed mb-10">
              Easily request asynchronous telehealth visits, share your health
              concerns, and get professional medical guidance from trusted
              providers.
            </p>

            {/* Store Buttons */}
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="w-fit transition-transform hover:scale-105 active:scale-95"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  className="h-[55px]"
                />
              </a>
              <a
                href="#"
                className="w-fit transition-transform hover:scale-105 active:scale-95"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-[55px]"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Phone image with fixed height 375px */}
        <div className="absolute right-12 md:right-24 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          <img
            src={mobilePhones}
            alt="InstaVisit Mobile App"
            style={{ height: "375px", width: "auto" }}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default MobileAppExperience;
