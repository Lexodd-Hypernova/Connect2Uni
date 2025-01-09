import React from 'react'
import './contact.css'

const ContactCard = () => {
  return (
    <div className='contact-card-container'>
      <div className='contact-card-pri-hed'>
       <h1>Contact</h1> 
      </div>
      <div className='contact-card-body'>
        <h1>
            Need Help? <br />
            We're Here for You!
        </h1>
        <p>
            Have a question or need assistance? <br />
            Contact us today.
        </p>
      </div>
    </div>
  )
}

export default ContactCard