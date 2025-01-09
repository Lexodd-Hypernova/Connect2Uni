import React from "react";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="./logo.svg" width="50" alt="a logo" />
      <div>
        <ul className="menu_list">
          <li>Home</li>
          <li>About</li>
          <li>Work</li>
          <li>Services</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
