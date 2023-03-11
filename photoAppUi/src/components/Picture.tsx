import React, {useState, useEffect, useRef, memo} from 'react'
import { useNavigate } from 'react-router-dom'

import {FaRegHeart, FaHeart} from 'react-icons/fa'
import {MdOutlineCollectionsBookmark} from 'react-icons/md'
import {AiOutlineDownload} from 'react-icons/Ai'
import {BsTrash} from 'react-icons/bs'

import { AlertMessage } from './AlertMessage'
import { getUserFromLocalStorage } from '../ultils/authUltils'

import { 
    fetchCheckLike, 
    fetchLike, 
    fetchUnLike,
    fetchAddCollection,
    fetchRemoveCollection
} from '../ultils/fetchData'

export interface iImageData {
    _id: string,
    author: {
        authorId: string,
        photographer_url: string,
        photographer: string
    },
    name: string,
    pictureUrl: {
        original: string,
        large2x: string,
        large: string,
        medium: string,
        small: string,
        portrait: string,
        landscape: string,
        tiny: string
    },
    isFree: boolean,
    price: number,
    downloads: number,
}

export interface iPropsPicture {
    image: iImageData,
    className?: string
} 

export interface iPropsCollection {
    image: {
        author: {
            authorId: string,
            photographer_url: string,
            photographer: string
        },
        pictureId: string,
        pictureUrl: string
    },
    className?: string,
    myProfile: boolean | undefined,
    isCollection?: boolean
} 

export interface iPropsAvatar {
    image: string | undefined,
    className?: string
} 

export interface iPropsModalConfirm {
    message: string,
    confirm: boolean,
    setConfirm: (confirm: boolean) => void,
    type: string,
    imageId?: string
}

const Picture:React.FC<iPropsPicture> = ({image}) => {
    const navigate = useNavigate()
    const user = getUserFromLocalStorage()

    const [activeHeart, setActiveHeart] = useState(false)
    const [addCollection, setAddCollection] = useState(false)
    const [timerId, setTimerId] = useState<number>()
    const type = 'picture'
    useEffect(() => {
        if (user) {
            const checkLikePicture = async () => {
                const check = await fetchCheckLike(image?._id, type)
                setActiveHeart(check)
            }
            checkLikePicture()
        }
    }, [image?._id])

    const handleClickHeart = () => {
        if (!activeHeart) {
            if (!user) {
                navigate('/sign-in')
            }
            fetchLike(image?._id, type)
        } else {
            fetchUnLike(image?._id, type)
        }
        setActiveHeart(!activeHeart)
    }

    const handleAddCollection = async () => {
        if (user) {
            const isSuccess = await fetchAddCollection(image?._id, user?._id, image?.author, image?.pictureUrl?.medium, type)
            if (isSuccess) {
                setAddCollection(true)
                const timer = setTimeout(() => {
                    setAddCollection(false)
                }, 2000)
                setTimerId(timer)
            }
        }
    }

    useEffect(() => {
        return () => clearTimeout(timerId)
    }, [timerId])

    return (
        <>
        <div className='my_image relative rounded-xl cursor-pointer overflow-hidden hover:bg-image-hover'>
            <img className='rounded-xl w-full' src={image?.pictureUrl?.medium} alt="" />
            <div className='heart_image hidden absolute duration-300 flex-col justify-between p-4 bg-hover-image top-0 left-0 right-0 bottom-0' >
                <div className='lg:flex justify-end hidden'>
                    <span onClick={handleClickHeart} className={`mr-2 w-[35px] h-[35px] flex items-center justify-center text-xl bg-white ${activeHeart ? 'text-red-500' : 'text-slate-800'} rounded-lg `}>
                        {activeHeart ? <FaHeart/> : <FaRegHeart/>}
                    </span>
                    <span onClick={handleAddCollection} className={`mr-2 w-[35px] h-[35px] flex items-center justify-center text-xl bg-white rounded-lg `}>
                        <MdOutlineCollectionsBookmark />
                    </span>
                </div>
                <div onClick={() => navigate(`/detail/${image?._id}`)}  className='flex-1'>

                </div>
                <div className='flex justify-between'>
                    <div className='lg:flex items-center hidden'>
                        <Avatar className={'w-[40px] h-[40px]'} image={image?.author?.photographer_url}/>
                        <span className='ml-2 font-semibold text-white text-lg'>{image?.author?.photographer}</span>
                    </div>
                    <span className='w-[35px] h-[35px] flex items-center justify-center text-xl bg-white text-slate-800 rounded-lg'><AiOutlineDownload /></span>
                </div>
            </div>
        </div>
        {
            addCollection && <AlertMessage message={'Add collection successfully!'} color={'green'} setActive={setAddCollection}/>
        }
        </>
    )
}

