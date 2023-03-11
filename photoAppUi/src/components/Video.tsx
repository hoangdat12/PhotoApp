import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'

import {FaRegHeart, FaHeart, FaPlay} from 'react-icons/fa'
import {MdOutlineCollectionsBookmark} from 'react-icons/md'
import {AiOutlineDownload} from 'react-icons/Ai'
import {GrPlay} from 'react-icons/gr'

import { iAuthor } from './Comments'
import { Avatar } from './Picture'

export interface iVideoUrlData {
    height: number,
    width: number,
    link: string,
    quanlity: string
}

export interface iVideoData {
    _id: string,
    author: iAuthor,
    image: string,
    imageMini: string,
    videoUrl: iVideoUrlData[]
}

export interface iVideo {
    video: iVideoData
}

export interface iPropsVideoImageToggle {
    videoSrc: string,
    imageSrc: string
}

const Video:React.FC<iVideo> = ({video}) => {
    const navigate = useNavigate()

    const [activeHeart, setActiveHeart] = useState(false)
    const [addCollection, setAddCollection] = useState(false)

    return (
        <div className='my_image relative rounded-xl cursor-pointer overflow-hidden hover:bg-image-hover'>
            <img src={video?.image} alt="" />
            <div className='heart_image hidden absolute duration-300 flex-col justify-between p-4 bg-hover-image top-0 left-0 right-0 bottom-0' >
                <div className='lg:flex justify-end hidden'>
                    <span className={`mr-2 w-[35px] h-[35px] flex items-center justify-center text-xl bg-white ${activeHeart ? 'text-red-500' : 'text-slate-800'} rounded-lg `}>
                        {activeHeart ? <FaHeart/> : <FaRegHeart/>}
                    </span>
                    <span className={`mr-2 w-[35px] h-[35px] flex items-center justify-center text-xl bg-white rounded-lg `}>
                        <MdOutlineCollectionsBookmark />
                    </span>
                </div>
                <div onClick={() => navigate(`/video/${video?._id}`)}  className='flex-1 flex items-center justify-center'>
                    <FaPlay className='text-3xl text-white'/>
                </div>
                <div className='flex justify-between'>
                    <div className='lg:flex items-center hidden'>
                        <Avatar className={'w-[40px] h-[40px]'} image={video?.author?.photographer_url}/>
                        <span className='ml-2 font-semibold text-white text-lg'>{video?.author?.photographer}</span>
                    </div>
                    <span className='w-[35px] h-[35px] flex items-center justify-center text-xl bg-white text-slate-800 rounded-lg'><AiOutlineDownload /></span>
                </div>
            </div>
        </div>
    )
}


export default Video