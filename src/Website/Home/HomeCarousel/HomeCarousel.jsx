import React, { useEffect } from 'react';
import "./style.css";

// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

import ApplicationProcess from "../../../assets/home-page/Connect2Uni-Application-processs.svg";
import CollegeSearchFilters from "../../../assets/home-page/Connect2Uni-College-Search-Filters.svg";
import VisaGuidance from "../../../assets/home-page/Connect2Uni-Visa-Gudiance.svg";
import Notifications from "../../../assets/home-page/Connect2Uni-Notifications.svg";

const ListArray = ["Application Process", "College Search Filters", "Visa Guidance", "Notifications"];

// import { Fade } from "react-awesome-reveal";

const HomeCarousel = () => {

    useEffect(() => {
        const mySwiper = new Swiper('.swiper-container.benefit_sw', {
            loop: true,
            autoplayDisableOnInteraction: false,
            slidesPerView: 1,
            autoHeight: true,
            autoplay: {
                delay: 5000,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.swiper-pagination.bnft_swp-pgn',
                clickable: true,
                type: 'bullets',
                renderBullet: (index, className) => {
                    return `<span class="${className}"><em>${ListArray[index]}</em><i></i><b></b></span>`;
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        return () => {
            mySwiper.destroy();
        };
    }, []);

    return (
        <>
            <div className='benefits__Sec'>
                <div className='bnft__Ttl-txt'>
                    <h4>Know us more!</h4>
                </div>
                <div className="swiper-container benefit_sw">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className='bn__Sl'>
                                <div className='bn__Img-con'>
                                    <div className='bn-img'>
                                        <img src={ApplicationProcess} alt="" />
                                    </div>
                                </div>
                                <div className='bn_Txt'>

                                    <h3>
                                        {/* <Fade direction="up"> */}

                                        “Innovating tomorrow, Today.”
                                        {/* </Fade> */}
                                    </h3>
                                    <p>
                                        {/* <Fade direction="up"> */}
                                            A comprehensive platform catering to educators,
                                            learners, and coordinators, fostering connections
                                            and mutual growth opportunities.
                                        {/* </Fade> */}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide con2">
                            <div className='bn__Sl'>
                                <div className='bn__Img-con'>
                                    <div className='bn-img'>
                                        <img src={CollegeSearchFilters} alt="" />
                                    </div>
                                </div>
                                <div className='bn_Txt'>
                                    <h3>“Innovative Growth Empowerment”</h3>
                                    <p>
                                        Our Mission is to streamline organization management
                                        efforts by offering a comprehensive 360 - Degree connection,
                                        ensuring all resources are conveniently accessible.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide con3">
                            <div className='bn__Sl'>
                                <div className='bn__Img-con'>
                                    <div className='bn-img'>
                                        <img src={VisaGuidance} alt="" />
                                    </div>
                                </div>
                                <div className='bn_Txt'>
                                    <h3>“Integrity, Innovation, Excellence”</h3>
                                    <p>
                                        We Believe in the power of innovation to
                                        pave the way for a future where lives are simplified,
                                        enhanced and made more manageable.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide con4">
                            <div className='bn__Sl'>
                                <div className='bn__Img-con'>
                                    <div className='bn-img'>
                                        <img src={Notifications} alt="" />
                                    </div>
                                </div>
                                <div className='bn_Txt'>
                                    <h3>“Integrity, Innovation, Excellence”</h3>
                                    <p>
                                        We Believe in the power of innovation to
                                        pave the way for a future where lives are simplified,
                                        enhanced and made more manageable.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Add more slides as needed */}
                    </div>

                    {/* <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-scrollbar"></div> */}
                </div>
                <div className="swiper-pagination bnft_swp-pgn"></div>
            </div>
        </>
    )
}

export default HomeCarousel