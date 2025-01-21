import React from "react";
import sliderCSS from './Slider.module.css'
import { Swiper , SwiperSlide  } from "swiper/react";

import 'swiper/css'
import 'swiper/css/effect-creative'


import { Autoplay , EffectCreative , Parallax } from "swiper/modules";

function HomeCarousel() {
    return(
        <div className={sliderCSS.sliderWrapper}>
            <Swiper 
                slidesPerView={1}
                // autoplay={{
                //     delay: 1000,
                //     reverseDirection: true, // Reverses the autoplay direction
                // }}
                
                effect='creative'
                parallax={true}
                loop={true}
                pagination={{
                    dynamicBullets: true,
                  }}
                creativeEffect={
                    {
                        prev: {
                            shadow: true,
                            translate: [0,0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        }
                    }
                }
                speed={2000}
                modules={[Autoplay , EffectCreative , Parallax ]}
            
                className={sliderCSS.swiper}
            >
                <SwiperSlide>
                    <div className={`${sliderCSS.slide} ${sliderCSS.slide1} `}>
                        <div className={sliderCSS.content}>
                            <p data-swiper-parallax="-300">Application</p>
                            <h2 data-swiper-parallax="-350">Simplify your application <br /> process with our easy-to-use platform.</h2>
                            <button data-swiper-parallax="-420">Explore Now <i className="ri-arrow-right-up-line"></i>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${sliderCSS.slide} ${sliderCSS.slide2}`}>
                    <div className={sliderCSS.content}>
                            <p data-swiper-parallax="-300">College search filters </p>
                            <h2 data-swiper-parallax="-350">Start Your Search & <br /> Find Your Perfect Fit</h2>
                            <button data-swiper-parallax="-420">Explore Now <i className="ri-arrow-right-up-line"></i>

                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${sliderCSS.slide} ${sliderCSS.slide3}`}>
                    <div className={sliderCSS.content}>
                            <p data-swiper-parallax="-300">Visa Guidance </p>
                            <h2 data-swiper-parallax="-350">Navigate Visa <br /> Requirements with Ease</h2>
                            <button data-swiper-parallax="-420">Explore Now <i className="ri-arrow-right-up-line"></i>

                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${sliderCSS.slide} ${sliderCSS.slide4}`}>
                    <div className={sliderCSS.content}>
                            <p data-swiper-parallax="-300">Notifications</p>
                            <h2 data-swiper-parallax="-350">Stay Connected <br /> with Real-time Updates</h2>
                            <button data-swiper-parallax="-420">Explore Now <i className="ri-arrow-right-up-line"></i>

                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <div className={sliderCSS.Social}>
                <i className="ri-facebook-line"></i>
                <i className="ri-instagram-line"></i>
                <i className="ri-twitter-x-line"></i>
                <i className="ri-github-line"></i>
                <i className="ri-youtube-line"></i>
            </div>
        </div>
    )
}

export  default HomeCarousel