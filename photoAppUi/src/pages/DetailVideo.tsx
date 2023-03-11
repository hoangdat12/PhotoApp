import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getImageSize } from 'react-image-size'

import {FaRegHeart, FaHeart, FaJoget} from 'react-icons/fa'
import {MdOutlineCollectionsBookmark} from 'react-icons/md'
import {BsCheckCircleFill} from 'react-icons/bs'
import {HiInformationCircle} from 'react-icons/hi'
import {RiShareBoxLine} from 'react-icons/ri'

import Layout from '../components/layout/Layout'
import { Avatar } from '../components/Picture'
import ButtonIcon, {ButtonLetter} from '../components/Button'
import Masonary from '../components/Masonary'
import { AlertMessage } from '../components/AlertMessage'
import Comments from '../components/Comments'
import { 
    fetchLike,
    fetchUnLike,
    fetchCheckLike,
    fetchAddCollection
} from '../ultils/fetchData'
import { getUserFromLocalStorage } from '../ultils/authUltils'
import { iVideoData } from '../components/Video'

export interface iVideoDataDetail extends iVideoData {
    name: string,
    isFree: boolean,
    price: string,
}

const DetailVideo:React.FC = () => {
    window.scroll(0,0)
    const {videoId} = useParams()
    const navigate = useNavigate()

    const [activeHeart, setActiveHeart] = useState(false) 
    const [addCollection, setAddCollection] = useState(false)
    const [video, setVideo] = useState<iVideoDataDetail>()
    const [timerId, setTimerId] = useState<number>()

    const user = getUserFromLocalStorage()
    const type = 'video'
    useEffect(() => {
        const checkLikePicture = async () => {
            const check = await fetchCheckLike(videoId, type)
            setActiveHeart(check)
        }
        checkLikePicture()
    }, [videoId])

    useEffect(() => {
        const getDetailPicture = async () => {
            const res = await axios.get(`http://localhost:8080/video/detail/${videoId}`)
            if (res.status === 200) {
                setVideo(res.data)
            }
        }
        getDetailPicture()
    }, [videoId])

    const handleClickHeart = () => {
        if (!activeHeart) {
            if (!user) {
                navigate('/sign-in')
            }
            fetchLike(video?._id, type)
        } else {
            fetchUnLike(video?._id, type)
        }
        setActiveHeart(!activeHeart)
    }

    const handleAddCollection = async () => {
        const isSuccess = await fetchAddCollection(video?._id, user?._id, video?.author, video?.videoUrl[2]?.link, type)
        if (isSuccess) {
            setAddCollection(true)
            const timer = setTimeout(() => {
                setAddCollection(false)
            }, 3000)
            setTimerId(timer)
        }
    }
    
    useEffect(() => {
        return () => clearTimeout(timerId)
    }, [timerId])

    return (
        <Layout>
            <div className='relative xl:container px-4 mx-auto xl:px-6 sm:px-6 md:px-12 w-full h-full py-4 md:py-10'>
                
                <div className='flex md:hidden justify-start gap-4 items-center'>
                    <Avatar className={'w-60px] h-[60px] cursor-pointer'} image={video?.author?.photographer_url}/>
                    <div>
                        <h3 className='text-2xl font-semibold text-black'>{video?.author?.photographer}</h3>
                        <div>
                            <span className='mr-2 text-lg cursor-pointer font-medium text-gray-blur'>Follow</span>
                            <span className='text-lg cursor-pointer  font-medium text-gray-blur'>Donate</span>
                        </div>
                    </div>
                </div>
                
                <div className='hidden md:flex items-center justify-between'>
                    <div className='flex gap-4 items-center'>
                        <Avatar className={'w-60px] h-[60px] cursor-pointer'} image={video?.author?.photographer_url}/>
                        <div>
                            <h3 className='text-2xl font-semibold text-black'>{video?.author?.photographer}</h3>
                            <div>
                                <span className='mr-2 text-lg cursor-pointer font-medium text-gray-blur'>Follow</span>
                                <span className='text-lg cursor-pointer  font-medium text-gray-blur'>Donate</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div onClick={handleAddCollection} className={` border border-[#777] cursor-pointer px-4 py-2 flex items-center justify-center text-xl bg-white text-slate-800 rounded-lg`}>
                            <span className={`text-xl mr-2 text-gray-blur`}>
                                <MdOutlineCollectionsBookmark />
                            </span>
                            <span>Collect</span>
                        </div>
                        <div onClick={handleClickHeart} className={` border border-[#777] cursor-pointer px-4 py-2 flex items-center justify-center text-xl bg-white text-slate-800 rounded-lg`}>
                            <span className={`text-xl mr-2 text-gray-blur ${activeHeart ? 'text-red-500' : 'text-gray-blur'}`}>
                                {activeHeart ? <FaHeart /> : <FaRegHeart />}
                            </span>
                            <span>Like</span>
                        </div>
                        <button className='bg-amber-300 text-white text-xl font-medium'>
                            {video?.isFree ? 'Free Download' : `Buy with ${video?.price}`}
                        </button>
                    </div>
                </div>

                <div className={`flex items-center justify-center w-full md:h-[600px] sm:h-[450px] h-[300px] mx-auto mt-10`}>
                    <video className='cursor-zoom-in w-full h-full' src={video?.videoUrl[3]?.link} autoPlay={true} controls/>
                </div>

                <div className='flex items-center flex-wrap justify-center md:justify-between mt-10'>
                    <div className='flex gap-4'>
                        <div className='hidden sm:flex items-center gap-2 text-gray-blur'>
                            <BsCheckCircleFill className='text-xl'/>
                            <span className='text-lg font-medium'>{'Free to use'}</span>
                        </div>
                        <div className='flex items-center gap-2 text-gray-blur'>
                            <FaJoget className='text-xl'/>
                            <span className='text-lg font-medium'>{video?.name}</span>
                        </div>
                    </div>
                    <div className='hidden md:flex gap-4'>
                        <ButtonIcon letter={'More Infor'} Icon={HiInformationCircle}/>
                        <ButtonIcon letter={'Share'} Icon={RiShareBoxLine}/>
                    </div>
                </div>

                <div className='flex mt-6 justify-center md:hidden gap-4'>
                    <ButtonIcon letter={'More Infor'} Icon={HiInformationCircle}/>
                    <ButtonIcon letter={'Share'} Icon={RiShareBoxLine}/>
                </div>

                <div className='mt-20'>
                    <div className='flex items-center justify-center'>
                        <h2 className='text-4xl font-bold'>More Like This</h2>
                    </div>
                    <div className='flex gap-4 my-6 flex-wrap justify-center sm:justify-start'>
                        <ButtonLetter letter={'Armchairs'}/>
                        <ButtonLetter letter={'Armchairs'}/>
                        <ButtonLetter letter={'Armchairs'}/>
                        <ButtonLetter letter={'Armchairs'}/>
                        <ButtonLetter letter={'Armchairs'}/>
                    </div>
                    <Masonary />
                </div>

                <div className='fixed flex z-50 md:hidden items-center gap-4 left-0 right-0 bottom-0 min-h-[60px] px-8 w-full bg-white'>
                        <div onClick={handleAddCollection} className={` border border-[#777] cursor-pointer px-4 py-2 flex items-center justify-center text-xl bg-white text-slate-800 rounded-lg`}>
                            <span className={`text-xl text-gray-blur`}>
                                <MdOutlineCollectionsBookmark />
                            </span>
                        </div>
                        <div onClick={handleClickHeart}  className={` border border-[#777] cursor-pointer px-4 py-2 flex items-center justify-center text-xl bg-white text-slate-800 rounded-lg`}>
                            <span className={`text-xl text-gray-blur ${activeHeart ? 'text-red-500' : 'text-gray-blur'}`}>
                                {activeHeart ? <FaHeart /> : <FaRegHeart />}
                            </span>
                        </div>

                    <button className='bg-amber-300 text-white font-medium flex-1'>
                        Free Download
                    </button>
                </div>

                {addCollection && <AlertMessage message={'Add collection successfully!'} color={'green'} setActive={setAddCollection}/>}
                
                {/* <Comments pictureId={videoId}/> */}
            </div>
        </Layout>
    )
}


export default DetailVideo