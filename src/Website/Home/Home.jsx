import React from 'react'
import Navbar from '../Navbar/Navbar'
import MobileNavbar from '../Navbar/MobileNavbar'
import LandingPage from './LandingPage/LandingPage'
import GlobalEducation from './GlobalEducation/GlobalEducation'
import HomeCarousel from './HomeCarousel/HomeCarousel'
import Footer from '../Footer/Footer'
import WhyChooseUs from './WhyChooseUs/WhyChooseUs'

const Home = () => {
  return (
    <div>
        <Navbar />
        <MobileNavbar />
        <LandingPage />
        <GlobalEducation />
        <HomeCarousel />
        <WhyChooseUs />
        <Footer />
    </div>
  )
}

export default Home