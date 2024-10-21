import React from 'react'

const Heading = ({title,subtitle}) => {
  return (
    <div className='p-10'>
      {title && <h1 className='text-4xl text-center font-bold'>{title}</h1>}
      {subtitle && <p className='text-lg text-center  text-[#858585]'>{subtitle}</p>}
    </div>
  )
}

export default Heading
