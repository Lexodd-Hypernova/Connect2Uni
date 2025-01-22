import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import { FaAppStore } from "react-icons/fa";


import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <div className='footer-container'>
        <div className="footer-up-section">
            <div className="footer-heading">
                <h1>Your Gateway to Global <br /> Education</h1>
                <h3>Simplify your study abroad journey <br /> with our comprehensive platform</h3>
            </div>
            <div className="footer-navigation">
                <span className='footer-navlinks footer-navlinks-up'>Navigation</span>
                <span className='footer-navlinks footer-navlinks-down'>Home</span>
                <span className='footer-navlinks footer-navlinks-down'>About Us</span>
                <span className='footer-navlinks footer-navlinks-down'>Services</span>
                <span className='footer-navlinks footer-navlinks-down'>Contact Us</span>
                <span className='footer-navlinks footer-navlinks-down'>Visa</span>
            </div>
            <div className="footer-get-the-app">
                <span className='footer-navlinks footer-navlinks-up'>
                    Get the app
                </span>
                
                <span className='icons-arrange i-m--ar'> 
                    <IoLogoAndroid/> 
                    Android
                </span>

                <span className='icons-arrange i-m--as'>
                    <FaAppStore/>
                    App Store
                </span>

            </div>
            <div className="footer-address">
                <span>
                    <img src="" alt="" />
                    Random address, amet consectetur. <br />
                    Consequatur quaerat fugit, sapiente officia .
                </span>
            </div>
        </div>
        <div className="footer-social-icons">
           <span className='footer-social-icons-span'>
            <FaFacebook size={30} />
            </span>
           <span className='footer-social-icons-span'>
            <FaInstagram size={30} />
            </span>
           <span className='footer-social-icons-span'>
            <FaXTwitter size={30} />
            </span>
           <span className='footer-social-icons-span'>
            <FaLinkedin size={30} />
            </span>
           
        </div>
        <div className="footer-down-section">
            <p> &copy; {currentYear} Connect2Uni</p>
            <p> Terms of Service</p>
            <p> Privacy Policy</p>
        </div>
    </div>
  )
}

export default Footer