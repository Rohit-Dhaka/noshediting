import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import AboutSection from "../components/sections/AboutSection";
import HeroSection from "../components/sections/HeroSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import PricingSection from "../components/sections/PricingSection";
import ProcessSection from "../components/sections/ProcessSection";
import ServicesSection from "../components/sections/ServicesSection";
import VideoGallerySection from "../components/sections/VideoGallerySection";
import SEO from "../components/common/SEO";

const Home = () => {
  return (
    <>
    <SEO
  title="Professional Video Editing Agency"
  description="Nosh Infotech offers professional video editing services for Instagram Reels, YouTube videos, UGC content, brand advertisements and motion graphics."
  path="/"
  keywords={[
    "video editing agency",
    "professional video editing services",
    "reels editing services",
    "Instagram video editor",
    "YouTube video editing",
    "UGC video editing",
    "video editing for brands",
    "motion graphics services",
  ]}
/>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <VideoGallerySection />
        <PricingSection />
        <ProcessSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
