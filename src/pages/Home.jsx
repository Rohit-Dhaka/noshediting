import { lazy, Suspense } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/sections/HeroSection";

const AboutSection = lazy(() => import("../components/sections/AboutSection"));
const PortfolioSection = lazy(() => import("../components/sections/PortfolioSection"));
const ServicesSection = lazy(() => import("../components/sections/ServicesSection"));
const VideoGallerySection = lazy(() => import("../components/sections/VideoGallerySection"));
const PricingSection = lazy(() => import("../components/sections/PricingSection"));
const ProcessSection = lazy(() => import("../components/sections/ProcessSection"));

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
          <PortfolioSection />
          <ServicesSection />
          <VideoGallerySection />
          <PricingSection />
          <ProcessSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Home;