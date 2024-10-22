import React from 'react';
import mobile from '../../imgvid/54b972c504b660f6e7905ff1242245c9.png';
import ProjectDetails from '../projectDetails';
import { useState } from 'react';

const Card = ({ item, index }) => {
    console.log(item);
    const [projectDetails, setProjectDetails] = useState(false);
    const data = {
        title: item?.name ,
        subtitle: item?.description ,
        images: `uploads/${item?.mainImage}` ,
        image2: `uploads/${item?.subMainImage}` ,
        link: item?.demoLink 
    };
    const right = index % 2 === 0;

    if(!item){
        return <div>Loading...</div>
    }

    return (
        <><div className={`flex md:flex-row flex-col items-center px-4  bg-white rounded-lg ${right ? '' : 'md:flex-row-reverse'}` } >
            <div className='w-[50vw] relative md:h-[70vh]'>
                <img src={`${data.images}`} loading='lazy' alt={data.title} className={`md:w-[80%] absolute md:static w-full h-full object-cover ${item.right ? 'ml-auto' : 'mr-auto'}`} />
                <div className={`mt-2 relative top-0 min-h-[30vh] md:absolute flex justify-center items-center overflow-visible md:top-[50%] md:translate-y-[-50%] ${item.right ? 'left-0' : 'right-0'} hover:rotate-12 transition-transform h-full hover:scale-[1.1] duration-300 w-[100%] md:w-[40%]`} >
                    <img src={mobile} alt='mobile' className='absolute z-20 w-[78%] object-cover' />
                    <img src={data.image2} alt='mobile' className='w-[65%] object-cover' />
                </div>
            </div>
            <div className="p-10 md:p-4 flex flex-col md:w-[50vw] md:px-24">
                <h2 className="mb-3 text-4xl font-bold capitalize">{data.title}</h2>
                <p className="text-gray-600">{data.subtitle}</p>
                <span onClick={() => setProjectDetails(true)}  className={`mt-5 capitalize w-fit inline-block py-2 text-xl cursor-pointer Navlink text-[#0303fbc2] after:h-[2px] after:bg-[#0303fbc2] hover:after:bg-[#0303fbc2] hover:after:h-[2px] rounded-full`}>
                    view details
                </span>
                <a href={data.link} className={`-mt-2 inline-block py-2 Navlink w-fit text-[#0303fbc2] text-xl  after:h-[2px] after:bg-[#0303fbc2] hover:after:bg-[#0303fbc2] hover:after:h-[2px] rounded-full`}>
                    Go to Site
                </a>
                
            </div>
        </div>
        {projectDetails && <ProjectDetails forClose={() => setProjectDetails(false)} project={item} />}
        </>
    );
};

export default Card;
