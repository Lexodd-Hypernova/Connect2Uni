

import './LandingPage.css'
import DownloadSection from '../../DownloadSection/DownloadSection'

const LandingPage = () => {
    return (
        <div className="l-p-con">
            <div className="l-p-hd">
                <h1>Find your <span>perfect <br /> university</span> Abroad Facilities</h1>
                <p>
                    This is an online platform designed specifically for students wishing to study abroad to facilitate 
                    the university admission and registration process
                </p>
                <button>Register Now</button>
            </div>
           <DownloadSection />
        </div>
    )
}

export default LandingPage