export const Avatar:React.FC<iPropsAvatar> = memo(({image, className}) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate('/profile/1')} className={`${className} overflow-hidden rounded-full`}>
            <img className='w-full h-full object-cover' src={image} alt="" />
        </div>
    )
})

export const PictureCollection:React.FC<iPropsCollection> = memo(({image, myProfile, isCollection}) => {
    const navigate = useNavigate()

    const [activeHeart, setActiveHeart] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const type = 'picture'
    useEffect(() => {
        const checkLikePicture = async () => {
            const check = await fetchCheckLike(image?.pictureId, type)
            setActiveHeart(check)
        }
        checkLikePicture()
    }, [])

    const handleClickHeart = () => {
        if (!activeHeart) {
            fetchLike(image?.pictureId, type)
        } else {
            fetchUnLike(image?.pictureId, type)
        }
        setActiveHeart(!activeHeart)
    }

    const handleShowConfirm = () => {
        setConfirm(true)
    }

    return (
        <>
        <div className='my_image relative rounded-xl cursor-pointer overflow-hidden hover:bg-image-hover'>
            <img className='rounded-xl w-full' src={image?.pictureUrl} alt="" />
            <div className='heart_image hidden absolute duration-300 flex-col justify-between p-4 bg-hover-image top-0 left-0 right-0 bottom-0' >
                <div className='flex justify-end'>
                    {/* <Button Icon={FaRegHeart} className={'mr-2'}/> */}
                    <span onClick={handleClickHeart} className={`mr-2 w-[40px] h-[40px] flex items-center justify-center text-xl bg-white ${activeHeart ? 'text-red-500' : 'text-slate-800'} rounded-lg `}>
                        {activeHeart ? <FaHeart/> : <FaRegHeart/>}
                    </span>
                    <span onClick={handleShowConfirm} className={`mr-2 w-[40px] h-[40px] ${myProfile ? 'flex' : 'hidden'} items-center justify-center text-xl bg-white rounded-lg `}>
                        <BsTrash />
                    </span>
                </div>
                <div onClick={() => navigate(`/detail/${image?.pictureId}`)}  className='flex-1'>

                </div>
                <div className={`${isCollection ? 'flex justify-between' : 'hidden'}`}>
                    <div className='lg:flex items-center hidden'>
                        <Avatar className={'w-[50px] h-[50px]'} image={image?.author?.photographer_url}/>
                        <span className='ml-2 font-semibold text-white text-lg'>{image?.author?.photographer}</span>
                    </div>
                    <span className='w-[40px] h-[40px] flex items-center justify-center text-xl bg-white text-slate-800 rounded-lg'><AiOutlineDownload /></span>
                </div>
            </div>
        </div>
        <ModalConfirm type={'Delete'} confirm={confirm} setConfirm={setConfirm} imageId={image?.pictureId} message={'Make sure you want delete this photo?'}/>
        </>
    )
})

export const ModalConfirm:React.FC<iPropsModalConfirm> = memo(({message, confirm, setConfirm, type, imageId}) => {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (confirm) {
            const checkClickOutsideModal = (e:any) => {
                if (confirm && modalRef.current && !modalRef.current.contains(e.target)) {
                    setConfirm(false)
                }
            }
    
            document.addEventListener('mousedown', checkClickOutsideModal)
    
            return () => document.removeEventListener('mousedown', checkClickOutsideModal)
        }
    }, [confirm])

    const handleRemoveCollection = async () => {
        await fetchRemoveCollection(imageId)
        handleCloseModel()
    }

    const handleCloseModel = () => {
        setConfirm(false)
    }

    return (
        <div className={`hidden fixed ${confirm ? 'sm:flex' : 'hidden'} items-center justify-center top-0 right-0 bottom-0 left-0 w-screen h-screen blackOverlay z-[101]`}>
            <div ref={modalRef} className='px-8 py-6 bg-white text-center rounded-xl flex flex-col items-center justify-center mx-6'>
                <h2 className='text-xl font-medium'>{message}</h2>
                <div className='mt-6 flex justify-end gap-2'>
                    <button onClick={handleCloseModel}>Close</button>
                    <button onClick={handleRemoveCollection} className='bg-red-500 text-white'>{type}</button>
                </div>
            </div>
        </div>
    )
})


export default Picture