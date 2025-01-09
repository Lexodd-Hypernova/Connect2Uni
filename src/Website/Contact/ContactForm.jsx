import React from 'react'
import './contact.css'

const ContactForm = () => {
  return (
    <div className='contact-form-container'>
        <div className="contact-form-img-con">
            <img src="https://i.imgur.com/6QXQq4C.png" />
        </div>
          <div className="contact-form-body">
            <p>Contact information</p>
            <h1>Let Us Guide You</h1>
            
        <div className='form-body'>
        <form>
        {/* Row for Email and Phone */}
        <div className="form-row">
          {/* Email */}
          <div className="form-group">
            <label>Your Email</label>
            <input type="text" placeholder="Your Email" />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Your Phone</label>
            <div className="phone-input">
              <select>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
                <option value="+92">+92</option>
                {/* Add more country codes */}
              </select>
              <input type="tel" placeholder="Your Phone" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Your Address</label>
          <input type="text" placeholder="Your Address" />
        </div>

        {/* Message */}
        <div className="form-group">
          <label>Message</label>
          <textarea placeholder="Write message"></textarea>
        </div>

        {/* Send Button */}
        <button type="submit" className="form-button">
          Send Message
        </button>
      </form>
      </div>
            
        </div>
    </div>
  )
}

export default ContactForm