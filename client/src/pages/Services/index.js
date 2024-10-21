import React from 'react'
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { webDevelopmentData, mobileAppDevelopmentData, digitalMarketingData } from '../../staticData';



const Service = () => {
  const { serviceName } = useParams();

  const renderTechCards = (data) => {
    return (
      <div className='flex justify-center items-center flex-wrap'>
        {data.map((tech, index) => (
          <div key={index} className='flex justify-center items-center'>
            <motion.div 
              className="card bg-white shadow-md rounded-lg p-4 m-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={tech.logo} alt={`${tech.title} logo`} className="card-logo w-16 h-16 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">{tech.title}</h2>
              <p className="text-gray-700 w-64">{tech.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='py-20 p-10 mt-32'>
      {serviceName === "web-development" && renderTechCards(webDevelopmentData)}
      {serviceName === "mobile-app-development" && renderTechCards(mobileAppDevelopmentData)}
      {serviceName === "digital-marketing" && renderTechCards(digitalMarketingData)}
    </div>
  )
}

export default Service
