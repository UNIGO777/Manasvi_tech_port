import React from 'react'
import './index.css'

const IconAnimation = ({children}) => {
  return (
    <div className='p-3 icon-animation flex flex-col gap-5 bg-white relative text-black mt-10 h-11 rounded-full '>
          <div className='icon-animation-children flex flex-col gap-5  '>{children}{children}</div>
      
    </div>
  )
}

export default IconAnimation
