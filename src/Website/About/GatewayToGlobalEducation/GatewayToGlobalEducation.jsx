import React from 'react'
import DownloadSection from '../../DownloadSection/DownloadSection'
import './GatewayToGlobalEducation.css'

const GatewayToGlobalEducation = () => {
  return (
    <div className='abt-ln-con-main-wrap'>
    <div className='abt-ln-con-main'>
      <h1>
        Your Gateway to Global Education
      </h1>
      <p>
      This is an online platform designed specifically for students wishing to study
      abroad to facilitate the university admission and registration process
      </p>
      <div className='abt-ln-con-sub-btns'>
        <button className='abt-ln-con-sub-btn abt-ln-con-sub-btn1'>Register Now</button>
        <button className='abt-ln-con-sub-btn abt-ln-con-sub-btn2'>Get Started</button>
      </div>
     
    </div>
    <DownloadSection />
</div>
  )
}

export default GatewayToGlobalEducation