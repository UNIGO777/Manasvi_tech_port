import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const Navbar = ({ NavbarData }) => {
    const [menu, setMenu] = useState(false);

    const handleResize = () => {
        if (window.innerWidth > 1024) { // Assuming 1024px is the breakpoint for large screens
            setMenu(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <><div className='  bg-opacity-30 bg-[#000000] -mt-[9vw] h-[9vw]'>
            <div className='fixed top-0 h-fit lg:h-[15vh]  z-50 w-full '>
                <header className='h-10 p-2 hidden lg:flex backdrop-filter backdrop-blur-md bg-opacity-30 bg-[#000000] md:px-10 justify-between items-center'>
                    <div className='flex items-center '>
                        <div className='flex items-center gap-3'>
                            {NavbarData.firstHeader.contectInfo?.map((item, index) => {
                                return <div className='flex items-center gap-1 cursor-pointer text-[#036FFB]' key={index} >
                                    {item.icon}
                                    <Link to={item.link} target="_blank" className='text-[#ededed] hover:text-[#036FFB] text-sm md:text-base'>{item.text}</Link>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <p className='mr-2 text-sm md:text-base text-[#ededed]'>Find Us On</p>
                        <div className='flex items-center gap-2 text-[#036FFB]'>
                            {NavbarData.firstHeader.socialLinks?.map((item, index) => {
                                return <Link key={index} to={item.link}>{item?.icon}</Link>
                            })}
                        </div>
                    </div>
                </header>
                <nav className="flex w-full justify-between h-fit  backdrop-filter backdrop-blur-md bg-opacity-30 bg-[#000000] items-center p-4 relative ">
                    <div className="flex items-center w-20" >
                        <img src={NavbarData.logo} alt="Logo" className="mr-2" />
                     
                    </div>
                    <div className="relative lg:hidden">
                            <button onClick={() => setMenu(!menu)} className="relative flex flex-col items-center justify-center w-10 h-10 ">
                                <span className={`block w-8 h-1 bg-[#ededed]   transition-transform ${menu ? 'rotate-45' : 'mb-2'} duration-300 ease-in-out transform rounded-full` }/>
                            <span className={`block w-8 h-1 bg-[#ededed]  transition-transform   ${menu ? 'absolute -rotate-45 ' : 'mb-2'} duration-300 ease-in-out transform rounded-full`} />
                                <span className={`block w-8 h-1 bg-[#ededed] ${menu ? 'hidden' : ''} transition-transform duration-300 ease-in-out transform rounded-full`} />
                            </button>
                            {menu && <div className="absolute right-0 p-4 mt-2 text-black bg-white rounded-md shadow-xl w-52 group-hover:block">
                                <ul className="flex flex-col">
                                    {NavbarData.links?.map((link, index) => (
                                        <li key={index} className="cursor-pointer text-[black] font-semibold hover:bg-gray-100 p-2">
                                            <Link to={link.link}>{link.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>}
                        </div>
                    <div className='items-center hidden gap-4 lg:flex '>
                        <ul className="flex space-x-6 font-semibold">
                            {NavbarData.links?.map((link, index) => {
                                return <li className="cursor-pointer text-[#ededed] Navlink" key={index}>
                                    <Link to={link.link} target="_blank">{link.title}</Link>
                                </li>
                            })}
                        </ul>
                        <Link to={NavbarData.button.link}>
                            <button className="px-6 py-2 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                                {NavbarData.button.text}
                            </button>
                        </Link>
                        
                    </div>
                </nav>
            </div>

        </div></>
        
    );
};

export default Navbar;
