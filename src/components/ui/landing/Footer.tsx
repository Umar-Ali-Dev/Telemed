import React from "react";
import MainContainer from "../MainContainer";
import instaVisitLogo from "../../../assets/icons/instaVisit.svg";
// Asset Imports
import legitBadge from "../../../assets/icons/Legit.svg";
import tiktokIcon from "../../../assets/icons/tiktok-circle-icon 1.svg";
import xIcon from "../../../assets/icons/X.svg";
import instagramIcon from "../../../assets/icons/instagram-new-2022-seeklogo 1.svg";
import linkedinIcon from "../../../assets/icons/linkedin-new-2020-seeklogo 1.svg";
import facebookIcon from "../../../assets/icons/facebook-new-2019-seeklogo-3 1.svg";

const Footer = () => {
  const socials = [
    { src: tiktokIcon, alt: "TikTok" },
    { src: xIcon, alt: "X" },
    { src: instagramIcon, alt: "Instagram" },
    { src: linkedinIcon, alt: "LinkedIn" },
    { src: facebookIcon, alt: "Facebook" },
  ];

  return (
    <footer className="w-full bg-[#FFF9F5] pt-12 pb-6 ">
      <MainContainer>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <img src={instaVisitLogo} alt="Logo" className="h-auto w-auto" />

          <div className="flex items-center gap-6">
            <img
              src={legitBadge}
              alt="LegitScript Certified"
              className="h-14 w-auto"
            />
            <div className="h-10 w-[1px] bg-gray-200 hidden md:block" />
            <div className="flex items-center gap-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={social.src}
                    alt={social.alt}
                    className="w-8 h-8 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#666666]">
            © 2026 LLC. Licensed to InstaVisitRX LLC for use on{" "}
            <span className="text-[#705295] font-semibold">
              InstaVisitRX.com
            </span>
            . All rights reserved.
          </p>
          <a href="#" className="text-[13px] text-[#666666] hover:underline">
            Privacy Policy
          </a>
        </div>
      </MainContainer>
    </footer>
  );
};

export default Footer;
