

import React, { useState } from 'react';
import { FaGlobe, FaMobileAlt, FaLaptopCode, FaChartLine, FaArrowRight } from 'react-icons/fa';
import image from '../../imgvid/services.png'

const ServiceCard = ({ icon, title, description, isActive, onClick }) => (
  <div
    className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 cursor-pointer ${
      isActive ? 'ring-2 ring-blue-500 shadow-xl scale-105' : 'hover:shadow-xl hover:-translate-y-2'
    }`}
    onClick={onClick}
  >
    <div className={`text-4xl mb-4 ${isActive ? 'text-blue-500' : 'text-gray-600'}`}>{icon}</div>
    <h3 className={`text-xl font-semibold mb-2 ${isActive ? 'text-blue-500' : 'text-gray-800'}`}>{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function OurServices() {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      icon: <FaGlobe />,
      title: "Web Development",
      description: "Create stunning, responsive websites tailored to your brand.",
      details: "Our web development team crafts beautiful, functional websites that engage your audience and drive conversions. We use the latest technologies to ensure your site is fast, secure, and scalable."
    },
    {
      icon: <FaMobileAlt />,
      title: "App Development",
      description: "Build powerful mobile applications for iOS and Android platforms.",
      details: "From concept to launch, we develop intuitive and feature-rich mobile apps that provide seamless user experiences. Our apps are built to perform across all devices and operating systems."
    },
    {
      icon: <FaLaptopCode />,
      title: "IT Services",
      description: "Comprehensive IT solutions to streamline your business operations.",
      details: "Our IT services cover everything from network setup and maintenance to cybersecurity and cloud solutions. We ensure your technology infrastructure supports and enhances your business goals."
    },
    {
      icon: <FaChartLine />,
      title: "Digital Marketing",
      description: "Boost your online presence and reach your target audience effectively.",
      details: "Our digital marketing strategies are data-driven and results-oriented. We help you navigate the digital landscape, increase your online visibility, and connect with your ideal customers."
    }
  ];

  return (
    <div className="px-4 py-16 bg-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-4xl font-bold text-center text-blue-600 md:text-5xl">Our Services</h2>
        <p className="max-w-3xl mx-auto mb-12 text-lg text-center text-gray-600 ">
          Manasvi Technologies (OPC) Pvt. Ltd is at the forefront of digital innovation, offering comprehensive services that drive growth and efficiency for our clients.
        </p>
        
        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              isActive={activeService === index}
              onClick={() => setActiveService(index)}
            />
          ))}
        </div>
        
        {activeService !== null && (
          <div className="p-8 mb-16 bg-blue-100 shadow-lg rounded-xl animate-fadeIn">
            <h3 className="mb-4 text-2xl font-semibold text-blue-700">{services[activeService].title}</h3>
            <p className="mb-4 text-gray-700">{services[activeService].details}</p>
            <button className="flex items-center px-6 py-2 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-600">
              Learn More <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}
        
        <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg md:flex-row rounded-xl">
          <div className="mb-8 md:w-1/2 md:mb-0">
            <h3 className="mb-4 text-2xl font-semibold text-blue-700 md:text-3xl">Why Choose Us?</h3>
            <ul className="space-y-4">
              {[
                "Cutting-edge technologies",
                "Expert team of professionals",
                "Tailored solutions for your business",
                "24/7 support and maintenance"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center md:w-1/3">
            <img
              src={image}
              alt="24/7 Service"
              className="w-full max-w-md transition duration-300 transform rounded-lg shadow-md hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}