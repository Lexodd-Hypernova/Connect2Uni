import React from 'react'
import GatewayToGlobalEducation from './GatewayToGlobalEducation/GatewayToGlobalEducation'
import Navbar from '../Navbar/Navbar'
import MobileNavbar from '../Navbar/MobileNavbar'
import FeatureSection from './FeatureSection/FeatureSection'
import OurTeams from './OurTeam/OurTeams'
import Sliders from './Sliders/Sliders'

const About = () => {
  return (
    <div>
        <Navbar />
        <MobileNavbar />
        <GatewayToGlobalEducation />
        <FeatureSection />
        <OurTeams />
        <Sliders />
    </div>
  )
}

export default About