import React from 'react'
import GooglePlayIcon from '.././../../src/assets/mobile-app-icons/GooglePlay.svg'
import AppStoreIcon from '.././../../src/assets/mobile-app-icons/AppStore.svg'
import './DownloadSection.css'

const DownloadSection = () => {
  return (
    <div className="l-p-bl">
                <div className="l-p-bl-con">
                    <div className="l-p-bl-con-img">
                    <img src={AppStoreIcon} alt="" />
                    <img src={GooglePlayIcon} alt="" />
                    </div>
                   
                   
                    <p>
                    Get the App & Find Your Dream 
                    University 
                    </p>
                </div>
                <div>
                    <button>
                        Login
                    </button>
                </div>
            </div>
  )
}

export default DownloadSection