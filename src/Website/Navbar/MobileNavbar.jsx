import React, { useState } from "react";
import MenuIcon from './MenuIcon.svg'
import CloseIcon from './CloseIcon.svg'
import "./styles.css";

const MobileNavbar = () => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  // Toggle the Mobile Nav open / close
  const handleMobileNavClick = () => {
    mobileNavIsOpen ? setMobileNavIsOpen(false) : setMobileNavIsOpen(true);
  };

  window.addEventListener("resize", () => {
    window.innerWidth > 600 && setMobileNavIsOpen(false);
  });

  return (
    <nav className="mobileNav_container">
      <img src="./logo.svg" width="50" alt="logo" />
      <img
        className="menu_icon"
        src={mobileNavIsOpen ? CloseIcon : MenuIcon}
        alt="hamburger menu icon"
        onClick={handleMobileNavClick}
      />
      <div className="mobileNav_menu_container">
        <ul
          className={`${
            mobileNavIsOpen ? "mobileNav_open" : "mobileNav_closed"
          } mobileNav_menu_list`}
        >
          <li>Home</li>
          <li>About</li>
          <li>Work</li>
          <li>Services</li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileNavbar;