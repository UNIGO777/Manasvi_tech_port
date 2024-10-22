import React, { useEffect, useState } from 'react'

const ProjectDetails = ({ forClose, project }) => {
    const [displayImg, setDisplayImg] = useState()
    const [ImgOptions, setImgOptions] = useState(false)
    const techStack = project?.techStacks;
    
    useEffect(() => {
        // Disable scrolling by setting body overflow to hidden
        document.body.style.overflow = 'hidden';
        setDisplayImg(`uploads/${project?.mainImage}`)
    
        // Cleanup: Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };

      }, []);   
      
    return (
        <div className='h-[100%] bg-[#f5f5f5] fixed z-50 w-[100%] top-0 left-0'>
            <div className='fixed w-[3rem] mt-3 ml-3 p-2 cursor-pointer hover:scale-[0.9]' onClick={forClose}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg></div>
            <div className='grid md:grid-cols-2 overflow-scroll md:overflow-hidden h-[100vh]  md:h-[95vh]'>
                <div className='p-4 media md:p-10 md:overflow-y-scroll transperentScrollbar'>
                    <div >
                        <div className='text-[3vw] md:text-[2vw] HeroBold mb-5 '><h1 className='relative'>IMAGES <span className=' opacity-5 absolute top-[40%] left-[2%] scale-[1.1]'>IMAGES</span></h1></div>

                        <div name="images" className='w-full h-[45vw] md:h-[20vw] overflow-hidden   p-2 mb-5'><img src={displayImg} loading='lazy' className='object-fill w-full h-full rounded-md' alt="" /></div></div>
                    <div name="imagesSelectors " className='grid grid-cols-3 gap-3 p-1 mb-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-y-4'>
                        {
                            project?.images?.map((item, index) => {
                                if (ImgOptions || index < 3) return <div className={` ${displayImg == item && "p-1 border-2"} grid place-items-center rounded-md  bg-[#e0e0e0] w-full  `} key={index} onClick={() => {
                                    console.log(item)
                                    setDisplayImg(item)
                                }}>
                                    <img src={`uploads/${item}`} className='rounded-md' alt="" />
                                </div>
                            })
                        }
                    </div>
                        {project?.images?.length > 3 && <div className='flex items-center justify-center mb-10'>
                            <button className='bg-[#d3d3d3] p-[1vw] px-[2vw]  rounded-full hover:underline text-[2vw] md:text-[1vw]' onClick={() => setImgOptions(!ImgOptions)}>{!ImgOptions ? "See all" : "See less"}</button>
                        </div>}


                    <div className='text-[3vw] md:text-[2vw] HeroBold mb-5 '><h1 className='relative'>DEMO VIDEO <span className=' opacity-5 absolute top-[40%] left-[2%] scale-[1.1]'>DEMO VIDEO</span></h1></div>
                    
                    <div className='w-full h-[45vw] md:h-[20vw] overflow-hidden rounded-md mb-5 p-2  '><video src={`uploads/${project?.demoVideo}`} loading="lazy" autoPlay muted loop className='object-fill w-full h-full rounded-md' alt="" /></div>
                </div>


                <div className='details text-[3vw] md:text-[1vw] md:overflow-y-scroll transperentScrollbar  p-4 md:p-10'>
                    <div className='text-[3vw] md:text-[2vw] HeroBold mb-5 '><h1 className='relative'>DETAILS <span className=' opacity-5 absolute top-[40%] left-[2%] scale-[1.1]'>DETAILS</span></h1></div>
                    <div className='grid gap-3 p-2 '>
                        <div className='flex gap-2'><h1 className='font-bold'>Project name</h1>:<h1>{project?.name}</h1></div>
                        <div className='flex gap-2'><h1 className='font-bold'>Overview</h1>:<h1>{project?.description}</h1></div>
                        <div className='flex gap-2'><h1 className='font-bold'>Techstacks</h1>: <p className='flex flex-wrap items-center gap-1 px-1 lg:gap-2 gap-y-2 lg:px-2'>{Array.isArray(project?.techStacks) && project?.techStacks.length > 0 ? (
                            project?.techStacks.map((item, index) => (
                                <div key={index} className='px-2  categories__btn lg:px-3'>{item}{!index == project?.techStacks.length - 1 && ","} </div>
                            ))
                        ) : (
                            <p>No tech stacks available</p>
                        )}</p>
                        </div>
                        {project?.demoLink && <><div className='flex gap-2 '><h1 className='font-bold'>Demo Link</h1>:<a href={project?.demoLink} target='blank' className='text-blue-600 hover:underline'>{project?.demoLink}</a></div>
                        <p>( This is just a demo link in this may be you will find mistakes, <span className='font-bold'> Avoid it </span> )</p></>}
                        <div className='gap-2 mt-2 '><h1 className='mb-2 font-bold '>Key Features :</h1>
                            <ul className='px-3'>
                                {
                                    project?.keyFeatures?.map((featureItem, index) => (
                                        <p className='mb-2'><span className='font-semibold'>{featureItem?.title}</span> : {featureItem?.description} </p>

                                    ))
                                }
                            </ul>
                        </div>
                        <div className='flex gap-2 '><h1 className='font-bold'>Outcome</h1>:<h1>{project?.outcome}</h1></div>
                        <div className='flex gap-2 '><h1 className='font-bold'>Client Review</h1>:<h1>{project?.clientReview}</h1></div>
                        <div className='h-[10vh]'></div>




                    </div>
                </div>

            </div>
        </div>

    )
}

export default ProjectDetails