import React from 'react'
import Navbar from '../Navbar/Navbar'
import MobileNavbar from '../Navbar/MobileNavbar'
import LandingPage from './LandingPage/LandingPage'
import GlobalEducation from './GlobalEducation/GlobalEducation'
import HomeCarousel from './HomeCarousel/HomeCarousel'

const Home = () => {
  return (
    <div>
        <Navbar />
        <MobileNavbar />
        <LandingPage />
        <GlobalEducation />
        <HomeCarousel />
    </div>
  )
}

export default Home