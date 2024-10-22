import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { webDevelopmentData, mobileAppDevelopmentData, digitalMarketingData } from '../../staticData';

const Service = () => {
  const { serviceName } = useParams();
  

  const renderTechCards = (data) => {
    return (
      <div className='flex flex-wrap items-center justify-center'>
        {data.map((tech, index) => (
          <div key={index} className='flex items-center justify-center '>
            <motion.div 
              className="p-4 m-4 overflow-hidden bg-white rounded-lg shadow-md w-80 h-80 card" // Set fixed height and width
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='p-6'> {/* Adjust padding for better spacing */}
                <img src={tech.logo} alt={`${tech.title} logo`} className="w-20 mx-auto mb-4 card-logo" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-center">{tech.title}</h2> {/* Center align text */}
              <p className="mt-8 text-center text-gray-700">{tech.description}</p> {/* Center align text */}
            </motion.div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='p-10 py-20 mt-32 bg-[#ededed]'>
      {serviceName === "web-development" && renderTechCards(webDevelopmentData)}
      {serviceName === "mobile-app-development" && renderTechCards(mobileAppDevelopmentData)}
      {serviceName === "digital-marketing" && renderTechCards(digitalMarketingData)}
    </div>
  )
}

export default Service;
