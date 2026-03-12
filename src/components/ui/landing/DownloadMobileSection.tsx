import React from "react";
// Using your specified assets
// import downloadBg from "../../../assets/images/DownloadMobileBg.svg";
import mobilePhones from "../../../assets/images/Mobile.svg";

const DownloadMobileSection = () => {
  return (
    <section className="py-12 flex justify-center items-center w-full">
      {/* Background container with fixed height 338px
        Using relative positioning to allow the phone image to overflow.
      */}
      <div
        className="w-full max-w-[1440px] rounded-[32px] overflow-visible relative flex items-center"
        style={{
          height: "338px",
          //   backgroundImage: `url(${downloadBg})`,
          backgroundColor: "snow",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full flex items-center px-12 md:px-20">
          <div className="max-w-[480px] z-10">
            {/* Title with brand purple highlight */}
            <h2 className="text-[32px] md:text-[45px] font-bold text-[#0A1E25] leading-tight mb-4">
              Download Our <span className="text-[#705295]">Mobile App</span>
            </h2>

            <p className="text-[#666666] text-[16px] leading-relaxed mb-8">
              Get convenient access to care anytime, anywhere. Download our
              mobile app to connect with licensed providers, manage your
              requests, and receive updates on the go.
            </p>

            {/* App Store / Play Store Buttons */}
            <div className="flex items-center gap-4">
              <a href="#" className="transition-transform hover:scale-105">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  className="h-12"
                />
              </a>
              <a href="#" className="transition-transform hover:scale-105">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Phone image with fixed height 475px
          Positioned absolute with bottom-0 to allow it to "stand" on the bottom 
          and overflow upward beyond the 338px background.
        */}
        <div className="absolute right-10 -bottom-17  pointer-events-none hidden lg:block">
          <img
            src={mobilePhones}
            alt="InstaVisit Mobile App"
            style={{ height: "475px", width: "auto" }}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadMobileSection;
