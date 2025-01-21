import React from 'react'
import  ReadMoreIcon  from '../../assets/read-more/ReadMore.svg'
import './style.css'

const ReadMore = () => {
  return (
    <div><span className='gl-ed-con-rd-m'>
         <p> Read More </p>
          <img src={ReadMoreIcon} alt="read-more-icon" />
        </span></div>
  )
}

export default ReadMore