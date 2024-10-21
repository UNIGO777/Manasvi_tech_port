import React from 'react';
import { motion } from 'framer-motion';
import HeroImage from '../../imgvid/Herobackground.jpg';
import { Typewriter } from 'react-simple-typewriter';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
</style>


const Hero = () => {  

  const projectNames = ["Web Development", "App Development",  "IT Services", "Digital Marketing"]

  
  return (
    <div className='h-[150vh] md:h-screen  w-screen bg-cover bg-center grid md:grid-cols-2' style={{ backgroundImage: `url(${HeroImage})` }}>
      <div className='margin-auto mt-20 md:mt-0 text-center md:text-left md:ml-5 h-[70vh] md:h-full  w-full flex flex-wrap justify-center items-center '>
        <motion.h1
          className='text-white  text-[9vw]  md:text-5xl lg:text-6xl xl:text-7xl p-8 md:p-16 lg:p-24 uppercase font-semibold'
          style={{ fontFamily: 'Work Sans, sans-serif' }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >we're not just constructing,
          <br />
          <span className='text-[#5F908C] ' >
            <Typewriter
              words={["we build your dreams"]}
              loop={0}
              cursor
              cursorStyle='*'
              typeSpeed={200}
              deleteSpeed={50}
              delaySpeed={1000}
            /></span>
        </motion.h1>
      </div>
      <div className='margin-auto md:mt-10  h-full w-full flex flex-col justify-center items-center '>
        
        {projectNames?.map((project, index) => (
          <div className={`margin-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] ${index % 2 === 0 ? 'ml-5 sm:ml-10 md:ml-20' : 'mr-5 sm:mr-10 md:mr-20'}`} key={index}>
            <motion.div
              className='w-full flex items-start mb-5 mb:mb-10 bg-[#e0f7f45e] p-4 rounded-md'
              initial={{ opacity: 1, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: [0, index % 2 === 0 ? -10 : 10, 0] }}
              transition={{ duration: 2, delay: index * 0.5, repeat: Infinity, repeatType: "loop" }}
            >
              <div className='flex items-center py-2 '>
                <div className='bg-[#2F4F4F] p-2 rounded-full'>
                <svg className='w-6 h-6 text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>
                </div>
                <div className='ml-4'>
                  <p className='text-black text-lg font-bold'>{project}</p>
                  
                </div>
              </div>
            </motion.div>
          </div>
        ))}
        
        
      </div>

    </div>
  );
}

export default Hero;
