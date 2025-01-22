import React from 'react'
import GatewayToGlobalEducation from './GatewayToGlobalEducation/GatewayToGlobalEducation'
import Navbar from '../Navbar/Navbar'
import MobileNavbar from '../Navbar/MobileNavbar'
import FeatureSection from './FeatureSection/FeatureSection'
import OurTeams from './OurTeam/OurTeams'
import Sliders from './Sliders/Sliders'
import TestimonialCarousel from './Testimonials/TestimonialCarousel'
import ContactSection from './ContactSection/ContactSection'

const About = () => {
  return (
    <div>
        <Navbar />
        <MobileNavbar />
        <GatewayToGlobalEducation />
        <FeatureSection />
        <OurTeams />
        <Sliders />
        <TestimonialCarousel />
        <ContactSection />
    </div>
  )
}

export default About