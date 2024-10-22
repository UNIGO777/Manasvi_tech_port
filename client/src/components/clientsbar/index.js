'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Aaradhya from '../../imgvid/clientIcons/Aaradhya.png'
import Bellissimo from '../../imgvid/clientIcons/Bellissimo.png'
import Bobbys from '../../imgvid/clientIcons/Bobbys.png'
import DrTooth from '../../imgvid/clientIcons/DrTooth.png'
import Mahamaya from '../../imgvid/clientIcons/Mahamaya.png'
import MunsiBharat from '../../imgvid/clientIcons/MunsiBharat.jpg'
import Physiotherapy from '../../imgvid/clientIcons/Physiotherapy.png'
import Roshield from '../../imgvid/clientIcons/Roshield.png'
import shivansh from '../../imgvid/clientIcons/shivansh.png'
import SMART from '../../imgvid/clientIcons/SMART.png'
import Monu from '../../imgvid/clientIcons/Monu.jpg'
import Bharti from '../../imgvid/clientIcons/bharti.png'

const clients = [
  { name: 'Bellissimo Interiors Zone', logo: Bellissimo },
  { name: 'Mahamaya Homoeo Clinic', logo: Mahamaya},
  { name: 'Advance Physiotherapy Clinic', logo: Physiotherapy },
  { name: 'RO Shield Services', logo:Roshield  },
  { name: 'Bobby Skinlaser Clinic', logo: Bobbys },
  { name: 'Smart Hairs Beauty', logo: SMART },
  { name: 'Shivansh Associates', logo: shivansh },
  { name: 'Aaradhya Multispeciality Homoeopathy Clinic', logo: Aaradhya},
  { name: 'Monu Electronics', logo: Monu },
  { name: 'Dr Tooth Smile Clinic', logo: DrTooth },
  { name: 'Muni Subratnath Mandir Subhash Colony', logo: MunsiBharat},
  { name: 'Bartiya Biotech', logo: Bharti},
  
  
]

const ClientCard = ({ name, logo }) => (
  <div className="flex flex-col items-center justify-center w-48 h-48 p-6 m-4 transition-all duration-300 rounded-lg shadow-lg bg-zinc-100 md:h-60 md:w-60 hover:shadow-xl hover:scale-105">
    <img src={logo} alt={`${name} logo`} className="object-contain w-20 h-20 mb-4" />
    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
  </div>
)

export default function ClientCarousel() {
  const carouselRef = useRef(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      const scrollWidth = carousel.scrollWidth
      const clientWidth = carousel.clientWidth

      const animate = () => {
        if (carousel.scrollLeft >= scrollWidth - clientWidth) {
          carousel.scrollLeft = 0
        } else {
          carousel.scrollLeft += 1
        }
        requestAnimationFrame(animate)
      }

      const animationId = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="px-4 py-16 overflow-hidden bg-white sm:px-6 lg:px-8 md:mt-10">
      <div className=" md:max-w-10xl md:px-6">
        <h2 className="mb-8 text-4xl font-bold text-center text-blue-600 md:text-5xl">Our Clients</h2>
        <p className="max-w-3xl mx-auto mb-12 text-lg text-center text-gray-600">
          We're proud to work with some of the most innovative companies in the world. 
          Our clients trust us to deliver cutting-edge solutions that drive their business forward.
        </p>
        <div 
          ref={carouselRef}
          className="flex overflow-x-hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <motion.div
          className="flex"
          animate={{ x: [0, -100 * clients.length] }}
          transition={{ 
            repeat: Infinity, 
            duration: 200, // Increased duration to slow down the animation
            ease: "linear"
          }}
          >
            {[...clients, ...clients].map((client, index) => (
              <ClientCard key={`${client.name}-${index}`} {...client} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}