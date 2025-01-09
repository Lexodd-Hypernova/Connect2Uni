import React from 'react'
import ReadMoreIcon from '../../../assets/read-more/ReadMore.svg'
import './GlobalEducation.css'

const GlobaEducation = () => {
  return (
    <div className='gl-ed-con'>
      <h1> 
        Your <span>Global</span> Education <br /> Gateway
      </h1>
    <p>
      Your journey to global education starts here. Explore universities, apply to programs, 
    and get expert visa guidance, all in one place.
    </p>
    <h4>
      For more details
    </h4>
    <span className='gl-ed-con-rd-m'>
     <p> Read More </p>
      <img src={ReadMoreIcon} alt="read-more-icon" />
    </span>
    </div>
  )
}

export default GlobaEducation;