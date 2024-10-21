import React from 'react';

const OurServices = () => {
  return (
    <div className="our-services-container flex flex-col items-center bg-blue-50 p-10">
      <h2 className="text-blue-500 text-5xl font-bold mb-4">OUR SERVICES</h2>
      <p className="text-center  text-xl max-w-2xl mb-6">
        Manasvi Technologies (OPC) Pvt. Ltd is at the forefront of digital innovation, offering comprehensive services in web development, digital marketing, app development, and IT services. Our team of experts is dedicated to delivering cutting-edge solutions that drive growth and efficiency for our clients. By leveraging the latest technologies and trends, we ensure your business stays ahead in the competitive digital landscape. Whether you're looking to build a dynamic website, enhance your online presence, develop a mobile app, or streamline your IT operations, Manasvi Technologies is your partner in digital excellence.
      </p>
      <ul className="list-disc ml-5  text-xl text-left mb-6 font-semibold font-mono">
        <li className='flex flex-col items-center '><h2 className='leading-10' >Web Development</h2></li>
        <li className='flex flex-col items-center'><h2 className='leading-10' >App Development</h2></li>
        <li className='flex flex-col items-center'><h2 className='leading-10' >IT Services</h2></li>
        <li className='flex flex-col items-center'><h2 className='leading-10' >Digital Marketing</h2></li>
      </ul>
      <div className="service-image flex justify-center items-center">
        <img src="https://manasviportfolio.online/static/media/services.385b3550381b1b0b9610.png"  alt="24/7 Service" className="w-[30vw]" />
      </div>
    </div>
  );
}

export default OurServices;
