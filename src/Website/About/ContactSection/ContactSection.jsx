// ContactSection.js
import React from "react";
import "./style.css";

const ContactSection = () => {
    return (
        <div className="contact-section">
            <div className="get-in-touch">
                <h1>Get In Touch</h1>
                <div className="contact-item">
                    <div className="icon phone-icon"></div>
                    <div className="contact-details">
                        <p>Phone</p>
                        <p>+123 456 7890</p>
                    </div>
                </div>
                <div className="contact-item">
                    <div className="icon email-icon"></div>
                    <div className="contact-details">
                        <p>Email</p>
                        <p>example@example.com</p>
                    </div>
                </div>
                <div className="contact-item">
                    <div className="icon address-icon"></div>
                    <div className="contact-details">
                        <p>Address</p>
                        <p>123 Street Name, City, Country</p>
                    </div>
                </div>
            </div>

            <div className="divider"></div>

            <div className="contact-us">
                <h1>Contact Us</h1>
                <div className="form-group">
                    <div className="input-group">
                        <label>First Name</label>
                        <input type="text" className="text-field" placeholder="First Name" />
                    </div>
                    <div className="input-group">
                        <label>Last Name</label>
                        <input type="text" className="text-field" placeholder="Last Name" />
                    </div>
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <div className="phone-number">
                        <input type="text" className="country-code" placeholder="+1" />
                        <input type="text" className="text-field" placeholder="Phone Number" />
                    </div>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="text-field" placeholder="Email" />
                </div>
                <button className="submit-button">Submit</button>
            </div>
        </div>
    );
};

export default ContactSection;
