import DownloadMobileSection from "../components/ui/landing/DownloadMobileSection";
import FAQSection from "../components/ui/landing/FAQSection";
import HealthcareSolutions from "../components/ui/landing/HealthcareSolutions";
import Hero from "../components/ui/landing/Hero";
import RecommendedTreatments from "../components/ui/landing/RecommendedTreatments";
import MainContainer from "../components/ui/MainContainer";

export default function LandingPage() {
  return (
    <div>
      <MainContainer>
        <Hero />
        <RecommendedTreatments />
        <HealthcareSolutions />
      </MainContainer>
      <DownloadMobileSection />
      <MainContainer>
        <FAQSection />
      </MainContainer>
    </div>
  );
}
