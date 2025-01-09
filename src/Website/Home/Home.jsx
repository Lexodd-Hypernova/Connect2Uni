import React from 'react'
import Navbar from '../Navbar/Navbar'
import MobileNavbar from '../Navbar/MobileNavbar'
import LandingPage from './LandingPage/LandingPage'
import GlobalEducation from './GlobalEducation/GlobalEducation'

const Home = () => {
  return (
    <div>
        <Navbar />
        <MobileNavbar />
        <LandingPage />
        <GlobalEducation />
    </div>
  )
}

export default Home