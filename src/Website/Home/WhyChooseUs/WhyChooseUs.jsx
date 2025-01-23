import React from 'react'
import ReadMore from '../../ReadMore/ReadMore'
import PersonalizedExp from '../../../assets/home-page/WhyChooseUs/Connect2Uni-personalized-exp.svg'
import SimplePayments from '../../../assets/home-page/WhyChooseUs/Connect2Uni-Simple-Payments.svg'
import ExpertVisaGuide from '../../../assets/home-page/WhyChooseUs/Connect2Uni-Expert-Guidance.svg'
import SimpleRegistration from '../../../assets/home-page/WhyChooseUs/Connect2Uni-simple-registration.svg'
import Simplification from '../../../assets/home-page/WhyChooseUs/Connect2Uni-simplification.svg'
import RealTimeNotifications from '../../../assets/home-page/WhyChooseUs/Connect2Uni-real-time-notifications.svg'
import StudyAborad from '../../../assets/home-page/WhyChooseUs/Connect2Uni-Study-Abroad.png'
import './style.css'

const WhyChooseUs = () => {
  return (
    <div className="wh-ch-us-cont">
        <div className='wh-ch-us-up'>
            <h1>Why <span>Choose</span> Us?</h1>
            <ReadMore />
        </div>
    <div className='wh-ch-us-ins'>
        <div className='wh-ch-us-sec1'>
            <span className='img-ins-sp--in img-ins-sp--in-green'>
                <img src={PersonalizedExp} alt="Connect2Uni-personalized-exp" />
                <p>Personalized Experience</p>
            </span>
            <span className='img-ins-sp--in img-ins-sp--in-blue'>
                <img src={SimplePayments} alt="Connect2Uni-Simple-Payments" />
                <p>Simple Payments</p>
            </span>
            <span className='img-ins-sp--in img-ins-sp--in-green'>
                <img src={ExpertVisaGuide} alt="Connect2Uni-Expert-Guidance" />
                <p>Expert Visa Guidance</p>
            </span>
        </div>
        <div className='wh-ch-us-sec2'>
        <span className='img-ins-sp--in img-ins-sp--in-blue'>
                <img src={SimpleRegistration} alt="Connect2Uni-simple-registration" />
                <p>Simple Registration</p>
            </span>
            <span className='img-ins-sp--in img-ins-sp--in-green'>
                <img src={Simplification} alt="Connect2Uni-simplification" />
                <p>Simplification</p>
            </span>
            <span className='img-ins-sp--in img-ins-sp--in-blue'>
                <img src={RealTimeNotifications} alt="Connect2Uni-real-time-notifications" />
                <p>Real-Time Notifications</p>
            </span>
        </div>
        <div className='wh-ch-us-img'>
            <img src={StudyAborad} alt="Connect2Uni-Study-abroad" />
        </div>
    </div>
    </div>
  )
}

export default WhyChooseUs