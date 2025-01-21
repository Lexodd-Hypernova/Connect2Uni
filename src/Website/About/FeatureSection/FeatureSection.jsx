import React, { useState, useEffect } from 'react';
import OurMission from '../../../assets/home-page/FeatureSection/Connect2Uni-our-Mission.svg'
import OurVision from '../../../assets/home-page/FeatureSection/Connect2Uni-Our-Vision.svg';
import OurHistory from '../../../assets/home-page/FeatureSection/Connect2Uni-Our-history.svg'
import OurValues from '../../../assets/home-page/FeatureSection/Connect2Uni-our-values.svg';
import ourMissionIcon from '../../../assets/home-page/FeatureSection/Connect2Uni-our-mission-icon.svg'
import ourVisionIcon from '../../../assets/home-page/FeatureSection/Connect2Uni-our-vision-icon.svg'
import ourHistoryIcon from '../../../assets/home-page/FeatureSection/Connect2Uni-our-history-icon.svg'
import ourValuesIcon from '../../../assets/home-page/FeatureSection/Connect2Uni-our-values-icon.svg'
import './style.css';

const FeatureSection = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active box index
  const boxes = [
    { title: 'Our Mission', icon: ourMissionIcon, image: OurMission, description: 'Description for mission' },
    { title: 'Our Vision', icon: ourVisionIcon, image: OurVision, description: 'Description for vision' },
    { title: 'Our History', icon: ourHistoryIcon, image: OurHistory, description: 'Description for history' },
    { title: 'Our Values', icon: ourValuesIcon, image: OurValues, description: 'Description for values' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % boxes.length);
    }, 2000); // Change box every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [boxes.length]);

  const handleBoxClick = (index) => {
    setActiveIndex(index); // Set the clicked box as active
  };

  return (
    <div className='fs-mn-c'>
      <h1>Feature</h1>
      <div className='fs-mn-ins'>
        {/* Left side: Boxes */}
        <div className='fs-mn-ins-bx-mn'>
          {boxes.map((box, index) => (
            <div
              key={index}
              className={`fs-mn-ins-bx ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleBoxClick(index)}
            >
              <img src={box.icon} alt={box.title} />
              <h2>{box.title}</h2>
              <p>{box.description}</p>
            </div>
          ))}
        </div>

        {/* Right side: Image */}
        <div className='fs-mn-ins-img'>
          <img src={boxes[activeIndex].image} alt={boxes[activeIndex].title} />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
