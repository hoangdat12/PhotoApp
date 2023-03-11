import {useState, useEffect, useMemo, memo} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import {SlSocialInstagram, SlUserFollow} from 'react-icons/sl'
import {BsFillCameraFill} from 'react-icons/bs'

import Layout from '../components/layout/Layout'
import { Avatar } from '../components/Picture'
import { ButtonLetter, ButtonSelect } from '../components/Button'
import {MasonaryCollection} from '../components/Masonary'
import { getUserFromLocalStorage } from '../ultils/authUltils'

export interface iFollowData {
    _id: string,
    nickName: string,
    avatarUrl: string,
    occupation: string
}

export interface iCollectionData {
    author: string,
    pictureId: string,
    pictureUrl: string,
}

export interface iUserData {
    _id: string,
    firstName: string,
    lastName: string,
    nickName: string,
    email: string,
    location: string,
    occupation: string,
    avatarUrl: string,
    followers: iFollowData[],
    following: iFollowData[],
    following_num: number,
    followers_num: number,
    collections: iCollectionData[],
    gallery: iCollectionData[]
}

export interface userLocal {
    _id: string, 
    email: string,
    nickName: string,
    avatarUrl: string
}

export interface iPropsProfileDetail {
    
}

const Profile = () => {
    // window.scroll(0,0)
    const {userId} = useParams()
    const user = useMemo(() => (
        getUserFromLocalStorage()
    ), [userId])

    const myProfile = useMemo(() => (
        user?._id === userId
    ), [userId, user?._id])
    

    const [userInfor, setUser] = useState<iUserData | null>(null)
    const [gallery, setGallery] = useState(true)
    const [collection, setCollection] = useState(false)
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        const getInforUser = async () => {
            const URL = `http://localhost:8080/user/${userId}`
            const res = await axios.get(URL)
            console.log(res.data.result)
            if (res.status === 200) {
                setUser(res.data.result)
            }
        }
        getInforUser()
    }, [userId])

    useEffect(() => {
        const checkFollowing = async () => {
            const body = {
                userId: user?._id,
                follwingId: userInfor?._id
            }
            const URL = `http://localhost:8080/user/check-following`
            const res = await axios.post(URL, body)
            if (res.status === 200) {
                setFollowing(res.data.result)
            }
        }
        checkFollowing()
    }, [userInfor?._id])

    const handleOnClick = () => {
        setFollowing(!following)
        if (following) {
            handleUnFollowing()
        } else {
            handleFollowing()
        }
    }

    const handleFollowing = async () => {
        const body = {
            userId: user?._id,
            follwingId: userInfor?._id, 
            avatarUrl: userInfor?.avatarUrl,
            name: userInfor?.nickName,
            occupation: userInfor?.occupation
        }

        const URL = `http://localhost:8080/user/following`
        const res = await axios.post(URL, body)
        if (res.status === 200) {
            setFollowing(true)
        }
    }

    const handleUnFollowing = async () => {
        const body = {
            userId: user?._id,
            follwingId: userInfor?._id
        }

        const URL = `http://localhost:8080/user/un-following`
        const res = await axios.post(URL, body)
        if (res.status === 200) {
            setFollowing(false)
        }
    }

    return (
        <Layout>
            <div className='xl:container px-2 mx-auto xl:px-6 sm:px-6 md:px-12 w-full h-full py-8 md:py-10'>
                <div className='flex justify-center items-center flex-col'>
                    <div className='relative cursor-pointer p-1 bg-slate-200 rounded-full'>
                        <Avatar className={'md:w-[150px] md:h-[150px] w-[150px] h-[150px]'} image={userInfor?.avatarUrl}/>
                        <Link to='/setting' className={`${!myProfile && 'hidden'} absolute bottom-2 sm:right-1 right-2 text-2xl bg-slate-200 hover:bg-slate-300 p-2 rounded-full`}>
                            <BsFillCameraFill />
                        </Link>
                    </div>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-6 sm:mt-8'>{userInfor?.nickName}</h1>
                    <div className={`${myProfile ? 'hidden' : 'flex'} gap-4 mt-4 sm:mt-6 items-center`}>
                        <span className='sm:hidden p-3 border border-[#77] rounded-md bg-amber-300 text-white'><SlUserFollow className='text-lg'/></span>
                        <ButtonLetter 
                            className={`${following ? 'bg-slate-100 text-black' : 'bg-amber-300 text-white'} sm:block hidden border-none outline-none cursor-pointer px-6 sm:px-10 font-bold`} 
                            letter={'Follow'} 
                            letterChange={'following'}
                            handleOnClick={handleOnClick} 
                            state={following}
                        />
                        <ButtonLetter className={'text-black border-none outline-none cursor-pointer px-6 sm:px-10 font-semibold bg-slate-100'} letter={'Donate'} />
                    </div>
                    <div className='flex flex-col items-center mt-6 sm:mt-8'>
                        <div className='flex items-center justify-center'>
                            <div className='px-4 border-r border-slate-700'>
                                <span className='text-base sm:text-lg text-[#555] cursor-pointer'>Follower:</span>
                                <span className='text-sm sm:text-base text-gray-blur ml-2'>{userInfor?.followers_num}</span>
                            </div>
                            <div className='px-4'>
                                <span className='text-base sm:text-lg text-[#555] cursor-pointer'>Following:</span>
                                <span className='text-sm sm:text-base text-gray-blur ml-2'>{userInfor?.following_num}</span>
                            </div>
                        </div>

                        <div className='flex gap-2 text-xl sm:text-2xl text-gray-blur items-center mt-4 sm:mt-6 cursor-pointer'>
                            <SlSocialInstagram />
                            <span className='pb-1 border-b-2 border-dashed border-[#777]'>matteo__milan__</span>
                        </div>
                    </div>
                    <div className='flex mt-8 text-gray-blur'>
                        <div className='flex flex-col items-center px-2 sm:px-8 cursor-pointer'>
                            <span className='text[1.1rem] sm:text-xl font-medium'>Total Views</span>
                            <span className='text-slate-700 font-semibold text-lg sm:text-2xl'>5.4M</span>
                        </div>
                        <div className='flex flex-col items-center px-6 sm:px-8 cursor-pointer'>
                            <span className='text[1.1rem] sm:text-xl font-medium'>Total Views</span>
                            <span className='text-slate-700 font-semibold text-lg sm:text-2xl'>5.4M</span>
                        </div>
                        <div className='flex flex-col items-center px-2 sm:px-8 cursor-pointer'>
                            <span className='text[1.1rem] sm:text-xl font-medium'>Total Views</span>
                            <span className='text-slate-700 font-semibold text-lg sm:text-2xl'>5.4M</span>
                        </div>
                    </div>
                </div>

                <div className='flex gap-2 mt-14 md:mt-20 mb-10 items-center justify-between'>
                    <ButtonSelect select1={'Gallery'} select2={'Collection'} setSelectOne={setGallery} setSelectTwo={setCollection} myProfile={myProfile}/>
                    <ButtonSelect select1={'Photos'} select2={'Videos'}/>
                </div>
                {
                    gallery && 
                    <MasonaryCollection 
                        pictures={userInfor?.gallery} 
                        myProfile={myProfile} 
                        isCollection={false} 
                        text={myProfile ? 'You have no photos or videos yet 😔' : 'User has no photos or videos yet 😔'}
                    />
                }
                {
                    collection && 
                    <MasonaryCollection 
                        pictures={userInfor?.collections} 
                        myProfile={myProfile} 
                        isCollection={true}
                        text={myProfile ? 'You have no photos or videos yet 😔' : 'User has no photos or videos yet 😔'}
                    />
                }
            </div>
        </Layout>
    )
}

export default Profile