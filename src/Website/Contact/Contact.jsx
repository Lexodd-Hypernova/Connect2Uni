import React from 'react'
import ContactCard from './ContactCard'
import Navbar from '../Navbar/Navbar'
import MobileNavbar from '../Navbar/MobileNavbar'
import ContactForm from './ContactForm'
import FAQ from './FAQ'

const Contact = () => {
  return (
    <div>
        <Navbar />
        <MobileNavbar />
        <ContactCard />
        <ContactForm />
        <FAQ />
    </div>
  )
}

export default Contact