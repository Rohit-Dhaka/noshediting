import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"
import AboutSection from "../components/sections/AboutSection"
import HeroSection from "../components/sections/HeroSection"
import PortfolioSection from "../components/sections/PortfolioSection"
import PricingSection from "../components/sections/PricingSection"
import ProcessSection from "../components/sections/ProcessSection"
import ServicesSection from "../components/sections/ServicesSection"


const Home = () => {
  return (
    <>
    <Navbar/>
    <main>
        <HeroSection/>
        <AboutSection/>
        <PortfolioSection/>
        <ServicesSection/>
        <PricingSection/>
        <ProcessSection/>

    </main>
    <Footer/>
    </>
  )
}

export default Home