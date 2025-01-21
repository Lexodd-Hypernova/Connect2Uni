import React from "react";
import "./style.css";

const teamMembers = [
  {
    name: "James Henry",
    role: "Web Analyst",
    imgSrc: "./image/pic01.jpg",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "John Doe",
    role: "UI/UX Designer",
    imgSrc: "./image/pic02.jpg",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "Mykel Smith",
    role: "Front-End Web Developer",
    imgSrc: "./image/pic03.jpg",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "Alex Morgan",
    role: "Back-End Web Developer",
    imgSrc: "./image/pic04.jpg",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
];

const OurTeams = () => {
  return (
    <div className="wrapper">
      <div className="title">
        <h4>Our Team Section</h4>
      </div>

      <div className="card_Container">
        {teamMembers.map((member, index) => (
          <div className="card" key={index}>
            <div className="imbBx">
              <img src={member.imgSrc} alt={member.name} />
            </div>
            <div className="content">
              <div className="contentBx">
                <h3>
                  {member.name} <br />
                  <span>{member.role}</span>
                </h3>
              </div>
              <ul className="sci">
                <li style={{ "--i": 1 }}>
                  <a href={member.socials.instagram}>
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li style={{ "--i": 2 }}>
                  <a href={member.socials.github}>
                    <i className="fa-brands fa-github"></i>
                  </a>
                </li>
                <li style={{ "--i": 3 }}>
                  <a href={member.socials.linkedin}>
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeams;
