import React from 'react'
import Slider from "react-slick";
import Img from '../../../assets/about-page/Group.svg'
import Img1 from '../../../assets/about-page/Group (1).svg'
import Img2 from '../../../assets/about-page/Group (2).svg'
import Img3 from '../../../assets/about-page/Group (3).svg'
import Img4 from '../../../assets/about-page/Group (4).svg'
import './style.css'

const Sliders = () => {
    var settings1 = {
        dots: false,
        infinite: true, // Infinite loop
        autoplay: true, // Enable autoplay
        autoplaySpeed: 0, // No delay between transitions
        speed: 5000, // Transition speed (higher value for smoother scroll)
        cssEase: "linear", // Linear easing for continuous scroll
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        arrows: false, // Disable arrows
        variableWidth: true, // Enable variable width to avoid gaps
        pauseOnHover: false, // Prevent pausing on hover
      };
      var settings2 = {
        rtl: true,
         dots: false,
        infinite: true, // Infinite loop
        autoplay: true, // Enable autoplay
        autoplaySpeed: 0, // No delay between transitions
        speed: 5000, // Transition speed (higher value for smoother scroll)
        cssEase: "linear", // Linear easing for continuous scroll
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        arrows: false, // Disable arrows
        variableWidth: true, // Enable variable width to avoid gaps
        pauseOnHover: false, // Prevent pausing on hover
      };
  return (
    <div className="slider-sections">
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <Slider autoplay {...settings1}>
            <div>
              <img src={Img} />
            </div>
            <div>
              <img src={Img1} />
            </div>
            <div>
              <img src={Img2} />
            </div>
            <div>
              <img src={Img3} />
            </div>
            <div>
              <img src={Img4} />
            </div>
           
          </Slider>
          <br />
          <Slider autoplay {...settings2}>
            <div>
              <img src={Img} />
            </div>
            <div>
              <img src={Img1} />
            </div>
            <div>
              <img src={Img2} />
            </div>
            <div>
              <img src={Img3} />
            </div>
            <div>
              <img src={Img4} />
            </div>
           
          </Slider>
        </div>
  )
}

export default Sliders