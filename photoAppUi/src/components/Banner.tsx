import React from 'react'

export interface iPropsBanner {
    image?: string,
    videos?: string,
    text: string,
    className?: string,
    title?: string
}

const Banner:React.FC<iPropsBanner> = ({image, videos, text, className, title}) => {
    return (
        <div className={`${className} relative`}>
            <img className={`w-full h-[500px] object-cover ${!image && 'hidden'}`} src={image} alt="" />
            <video 
                className={`w-full h-[500px] object-cover ${!videos && 'hidden'}`} 
                src={videos} 
                muted
                autoPlay
                loop
                controls={false}
            />
            <div className='absolute w-full h-full flex flex-col items-center justify-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
                <h2 className='w-[90%] sm:w-[80%] md:w-[630px] text-title font-bold text-white text-center'>
                    {text}
                </h2>
                <h1 className='text-amber-300 mt-6 cursor-pointer text-4xl'>
                    {title ? title : 'Welcome'}
                </h1>
            </div>
        </div>
    )
}

export default Banner